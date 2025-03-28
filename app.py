import sys
import cv2
from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import QFileDialog
from ui.Ventana_Principal import (
    Ui_MainWindow,
) 
from utils.yolo_detector import YOLODetector 



class MiVentana(QtWidgets.QMainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        # Instanciar el detector de YOLO
        self.detector = YOLODetector("models/final_model.h5")  # Ruta a tu modelo preentrenado de YOLO


        # Conectar botones a sus funciones
        self.ui.BtnSalir.clicked.connect(self.salir)
        self.ui.BtnSubir.clicked.connect(self.subir_imagen)

        # Inicializar cámara
        self.cap = cv2.VideoCapture(0)
        self.timer = QtCore.QTimer(self)
        self.timer.timeout.connect(self.actualizar_imagen_camara)
        self.timer.start(30)  # Captura la imagen cada 30 ms (aproximadamente 30 FPS)
        self.ui.ImgDefecto.setPixmap(QtGui.QPixmap("ui/static/blog_placeholder.jpg"))
        self.ui.label.setPixmap(QtGui.QPixmap("ui/static/IconoTesisAc.png"))
        # Asignar iconos a botones
        self.set_icon(self.ui.BtnSalir, "ui/static/logout.png")
        self.set_icon(self.ui.BtnSubir, "ui/static/folder-upload.png")
        self.set_icon(self.ui.toolButton, "ui/static/tree.png")
        self.set_icon(self.ui.toolButton_2, "ui/static/attribution-pencil.png")
        self.set_icon(self.ui.toolButton_3, "ui/static/earth.png")
        self.set_icon(self.ui.toolButton_4, "ui/static/massage.png")
        self.set_icon(self.ui.toolButton_5, "ui/static/chart-tree.png")
        self.ui.LabelCamara.setSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Expanding)

        
        # Abrir la ventana maximizada
        self.showMaximized()  # Esto maximiza la ventana al iniciar

    def set_icon(self, widget, icon_path):
        """Asigna un icono a un widget"""
        icon = QtGui.QIcon(QtGui.QPixmap(icon_path))
        widget.setIcon(icon)
    def actualizar_imagen_camara(self):
        # Capturar un frame de la cámara
        ret, frame = self.cap.read()

        if ret:
                
            # Invertir la imagen horizontalmente (efecto espejo)
            frame = cv2.flip(frame, 1)
            # Convierte el frame de BGR a RGB (OpenCV usa BGR por defecto)
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Convierte el frame en un formato QImage
            h, w, ch = frame_rgb.shape
            bytes_per_line = ch * w
            qimg = QtGui.QImage(
                frame_rgb.data, w, h, bytes_per_line, QtGui.QImage.Format_RGB888
            )

            # Convertir QImage a QPixmap para mostrarlo en el QLabel
            pixmap = QtGui.QPixmap.fromImage(qimg)

            # Obtener el tamaño actual del QLabel (donde se muestra la cámara)
            label_size = self.ui.LabelCamara.size()

            # Asegurarse de que el QLabel se ajuste correctamente al redimensionarse
            pixmap = pixmap.scaled(
                label_size,  # Nuevo tamaño
                QtCore.Qt.KeepAspectRatio,  # Mantener la relación de aspecto
                QtCore.Qt.SmoothTransformation  # Suavizar la transformación para mejor calidad
            )

            # Mostrar el QPixmap escalado en el QLabel
            self.ui.LabelCamara.setPixmap(pixmap)

            # Ajustar la política de tamaño del QLabel
            self.ui.LabelCamara.setSizePolicy(QtWidgets.QSizePolicy.Expanding, QtWidgets.QSizePolicy.Expanding)
            self.ui.LabelCamara.setScaledContents(True)


    def subir_imagen(self):
        # Abrir un cuadro de diálogo para seleccionar una imagen
        options = QFileDialog.Options()
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "Selecciona una imagen",
            "",
            "Imágenes (*.png *.xpm *.jpg);;Todos los archivos (*)",
            options=options,
        )
        if file_path:
            # Cambiar la imagen de ImgDefecto
            pixmap = QtGui.QPixmap(file_path)
            self.ui.ImgDefecto.setPixmap(pixmap)
            self.ui.ImgDefecto.setScaledContents(True)  # Ajustar la imagen al QLabel

            # Aquí iría el código para procesar la imagen y mostrar la información del árbol
            self.mostrar_informacion_arbol(file_path)

    def mostrar_informacion_arbol(self, file_path):
        # Aquí llamas al modelo de Machine Learning y haces la predicción
        # Supongamos que el modelo devuelve un diccionario con la información
        arbol_info = self.modelo_machine_learning(file_path)

        # Actualizar las etiquetas con la información del árbol
        self.ui.LabelNombre1.setText(arbol_info["nombre1"])
        self.ui.LabelNombre2.setText(arbol_info["nombre2"])
        self.ui.LabelDistribucion.setText(arbol_info["distribucion"])
        self.ui.LabelFloracion.setText(arbol_info["floracion"])
        self.ui.LabelFamilia.setText(arbol_info["familia"])

    def modelo_machine_learning(self, imagen):
        # Aquí va tu lógica de predicción del modelo
        # Ejemplo de respuesta ficticia del modelo:
        return {
            "nombre1": "Árbol 1",
            "nombre2": "Especie X",
            "distribucion": "Región tropical",
            "floracion": "Verano",
            "familia": "Familia Y",
        }

    def salir(self):
        # Cerrar la aplicación
        self.close()

    def closeEvent(self, event):
        # Detener la cámara cuando la ventana se cierra
        self.cap.release()
        event.accept()


if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    ventana = MiVentana()
    ventana.show()
    sys.exit(app.exec())
