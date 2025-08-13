"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";

// Tipo para representar una imagen del carrusel
export type CarouselImage = {
  src: string;
  title: string;
  description: string;
};

// Props tipadas explícitamente para el componente
type ImageCardProps = {
  img: CarouselImage;
  index: number;
  onClick: (img: CarouselImage) => void;
};

export default function ImageCard({ img, index, onClick }: ImageCardProps) {
  // Hook para detectar si el elemento está visible en pantalla
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      key={index}
      onClick={() => onClick(img)}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="rounded-2xl overflow-hidden shadow-lg bg-white hover:bg-emerald-50 border transition-all cursor-pointer hover:shadow-xl"
    >
      {/* Imagen principal */}
      <div className="relative w-full h-80">
        <Image src={img.src} alt={img.title} fill className="object-cover" />
      </div>

      {/* Texto descriptivo */}
      <div className="p-4">
        <div className="max-w-6xl mx-auto py-4 px-4">
          <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug secundario">
            <span className="text-primario">{img.title}</span>
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
        </div>
        <p className="text-sm text-gray-700 leading-snug">{img.description}</p>
      </div>
    </motion.div>
  );
}
