# Módulo Detectron2

Este módulo contiene el primero paso  de detección de objetos utilizando la librería Detectron2. Su propósito es convertir anotaciones en formato Pascal VOC (XML) al formato COCO (JSON), entrenar un modelo basado en esos datos, y generar salidas de inferencia evaluables. Todo está organizado en una estructura de carpetas clara y modular.

el módulo principal, `DETECTRON2`, está dividida en dos secciones clave: `DATA` y `SCRIPTS`.  
- `DATA` contiene los datos crudos: imágenes, anotaciones XML, conjuntos de validación y resultados de inferencia.  
- `SCRIPTS` contiene los scripts que permiten convertir, entrenar y gestionar el modelo.

A continuación se presenta una tabla que resume la función de cada carpeta y archivo incluido en el proyecto.

## Estructura del Proyecto

| Carpeta / Archivo                      | Descripción                                                                                                  |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `DATA/`                                | Carpeta principal que contiene todos los datos utilizados durante el entrenamiento, validación e inferencia. |
| ┣ `ANOTATIONS-XML/`                    | Anotaciones en formato Pascal VOC (`.xml`) correspondientes a cada imagen.                                   |
| ┣ `RAW IMAGES/`                        | Imágenes originales sin procesar empleadas como dataset de entrenamiento.                                    |
| ┣ `VALIDACIÓN IMAGES/`                 | Imágenes específicas para la evaluación del rendimiento del modelo una vez entrenado.                        |
| ┣ `INFERENCE OUTPUTS/`                 | Contiene las salidas generadas tras ejecutar el modelo, incluyendo visualizaciones y archivo resumen `.txt`. |
| ┗ `INFERENCE ANALYSIS/`                | Carpeta destinada a scripts y visualizaciones post-inferencia para analizar el comportamiento del modelo.    |
| ┃ ┣ `score_visualizations/`            | Contiene el script `score_trend_by_species.py` y la carpeta de gráficos por especie con evolución temporal.  |
| ┃ ┃ ┣ `score_trend_by_species.py`      | Script que genera gráficos de línea mostrando la variación del score por imagen para cada especie.           |
| ┃ ┣ `score_distribution_analysis/`     | Contiene el script `score_histogram_by_species.py` y los histogramas de distribución de scores.              |
| ┃ ┃ ┗ `score_histogram_by_species.py`  | Script que genera histogramas por especie, agrupando imágenes según rangos de score.                         |

| `SCRIPTS/`                             | Carpeta que contiene todos los scripts del pipeline de entrenamiento y evaluación del modelo.                |
| ┣ `MODEL_WEIGHTS2/`                    | Carpeta que almacena el modelo entrenado (`model_final.pth`), checkpoints intermedios y métricas (`metrics.json`). |
| ┣ `convert_to_coco.py`                 | Script que transforma anotaciones Pascal VOC (`.xml`) a formato COCO (`.json`).                              |
| ┣ `train_detectron.py`                 | Script de entrenamiento que registra el dataset, configura hiperparámetros y guarda el modelo final.         |
| ┗ `evaluate_model.py`                  | Script que realiza inferencia sobre imágenes nuevas, genera visualizaciones y guarda resultados `.txt`.      |

| `MODEL_OVERVIEW.md`                    | Documento que describe la estructura y propósito general del proyecto y del modelo entrenado.                |

## Uso general

1. Ejecutar `convert_to_coco.py` para generar el archivo `model_dataset_coco.json` desde las anotaciones XML.
2. Ejecutar `train_detectron.py` para entrenar el modelo utilizando Detectron2.
3. Utilizar las imágenes de validación y ejecutar `evaluate_model.py` para que realice la inferencia de las imagenes.
4. Verificar el contenido de la carpeta `INFERENCE OUTPUTS`, donde se almacenan las predicciones realizadas por el modelo, para proceder con su análisis y validación.

## Recomendaciones

- Asegúrate de tener instalado Detectron2 y las librerías necesarias.
    - PyTorch: 2.2.2+cu118
    - Versión de CUDA: 11.8
    - Detectron2: 0.6
- Utiliza entornos virtuales para aislar las dependencias (venv) (anaconda).

