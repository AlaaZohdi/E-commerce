"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Headphones,
  Heart,
  Search,
  ShoppingBasket,
  ShoppingCart,
  UserRound,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {signOut, useSession} from 'next-auth/react'
import { useQuery } from "@tanstack/react-query";
import { cartResponseType, Product } from "@/api/types/cartType";
import { Category } from '@/api/services/categoriesApi';
import { getWishList } from "@/api/actions/WishListactions/getWishList";

interface NavLink {
  path: string;
  element: string;
}

export default function Navbar() {
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

  const { data: wishListData } = useQuery({
  queryKey: ["wishlist"],
  queryFn: getWishList,
});

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );

      if (!response.ok) {
        throw new Error("Failed to get categories");
      }

      const payload = await response.json();
      return payload.data;
    },
  });

  function handleLogout(){
    signOut({redirect:true ,callbackUrl:'/login'})
  }
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const {data,status} =useSession();
  const links: NavLink[] = [
    { path: 'Home', element: '/' },
    { path: 'Shop', element: '/shop' },
    { path: 'Brands', element: '/brands' },
  ];

  // helper بيرجع class الرابط حسب إذا كان نشط أو لأ
  const getLinkClass = (path: string) =>
    `transition-colors hover:text-primary ${
      pathname === path ? "text-primary font-semibold" : "text-gray-700"
    }`;

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-4 p-2 lg:justify-start">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 lg:mr-10">
          <ShoppingBasket
            size={40}
            strokeWidth={1.5}
            className="text-primary"
          />

          <span className="text-2xl font-bold text-gray-700 lg:text-3xl">
            FreshCart
          </span>
        </Link>

        {/* Search - desktop only */}
        <div className="relative mr-10 hidden flex-1 lg:block">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="h-14 w-full rounded-full border border-gray-200 bg-transparent px-6 pr-16 text-secondary outline-none"
          />

          <button
            className="absolute right-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white"
          >
            <Search size={22} />
          </button>
        </div>

        {/* Navigation - desktop only */}
        <nav className="hidden items-center gap-8 text-lg lg:flex">

          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>

          <Link href="/shop" className={getLinkClass("/shop")}>
            Shop
          </Link>

          {/* Categories Menubar */}
          <Menubar className="h-auto border-0 bg-transparent p-0 shadow-none">
            <MenubarMenu>

              <MenubarTrigger
                className={`flex cursor-pointer items-center gap-1 bg-transparent px-0 py-0 text-lg font-normal hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent ${
                  pathname.startsWith("/categories") ? "text-primary font-semibold" : "text-gray-700"
                }`}
              >
                Categories
                <ChevronUp size={16} />
              </MenubarTrigger>

              <MenubarContent
                align="start"
                className="mt-8 w-64 rounded-2xl border-0 shadow-lg"
              >
                <Link href='/categories'>
                  <MenubarItem className="cursor-pointer px-5 py-5 text-lg text-secondary hover:text-primary">
                    All Categories
                  </MenubarItem>
                </Link>

                {categories?.map((category) => (
                  <Link key={category._id} href={`/categories/${category._id}`}>
                    <MenubarItem className="cursor-pointer px-5 py-5 text-lg text-secondary hover:text-primary">
                      {category.name}
                    </MenubarItem>
                  </Link>
                ))}

              </MenubarContent>

            </MenubarMenu>

          </Menubar>

          <Link href="/brands" className={getLinkClass("/brands")}>
            Brands
          </Link>

        </nav>


       {/* Right Section - desktop only */}
