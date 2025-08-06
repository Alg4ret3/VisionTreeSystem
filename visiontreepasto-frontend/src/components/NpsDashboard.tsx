"use client"; 
// Indico que este componente se ejecuta en el cliente


// Importo React y hooks
import { useEffect, useState } from "react";
// Importo animaciones de Framer Motion
import { motion } from "framer-motion";
// Importo componentes de Recharts para hacer el gráfico de barras
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
// Importo cliente de Supabase para traer datos
import { supabase } from "@/utils/supabaseClient";

export default function NPSDashboard() {
  // Estado para guardar las respuestas de Supabase
  const [data, setData] = useState<{ score: number }[]>([]);

  // Cuando el componente carga, traigo los datos desde la tabla nps_responses
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("nps_responses")
        .select("score");

      if (!error && data) {
        setData(data); // Guardo los datos si todo sale bien
      }
    }

    fetchData();
  }, []);

  // Creo un arreglo con 11 posiciones (0 a 10) para contar las respuestas
  const counts = Array(11).fill(0);
  data.forEach((d) => {
    if (typeof d.score === "number" && d.score >= 0 && d.score <= 10) {
      counts[d.score]++; // Sumamos 1 en la posición que corresponde al score
    }
  });

  // Organizo los datos en un formato que Recharts necesita: [{ score: 0, count: X }, ...]
  const chartData = counts.map((count, score) => ({
    score,
    count,
  }));

  // Función para asignar un color a cada barra según el tipo NPS
  const getBarColor = (score: number) => {
    if (score <= 6) return "#EF4444"; // Rojo para detractores
    if (score <= 8) return "#FBBF24"; // Amarillo para pasivos
    return "#22C55E"; // Verde para promotores
  };

  return (
    <motion.section
      // Animación de entrada cuando se ve en pantalla
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl mx-auto mt-8"

    >
      {/* Título con línea animada */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold tracking-tight text-primario">
          Nivel de satisfacción de usuarios que usan{" "}
          <span className="text-secundario">VisionTreePasto AI</span>
        </h2>
        <motion.div
          className="h-1 w-20 bg-secundario rounded-full mx-auto mt-2 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Contenedor para el gráfico (ocupa todo el ancho y se adapta a la altura) */}
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            {/* Eje X con los números del 0 al 10 */}
            <XAxis dataKey="score" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]} // Bordes redondeados arriba
              isAnimationActive={true}
              animationDuration={800}
              animationBegin={200}
            >
              {/* Pinto cada barra con el color que corresponde al tipo */}
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
              ))}
              {/* Muestro la cantidad encima de cada barra */}
              <LabelList
                dataKey="count"
                position="top"
                style={{ fontSize: 12, fill: "#374151", fontWeight: "bold" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
