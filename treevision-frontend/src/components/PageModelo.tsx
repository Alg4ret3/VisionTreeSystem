"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { analizarImagen } from "@/utils/api";
import ImageResultTable from "@/components/ImageResultTable";
import AnalyzeButton from "@/components/AnalyzeButton";

export default function PageModelo() {
  // -----------------------------
  // Estados locales
  // -----------------------------
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
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
    } catch  {
      alert("Hubo un error analizando la imagen");
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = !file || uploadProgress < 100 || isLoading;

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <main className="min-h-screen bg-[#F3F7FF] flex flex-col items-center gap-12 py-10 px-4">
      {/* ------------------------- */}
      {/* Sección principal */}
      {/* ------------------------- */}
      <section className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Columna izquierda – Upload */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-4 w-full">
          <h2 className="text-xl font-extrabold text-center text-[#2394C8] mb-2">Sube una Imagen</h2>

          {/* Preview */}
          <div className="w-56 h-56 border-2 rounded-lg flex items-center justify-center overflow-hidden relative">
            {previewUrl ? (
              <Image src={previewUrl} alt="Preview" fill className="object-cover" />
            ) : (
              <span className="text-gray-400 text-sm text-center px-4">
                Arrastra o selecciona una imagen
              </span>
            )}
          </div>

          {/* Input */}
          <label className="w-full max-w-xs cursor-pointer text-center">
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <span className="block bg-[#2394C8] hover:bg-sky-800 text-white rounded-full px-4 py-2 mt-2 transition">
              Seleccionar imagen
            </span>
          </label>

          {/* Nombre del archivo */}
          {file && <p className="text-gray-500 text-sm truncate max-w-xs">{file.name}</p>}

          {/* Barra de progreso */}
          {file && (
            <div className="w-full max-w-xs">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
                <div className="bg-[#2394C8] h-2.5 transition-all" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-xs text-right mt-1 font-medium text-gray-600">{uploadProgress}%</p>
            </div>
          )}
          {/* Botón Analizar (componente reutilizable) */}
          <AnalyzeButton disabled={disabled} isLoading={isLoading} onClick={handleAnalyze} />
        </div>

        {/* Columna derecha – Resultados */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full">
          <h2 className="text-xl font-bold text-[#2394C8] text-center mb-2">Resultados de la Imagen</h2>
          <ImageResultTable result={result} />
        </div>
      </section>

      {/* ------------------------- */}
      {/* Sección de pasos */}
      {/* ------------------------- */}
      <section className="w-full max-w-6xl grid md:grid-cols-5 gap-6">
        {[
          {
            step: 1,
            title: "Toma una foto clara del árbol que quieras identificar.",
            desc: "Asegúrate de que la imagen esté enfocada y muestre bien las hojas, corteza o copa.",
          },
          {
            step: 2,
            title: "Sube la imagen al sistema desde tu dispositivo.",
            desc: "Puedes arrastrarla al área designada o hacer clic para buscarla en tus archivos.",
          },
          {
            step: 3,
            title: "Haz clic en 'Analizar imagen'.",
            desc: "El modelo comenzará a procesar la foto usando visión por computadora e IA.",
          },
          {
            step: 4,
            title: "Espera unos segundos mientras se procesa.",
            desc: "El sistema analiza características del árbol y consulta información relacionada.",
          },
          {
            step: 5,
            title: "Revisa los resultados.",
            desc: "Verás el nombre de la especie detectada, su descripción, hábitat, etc.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-3 shadow-md transition hover:shadow-lg"
          >
            <span className="bg-sky-900 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              {item.step}
            </span>
            <p className="font-semibold text-center text-sm">{item.title}</p>
            <p className="text-gray-600 text-xs leading-snug text-center">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
