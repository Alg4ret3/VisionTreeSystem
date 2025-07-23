"use client";

import { motion } from "framer-motion";

// Tipado para los props del componente
interface ResultData {
  especie?: string;
  score?: string;
}

interface Props {
  result: ResultData;
}

// Diccionario con fichas técnicas de las especies detectables
const TECH_SHEETS: Record<string, Record<string, string>> = {
  Ciprés: {
    "Nombre Científico": "Cupressus sempervirens",
    "Nombre Común": "Ciprés",
    "Altura": "Puede alcanzar hasta 30 metros.",
    "Uso": "Apreciado por su valor ornamental y utilizado en procesos de reforestación.",
    "Hoja": "Hojas pequeñas, escuamiformes, perennes y de color verde intenso.",
    "Floración": "Presenta brotes pequeños en el extremo de las ramas.",
    "Fruto": "Pequeñas piñas leñosas llamadas conos, no son comestibles.",
    "Cuidados": "Es una especie resistente que no requiere cuidados especiales.",
  },
   Pino: {
    "Nombre Científico": "Pinus",
    "Nombre Común": "Pino",
    "Altura": "Puede alcanzar hasta 60 metros de altura y un DAP (diámetro a la altura del pecho) de 100 cm.",
    "Descripción General": "Árbol de gran porte, con tronco cónico, recto y robusto. Presenta una copa alargada de forma cónica y crecimiento monopódico (con un solo eje principal).",
    "Corteza" : "Externa De color café y con grietas profundas \nInterna De tonalidad crema rosáceo, segrega una resina transparente característica.",
    "Hojas": "Aciculares (en forma de aguja), agrupadas en fascículos de tres hojas.",
    "Floración": "Masculinas Pequeñas estructuras con estambres dispuestos en forma de peine \nFemeninas Ubicadas en conos o estróbilos, responsables de la formación del fruto.",
    "Fruto": "Cono o estróbilo leñoso de gran tamaño, similar a una piña. Contiene semillas aladas que no son comestibles.",
  },
  
  "Palo Santo": {
    "Nombre Científico": "Bursera graveolens",
    "Nombre Común": "Palo Santo",
    "Altura": "Puede alcanzar entre 4 a 10 metros de altura y un DAP (diámetro a la altura del pecho) entre 20 a 50 cm, puede ser mayor en ejemplares viejos.",
    "Origen y Tipo de Planta": "Nativo de regiones de Ecuador, Perú, Colombia y el norte de Sudamérica.\nEs un árbol mediano, caducifolio, que pierde sus hojas en época seca como mecanismo de adaptación climática.",
    "Corteza": "Lisa a escamosa, de color gris o marrón claro. Muy aromática al cortarse.",
    "Hojas": "Dispuestas de forma alterna sobre las ramas. Son hojas compuestas de tipo pinnado, formadas por entre 5 y 11 foliolos (pequeñas hojas unidas a un eje central), lo que le da una apariencia plumosa.",
    "Floración": "Pequeñas, blanquecinas, agrupadas.",
    "Fruto": "Drupa seca, verdosa al inicio y marrón al madurar."
  },
    "Laurel Blanco": {
    "Nombre Científico": "Ocotea sp",
    "Nombre Común": "Laurel Blanco, Laurel de Montaña, Laurel Andino",
    "Altura": "Puede alcanzar entre 10 y 25 metros de altura.",
    "Descripción y Tipo de Planta": "Árbol nativo de follaje perenne o parcialmente caducifolio. Su tronco puede ser recto o ramificado, con corteza fisurada o partida, frecuentemente cubierta de musgos o líquenes. Presenta una copa densa, que puede ser redondeada o alargada.",
    "Corteza": "Externa: De color café con grietas profundas.\n Interna: De tono crema rosáceo, segrega una resina transparente característica.",
    "Hojas": "Simples, alternas, de forma elíptica a oblanceolada, de color verde brillante. Miden entre 5 y 15 cm de largo.",
    "Floración": "Flores pequeñas, de color verdoso o blanquecino, agrupadas en panículas (ramilletes).",
    "Fruto": "Tipo drupa, pequeño y redondeado, de apariencia similar a una aceituna.",

  },
  
};

export default function ImageResultTable({ result }: Props) {
  const especie = (result.especie || "").trim();
  const rawScore = result.score?.replace("%", "") ?? "";
  const scoreNum = parseFloat(rawScore);
  const hasScore = !isNaN(scoreNum);
  const isLowScore = !hasScore || scoreNum < 75;
  const showWarning = !especie || isLowScore;

  if (showWarning) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 flex flex-col items-center gap-3 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 shadow-sm rounded-lg px-4 py-3 max-w-md"
        >
          <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.333 11.266c.75 1.334-.213 2.999-1.742 2.999H3.666c-1.53 0-2.492-1.665-1.742-2.999L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 0110 11z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium leading-snug">
            {!especie
              ? "No se detectó una especie válida. Intenta con una imagen más clara o completa."
              : "Prueba con otra foto o mejor iluminación."}
          </span>
        </motion.div>
      </motion.div>
    );
  }

  const sheet = TECH_SHEETS[especie] ?? { "Especie Detectada": especie };
  const rows = Object.entries(sheet).map(([label, value]) => ({ label, value }));
  rows.push({ label: "Seguridad en el resultado", value: `${scoreNum.toFixed(1)}%` });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      className="overflow-hidden rounded-xl shadow-md ring-1 ring-gray-200 w-full max-w-xl mx-auto"
    >
      <ul className="space-y-3 p-4">
        {rows.map((row, i) => (
          <motion.li
            key={row.label}
            initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.4 }}
            whileHover={{ scale: 1.01 }}
            className="rounded-xl border border-[#D6E8FA] bg-white shadow-sm p-4 transition duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <p className="text-primario font-semibold tracking-wide mb-1.5">
              {row.label}
            </p>
            <p className="text-primario/80 break-words">{row.value}</p>
            <div
              className={`h-1 mt-4 rounded-full ${
                i % 2 === 0 ? "bg-secundario/70" : "bg-secundario/40"
              }`}
            />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
