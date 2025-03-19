"use client";

import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductCard from "@/components/productcard";
import Footer from "@/components/footer";
import { products } from "@/data/products";

export default function Home() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const filteredProducts = products.filter((product) => {
    const matchCategoria =
      categoria === "Todas" || product.category === categoria;
    const matchQuery = product.name.toLowerCase().includes(query.toLowerCase());
    return matchCategoria && matchQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F8F5] text-[#2E3A59]">
      <Hero onSearch={setQuery} />
      <Header />

      <main className="w-full px-4 py-10 flex-1">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#FF6F61]">
          Nuestros Productos
        </h2>

        {/* Selector de Categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["Todas", "Limpieza", "Higiene", "Indumentaria"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                categoria === cat
                  ? "bg-[#388E3C] text-white"
                  : "bg-white text-[#2E3A59] border-gray-300"
              } hover:bg-[#2E7D32] hover:text-white`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-lg">No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
