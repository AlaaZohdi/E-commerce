import React from "react";
import { Eye, Plus, RefreshCw, Star } from "lucide-react";
import { productType } from './../../../api/types/productType';
import Link from 'next/link';
import AddBtn from "../AddBtn/AddBtn";
import WishlistBtn from './../WishlistBtn/WishlistBtn';

export default function ProductCard({ product }: { product: productType }) {
  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  const roundedRating = Math.round(product.ratingsAverage || 0);

  return (
    <div className="group overflow-hidden rounded-4xl border border-gray-200 bg-white p-4 transition-shadow duration-300 hover:shadow-md">
      
        {/* Product Image */}
        <div className="relative rounded-4xl h-80 overflow-hidden">

          {/* Discount */}
          {hasDiscount && (
            <span className="absolute left-0 top-1 z-10 rounded-md bg-red-500 px-3 py-1 text-lg font-semibold text-white">
              -{discountPercentage}%
            </span>
          )}

          {/* Image */}
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-full w-full object-contain"
          />

          {/* Actions */}
          <div className="absolute right-0 top-0 flex flex-col gap-2">

            <WishlistBtn prodID={product._id} />

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary shadow-sm transition-colors hover:text-primary">
              <RefreshCw size={24} />
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary shadow-sm transition-colors hover:text-primary">
              <Eye size={24} />
            </button>

          </div>
        </div>
         
        {/* Product Info */}
        <Link href={`/productDetails/${product._id}`}>
        <div className="mt-6">

          {/* Category */}
          <p className="text-lg text-secondary">
            {product.category?.name}
          </p>

          {/* Product Name */}
          <h3 className="mt-1 text-2xl font-medium text-gray-700 line-clamp-1">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={25}
                fill={star <= roundedRating ? "#fbbf24" : "none"}
                className="text-yellow-400"
              />
            ))}

            <span className="ml-2 text-lg text-secondary">
              {product.ratingsAverage} ({product.ratingsQuantity})
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">
                {hasDiscount ? product.priceAfterDiscount : product.price} EGP
              </span>

              {hasDiscount && (
                <span className="text-lg text-secondary line-through">
                  {product.price} EGP
                </span>
              )}
            </div>

            {/* Add Button */}
            <AddBtn prodID={product._id} cls={'flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105'}
            child={<Plus size={28} />}/>
              

          </div>

        </div>
      </Link>
    </div>
  );
}
