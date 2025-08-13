"use client"; // Indico que este componente se ejecuta en el cliente (Next.js)

// Importación de dependencias
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Leaf, Map, ThumbsUp, Menu, X } from "lucide-react"; // Íconos para la navegación
import { motion, AnimatePresence } from "framer-motion"; // Animaciones

export default function Navbar() {
  // Estados principales
  const [open, setOpen] = useState(false); // Maneja si el menú móvil está abierto o cerrado
  const [activeSection, setActiveSection] = useState<string | null>(null); // Guarda la sección activa según el scroll

  // Función para cerrar el menú cuando se navega
  const handleNavigate = () => setOpen(false);

  // Clases para el fondo del header
  const bgImage =
    "bg-[url('/PagePrincipal/Background.webp')] bg-cover bg-center";
  const headerClass = `${bgImage} text-white`;

  // Detecta la sección activa con IntersectionObserver
  useEffect(() => {
    const sectionIds = ["Principal", "lugares", "calificacion-usuario"]; // IDs de las secciones que queremos observar

    // Configuro el observer
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`); // Guardo el ID activo
            break;
          }
        }
      },
      {
        threshold: 0.6, // Activo cuando la sección es visible en un 60%
      }
    );

    // Observo cada sección
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    // Limpio el observer al desmontar
    return () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    // Header principal con animación al cargar
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 shadow-md relative transition-colors duration-300 ${headerClass}`}
    >
      {/* Capa oscura encima del fondo para mejorar contraste */}
      <div className="absolute inset-0 bg-black/60 backdrop-brightness-50" />

      {/* Contenedor del navbar */}
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-1">
        {/* Logo del proyecto */}
        <Link
          href="/"
          onClick={() => {
            handleNavigate();
            setActiveSection("/"); // Resetea la sección activa
          }}
          className="flex items-center gap-2"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/PagePrincipal/VisionTreePasto.svg"
              alt="VisionTreePasto Logo"
              width={220}
              height={40}
              priority
            />
          </motion.div>
        </Link>

        {/* Botón hamburguesa (solo móvil) */}
        <motion.button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          whileTap={{ scale: 0.9, rotate: 90 }}
          whileHover={{ scale: 1.05 }}
          className="sm:hidden p-2 rounded focus:outline-none hover:bg-black/10 text-inherit z-50"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Menú para escritorio */}
        <ul className="hidden sm:flex items-center gap-8 text-lg font-poppins font-extralight">
          <NavItem
            href="/"
            icon={Home}
            text="Inicio"
            active={activeSection === "/"}
            onClick={() => setActiveSection("/")}
          />
          <NavItem
            href="#Principal"
            icon={Leaf}
            text="Identificar árbol"
            active={activeSection === "#Principal"}
            onClick={() => setActiveSection("#Principal")}
          />
          <NavItem
            href="#lugares"
            icon={Map}
            text="Lugares para visitar"
            active={activeSection === "#lugares"}
            onClick={() => setActiveSection("#lugares")}
          />
          <NavItem
            href="#calificacion-usuario"
            icon={ThumbsUp}
            text="Califícanos"
            active={activeSection === "#calificacion-usuario"}
            onClick={() => setActiveSection("#calificacion-usuario")}
          />
        </ul>
      </nav>

      {/* Menú móvil animado con Framer Motion */}
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
              active={activeSection === "/"}
              onClick={() => setActiveSection("/")}
            />
            <NavItemMobile
              href="#Principal"
              icon={Leaf}
              text="Identificar árbol"
              active={activeSection === "#Principal"}
              onClick={() => setActiveSection("#Principal")}
            />
            <NavItemMobile
              href="#lugares"
              icon={Map}
              text="Lugares para visitar"
              active={activeSection === "#lugares"}
              onClick={() => setActiveSection("#lugares")}
            />
            <NavItemMobile
              href="#calificacion-usuario"
              icon={ThumbsUp}
              text="Califícanos"
              active={activeSection === "#calificacion-usuario"}
              onClick={() => setActiveSection("#calificacion-usuario")}
            />
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Ítem para escritorio
function NavItem({
  href,
  icon: Icon,
  text,
  active,
  onClick,
}: {
  href: string;
  icon: typeof Home;
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <li>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href={href}
          onClick={onClick}
          className={`relative flex items-center gap-1 transition-colors duration-300 group ${
            active ? "text-secundario" : "hover:text-secundario"
          }`}
        >
          <Icon size={16} /> {text}
          {/* Subrayado animado */}
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

// Ítem para móvil
function NavItemMobile({
  href,
  icon: Icon,
  text,
  active,
  onClick,
}: {
  href: string;
  icon: typeof Home;
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.li whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
      <Link
        href={href}
        onClick={onClick}
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
        {/* Subrayado animado */}
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
