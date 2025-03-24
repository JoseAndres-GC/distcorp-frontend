"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ esta línea es clave

interface ProductForm {
  name: string;
  description: string;
  priceUnitario: string;
  priceCaja: string;
  image: string;
  category: string;
}

export default function CrearProductoPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    priceUnitario: "",
    priceCaja: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("admin-token");
    if (!savedToken) {
      router.replace("/admin");
    } else {
      setToken(savedToken);
    }

    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImagenes(data as string[]));

    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data: { category: string }[]) => {
        const uniqueCategories = Array.from(
          new Set(data.map((p) => p.category).filter(Boolean))
        );
        setCategorias(uniqueCategories);
      });
  }, [router]);

  const handleCreate = async () => {
    if (!token) return setMensaje("No estás logueado.");

    if (!form.name || !form.priceUnitario || !form.priceCaja || !form.image) {
      return setMensaje("Por favor completá todos los campos obligatorios.");
    }

    const res = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        priceUnitario: parseFloat(form.priceUnitario),
        priceCaja: parseFloat(form.priceCaja),
      }),
    });

    if (res.ok) {
      setMensaje("✅ Producto creado correctamente.");
      setForm({
        name: "",
        description: "",
        priceUnitario: "",
        priceCaja: "",
        image: "",
        category: "",
      });
    } else {
      const data = await res.json().catch(() => ({}));
      setMensaje(`❌ Error al crear producto: ${data.error || "desconocido"}`);
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#2E3A59]">
          Crear nuevo producto
        </h2>

        {mensaje && (
          <p className="text-center mb-4 text-sm text-red-600">{mensaje}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-[#2E3A59]">
              Nombre del producto
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder=" "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#2E3A59]">
              Descripción
            </label>
            <input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder=" "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#2E3A59]">
              Precio por unidad
            </label>
            <input
              type="number"
              value={form.priceUnitario}
              onChange={(e) =>
                setForm({ ...form, priceUnitario: e.target.value })
              }
              placeholder="Ej: 9.99"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#2E3A59]">
              Precio por caja
            </label>
            <input
              type="number"
              value={form.priceCaja}
              onChange={(e) => setForm({ ...form, priceCaja: e.target.value })}
              placeholder="Ej: 89.99"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#2E3A59]">
              Imagen
            </label>
            <select
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccioná una imagen</option>
              {imagenes.map((img) => (
                <option key={img} value={`/images/${img}`}>
                  {img}
                </option>
              ))}
            </select>

            {form.image && (
              <img
                src={form.image}
                alt="Vista previa"
                className="mt-3 mx-auto rounded border h-40 object-contain"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#2E3A59]">
              Categoría
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccioná una categoría</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-[#2E7D32] text-white px-4 py-2 rounded w-full"
          >
            Crear producto
          </button>
        </div>
      </div>
    </div>
  );
}
