import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { fetShopcategories } from '@/api/services/categoriesApi';
import { Category } from './../../../api/types/productType';

export default async function ShopCategory() {
  const categories: Category[] = (await fetShopcategories()) || [];
  

  return (
    <section className="px-4 py-12 sm:px-8 lg:px-16">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-primary" />
          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Shop By <span className="text-primary">Category</span>
          </h2>
        </div>

        <Link
          href="/categories"
          className="flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80 sm:text-base"
        >
          View All Categories
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category.slug}`}
            className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-4 py-6 transition-shadow hover:shadow-md"
          >
            <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-100 sm:h-24 sm:w-24">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-center text-sm font-medium text-gray-800 sm:text-base">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}