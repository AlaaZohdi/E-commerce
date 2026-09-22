"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { getWishList } from "@/api/actions/WishListactions/getWishList";
import { deleteWishListItem } from "@/api/actions/WishListactions/deleteWishListItem";
import { addToCart } from "@/api/actions/cartActions/addToCart";

interface WishListItem {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  quantity?: number;
  category?: {
    name: string;
  };
}

interface WishListResponse {
  status: string;
  count: number;
  data: WishListItem[];
}

export default function WishListComp() {
  const queryClient = useQueryClient();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<WishListResponse>({
    queryKey: ["wishlist"],
    queryFn: getWishList,
  });

  async function handleRemove(id: string) {
    try {
      setPendingId(id);
      await deleteWishListItem(id);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.add({
        type: "success",
        description: "Product removed from your Wishlist",
      });
    } catch (error) {
      toast.add({
        type: "error",
        description: "Something went wrong",
      });
    } finally {
      setPendingId(null);
    }
  }

  async function handleAddToCart(id: string) {
    try {
      setPendingId(id);
      await addToCart(id);
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      toast.add({
        type: "success",
        description: "Product added successfully to your Cart",
      });
    } catch (error) {
      toast.add({
        type: "error",
        description: "Something went wrong",
      });
    } finally {
      setPendingId(null);
    }
  }

  const items = data?.data ?? [];
  const count = data?.count ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-secondary">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-700">Wishlist</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50">
          <Heart size={26} className="fill-red-500 text-red-500" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-700">My Wishlist</h1>
          <p className="text-sm text-secondary">
            {count} {count === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-secondary">
          Loading your wishlist...
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-red-500">
          Something went wrong loading your wishlist.
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && items.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <p className="mb-4 text-secondary">Your wishlist is empty.</p>
          <Link
            href="/"
            className="font-medium text-primary hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && items.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-sm text-secondary">
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => {
                  const hasDiscount =
                    item.priceAfterDiscount !== undefined &&
                    item.priceAfterDiscount < item.price;

                  const displayPrice = hasDiscount
                    ? item.priceAfterDiscount
                    : item.price;

                  const isPending = pendingId === item._id;

                  return (
                    <tr
                      key={item._id}
                      className="border-b border-gray-50 last:border-0"
                    >
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                            <Image
                              src={item.imageCover}
                              alt={item.title}
                              fill
                              className="object-contain"
                              sizes="64px"
                            />
                          </div>

                          <div>
                            <p className="font-medium text-gray-700">
                              {item.title}
                            </p>
                            {item.category?.name && (
                              <p className="text-sm text-secondary">
                                {item.category.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-700">
                          {displayPrice} EGP
                        </p>
                        {hasDiscount && (
                          <p className="text-sm text-secondary line-through">
                            {item.price} EGP
                          </p>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          In Stock
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleAddToCart(item._id)}
                            disabled={isPending}
                            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                          >
                            <ShoppingCart size={16} />
                            Add to Cart
                          </button>

                          <button
                            onClick={() => handleRemove(item._id)}
                            disabled={isPending}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-red-200 hover:text-red-500 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-secondary transition-colors hover:text-primary"
          >
            ← Continue Shopping
          </Link>
        </>
      )}
    </div>
  );
}
