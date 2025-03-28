Estructura General

1. env/
Contiene el entorno virtual de Python con todas las dependencias instaladas para el proyecto.

2. data/
Contiene todas las imágenes necesarias para entrenar, validar y probar el modelo.

raw/ → Imágenes originales sin procesar.

processed/ → Imágenes preprocesadas (redimensionadas, normalizadas, etc.).

test_samples/ → Imágenes de prueba para evaluar el modelo.

train/ → Conjunto de entrenamiento (dividido en carpetas según la especie del árbol).

val/ → Conjunto de validación (misma estructura que train/).

3. models/
Contiene los modelos entrenados.

checkpoints/ → Guardado de pesos intermedios durante el entrenamiento.

final_model.h5 → Modelo final entrenado, listo para hacer predicciones.

4. src/
Código fuente del proyecto.

train.py → Entrenamiento del modelo.

predict.py → Permite hacer predicciones con imágenes nuevas.

preprocess.py → Contiene funciones para preprocesar imágenes antes del entrenamiento.

config.py → Parámetros generales, como rutas de archivos y configuraciones del modelo.

5. ui/
Contiene la interfaz gráfica creada con PyQt6 o Qt Designer.

static/ → Archivos estáticos como iconos y hojas de estilo.

templates/ → Archivos HTML si la interfaz usa QWebEngineView o es una aplicación híbrida.

main.ui → Archivo original de Qt Designer.

main_window.py → Código generado a partir de main.ui usando pyuic6.

app.py → Código que conecta la UI con el modelo.

6. notebooks/
Contiene experimentos y pruebas en Jupyter Notebook.

data_exploration.ipynb → Análisis de imágenes y estadísticas del dataset.

model_training.ipynb → Pruebas con el entrenamiento del modelo.

7. tests/
Contiene pruebas automáticas para el modelo y la interfaz.

test_model.py → Verifica que el modelo clasifica correctamente.

8. logs/
Contiene registros del sistema.

training.log → Guarda métricas del entrenamiento.

app.log → Guarda eventos cuando la aplicación se ejecuta.

9. requirements.txt
Lista de dependencias necesarias para instalar el proyecto.

10. README.md
Documentación general del proyecto.