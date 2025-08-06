# Uso una imagen base de Python 3.9 compatible con Detectron2.
# Actualicé de 'slim-buster' a 'slim-bookworm' porque 'buster' fue descontinuada y sus repositorios ya no están disponibles.
FROM python:3.9-slim-bookworm

# Establezco el directorio de trabajo dentro del contenedor.
# Aquí se copiará mi carpeta 'app' que contiene el main.py y la lógica de la API.
WORKDIR /app

# Instalo las dependencias del sistema necesarias.
# Estas son esenciales para compilar paquetes, y para que funcionen OpenCV y Detectron2 sin errores.
# Incluyo librerías gráficas mínimas para que OpenCV no falle, incluso en entornos sin entorno gráfico.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    git \
    libgl1-mesa-glx \
    libsm6 \
    libxext6 \
    libglib2.0-0 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copio el archivo de dependencias primero para aprovechar la caché de Docker.
COPY requirements.txt .

# Instalo las dependencias Python básicas del proyecto listadas en requirements.txt.
RUN pip install --no-cache-dir -r requirements.txt

# Instalo PyTorch, TorchVision y Torchaudio en su versión CPU.
# Esto es clave porque en entornos como Hugging Face Spaces no hay GPU disponible.
RUN pip install torch==2.0.1 torchvision==0.15.2 torchaudio==2.0.2 --index-url https://download.pytorch.org/whl/cpu

# Instalo Detectron2 directamente desde GitHub.
# Esta librería no está en PyPI y necesita compilarse desde la fuente.
RUN pip install --no-cache-dir 'git+https://github.com/facebookresearch/detectron2.git'

# Copio el resto del proyecto, incluyendo la lógica principal de la API en la carpeta 'app'.
COPY app /app/app

# Expongo el puerto 7860 donde FastAPI estará escuchando dentro del contenedor.
EXPOSE 7860

# Comando de entrada: lanzo el servidor Uvicorn apuntando a la app FastAPI definida en app/main.py.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
