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
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.04 }}
      className="rounded-2xl overflow-hidden shadow-lg bg-white hover:bg-emerald-100 border transition-all cursor-pointer hover:shadow-xl"
    >
      {/* Imagen principal */}
      <div className="relative w-full h-56">
        <Image
          src={img.src}
          alt={img.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Texto descriptivo */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-primario mb-1">
          {img.title}
        </h3>
        <p className="text-sm text-gray-700 leading-snug">
          {img.description}
        </p>
      </div>
    </motion.div>
  );
}
