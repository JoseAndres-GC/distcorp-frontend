import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#2E3A59] text-white py-4">
      <nav>
        <ul className="flex justify-center gap-10 text-sm font-bold uppercase">
          <li>
            <Link href="/" className="hover:underline text-[#FF6F61]">
              Tienda
            </Link>
          </li>
          <li>
            <Link href="/nosotros" className="hover:underline">
              Nosotros
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
