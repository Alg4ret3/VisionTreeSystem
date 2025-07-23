import re
import matplotlib.pyplot as plt
from collections import defaultdict
import numpy as np
import os

# Ruta al archivo que contiene los resultados
archivo_txt = '../../inference_outputs/global_results.txt'

# Diccionario para almacenar los scores por especie
scores_por_especie = defaultdict(list)

# Leemos línea por línea el archivo de resultados y extraemos especie y score
with open(archivo_txt, 'r', encoding='utf-8') as file:
    for linea in file:
        match = re.search(r'- ([\w\s]+) \| Score: ([0-9.]+)', linea)
        if match:
            especie = match.group(1).strip()
            score = float(match.group(2))
            scores_por_especie[especie].append(score)

# Crear carpeta de salida
carpeta_salida = 'detection_score_trends'
os.makedirs(carpeta_salida, exist_ok=True)

# Colores personalizados
colores_especies = {
    'Laurel Blanco': 'purple',
    'Cipres': 'red',
    'Pino': 'gold',
    'Palo Santo': 'blue'
}

# Crear subplots
n = len(scores_por_especie)
fig, axs = plt.subplots(n, 1, figsize=(10, 4 * n))

if n == 1:
    axs = [axs]  # Asegurar iterabilidad si hay solo una especie

for ax, (especie, scores) in zip(axs, scores_por_especie.items()):
    x = list(range(1, len(scores) + 1))
    y = scores

    media = np.mean(y)
    std_dev = np.std(y)
    minimo = min(y)
    maximo = max(y)

    color = colores_especies.get(especie, 'gray')

    ax.plot(x, y, marker='o', linestyle='-', color=color, label='Score')
    ax.axhline(0.75, color='orange', linestyle=':', linewidth=2, label='Score minimo aceptado 0.75')
    ax.axhline(media, color='black', linestyle='--', label=f'Media: {media:.2f}')
    ax.set_title(f'{especie} - Score por Imagen\nMin: {minimo:.2f}, Max: {maximo:.2f}, STD: {std_dev:.2f}')
    ax.set_xlabel('Número de Imagen')
    ax.set_ylabel('Score de Confianza')
    ax.set_ylim(0, 1.05)
    ax.grid(True)
    ax.legend()

# Ajustar y guardar
plt.tight_layout()
ruta_salida = os.path.join(carpeta_salida, 'score_por_imagen_todas_las_especies.png')
plt.savefig(ruta_salida)
plt.close()

print(f" Gráfico  guardado.")
