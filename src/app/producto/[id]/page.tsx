"use client";

import { useParams } from "next/navigation";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hero from "@/components/hero";
import Header from "@/components/header";
import Footer from "@/components/footer";

const vendedores = [
  { nombre: "Blanca", numero: "59161347100" },
  { nombre: "Huby", numero: "59169215271" },
  { nombre: "Agustin", numero: "59177733333" },
];

export default function ProductoPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [vendedor, setVendedor] = useState(vendedores[0]);
  const [tipoCompra, setTipoCompra] = useState<"unidad" | "caja">("unidad");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL ||
            "https://distcorp-api.onrender.com"
          }/api/products/${params.id}`
        );
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error al obtener producto:", err);
        setError(true);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (error) return notFound();
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F8F5] text-[#2E3A59]">
        <p className="text-lg animate-pulse">Cargando producto...</p>
      </div>
    );
  }

  const precioSeleccionado =
    tipoCompra === "unidad" ? product.priceUnitario : product.priceCaja;

  const mensaje = `Hola, quiero comprar *${cantidad}x ${product.name} (${tipoCompra})* a $${precioSeleccionado} cada uno.`;
  const urlWhatsapp = `https://wa.me/${
    vendedor.numero
  }?text=${encodeURIComponent(mensaje)}`;

  const handleAgregarAlCarrito = async () => {
    const pedido = {
      vendedor: vendedor.nombre,
      productos: [
        {
          nombre: product.name,
          cantidad,
          precioUnitario: product.priceUnitario,
          precioPorCaja: product.priceCaja,
          tipoPrecio: tipoCompra,
        },
      ],
    };

    try {
      await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "https://distcorp-api.onrender.com"
        }/api/pedidos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedido),
        }
      );

      window.open(urlWhatsapp, "_blank");
      setCantidad(1);
    } catch (error) {
      console.error("Error al guardar pedido:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F8F5] text-[#2E3A59]">
      <Hero />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16 flex-1">
        <div className="flex flex-col md:flex-row gap-10">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={0}
            className="rounded-lg object-cover w-full md:w-1/2 bg-white p-4"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-[#388E3C] font-semibold mb-6">
              ${precioSeleccionado}
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="flex flex-col gap-4">
              <label className="text-lg font-medium">Tipo de compra:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="unidad"
                    checked={tipoCompra === "unidad"}
                    onChange={() => setTipoCompra("unidad")}
                  />
                  Unidad (${product.priceUnitario})
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="caja"
                    checked={tipoCompra === "caja"}
                    onChange={() => setTipoCompra("caja")}
                  />
                  Caja (${product.priceCaja})
                </label>
              </div>

              <label htmlFor="cantidad" className="text-lg font-medium">
                Cantidad:
              </label>
              <input
                type="number"
                id="cantidad"
                min={1}
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                className="bg-white text-black border border-gray-300 p-2 rounded w-24"
              />

              <label htmlFor="vendedor" className="text-lg font-medium">
                Vendedor:
              </label>
              <select
                id="vendedor"
                value={vendedor.nombre}
                onChange={(e) =>
                  setVendedor(
                    vendedores.find((v) => v.nombre === e.target.value)!
                  )
                }
                className="bg-white text-black border border-gray-300 p-2 rounded"
              >
                {vendedores.map((v) => (
                  <option key={v.numero} value={v.nombre}>
                    {v.nombre}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAgregarAlCarrito}
                className="bg-[#388E3C] text-white py-2 px-6 rounded hover:bg-[#2E7D32] transition text-center"
              >
                Agregar al carrito (WhatsApp)
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
