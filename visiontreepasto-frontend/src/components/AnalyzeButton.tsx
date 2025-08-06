"use client";

import React from "react";
import clsx from "clsx";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

interface AnalyzeButtonProps {
  /* Desactiva el botón (sin hover, sin rebote, sin clics) */
  disabled: boolean;
  /* Muestra el spinner cuando la petición está en curso */
  isLoading: boolean;
  /* Función que se ejecuta al hacer clic (solo si !disabled) */
  onClick: () => void;
  /* Texto del botón (por defecto "Analizar Imagen") */
  label?: string;
}

export default function AnalyzeButton({
  disabled,
  isLoading,
  onClick,
  label = "Analizar Imagen",
}: AnalyzeButtonProps) {
  /* Coordenadas y rotaciones para 8 rayos */
  const RAYS = [
    { tx: 0, ty: -40, rot: "270deg" },
    { tx: 28, ty: -28, rot: "315deg" },
    { tx: 40, ty: 0, rot: "0deg" },
    { tx: 28, ty: 28, rot: "45deg" },
    { tx: 0, ty: 40, rot: "90deg" },
    { tx: -28, ty: 28, rot: "135deg" },
    { tx: -40, ty: 0, rot: "180deg" },
    { tx: -28, ty: -28, rot: "225deg" },
  ];

  const handleClick = () => {
    if (!disabled && !isLoading) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        "relative flex items-center gap-2 px-6 py-3 mt-2 rounded-full transition-all text-white overflow-hidden",
        !disabled &&
          !isLoading && [
            "bg-primario border-b-[5px]",
            "cursor-pointer animate-bounce motion-safe:animate-bounce",
            "hover:bg-primario/80 hover:-translate-y-[1px] hover:border-b-[6px]",
            "active:border-b-[2px] active:brightness-90 active:translate-y-[2px]",
          ],
        isLoading && ["bg-primario border-b-0 cursor-wait"],
        disabled && !isLoading && ["bg-gray-400 border-b-0 cursor-not-allowed"]
      )}
    >
      {/* Rayos animados mientras carga */}
      {isLoading &&
        RAYS.map(({ tx, ty, rot }, i) => (
          <motion.span
            key={i}
            style={
              {
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
                "--rot": rot,
              } as React.CSSProperties
            }
            className="ray absolute inset-0 flex justify-center items-center pointer-events-none"
            animate={{ opacity: [0, 1, 0], scaleY: [0, 1.2, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          >
            <svg
              className="w-1 h-8 text-[#00FF66] drop-shadow-[0_0_6px_#00FF66]"
              viewBox="0 0 2 16"
              fill="currentColor"
            >
              <rect x="0" y="0" width="2" height="16" rx="1" />
            </svg>
          </motion.span>
        ))}

      {/* Spinner de carga o texto + ícono */}
      {isLoading ? (
        <div className="loading-bar">
          <span />
        </div>
      ) : (
        <>
          {label}
          <FaEye className="text-white text-base" />
        </>
      )}

      {/* Estilos personalizados */}
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
