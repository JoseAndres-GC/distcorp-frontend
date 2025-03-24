"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "./components/Header";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [logueado, setLogueado] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    const esLogin = pathname === "/admin/login";

    if (!token && !esLogin) {
      router.replace("/admin/login");
    } else {
      setLogueado(!!token);
      setVerificado(true);
    }
  }, [pathname, router]);

  if (!verificado) return null;

  return (
    <div className="min-h-screen bg-[#F1F8F5] text-[#2E3A59]">
      {logueado && pathname !== "/admin/login" && <Header />}
      <main className="p-4">{children}</main>
    </div>
  );
}
