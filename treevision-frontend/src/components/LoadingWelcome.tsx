"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = "/welcome/Background.webp";
      img.onload = () => setIsBackgroundLoaded(true);
    }
  }, []);

  if (!isBackgroundLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black space-y-6">
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
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <motion.span
          className="text-lg font-medium text-secundario"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌿 Cargando...
        </motion.span>
      </div>
    );
  }

  return null;
};

export default LoadingScreen;