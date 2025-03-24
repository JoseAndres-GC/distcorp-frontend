import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/producto/${product._id}`}>
      <div className="bg-white text-[#2E3A59] rounded-md p-4 text-center hover:scale-105 transition-transform shadow-md">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={0}
          className="mx-auto mb-4 object-contain w-full h-auto"
        />
        <h3 className="text-sm font-bold uppercase">{product.name}</h3>
        <p className="text-[#FF6F61] font-semibold text-sm mt-2">
          Unidad: ${product.priceUnitario.toFixed(2)}
        </p>
        <p className="text-[#FF6F61] font-semibold text-sm">
          Caja: ${product.priceCaja.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
