import Link from "next/link";
import { ShoppingCart, Home } from "lucide-react";
import GoBackButton from './-component/GoBackButton/GoBackButton';

export default function NotFound() {
  const destinations = [
    { label: "All Products", href: "/shop", active: true },
    { label: "Categories", href: "/categories" },
    { label: "Today's Deals", href: "/deals" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gray-50 px-4 py-16">
      {/* Decorative background icons */}
      <span className="absolute left-[6%] top-[45%] text-3xl opacity-40">🍎</span>
      <span className="absolute left-[18%] top-[62%] text-2xl opacity-30 rotate-12">🌱</span>
      <span className="absolute right-[10%] top-[15%] text-3xl opacity-40 rotate-12">🥕</span>
      <span className="absolute right-[8%] top-[68%] text-3xl opacity-40 -rotate-12">🌿</span>

      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Icon card */}
        <div className="relative mx-auto mb-8 flex h-44 w-56 items-center justify-center rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-sm">
          <ShoppingCart size={72} strokeWidth={1.5} className="text-primary/70" />

          <span className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary text-lg font-bold text-white shadow-md">
            404
          </span>
        </div>

        {/* Dots + smile */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-6 w-10 rounded-b-full border-b-2 border-primary" />
          <span className="h-2 w-2 rounded-full bg-primary" />
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Oops! Nothing Here
        </h1>

        <p className="mb-8 text-gray-500">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s
          plenty more fresh content to explore.
        </p>

        {/* Buttons */}
        <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            <Home size={18} />
            Go to Homepage
          </Link>

          <GoBackButton />
        </div>

        {/* Popular destinations */}
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6">
          <p className="mb-4 text-xs font-medium tracking-wider text-gray-400">
            POPULAR DESTINATIONS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {destinations.map((dest) => (
              <Link
                key={dest.label}
                href={dest.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  dest.active
                    ? "bg-green-50 text-primary"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {dest.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}