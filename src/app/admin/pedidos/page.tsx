"use client";

import { useEffect, useState } from "react";

interface Pedido {
  _id: string;
  vendedor: string;
  fecha: string;
  total?: number;
  productos: {
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    precioPorCaja: number;
    tipoPrecio: string;
  }[];
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/pedidos");
        const data = await res.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const descargarExcel = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/pedidos/excel");
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pedidos.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar Excel:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-4 animate-pulse text-center text-[#2E3A59]">
        Cargando pedidos...
      </div>
    );
  }

  return (
    <div className="p-4 text-[#2E3A59]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Pedidos</h1>
        <button
          onClick={descargarExcel}
          className="bg-[#388E3C] hover:bg-[#2E7D32] text-white px-4 py-2 rounded-xl shadow"
        >
          Descargar Excel
        </button>
      </div>

      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div
              key={pedido._id}
              className="p-4 rounded-xl shadow bg-white border border-gray-200"
            >
              <p className="font-medium">
                <strong>Vendedor:</strong> {pedido.vendedor}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Fecha:</strong>{" "}
                {new Date(pedido.fecha).toLocaleString()}
              </p>
              <div className="mt-2">
                <p className="font-semibold">Productos:</p>
                <ul className="list-disc ml-5 text-sm">
                  {pedido.productos.map((prod, idx) => (
                    <li key={idx}>
                      {prod.nombre} - {prod.cantidad} x{" "}
                      {prod.tipoPrecio === "unidad"
                        ? `$${prod.precioUnitario} c/u`
                        : `$${prod.precioPorCaja} por caja`}{" "}
                      ({prod.tipoPrecio})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
