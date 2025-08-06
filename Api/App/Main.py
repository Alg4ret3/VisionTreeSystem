# === Importaciones necesarias ===
# Aquí incluyo las librerías que necesito para construir la API, hacer inferencia con Detectron2,
# trabajar con imágenes y gestionar el ciclo de vida de FastAPI.
import os
import io
import requests
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import torch  # PyTorch es la base para ejecutar el modelo Detectron2
import cv2  # Uso OpenCV solo para conversión de colores (RGB ↔ BGR)
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2 import model_zoo
from detectron2.data import MetadataCatalog
from contextlib import (
    asynccontextmanager,
)  # Esto lo uso para manejar el ciclo de vida con FastAPI

# === Clases entrenadas en el modelo personalizado ===
# Defino las clases que el modelo detecta. Esto es crucial para mapear los resultados.
CLASS_NAMES = ["Ciprés", "Palo Santo", "Pino", "Laurel Blanco"]

# === Ruta del modelo dentro del contenedor Docker ===
# Esta es la ruta donde quiero guardar el modelo .pth. Uso /tmp para asegurar permisos de escritura.
MODEL_FILENAME = "TreeVisionModel.pth"
MODEL_PTH_PATH = os.path.join("/tmp", MODEL_FILENAME)

# === Variable global para mantener instancia única del predictor ===
# Uso una variable global para no crear múltiples instancias del predictor, lo cual sería ineficiente.
predictor = None


# === Función para descargar automáticamente el modelo desde Hugging Face si no existe ===
# Esta función se asegura de que el modelo esté disponible localmente. Si no está, lo descarga.
def descargar_modelo():
    if not os.path.exists(MODEL_PTH_PATH):
        print(f"Descargando modelo desde Hugging Face...")
        url = "https://huggingface.co/Alg4ret3/modelvisiontreepasto/resolve/main/VisionTreePastoModel.pth"

        try:
            os.makedirs(os.path.dirname(MODEL_PTH_PATH), exist_ok=True)
            with requests.get(url, stream=True, allow_redirects=True) as r:
                r.raise_for_status()
                first_chunk = next(r.iter_content(chunk_size=4096))
                # Me aseguro de que la URL no esté devolviendo una página HTML por error
                if b"<html" in first_chunk.lower():
                    raise RuntimeError("La URL devolvió HTML en vez del .pth")
                with open(MODEL_PTH_PATH, "wb") as f:
                    f.write(first_chunk)
                    for chunk in r.iter_content(chunk_size=8192):
                        f.write(chunk)
            print("Modelo descargado correctamente.")
        except Exception as e:
            raise RuntimeError(f"Error descargando el modelo: {e}")
    else:
        print("Modelo ya existe, se omite descarga.")


# === Configuración e inicialización del predictor Detectron2 ===
# Aquí configuro el predictor usando Detectron2. Esto solo se hace una vez.
def load_predictor_instance():
    global predictor
    if predictor is None:
        print("Configurando y cargando el predictor...")
        cfg = get_cfg()
        cfg.merge_from_file(
            model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml")
        )
        cfg.MODEL.ROI_HEADS.NUM_CLASSES = len(
            CLASS_NAMES
        )  # Indico el número exacto de clases personalizadas
        cfg.MODEL.WEIGHTS = MODEL_PTH_PATH  # Ruta del modelo ya descargado
        cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.8  # Umbral mínimo de confianza
        cfg.MODEL.DEVICE = "cpu"  # Uso CPU por compatibilidad con Hugging Face Spaces
        predictor = DefaultPredictor(cfg)
        MetadataCatalog.get("my_dataset_for_api").set(
            thing_classes=CLASS_NAMES
        )  # Etiquetas personalizadas
        print("Predictor listo.")


# === Ciclo de vida de la aplicación (startup / shutdown) ===
# Esta función se encarga de inicializar la API cargando el modelo y el predictor una sola vez.
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Iniciando aplicación...")
    try:
        descargar_modelo()
        load_predictor_instance()
        yield  # Aquí la API queda lista para atender peticiones
    except RuntimeError as e:
        print(f"Fallo al iniciar la API: {e}")
        raise
    finally:
        print("Apagando aplicación...")


# === Instancia principal de la API ===
# Defino la instancia de FastAPI y le paso el ciclo de vida personalizado.
app = FastAPI(
    title="VisionTreePastoAPI: Detección Inteligente de Especies Arbóreas",
    description="API robusta de visión por computador basada en Detectron2, diseñada para identificar automáticamente especies de árboles como Ciprés, Pino, Palo Santo y Laurel Blanco a partir de imágenes. Ideal para proyectos ecológicos, monitoreo forestal y aplicaciones educativas.",
    lifespan=lifespan,
)


# === Endpoint de salud (para verificar disponibilidad del modelo) ===
@app.get("/health")
async def health_check():
    """Verifica si la API y el modelo están cargados correctamente."""
    if predictor is not None:
        return {"status": "ok", "message": "API y modelo están operativos"}
    raise HTTPException(status_code=503, detail="Modelo no cargado correctamente")


# === Endpoint principal para detección ===
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    """Realiza la detección de objetos (árboles) a partir de una imagen."""
    if predictor is None:
        raise HTTPException(status_code=503, detail="El modelo no está listo aún")

    # Verifico que el archivo sea una imagen válida
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Formato de archivo inválido")

    try:
        # Leo los bytes de la imagen y los convierto a un arreglo NumPy en formato BGR (para OpenCV)
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image_np = np.array(image)[:, :, ::-1]  # Invierto RGB a BGR

        # Ejecuto la inferencia con el predictor
        outputs = predictor(image_np)
        instances = outputs["instances"].to("cpu")
        boxes = instances.pred_boxes.tensor.numpy().tolist()
        scores = instances.scores.numpy().tolist()
        classes = instances.pred_classes.numpy().tolist()

        # Devuelvo las cajas, scores y clases predichas, junto con los nombres de clase
        return JSONResponse(
            content={
                "boxes": boxes,
                "scores": scores,
                "classes": classes,
                "class_names": [CLASS_NAMES[cls_id] for cls_id in classes],
            }
        )
    except IndexError as e:
        # Esto puede pasar si hay una clase que no está bien mapeada
        raise HTTPException(status_code=500, detail=f"Clase fuera de rango: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error durante la inferencia: {e}")
