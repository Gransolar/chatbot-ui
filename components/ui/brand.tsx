"use client"

import Image from "next/image"; // Importa el componente Image de Next.js
import { FC } from "react";

interface BrandProps {
  theme?: "dark" | "light";
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <div className="flex flex-col items-center"> {/* Cambia Link a un div */}
      <div className="mb-2">
        <Image
          src="../logo.png" // Ruta de la imagen
          alt="Chatbot Logo" // Texto alternativo
          width={100} // Ajusta el ancho según sea necesario
          height={100} // Ajusta la altura según sea necesario
          className={`${theme === "dark" ? "filter brightness-0" : ""}`} // Cambia el estilo según el tema
        />
      </div>
      <div className="text-4xl font-bold tracking-wide">Chatbot</div> {/* Cambia el texto */}
    </div>
  );
}
