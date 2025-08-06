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

- Se modificó la nomenclatura del proyecto a **VisionTreePasto**, con el objetivo de reflejar mejor su enfoque territorial.
- Se configuró y desplegó exitosamente la aplicación en **Hugging Face Spaces** bajo el nuevo nombre, esto permite probar los endpoints REST `/predict/` y `/health` de manera pública.
- Se integró una **interfaz web funcional** que consume la API y permite realizar análisis de imágenes directamente desde el navegador.

## Estado del despliegue

Actualmente, la API se encuentra **totalmente funcional** y desplegada en Hugging Face Spaces con una interfaz web que la consume.

## Recomendaciones

- Verifica que el modelo `.pth` esté disponible en la URL configurada y que sea compatible con el archivo de configuración `faster_rcnn_R_50_FPN_3x.yaml`.
- Consulta la URL pública de Hugging Face Spaces para realizar pruebas:  
   [`https://alg4ret3-treevisionapi.hf.space`](https://alg4ret3-visiontreepasto.hf.space/docs#)


