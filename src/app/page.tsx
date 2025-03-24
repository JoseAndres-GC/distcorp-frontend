"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductCard from "@/components/productcard";
import Footer from "@/components/footer";
import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products");
        const data = (await res.json()) as Product[];
        setProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category))
        );
        setCategories(["Todas", ...uniqueCategories]);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || product.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F8F5] text-[#2E3A59]">
      <Hero onSearch={setQuery} />
      <Header />

      <main className="w-full px-4 py-10 flex-1">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#FF6F61]">
          Nuestros Productos
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full border text-sm transition font-semibold ${
                selectedCategory === cat
                  ? "bg-[#388E3C] text-white"
                  : "bg-white text-[#2E3A59] border-gray-300"
              }`}
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
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
