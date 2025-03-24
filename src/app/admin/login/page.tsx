"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async () => {
    if (!usuario || !password) {
      return setMensaje("Por favor completá los campos.");
    }

    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usuario, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.token) {
      localStorage.setItem("admin-token", data.token);
      router.push("/admin/crear");
    } else {
      setMensaje(data.error || "Credenciales inválidas");
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="bg-white p-6 rounded-md shadow-md mt-10 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Iniciar sesión
        </h1>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        {mensaje && <p className="text-red-500 mb-3 text-sm">{mensaje}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-[#388E3C] hover:bg-[#2E7D32] text-white py-2 rounded transition-colors"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
