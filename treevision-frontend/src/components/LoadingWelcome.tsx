"use client"; // Indica que este componente se ejecuta en el cliente (Next.js App Router)

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  imageSrc?: string; // Imagen a precargar (por defecto la de bienvenida)
  minDuration?: number; // Tiempo mínimo que debe mostrarse la pantalla de carga (en ms)
}

const LoadingScreen = ({
  imageSrc = "/welcome/Background.webp",
  minDuration = 1000, // 1 segundo por defecto
}: LoadingScreenProps) => {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false); // Estado: ¿ya cargó la imagen?
  const [isVisible, setIsVisible] = useState(true); // Estado: ¿mostrar la pantalla de carga?

  /* Efecto para precargar la imagen */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = imageSrc;

      // Cuando la imagen termine de cargar:
      img.onload = () => {
        // Espera el tiempo mínimo antes de ocultar la pantalla
        setTimeout(() => setIsBackgroundLoaded(true), minDuration);
      };
    }
  }, [imageSrc, minDuration]);

  /* Efecto para ocultar con animación */
  useEffect(() => {
    if (isBackgroundLoaded) {
      // Pequeña espera para permitir animación de salida
      const timer = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isBackgroundLoaded]);

  /* Renderizado condicional con AnimatePresence */
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Animación suave al desaparecer
          transition={{ duration: 0.8 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 space-y-6"
          aria-busy="true"
          role="status"
        >
          {/* Animación de los puntos rebotando */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-4 h-4 rounded-full bg-secundario"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                  delay: i * 0.2, // Cada punto se anima con un delay distinto para efecto escalonado
                }}
              />
            ))}
          </div>

          {/* Texto animado */}
          <motion.span
            className="text-lg font-medium text-secundario"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌿 Cargando...
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
