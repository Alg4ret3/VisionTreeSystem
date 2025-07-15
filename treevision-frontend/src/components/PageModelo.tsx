"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { analizarImagen } from "@/utils/api";
import ImageResultTable from "@/components/ImageResultTable";
import AnalyzeButton from "@/components/AnalyzeButton";
import StepsSection from "@/components/StepsSection";

export default function PageModelo() {
  // -----------------------------
  // Estados locales
  // -----------------------------
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const stepsRef =useRef<HTMLDivElement>(null);
  useEffect(() => {
    stepsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const [result, setResult] = useState<{
    especie?: string;
    nombre?: string;
    descripcion?: string;
    habitat?: string;
    score?: string;
  }>({});

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Reset UI
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setResult({});
    setUploadProgress(0);

    // Barra de progreso simulada (100 % tras 0,5 s)
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

  const handleAnalyze = async () => {
    if (!file) return;
    setResult({});
    setIsLoading(true);
    try {
      const data = await analizarImagen(file);
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

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <main className="min-h-screen bg-[#F3F7FF] flex flex-col items-center gap-12 py-10 px-4">
      {/* Sección principal */}
      <section className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Columna izquierda – Upload */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-4 w-full">
          <div className="max-w-6xl mx-auto py-4 px-4">
            <h2
              className="
                text-center font-extrabold tracking-tight
                text-primario      
                text-2xl sm:text-3xl md:text-4xl  /* más grande en pantallas amplias */
                leading-snug secundario
                "
            >
              Sube una
              <span className="text-secundario"> Imagen</span>
            </h2>
            {/* Subrayado  */}
            <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
          </div>
          {/* Preview */}
          <div className="w-56 h-56 border-2 rounded-lg flex items-center justify-center overflow-hidden relative">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm text-center px-4">
                Arrastra o selecciona una imagen
              </span>
            )}
          </div>
          {/* Input */}
          <label className="w-full max-w-xs cursor-pointer text-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="block bg-secundario hover:bg-primario text-white rounded-full px-4 py-2 mt-2 transition">
              Seleccionar imagen
            </span>
          </label>
          {/* Nombre del archivo */}
          {file && (
            <p className="text-gray-500 text-sm truncate max-w-xs">
              {file.name}
            </p>
          )}
          {/* Barra de progreso */}
          {file && (
            <div className="w-full max-w-xs">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
                <div
                  className="bg-secundario h-2.5 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-right mt-1 font-medium text-gray-600">
                {uploadProgress}%
              </p>
            </div>
          )}
          {/* Botón Analizar*/}
          <AnalyzeButton
            disabled={disabled}
            isLoading={isLoading}
            onClick={handleAnalyze}
          />
        </div>
        {/* Columna derecha – Resultados */}
        <div 
        ref={resultRef}
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full">
          <div className="max-w-6xl mx-auto py-4 px-4">
            <h2 className="
                text-center font-extrabold tracking-tight
                text-primario           
                text-2xl sm:text-3xl md:text-4xl  
                leading-snug
                ">
                Prediccion del modelo  
                <span className="text-secundario"> TreeVision&nbsp;AI</span>
            </h2>
            {/* Subrayado  */}
            <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
          </div>
          <ImageResultTable result={result} />
        </div>
      </section>

      {/* Sección de pasos */}
      <div ref={stepsRef}className="px-4 pt-10">
        <StepsSection />
      </div>
    </main>
  );
}
