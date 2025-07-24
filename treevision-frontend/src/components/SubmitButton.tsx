"use client"; // Activa el modo cliente de Next.js para usar hooks y eventos del lado del cliente

// Importación de hooks y librerías necesarias
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Animaciones para el botón
import { FaCheck } from "react-icons/fa"; // Ícono de check (✔)
import Confetti from "react-confetti"; // Librería para mostrar confetti

// Tipado de las props que acepta el botón
interface FancySubmitButtonProps {
  onClick: () => void; // Función que se ejecuta al dar click
  disabled?: boolean; // (opcional) Si está deshabilitado
  children?: React.ReactNode;
  className?: string; // (opcional) Clases adicionales
}

// Componente funcional principal
const SubmitButton = ({
  onClick,
  disabled,
  children,
  className,
}: FancySubmitButtonProps) => {
  const [clicked, setClicked] = useState(false); // Marca si ya se hizo clic (para mostrar el check y evitar múltiples envíos)
  const [confettiVisible, setConfettiVisible] = useState(false); // Controla si se ve el confetti
  const containerRef = useRef<HTMLDivElement>(null); // Referencia al contenedor para calcular su ancho
  const [width, setWidth] = useState(300); // Ancho del contenedor del confetti

  // Efecto para capturar el ancho real del contenedor una vez montado
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // Función que maneja el clic del botón
  const handleClick = () => {
    setClicked(true); // Marca como enviado (desactiva botón y muestra check)
    setConfettiVisible(true); // Activa confetti
    onClick(); // Llama la función que viene por props (por ejemplo, enviar datos)

    // Oculta el confetti después de 2.5 segundos
    setTimeout(() => {
      setConfettiVisible(false);
    }, 2500);
  };

  return (
    // Contenedor del botón y el confetti
    <div
      ref={containerRef}
      className="relative w-full h-[100px] overflow-hidden"
    >
      {/* Confetti que se muestra de forma absoluta sobre el botón */}
      {confettiVisible && (
        <div className="absolute inset-0 pointer-events-none">
          <Confetti
            width={width}
            height={100}
            numberOfPieces={150}
            recycle={false}
            gravity={0.3}
          />
        </div>
      )}

      {/* Botón animado con Framer Motion */}
      <div className="flex justify-center mt-4">
        {/* Botón animado con Framer Motion */}
        <motion.button
          type="button"
          onClick={handleClick}
          disabled={disabled || clicked} // Desactivado si ya se envió o por props
          className={`w-52 bg-secundario text-white py-3 px-6 rounded-xl font-semibold shadow-md transition duration-300 ease-in-out hover:shadow-xl hover:bg-secundario/90 disabled:opacity-50 text-lg ${
            className ?? ""
          }`}
          whileTap={{ scale: 0.95 }} // Efecto al presionar
        >
          {clicked ? (
            <>
              <FaCheck className="inline mr-2 text-xl" /> Enviado
            </>
          ) : (
            children ?? "Enviar"
          )}
        </motion.button>
      </div>
    </div>
  );
};

// Exportación del componente como default
export default SubmitButton;
