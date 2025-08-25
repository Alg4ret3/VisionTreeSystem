# Informe de Resultados de Pruebas del Modelo YOLO
# Aprobado por: Asesor Tecnico Ing Oscar Rodriguez

## 1. Introducción

Este informe describe los resultados obtenidos tras la ejecución del modelo YOLO para la detección de tres clases de árboles: **Ciprés**, **Palo Santo** y **Pino**. El modelo fue entrenado utilizando un conjunto de 47 imágenes, distribuidas entre las tres clases, y se evaluaron los tiempos de procesamiento y las métricas de precisión.

## 2. Resumen de Detecciones

### 2.1 Detecciones Exitosas
La mayoría de las imágenes fueron correctamente detectadas, con un alto nivel de confianza. En la mayoría de los casos, la confianza de las detecciones fue superior al 0.9.

### 2.2 Detección Fallida
- **Imagen sin detección**: `IMG_20250314_121830_TIMEBURST22.jpg` no fue detectada por el modelo.

### 2.3 Clases Detectadas
Las clases de árboles identificadas por el modelo fueron las siguientes:
- **Ciprés**
- **Palo Santo**
- **Pino**

## 3. Estadísticas Generales

- **Número total de imágenes procesadas**: 20
- **Tiempo promedio de inferencia por imagen**: 154.87 ms (rango: 127.44 ms a 4402.10 ms).
- **Tiempo promedio de preprocesamiento por imagen**: 5.19 ms.
- **Tiempo promedio de postprocesamiento por imagen**: 2.49 ms.

### 3.1 Análisis del Tiempo de Inferencia
Si bien la mayoría de las imágenes se procesaron en tiempos cercanos a los 150 ms, se detectó un caso atípico con un tiempo de inferencia mucho más largo (4402.10 ms), lo que podría deberse a un error de procesamiento o una característica excepcional de esa imagen en particular.

## 4. Resultados del Modelo de Entrenamiento

### 4.1 Datos de Entrenamiento
El modelo fue entrenado con un conjunto de imágenes compuesto por:
- **14 imágenes de Ciprés**
- **16 imágenes de Palo Santo**
- **17 imágenes de Pino**

El proceso de entrenamiento se completó en **1.123 horas**, lo que equivale a un tiempo promedio de **7.4 minutos por imagen**, con un total de **50 iteraciones** realizadas en la **GPU**.

### 4.2 Rendimiento por Clase
Los resultados del rendimiento del modelo para cada clase son los siguientes:

- **Ciprés**: Precisión superior al **95%**. El modelo mostró un rendimiento excelente en esta clase, con una capacidad destacada para distinguir correctamente el Ciprés en las imágenes.
  
- **Palo Santo**: Precisión inferior al **40%**. El rendimiento en esta clase es mediocre, lo que sugiere que el modelo necesita ser ajustado y entrenado con más datos o técnicas específicas para mejorar la precisión.

- **Pino**: Precisión superior al **85%**. El modelo mostró un buen rendimiento en la clase de Pino, con una precisión notablemente alta.

## 5. Análisis de Tiempo de Aprendizaje

El tiempo necesario para que el modelo aprenda a diferenciar correctamente las clases parece ser adecuado, con tiempos de inferencia dentro de rangos razonables. Sin embargo, la clase **Palo Santo** presenta una precisión significativamente baja, lo que indica que el modelo aún necesita ajustes para mejorar su capacidad de diferenciación en esa clase. El entrenamiento adicional y la mejora en los datos de entrada podrían ser necesarios para obtener mejores resultados en esta clase.

## 6. Conclusiones y Recomendaciones

- **Ciprés y Pino**: El modelo es muy competente para detectar estas clases con alta precisión. No se requieren ajustes significativos para mejorar el rendimiento en estas clases.
- **Palo Santo**: El rendimiento en esta clase es inadecuado, con una precisión inferior al 40%. Se recomienda recolectar más datos de entrenamiento y aplicar técnicas de mejora, como el balanceo de clases o el ajuste de hiperparámetros, para mejorar la precisión de esta clase.

Para mejorar el rendimiento general, se recomienda realizar un nuevo ciclo de entrenamiento, centrado principalmente en la clase de **Palo Santo**, y considerar la ampliación del conjunto de datos con más ejemplos representativos de cada clase.

### 📂 Estructura del Proyecto YOLO

| Carpeta / Archivo        | Descripción                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------------------|
| `Dataset/`               | Carpeta que contiene los datos de entrenamiento.                                               |
| ┣ `Cipres/`              | Imágenes y etiquetas correspondientes a la clase Ciprés.                                       |
| ┣ `PaloSanto/`           | Imágenes y etiquetas correspondientes a la clase Palo Santo.                                   |
| ┣ `Pino/`                | Imágenes y etiquetas correspondientes a la clase Pino.                                         |
| `Val/`                   | Carpeta que contiene los datos de validación para evaluar el modelo.                            |
| `Result/`                | Carpeta donde se almacenan los resultados generados durante las pruebas y predicciones.         |
| `dataset.yaml`           | Archivo de configuración con rutas a las imágenes y definición de clases.                       |
| `testeo.py`              | Script utilizado para probar o evaluar el modelo entrenado en datos no vistos.                  |
| `yolo11.pt`              | Archivo que contiene los pesos entrenados del modelo YOLO versión 11.                            |
| `yolo8.pt`               | Archivo que contiene los pesos entrenados del modelo YOLO versión 8.                              |
