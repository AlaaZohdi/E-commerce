"use client";

import { Heart } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getWishList } from '@/api/actions/WishListactions/getWishList';
import { deleteWishListItem } from '@/api/actions/WishListactions/deleteWishListItem';
import { addToWishList } from "@/api/actions/WishListactions/addToWishList";
import { toast } from "@/components/ui/toast";

interface WishListResponse {
  status: string;
  count: number;
  data: { _id: string }[];
}

export default function WishlistBtn({ prodID }: { prodID: string }) {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  const { data } = useQuery<WishListResponse>({
    queryKey: ["wishlist"],
    queryFn: getWishList,
  });

  const isInWishlist = data?.data?.some((item) => item._id === prodID) ?? false;

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (pending) return;

    try {
      setPending(true);

      if (isInWishlist) {
        await deleteWishListItem(prodID);
        toast.add({
          type: "success",
          description: "Product removed from your Wishlist",
        });
      } else {
        await addToWishList(prodID);
        toast.add({
          type: "success",
          description: "Product added successfully to your Wishlist",
        });
      }

      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    } catch (error) {
      console.error(error);
      toast.add({
        type: "error",
        description: "Login first",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={pending}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary shadow-sm transition-colors hover:text-primary disabled:opacity-60"
    >
      <Heart
        size={24}
        className={isInWishlist ? "fill-red-500 text-red-500" : ""}
      />
    </button>
  );
}
