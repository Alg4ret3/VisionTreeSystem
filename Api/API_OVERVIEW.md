# Módulo Api

Esta módulo contiene la estructura base para el despliegue de una API REST desarrollada con **FastAPI** y diseñada para consumir un modelo de detección de objetos entrenado con **Detectron2**. El objetivo es facilitar el uso del modelo en tiempo real mediante un servicio web, permitiendo enviar imágenes y recibir predicciones en formato JSON.

El módulo `Api`, está organizada para contener todos los archivos esenciales para levantar un contenedor Docker funcional que aloja el modelo y su lógica de inferencia.

## Estructura del Proyecto

| Carpeta / Archivo     | Descripción                                                                                          |
|----------------------|------------------------------------------------------------------------------------------------------|
| `app/`               | Directorio principal que contiene el código fuente de la API.                                        |
| ┗ `main.py`          | Archivo principal que inicializa la instancia de FastAPI, configura el modelo y define los endpoints.|
| `Dockerfile`         | Archivo de configuración para construir la imagen Docker, con instrucciones de instalación y ejecución.|
| `requirements.txt`   | Archivo que lista todas las dependencias necesarias para ejecutar la API con Python.                 |
| `API_OVERVIEW.md`    | Documento que describe la estructura, propósito y funcionamiento general del proyecto.               |

## Cambios recientes

- Se corrigió el nombre de la carpeta `App` a `app`, y del archivo `Main.py` a `main.py` para asegurar la correcta detección del módulo por parte de Uvicorn y evitar errores de importación.
- Se añadieron los archivos `Dockerfile`, `requirements.txt` y `main.py`, los cuales conforman el núcleo del despliegue.
- Se configuró y desplegó exitosamente la aplicación en **Hugging Face Spaces** bajo el nombre de **TreeVisionAPI**. Esto permite probar los endpoints REST `/predict/` y `/health` de manera pública.

## Estado del despliegue

Actualmente, la API se encuentra funcional y desplegada. El asesor técnico ya aprobó su estado actual y ha confirmado que se debe implementar una interfaz web que consuma dicha API.

## Recomendaciones

- Asegúrate de que `app/` y `main.py` estén correctamente nombrados en minúsculas.
- Verifica que el modelo `.pth` esté disponible en la URL configurada y que sea compatible con el archivo de configuración `faster_rcnn_R_50_FPN_3x.yaml`.
- Consulta la URL pública de Hugging Face Spaces para realizar pruebas:  
   [`https://alg4ret3-treevisionapi.hf.space`](https://alg4ret3-treevisionapi.hf.space)

