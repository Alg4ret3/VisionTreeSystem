import torch
from torch.utils.data import Dataset, DataLoader
import torch.nn as nn
import torch.optim as optim
import os
import cv2
import json
import numpy as np
from torchvision import transforms, models
import time  # Para medir el tiempo de entrenamiento

# Definir las clases en el modelo 
class_names = {0: 'Cipres', 1: 'Palosanto', 2: 'Pino'}

# Clase Dataset personalizada
class CustomDataset(Dataset):
    def __init__(self, data_path, annotations_path, transform=None):
        self.data_path = data_path
        self.annotations_path = annotations_path
        self.transform = transform 

        # Cargar las anotaciones desde el archivo JSON
        with open(self.annotations_path, 'r') as f:
            self.annotations = json.load(f)

        # Verificar el contenido del JSON para asegurarnos de cómo están estructurados
        print("Primeras 2 imágenes en las anotaciones:", self.annotations["images"][:2])  # Ver las primeras 2 imágenes

        # Listar los nombres de las imágenes
        self.image_files = [item['file_name'] for item in self.annotations["images"]]


        self.targets = [item['annotations'] if 'annotations' in item else [] for item in self.annotations["images"]]

        # Contar las clases únicas presentes en las anotaciones
        all_classes = set()
        for annotation in self.targets:
            for ann in annotation:
                all_classes.add(ann['category_id'])  

        self.num_classes = len(all_classes)
        print(f"Clases encontradas: {self.num_classes}")

    def __len__(self):
        return len(self.image_files)

    def __getitem__(self, idx):
        img_path = os.path.join(self.data_path, self.image_files[idx])
        image = cv2.imread(img_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        
        annotations = self.targets[idx]
        boxes = np.array([ann['bbox'] for ann in annotations])  # Asumiendo que la caja está en 'bbox'
        category_ids = np.array([ann['category_id'] for ann in annotations])  # Obtener las ids de categoría

        # Aplicar las transformaciones si están definidas
        if self.transform:
            image = self.transform(image)

        return image, boxes, category_ids

# Definición del modelo EfficientDet (simplificado)
class EfficientDet(nn.Module):
    def __init__(self, num_classes):
        super(EfficientDet, self).__init__()
        self.backbone = models.resnet50(pretrained=True)
        self.backbone.fc = nn.Identity()  # Remover la capa final de ResNet

        # Capa de FPN (simplificada)
        self.fpn = nn.Conv2d(2048, 512, kernel_size=3, padding=1)

        # Capa de predicción para clases y cajas (simplificada)
        self.class_head = nn.Linear(512, num_classes)
        self.bbox_head = nn.Linear(512, 4)  # Predicción de las 4 coordenadas de la caja

    def forward(self, x):
        features = self.backbone(x)
        features = features.view(features.size(0), -1)  # Aplanar las características
        features = self.fpn(features.unsqueeze(-1).unsqueeze(-1))  # Pasa las características por FPN

        class_preds = self.class_head(features)
        bbox_preds = self.bbox_head(features)

        return class_preds, bbox_preds

# Función de pérdida (combinada: clasificación + regresión de cajas)
def loss_fn(class_preds, bbox_preds, class_labels, bbox_labels):
    class_loss = nn.CrossEntropyLoss()(class_preds, class_labels)
    bbox_loss = nn.L1Loss()(bbox_preds, bbox_labels)
    return class_loss + bbox_loss

# Función de entrenamiento con más detalles en la salida
def train_loop(dataloader, model, optimizer, device):
    size = len(dataloader.dataset)
    model.train()  # Establecer el modelo en modo de entrenamiento
    running_loss = 0.0
    for batch, (X, y_boxes, y_classes) in enumerate(dataloader):
        try:
            X, y_boxes, y_classes = X.to(device), y_boxes.to(device), y_classes.to(device)  # Mover los datos a la GPU/CPU

            # Predicción y cálculo de la pérdida
            class_preds, bbox_preds = model(X)

            # Usamos las clases y las cajas para calcular la pérdida
            loss = loss_fn(class_preds, bbox_preds, y_classes, y_boxes)

            # Backpropagation
            optimizer.zero_grad()  # Limpiar los gradientes anteriores
            loss.backward()  # Calcular los nuevos gradientes
            optimizer.step()  # Actualizar los pesos del modelo

            # Acumular la pérdida
            running_loss += loss.item()

        except Exception as e:
            print(f"Error en el batch {batch}: {e}")
            break

    return running_loss / len(dataloader)  # Retornar la pérdida promedio por época

# Iniciar el entrenamiento
if __name__ == "__main__":
    # Configuración
    data_path = 'E:/modelos/EfficientDet/modeloEfficientDet/imagenes'  # Ruta donde están las imágenes
    annotations_path = 'E:/modelos/EfficientDet/modeloEfficientDet/dataset_coco.json'  # Ruta a las anotaciones en formato JSON
    batch_size = 8  # Tamaño del batch más pequeño para prueba
    learning_rate = 1e-3  # Tasa de aprendizaje
    epochs = 50  # Número de épocas de entrenamiento
    num_classes = 3  # Número de clases (ajustar según el problema)
    device = "cuda" if torch.cuda.is_available() else "cpu"  # Usar GPU si está disponible
    print(f"Using device: {device}")

    # Transformaciones para las imágenes (ajusta según lo que necesites)
    transform = transforms.Compose([
        transforms.ToPILImage(),  # Convertir la imagen a formato PIL
        transforms.Resize((512, 512)),  # Redimensionar la imagen
        transforms.ToTensor(),  # Convertir la imagen a tensor
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalización
    ])

    # Carga de datos
    dataset = CustomDataset(data_path, annotations_path, transform=transform)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    # Definición del modelo
    model = EfficientDet(dataset.num_classes).to(device)

    # Optimizador
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    # Bucle de entrenamiento
    start_time = time.time()  # Iniciar el contador de tiempo total
    for t in range(epochs):
        print(f"Epoch {t+1}\n-------------------------------")
        
        epoch_start_time = time.time()  # Iniciar el contador de tiempo por época
        epoch_loss = train_loop(dataloader, model, optimizer, device)
        
        epoch_time = time.time() - epoch_start_time  # Tiempo transcurrido en la época
        print(f"Epoch {t+1} - Loss: {epoch_loss:.4f} - Time: {epoch_time:.2f} sec")

    total_time = time.time() - start_time  # Tiempo total de entrenamiento
    print(f"\nTraining complete. Total time: {total_time:.2f} seconds.")

    # Guardar el modelo
    torch.save(model.state_dict(), "efficientdet_pytorch.pth")
    print("Saved PyTorch Model State to efficientdet_pytorch.pth")
