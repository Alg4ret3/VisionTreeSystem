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
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
        {/* Árbol SVG animado */}
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-6 z-10"
          initial={false}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.circle
            cx="32"
            cy="20"
            r="14"
            fill="#66BB6A"
            animate={{ r: [13, 15, 13] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x="30"
            y="34"
            width="4"
            height="20"
            rx="1"
            fill="#4E342E"
            animate={{ y: [34, 35, 34], rotate: [0, 1, -1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="20"
            cy="26"
            r="7"
            fill="#66BB6A"
            animate={{ cx: [20, 19, 21, 20], cy: [26, 25.5, 26.5, 26] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="44"
            cy="26"
            r="7"
            fill="#66BB6A"
            animate={{ cx: [44, 45, 43, 44], cy: [26, 26.5, 25.5, 26] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* Frase de carga */}
        <motion.span
          className="text-lg font-semibold text-secundario animate-pulse z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌿 Preparando todo para ti...
        </motion.span>
      </div>
    );
  }

  return null;
};

export default LoadingScreen;
