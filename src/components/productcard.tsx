import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/producto/${product.id}`}>
      <div className="bg-white text-[#2E3A59] rounded-md p-4 text-center hover:scale-105 transition-transform shadow-md">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={0}
          className="mx-auto mb-4 object-contain w-full h-auto"
        />
        <h3 className="text-sm font-bold uppercase mb-2">{product.name}</h3>

        <div className="text-xs text-[#FF6F61] font-semibold space-y-1">
          <p>Unidad: ${product.priceUnitario.toFixed(2)}</p>
          <p>Caja: ${product.priceCaja.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
