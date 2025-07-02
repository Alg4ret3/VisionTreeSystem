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

# Creamos una carpeta de salida para guardar los gráficos generados
carpeta_salida = 'graficos_especies'
os.makedirs(carpeta_salida, exist_ok=True)


colores_especies = {
    'Arrayan': 'purple',     
    'Cipres': 'red',          
    'Pino': 'gold',         
    'Palo Santo': 'blue'     
}

# Generamos una gráfica para cada especie
for especie, scores in scores_por_especie.items():
    x = list(range(1, len(scores) + 1))
    y = scores

    media = np.mean(y)
    std_dev = np.std(y)
    minimo = min(y)
    maximo = max(y)

    plt.figure(figsize=(8, 5))

    # Uso el color asignado según la especie
    color_linea = colores_especies.get(especie, 'gray')  # Por si hay alguna especie nueva no prevista
    plt.plot(x, y, marker='o', linestyle='-', color=color_linea, label='Score')

    # Línea horizontal para indicar la media
    plt.axhline(media, color='black', linestyle='--', label=f'Media: {media:.2f}')

    # Título y etiquetas
    plt.title(f'{especie} - Score por Imagen\nMin: {minimo:.2f}, Max: {maximo:.2f}, STD: {std_dev:.2f}')
    plt.xlabel('Número de Imagen')
    plt.ylabel('Score de Confianza')
    plt.ylim(0, 1.05)
    plt.grid(True)
    plt.legend()
    plt.tight_layout()

    # Guardamos cada gráfico con el nombre de la especie
    nombre_archivo = f"{carpeta_salida}/{especie.replace(' ', '_')}.png"
    plt.savefig(nombre_archivo)
    plt.close()

print("Gráficos generados")
