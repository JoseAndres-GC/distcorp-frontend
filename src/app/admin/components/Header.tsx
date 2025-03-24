"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    window.dispatchEvent(new Event("storage"));
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Crear", href: "/admin/crear" },
    { label: "Editar", href: "/admin/editar" },
    { label: "Eliminar", href: "/admin/eliminar" },
    { label: "Pedidos", href: "/admin/pedidos" },
  ];

  return (
    <header className="bg-[#2E3A59] text-white py-4 px-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-lg font-bold uppercase">Panel Admin</h1>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-10 text-sm font-bold uppercase">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${
                pathname === href ? "text-[#FF6F61]" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <button onClick={handleLogout} className="hover:underline text-white">
            Cerrar sesión
          </button>
        </nav>
      </div>

      {/* Mobile nav menu */}
      {open && (
        <nav className="md:hidden mt-4 flex flex-col gap-4 text-sm font-bold uppercase">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${
                pathname === href ? "text-[#FF6F61]" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="hover:underline text-white text-left"
          >
            Cerrar sesión
          </button>
        </nav>
      )}
    </header>
  );
}
