"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ChevronRight,
  LockKeyhole,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";

import { cartResponseType, Product } from "@/api/types/cartType";
import { deleteCartItem } from "@/api/actions/cartActions/deleteCartItem";
import { toast } from "@/components/ui/toast";
import { updateCart } from "@/api/actions/cartActions/updateCartItem";
import { ClaerCart } from "@/api/actions/cartActions/clearCart";
import Link from "next/link";

export default function CartComp() {
  const query = useQueryClient()

  const { data: cartData, isLoading } = useQuery<cartResponseType>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error("Failed to get cart");
      }

      return response.json();
    },
  });

  // delete cart 
 const {data:delData ,mutate:delCartItem}= useMutation({
    mutationFn:deleteCartItem ,
    onSuccess:()=>{
      query.invalidateQueries({
        queryKey:['getCart']
      })
      toast.add({
  type: "success",
  description: "product Deleted Successfully " ,
})
    },
    onError:()=>{
    toast.add({
  type: "error",
  description: " Faild to delete" ,
})
    }
  })

  // update cart 
 const {data:updateData ,mutate:updateItem}= useMutation({
    mutationFn :updateCart ,
    onSuccess:()=>{
      query.invalidateQueries({
        queryKey:['getCart']
      })
      toast.add({
  type: "success",
  description: "product updated Successfully " ,
})
    },
    onError:()=>{
    toast.add({
  type: "error",
  description: " Faild to update" ,
})
    }
  })


  // clear Cart 
   const {data:clearData ,mutate:clearCartItem}= useMutation({
    mutationFn :ClaerCart ,
    onSuccess:()=>{
      query.invalidateQueries({
        queryKey:['getCart']
      })
      toast.add({
  type: "success",
  description: "Cart deleted Successfully " ,
})
    },
    onError:()=>{
    toast.add({
  type: "error",
  description: " Faild to delete" ,
})
    }
  })


  function handleUpdateCart(prodID:string ,count:number){
    updateItem({prodID , count});


  }

  function handleClearCart(){
    clearCartItem()

  }
  if (isLoading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  const products = cartData?.data?.products ?? [];
  const totalPrice = cartData?.data?.totalCartPrice ?? 0;
  const itemsCount = cartData?.numOfCartItems ?? 0;

  return (
    <section className="min-h-screen bg-[#f8faf9] px-6 py-6">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm">
          <span className="text-secondary">Home</span>

          <ChevronRight
            size={15}
            className="text-secondary"
          />

          <span className="text-gray-800">
            Shopping Cart
          </span>
        </div>

        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
              <ShoppingCart size={28} />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>

          </div>

          <p className="mt-2 text-secondary">
            You have{" "}
            <span className="font-semibold text-primary">
              {itemsCount} items
            </span>{" "}
            in your cart
          </p>
        </div>


        {/* Main Content */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_450px]">

          {/* ================= PRODUCTS ================= */}
          <div className="space-y-4">

            {products.map((item: Product) => {

              const product = item.product;

              const itemTotal = item.price * item.count;

              return (
                <div
                  key={item._id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >

                  <div className="flex gap-6">

                    {/* Product Image */}
                    <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="h-full w-full object-contain"
                      />
                    </div>


                    {/* Product Info */}
                    <div className="flex min-w-0 flex-1 flex-col">

                      <h2 className="text-lg font-semibold text-gray-900">
                        {product.title}
                      </h2>

                      {/* Category + SKU */}
                      <div className="mt-2 flex items-center gap-2 text-xs">

                        <span className="rounded-full bg-green-50 px-3 py-1 text-primary">
                          {product.category.name}
                        </span>

                        <span className="text-secondary">
                          •
                        </span>

                        <span className="text-secondary">
                          SKU: {product._id.slice(-6).toUpperCase()}
                        </span>

                      </div>


                      {/* Price */}
                      <div className="mt-3">
                        <span className="text-lg font-bold text-primary">
                          {item.price.toLocaleString()} EGP
                        </span>

                        <span className="ml-2 text-xs text-secondary">
                          per unit
                        </span>
                      </div>


                      {/* Bottom */}
                      <div className="mt-auto flex items-end justify-between">

                        {/* Stock */}
                        <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                          ✓ In Stock
                        </span>


                        {/* Quantity */}
                        <div className="flex items-center rounded-xl border border-gray-200 p-1">

                          <button
                          onClick={()=>{handleUpdateCart(product._id ,item.count -1)}}

                            className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="w-10 text-center font-semibold text-gray-900">
                            {item.count}
                          </span>

                          <button
                          onClick={()=>{handleUpdateCart(product._id ,item.count +1)}}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white hover:opacity-90"
                          >
                            <Plus size={16} />
                          </button>

                        </div>


                        {/* Total */}
                        <div className="text-right">

                          <p className="text-xs text-secondary">
                            Total
                          </p>

                          <div className="flex items-center gap-1">
                            <span className="text-xl font-bold text-gray-900">
                              {itemTotal.toLocaleString()}
                            </span>

                            <span className="text-xs text-secondary">
                              EGP
                            </span>
                          </div>

                        </div>


                        {/* Delete */}
                        <button onClick={()=>{
                          delCartItem(product._id)
                        }} className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50">
                          <Trash2 size={19} />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
<button onClick={handleClearCart} className=' text-primary border-none hover:text-red-500 transition-colors duration-200 px-4 py-2 '>
  Clear All items
</button>


          </div>


          {/* ================= ORDER SUMMARY ================= */}
          <div className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Green Header */}
            <div className="bg-primary px-6 py-5 text-white">

              <div className="flex items-center gap-3">

                <ShoppingCart size={21} />

                <h2 className="text-lg font-bold">
                  Order Summary
                </h2>

              </div>

              <p className="mt-1 text-sm text-white/90">
                {itemsCount} items in your cart
              </p>

            </div>


            <div className="p-6">

              {/* Free Shipping */}
              <div className="mb-6 flex items-center gap-4 rounded-xl bg-green-50 p-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-primary">
                  <Truck size={20} />
                </div>

                <div>
                  <p className="font-semibold text-primary">
                    Free Shipping!
                  </p>

                  <p className="text-sm text-primary">
                    You qualify for free delivery
                  </p>
                </div>

              </div>


              {/* Subtotal */}
              <div className="flex items-center justify-between py-2 text-sm">

                <span className="text-secondary">
                  Subtotal
                </span>

                <span className="font-medium text-gray-800">
                  {totalPrice.toLocaleString()} EGP
                </span>

              </div>


              {/* Shipping */}
              <div className="flex items-center justify-between py-2 text-sm">

                <span className="text-secondary">
                  Shipping
                </span>

                <span className="font-medium text-primary">
                  FREE
                </span>

              </div>


              <div className="my-3 border-t border-dashed border-gray-300" />


              {/* Total */}
              <div className="flex items-center justify-between">

                <span className="font-semibold text-gray-900">
                  Total
                </span>

                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalPrice.toLocaleString()}
                  </span>

                  <span className="ml-1 text-sm text-secondary">
                    EGP
                  </span>
                </div>

              </div>


              {/* Promo */}
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-secondary hover:bg-gray-50">

                <Tag size={17} />

                Apply Promo Code

              </button>


              {/* Checkout */}
            <Link
  href={`/checkout/${cartData?.cartId}`}
  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-white shadow-md transition hover:opacity-90"
>
  <LockKeyhole size={18} />
  Secure Checkout
</Link>


              {/* Features */}
              <div className="mt-6 flex justify-center gap-6 text-xs text-secondary">

                <span className="flex items-center gap-1">
                  <span className="text-primary">●</span>
                  Secure Payment
                </span>

                <span className="flex items-center gap-1">
                  <Truck
                    size={14}
                    className="text-blue-500"
                  />
                  Fast Delivery
                </span>

              </div>


              {/* Continue Shopping */}
              <button className="mt-8 flex w-full items-center justify-center gap-1 text-sm text-primary hover:underline">

                <ArrowLeft size={15} />

                Continue Shopping

              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}