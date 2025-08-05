"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/utils/supabaseClient";
import SubmitButton from "@/components/SubmitButton";
import Lottie from "lottie-react";
import treeAnimation from "@/../public/animations/tree.json"; 

//  Asigna colores según el score NPS
const getScoreColor = (score: number) => {
  if (score <= 6) return "bg-red-100 hover:bg-red-200 text-red-700";
  if (score <= 8) return "bg-yellow-100 hover:bg-yellow-200 text-yellow-700";
  return "bg-green-100 hover:bg-green-200 text-green-700";
};

export default function NPSResponses() {
  const [score, setScore] = useState<number | null>(null); // Guarda la puntuación seleccionada
  const [submitted, setSubmitted] = useState(false); // Estado para controlar si ya se envió

  //  Maneja el envío del score a Supabase
  const handleSubmit = async () => {
    if (score === null) return;

    const { error } = await supabase.from("nps_responses").insert({ score });

    if (!error) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setScore(null);
      }, 2000);
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/*  Título con línea decorativa */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold tracking-tight text-primario">
          ¿Qué tan fácil de usar te pareció{" "}
          <span className="text-secundario">VisionTreePasto AI</span>?
        </h2>

        <motion.div
          className="h-1 w-20 bg-secundario rounded-full mx-auto mt-2 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/*  Botones de puntuación NPS del 0 al 10 */}
      <div className="grid grid-cols-5 gap-4 mb-6 justify-items-center">


        {[...Array(11).keys()].map((num) => {
          const emojis = [
            "😡",
            "😠",
            "😞",
            "😕",
            "😣",
            "😐",
            "😒",
            "🙂",
            "😌",
            "😃",
            "🤩",
          ];
          return (
            <motion.button
              key={`${num}-${score === num}`}
              onClick={() => setScore(num)}
              whileTap={{ rotate: [0, 10, -10, 5, -5, 0] }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`flex flex-col items-center justify-center w-12 h-14 rounded-lg text-sm font-semibold transition-all duration-700 ease-in-out transition-shadow 
                ${
                  score === num
                    ? "ring-2 ring-offset-2 ring-secundario scale-110"
                    : ""
                } ${getScoreColor(num)}`}
            >
              <span className="text-xl">{emojis[num]}</span>
              <span className="text-xs font-bold">{num}</span>
            </motion.button>
          );
        })}
      </div>
      {/* Leyenda de calificación */}
      <div className="text-center text-[13px] sm:text-sm text-black font-medium mb-4 space-y-1">
        <p>
          <span className="text-red-500 font-extrabold">0 – 6:</span> Difícil de
          usar
        </p>
        <p>
          <span className="text-yellow-500 font-extrabold">7 – 8:</span>{" "}
          Medianamente intuitivo
        </p>
        <p>
          <span className="text-green-600 font-extrabold">9 – 10:</span> Muy
          fácil e intuitivo
        </p>
      </div>

      {/*  Botón de enviar */}
      <div className="flex justify-center">
        <SubmitButton
          onClick={handleSubmit}
          disabled={score === null || submitted}
          className="w-44 py-3 text-base bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md transition duration-300 disabled:opacity-50"
        >
          {submitted ? "Enviado" : "Enviar"}
        </SubmitButton>
      </div>
      <div className="mt-6 flex justify-center">
        <Lottie
          animationData={treeAnimation}
          loop
          autoplay
          className="w-50 h-50" 
        />
      </div>

      {/*  Mensaje de agradecimiento animado */}
      <AnimatePresence>
        {submitted && (
          <motion.p
            className="mt-4 text-center text-green-600 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }} // ← animación de salida
            transition={{ duration: 0.5 }} // ← duración de entrada/salida
          >
            ¡Gracias por tu respuesta!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
