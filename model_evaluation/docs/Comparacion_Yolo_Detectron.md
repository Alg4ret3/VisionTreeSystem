# Informe de Comparativa Final entre YOLOv8 y Detectron2
# Aprobado por: Asesor Técnico Ing. Oscar Rodríguez

## 1. Introducción

Este informe describe una comparación detallada entre dos modelos de detección de objetos, **YOLOv8** y **Detectron2**, evaluados para la clasificación automática de  clases de árboles: **Ciprés**, **Palo Santo** y **Pino**. Ambas arquitecturas fueron sometidas a pruebas exhaustivas en cuanto a tiempos de entrenamiento, inferencia y precisión en un dataset compuesto por 549 imágenes.

## 2. Resumen de Resultados

### 2.1 Tiempos de Entrenamiento
- **YOLOv8**: El entrenamiento se realizó con GPU (CUDA) y el proceso tomó **1 hora, 51 minutos y 58 segundos**.
- **Detectron2**: El entrenamiento fue completado en **22 minutos y 8 segundos**, con un total de **2,992 iteraciones**.

### 2.2 Tiempos de Inferencia

#### **YOLOv8**:
- **Tiempo promedio de inferencia por imagen**: Variación entre **124.12 ms** y **3690.84 ms**, con la mayoría de los tiempos entre **170 ms y 220 ms**.
- **Confianza de predicciones**: Promedio superior al **85%**, alcanzando hasta un **96.7%** en algunos casos.


#### **Detectron2**:
- **Tiempo promedio de inferencia por imagen**: Entre **199 ms y 297 ms**, con un caso inicial de 1.29 segundos.
- **Confianza de predicciones**: Generalmente por encima del **98%**.


### 2.3 Conexión con la Cámara y Resultados en Tiempo Real
Detectron2 demostró un excelente rendimiento al integrarse con una cámara para pruebas en tiempo real. Se logró un desempeño óptimo con alta precisión en la clasificación de árboles, manteniendo respuestas rápidas durante el proceso.

## 3. Comparación de Desempeño

### 3.1 Precisión y Robustez
- **YOLOv8**: Mostró un rendimiento consistente en términos de precisión, aunque con tiempos de inferencia más variables, con picos de hasta 3690.84 ms. La confianza de predicción varió, alcanzando hasta un **96.7%**.
  
- **Detectron2**: Superó a YOLOv8 en términos de tiempos de inferencia más consistentes y rápidos, con tiempos promedio que oscilan entre **199 ms y 297 ms**. Además, presentó una **alta confianza de predicción**, con valores consistentemente superiores al **98%**.

### 3.2 Rendimiento en Tiempo Real
La integración de **Detectron2** con la cámara resultó en un desempeño notablemente superior en entornos en tiempo real, con una mayor precisión y velocidad de respuesta. **YOLOv8**, si bien eficiente, presentó algunos problemas de latencia en casos atípicos.

## 4. Conclusiones

- **YOLOv8** y **Detectron2** fueron los modelos más destacados durante las evaluaciones preliminares. Sin embargo, **Detectron2** demostró ser superior en términos de **precisión**, **rapidez** y **consistencia** en la inferencia.
  
- **Detectron2** ha sido seleccionado como el modelo definitivo para la clasificación automática de árboles, gracias a su mejor desempeño tanto en pruebas de inferencia como en condiciones en tiempo real.

- **Detectron2** es el modelo recomendado para implementar en producción.