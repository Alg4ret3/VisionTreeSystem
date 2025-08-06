# VisionTreePasto Atificial Intelligence 

**VisionTreePasto AI** es un sistema completo de inteligencia artificial diseñado para identificar mediante imagenes 4  especies de árboles nativos del Centro Ambiental Chimayoy, ubicado en San Juan de Pasto, Colombia, este proyecto busca enriquecer la experiencia de los visitantes del parque, permitiéndoles conocer más sobre la flora local a través de una herramienta accesible, visual y educativa

## Objetivo

El principal propósito de VisionTreePasto AI es mejorar la interacción de las personas con el entorno natural del parque, brindando información sobre especies de árboles mediante el uso de un modelo de machine learning entrenado específicamente para esta tarea

## ¿Cómo funciona?

El núcleo del sistema es un modelo de detección de objetos basado en Detectron2, una librería de visión por computador desarrollada por Meta AI, el cual fue entrenado y ajustado para identificar cuatro especies de árboles presentes en el parque

- Ciprés  
- Palo Santo  
- Pino  
- Laurel Blanco

A través de una fotografía tomada por el usuario, el sistema detecta automáticamente las especies presentes en la imagen y devuelve los resultados de forma clara y visual

## Fases del proyecto

El desarrollo de VisionTreePasto AI se dividió en tres etapas principales

### 1. Construcción del dataset y entrenamiento del modelo

Se realizó una recolección de imágenes en el parque para conformar un dataset balanceado, se definieron las cuatro especies objetivo, el entrenamiento y ajuste del modelo se realizó utilizando la arquitectura Detectron2, el código correspondiente se encuentra en la carpeta `Detectron2`

### 2. Despliegue del modelo mediante una API

El modelo entrenado fue integrado en una API usando FastAPI, esta API permite recibir imágenes y devolver las predicciones del modelo en formato JSON, el código del backend se encuentra en la carpeta `api`

### 3. Desarrollo de la interfaz web

Se creó una interfaz de usuario moderna, accesible y responsiva utilizando React, Next.js y Tailwind CSS, esta interfaz permite subir una imagen, enviarla al modelo y visualizar los resultados, incluye también una sección de NPS (Net Promoter Score) para evaluar la experiencia del usuario, el código del frontend se encuentra en la carpeta `visiontreepasto-frontend`

## Impacto

Este sistema busca conectar la tecnología con la naturaleza, brindando a los visitantes del Centro Ambiental Chimayoy una experiencia educativa e interactiva, a través del reconocimiento automático de especies, VisionTreePasto AI promueve la conciencia ambiental y el aprendizaje ecológico de una manera intuitiva e innovadora

### Estructura interna

| Carpeta / Archivo                   | Descripción                                                                 |
|------------------------------------|-----------------------------------------------------------------------------|
| `api/`                              | Contiene la API desarrollada con FastAPI que expone el modelo Detectron2 para procesar imágenes y retornar predicciones. |
| `Detectron2/`                       | Carpeta donde se encuentra el modelo entrenado junto con configuraciones, pesos y scripts relacionados con el entrenamiento. |
| `model_evaluation/`                | Contiene documentos y scripts relacionados con la evaluación de otros modelos probados, incluyendo sus métricas, resultados y pruebas realizadas con imágenes de validación. |
| `visiontreepasto-frontend/`        | Aplicación web desarrollada con React y Next.js que permite al usuario subir imágenes, ver los resultados del modelo. |

> En cada subcarpeta principal se incluye un archivo `.md` explicativo con detalles más específicos sobre su funcionalidad y uso.

## Enlaces de interés

- **Espacio en Hugging Face para interactuar con la interfaz web**: [https://huggingface.co/spaces/Alg4ret3/visiontreepasto](https://huggingface.co/spaces/Alg4ret3/visiontreepasto)
- **Endpoint de la API para predicciones**: [https://alg4ret3-visiontreepasto.hf.space/predict/](https://alg4ret3-visiontreepasto.hf.space/predict/)
- **Modelo entrenado (Detectron2 - .pth)**: [https://huggingface.co/Alg4ret3/modelvisiontreepasto/resolve/main/VisionTreePastoModel.pth](https://huggingface.co/Alg4ret3/modelvisiontreepasto/resolve/main/VisionTreePastoModel.pth)
- **Dataset (imágenes sin procesar)**: [https://huggingface.co/datasets/Alg4ret3/chimayoy-trees-dataset/resolve/main/raw_images.zip](https://huggingface.co/datasets/Alg4ret3/chimayoy-trees-dataset/resolve/main/raw_images.zip)
- **Anotaciones XML del dataset**: [https://huggingface.co/datasets/Alg4ret3/chimayoy-trees-dataset/resolve/main/annotations_xml.zip](https://huggingface.co/datasets/Alg4ret3/chimayoy-trees-dataset/resolve/main/annotations_xml.zip)
