import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ----- Types -----

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface BrandsResponse {
  results: number;
  metadata: BrandsMetadata;
  data: Brand[];
}

// ----- Data fetching -----

async function getBrands(): Promise<Brand[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }

  const json: BrandsResponse = await res.json();
  return json.data;
}

// ----- Component -----

export default async function Brands() {
  const brands = await getBrands();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/products?brand=${brand._id}`}
            className="group flex flex-col items-center rounded-2xl border border-transparent bg-white p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
          >
            <div className="flex h-32 w-full items-center justify-center rounded-xl bg-gray-50">
              <div className="relative h-20 w-28">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-1 text-center">
              <span className="font-medium text-gray-700 transition-colors group-hover:text-primary">
                {brand.name}
              </span>

              <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View Products
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
