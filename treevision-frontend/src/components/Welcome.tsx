"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingWelcome";


export default function Welcome() {
  const router = useRouter(); // Hook de Next.js para navegación entre rutas
  // Función para redirigir a la página del modelo
  const handleStart = () => {
    router.push("/modelo");
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/welcome/Background.webp";
    img.onload = () => setIsLoaded(true);
  }, []);

  if (!isLoaded) return <LoadingScreen />;

  // Definición de variantes para animación de entrada con Framer Motion
  const cardVariants = {
    initial: { opacity: 0, scale: 0.8, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    // Contenedor principal con imagen de fondo y altura de pantalla completa
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/welcome/Background.webp')" }}
    >
      {/* Capa oscura para mejorar el contraste del contenido */}
      <div className="absolute inset-0 backdrop-brightness-60 backdrop-blur-xs" />

      {/* Contenido central del componente */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        {/* Tarjeta animada con Framer Motion */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blanco/95 to-blanco/95 
                     backdrop-blur-lg border border-white/30 
                     rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
                     max-w-lg w-full sm:max-w-md p-8 sm:p-10 text-center"
        >
          {/* Logo de la aplicación */}
          <Image
            src="/welcome/VisionTreePasto.svg"
            alt="VisionTreePasto Logo"
            width={150}
            height={50}
            className="w-150 mx-auto animate-[fadeInUp_0.8s_ease-out_forwards]"
          />

          {/* Encabezado con máquina de escribir animada */}
          <p className="text-black text-center mb-0 text-base max-w-prose mx-auto leading-tight">
            <span className="text-black">Bienvenido a </span>
            <span className="text-xl sm:text-2xl font-extrabold text-secundario animate-glow">
              <Typewriter
                words={["VisionTreePasto AI"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={90}
                delaySpeed={500}
              />
            </span>
          </p>

          {/* Párrafos explicativos del proyecto */}
          <div className="text-black text-center text-base max-w-prose mx-auto leading-snug mt-2 space-y-4">
            <p>
              Es tu conexión con la naturaleza a través del poder de la
              inteligencia artificial. Con solo tomar una fotografía, puedes
              descubrir qué especie de árbol estás observando, de forma rápida,
              visual y educativa.
            </p>

            <p>
              Este modelo está diseñado exclusivamente para identificar{" "}
              <span className="font-semibold">cuatro especies nativas</span> del
              <span className="font-semibold text-secundario">
                {" "}
                Centro Ambiental Chimayoy
              </span>
              , en el sur de Colombia. Aunque su alcance es específico, su
              propósito es claro: acercarte a la biodiversidad local de una
              manera sencilla y significativa.
            </p>

            <span className="inline-block text-sm text-primario font-semibold">
              ¡Descubre, aprende y conecta con tu entorno natural hoy mismo!
            </span>
          </div>

          {/* Botón animado con efecto de rebote infinito */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center"
          >
            {/* Botón interactivo con ícono y efecto ping decorativo */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="group relative mt-2 px-5 py-2.5 bg-secundario text-white text-base font-semibold rounded-full
                         flex items-center justify-center gap-2
                         cursor-pointer transition-all duration-500 ease-in-out
                         hover:bg-primario hover:shadow-lg"
            >
              {/* Efecto visual decorativo (estrella que parpadea) */}
              <span className="absolute -top-1 right-0 animate-ping text-white text-sm">
                ✦
              </span>
              Usar el Modelo
              {/* Ícono de flecha hacia la derecha */}
              <ArrowRight className="w-5 h-5 transition-transform duration-500 ease-in-out group-hover:translate-x-1.5 group-hover:scale-105" />
            </motion.button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
