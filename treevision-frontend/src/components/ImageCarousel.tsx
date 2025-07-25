"use client";

// Importaciones necesarias
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ImageCard from "./ImageCard";

// Lista de imágenes
const images = [
  {
    src: "/PageExplorer/CasaDelArte.jpeg",
    title: "Casa del Arte",
    description:
      "Espacio cultural y comunitario dedicado a la expresión artística y el aprendizaje colectivo. Aquí se promueven talleres, exposiciones y actividades que fortalecen la identidad local y el vínculo con la naturaleza.",
  },
  {
    src: "/PageExplorer/Image1.jpeg",
    title: "Kiosco",
    description:
      "Lugar ideal para compartir momentos en familia o con amigos. Perfecto para disfrutar de un picnic rodeado de naturaleza, descansar tras una caminata o simplemente contemplar el entorno.",
  },
  {
    src: "/PageExplorer/Img2.jpeg",
    title: "Jardín de la Memoria",
    description:
      "Espacio simbólico que honra la memoria de las víctimas del conflicto armado en Colombia. Un jardín de paz y reflexión, rodeado de flora nativa que representa la vida, la resistencia y la esperanza.",
  },
  {
    src: "/PageExplorer/Lago.jpeg",
    title: "Lago del Duende",
    description:
      "En medio del sendero natural se encuentra el encantador Lago del Duende, un espejo de agua rodeado de vegetación que invita al descanso, la contemplación y la conexión con las leyendas ancestrales del territorio.",
  },
  {
    src: "/PageExplorer/MIrador.jpeg",
    title: "Mirador Panorámico",
    description:
      "Desde este punto elevado podrás apreciar una vista impresionante del Parque Ambiental Chimayoy. Una oportunidad para contemplar la riqueza del paisaje y todo lo que este espacio natural ofrece.",
  },
  {
    src: "/PageExplorer/VIvero.jpeg",
    title: "Vivero Educativo",
    description:
      "Un espacio donde se cuidan y adaptan especies vegetales nativas, y en ocasiones también fauna que llega desde otras regiones. Aquí se promueve la educación ambiental y el respeto por la vida.",
  },
];

export default function ImageCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detectar scroll para saber qué imagen está visible
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    const children = container.querySelectorAll(".snap-item");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div className="relative bg-blanco  shadow-lg overflow-hidden">
      {/* Título */}
      <div className="py-6 px-4">
        <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug secundario ">
          Explora nuestros <span className="text-secundario">Espacios</span>
        </h2>
        <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
      </div>

      {/* MODO MÓVIL: scroll vertical con snap */}
      {isMobile ? (
        <div className="relative">
          {/* Contenedor scrollable con snap */}
          <div
            ref={containerRef}
            className="h-[85vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth px-4 space-y-6"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                data-index={i}
                className="snap-item snap-start h-[85vh] flex items-center justify-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ImageCard img={img} index={i} onClick={() => {}} />
              </motion.div>
            ))}
          </div>

          {/* Indicador de progreso tipo 1/6 */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-5 right-5 px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md bg-secundario/90 text-white text-sm font-semibold flex items-center gap-1"
          >
            <span>
              {activeIndex + 1}{" "}
              <span className="opacity-70">/ {images.length}</span>
            </span>
          </motion.div>
        </div>
      ) : (
        // MODO DESKTOP: grid clásico
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto px-4 pb-10">
          {images.map((img, i) => (
            <ImageCard key={i} img={img} index={i} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
