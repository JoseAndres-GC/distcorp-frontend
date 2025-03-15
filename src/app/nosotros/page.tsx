import Image from "next/image";
import Hero from "@/components/hero";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Nosotros() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F8F5] text-[#2E3A59]">
      <Hero />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-20 text-center flex-1">
        <h1 className="text-4xl font-bold mb-8">Nosotros</h1>

        <div className="mb-10">
          <Image
            src="/images/nosotros.jpg"
            alt="Nosotros"
            width={800}
            height={400}
            className="rounded-lg object-cover w-full h-auto mx-auto"
          />
        </div>

        <p className="text-lg mb-6 leading-relaxed">
          Somos una tienda especializada en productos de higiene para el hogar:
          desde lavavajillas hasta productos de cuidado personal.
        </p>
        <p className="text-lg leading-relaxed">
          Nos comprometemos con la calidad, el respeto por el medio ambiente y
          la salud de tu familia. Gracias por elegirnos.
        </p>
      </main>
      <Footer />
    </div>
  );
}
