"use client";

import Link from "next/link";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "#Principal", label: "Identificar" },
    { href: "#lugares", label: "Lugares" },
    { href: "#calificacion-usuario", label: "Califícanos" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-neutral-900 text-gray-300 text-sm tracking-wide select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center px-4 py-6 gap-4">
        {/* Navegación animada */}
        <motion.nav
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex flex-wrap justify-center items-center gap-3 font-light font-poppins text-base"
        >
          {links.map((link, i) => (
            <motion.span
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-1"
            >
              <Link
                href={link.href}
                className="hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
              {i < links.length - 1 && <span className="text-gray-500">|</span>}
            </motion.span>
          ))}
        </motion.nav>

        {/* Íconos de redes sociales con rebote al entrar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center gap-5 pt-3 text-white text-xl"
        >
          <motion.div whileHover={{ scale: 1.2 }}>
            <Link
              href="https://github.com/Alg4ret3"
              aria-label="GitHub"
              className="hover:text-[#fff] transition-colors duration-300"
            >
              <FaGithub />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Link
              href="https://wa.me/573170098770"
              aria-label="WhatsApp"
              className="hover:text-[#25D366] transition-colors duration-300"
            >
              <FaWhatsapp />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Link
              href="https://www.linkedin.com/in/sergio-mu%C3%B1oz-b75bba208/"
              aria-label="LinkedIn"
              className="hover:text-[#0A66C2] transition-colors duration-300"
            >
              <FaLinkedin />
            </Link>
          </motion.div>
        </motion.div>

        {/* Línea divisoria */}
        <hr className="w-full border-t border-gray-600/40" />

        {/* Créditos finales con fade-in suave */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center font-poppins font-extralight text-gray-400 text-sm"
        >
          © {year} –{" "}
          <span className="text-white font-normal">TreeVision AI</span>
        </motion.span>
      </div>
    </motion.footer>
  );
}
