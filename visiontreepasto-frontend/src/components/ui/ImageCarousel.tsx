"use client";

// Importaciones necesarias
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ImageCard from "./ImageCard";

// Lista de imágenes
const images = [
  {
    src: "/PageExplorer/CasaDelArte.webp",
    title: "Casa del Arte",
    description:
      "Espacio cultural y comunitario dedicado a la expresión artística y el aprendizaje colectivo, aquí se promueven talleres, exposiciones y actividades que fortalecen la identidad local y el vínculo con la naturaleza.",
  },
  {
    src: "/PageExplorer/Image1.webp",
    title: "Kiosco",
    description:
      "Lugar ideal para compartir momentos en familia o con amigos, perfecto para disfrutar de un picnic rodeado de naturaleza, descansar tras una caminata o simplemente contemplar el entorno.",
  },
  {
    src: "/PageExplorer/Img2.webp",
    title: "Jardín de la Memoria",
    description:
      "Espacio simbólico que honra la memoria de las víctimas del conflicto armado en Colombia, un jardín de paz y reflexión, rodeado de flora nativa que representa la vida, la resistencia y la esperanza.",
  },
  {
    src: "/PageExplorer/Lago.webp",
    title: "Lago del Duende",
    description:
      "En medio del sendero natural se encuentra el encantador Lago del Duende, un espejo de agua rodeado de vegetación que invita al descanso, la contemplación y la conexión con las leyendas ancestrales del territorio.",
  },
  {
    src: "/PageExplorer/MIrador.webp",
    title: "Mirador Panorámico",
    description:
      "Desde este punto elevado podrás apreciar una vista impresionante del Parque Ambiental Chimayoy, una oportunidad para contemplar la riqueza del paisaje y todo lo que este espacio natural ofrece.",
  },
  {
    src: "/PageExplorer/VIvero.webp",
    title: "Vivero Educativo",
    description:
      "Un espacio donde se cuidan y adaptan especies vegetales nativas, y en ocasiones también fauna que llega desde otras regiones, aquí se promueve la educación ambiental y el respeto por la vida.",
  },
];

export default function ImageCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full"
    >
      {/* Título */}
      <motion.div
        className="py-6 px-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug secundario">
          Explora nuestros <span className="text-secundario">Espacios</span>
        </h2>
        <motion.div
          className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full"
          layout
        />
      </motion.div>

      {/* Solo para móvil */}
      {isMobile ? (
        <div className="relative">
          <div
            ref={containerRef}
            className="h-[70vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth scroll-secundario"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                data-index={i}
                className="snap-start h-[65vh] flex items-start justify-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ImageCard img={img} index={i} onClick={() => {}} />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto px-4 pb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {images.map((img, i) => (
            <ImageCard key={i} img={img} index={i} onClick={() => {}} />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