<div className="ml-10 hidden items-center gap-6 lg:flex">

  {/* Support */}
  <div className="flex items-center gap-3">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-primary">
      <Headphones size={25} />
    </div>

    <div className="border-r border-gray-200 pr-6">
      <p className="text-sm text-secondary">Support</p>
      <p className="font-medium text-gray-700">24/7 Help</p>
    </div>
  </div>

  {status === "authenticated" ? (
    <>
      {/* Wishlist Icon */}


      <Link href="/WishList" className="relative text-secondary transition-colors hover:text-primary">
  <Heart size={30} />
  {(wishListData?.count ?? 0) > 0 && (
    <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white pointer-events-none">
      {wishListData?.count}
    </span>
  )}
</Link>

      

      {/* Cart Icon with Badge */}
      <Link href="/cart" className="relative text-secondary transition-colors hover:text-primary">
        <ShoppingCart size={30} />
        {(cartData?.numOfCartItems ?? 0) > 0 && (
          <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white pointer-events-none">
            {cartData?.numOfCartItems}
          </span>
        )}
      </Link>

      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-white transition-opacity hover:opacity-90"
      >
        <UserRound size={19} />
        Log Out
      </button>
    </>
  ) : (
    <Link href='/login' className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-white transition-opacity hover:opacity-90">
      <UserRound size={19} />
      Sign In
    </Link>
  )}

</div>

        {/* Mobile: icons + menu trigger */}
        <div className="flex items-center gap-4 lg:hidden">

          <Link href="/WishList" className="text-secondary transition-colors hover:text-primary">
            <Heart size={26} />
          </Link>

          <Link href="/cart" className="text-secondary transition-colors hover:text-primary">
            <ShoppingCart size={26} />
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                <Menu size={22} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm border-l border-gray-200 bg-white p-0 text-gray-700 sm:w-96 [&>button]:text-gray-500"
            >
              <div className="flex h-full flex-col bg-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBasket
                      size={30}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                    <span className="text-xl font-bold text-gray-700">
                      FreshCart
                    </span>
                  </Link>

                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Search */}
                <div className="bg-white p-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="h-12 w-full rounded-full border border-gray-200 bg-white px-5 pr-14 text-sm text-secondary outline-none"
                    />
                    <button className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white">
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 bg-white px-4 py-2">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className={`py-3 text-lg transition-colors hover:text-primary ${
                      pathname === "/" ? "text-primary font-semibold" : "text-gray-700"
                    }`}
                  >
                    Home
                  </Link>

                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className={`py-3 text-lg transition-colors hover:text-primary ${
                      pathname === "/shop" ? "text-primary font-semibold" : "text-gray-700"
                    }`}
                  >
                    Shop
                  </Link>

                  <Link
                    href="/categories"
                    onClick={() => setOpen(false)}
                    className={`py-3 text-lg transition-colors hover:text-primary ${
                      pathname === "/categories" ? "text-primary font-semibold" : "text-gray-700"
                    }`}
                  >
                    Categories
                  </Link>

                  <Link
                    href="/brands"
                    onClick={() => setOpen(false)}
                    className={`py-3 text-lg transition-colors hover:text-primary ${
                      pathname === "/brands" ? "text-primary font-semibold" : "text-gray-700"
                    }`}
                  >
                    Brands
                  </Link>
                </nav>

                <div className="mx-4 border-t border-gray-100" />

                {/* Wishlist / Cart */}
                <div className="flex flex-col gap-1 bg-white px-4 py-2">
                  <Link
                    href="/WishList"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-3 text-lg text-gray-700 transition-colors hover:text-primary"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-400">
                      <Heart size={20} />
                    </span>
                    Wishlist
                  </Link>

                <Link
                    href="/cart"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-3 text-lg text-gray-700 transition-colors hover:text-primary"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-primary">
                      <ShoppingCart size={20} />
                    </span>
                    Cart
                  </Link>
                </div>

                {/* Auth buttons */}
                <div className="mt-2 flex gap-3 bg-white px-4">
                  <Link href='/login' className="flex-1 rounded-full bg-primary py-3 font-semibold text-white transition-opacity hover:opacity-90">
                    Sign In
                  </Link>
                  <Link href='/register' className="flex-1 rounded-full border border-primary py-3 font-semibold text-primary transition-colors hover:bg-green-50">
                    Sign Up
                  </Link>
                </div>

                {/* Support */}
                <div className="mt-auto flex items-center gap-3 border-t border-gray-100 bg-white p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-primary">
                    <Headphones size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-secondary">
                      Need Help?
                    </p>
                    <Link
                      href="/support"
                      onClick={() => setOpen(false)}
                      className="font-medium text-primary"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>

              </div>
            </SheetContent>
          </Sheet>

        </div>

      </div>
    </header>
  );
}
