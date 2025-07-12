import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // Ícono de flecha para el acordeón en móvil

// Estructura de los datos esperados del resultado de predicción
interface ResultData {
  especie?: string;
  score?: string;
}

// Propiedades que recibe el componente
interface Props {
  result: ResultData;
}

const TECH_SHEETS: Record<string, Record<string, string>> = {
  "Ciprés": {
    "Nombre Científico": "Cupressus sempervirens",
    "Nombre Común": "Ciprés Mediterráneo",
    "Descripción": "Conífera perenne de porte columnar o piramidal, follaje denso verde oscuro y corteza gris. Resistente a la sequía.",
    "Hábitat": "Regiones mediterráneas con suelos bien drenados y veranos secos.",
    "Distribución": "Sur de Europa, Asia Menor y Norte de África; extensamente cultivado en climas templados.",
    "Altura Promedio": "20‑30 m (máx. 35 m)",
    "Longevidad": "Hasta 1.000 años en condiciones óptimas",
    "Hoja": "Acículas escuamiformes adpresas al ramillo, 2‑5 mm.",
    "Fruto": "Gálbulas globosas de 2‑3 cm que maduran en 2 temporadas.",
    "Usos": "Madera, setos cortaviento, ornamental, simbología funeraria.",
    "Estado de Conservación": "Preocupación Menor (LC) – IUCN",
  },
  "Arrayán": {
    "Nombre Científico": "Luma apiculata",
    "Nombre Común": "Arrayán, Palo Colorado, Temu",
    "Descripción": "Árbol de corteza canela lisa que se desprende en placas delgadas; hojas perennes pequeñas y aromáticas.",
    "Hábitat": "Bosques templados y húmedos, a orillas de cursos de agua y lagos.",
    "Distribución": "Zona sur de Chile y Argentina (Patagonia).",
    "Altura Promedio": "10‑15 m (máx. 20 m)",
    "Longevidad": "Siglos (crecimiento lento)",
    "Hoja": "Ovaladas, 1‑2 cm, ápice mucronado, margen entero.",
    "Fruto": "Baya globosa negra‑purpúrea, comestible, Ø 1 cm.",
    "Usos": "Ornamental, apícola (floración melífera), madera dura para tallas.",
    "Estado de Conservación": "Preocupación Menor (LC) – IUCN",
  },
  "Pino": {
    "Nombre Científico": "Pinus spp.",
    "Nombre Común": "Pino (genérico)",
    "Descripción": "Género de coníferas con acículas agrupadas en fascículos de 2‑5, conos leñosos y resina aromática.",
    "Hábitat": "Regiones templadas y frías, desde nivel del mar hasta 4.000 m.",
    "Distribución": "Hemisferio Norte (América, Europa, Asia, Norte de África).",
    "Altura Promedio": "15‑45 m (depende de la especie)",
    "Longevidad": "200‑800 años; algunos (> 4.000 años).",
    "Hoja": "Acículas de 3‑35 cm según la especie, persistencia 2‑6 años.",
    "Fruto": "Piñas leñosas que liberan semillas aladas (piñones).",
    "Usos": "Madera, pulpa de papel, resina, alimentación (piñones), reforestación.",
    "Estado de Conservación": "Varía por especie, la mayoría LC.",
  },
  "Palo Santo": {
    "Nombre Científico": "Bursera graveolens",
    "Nombre Común": "Palo Santo, Holy Wood",
    "Descripción": "Árbol aromático de corteza gris y madera rica en aceites esenciales de olor dulce y balsámico.",
    "Hábitat": "Bosques secos tropicales con estaciones marcadas.",
    "Distribución": "Costa pacífica de Ecuador, Perú y parte de Colombia.",
    "Altura Promedio": "8‑10 m (máx. 12 m)",
    "Longevidad": "60‑90 años",
    "Hoja": "Compuesta imparipinnada de 5‑7 folíolos elípticos.",
    "Fruto": "Drupa verde que al madurar se abre exponiendo una semilla negra cubierta de arilo rojo.",
    "Usos": "Incienso, aceites esenciales, medicina tradicional, artesanía.",
    "Estado de Conservación": "Casi Amenazado (NT) – IUCN",
  },
};

// Componente principal
export default function ImageResultTable({ result }: Props) {
  // Normalizar el nombre de la especie
  const especie = (result.especie || "").trim();

  // Convertir el score recibido en string a número
  const rawScore = result.score?.replace("%", "") ?? "";
  const scoreNum = parseFloat(rawScore);
  const hasScore = !isNaN(scoreNum);
  const isLowScore = !hasScore || scoreNum < 80;
  const showWarning = !especie || isLowScore;
  
  // Estado para controlar el ítem abierto en modo móvil
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Si no hay especie o la confianza es baja, mostrar mensaje de advertencia
  if (showWarning) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 text-center animate-fade-in">
        <div className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 shadow-sm rounded-lg px-4 py-3 max-w-md">
          {/* Ícono de advertencia */}
          <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.333 11.266c.75 1.334-.213 2.999-1.742 2.999H3.666c-1.53 0-2.492-1.665-1.742-2.999L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 0110 11z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium leading-snug">
            {/* Mensaje diferente según si no hay especie o score bajo */}
            {!especie ? (
              <>No se detectó una especie válida. Por favor sube una imagen más clara o con el árbol completo.</>
            ) : (
              <>Confianza insuficiente (<strong>{hasScore ? scoreNum.toFixed(1) : "N/A"}%</strong>). Intenta con otra foto o mejor iluminación.</>
            )}
          </span>
        </div>
      </div>
    );
  }

  // Obtener la ficha técnica correspondiente a la especie detectada
  const sheet = TECH_SHEETS[especie] ?? { "Especie Detectada": especie };

  // Convertir la ficha técnica a un arreglo de filas (label, value)
  const rows = Object.entries(sheet).map(([label, value]) => ({ label, value }));
  rows.push({ label: "Score", value: `${scoreNum.toFixed(1)}%` });


  return (
    <div className="overflow-hidden rounded-xl shadow-md ring-1 ring-gray-200 w-full max-w-xl mx-auto animate-fade-in">
      {/* Vista para escritorio (tabla completa) */}
      <table className="hidden md:table w-full text-sm">
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, idx) => (
            <tr key={row.label} className={idx % 2 ? "bg-white" : "bg-gray-50"}>
              <td className="py-3 px-4 font-semibold text-gray-700">{row.label}</td>
              <td className="py-3 px-4 text-gray-600">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vista para móvil (acordeón por fila) */}
      <ul className="md:hidden divide-y divide-gray-200 text-sm">
        {rows.map((row, idx) => (
          <li key={row.label} className="bg-white">
            <button
              className="flex w-full items-center justify-between py-3 px-4 hover:bg-teal-50 transition"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span className="font-semibold text-gray-700">{row.label}</span>
              {/* Flecha que rota si el ítem está abierto */}
              <ChevronDown
                className={`h-4 w-4 transform transition-transform ${openIdx === idx ? "rotate-180" : "rotate-0"}`}
              />
            </button>
            {/* Contenido expandido */}
            {openIdx === idx && (
              <p className="px-4 pb-3 text-gray-600 animate-fade-in">{row.value}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
