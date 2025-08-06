# Importo los módulos necesarios de Detectron2 y librerías estándar
import os
from detectron2.data import DatasetCatalog, MetadataCatalog
from detectron2.data.datasets import register_coco_instances
from detectron2.engine import DefaultTrainer
from detectron2.config import get_cfg
from detectron2 import model_zoo

# Función para registrar el dataset en formato COCO
def register_coco_dataset():
    # Registro el dataset con un nombre personalizado ("ML_ARBOLES"), y paso la ruta al JSON y las imágenes
    register_coco_instances(
        "ML_ARBOLES", 
        {}, 
        "E:/modelos/Detectron2/Scripts/dataset_coco.json", 
        "E:/modelos/Detectron2/data/imagenes"
    )

    # Asigno manualmente los nombres de las clases para visualización y validación
    MetadataCatalog.get("ML_ARBOLES").set(thing_classes=["Ciprés", "PaloSanto", "Pino"])

    # Confirmación de que el dataset fue registrado correctamente
    print("Dataset registrado correctamente.")
    print("Clases en el dataset:", MetadataCatalog.get("ML_ARBOLES").thing_classes)

# Función principal para configurar y entrenar el modelo
def train_model():
    # Creo un objeto de configuración de Detectron2
    cfg = get_cfg()
    
    # Cargo la configuración base de un modelo preentrenado de Detectron2 desde el model zoo
    cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))

    # Establezco el número de clases de mi dataset personalizado
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = 3  # Ciprés, PaloSanto, Pino

    # Especifico el dataset de entrenamiento y dejo el de prueba vacío por ahora
    cfg.DATASETS.TRAIN = ("ML_ARBOLES",)
    cfg.DATASETS.TEST = ()

    # Ajusto parámetros relacionados con el entrenamiento
    cfg.DATALOADER.NUM_WORKERS = 4  # Número de hilos para cargar datos

    # Uso los pesos preentrenados del modelo Faster R-CNN
    cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml")

    # Cantidad de imágenes por batch (por GPU)
    cfg.SOLVER.IMS_PER_BATCH = 2

    # Tasa de aprendizaje
    cfg.SOLVER.BASE_LR = 0.00025

    # Número máximo de iteraciones de entrenamiento
    cfg.SOLVER.MAX_ITER = 3000

    # Tamaño del batch por imagen para la cabeza ROI
    cfg.MODEL.ROI_HEADS.BATCH_SIZE_PER_IMAGE = 128

    # Umbral mínimo de score para que una predicción se considere válida
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5

    # Directorio donde se guardarán los pesos entrenados y demás resultados
    cfg.OUTPUT_DIR = "./output"
    os.makedirs(cfg.OUTPUT_DIR, exist_ok=True)

    # Inicializo el entrenador con la configuración cargada
    trainer = DefaultTrainer(cfg)
    trainer.resume_or_load(resume=False)  # Si hay un checkpoint previo, no lo retomo

    # Inicio del entrenamiento
    trainer.train()
    print("Entrenamiento completado.")

# Bloque principal del script
if __name__ == "__main__":
    # Primero registro el dataset
    register_coco_dataset()

    # Luego entreno el modelo
    train_model()
