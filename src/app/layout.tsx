import type { Metadata } from "next";
import { Inter, Space_Grotesk, Archivo, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Display grotesco para títulos cinematográficos (estilo siena.film)
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Monospace tipo máquina de escribir para metadata
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Swif Service | Ingeniería Digital de Precisión",
  description: "Diseñamos y optimizamos sitios web con la solidez de la arquitectura y la innovación de la tecnología actual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${archivo.variable} ${spaceMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
