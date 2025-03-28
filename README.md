Explicación del Proyecto
Este repositorio contiene los archivos necesarios para desarrollar, entrenar y ejecutar el modelo de clasificación, junto con la interfaz gráfica y el código fuente para la predicción.

Estructura del Proyecto

env/

Contiene el entorno virtual de Python con las dependencias necesarias.

data/

Contiene todas las imágenes necesarias para entrenar, validar y probar el modelo.

2.1 raw/

Imágenes originales sin procesar.

2.2 processed/

Imágenes preprocesadas (redimensionadas, normalizadas, etc.).

2.3 test_samples/

Imágenes de prueba para evaluar el modelo.

2.4 train/

Conjunto de entrenamiento (dividido en carpetas por categorías).

2.5 val/

Conjunto de validación (misma estructura que el conjunto de entrenamiento).

models/

Contiene los modelos entrenados y sus respectivos checkpoints.

3.1 checkpoints/

Guardado de pesos intermedios durante el entrenamiento.

3.2 final_model.h5

Modelo final entrenado, listo para hacer predicciones.

src/

Código fuente del proyecto.

4.1 train.py

Script de entrenamiento del modelo.

4.2 predict.py

Script para hacer predicciones con imágenes nuevas.

4.3 preprocess.py

Funciones para preprocesar imágenes antes del entrenamiento.

4.4 config.py

Parámetros generales y rutas de archivos.

ui/

Contiene la interfaz gráfica del proyecto.

5.1 static/

Archivos estáticos como iconos y hojas de estilo.

5.2 templates/

Archivos HTML si la interfaz utiliza un motor de plantillas.

5.3 main.ui

Archivo original de diseño de interfaz creado con Qt Designer.

5.4 main_window.py

Código generado a partir de main.ui usando pyuic6.

5.5 app.py

Código que conecta la interfaz con el modelo.

notebooks/

Contiene notebooks para pruebas y experimentos.

6.1 data_exploration.ipynb

Análisis de imágenes y estadísticas del dataset.

6.2 model_training.ipynb

Pruebas con el entrenamiento del modelo.

tests/

Contiene pruebas automáticas para verificar el modelo y la interfaz.

7.1 test_model.py

Verifica que el modelo realice predicciones correctamente.

logs/

Carpeta que contiene los registros del sistema.

8.1 training.log

Registra métricas del entrenamiento.

8.2 app.log

Guarda eventos y errores cuando la aplicación se ejecuta.

requirements.txt

Lista de dependencias necesarias para instalar el proyecto.

README.md

Documentación general del proyecto.