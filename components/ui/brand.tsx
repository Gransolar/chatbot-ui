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
          src="/logo.png" // Ruta de la imagen
          alt="Chatbot Logo" // Texto alternativo
          width={512} // Ajusta el ancho según sea necesario
          height={383} // Ajusta la altura según sea necesario
        />
      </div>
      <div className="text-3xl font-bold tracking-wide">Chatbot</div> {/* Cambia el texto */}
    </div>
  );
}
