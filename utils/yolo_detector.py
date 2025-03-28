import cv2
from ultralytics import YOLO

class YOLODetector:
    def __init__(self, modelo_path):
        # Cargar el modelo preentrenado de YOLOv8
        self.modelo = YOLO(modelo_path)  # Usamos el modelo 'final_model.h5'

    def detect(self, frame):
        # Realizar la detección de objetos en el frame de la cámara
        results = self.modelo(frame)

        # Dibujar los cuadros delimitadores sobre el frame
        for result in results.xywh[0]:  # 'xywh' contiene las coordenadas de los cuadros
            x, y, w, h, conf, cls = result
            x1, y1 = int((x - w / 2) * frame.shape[1]), int((y - h / 2) * frame.shape[0])
            x2, y2 = int((x + w / 2) * frame.shape[1]), int((y + h / 2) * frame.shape[0])

            # Dibujar el cuadro en el fotograma
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            label = f"{self.modelo.names[int(cls)]} {conf:.2f}"
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        return frame  # Devolver el fotograma con las detecciones dibujadas
