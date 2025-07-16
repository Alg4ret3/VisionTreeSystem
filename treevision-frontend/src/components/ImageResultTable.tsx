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
    "Nombre Común": "Ciprés Mediterráneo",
    Descripción:
      "Conífera perenne de porte columnar o piramidal, follaje denso verde oscuro y corteza gris. Resistente a la sequía.",
    Hábitat: "Regiones mediterráneas con suelos bien drenados y veranos secos.",
    Distribución:
      "Sur de Europa, Asia Menor y Norte de África; extensamente cultivado en climas templados.",
    "Altura Promedio": "20‑30 m (máx. 35 m)",
    Longevidad: "Hasta 1.000 años en condiciones óptimas",
    Hoja: "Acículas escuamiformes adpresas al ramillo, 2‑5 mm.",
    Fruto: "Gálbulas globosas de 2‑3 cm que maduran en 2 temporadas.",
    Usos: "Madera, setos cortaviento, ornamental, simbología funeraria.",
    "Estado de Conservación": "Preocupación Menor (LC) – IUCN",
  },
  Arrayán: {
    "Nombre Científico": "Luma apiculata",
    "Nombre Común": "Arrayán, Palo Colorado, Temu",
    Descripción:
      "Árbol de corteza canela lisa que se desprende en placas delgadas; hojas perennes pequeñas y aromáticas.",
    Hábitat:
      "Bosques templados y húmedos, a orillas de cursos de agua y lagos.",
    Distribución: "Zona sur de Chile y Argentina (Patagonia).",
    "Altura Promedio": "10‑15 m (máx. 20 m)",
    Longevidad: "Siglos (crecimiento lento)",
    Hoja: "Ovaladas, 1‑2 cm, ápice mucronado, margen entero.",
    Fruto: "Baya globosa negra‑purpúrea, comestible, Ø 1 cm.",
    Usos: "Ornamental, apícola (floración melífera), madera dura para tallas.",
    "Estado de Conservación": "Preocupación Menor (LC) – IUCN",
  },
  Pino: {
    "Nombre Científico": "Pinus spp.",
    "Nombre Común": "Pino (genérico)",
    Descripción:
      "Género de coníferas con acículas agrupadas en fascículos de 2‑5, conos leñosos y resina aromática.",
    Hábitat: "Regiones templadas y frías, desde nivel del mar hasta 4.000 m.",
    Distribución: "Hemisferio Norte (América, Europa, Asia, Norte de África).",
    "Altura Promedio": "15‑45 m (depende de la especie)",
    Longevidad: "200‑800 años; algunos (> 4.000 años).",
    Hoja: "Acículas de 3‑35 cm según la especie, persistencia 2‑6 años.",
    Fruto: "Piñas leñosas que liberan semillas aladas (piñones).",
    Usos: "Madera, pulpa de papel, resina, alimentación (piñones), reforestación.",
    "Estado de Conservación": "Varía por especie, la mayoría LC.",
  },
  "Palo Santo": {
    "Nombre Científico": "Bursera graveolens",
    "Nombre Común": "Palo Santo, Holy Wood",
    Descripción:
      "Árbol aromático de corteza gris y madera rica en aceites esenciales de olor dulce y balsámico.",
    Hábitat: "Bosques secos tropicales con estaciones marcadas.",
    Distribución: "Costa pacífica de Ecuador, Perú y parte de Colombia.",
    "Altura Promedio": "8‑10 m (máx. 12 m)",
    Longevidad: "60‑90 años",
    Hoja: "Compuesta imparipinnada de 5‑7 folíolos elípticos.",
    Fruto:
      "Drupa verde que al madurar se abre exponiendo una semilla negra cubierta de arilo rojo.",
    Usos: "Incienso, aceites esenciales, medicina tradicional, artesanía.",
    "Estado de Conservación": "Casi Amenazado (NT) – IUCN",
  },
};

export default function ImageResultTable({ result }: Props) {
  const especie = (result.especie || "").trim();
  const rawScore = result.score?.replace("%", "") ?? "";
  const scoreNum = parseFloat(rawScore);
  const hasScore = !isNaN(scoreNum);
  const isLowScore = !hasScore || scoreNum < 80;
  const showWarning = !especie || isLowScore;

  // Mostrar advertencia si no hay especie o score bajo
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
          <svg
            className="h-5 w-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.333 11.266c.75 1.334-.213 2.999-1.742 2.999H3.666c-1.53 0-2.492-1.665-1.742-2.999L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 0110 11z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium leading-snug">
            {!especie ? (
              <>No se detectó una especie válida. Intenta con una imagen más clara o completa.</>
            ) : (
              <>Prueba con otra foto o mejor iluminación.</>
            )}
          </span>
        </motion.div>
      </motion.div>
    );
  }

  // Mostrar tabla si hay especie y confianza suficiente
  const sheet = TECH_SHEETS[especie] ?? { "Especie Detectada": especie };
  const rows = Object.entries(sheet).map(([label, value]) => ({ label, value }));
  rows.push({ label: "Score", value: `${scoreNum.toFixed(1)}%` });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.2 }}
      className="overflow-hidden rounded-xl shadow-md ring-1 ring-gray-200 w-full max-w-xl mx-auto"
    >
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="space-y-3 p-4"
      >
        {rows.map((row, i) => (
          <motion.li
            key={row.label}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
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
      </motion.ul>
    </motion.div>
  );
}
