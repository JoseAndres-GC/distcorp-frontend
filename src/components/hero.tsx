// src/components/hero.tsx
"use client";

import { useState } from "react";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Acá podrías filtrar productos o navegar a otra ruta si querés
  };

  return (
    <section className="bg-[#388E3C] text-white text-center py-12">
      <h1 className="text-4xl font-extrabold tracking-wide mb-4">
        <span className="block">LAVAVAJILLAS</span>
        <span className="text-[#FF6F61] text-5xl">HOGAR</span>
      </h1>

      <div className="mt-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar productos..."
          className="px-4 py-2 rounded border border-white bg-transparent text-white placeholder-white w-full max-w-md"
        />
      </div>
    </section>
  );
}
