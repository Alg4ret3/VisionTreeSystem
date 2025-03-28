xplicación del Proyecto
Este repositorio contiene los archivos necesarios para desarrollar, entrenar y ejecutar el modelo de clasificación, junto con la interfaz gráfica y el código fuente para la predicción.

Estructura del Proyecto

1. env/

-Directorio que contiene el entorno virtual de Python, con todas las dependencias necesarias para el proyecto.

2. data/

Carpeta que contiene las imágenes utilizadas para entrenar, validar y probar el modelo:

-raw/: Imágenes sin procesar.

processed/: Imágenes que han sido preprocesadas.

test_samples/: Imágenes utilizadas para la evaluación del modelo.

train/: Datos de entrenamiento organizados por categorías o etiquetas.

val/: Datos de validación, con la misma estructura que la carpeta train/.

3. models/

Contiene los modelos entrenados y los checkpoints intermedios:

checkpoints/: Archivos que guardan los pesos intermedios durante el proceso de entrenamiento.

final_model.h5: Modelo final entrenado listo para la predicción.

4. src/

Código fuente del proyecto:

train.py: Script principal para entrenar el modelo.

predict.py: Permite hacer predicciones utilizando el modelo entrenado.

preprocess.py: Contiene las funciones para la preprocesamiento de las imágenes.

config.py: Configuraciones del modelo y rutas a los archivos.

5. ui/

Archivos relacionados con la interfaz gráfica del usuario:

static/: Archivos estáticos como iconos e imágenes.

templates/: Archivos HTML si se utiliza un motor de plantillas para la interfaz.

main.ui: Archivo de diseño de la interfaz creado con Qt Designer.

main_window.py: Código generado por PyQt desde el archivo main.ui.

app.py: Conecta la interfaz gráfica con el modelo.

6. notebooks/

Carpeta que contiene experimentos y pruebas realizadas en Jupyter Notebooks:

data_exploration.ipynb: Notebooks de exploración de los datos.

model_training.ipynb: Notebooks con las pruebas de entrenamiento del modelo.

7. tests/

Contiene las pruebas unitarias para el proyecto:

test_model.py: Verifica que el modelo realice predicciones de manera adecuada.

8. logs/

Carpeta para los archivos de registro del sistema:

training.log: Registra las métricas de entrenamiento del modelo.

app.log: Registra los eventos que ocurren cuando se ejecuta la aplicación.

9. requirements.txt

Contiene las dependencias necesarias para instalar el proyecto.

10. README.md

Este archivo contiene la documentación del proyecto.