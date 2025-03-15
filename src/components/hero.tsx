"use client";

type HeroProps = {
  onSearch?: (value: string) => void;
};

export default function Hero({ onSearch }: HeroProps) {
  return (
    <section className="bg-[#388E3C] text-white text-center py-12 px-4">
      <h1 className="text-4xl font-extrabold tracking-wide mb-4">
        <span className="block text-white">LAVAVAJILLAS</span>
        <span className="text-[#FF6F61] text-5xl">HOGAR</span>
      </h1>
      <div className="mt-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="mt-4 px-4 py-2 w-full max-w-md rounded border border-gray-300 text-white bg-transparent placeholder-white"
        />
      </div>
    </section>
  );
}
