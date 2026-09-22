"use client";

import React, { useState } from "react";
import {
  Home,
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronLeft,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { productType } from "@/api/types/productType";
import AddBtn from "@/app/-component/AddBtn/AddBtn";
import { date } from "zod";
import WishlistBtn from "@/app/-component/WishlistBtn/WishlistBtn";

export default function ProductDetailsClient({ product }: { product: productType }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "shipping">("details");
  const images = product.images?.length ? product.images : [product.imageCover];
  const hasDiscount =
    product.priceAfterDiscount !== undefined && product.priceAfterDiscount < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0;

  const displayPrice = hasDiscount ? product.priceAfterDiscount! : product.price;
  const roundedRating = Math.round(product.ratingsAverage || 0);

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Home size={16} />
        <span>Home</span>
        <ChevronRight size={14} />
        <span>{product.category?.name}</span>
        <ChevronRight size={14} />
        <span>{product.subcategory?.[0]?.name}</span>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">{product.title}</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border border-gray-200 rounded-2xl p-6 mb-10">
        {/* Images */}
        <div>
          <div className="relative h-96 w-full rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex gap-4 mt-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-24 w-24 rounded-lg overflow-hidden border-2 bg-gray-100 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`thumbnail-${index}`} fill className="object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex gap-2 mb-3">
            <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              {product.category?.name}
            </span>
            <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
              {product.brand?.name}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={20}
                  fill={s <= roundedRating ? "#fbbf24" : "none"}
                  className="text-yellow-400"
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              {product.ratingsAverage} ({product.ratingsQuantity} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">{displayPrice} EGP</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">{product.price} EGP</span>
                <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Save {discountPercentage}%
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span
              className={`h-2 w-2 rounded-full ${product.quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
            />
            <span
              className={`text-sm font-medium ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-gray-500 mb-6 pb-6 border-b border-gray-200 whitespace-pre-line">
            {product.description}
          </p>

          <p className="text-sm text-gray-600 mb-2">Quantity</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-10 w-10 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus size={16} />
              </button>
              <span className="h-10 w-12 flex items-center justify-center text-primary font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                className="h-10 w-10 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-sm text-gray-500">{product.quantity} available</span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 mb-6">
            <span className="text-gray-600 text-sm">Total Price:</span>
            <span className="text-green-600 text-xl font-bold">
              {(displayPrice * quantity).toFixed(2)} EGP
            </span>
          </div>

          <div className="flex gap-4 mb-4">
            <AddBtn prodID={product._id} cls={'flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg py-3 transition-colors'} 
            child={<>
              <ShoppingCart size={18} />
              Add to Cart
              </>}/>
            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg py-3 transition-colors">
              <Zap size={18} />
              Buy Now
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <WishlistBtn prodID={product._id}/>
            
            <button className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100">
                <Truck size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100">
                <RotateCcw size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">30 Days Return</p>
                <p className="text-xs text-gray-500">Money back</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100">
                <ShieldCheck size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border border-gray-200 rounded-2xl mb-10">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "reviews"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews ({product.ratingsQuantity})
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "shipping"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Shipping & Returns
          </button>
        </div>

        {activeTab === "details" && (
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-2">About this Product</h3>
            <p className="text-gray-500 mb-6 whitespace-pre-line">{product.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-800 mb-4">Product Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="text-gray-800 font-medium">{product.category?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subcategory</span>
                    <span className="text-gray-800 font-medium">
                      {product.subcategory?.[0]?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Brand</span>
                    <span className="text-gray-800 font-medium">{product.brand?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Items Sold</span>
                    <span className="text-gray-800 font-medium">{product.sold}+ sold</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-800 mb-4">Key Features</h4>
                <div className="space-y-3 text-sm">
                  {[
                    "Premium Quality Product",
                    "100% Authentic Guarantee",
                    "Fast & Secure Packaging",
                    "Quality Tested",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check size={16} className="text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="p-6 space-y-4">
            {/* {product.reviews?.length ? (
              product.reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800">{review.user?.name}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          fill={s <= review.rating ? "#fbbf24" : "none"}
                          className="text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{review.review}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            )} */}
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="p-6 text-gray-500 text-sm">Shipping & Returns content goes here.</div>
        )}
      </div>
    </div>
  );
}