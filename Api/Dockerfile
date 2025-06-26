# Uso una imagen base de Python 3.9 porque es compatible con Detectron2.
# Elegí 'slim-buster' porque es liviana y adecuada para entornos sin GPU (CPU-only).
FROM python:3.9-slim-buster

# Establezco el directorio de trabajo dentro del contenedor.
# Aquí se copiará mi carpeta 'app' que contiene el main.py.
WORKDIR /app

# Instalo las dependencias del sistema necesarias.
# Estas son esenciales para que funcionen OpenCV, PyTorch y Detectron2 sin errores.
# Incluyo librerías gráficas para evitar fallos de OpenCV en entornos sin entorno gráfico.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \ 
    git \              
    libgl1-mesa-glx \ 
    libsm6 \
    libxext6 \
    libglib2.0-0 && \
    apt-get clean && rm -rf /var/lib/apt/lists/* 

# Copio primero el archivo de dependencias para aprovechar la caché de Docker.
COPY requirements.txt .

# Instalo las dependencias básicas del proyecto listadas en requirements.txt.
RUN pip install --no-cache-dir -r requirements.txt

# Instalo PyTorch, TorchVision y Torchaudio en versión CPU.
# Es importante que sea la versión CPU, ya que el entorno de despliegue (como Render o Hugging Face Spaces) no tiene GPU.
RUN pip install torch==2.0.1 torchvision==0.15.2 torchaudio==2.0.2 --index-url https://download.pytorch.org/whl/cpu

# Instalo Detectron2 desde su repositorio oficial en GitHub.
# Detectron2 no está en PyPI, así que necesita compilarse desde la fuente.
RUN pip install --no-cache-dir 'git+https://github.com/facebookresearch/detectron2.git'

# Copio mi carpeta 'app' que contiene el archivo main.py con la lógica de la API.
COPY app /app/app

# Expongo el puerto 7860, que es donde mi aplicación FastAPI estará escuchando.
EXPOSE 7860

# Comando para iniciar la API usando Uvicorn.
# Le indico que cargue la instancia 'app' desde el archivo 'main.py' dentro de la carpeta 'app'.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
