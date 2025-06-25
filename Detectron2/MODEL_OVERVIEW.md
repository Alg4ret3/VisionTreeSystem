# Carpeta Detectron2

Este Carpeta contiene el primero paso  de detección de objetos utilizando la librería Detectron2. Su propósito es convertir anotaciones en formato Pascal VOC (XML) al formato COCO (JSON), entrenar un modelo basado en esos datos, y generar salidas de inferencia evaluables. Todo está organizado en una estructura de carpetas clara y modular.

La carpeta principal, `DETECTRON2`, está dividida en dos secciones clave: `DATA` y `SCRIPTS`.  
- `DATA` contiene los datos crudos: imágenes, anotaciones XML, conjuntos de validación y resultados de inferencia.  
- `SCRIPTS` contiene los scripts que permiten convertir, entrenar y gestionar el modelo.

A continuación se presenta una tabla que resume la función de cada carpeta y archivo incluido en el proyecto.

## Estructura del Proyecto

| Carpeta / Archivo             | Descripción                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| `DATA/`                      | Carpeta base que contiene los datos necesarios para el entrenamiento.       |
| `SCRIPTS/`                   | Carpeta principal que contiene scripts y subcarpetas organizadas.          |
    | `DATA/ANOTATIONS-XML/`    | Anotaciones en formato Pascal VOC (`.xml`) correspondientes a las imágenes.|
    | `DATA/RAW IMAGES/`        | Imágenes originales sin procesar utilizadas para entrenamiento.            |
    | `DATA/VALIDACIÓN IMAGES/` | Imágenes utilizadas para validar el modelo después del entrenamiento. |
    | `DATA/INFERENCE OUTPUTS/` | Carpeta donde se almacenan las salidas generadas por el modelo tras la inferencia. |
    | `SCRIPTS/MODEL_WEIGHTS2/`    | Carpeta donde se guarda el modelo entrenado (`model_final.pth`), checkpoints y métricas (`metrics.json`). |
    | `SCRIPTS/convert_to_coco.py` | Script encargado de convertir las anotaciones `.xml` y las imágenes a un dataset en formato COCO (`.json`). |
    | `SCRIPTS/train_detectron.py` | Script de entrenamiento: registra el dataset, configura los parámetros y guarda el modelo entrenado. |
    | `SCRIPTS/evaluate_model.py`  | Script de evaluacion: realiza inferencia sobre imágenes usando el modelo final, dibuja las detecciones con colores por clase si el score es ≥ 0.75, y guarda los resultados visuales y un resumen en un archivo .txt. |

| `MODEL_OVERVIEW.md`                  | Documento que describe el propósito de la carpeta, su estructura y uso.     |

## Uso general

1. Ejecutar `convert_to_coco.py` para generar el archivo `model_dataset_coco.json` desde las anotaciones XML.
2. Ejecutar `trained_detectron.py` para entrenar el modelo utilizando Detectron2.
3. Utilizar las imágenes de validación y la carpeta `INFERENCE OUTPUTS` para evaluar los resultados.

## Recomendaciones

- Asegúrate de tener instalado Detectron2 y las librerías necesarias.
    - PyTorch: 2.2.2+cu118
    - Versión de CUDA: 11.8
    - Detectron2: 0.6
- Utiliza entornos virtuales para aislar las dependencias (venv) (anaconda).
- Revisa el archivo `.gitignore` para evitar subir archivos pesados o innecesarios al repositorio.

