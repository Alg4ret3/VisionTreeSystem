"use client"; // Este componente se ejecuta en el cliente (necesario por usePathname)

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Componente LayoutWrapper:
 * Envuelve las páginas de la app con Navbar y Footer, excepto en rutas específicas.
 */
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  // Hook de Next.js que obtiene la ruta actual
  const pathname = usePathname();

  /**
   * Oculta el layout (Navbar y Footer) en páginas donde no queremos que aparezcan,
   * por ejemplo: la página de inicio ("/") y la de bienvenida ("/welcome").
   */
  const hideLayout = pathname === "/" || pathname === "/welcome";

  return (
    <>
      {/* Navbar visible solo si NO está en las rutas ocultas */}
      {!hideLayout && <Navbar />}

      {/* Contenedor principal: permite que el contenido crezca y ocupe el espacio disponible */}
      <main className="flex-1">{children}</main>

      {/* Footer visible solo si NO está en las rutas ocultas */}
      {!hideLayout && <Footer />}
    </>
  );
}
