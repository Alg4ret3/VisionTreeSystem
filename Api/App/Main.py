# === Importaciones necesarias ===
import os
import io
import requests
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import torch              # PyTorch para inferencia con Detectron2
import cv2                # OpenCV para conversión BGR
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2 import model_zoo
from detectron2.data import MetadataCatalog
from contextlib import asynccontextmanager  # Para manejar ciclo de vida con FastAPI
# === Clases entrenadas en el modelo personalizado ===
CLASS_NAMES = ["Ciprés", "Palo Santo", "Pino", "Arrayán"]

# === Ruta del modelo dentro del contenedor Docker ===
MODEL_FILENAME = "TreeVisionModel.pth"
MODEL_PTH_PATH = os.path.join("/tmp", MODEL_FILENAME)  # Ruta en /tmp por permisos de escritura

# === Variable global para mantener instancia única del predictor ===
predictor = None

# === Función para descargar automáticamente el modelo desde Hugging Face si no existe ===
def descargar_modelo():
    if not os.path.exists(MODEL_PTH_PATH):
        print(f"Descargando modelo desde Hugging Face...")
        url = "https://huggingface.co/Alg4ret3/TreeVisionModel/resolve/main/TreeVisionModel.pth"
        
        try:
            os.makedirs(os.path.dirname(MODEL_PTH_PATH), exist_ok=True)
            with requests.get(url, stream=True, allow_redirects=True) as r:
                r.raise_for_status()
                first_chunk = next(r.iter_content(chunk_size=4096))
                # Verifico si la URL devuelve una página HTML por error
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
def load_predictor_instance():
    global predictor
    if predictor is None:
        print("Configurando y cargando el predictor...")
        cfg = get_cfg()
        cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))
        cfg.MODEL.ROI_HEADS.NUM_CLASSES = len(CLASS_NAMES)
        cfg.MODEL.WEIGHTS = MODEL_PTH_PATH
        cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5
        cfg.MODEL.DEVICE = "cpu"  # Para compatibilidad con entornos gratuitos (sin GPU)
        predictor = DefaultPredictor(cfg)
        MetadataCatalog.get("my_dataset_for_api").set(thing_classes=CLASS_NAMES)
        print("Predictor listo.")

# === Ciclo de vida de la aplicación (startup / shutdown) ===
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Iniciando aplicación...")
    try:
        descargar_modelo()
        load_predictor_instance()
        yield  # API lista para atender peticiones
    except RuntimeError as e:
        print(f"Fallo al iniciar la API: {e}")
        raise
    finally:
        print("Apagando aplicación...")

# === Instancia principal de la API ===
app = FastAPI(
    title="Detectron2 Object Detection API",
    description="API para detección de objetos usando Detectron2 y modelo .pth",
    lifespan=lifespan
)

# === Endpoint de salud (para verificar disponibilidad del modelo) ===
@app.get("/health")
async def health_check():
    if predictor is not None:
        return {"status": "ok", "message": "API y modelo están operativos"}
    raise HTTPException(status_code=503, detail="Modelo no cargado correctamente")

# === Endpoint principal para detección ===
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    if predictor is None:
        raise HTTPException(status_code=503, detail="El modelo no está listo aún")

    # Validación del tipo de archivo
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Formato de archivo inválido")

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image_np = np.array(image)[:, :, ::-1]  # Conversión de RGB a BGR

        outputs = predictor(image_np)
        instances = outputs["instances"].to("cpu")
        boxes = instances.pred_boxes.tensor.numpy().tolist()
        scores = instances.scores.numpy().tolist()
        classes = instances.pred_classes.numpy().tolist()

        return JSONResponse(content={
            "boxes": boxes,
            "scores": scores,
            "classes": classes,
            "class_names": [CLASS_NAMES[cls_id] for cls_id in classes]
        })
    except IndexError as e:
        raise HTTPException(status_code=500, detail=f"Clase fuera de rango: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error durante la inferencia: {e}")
