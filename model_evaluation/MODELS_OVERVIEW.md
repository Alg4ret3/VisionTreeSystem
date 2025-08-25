# Módulo Model Evaluation

Esta carpeta contiene los recursos necesarios para **comparar y evaluar el rendimiento de distintos modelos de detección de objetos**, específicamente **YOLO**, **EfficientDet** y **Detectron2**. Su propósito principal es facilitar el análisis comparativo para seleccionar el modelo más adecuado para producción.

### Estructura interna

| Carpeta / Archivo                  | Descripción                                                                 |
|-----------------------------------|-----------------------------------------------------------------------------|
| `docs/`                           | Documentación relacionada con las pruebas y comparaciones entre modelos.   |
| ┣ `Comparacion_Yolo_Detectron.md` | Documento comparativo entre YOLO y Detectron2.                             |
| ┣ `Tabla_Modelos_Comparacion.md`  | Tabla resumen de métricas y características de cada modelo consultado.     |
| ┣ `TesteoDetectron2.md`           | Detalles del proceso de prueba del modelo Detectron2.                      |
| ┣ `TesteoEffientDet.md`           | Detalles del proceso de prueba del modelo EfficientDet.                    |
| ┗ `TesteoYolo.md`                 | Detalles del proceso de prueba del modelo YOLO.                            |
| `scripts/`                        | Scripts de entrenamiento para cada modelo evaluado.                        |
| ┣ `train_EfficientDet.py`         | Script de entrenamiento para el modelo EfficientDet.                       |
| ┣ `train_model_Detectron2.py`     | Script de entrenamiento para el modelo Detectron2.                         |
| ┗ `train_Yolov8.py`                 | Script de entrenamiento para el modelo YOLO.                               |
| `MODELS_OVERVIEW.md`              | Visión general y resumen de los modelos implementados y evaluados.        |
