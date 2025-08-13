"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingWelcome";

export default function Welcome() {
  const router = useRouter(); // Uso esta función para moverme entre páginas
  // Esta función me lleva a la página del modelo
  const handleStart = () => {
    router.push("/modelo");
  };

  const [isLoaded, setIsLoaded] = useState(false); // Aquí guardo si la imagen ya cargó

  // Cuando el componente se monta, cargo la imagen de fondo
  useEffect(() => {
    const img = new window.Image();
    img.src = "/welcome/Background.webp";
    img.onload = () => setIsLoaded(true); // Cuando la imagen carga, cambio el estado
  }, []);

  // Si todavía no cargó la imagen, muestro la pantalla de carga
  if (!isLoaded) return <LoadingScreen />;

  // Estas son las animaciones para la tarjeta principal
  const cardVariants = {
    initial: { opacity: 0, scale: 0.8, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    // Contenedor principal que muestra la imagen de fondo
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/welcome/Background.webp')" }}
    >
      {/* Capa oscura encima de la imagen para que el texto se lea mejor */}
      <div className="absolute inset-0 backdrop-brightness-60 backdrop-blur-xs" />

      {/* Aquí pongo todo el contenido centrado */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        {/* Tarjeta con animación al aparecer */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.02 }} // Cuando paso el mouse, crece un poco
          className="bg-gradient-to-br from-blanco/95 to-blanco/95 
                     backdrop-blur-lg border border-white/30 
                     rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
                     max-w-lg w-full sm:max-w-md p-8 sm:p-10 text-center"
        >
          {/* Logo en la parte superior */}
          <Image
            src="/welcome/VisionTreePasto.svg"
            alt="VisionTreePasto Logo"
            width={150}
            height={50}
            className="w-150 mx-auto animate-[fadeInUp_0.8s_ease-out_forwards]"
          />

          {/* Texto con efecto de máquina de escribir */}
          <p className="text-black text-center mb-0 text-base max-w-prose mx-auto leading-tight">
            <span className="text-black">Bienvenido a </span>
            <span className="text-xl sm:text-2xl font-extrabold text-secundario animate-glow">
              <Typewriter
                words={["VisionTreePasto AI"]} // Esto es lo que escribe
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={90}
                delaySpeed={500}
              />
            </span>
          </p>

          {/* Aquí explico qué hace la app */}
          <div className="text-black text-center text-base max-w-prose mx-auto leading-snug mt-2 space-y-4">
            <p>
              Esta aplicación conecta con la naturaleza usando inteligencia
              artificial. Solo tomas una foto y puedes saber qué especie de
              árbol es, de manera rápida y educativa.
            </p>

            <p>
              El modelo reconoce{" "}
              <span className="font-semibold">cuatro especies nativas</span> del
              <span className="font-semibold text-secundario">
                {" "}
                Centro Ambiental Chimayoy
              </span>
              , en el sur de Colombia. Aunque está limitado, su propósito es
              acercarte a la biodiversidad local.
            </p>

            <span className="inline-block text-sm text-primario font-semibold">
              ¡Descubre, aprende y conecta con tu entorno natural hoy mismo!
            </span>
          </div>

          {/* Botón que me lleva al modelo, con animación */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }} // Hace un pequeño rebote
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }} // Si pongo el mouse encima, crece
              whileTap={{ scale: 0.95 }} // Si lo presiono, se achica un poco
              onClick={handleStart} // Aquí llamo la función que va al modelo
              className="group relative mt-2 px-5 py-2.5 bg-secundario text-white text-base font-semibold rounded-full
                         flex items-center justify-center gap-2
                         cursor-pointer transition-all duration-500 ease-in-out
                         hover:bg-primario hover:shadow-lg"
            >
              {/* Pequeña estrella que parpadea */}
              <span className="absolute -top-1 right-0 animate-ping text-white text-sm">
                ✦
              </span>
              Usar el Modelo
              {/* Flecha al lado derecho */}
              <ArrowRight className="w-5 h-5 transition-transform duration-500 ease-in-out group-hover:translate-x-1.5 group-hover:scale-105" />
            </motion.button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
