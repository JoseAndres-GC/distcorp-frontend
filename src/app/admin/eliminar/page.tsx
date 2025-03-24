"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  image: string;
}

export default function EliminarProductoPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [productos, setProductos] = useState<Product[]>([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("admin-token");
    if (!savedToken) {
      router.replace("/admin");
    } else {
      setToken(savedToken);
      fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "https://distcorp-api.onrender.com"
        }/api/products`
      )
        .then((res) => res.json())
        .then((data) => setProductos(data));
    }
  }, [router]);

  const handleEliminar = async (id: string) => {
    const confirmar = confirm(
      "¿Estás seguro que querés eliminar este producto?"
    );
    if (!confirmar || !token) return;

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "https://distcorp-api.onrender.com"
      }/api/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setMensaje("✅ Producto eliminado correctamente.");
      setProductos(productos.filter((p) => p._id !== id));
    } else {
      const data = await res.json().catch(() => ({}));
      setMensaje(`❌ Error al eliminar: ${data.error || "desconocido"}`);
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#2E3A59]">
        Eliminar productos
      </h2>

      {mensaje && (
        <p className="text-center mb-4 text-sm text-red-600">{mensaje}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {productos.map((p) => (
          <div
            key={p._id}
            className="bg-white border p-4 rounded-xl shadow-sm hover:shadow-md transition text-center"
          >
            <img
              src={p.image}
              alt={p.name}
              className="mx-auto w-32 h-32 object-contain mb-2"
            />
            <p className="font-semibold text-[#2E3A59] mb-2">{p.name}</p>
            <button
              onClick={() => handleEliminar(p._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
