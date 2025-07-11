'use client'; // Indica que este componente se ejecuta del lado del cliente (cliente de React, necesario para hooks como useState).

import { useState } from 'react'; // Hook para manejar estados.
import { usePathname } from 'next/navigation'; // Hook para obtener la ruta actual.
import Image from 'next/image'; // Componente optimizado para imágenes de Next.js.
import Link from 'next/link'; // Componente para navegación entre páginas.
import { Home, Share2, Compass, Info, Menu, X } from 'lucide-react'; // Iconos importados desde lucide-react.

export default function Navbar() {
  const [open, setOpen] = useState(false); // Estado para mostrar u ocultar el menú móvil.
  const pathname = usePathname(); // Ruta actual del navegador.

  const handleNavigate = () => setOpen(false); // Cierra el menú móvil cuando se navega.

  const bgImage = "bg-[url('/PagePrincipal/Background.png')] bg-cover bg-center"; // Imagen de fondo.
  const headerClass = `${bgImage} text-white`; // Clases para el header.

  return (
    <header className={`sticky top-0 z-50 shadow-md relative transition-colors duration-300 ${headerClass}`}>
      {/* Capa semitransparente oscura encima del fondo */}
      <div className="absolute inset-0 bg-black/60 backdrop-brightness-50" />

      {/* Contenedor principal del navbar */}
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo con enlace a inicio */}
        <Link href="/Model" onClick={handleNavigate} className="flex items-center gap-2">
          <Image src="/PagePrincipal/TreeVisionWhite.svg" alt="TreeVision Logo" width={220} height={40} priority />
        </Link>

        {/* Botón de menú hamburguesa (solo visible en móvil) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          className="sm:hidden p-2 rounded focus:outline-none hover:bg-black/10 text-inherit"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Enlaces de navegación para escritorio */}
        <ul className="hidden sm:flex items-center gap-8 text-lg font-poppins font-extralight">
          <NavItem href="/" icon={Home} text="Inicio" active={pathname === '/'} />
          <NavItem href="/modelo" icon={Share2} text="Usar Modelo" active={pathname === '/modelo'} />
          <NavItem href="/explorar" icon={Compass} text="Explorar" active={pathname === '/explorar'} />
          <NavItem href="/proyecto" icon={Info} text="Sobre" active={pathname === '/proyecto'} />
        </ul>
      </nav>

      {/* Menú móvil que aparece al hacer clic en el botón */}
      {open && (
        <ul
          onClick={handleNavigate}
          className="absolute top-full left-0 w-full flex flex-col gap-4 px-6 pb-6 pt-4 text-base font-poppins font-extralight bg-blanco text-[#000000] shadow-lg z-50"
        >
          <NavItemMobile href="/" icon={Home} text="Inicio" active={pathname === '/'} />
          <NavItemMobile href="/modelo" icon={Share2} text="Usar Modelo" active={pathname === '/modelo'} />
          <NavItemMobile href="/explorar" icon={Compass} text="Explorar" active={pathname === '/explorar'} />
          <NavItemMobile href="/proyecto" icon={Info} text="Sobre" active={pathname === '/proyecto'} />
        </ul>
      )}
    </header>
  );
}

/* ───────── Subcomponentes ───────── */

// Enlace individual para escritorio con ícono, texto y subrayado animado.
function NavItem({ href, icon: Icon, text, active }: { href: string; icon: typeof Home; text: string; active?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`relative flex items-center gap-1 transition-colors duration-300 group ${active ? 'text-[#2394C8]' : 'hover:text-[#2394C8]'}`}
      >
        <Icon size={16} /> {text}
        {/* Línea animada debajo del texto */}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 w-full bg-[#2394C8] origin-left transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
        />
      </Link>
    </li>
  );
}

// Enlace individual para móvil con estilos y animaciones adaptadas.
function NavItemMobile({ href, icon: Icon, text, active }: { href: string; icon: typeof Home; text: string; active?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`relative group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 shadow-sm
          ${active ? 'bg-[#2394C8]/15 text-[#2394C8]' : 'bg-white text-[#000000] hover:bg-[#2394C8]/10 hover:text-[#2394C8]'}`}
      >
        <div className="flex items-center justify-center w-6 h-6">
          <Icon size={18} />
        </div>
        <span className="font-medium">{text}</span>

        {/* Línea animada debajo del texto (solo para móvil también) */}
        <span
          className={`absolute -bottom-1 left-4 h-0.5 w-[calc(100%-32px)] bg-[#2394C8] origin-left transition-transform duration-300
            ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
        />
      </Link>
    </li>
  );
}
