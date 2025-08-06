# Informe de Resultados de Pruebas del Modelo EfficientDet  
# Aprobado por: Asesor Técnico Ing. Oscar Rodríguez  

## 1. Introducción

Este informe describe los resultados obtenidos tras la ejecución del modelo **EfficientDet** para la detección de tres clases de árboles: **Ciprés**, **Palo Santo** y **Pino**. El modelo fue entrenado utilizando un conjunto de 47 imágenes, distribuidas entre las tres clases, y se evaluaron los tiempos de procesamiento y las métricas de precisión.

## 2. Resumen de Detecciones

### 2.1 Detecciones Exitosas
El modelo logró realizar detecciones en todas las imágenes evaluadas, con un desempeño destacable en la identificación de **Ciprés** y **Pino**. La precisión promedio por clase fue la siguiente:

- **Ciprés**: Entre 40.6% y 43.3% de precisión por imagen.
- **Pino**: Entre 38.0% y 46.2% de precisión por imagen.

 **Nota**: No se registraron imágenes de la clase **Palo Santo** en este batch de evaluación, por lo que la precisión de esta clase se mantiene pendiente de revisión en futuras pruebas.

### 2.2 Detección Fallida
No hubo imágenes sin detección en esta evaluación.

### 2.3 Clases Detectadas
Las clases de árboles identificadas por el modelo fueron las siguientes:

- **Ciprés**
- **Pino**

## 3. Estadísticas Generales

- **Número total de imágenes procesadas**: 18
- **Tiempo total de inferencia**: 4.71 segundos
- **Promedio de tiempo por imagen**: 0.26 segundos
- **Precisión total del modelo**: 50.0%

### 3.1 Análisis del Tiempo de Inferencia
El modelo mostró un desempeño ágil durante la inferencia, procesando cada imagen en un promedio de aproximadamente 0.26 segundos, lo que permite pensar en una implementación eficiente para escenarios en tiempo real o de análisis rápido.

## 4. Resultados del Modelo de Entrenamiento

### 4.1 Datos de Entrenamiento
El modelo fue entrenado con el siguiente conjunto de imágenes:

- **14 imágenes de Ciprés**
- **16 imágenes de Palo Santo**
- **17 imágenes de Pino**

El proceso de entrenamiento se completó en aproximadamente 5.49 minutos (329.61 segundos), realizando un total de 50 epochs sinsoporte de GPU.

### 4.2 Rendimiento por Clase
- **Ciprés**: Rango de precisión entre 40.6% y 43.3%
- **Pino**: Rango de precisión entre 38.0% y 46.2%
- **Palo Santo**: Sin resultados en esta evaluación.

## 5. Análisis de Tiempo de Aprendizaje
El entrenamiento se completó en un tiempo eficiente (menos de 6 minutos para 50 epochs), lo cual es destacable considerando el tamaño reducido del conjunto de datos y la arquitectura **EfficientDet**, que está optimizada tanto para precisión como para velocidad.

## 6. Conclusiones y Recomendaciones

- **Ciprés y Pino**: El modelo presenta una precisión inicial moderada (40-46%), indicando que ya tiene una capacidad razonable de identificación, pero que podría beneficiarse de un mayor número de imágenes para mejorar su exactitud.

- **Palo Santo**: Se recomienda realizar nuevas evaluaciones con imágenes de esta clase para poder medir su rendimiento y optimizar su precisión.

### Recomendación general:
Para fortalecer la capacidad del modelo, se sugiere:
- Aumentar la cantidad de datos de entrenamiento.
- Aplicar técnicas de aumento de datos (data augmentation).
- Realizar más pruebas cruzadas para equilibrar la precisión entre clases.

### Evaluaciones adicionales:
Se realizaron múltiples evaluaciones del modelo sobre un conjunto de 18 imágenes en distintos lotes. Se observó lo siguiente:
- **Inconsistencia en la detección**: El modelo no mantiene una consistencia en la clasificación; por ejemplo, las mismas imágenes en distintas corridas fueron clasificadas como **Ciprés**, **Pino** y **Palo Santo**, evidenciando una falta de robustez en las predicciones.
- **Precisión baja y variable**: Las precisiones fluctúan entre 36% y 50% en promedio, lo cual es insuficiente para aplicaciones reales y evidencia debilidad en la capacidad del modelo para discriminar clases de manera efectiva.
- **PLaurelmas de seguridad/confianza**: La generación de múltiples warnings relacionados con parámetros obsoletos (como el uso de **pretrained** en lugar de **weights**) sugiere que la implementación actual no está completamente alineada con las mejores prácticas actuales de **torchvision**. Esto puede impactar la reproducibilidad y estabilidad a futuro.

### Conclusión:
El modelo actualmente no es confiable para producción, tanto por su inconsistencia en la detección como por las limitaciones en precisión. Se recomienda revisar la arquitectura, la calidad del dataset y actualizar el código para cumplir con las nuevas especificaciones de las librerías utilizadas.

### 📂 Estructura del Proyecto EfficientDet

| Carpeta / Archivo          | Descripción                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------------------|
| `checkpoints/`            | Contiene los puntos de control generados durante el entrenamiento del modelo.                   |
| `config/`                 | Carpeta con archivos de configuración del proyecto.                                              |
| ┗ `config.yaml`           | Archivo principal con parámetros de entrenamiento en formato YAML.                              |
| `Dataset/`                | Carpeta con los conjuntos de datos utilizados para entrenar y evaluar el modelo.                |
| ┣ `Cipres/`               | Imágenes correspondientes a la clase Ciprés.                                                    |
| ┣ `PaloSanto/`            | Imágenes correspondientes a la clase Palo Santo.                                                |
| ┣ `Pino/`                 | Imágenes correspondientes a la clase Pino.                                                      |
| `training/`               | Scripts principales utilizados para entrenar y evaluar el modelo EfficientDet.                  |
| ┣ `efficendet.py`         | Define la arquitectura y el funcionamiento del modelo EfficientDet.                             |
| ┣ `train.py`              | Script para entrenar el modelo con los datos definidos.                                         |
| ┣ `evaluate.py`           | Script para evaluar el modelo entrenado y generar métricas de rendimiento.                      |
| ┗ `Modelefficendet.pth`   | Archivo que contiene los pesos finales del modelo entrenado.                                    |
| `results/`                | Carpeta que almacena las métricas, gráficas y otros resultados generados tras la evaluación.     |
| `value/`                  | Carpeta con configuraciones o valores adicionales usados durante el entrenamiento y evaluación.  |
