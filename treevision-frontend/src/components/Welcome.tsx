"use client"; // Necesario para usar el hook useRouter (funciona solo del lado del cliente)
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"; // Icono de flecha derecha de lucide-react
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
export default function Welcome() {
  const router = useRouter(); // Hook para navegar entre páginas

  return (
    // Contenedor principal con imagen de fondo
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/welcome/Background.png')" }} // Imagen de fondo desde public/
    >
      {/* Capa oscura encima de la imagen para mejorar contraste */}
      <div className="absolute inset-0 backdrop-brightness-60 backdrop-blur-xs" />

      {/* Contenido principal centrado */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        {/* Tarjeta blanca con sombra y borde redondeado */}
        <div className="bg-blanco bg-opacity-90 max-w-lg w-full sm:max-w-md rounded-3xl shadow-xl p-6 sm:p-8 text-center">
          {/* Logo en la parte superior */}
          <Image
            src="/welcome/Treevision.svg"
            alt="TreeVision Logo"
            width={150}
            height={50}
            className="w-150 h- 50 mx-auto  animate-[fadeInUp_0.8s_ease-out_forwards]"
          />

          {/* Párrafo de bienvenida */}
          <p className="text-black text-center mb-0 text-base max-w-prose mx-auto">
            <span className="text-black text-center mb-4 text-base max-w-prose mx-auto">
              Bienvenido a{" "}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-secundario animate-glow">
              <Typewriter
                words={["TreeVision AI"]}
                loop={0} // infinito
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1500}
              />
            </span>
            <br />
            Conecta con la naturaleza a través de la inteligencia artificial.
            TreeVision AI es una herramienta innovadora que te permite
            identificar especies de árboles simplemente tomando una fotografía.
            Gracias al poder del aprendizaje automático, puedes descubrir la
            riqueza natural que te rodea en cuestión de segundos.
          </p>
          {/* Lista numerada de pasos */}
          <div className="text-left text-black mb-6 animate-[fadeInUp_1.2s_ease-out_forwards]">
            <p className="font-extrabold text-secundario">
              Pasos para usar TreeVision AI:
            </p>
            <ol className="list-decimal ml-6 mt-2">
              <li>Toma una foto del árbol.</li>
              <li>El modelo analiza automáticamente la imagen.</li>
              <li>Te muestra el nombre de la especie y más información.</li>
            </ol>
          </div>

          {/* Botón para ir a la página del modelo */}
          <div className="flex justify-center animate-[fadeInUp_1.4s_ease-out_forwards]">
            <button
              onClick={() => router.push("/modelo")} // Redirige a la ruta
              className="group mt-6 px-5 py-2.5 bg-secundario text-white text-base font-semibold rounded-full
                        flex items-center justify-center gap-2
                        cursor-pointer transition-all duration-500 ease-in-out
                        animate-bounce
                        hover:bg-primario hover:shadow-lg"
            >
              Usar el Modelo
              <ArrowRight className="w-5 h-5 transition-transform duration-500 ease-in-out group-hover:translate-x-1.5 group-hover:scale-105" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
