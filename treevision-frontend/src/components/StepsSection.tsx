"use client";

import React from "react";
import {
  MdImageSearch,
  MdUpload,
  MdPlayCircle,
  MdAccessTime,
  MdDone,
  MdStarRate,
} from "react-icons/md";
import { motion } from "framer-motion";

// Lista de pasos con íconos y texto
const steps = [
  {
    step: 1,
    title: "Toma una foto clara del árbol que quieras identificar.",
    desc: "Asegúrate de que la imagen esté bien enfocada y muestre el árbol completo para obtener mejores resultados.",
    icon: <MdImageSearch size={34} className="text-secundario" />,
  },
  {
    step: 2,
    title: "Selecciona o toma la imagen desde tu dispositivo.",
    desc: "Puedes arrastrar la imagen al área indicada, hacer clic para buscarla en tus archivos o tomar una foto con la cámara.",
    icon: <MdUpload size={34} className="text-secundario" />,
  },
  {
    step: 3,
    title: 'Haz clic en el botón "Analizar imagen".',
    desc: "El modelo comenzará a procesar la foto usando visión por computadora e IA.",
    icon: <MdPlayCircle size={34} className="text-secundario" />,
  },
  {
    step: 4,
    title: "Espera unos segundos mientras se procesa.",
    desc: "Nuestro modelo examina la imagen para detectar patrones y clasificar la especie del árbol.",
    icon: <MdAccessTime size={34} className="text-secundario" />,
  },
  {
    step: 5,
    title: "Revisa los resultados.",
    desc: "Verás el nombre de la especie identificada, una breve descripción, información del hábitat y el nivel de confianza del modelo.",
    icon: <MdDone size={34} className="text-secundario" />,
  },
  {
  step: 6,
  title: "Califícanos.",
  desc: "Dinos qué te pareció la identificación. Tu opinión nos ayuda a mejorar la precisión del modelo.",
  icon: <MdStarRate size={34} className="text-secundario" />,
}

] as const;

type Props = {
  onStepClick?: () => void;
};

export default function StepsSection({ onStepClick }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.1 }}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full"
    >
      {/* Encabezado */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto py-4 px-4"
      >
        <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug">
          Pasos para usar el modelo <span className="text-secundario">VisionTreePasto&nbsp;AI</span>
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full origin-left"
        />
      </motion.div>

      {/* Tarjetas de pasos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 py-12">
        {steps.map((item) => (
          <button
            key={item.step}
            onClick={onStepClick}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.step * 0.1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: false, amount: 0.1 }}
              className="relative bg-secundario/10 border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <motion.div
                className="absolute -top-5 left-1/2 -translate-x-1/2"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-12 h-12 bg-secundario text-white flex items-center justify-center text-xl font-bold rounded-full shadow-lg ring-4 ring-white"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.step}
                </motion.div>
              </motion.div>
              <div className="mt-8 flex justify-center">{item.icon}</div>
              <div className="mt-3 text-center px-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-secundario inline-block pb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed tracking-wide max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          </button>
        ))}
      </div>
    </motion.section>
  );
}
