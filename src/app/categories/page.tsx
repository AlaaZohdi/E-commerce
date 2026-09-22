import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetShopcategories } from '@/api/services/categoriesApi';

export default async function CategoriesPage() {
  const categories = await fetShopcategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-transparent bg-white shadow-sm transition-all hover:border-primary hover:shadow-md"
          >
            <div className="relative h-56 w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>

            <div className="flex flex-col items-center gap-1 p-4 text-center">
              <span className="font-medium text-gray-700 transition-colors group-hover:text-primary">
                {category.name}
              </span>

              <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View Subcategories
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}