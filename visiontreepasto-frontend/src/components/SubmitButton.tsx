"use client";
// Indico que este componente se ejecuta en el cliente


// Importo los hooks y librerías que voy a usar
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Para darle animaciones al botón
import { FaCheck } from "react-icons/fa"; // Este es el ícono del check (✔)
import Confetti from "react-confetti"; // Esta librería me permite mostrar confetti

// Aquí defino las propiedades que le puedo pasar al botón
interface FancySubmitButtonProps {
  onClick: () => void; // Esta es la función que se ejecuta cuando doy clic
  disabled?: boolean; // Esto es opcional, sirve para desactivar el botón
  children?: React.ReactNode; // Aquí puedo pasarle contenido personalizado al botón
  className?: string; // Si quiero agregar clases extra, lo hago aquí
}

// Aquí creo el componente principal del botón
const SubmitButton = ({
  onClick,
  disabled,
  children,
  className,
}: FancySubmitButtonProps) => {
  // Estado para saber si ya di clic, así muestro el check y evito más envíos
  const [clicked, setClicked] = useState(false);

  // Estado para saber si el confetti está activo o no
  const [confettiVisible, setConfettiVisible] = useState(false);

  // Creo una referencia para saber el tamaño del contenedor del botón
  const containerRef = useRef<HTMLDivElement>(null);

  // Guardo el ancho y alto del contenedor, para que el confetti ocupe ese espacio
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(100);

  // Cuando el componente se monta, calculo el tamaño real del contenedor
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
      setHeight(containerRef.current.offsetHeight);
    }
  }, []);

  // Aquí manejo lo que pasa cuando doy clic en el botón
  const handleClick = () => {
    setClicked(true); // Cambio el estado para que el botón muestre "Enviado"
    setConfettiVisible(true); // Activo el confetti
    onClick(); // Ejecuto la función que me pasan por props (ej: enviar datos)

    // Después de 2.5 segundos, apago el confetti
    setTimeout(() => {
      setConfettiVisible(false);
    }, 2500);
  };

  return (
    // Este div es el contenedor general del botón y el confetti
    <div
      ref={containerRef}
      className="relative w-full h-[100px] overflow-hidden"
    >
      {/* Aquí muestro el confetti solo si confettiVisible está en true */}
      {confettiVisible && (
        <div className="absolute inset-0 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={150} // Cantidad de pedacitos de confetti
            recycle={false} // Para que no se repita
            gravity={0.3} // Velocidad con la que cae
          />
        </div>
      )}

      {/* Aquí pongo el botón centrado */}
      <div className="flex justify-center mt-4">
        {/* Botón animado con Framer Motion */}
        <motion.button
          type="button"
          onClick={handleClick}
          disabled={disabled || clicked} // Si está deshabilitado o ya hice clic
          className={`w-52 bg-secundario text-white py-3 px-6 rounded-xl font-semibold shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:bg-secundario/90 disabled:opacity-50 text-lg ${
            className ?? ""
          }`}
          whileTap={{ scale: 0.95 }} // Pequeño efecto al presionar
        >
          {/* Si ya hice clic, muestro el check y el texto "Enviado" */}
          {clicked ? (
            <>
              <FaCheck className="inline mr-2 text-xl" /> Enviado
            </>
          ) : (
            // Si no, muestro el texto que viene por props o el que pongo por defecto
            children ?? "Enviar"
          )}
        </motion.button>
      </div>
    </div>
  );
};

// Exporto el componente para poder usarlo en otros archivos
export default SubmitButton;
