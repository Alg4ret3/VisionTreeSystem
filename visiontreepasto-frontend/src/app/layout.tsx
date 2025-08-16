import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/ui/LayoutWrapper"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "VisionTreePasto AI",
  description: "Descubre qué árbol estás viendo con VisionTreePasto AI: analiza imágenes y clasifica especies en segundos con inteligencia artificial.",
  icons: {
    icon: [
      { url: "/icons/favicon.ico" }, 
      { url: "/icons/favicon.png", type: "image/png" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
  

}
