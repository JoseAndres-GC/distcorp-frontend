"use client";

import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductCard from "@/components/productcard";
import Footer from "@/components/footer";
import { products } from "@/data/products";

export default function Home() {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F8F5] text-[#2E3A59]">
      <Hero onSearch={setQuery} />
      <Header />

      <main className="w-full px-4 py-10 flex-1">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#FF6F61]">
          Nuestros Productos
        </h2>

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
