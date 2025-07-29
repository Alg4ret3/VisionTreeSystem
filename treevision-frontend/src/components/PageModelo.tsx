"use client";

import React, { useState, useRef, useCallback, ChangeEvent } from "react";
import { analizarImagen } from "@/utils/api";
import ImageResultTable from "@/components/ImageResultTable";
import AnalyzeButton from "@/components/AnalyzeButton";
import StepsSection from "@/components/StepsSection";
import ImageUploader from "@/components/ImageUploader";
import NPSDashboard from "@/components/NpsDashboard";
import NPSResponses from "@/components/NpsResponses";
import { motion } from "framer-motion";
import ImageCarousel from "@/components/ImageCarousel";
import { useEffect } from "react";

export default function PageModelo() {
  // -----------------------------
  // Estados locales
  // -----------------------------
  const [file, setFile] = useState<File | null>(null); // Imagen seleccionada
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // URL para previsualizar la imagen
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Progreso simulado de carga
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [highlight, setHighlight] = useState(false); // Activar animación

  // Referencias para hacer scroll
  const resultRef = useRef<HTMLDivElement>(null);
  const pasosRef = useRef<HTMLDivElement>(null);

  // Resultado de la predicción inicializado con valores vacíos
  const [result, setResult] = useState({
    especie: "",
    nombre: "",
    descripcion: "",
    habitat: "",
    score: "",
  });

  // -----------------------------
  // Función para activar la animación y hacer scroll al div
  // -----------------------------
  const triggerHighlight = useCallback(() => {
    // Hacer scroll hacia el div
    pasosRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    // Activar animación y desactivarla luego de 1.5s
    setHighlight(true);
    setTimeout(() => setHighlight(false), 1500);
  }, []);

  // -----------------------------
  // Manejar cambio de archivo
  // -----------------------------
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));

    // Reiniciar resultado a estado vacío
    setResult({
      especie: "",
      nombre: "",
      descripcion: "",
      habitat: "",
      score: "",
    });

    setUploadProgress(0);

    // Simular progreso de carga
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 20;
      });
    }, 100);
  };

  // -----------------------------
  // Analizar imagen y mostrar resultado
  // -----------------------------
  const handleAnalyze = async () => {
    if (!file) return;

    // Resetear resultado antes de nueva predicción
    setResult({
      especie: "",
      nombre: "",
      descripcion: "",
      habitat: "",
      score: "",
    });

    setIsLoading(true);

    try {
      const data = await analizarImagen(file);

      // Establecer los resultados del modelo
      setResult({
        especie: data.class_names?.[0] || "—",
        nombre: data.class_names?.[0] || "—",
        descripcion: `Detección de ${data.class_names?.[0] || "especie"}`,
        habitat: "—",
        score: data.scores?.[0] ? `${(data.scores[0] * 100).toFixed(1)}%` : "—",
      });
    } catch {
      alert("Hubo un error analizando la imagen");
    } finally {
      setIsLoading(false);
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const disabled = !file || uploadProgress < 100 || isLoading;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // -----------------------------
  // Renderizado
  // -----------------------------
  return (
    <main className="min-h-screen bg-blanco flex flex-col items-center gap-12 py-10 px-4">
      {/* Sección principal */}
      <section
        id="Principal"
        className="w-full max-w-6xl grid md:grid-cols-2 gap-8 scroll-mt-28"
      >
        {/* Columna izquierda: uploader */}
        <motion.div
          id="pasos"
          ref={pasosRef}
          className="bg-white rounded-lg shadow-lg scroll-mt-32 p-6 flex flex-col items-center gap-4 w-full"
          animate={
            highlight
              ? {
                  backgroundColor: [
                    "#ffffff",
                    "#bbf7d0",
                    "#ffffff",
                    "#bbf7d0",
                    "#ffffff",
                  ],
                }
              : {
                  backgroundColor: "#ffffff",
                }
          }
          transition={{
            duration: 1.5,
            times: [0, 0.2, 0.5, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          {/* Título */}
          <div className="max-w-6xl mx-auto py-4 px-4">
            <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug secundario">
              Sube una <span className="text-secundario">Imagen</span>
            </h2>
            <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
          </div>

          {/* Componente para subir imagen */}
          <ImageUploader
            file={file}
            previewUrl={previewUrl}
            uploadProgress={uploadProgress}
            onFileChange={handleFileChange}
          />

          {/* Botón para analizar imagen */}
          <AnalyzeButton
            disabled={disabled}
            isLoading={isLoading}
            onClick={handleAnalyze}
          />
        </motion.div>

        {/* Columna derecha: resultados */}
        <div
          ref={resultRef}
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full"
        >
          <div className="max-w-6xl mx-auto py-4 px-4">
            <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug">
              Predicción del modelo{" "}
              <span className="text-secundario">TreeVision AI</span>
            </h2>
            <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
          </div>

          {/* Tabla de resultados */}
          <div className="hidden md:block overflow-y-auto max-h-[500px] p-4 bg-white rounded-lg scroll-secundario">
            <ImageResultTable result={result} />
          </div>

          {/* Solo móvil: tabla sin contenedor */}
          <div className="md:hidden">
            <ImageResultTable result={result} />
          </div>
        </div>
      </section>

      {/* Sección de pasos */}
      <div className="px-4 pt-10">
        {/* triggerHighlight se pasa como prop para que StepsSection lo use al hacer clic */}
        <StepsSection onStepClick={triggerHighlight} />
      </div>
      {/* Sección de lugares turisticos */}
      <div
        id="lugares"
        className="w-full max-w-6xl grid md:grid-cols-1 gap-8 scroll-mt-28"
      >
        <ImageCarousel bg-white />
      </div>

      {/* Sección de NPS (en la parte inferior) */}
      <div
        id="calificacion-usuario"
        className="w-full max-w-6xl grid md:grid-cols-2 gap-8 scroll-mt-28"
      >
        <NPSResponses />
        <NPSDashboard />
      </div>
    </main>
  );
}
