import Link from 'next/link'; // Componente de Next.js para navegación interna sin recarga.
import { FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa'; // Iconos de redes sociales.

export default function Footer() {
  const year = new Date().getFullYear(); // Obtiene el año actual dinámicamente.

  // Lista de enlaces del footer
  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/Home', label: 'Modelo' },
    { href: '/explorar', label: 'Explorar' },
    { href: '/sobre', label: 'Proyecto' },
  ];

  return (
    <footer className="bg-neutral-900 text-gray-300 text-sm tracking-wide select-none">
      {/* Contenedor principal del footer */}
      <div className="max-w-7xl mx-auto flex flex-col items-center px-4 py-6 gap-4">

        {/* Navegación con enlaces de texto */}
        <nav className="flex flex-wrap justify-center items-center gap-3 font-light font-poppins text-base">
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center gap-1">
              <Link href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
              {/* Muestra una barra vertical entre enlaces excepto en el último */}
              {i < links.length - 1 && <span className="text-gray-500">|</span>}
            </span>
          ))}
        </nav>

        {/* Íconos de redes sociales */}
        <div className="flex justify-center gap-5 pt-3 text-white text-xl">
          {/* Cada ícono es un enlace con hover de color correspondiente */}
          <Link href="https://github.com/Alg4ret3" aria-label="GitHub" className="hover:text-[#fff]">
            <FaGithub />
          </Link>
          <Link href="https://wa.me/573170098770" aria-label="WhatsApp" className="hover:text-[#25D366]">
            <FaWhatsapp />
          </Link>
          <Link href="https://www.linkedin.com/in/sergio-mu%C3%B1oz-b75bba208/" aria-label="LinkedIn" className="hover:text-[#0A66C2]">
            <FaLinkedin />
          </Link>
        </div>

        {/* Línea divisoria */}
        <hr className="w-full border-t border-gray-600/40" />

        {/* Créditos finales */}
        <span className="text-center font-poppins font-extralight text-gray-400 text-sm">
          © {year} – <span className="text-white font-normal">Tree‑Vision AI</span>
        </span>
      </div>
    </footer>
  );
}
