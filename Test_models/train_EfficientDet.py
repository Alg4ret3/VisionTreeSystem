# Librerías necesarias para el entrenamiento y procesamiento de imágenes
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

# Diccionario para mapear los índices de clase a sus nombres reales
class_names = {0: 'Cipres', 1: 'Palosanto', 2: 'Pino'}

# Creo un Dataset personalizado para cargar imágenes y sus anotaciones desde un archivo JSON (formato COCO)
class CustomDataset(Dataset):
    def __init__(self, data_path, annotations_path, transform=None):
        self.data_path = data_path
        self.annotations_path = annotations_path
        self.transform = transform 

        # Cargo el JSON con las anotaciones
        with open(self.annotations_path, 'r') as f:
            self.annotations = json.load(f)

        # Muestro las primeras imágenes para verificar que todo esté bien cargado
        print("Primeras 2 imágenes en las anotaciones:", self.annotations["images"][:2])  

        # Extraigo los nombres de archivo de las imágenes
        self.image_files = [item['file_name'] for item in self.annotations["images"]]

        # Extraigo las anotaciones por imagen
        self.targets = [item['annotations'] if 'annotations' in item else [] for item in self.annotations["images"]]

        # Verifico cuántas clases diferentes hay
        all_classes = set()
        for annotation in self.targets:
            for ann in annotation:
                all_classes.add(ann['category_id'])  

        self.num_classes = len(all_classes)
        print(f"Clases encontradas: {self.num_classes}")

    def __len__(self):
        return len(self.image_files)

    def __getitem__(self, idx):
        # Cargo la imagen desde disco
        img_path = os.path.join(self.data_path, self.image_files[idx])
        image = cv2.imread(img_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Extraigo cajas y clases asociadas a esa imagen
        annotations = self.targets[idx]
        boxes = np.array([ann['bbox'] for ann in annotations])
        category_ids = np.array([ann['category_id'] for ann in annotations])

        # Aplico transformaciones (redimensionar, normalizar, etc.)
        if self.transform:
            image = self.transform(image)

        return image, boxes, category_ids

# Implemento una versión simplificada de EfficientDet usando ResNet50 como backbone
class EfficientDet(nn.Module):
    def __init__(self, num_classes):
        super(EfficientDet, self).__init__()
        self.backbone = models.resnet50(pretrained=True)
        self.backbone.fc = nn.Identity()  # Quito la capa de clasificación original

        # FPN simplificado para mejorar las características extraídas
        self.fpn = nn.Conv2d(2048, 512, kernel_size=3, padding=1)

        # Cabezas de predicción: una para clases, otra para coordenadas de las cajas
        self.class_head = nn.Linear(512, num_classes)
        self.bbox_head = nn.Linear(512, 4)

    def forward(self, x):
        features = self.backbone(x)
        features = features.view(features.size(0), -1)  # Aplano para pasar por capas lineales
        features = self.fpn(features.unsqueeze(-1).unsqueeze(-1))  # Ajusto dimensiones

        class_preds = self.class_head(features)
        bbox_preds = self.bbox_head(features)

        return class_preds, bbox_preds

# Defino la función de pérdida combinada (clasificación + regresión)
def loss_fn(class_preds, bbox_preds, class_labels, bbox_labels):
    class_loss = nn.CrossEntropyLoss()(class_preds, class_labels)
    bbox_loss = nn.L1Loss()(bbox_preds, bbox_labels)
    return class_loss + bbox_loss

# Bucle de entrenamiento con control de errores por batch
def train_loop(dataloader, model, optimizer, device):
    size = len(dataloader.dataset)
    model.train()
    running_loss = 0.0

    for batch, (X, y_boxes, y_classes) in enumerate(dataloader):
        try:
            X, y_boxes, y_classes = X.to(device), y_boxes.to(device), y_classes.to(device)

            # Paso forward y cálculo de pérdida
            class_preds, bbox_preds = model(X)
            loss = loss_fn(class_preds, bbox_preds, y_classes, y_boxes)

            # Backpropagation
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        except Exception as e:
            print(f"Error en el batch {batch}: {e}")
            break

    return running_loss / len(dataloader)

# Ejecuto el entrenamiento completo
if __name__ == "__main__":
    # Parámetros y configuración inicial
    data_path = 'E:/modelos/EfficientDet/modeloEfficientDet/imagenes'
    annotations_path = 'E:/modelos/EfficientDet/modeloEfficientDet/dataset_coco.json'
    batch_size = 8
    learning_rate = 1e-3
    epochs = 50
    num_classes = 3
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    # Transformaciones que aplico a las imágenes antes de pasarlas al modelo
    transform = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((512, 512)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    # Dataset y DataLoader
    dataset = CustomDataset(data_path, annotations_path, transform=transform)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    # Inicializo el modelo y lo paso al dispositivo correspondiente
    model = EfficientDet(dataset.num_classes).to(device)

    # Optimizador
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    # Entrenamiento por épocas
    start_time = time.time()
    for t in range(epochs):
        print(f"Epoch {t+1}\n-------------------------------")
        epoch_start_time = time.time()
        epoch_loss = train_loop(dataloader, model, optimizer, device)
        epoch_time = time.time() - epoch_start_time
        print(f"Epoch {t+1} - Loss: {epoch_loss:.4f} - Time: {epoch_time:.2f} sec")

    total_time = time.time() - start_time
    print(f"\nTraining complete. Total time: {total_time:.2f} seconds.")

    # Guardar pesos del modelo entrenado
    torch.save(model.state_dict(), "efficientdet_pytorch.pth")
    print("Saved PyTorch Model State to efficientdet_pytorch.pth")
