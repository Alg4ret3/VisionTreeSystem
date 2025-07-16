// src/components/ImageUploader.tsx
"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploaderProps {
  file: File | null;
  previewUrl: string | null;
  uploadProgress: number;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploader({
  file,
  previewUrl,
  uploadProgress,
  onFileChange,
}: ImageUploaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-4"
    >
      {/* Preview */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-56 h-56 border-2 border-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative shadow-md hover:shadow-lg transition-shadow"
      >
        <AnimatePresence mode="wait">
          {previewUrl ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              <Image
                src={previewUrl}
                alt="Vista previa"
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <motion.span
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 text-sm text-center px-4"
            >
              Arrastra, toma o selecciona
              <br />
              una foto
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Botones de acción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-3"
      >
        {/* Seleccionar desde galería */}
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block bg-secundario hover:bg-primario text-white rounded-full px-4 py-2 transition"
          >
            Seleccionar foto
          </motion.span>
        </label>

        {/* Tomar foto (cámara) */}
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={onFileChange}
          />
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="block bg-secundario hover:bg-primario text-white rounded-full px-4 py-2 transition"
          >
            <FaCamera className="text-2xl" />
          </motion.span>
        </label>
      </motion.div>

      {/* Nombre y progreso */}
      <AnimatePresence>
        {file && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center gap-1"
          >
            <p className="text-gray-500 text-sm truncate max-w-xs">
              {file.name}
            </p>
            <div className="w-full max-w-xs">
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="bg-secundario h-2.5"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-right mt-1 font-medium text-gray-600">
                {uploadProgress}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}