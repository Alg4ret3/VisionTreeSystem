import React, { useState } from "react";
import clsx from "clsx";
import { FaEye } from 'react-icons/fa';


interface AnalyzeButtonProps {
  /** Desactiva el botón (sin hover, sin rebote, sin clics) */
  disabled: boolean;
  /** Muestra el spinner cuando la petición está en curso */
  isLoading: boolean;
  /** Función que se ejecuta al hacer clic (solo si !disabled) */
  onClick: () => void;
  /** Texto del botón (por defecto "Analizar Imagen") */
  label?: string;
}

export default function AnalyzeButton({
  disabled,
  isLoading,
  onClick,
  label = "Analizar Imagen",
}: AnalyzeButtonProps) {
  const [explode, setExplode] = useState(false);

  /** Coordenadas y rotaciones para 8 rayos */
  const RAYS = [
    { tx: 0,   ty: -40, rot: "270deg" },   // arriba
    { tx: 28,  ty: -28, rot: "315deg" },   // arriba-derecha
    { tx: 40,  ty: 0,   rot: "0deg" },     // derecha
    { tx: 28,  ty: 28,  rot: "45deg" },    // abajo-derecha
    { tx: 0,   ty: 40,  rot: "90deg" },    // abajo
    { tx: -28, ty: 28,  rot: "135deg" },   // abajo-izquierda
    { tx: -40, ty: 0,   rot: "180deg" },   // izquierda
    { tx: -28, ty: -28, rot: "225deg" },   // arriba-izquierda
  ];

  const handleClick = () => {
    if (disabled) return;
    setExplode(true);     // activa explosión
    onClick();            // ejecuta lógica principal
    setTimeout(() => setExplode(false), 800); // limpia rayos
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        'relative flex items-center gap-2 px-6 py-3 mt-2 rounded-full border-b-[5px] transition-all',
        'bg-[#023859] text-white ',
        !disabled &&
          'cursor-pointer animate-bounce motion-safe:animate-bounce ' +
            'hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] ' +
            'active:border-b-[2px] active:brightness-90 active:translate-y-[2px]',
        disabled && !isLoading && 'cursor-not-allowed bg-gray-400 border-b-0'
      )}
    >
      {/* RAYOS eléctricos estilo ciberpunk */}
      {explode &&
        RAYS.map(({ tx, ty, rot }, i) => (
          <span
            key={i}
            style={
              {
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
              "--rot": rot,
             } as React.CSSProperties
            }
            className="ray absolute inset-0 flex justify-center items-center pointer-events-none"
          >
            <svg
              className="w-1 h-8 text-cyan-400 drop-shadow-[0_0_6px_#00ffff]"
              viewBox="0 0 2 16"
              fill="currentColor"
            >
              <rect x="0" y="0" width="2" height="16" rx="1" />
            </svg>
          </span>
        ))}

      {/* Spinner de carga o texto del botón */}
      {isLoading ? (
        <div className="loading-bar">
          <span />
        </div>
      ) : (
        <>
        {label}
        <FaEye  className="text-white text-base" />
        </>
      )}
      {/* CSS para la animación de rayos */}
      <style jsx>{`
        .ray {
          animation: burst 0.6s ease-out forwards;
        }
        @keyframes burst {
          0% {
            transform: translate(0, 0) rotate(var(--rot)) scaleY(0);
            opacity: 1;
          }
          60% {
            transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scaleY(1.2);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scaleY(0.4);
            opacity: 0;
          }
        }
      `}</style>
              <style jsx>{`
            .loading-bar {
              width: 40px;
              height: 4px;
              overflow: hidden;
              background: #ffffff40;
              border-radius: 4px;
              position: relative;
            }
            .loading-bar span {
              position: absolute;
              height: 100%;
              width: 40%;
              background: white;
              animation: slide 1s infinite ease-in-out;
            }
            @keyframes slide {
              0% {
                left: -40%;
              }
              50% {
                left: 100%;
              }
              100% {
                left: 100%;
              }
            }
          `}</style>
    </button>
  );
}