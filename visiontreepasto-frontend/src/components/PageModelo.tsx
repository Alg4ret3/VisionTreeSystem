"use client";
// Indico que este componente se ejecuta en el cliente

// Importo React y los hooks que necesito
import React, { useState, useRef, useCallback, ChangeEvent } from "react";
// Importo la función que analiza la imagen (llama a la API)
import { analizarImagen } from "@/utils/api";
// Importo componentes que voy a usar en esta página
import ImageResultTable from "@/components/containers/ImageResultTable";
import AnalyzeButton from "@/components/ui/AnalyzeButton";
import StepsSection from "@/components/containers/StepsSection";
import ImageUploader from "@/components/containers/ImageUploader";
import NPSDashboard from "@/components/containers/NpsDashboard";
import NPSResponses from "@/components/containers/NpsResponses";
import { motion } from "framer-motion"; // Esto es para animaciones
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useEffect } from "react";

export default function PageModelo() {
  // Aquí defino los estados que necesito para manejar datos y la interfaz
  const [file, setFile] = useState<File | null>(null); // Imagen que selecciona el usuario
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Para mostrar la imagen antes de analizar
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Simulo el progreso de carga
  const [isLoading, setIsLoading] = useState(false); // Para saber si el modelo está procesando
  const [highlight, setHighlight] = useState(false); // Para activar una animación cuando el usuario interactúa

  // Referencias para hacer scroll a secciones específicas
  const resultRef = useRef<HTMLDivElement>(null);
  const pasosRef = useRef<HTMLDivElement>(null);

  // Aquí guardo los resultados del modelo (vacíos al inicio)
  const [result, setResult] = useState({
    especie: "",
    nombre: "",
    descripcion: "",
    habitat: "",
    score: "",
  });

  // Esta función activa la animación en los pasos y hace scroll hasta ellos
  const triggerHighlight = useCallback(() => {
    pasosRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlight(true);
    setTimeout(() => setHighlight(false), 1500); // Después de 1.5 segundos la apago
  }, []);

  // Cuando el usuario elige una imagen, la guardo y genero una vista previa
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));

    // Reinicio los resultados porque hay una nueva imagen
    setResult({
      especie: "",
      nombre: "",
      descripcion: "",
      habitat: "",
      score: "",
    });

    setUploadProgress(0);

    // Aquí simulo que la imagen se va cargando poco a poco
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

  // Esta función llama al modelo para analizar la imagen
  const handleAnalyze = async () => {
    if (!file) return;

    // Reinicio los resultados antes de analizar
    setResult({
      especie: "",
      nombre: "",
      descripcion: "",
      habitat: "",
      score: "",
    });

    setIsLoading(true); // Activo el estado de carga

    try {
      // Llamo a la función que conecta con la API
      const data = await analizarImagen(file);

      // Actualizo el resultado con lo que devuelve el modelo
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
      setIsLoading(false); // Desactivo el estado de carga
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // El botón de analizar solo funciona si hay imagen y la carga terminó
  const disabled = !file || uploadProgress < 100 || isLoading;

  // Al cargar la página, la llevo al inicio
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Aquí dibujo todo en pantalla
  return (
    <main className="min-h-screen bg-blanco flex flex-col items-center gap-12 py-10 px-4">
      {/* Sección principal con el uploader y los resultados */}
      <section
        id="Principal"
        className="w-full max-w-6xl grid md:grid-cols-2 gap-8 scroll-mt-28"
      >
        {/* Columna izquierda: subir imagen */}
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
          {/* Título de la sección */}
          <div className="max-w-6xl mx-auto py-4 px-4">
            <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug secundario">
              Sube una <span className="text-secundario">Imagen</span>
            </h2>
            <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
          </div>

          {/* Componente para elegir la imagen */}
          <ImageUploader
            file={file}
            previewUrl={previewUrl}
            uploadProgress={uploadProgress}
            onFileChange={handleFileChange}
          />

          {/* Botón que analiza la imagen */}
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
          {/* Título */}
          <div className="max-w-6xl mx-auto py-4 px-4">
            <h2 className="text-center font-extrabold tracking-tight text-primario text-2xl sm:text-3xl md:text-4xl leading-snug">
              Predicción del modelo{" "}
              <span className="text-secundario">VisionTreePasto AI</span>
            </h2>
            <div className="mx-auto mt-2 h-1 w-20 bg-secundario rounded-full" />
          </div>

          {/* Tabla para ver el resultado */}
          <div className="hidden md:block overflow-y-auto max-h-[500px] p-4 bg-white rounded-lg scroll-secundario">
            <ImageResultTable result={result} />
          </div>

          {/* Para móvil, la tabla sin scroll */}
          <div className="md:hidden">
            <ImageResultTable result={result} />
          </div>
        </div>
      </section>

      {/* Sección de pasos para guiar al usuario */}
      <div className="px-4 pt-10">
        <StepsSection onStepClick={triggerHighlight} />
      </div>

      {/* Carrusel de lugares turísticos */}
      <div
        id="lugares"
        className="w-full max-w-6xl grid md:grid-cols-1 gap-8 scroll-mt-28"
      >
        <ImageCarousel bg-white />
      </div>

      {/* Encuesta NPS para saber qué le pareció al usuario */}
      <div
        id="calificacion-usuario"
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-0"
      >
        <NPSResponses />
        <NPSDashboard />
      </div>
    </main>
  );
}
