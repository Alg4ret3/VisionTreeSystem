// src/components/ImageUploader.tsx
"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

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
    <div className="flex flex-col items-center gap-4">
      {/* Preview */}
      <div className="w-56 h-56 border-2 border-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Vista previa"
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm text-center px-4">
            Arrastra, toma o selecciona
            <br />
            una foto
          </span>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3">
        {/* Seleccionar desde galería */}
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <span className="block bg-secundario hover:bg-primario text-white rounded-full px-4 py-2 transition">
            Seleccionar foto
          </span>
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
          <span className="block bg-secundario hover:bg-primario text-white rounded-full px-4 py-2 transition">
            <FaCamera className="text-2xl" />
          </span>
        </label>
      </div>

      {/* Nombre y progreso */}
      {file && (
        <>
          <p className="text-gray-500 text-sm truncate max-w-xs">{file.name}</p>
          <div className="w-full max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-secundario h-2.5 transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-right mt-1 font-medium text-gray-600">
              {uploadProgress}%
            </p>
          </div>
        </>
      )}
    </div>
  );
}
