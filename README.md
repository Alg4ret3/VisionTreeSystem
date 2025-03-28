
---

# **TreeLearner**

## **Descripción**

**TreeLearner** es un **sistema de clasificación de especies de árboles** diseñado para diferenciar 4 especies de árboles ubicados en el Centro Ambiental Chimayoy, en Pasto, Colombia, utilizando **visión artificial**. Este proyecto tiene como objetivo facilitar la identificación de especies a partir de imágenes, mejorando la gestión ecológica y de conservación en la región.

El sistema se desarrolla en **Python** y emplea modelos de **visión por computadora** basados en redes neuronales convolucionales para el entrenamiento y la clasificación de las imágenes.

---

## **Características Principales**

- **Clasificación de Especies de Árboles**:
  - Entrenamiento de modelos para diferenciar 4 especies de árboles.
  - Uso de imágenes como datos de entrada para la clasificación.
  
- **Visión Artificial**:
  - Preprocesamiento de imágenes para normalización y redimensionamiento.
  - Uso de redes neuronales convolucionales (CNN) para la clasificación.

- **Interfaz Gráfica**:
  - Interfaz gráfica para facilitar el uso del sistema, desarrollada con **PyQt6**.
  - Funcionalidad para cargar imágenes y hacer predicciones en tiempo real.

- **Generación de Reportes**:
  - Exportación de resultados y análisis de predicciones.
  - Generación de reportes en formato PDF.

- **Modelo Entrenado**:
  - Guardado de modelos entrenados y pesos intermedios.
  - Capacidad de hacer predicciones con nuevos datos.

---

## **Estructura del Proyecto**

```plaintext
treelearner/
├── env/                              # Entorno virtual con las dependencias necesarias
├── data/                             # Imágenes y datos de entrenamiento
│   ├── raw/                          # Imágenes originales sin procesar
│   ├── processed/                    # Imágenes preprocesadas
│   ├── test_samples/                 # Imágenes de prueba
│   ├── train/                        # Conjunto de entrenamiento
│   └── val/                          # Conjunto de validación
├── models/                           # Modelos entrenados y pesos intermedios
│   ├── checkpoints/                  # Guardado de pesos intermedios
│   └── final_model.h5                # Modelo final entrenado
├── src/                              # Código fuente del proyecto
│   ├── train.py                      # Entrenamiento del modelo
│   ├── predict.py                    # Predicciones con nuevas imágenes
│   ├── preprocess.py                 # Preprocesamiento de imágenes
│   └── config.py                     # Configuraciones generales del proyecto
├── ui/                               # Interfaz gráfica del proyecto
│   ├── static/                       # Archivos estáticos (iconos, CSS)
│   ├── templates/                    # Archivos HTML
│   ├── main.ui                       # Diseño de la interfaz con Qt Designer
│   ├── main_window.py                # Código generado a partir de main.ui
│   └── app.py                        # Conexión de la UI con el modelo
├── notebooks/                        # Notebooks para pruebas y análisis
│   ├── data_exploration.ipynb        # Análisis y visualización de los datos
│   └── model_training.ipynb          # Entrenamiento y evaluación del modelo
├── tests/                            # Pruebas automáticas
│   └── test_model.py                 # Verificación de la clasificación
├── logs/                             # Archivos de registro del sistema
│   ├── training.log                  # Métricas del entrenamiento
│   └── app.log                       # Eventos y errores de la aplicación
├── requirements.txt                  # Dependencias del proyecto
├── README.md                         # Este archivo
└── setup.py                          # Configuración del paquete
```

---
