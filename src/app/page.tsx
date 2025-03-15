"use client"; // 👈 IMPORTANTE para que funcione useState

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Fila de 3 productos */}
          {filteredProducts.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}

          {/* Producto destacado grande y uno al costado */}
          {filteredProducts.length > 3 && (
            <>
              <div className="sm:col-span-2 md:col-span-2">
                <ProductCard product={filteredProducts[3]} />
              </div>
              {filteredProducts[4] && (
                <ProductCard product={filteredProducts[4]} />
              )}
            </>
          )}

          {/* Más productos si hay */}
          {filteredProducts.slice(5).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
