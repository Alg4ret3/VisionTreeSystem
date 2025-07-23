"use client";

// Importaciones necesarias de React, librerías de animación y componentes
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import ImageCard from "./ImageCard"; // Componente reutilizable para mostrar cada imagen

// Lista de imágenes con su respectiva información
const images = [
  {
    src: "/PageExplorer/CasaDelArte.jpeg",
    title: "Casa del Arte",
    description: "Espacio cultural y comunitario dedicado a la expresión artística y el aprendizaje colectivo. Aquí se promueven talleres, exposiciones y actividades que fortalecen la identidad local y el vínculo con la naturaleza."
  },
  {
    src: "/PageExplorer/Image1.jpeg",
    title: "Kiosco",
    description: "Lugar ideal para compartir momentos en familia o con amigos. Perfecto para disfrutar de un picnic rodeado de naturaleza, descansar tras una caminata o simplemente contemplar el entorno."
  },
  {
    src: "/PageExplorer/Img2.jpeg",
    title: "Jardín de la Memoria",
    description: "Espacio simbólico que honra la memoria de las víctimas del conflicto armado en Colombia. Un jardín de paz y reflexión, rodeado de flora nativa que representa la vida, la resistencia y la esperanza."
  },
  {
    src: "/PageExplorer/Lago.jpeg",
    title: "Lago del Duende",
    description: "En medio del sendero natural se encuentra el encantador Lago del Duende, un espejo de agua rodeado de vegetación que invita al descanso, la contemplación y la conexión con las leyendas ancestrales del territorio."
  },
  {
    src: "/PageExplorer/MIrador.jpeg",
    title: "Mirador Panorámico",
    description: "Desde este punto elevado podrás apreciar una vista impresionante del Parque Ambiental Chimayoy. Una oportunidad para contemplar la riqueza del paisaje y todo lo que este espacio natural ofrece."
  },
  {
    src: "/PageExplorer/VIvero.jpeg",
    title: "Vivero Educativo",
    description: "Un espacio donde se cuidan y adaptan especies vegetales nativas, y en ocasiones también fauna que llega desde otras regiones. Aquí se promueve la educación ambiental y el respeto por la vida."
  }
];


// Componente principal que muestra la galería
export default function ImageCarousel() {
  // Estado para almacenar la imagen seleccionada (cuando se hace clic en una)
  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null);

  // Estado para detectar si es un dispositivo móvil
  const [isMobile, setIsMobile] = useState(false);

  // Detecta cambios en el tamaño de la ventana para activar el modo móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-blanco py-10">
      {/* Título de la sección */}
      <div className="max-w-6xl mx-auto py-4 px-4">
        <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug secundario">
          Explora nuestros <span className="text-secundario">Espacios</span>
        </h2>
        <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
      </div>

      {/* Grid de cards con las imágenes */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto px-4">
        {images.map((img, i) => (
          <ImageCard
            key={i}
            img={img}
            index={i}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Modal de imagen ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog
            open={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            // Fondo borroso y translúcido detrás del modal
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm"
          >
            {/* Fondo clickeable para cerrar en móviles */}
            <div
              className="fixed inset-0"
              onClick={() => isMobile && setSelectedImage(null)}
            />

            {/* Contenido del modal con animaciones */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 bg-blanco rounded-xl p-6 max-w-xl w-[90%] mx-auto shadow-2xl ">
            
              {/* Botón de cierre */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>

              {/* Imagen ampliada */}
              <div className="w-full h-64 relative rounded-md overflow-hidden mb-4 shadow">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Título y descripción dentro del modal */}
              <h3 className="text-2xl font-bold text-primario text-center mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-700 text-md text-center leading-relaxed">
                {selectedImage.description}
              </p>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
