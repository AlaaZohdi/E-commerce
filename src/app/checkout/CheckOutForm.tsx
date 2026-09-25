"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  FileText,
  Home,
  MapPin,
  Phone,
  Info,
  CreditCard,
  Banknote,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Lock,
  Hash,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cartResponseType } from "@/api/types/cartType";
import { getCart } from "@/api/actions/cartActions/getCart";
import { payCash } from "@/api/actions/payment/paycashactions";
import { payOnline } from "@/api/actions/payment/payOnlineaction";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { checkoutSchema, CheckoutSchemaType } from "@/schema/checkoutSchema";

export interface ShippingAddress {
  city: string;
  details: string;
  phone: string;
  postalCode: string;
}

export default function CheckOutForm({ cartId }: { cartId: string }) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { data: cart, isLoading: cartLoading } = useQuery<cartResponseType>({
    queryKey: ["getCart"],
    queryFn: async () => {
      return await getCart();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "",
      details: "",
      phone: "",
      postalCode: "",
      paymentMethod: "cash",
    },
  });

 async function onSubmit(values: CheckoutSchemaType) {
  const shippingAddress: ShippingAddress = {
    details: values.details,
    phone: values.phone,
    city: values.city,
    postalCode: values.postalCode,
  };

  try {
    setSubmitting(true);

    // Cash on Delivery
    if (values.paymentMethod === "cash") {
      const payload = await payCash(cartId, shippingAddress);

      console.log(payload);

      if (payload.status === "success") {
        toast.add({
          type: "success",
          description: "Order created successfully",
        });

        router.push("/");
      } else {
        toast.add({
          type: "error",
          description: "Order not created",
        });
      }

      return;
    }

    // Pay Online
    if (values.paymentMethod === "card") {
      const payload = await payOnline(cartId, shippingAddress);

      console.log(payload);

      if (payload.status === "success") {
        toast.add({
          type: "success",
          description: "Redirecting to payment...",
        });

        window.location.href = payload.session.url;
      } else {
        toast.add({
          type: "error",
          description: "Payment failed",
        });
      }
    }
  } catch (error) {
    console.error(error);

    toast.add({
      type: "error",
      description: "Something went wrong while placing your order",
    });
  } finally {
    setSubmitting(false);
  }
}

  const items = cart?.data?.products ?? [];
  const subtotal = cart?.data?.totalCartPrice ?? 0;
  const total = subtotal; // shipping is FREE per design

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-secondary">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-primary">
          Cart
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-700">Checkout</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary">
            <FileText size={26} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-700">
              Complete Your Order
            </h1>
            <p className="text-sm text-secondary">
              Review your items and complete your purchase
            </p>
          </div>
        </div>

        <Link
          href="/cart"
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Shipping Address */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <div className="bg-primary px-6 py-5">
                <div className="flex items-center gap-2 text-white">
                  <Home size={18} />
                  <span className="font-semibold">Shipping Address</span>
                </div>
                <p className="mt-1 text-sm text-white/80">
                  Where should we deliver your order?
                </p>
              </div>

              <div className="flex flex-col gap-5 p-6">
                {/* Info banner */}
                <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                  <Info size={18} className="mt-0.5 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Delivery Information
                    </p>
                    <p className="text-sm text-blue-600">
                      Please ensure your address is accurate for smooth
                      delivery
                    </p>
                  </div>
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                    />
                    <Input
                      id="city"
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className="h-12 pl-10"
                      {...register("city")}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-sm text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="details">
                    Street Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                    />
                    <Input
                      id="details"
                      placeholder="Street name, building number, floor, apartment..."
                      className="h-12 pl-10"
                      {...register("details")}
                    />
                  </div>
                  {errors.details && (
                    <p className="text-sm text-red-500">
                      {errors.details.message}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="postalCode">
                    Postal Code <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Hash
                      size={18}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                    />
                    <Input
                      id="postalCode"
                      placeholder="e.g. 12345"
                      className="h-12 pl-10"
                      {...register("postalCode")}
                    />
                  </div>
                  {errors.postalCode && (
                    <p className="text-sm text-red-500">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                    />
                    <Input
                      id="phone"
                      placeholder="01xxxxxxxxx"
                      className="h-12 pl-10 pr-32"
                      {...register("phone")}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary">
                      Egyptian numbers only
                    </span>
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

           {/* Payment Method */}
<div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
  <div className="bg-primary px-6 py-5">
    <div className="flex items-center gap-2 text-white">
      <CreditCard size={18} />
      <span className="font-semibold">Payment Method</span>
    </div>

    <p className="mt-1 text-sm text-white/80">
      Choose how you'd like to pay
    </p>
  </div>

  <div className="flex flex-col gap-4 p-6">
    <Controller
      control={control}
      name="paymentMethod"
      render={({ field }) => (
        <>
          {/* Cash on Delivery */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => field.onChange("cash")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                field.onChange("cash");
              }
            }}
            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 text-left transition-colors ${
              field.value === "cash"
                ? "border-primary bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                <Banknote size={20} />
              </div>

              <div>
                <p className="font-semibold text-primary">
                  Cash on Delivery
                </p>

                <p className="text-sm text-secondary">
                  Pay when your order arrives at your doorstep
                </p>
              </div>
            </div>

            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                field.value === "cash"
                  ? "border-primary bg-primary"
                  : "border-gray-300"
              }`}
            >
              {field.value === "cash" && (
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
          </div>

          {/* Pay Online */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => field.onChange("card")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                field.onChange("card");
              }
            }}
            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 text-left transition-colors ${
              field.value === "card"
                ? "border-primary bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <CreditCard size={20} />
              </div>

              <div>
                <p className="font-semibold text-gray-700">
                  Pay Online
                </p>

                <p className="text-sm text-secondary">
                  Secure payment with Credit/Debit Card via Stripe
                </p>
              </div>
            </div>

            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                field.value === "card"
                  ? "border-primary bg-primary"
                  : "border-gray-300"
              }`}
            >
              {field.value === "card" && (
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
          </div>
        </>
      )}
    />

    {errors.paymentMethod && (
      <p className="text-sm text-red-500">
        {errors.paymentMethod.message}
      </p>
    )}

    {/* Secure note */}
    <div className="flex items-start gap-3 rounded-xl bg-green-50 p-4">
      <ShieldCheck
        size={18}
        className="mt-0.5 shrink-0 text-primary"
      />

      <div>
        <p className="text-sm font-medium text-primary">
          Secure & Encrypted
        </p>

        <p className="text-sm text-primary/80">
          Your payment info is protected with 256-bit SSL encryption
        </p>
      </div>
    </div>
  </div>
</div>
          </div>

          {/* Right column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <div className="bg-primary px-6 py-5">
                <div className="flex items-center gap-2 text-white">
                  <ShoppingBag size={18} />
                  <span className="font-semibold">Order Summary</span>
                </div>
                <p className="mt-1 text-sm text-white/80">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6">
                {cartLoading && (
                  <p className="text-sm text-secondary">
                    Loading your cart...
                  </p>
                )}

                {!cartLoading && items.length === 0 && (
                  <p className="text-sm text-secondary">
                    Your cart is empty.
                  </p>
                )}

                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-gray-700">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-secondary">
                        {item.count} x {item.price} EGP
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold text-gray-700">
                      {item.count * item.price}
                    </span>
                  </div>
                ))}

                <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex items-center justify-between text-secondary">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-700">
                      {subtotal} EGP
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Truck size={14} />
                      Shipping
                    </span>
                    <span className="font-medium text-primary">FREE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-semibold text-gray-700">Total</span>
                  <span className="text-xl font-bold text-primary">
                    {total} <span className="text-sm font-medium">EGP</span>
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={submitting || items.length === 0}
                  className="mt-2 flex h-12 items-center gap-2 rounded-full bg-primary text-base font-semibold hover:opacity-90"
                >
                  <ShoppingBag size={18} />
                  {submitting ? "Placing Order..." : "Place Order"}
                </Button>

                <div className="mt-2 flex items-center justify-center gap-4 text-xs text-secondary">
                  <span className="flex items-center gap-1">
                    <Lock size={12} className="text-primary" />
                    Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck size={12} className="text-blue-500" />
                    Fast Delivery
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCcw size={12} className="text-orange-500" />
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
