# Informe de Resultados de Pruebas del Modelo Detectron2  
# Aprobado por: Asesor Tecnico Ing Oscar Rodriguez

## 1. Introducción

Este informe documenta los resultados obtenidos al ejecutar el modelo **Detectron2** para la detección de tres clases de árboles: **Ciprés**, **Palo Santo** y **Pino**. El modelo fue entrenado utilizando un conjunto de datos balanceado y se analizaron tanto los resultados de inferencia como el rendimiento durante el entrenamiento.

## 2. Resumen de Detecciones

### 2.1 Detecciones Exitosas

La mayoría de las imágenes fueron detectadas exitosamente, con niveles de confianza superiores al 99% para todas las clases en múltiples imágenes consecutivas. Se evidenció un desempeño sólido del modelo ante variaciones mínimas entre imágenes del mismo conjunto.

### 2.2 Detección Fallida

- No se registraron fallos de detección total, pero se evidenciaron **confianzas moderadas** en una imagen (IMG_20250314_121830_TIMEBURST22.jpg), donde la predicción mostró tres objetos de la misma clase con valores de confianza más bajos (0.96, 0.82, 0.50), lo cual indica una posible **sobredetección o ruido visual**.

### 2.3 Clases Detectadas

Las clases detectadas por el modelo durante las pruebas fueron:

- **Ciprés** – Clase 0  
- **Palo Santo** – Clase 1  
- **Pino** – Clase 2

## 3. Estadísticas Generales

- **Número total de imágenes procesadas**: 18  
- **Tiempo promedio de inferencia por imagen**: 0.23 segundos  
- **Rango de tiempo de inferencia**: 0.18 s a 1.07 s

### 3.1 Análisis del Tiempo de Inferencia

El tiempo de inferencia fue bastante estable entre las imágenes, destacándose una única imagen con un tiempo ligeramente superior al segundo (IMG_20250314_120612_TIMEBURST16.jpg), lo cual puede atribuirse a condiciones de entrada distintas. En general, el rendimiento fue óptimo y apto para aplicaciones en tiempo casi real.

## 4. Resultados del Modelo de Entrenamiento

### 4.1 Datos de Entrenamiento

El modelo fue entrenado utilizando la librería **Detectron2**, desarrollada por Facebook AI. El proceso de entrenamiento se ejecutó mediante **GPU**, con un total de **2298 iteraciones** completadas en **21 minutos y 43 segundos**.

- **Modelo entrenado en ruta**: `E:/modelos/Detectron2/Scripts`  
- **Resultados almacenados en**: `E:/modelos/Detectron2/data/Results`

### 4.2 Rendimiento por Clase

- **Ciprés (Clase 0)**:  
  - Detectado con confianza superior al 99.1% en todas las imágenes evaluadas.
  - Tiempo de inferencia promedio: 0.22 s  

- **Palo Santo (Clase 1)**:  
  - Detectado con confianza entre **98.3% y 99.2%**.  
  - Se identificaron múltiples detecciones en una imagen con puntuaciones inferiores (0.96, 0.82, 0.50), que deben ser revisadas.

- **Pino (Clase 2)**:  
  - Consistentemente detectado con **confianza mayor al 99%**.
  - Mantuvo una precisión alta incluso con variaciones leves en condiciones visuales.

## 5. Análisis del Tiempo de Aprendizaje

El modelo mostró un desempeño excelente en términos de velocidad de entrenamiento y respuesta durante la inferencia. Con un tiempo total de menos de 22 minutos, se logró entrenar un modelo robusto con buena generalización para las tres clases. Esto demuestra la eficiencia del backend GPU y la solidez de la arquitectura de Detectron2.

## 6. Conclusiones y Recomendaciones

- **Ciprés y Pino**: Se logró una detección confiable y precisa en la mayoría de imágenes, con scores superiores al 99%. No se requieren ajustes inmediatos en estas clases.

- **Palo Santo**: Aunque la mayoría de predicciones fueron correctas, en una imagen específica se observaron múltiples detecciones de la misma clase con scores dispares. Se recomienda revisar esa muestra y considerar técnicas de ajuste fino o aumento de datos para esa clase en particular.


# Estructura del Proyecto DETECTRON2

### 📂 Estructura del Proyecto Detectron2

| Carpeta / Archivo              | Descripción                                                                                     |
|--------------------------------|-------------------------------------------------------------------------------------------------|
| `config/`                      | Carpeta que contiene la configuración del proyecto.                                            |
| ┗ `detectron2.yml`             | Archivo de configuración principal del modelo Detectron2.                                      |
| `data/`                        | Carpeta que contiene los datos de entrenamiento y validación.                                  |
| ┣ `imagenes/`                  | Carpeta con las imágenes normales del dataset.                                                 |
| ┗ `imagenes.xml/`              | Carpeta con las imágenes etiquetadas en formato XML.                                           |
| `resultados/`                  | Carpeta donde se almacenan los resultados del modelo entrenado.                                |
| `scripts/`                     | Carpeta con los scripts utilizados para entrenar y evaluar el modelo.                          |
| ┣ `model-final.pth`            | Archivo con los pesos finales del modelo entrenado.                                            |
| ┣ `dataset.coco.js`            | Archivo en formato JavaScript que contiene la información del dataset en formato COCO.         |
| ┣ `dataset.coco.json`          | Archivo en formato JSON que contiene la información del dataset en formato COCO.               |
| ┣ `inference.py`               | Script para hacer inferencias con el modelo entrenado.                                         |
| ┣ `prueba.py`                  | Script para realizar pruebas o evaluaciones del modelo.                                        |
| ┣ `register.py`                | Script para registrar el dataset en el modelo.                                                 |
| ┣ `testmodel.detectron.py`     | Script para evaluar el modelo con los datos de prueba.                                         |
| ┗ `trainmodel.py`              | Script para entrenar el modelo.                                                                |
| `value/`                       | Carpeta con las imágenes de evaluación para validar el modelo.                                  |
