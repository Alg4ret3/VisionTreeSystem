import re
import matplotlib.pyplot as plt
from collections import defaultdict
import numpy as np
import os

# Ruta al archivo con los resultados
archivo_txt = '../../inference_outputs/global_results.txt'  # ajusta según ubicación real

# Diccionario para almacenar scores por especie
scores_por_especie = defaultdict(list)

# Leer el archivo y extraer los scores
with open(archivo_txt, 'r', encoding='utf-8') as file:
    for linea in file:
        match = re.search(r'- ([\w\s]+) \| Score: ([0-9.]+)', linea)
        if match:
            especie = match.group(1).strip()
            score = float(match.group(2))
            scores_por_especie[especie].append(score)

# Crear carpeta para guardar los histogramas
carpeta_salida = 'histograms_by_species'
os.makedirs(carpeta_salida, exist_ok=True)

# Colores personalizados por especie
colores_especies = {
    'Arrayan': 'purple',
    'Cipres': 'red',
    'Pino': 'gold',
    'Palo Santo': 'blue'
}

# Crear un histograma por especie
for especie, scores in scores_por_especie.items():
    plt.figure(figsize=(8, 5))
    
    color_histograma = colores_especies.get(especie, 'gray')
    plt.hist(scores, bins=10, range=(0.0, 1.0), color=color_histograma, edgecolor='black')

    plt.title(f'{especie} - Distribución de Scores')
    plt.xlabel('Score de Confianza')
    plt.ylabel('Cantidad de Imágenes')
    plt.grid(True, linestyle='--', alpha=0.6)
    plt.tight_layout()

    # Guardar imagen
    nombre_archivo = f"{carpeta_salida}/{especie.replace(' ', '_')}.png"
    plt.savefig(nombre_archivo)
    plt.close()

print(f"Histogramas generados")
