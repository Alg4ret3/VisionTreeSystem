import os
import cv2
import torch
import time
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.data import MetadataCatalog

# ===============================
# CONFIGURACIÓN DE RUTAS
# ===============================
# Ruta del modelo ya entrenado
MODEL_PATH = r"E:\ML\Detectron2\Scripts\model_weights4\TreeVisionModel.pth"

# Carpeta donde están las imágenes de validación que quiero evaluar
IMAGE_FOLDER = r"E:\ML\Detectron2\Data\validation_images"

# Carpeta donde se van a guardar las imágenes con las predicciones dibujadas
RESULTS_FOLDER = r"E:\ML\Detectron2\Data\inference_outputs"
os.makedirs(RESULTS_FOLDER, exist_ok=True)  # Me aseguro que exista la carpeta de resultados

# ===============================
# DEFINICIÓN DE CLASES Y COLORES
# ===============================
# Nombres de las clases que entrené
CLASS_NAMES = ["Cipres", "Palo Santo", "Pino", "Laurel Blanco"]
DATASET_NAME = "inference_only_dataset"

# Colores fuertes para cada clase, definidos en formato BGR para OpenCV
CLASS_COLORS = {
    0: (0, 0, 255),       # Rojo fuerte para Cipres
    1: (255, 0, 0),       # Azul fuerte para Palo Santo
    2: (0, 255, 255),     # Amarillo fuerte para Pino
    3: (128, 0, 128)      # Morado fuerte para LaurelBlanco" 
}

# Inicializo contadores para nombrar cada imagen con su clase y número (por ejemplo, CIPRES_0, CIPRES_1, etc.)
class_counters = {i: 0 for i in range(len(CLASS_NAMES))}

# ===============================
# CONFIGURAR EL MODELO
# ===============================
def setup_cfg():
    cfg = get_cfg()
    # Cargo la configuración base del modelo 
    cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = len(CLASS_NAMES)  # Número de clases personalizadas
    cfg.MODEL.WEIGHTS = MODEL_PATH  # Cargo los pesos del modelo que entrené
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # Umbral mínimo para que una predicción sea válida
    cfg.MODEL.DEVICE = "cuda" if torch.cuda.is_available() else "gpu"  # Uso CPU si hay disponible
    return cfg

# ===============================
# EJECUTAR INFERENCIA
# ===============================
def run_visual_inference():
    # Registro las clases en el catálogo para que el visualizador sepa cómo nombrarlas
    MetadataCatalog.get(DATASET_NAME).set(thing_classes=CLASS_NAMES)
    cfg = setup_cfg()
    predictor = DefaultPredictor(cfg)

    # Archivo donde voy a guardar el resumen de las detecciones de todas las imágenes
    global_results_path = os.path.join(RESULTS_FOLDER, "global_results.txt")
    with open(global_results_path, 'w', encoding='utf-8') as global_txt:
        global_txt.write("RESULTADOS GLOBALES DE INFERENCIA\n\n")

        # Recorro cada imagen en la carpeta de validación
        for image_name in os.listdir(IMAGE_FOLDER):
            if image_name.lower().endswith(('.jpg', '.jpeg', '.png')):
                image_path = os.path.join(IMAGE_FOLDER, image_name)
                image = cv2.imread(image_path)

                # Ejecuto la inferencia y mido el tiempo
                start_time = time.time()
                outputs = predictor(image)
                elapsed_time = time.time() - start_time

                # Extraigo los resultados de la predicción
                instances = outputs["instances"].to("cpu")
                boxes = instances.pred_boxes.tensor.numpy()
                scores = instances.scores.numpy()
                classes = instances.pred_classes.numpy()

                result_lines = []           # Aquí guardo las líneas de texto que voy a escribir en el .txt
                class_for_naming = None     # Clase principal detectada, me sirve para renombrar la imagen

                # Recorro todas las detecciones hechas en la imagen
                for i in range(len(boxes)):
                    score = scores[i]
                    if score >= 0.75:  # Solo uso detecciones con confianza >= 75%
                        x1, y1, x2, y2 = map(int, boxes[i])
                        class_id = int(classes[i])
                        label = f"{CLASS_NAMES[class_id]} ({score:.2f})"
                        color = CLASS_COLORS.get(class_id, (0, 255, 255))  # Color según clase

                        # Dibujo la caja y el texto 
                        cv2.rectangle(image, (x1, y1), (x2, y2), color, 8)
                        cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.5, color, 4)

                        # Guardo los datos para el .txt
                        result_lines.append(
                            f"  - {CLASS_NAMES[class_id]} | Score: {score:.4f} | BBox: ({x1}, {y1}, {x2}, {y2})"
                        )

                        # Me quedo con la primera clase detectada (la más probable) para renombrar el archivo
                        if class_for_naming is None:
                            class_for_naming = class_id

                # Renombro el archivo con el nombre de la clase principal + número secuencial
                if class_for_naming is not None:
                    count = class_counters[class_for_naming]
                    new_image_name = f"{CLASS_NAMES[class_for_naming].upper().replace(' ', '_')}_{count}.jpg"
                    class_counters[class_for_naming] += 1
                else:
                    new_image_name = f"UNDETECTED_{image_name}"  # Si no hay detección válida

                output_image_path = os.path.join(RESULTS_FOLDER, new_image_name)
                cv2.imwrite(output_image_path, image)  # Guardo la imagen con las predicciones dibujadas

                # Guardo también en el .txt un resumen por imagen
                global_txt.write(f"Imagen: {new_image_name}\n")
                global_txt.write(f"  Tiempo de inferencia: {elapsed_time:.4f} segundos\n")
                if result_lines:
                    global_txt.write("\n".join(result_lines) + "\n\n")
                else:
                    global_txt.write("  No se detectaron objetos con score >= 0.75\n\n")

                print(f"{image_name} procesada. Guardada como: {new_image_name}")

    print(f"\nTodos los resultados han sido guardados en: {global_results_path}")

# ===============================
# MAIN
# ===============================
# Inicio el proceso de inferencia cuando ejecuto el script
if __name__ == "__main__":
    run_visual_inference()
