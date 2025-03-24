"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  priceUnitario: number;
  priceCaja: number;
  image: string;
  category: string;
}

export default function EditarProductoPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [productos, setProductos] = useState<Product[]>([]);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [editando, setEditando] = useState<Product | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    priceUnitario: "",
    priceCaja: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin-token");
    if (!saved) {
      router.replace("/admin");
    } else {
      setToken(saved);
    }

    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProductos(data);
        const cats = Array.from(new Set(data.map((p) => p.category)));
        setCategorias(cats as string[]);
      });

    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImagenes(data as string[]));
  }, [router]);

  const handleEditar = (producto: Product) => {
    setEditando(producto);
    setForm({
      name: producto.name,
      description: producto.description,
      priceUnitario: producto.priceUnitario.toString(),
      priceCaja: producto.priceCaja.toString(),
      image: producto.image,
      category: producto.category,
    });
  };

  const handleGuardar = async () => {
    if (!editando || !token) return;

    if (
      !form.name ||
      !form.description ||
      !form.priceUnitario ||
      !form.priceCaja ||
      !form.image
    ) {
      return setMensaje("⚠️ Por favor completá todos los campos obligatorios.");
    }

    const res = await fetch(
      `http://localhost:4000/api/products/${editando._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          priceUnitario: parseFloat(form.priceUnitario),
          priceCaja: parseFloat(form.priceCaja),
        }),
      }
    );

    if (res.ok) {
      setMensaje("✅ Producto actualizado");
      setEditando(null);
      setForm({
        name: "",
        description: "",
        priceUnitario: "",
        priceCaja: "",
        image: "",
        category: "",
      });

      const actualizados = await fetch(
        "http://localhost:4000/api/products"
      ).then((r) => r.json());
      setProductos(actualizados);
    } else {
      const data = await res.json().catch(() => ({}));
      setMensaje(`❌ Error: ${data.error || "desconocido"}`);
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#2E3A59]">
        Editar productos
      </h2>

      {mensaje && (
        <p className="text-center mb-4 text-sm text-red-600">{mensaje}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {productos.map((p) => (
          <div
            key={p._id}
            className="border p-2 rounded text-center cursor-pointer bg-white shadow-sm hover:shadow-md transition"
            onClick={() => handleEditar(p)}
          >
            <img
              src={p.image}
              alt={p.name}
              className="mx-auto w-32 h-32 object-contain"
            />
            <p className="mt-2 font-semibold">{p.name}</p>
          </div>
        ))}
      </div>

      {editando && (
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
            <h3 className="text-2xl font-semibold mb-4 text-[#2E3A59]">
              Editar: {editando.name}
            </h3>

            <div className="space-y-4">
              {/* Nombre */}
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Nombre del producto"
              />

              {/* Descripción */}
              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Descripción breve"
              />

              {/* Precio unidad */}
              <input
                type="number"
                value={form.priceUnitario}
                onChange={(e) =>
                  setForm({ ...form, priceUnitario: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Ej: 29.90"
              />

              {/* Precio caja */}
              <input
                type="number"
                value={form.priceCaja}
                onChange={(e) =>
                  setForm({ ...form, priceCaja: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Ej: 199.90"
              />

              {/* Imagen */}
              <select
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full p-2 border rounded"
              >
                {imagenes.map((img) => (
                  <option key={img} value={`/images/${img}`}>
                    {img}
                  </option>
                ))}
              </select>

              {/* Vista previa */}
              {form.image && (
                <img
                  src={form.image}
                  alt="Vista previa"
                  className="mt-3 mx-auto rounded border h-40 object-contain"
                />
              )}

              {/* Categoría */}
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-2 border rounded"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Botones */}
              <div className="flex gap-2">
                <button
                  onClick={handleGuardar}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
                >
                  Guardar cambios
                </button>
                <button
                  onClick={() => {
                    setEditando(null);
                    setMensaje("");
                    setForm({
                      name: "",
                      description: "",
                      priceUnitario: "",
                      priceCaja: "",
                      image: "",
                      category: "",
                    });
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-[#2E3A59] px-4 py-2 rounded w-full"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
