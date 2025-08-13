"use client"; 
// Indica que este componente se renderiza en el cliente, necesario para usar hooks o animaciones

import { motion } from "framer-motion"; 
// Importa Framer Motion para añadir animaciones declarativas a elementos
interface ResultData {
  especie?: string; // Nombre de la especie detectada (opcional porque puede estar vacío al inicio)
  score?: string;   // Nivel de confianza del modelo (opcional)
}

// Define el tipo de las props que recibirá el componente
interface Props {
  result: ResultData; // Objeto con la información de predicción
}

// Diccionario con fichas técnicas de las especies detectables
const TECH_SHEETS: Record<string, Record<string, string>> = {
  Ciprés: {
    "Nombre Científico": "Cupressus sempervirens",
    "Nombre Común": "Ciprés",
    Altura: "Puede alcanzar hasta 30 metros.",
    Uso: "Apreciado por su valor ornamental y utilizado en procesos de reforestación.",
    Hoja: "Hojas pequeñas, escuamiformes, perennes y de color verde intenso.",
    Floración: "Presenta brotes pequeños en el extremo de las ramas.",
    Fruto: "Pequeñas piñas leñosas llamadas conos, no son comestibles.",
    Cuidados: "Es una especie resistente que no requiere cuidados especiales.",
  },
  Pino: {
    "Nombre Científico": "Pinus",
    "Nombre Común": "Pino",
    Altura:
      "Puede alcanzar hasta 60 metros de altura y un DAP (diámetro a la altura del pecho) de 100 cm.",
    "Descripción General":
      "Árbol de gran porte, con tronco cónico, recto y robusto. Presenta una copa alargada de forma cónica y crecimiento monopódico (con un solo eje principal).",
    Corteza:
      "Externa De color café y con grietas profundas \nInterna De tonalidad crema rosáceo, segrega una resina transparente característica.",
    Hojas:
      "Aciculares (en forma de aguja), agrupadas en fascículos de tres hojas.",
    Floración:
      "Masculinas Pequeñas estructuras con estambres dispuestos en forma de peine \nFemeninas Ubicadas en conos o estróbilos, responsables de la formación del fruto.",
    Fruto:
      "Cono o estróbilo leñoso de gran tamaño, similar a una piña. Contiene semillas aladas que no son comestibles.",
  },

  "Palo Santo": {
    "Nombre Científico": "Bursera graveolens",
    "Nombre Común": "Palo Santo",
    Altura:
      "Puede alcanzar entre 4 a 10 metros de altura y un DAP (diámetro a la altura del pecho) entre 20 a 50 cm, puede ser mayor en ejemplares viejos.",
    "Origen y Tipo de Planta":
      "Nativo de regiones de Ecuador, Perú, Colombia y el norte de Sudamérica.\nEs un árbol mediano, caducifolio, que pierde sus hojas en época seca como mecanismo de adaptación climática.",
    Corteza:
      "Lisa a escamosa, de color gris o marrón claro. Muy aromática al cortarse.",
    Hojas:
      "Dispuestas de forma alterna sobre las ramas. Son hojas compuestas de tipo pinnado, formadas por entre 5 y 11 foliolos (pequeñas hojas unidas a un eje central), lo que le da una apariencia plumosa.",
    Floración: "Pequeñas, blanquecinas, agrupadas.",
    Fruto: "Drupa seca, verdosa al inicio y marrón al madurar.",
  },
  "Laurel Blanco": {
    "Nombre Científico": "Ocotea sp",
    "Nombre Común": "Laurel Blanco, Laurel de Montaña, Laurel Andino",
    Altura: "Puede alcanzar entre 10 y 25 metros de altura.",
    "Descripción y Tipo de Planta":
      "Árbol nativo de follaje perenne o parcialmente caducifolio. Su tronco puede ser recto o ramificado, con corteza fisurada o partida, frecuentemente cubierta de musgos o líquenes. Presenta una copa densa, que puede ser redondeada o alargada.",
    Corteza:
      "Externa: De color café con grietas profundas.\n Interna: De tono crema rosáceo, segrega una resina transparente característica.",
    Hojas:
      "Simples, alternas, de forma elíptica a oblanceolada, de color verde brillante. Miden entre 5 y 15 cm de largo.",
    Floración:
      "Flores pequeñas, de color verdoso o blanquecino, agrupadas en panículas (ramilletes).",
    Fruto:
      "Tipo drupa, pequeño y redondeado, de apariencia similar a una aceituna.",
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
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-start gap-3 bg-gray-100 text-gray-800 border border-gray-300 shadow-sm rounded-xl px-5 py-4 max-w-lg"
        >
          <svg
            className="h-6 w-6 mt-1 flex-shrink-0 text-green-600"
            viewBox="0 0 64 64"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M32 2c-5 0-9 3.5-10 8.2-4.5.6-8 4.5-8 9.3 0 .6 0 1.1.2 1.6C10 23.1 8 26.4 8 30c0 5.5 4.5 10 10 10h6v18H26a2 2 0 100 4h12a2 2 0 100-4h-2V40h6c5.5 0 10-4.5 10-10 0-3.6-2-6.9-5.2-8.9.2-.5.2-1 .2-1.6 0-4.8-3.5-8.7-8-9.3C41 5.5 37 2 32 2z" />
          </svg>
          <span className="text-sm font-medium leading-snug">
            {!especie
              ? "No se detectó una especie válida. Asegúrate de que el árbol esté bien enfocado."
              : "Intenta nuevamente con una imagen más clara o desde otro ángulo."}
          </span>
        </motion.div>
      </motion.div>
    );
  }

  const sheet = TECH_SHEETS[especie] ?? { "Especie Detectada": especie };
  const rows = Object.entries(sheet).map(([label, value]) => ({
    label,
    value,
  }));
  rows.unshift({
    label: "Seguridad en el resultado",
    value: `${scoreNum.toFixed(1)}%`,
  });

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
