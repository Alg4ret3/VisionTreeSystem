from ultralytics import YOLO
import os
from pathlib import Path
import time
"-------------------------------------------------------------------------------------"
"Comando para entrenar el modelo YOLOv8"
# yolo train data=dataset.yaml model=yolov8n.pt epochs=50 imgsz=640 device=0 workers=0


# Cargar el modelo entrenado
model = YOLO('C:/Users/Sm/runs/detect/train3/weights/best.pt')

# Obtener lista de imágenes
image_paths = list(Path('E:/modelos/Yolo/value').glob('*.jpg'))

# Directorio para guardar los resultados
output_dir = Path('E:/modelos/Yolo/Results')
output_dir.mkdir(parents=True, exist_ok=True)

# Procesar cada imagen individualmente
for i, img_path in enumerate(image_paths):
    start_time = time.time()

    # Inferencia
    results = model(img_path)

    end_time = time.time()
    inference_time = (end_time - start_time) * 1000  # en milisegundos

    # Obtener precisión (score/confidencias)
    boxes = results[0].boxes
    if boxes is not None and boxes.conf is not None:
        confidences = boxes.conf.tolist()
    else:
        confidences = []

    # Imprimir resultados
    print(f"\n Imagen: {img_path.name}")
    print(f" Tiempo de inferencia: {inference_time:.2f} ms")
    print(f" Confianzas: {confidences if confidences else 'Sin detecciones'}")

    # Guardar imagen procesada
    result_filename = output_dir / f"result_{i+1}.jpg"
    results[0].save(result_filename)
