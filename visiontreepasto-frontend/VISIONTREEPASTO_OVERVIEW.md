# Módulo VISIONTREEPASTO_FRONTEND

Este módulo corresponde a la interfaz de usuario del proyecto **VisionTreePasto**, desarrollado con tecnologías modernas de frontend para garantizar una experiencia fluida, responsiva y modular.

---

## Tecnologías principales utilizadas

- **React + Next.js**: Marco base para construir la aplicación web, aprovechando el enrutamiento y SSR/SSG de Next.
- **TypeScript (TSX)**: Lenguaje principal del proyecto gracias a su tipado estricto para mejporar la mentenibilidad y prevenir erroes.
- **TypeScript (TS)**: Utilizado  en el proyecto para la conexion con la API de Hugging Face y la base de datos de Supabase.
- **Tailwind CSS**: Estilización rápida, coherente y responsiva.
- **Framer Motion & ScrollReveal**: Para animaciones suaves y entrada visual.
- **Supabase**: Plataforma usada para almacenar las respuestas de NPS de los usuarios.
- **Hugging Face**: API de predicción utilizada para el procesamiento de imágenes, basada en un modelo de Machine Learning entrenado con Detectron2.
- **Figma**: El diseño completo del frontend está basado en un prototipo UI construido en Figma, siguiendo su estructura como guía principal.

---

## Estructura del Proyecto

### `src/`
| Carpeta / Archivo              | Descripción                                                            |
|-------------------------------|------------------------------------------------------------------------|
| `app/`                         | Contiene las páginas principales de la app.                            |
| ┣ `modelo/page.tsx`           | Página principal donde se desarrolla el análisis.                                         |
| ┣ `globals.css`               | Estilos globales del proyecto.                                         |
| ┣ `layout.tsx`                | Layout principal que envuelve todas las páginas.                      |
| ┗ `page.tsx`                  | Página de bienvenida de la aplicación.                                 |

### `components/` – Componentes de interfaz y bloques reutilizables

Contiene tanto componentes de UI reutilizables como contenedores específicos de páginas, organizados para facilitar su mantenimiento y escalabilidad.


| Archivo / Carpeta                   | Descripción                                                            |
|-----------------------------------|------------------------------------------------------------------------|
| `containers/ImageResultTable.tsx` | Tabla que muestra los resultados de predicción.                        |
| `containers/ImageUploader.tsx`    | Componente para cargar imágenes locales.                               |
| `containers/NpsDashboard.tsx`     | Dashboard visual para ver resultados NPS.                              |
| `containers/NpsResponses.tsx`     | Visualización para enviar respuestas individuales tipo NPS.            |
| `containers/StepsSection.tsx`     | Sección visual de pasos para entender cómo funciona el proceso.        |
| `navigation/Footer.tsx`           | Pie de página general del sitio.                                       |
| `navigation/Navbar.tsx`           | Barra de navegación principal.                                         |
| `ui/AnalyzeButton.tsx`             | Botón principal para enviar imagen a analizar.                         |
| `ui/ImageCard.tsx`                 | Tarjeta visual que muestra imágenes individuales.                      |
| `ui/ImageCarousel.tsx`             | Carrusel interactivo de imágenes, adaptado para móvil y desktop.       |
| `ui/LayoutWrapper.tsx`             | Envoltura de layout con consistencia visual.                           |
| `ui/LoadingWelcome.tsx`            | Pantalla de carga con animación personalizada.                         |
| `ui/SubmitButton.tsx`              | Botón de envío de formularios.                                         |
| `PageModelo.tsx`                   | Página principal de presentación del modelo.                            |
| `Welcome.tsx`                      | Página de bienvenida con animación e introducción.                     |


### `utils/` – Lógica externa
| Archivo                       | Descripción                                                            |
|------------------------------|------------------------------------------------------------------------|
| `api.ts`                     | Función para consumir la API de Hugging Face.                          |
| `supabaseClient.ts`          | Configuración del cliente de Supabase.                                 |

---

## Carpeta Pública – Recursos Visuales

### `public/`
| Carpeta / Archivo             | Descripción                                                            |
|------------------------------|------------------------------------------------------------------------|
| `animations/tree.json`       | Archivo de animación para bienvenida.                                  |
| `icons/favicon.svg`          | Ícono principal del sitio.                                             |
| `PageExplorer/`              | Imágenes usadas en la sección de exploración.                          |
| ┣ `CasaDelArte.webp`, `Lago.webp`, etc. | Fotografías representativas de la biodiversidad.              |
| `PagePrincipal/`             | Imágenes de fondo y branding.                                          |
| ┗ `VisionTreePasto.svg`      | Logotipo del proyecto.                                                 |
| `welcome/`                   | Recursos usados en la pantalla de bienvenida.                          |
| ┗ `Background.webp`          | Fondo visual inicial.                                                  |

---

## Pasos para ejecutar el proyecto

1. **Clonar el repositorio:**  
   Ejecuta el siguiente comando para clonar el repositorio en tu máquina local:  
   git clone https://github.com/Alg4ret3/VisionTreeSystem.git
2. **Navega a la carpeta del frontend:**
   Ejecuta el siguiente comando:
   cd visiontreepasto-frontend
3. **instalar dependencias:**
   Ejecuta el siguiente comando:
   npm install
4. **Crear archivo .env.local:**
   Crea un archivo .env.local en la carpeta raíz del proyecto y agrega las siguientes variables de entorno:
    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY
5. **Ejecutar el proyecto:**
   Ejecuta el siguiente comando:
   npm run dev


