# Carpeta de Análisis de Resultados de Inferencia (`inference_analysis`)

Este Carpeta tiene como objetivo analizar visualmente los resultados de inferencia generados por el modelo Detectron2. Su propósito es brindar una comprensión más profunda del comportamiento del modelo a través de visualizaciones estadísticas como gráficos de tendencia e histogramas enfocados por especie.

El Carpeta está compuesto por dos subcomponentes principales:
- `score_visualizations`: evalúa la evolución temporal del score por especie.
- `score_distribution_analysis`: explora cómo se distribuyen los scores por especie en forma de histogramas.

## Estructura del Carpeta

| Carpeta / Archivo                                 | Descripción                                                                 |
|--------------------------------------------------|-----------------------------------------------------------------------------|
| `inference_analysis/`                            | Carpeta principal de análisis de resultados post-inferencia.                |
| ┣ `score_visualizations/`                        | Carpeta donde se aloja el script principal y la donde se guarda la carpeta conm los graficos. |
| ┃ ┣ `score_trend_by_species.py`                  | Script que genera gráficos de línea para mostrar la evolución del score por imagen para cada especie detectada. |
| ┣ `score_distribution_analysis/`                 | Carpeta donde se aloja el script principal y la donde se guarda la carpeta conm los graficos.    |
| ┃ ┗ `score_histogram_by_species.py`              | Script que genera histogramas detallando cuántas imágenes caen en cada rango de score por especie. |
| ┗ `__init__.py`                                  | Archivo vacío para marcar el Carpeta como importable.                       |


## Análisis de Scripts

### `score_trend_by_species.py`
- **Tipo de gráfico:** Línea (Line plot) por especie.
- **Objetivo:** Observar si el modelo mantiene scores consistentes por especie a través de múltiples imágenes.
- **Salida:** Imágenes `.png` por especie, mostrando cómo varía el score de confianza imagen por imagen.
- **Colores usados por especie:**
  - Laurel Blanco → morado
  - Cipres → rojo
  - Pino → amarillo
  - Palo Santo → azul
- **Cómo interpretar:**  
  El eje X representa el orden secuencial de imágenes evaluadas, mientras que el eje Y muestra el score de confianza. Las líneas indican si la predicción del modelo se mantiene estable (línea horizontal), mejora (línea ascendente) o se deteriora (línea descendente) a lo largo del conjunto de inferencia. Se incluye una línea de promedio (media) para facilitar la interpretación.

---

### `score_histogram_by_species.py`
- **Tipo de gráfico:** Histograma por especie.
- **Objetivo:** Visualizar la distribución de scores de inferencia agrupados por rangos (bins) para cada especie.
- **Salida:** Histograma por especie en formato `.png`, con barras de colores distintos.
- **Cómo interpretar:**  
  El eje X muestra los rangos de score (por ejemplo, 0.85–0.9, 0.9–0.95, etc.), mientras que el eje Y indica cuántas imágenes obtuvieron un score dentro de ese rango. Esto permite identificar si el modelo tiende a predecir con alta, baja o variable confianza según la especie.

---

## Uso General

1. Asegúrate de haber ejecutado previamente el modelo y generado el archivo `global_results.txt` dentro de la carpeta `inference_outputs/`.
2. Ejecuta `score_trend_by_species.py` para generar gráficos de evolución de score por especie.
3. Ejecuta `score_histogram_by_species.py` para obtener histogramas de distribución de scores por especie.

---


