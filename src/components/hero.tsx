"use client";

import { FaFacebook, FaTiktok } from "react-icons/fa";

interface HeroProps {
  onSearch?: (value: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <section className="bg-[#388E3C] text-white text-center py-12">
      <h1 className="text-4xl font-extrabold tracking-wide mb-4">
        <span className="block">DISTCORP</span>
        <span className="text-[#FF6F61] text-5xl">STORE</span>
      </h1>

      {/* Solo muestra la barra si hay onSearch */}
      {onSearch && (
        <div className="mt-6">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Buscar productos..."
            className="px-4 py-2 rounded border border-white bg-transparent text-white placeholder-white w-full max-w-md"
          />
        </div>
      )}

      {/* Redes sociales */}
      <div className="flex justify-center gap-6 mt-8 text-2xl">
        <a
          href="https://www.facebook.com/lavavajillashogar/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#FF6F61] transition-colors"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.tiktok.com/@hogar.lavavajilla"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#FF6F61] transition-colors"
        >
          <FaTiktok />
        </a>
      </div>
    </section>
  );
}
