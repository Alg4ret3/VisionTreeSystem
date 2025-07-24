import os
from detectron2.data import DatasetCatalog, MetadataCatalog
from detectron2.data.datasets import register_coco_instances
from detectron2.engine import DefaultTrainer
from detectron2.config import get_cfg
from detectron2 import model_zoo

def register_coco_dataset():
    # Registro del dataset COCO bajo el nombre personalizado 'tree_detectionDef'
    register_coco_instances(
        "tree_detectionDef",  # Nuevo nombre del dataset
        {},
        r"E:\ML\Detectron2\Scripts\model_dataset_coco.json",  # Carpeta con del dataset en formato COCO
        r"E:\ML\Detectron2\Data\raw_images"  # Carpeta con las imágenes
    )
    
    # Establezco las clases manualmente
    MetadataCatalog.get("tree_detectionDef").set(thing_classes=["Cipres", "PaloSanto", "Pino", "LaurelBlanco"])
    print("Dataset registrado correctamente.")
    print("Clases en el dataset:", MetadataCatalog.get("tree_detectionDef").thing_classes)

def train_model():
    # Crear un objeto de configuración para el entrenamiento
    cfg = get_cfg()
    
    # Configuración del modelo preentrenado de Detectron2
    cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))
    
    # Cambiar el número de clases en el modelo
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = 4  # El número de clases en el dataset
    
    # Ruta al archivo que contiene el dataset
    cfg.DATASETS.TRAIN = ("tree_detectionDef",)
    cfg.DATASETS.TEST = ()  # No usar conjunto de prueba por ahora
    
    # Configurar los parámetros de entrenamiento
    cfg.DATALOADER.NUM_WORKERS = 4
    cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml")  # Modelo preentrenado
    cfg.SOLVER.IMS_PER_BATCH = 2
    cfg.SOLVER.BASE_LR = 0.00025
    cfg.SOLVER.MAX_ITER = 6000  #  número de iteraciones
    cfg.MODEL.ROI_HEADS.BATCH_SIZE_PER_IMAGE = 128
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7  # Umbral para detección
    
    # Directorio donde guardar los resultados del modelo entrenado
    cfg.OUTPUT_DIR = "./model_weights4"
    os.makedirs(cfg.OUTPUT_DIR, exist_ok=True)
    
    # Entrenador para el modelo
    trainer = DefaultTrainer(cfg)
    trainer.resume_or_load(resume=False)
    
    # Iniciar el entrenamiento
    trainer.train()
    print("Entrenamiento completado.")

if __name__ == "__main__":
    # Registrar el dataset
    register_coco_dataset()
    
    # Entrenar el modelo
    train_model()
