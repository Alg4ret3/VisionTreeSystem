import os
import json
import xml.etree.ElementTree as ET
from PIL import Image
from tqdm import tqdm

# Defino rutas principales de imágenes, anotaciones y salida del JSON
IMAGES_DIR = r"E:\ML\Detectron2\Data\raw_images"
ANNOTATIONS_DIR = r"E:\ML\Detectron2\Data\annotations_xml"
OUTPUT_JSON = "model_dataset_coco2.json"

# Variables globales necesarias para el formato COCO
class_name_to_id = {}
categories = []
annotation_id = 1
image_id = 1

# Estructura base del archivo JSON en formato COCO
coco_output = {
    "images": [],
    "annotations": [],
    "categories": []
}

# Obtiene las dimensiones reales de la imagen desde el archivo, no desde el XML
def get_image_info(file_name, image_id):
    image_path = os.path.join(IMAGES_DIR, file_name)
    if not os.path.exists(image_path):
        return None
    with Image.open(image_path) as img:
        width, height = img.size
    return {
        "id": image_id,
        "file_name": file_name,
        "width": width,
        "height": height
    }

# Convierte cada objeto del XML en una anotación compatible con el formato COCO
def get_annotation_info(obj, image_id, img_w, img_h, file_name):
    global annotation_id
    category = obj.find('name').text.strip()

    # Registro de la categoría si no ha sido agregada antes
    if category not in class_name_to_id:
        class_id = len(class_name_to_id) + 1
        class_name_to_id[category] = class_id
        categories.append({
            "id": class_id,
            "name": category
        })
    else:
        class_id = class_name_to_id[category]

    # Lectura de las coordenadas del bounding box
    bndbox = obj.find('bndbox')
    xmin = int(float(bndbox.find('xmin').text))
    ymin = int(float(bndbox.find('ymin').text))
    xmax = int(float(bndbox.find('xmax').text))
    ymax = int(float(bndbox.find('ymax').text))

    # Validación de coordenadas
    if xmax <= xmin or ymax <= ymin:
        print(f"Coordenadas inválidas: {file_name} (ID: {image_id}) bbox: ({xmin},{ymin},{xmax},{ymax})")
        return None
    if xmax > img_w or ymax > img_h:
        print(f"Bbox fuera de límites: {file_name} (ID: {image_id}) bbox: ({xmin},{ymin},{xmax},{ymax}) imagen: ({img_w},{img_h})")
        return None

    # Generación de la anotación en formato COCO
    ann = {
        "id": annotation_id,
        "image_id": image_id,
        "category_id": class_id,
        "bbox": [xmin, ymin, xmax - xmin, ymax - ymin],
        "area": (xmax - xmin) * (ymax - ymin),
        "iscrowd": 0
    }

    annotation_id += 1
    return ann

# Recorro todos los XML en el directorio de anotaciones
for xml_file in tqdm(os.listdir(ANNOTATIONS_DIR), desc="Procesando anotaciones"):
    if not xml_file.endswith(".xml"):
        continue

    xml_path = os.path.join(ANNOTATIONS_DIR, xml_file)
    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()

        file_name = root.find('filename').text.strip()
        image_path = os.path.join(IMAGES_DIR, file_name)

        if not os.path.exists(image_path):
            print(f"Imagen no encontrada: {file_name}")
            continue

        image_info = get_image_info(file_name, image_id)
        if image_info is None:
            continue

        img_w, img_h = image_info["width"], image_info["height"]
        coco_output["images"].append(image_info)

        for obj in root.findall('object'):
            ann = get_annotation_info(obj, image_id, img_w, img_h, file_name)
            if ann:
                coco_output["annotations"].append(ann)

        image_id += 1

    except Exception as e:
        print(f"Error al procesar XML {xml_file}: {e}")

# Al final, se agregan las categorías al JSON
coco_output["categories"] = categories

# Se guarda el archivo final en formato COCO
with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(coco_output, f, indent=4, ensure_ascii=False)

# Mostrar resumen general del proceso
print("\nConversión finalizada con éxito")
print(f"Imágenes procesadas: {len(coco_output['images'])}")
print(f"Anotaciones creadas: {len(coco_output['annotations'])}")
print(f"Archivo JSON guardado en: {OUTPUT_JSON}")

# Desglose de anotaciones por cada categoría
print("\nResumen por categoría:")
for cat in categories:
    cid = cat["id"]
    count = sum(1 for ann in coco_output["annotations"] if ann["category_id"] == cid)
    print(f"- {cat['name']}: {count} anotaciones")
