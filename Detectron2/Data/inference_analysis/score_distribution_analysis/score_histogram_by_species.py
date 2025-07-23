import re
import matplotlib.pyplot as plt
from collections import defaultdict
import numpy as np
import os

# Ruta al archivo de resultados
archivo_txt = '../../inference_outputs/global_results.txt'

# Diccionario para almacenar los scores por especie
scores_por_especie = defaultdict(list)

# Leer el archivo y extraer los datos
with open(archivo_txt, 'r', encoding='utf-8') as file:
    for linea in file:
        match = re.search(r'- ([\w\s]+) \| Score: ([0-9.]+)', linea)
        if match:
            especie = match.group(1).strip()
            score = float(match.group(2))
            scores_por_especie[especie].append(score)

# Crear carpeta de salida si no existe
carpeta_salida = 'histograms_by_species'
os.makedirs(carpeta_salida, exist_ok=True)

# Colores personalizados por especie
colores_especies = {
    'Laurel Blanco': 'purple',
    'Cipres': 'red',
    'Pino': 'gold',
    'Palo Santo': 'blue'
}

# Número de subgráficos = número de especies
n = len(scores_por_especie)
fig, axs = plt.subplots(n, 1, figsize=(8, 4 * n))

# Asegurarse de que axs sea iterable
if n == 1:
    axs = [axs]

# Crear los subgráficos
for ax, (especie, scores) in zip(axs, scores_por_especie.items()):
    color = colores_especies.get(especie, 'gray')
    bins = np.arange(0.0, 1.05, 0.05)
    ax.hist(scores, bins=bins, color=color, edgecolor='black')

    ax.axvline(0.75, color='orange', linestyle=':', linewidth=2, label='Score mínimo aceptado (0.75)')
    ax.set_title(f'{especie} - Distribución de Scores')
    ax.set_xlabel('Score de Confianza')
    ax.set_ylabel('Cantidad de Imágenes')
    ax.grid(True, linestyle='--', alpha=0.5)
    ax.legend()

# Ajustar diseño y guardar
plt.tight_layout()
ruta_salida = os.path.join(carpeta_salida, 'histograma_todas_las_especies.png')
plt.savefig(ruta_salida)
plt.close()

print(f"Histograma guardado.")
