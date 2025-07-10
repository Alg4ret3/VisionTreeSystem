import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Cargar la fuente Poppins desde next/font/google
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], 
  variable: "--font-poppins",   
});

export const metadata: Metadata = {
  title: "TreeVision AI",
  description: "Plataforma de identificación de árboles con inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
