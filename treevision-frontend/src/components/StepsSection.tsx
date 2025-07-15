"use client";

import React from "react";
import {
  MdImageSearch,
  MdUpload,
  MdPlayCircle,
  MdAccessTime,
  MdDone,
  MdShare,
} from "react-icons/md";

const steps = [
  {
    step: 1,
    title: "Toma una foto clara del árbol que quieras identificar.",
    desc: "Asegúrate de que la imagen esté enfocada y muestre completamente el árbol.",
    icon: <MdImageSearch size={34} className="text-secundario" />,
  },
  {
    step: 2,
    title: "Sube la imagen al sistema desde tu dispositivo.",
    desc: "Puedes arrastrarla al área designada o hacer clic para buscarla en tus archivos.",
    icon: <MdUpload size={34} className="text-secundario" />,
  },
  {
    step: 3,
    title: 'Haz clic en el boton "Analizar imagen".',
    desc: "El modelo comenzará a procesar la foto usando visión por computadora e IA.",
    icon: <MdPlayCircle size={34} className="text-secundario" />,
  },
  {
    step: 4,
    title: "Espera unos segundos mientras se procesa.",
    desc: "El sistema analiza características del árbol y consulta información relacionada.",
    icon: <MdAccessTime size={34} className="text-secundario" />,
  },
  {
    step: 5,
    title: "Revisa los resultados.",
    desc: "Verás el nombre de la especie detectada, su descripción, hábitat, etc.",
    icon: <MdDone size={34} className="text-secundario" />,
  },
  {
    step: 6,
    title: "Comparte la información.",
    desc: "Puedes compartir los resultados con  tus amigos.",
    icon: <MdShare size={34} className="text-secundario" />,
  },
] as const;

export default function StepsSection() {
  return (
    <section className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full">
      {/* Encabezado  */}
      <div className="max-w-6xl mx-auto py-4 px-4">
        <h2
          className="
            text-center font-extrabold tracking-tight
            text-primario            
            text-2xl sm:text-3xl md:text-4xl  
            leading-snug
            "
        > 
          Pasos para usar el modelo&nbsp;
          <span className="text-secundario">TreeVision&nbsp;AI</span>
        </h2>
        {/* Subrayado  */}
        <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
      </div>
      {/* Grid de tarjetas */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 py-12">
        {steps.map((item) => (
          <div
            key={item.step}
            className="relative bg-secundario/10 border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Círculo con número */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 bg-secundario text-white flex items-center justify-center text-xl font-bold rounded-full shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
            </div>
            {/* Ícono representativo */}
            <div className="mt-8 flex justify-center">{item.icon}</div>
            {/* Texto */}
            <div className="mt-3 text-center px-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-secundario inline-block pb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed tracking-wide  max-w-xs mx-auto">
                 {item.desc}
              </p>

              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
