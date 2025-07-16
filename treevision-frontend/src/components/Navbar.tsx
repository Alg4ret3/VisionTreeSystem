"use client"; // Este componente se ejecuta en el cliente

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Home, Share2, Compass, Info, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleNavigate = () => setOpen(false); // Cierra el menú móvil

  const bgImage = "bg-[url('/PagePrincipal/Background.png')] bg-cover bg-center";
  const headerClass = `${bgImage} text-white`;

  return (
    // Navbar principal animado al montar
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 shadow-md relative transition-colors duration-300 ${headerClass}`}
    >
      {/* Capa oscura encima del fondo para mejor contraste */}
      <div className="absolute inset-0 bg-black/60 backdrop-brightness-50" />

      {/* Contenedor del navbar */}
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo principal */}
        <Link
          href="/"
          onClick={handleNavigate}
          className="flex items-center gap-2"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/PagePrincipal/TreeVisionWhite.svg"
              alt="TreeVision Logo"
              width={220}
              height={40}
              priority
            />
          </motion.div>
        </Link>

        {/* Botón hamburguesa animado (solo visible en móvil) */}
        <motion.button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          whileTap={{ scale: 0.9, rotate: 90 }}
          whileHover={{ scale: 1.05 }}
          className="sm:hidden p-2 rounded focus:outline-none hover:bg-black/10 text-inherit z-50"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Enlaces para escritorio */}
        <ul className="hidden sm:flex items-center gap-8 text-lg font-poppins font-extralight">
          <NavItem
            href="/"
            icon={Home}
            text="Inicio"
            active={pathname === "/"}
          />
          <NavItem
            href="/modelo"
            icon={Share2}
            text="Usar Modelo"
            active={pathname === "/modelo"}
          />
          <NavItem
            href="/explorar"
            icon={Compass}
            text="Explorar"
            active={pathname === "/explorar"}
          />
          <NavItem
            href="/proyecto"
            icon={Info}
            text="Sobre"
            active={pathname === "/proyecto"}
          />
        </ul>
      </nav>

      {/* Menú móvil con animación de entrada y salida */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onClick={handleNavigate}
            className="absolute top-full left-0 w-full flex flex-col gap-4 px-6 pb-6 pt-4 text-base font-poppins font-extralight bg-blanco text-[#000000] shadow-lg z-40"
          >
            <NavItemMobile
              href="/"
              icon={Home}
              text="Inicio"
              active={pathname === "/"}
            />
            <NavItemMobile
              href="/modelo"
              icon={Share2}
              text="Usar Modelo"
              active={pathname === "/modelo"}
            />
            <NavItemMobile
              href="/explorar"
              icon={Compass}
              text="Explorar"
              active={pathname === "/explorar"}
            />
            <NavItemMobile
              href="/proyecto"
              icon={Info}
              text="Sobre"
              active={pathname === "/proyecto"}
            />
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ───────── Subcomponentes ───────── */

function NavItem({
  href,
  icon: Icon,
  text,
  active,
}: {
  href: string;
  icon: typeof Home;
  text: string;
  active?: boolean;
}) {
  return (
    <li>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href={href}
          className={`relative flex items-center gap-1 transition-colors duration-300 group ${
            active ? "text-secundario" : "hover:text-secundario"
          }`}
        >
          <Icon size={16} /> {text}
          <motion.span
            layoutId="underline"
            className={`absolute -bottom-1 left-0 h-0.5 w-full bg-secundario origin-left transition-transform duration-300 ${
              active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </Link>
      </motion.div>
    </li>
  );
}

function NavItemMobile({
  href,
  icon: Icon,
  text,
  active,
}: {
  href: string;
  icon: typeof Home;
  text: string;
  active?: boolean;
}) {
  return (
    <motion.li whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
      <Link
        href={href}
        className={`relative group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 shadow-sm ${
          active
            ? "bg-secundario/15 text-secundario"
            : "bg-white text-[#000000] hover:bg-secundario/10 hover:text-secundario"
        }`}
      >
        <div className="flex items-center justify-center w-6 h-6">
          <Icon size={18} />
        </div>
        <span className="font-medium">{text}</span>
        <motion.span
          layoutId="underline-mobile"
          className={`absolute -bottom-1 left-4 h-0.5 w-[calc(100%-32px)] bg-secundario origin-left transition-transform duration-300 ${
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </Link>
    </motion.li>
  );
}