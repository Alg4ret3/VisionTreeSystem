"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { supabase } from "@/utils/supabaseClient";

export default function NPSDashboard() {
  const [data, setData] = useState<{ score: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("nps_responses")
        .select("score");

      if (!error && data) {
        setData(data);
      }
    }

    fetchData();
  }, []);

  // Inicializar contador de respuestas de 0 a 10
  const counts = Array(11).fill(0);
  data.forEach((d) => {
    if (typeof d.score === "number" && d.score >= 0 && d.score <= 10) {
      counts[d.score]++;
    }
  });

  // Estructura de datos para Recharts
  const chartData = counts.map((count, score) => ({
    score,
    count,
  }));

  // Asignar color según categoría NPS
  const getBarColor = (score: number) => {
    if (score <= 6) return "#EF4444"; // Detractor - rojo
    if (score <= 8) return "#FBBF24"; // Pasivo - amarillo
    return "#22C55E"; // Promotor - verde
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full"
    >
      {/* Título con línea animada */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold tracking-tight text-primario">
          Distribución de respuestas{" "}
          <span className="text-secundario">NPS</span>
        </h2>
        <motion.div
          className="h-1 w-20 bg-secundario rounded-full mx-auto mt-2 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Contenedor del gráfico responsivo */}
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="score" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip
              wrapperClassName="rounded-lg shadow-md"
              contentStyle={{ fontSize: "14px", borderRadius: "10px" }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
