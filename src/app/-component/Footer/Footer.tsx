import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
 Facebook02Icon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  const shopLinks = [
    { label: "All Products", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    { label: "Electronics", href: "/categories/electronics" },
    { label: "Men's Fashion", href: "/categories/mens-fashion" },
    { label: "Women's Fashion", href: "/categories/womens-fashion" },
  ];

  const accountLinks = [
    { label: "My Account", href: "/account" },
    { label: "Order History", href: "/account/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Sign In", href: "/login" },
    { label: "Create Account", href: "/register" },
  ];

  const supportLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Track Order", href: "/track-order" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ];

  const socials = [
    { icon: Facebook02Icon, href: "https://facebook.com" },
    { icon: TwitterIcon, href: "https://twitter.com" },
    { icon: InstagramIcon, href: "https://instagram.com" },
    { icon: YoutubeIcon, href: "https://youtube.com" },
  ];

  return (
    <footer className="mt-16">
      {/* Top strip - features */}
      <div className="border-b border-green-100 bg-green-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-16">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
              <p className="text-xs text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary">
              <RotateCcw size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
              <p className="text-xs text-gray-500">14-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
              <p className="text-xs text-gray-500">100% secure checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary">
              <Headphones size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">24/7 Support</p>
              <p className="text-xs text-gray-500">Contact us anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-gray-900 text-gray-300">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-5 lg:px-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex w-fit items-center gap-2 rounded-lg bg-white px-3 py-2">
              <ShoppingCart size={22} className="text-primary" />
              <span className="text-lg font-bold text-gray-900">FreshCart</span>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-gray-400">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="mb-5 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

           <div className="flex items-center gap-3">
  {socials.map((social, index) => (
    <a
      key={index} 
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-primary hover:text-white"
    >
      <HugeiconsIcon  icon={social.icon} size={16} />
    </a>
  ))}
</div>

          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">Shop</h4>
            <ul className="space-y-3 text-sm">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">Account</h4>
            <ul className="space-y-3 text-sm">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">Support</h4>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">Legal</h4>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-sm text-gray-400 sm:flex-row sm:px-8 lg:px-16">
            <p>© 2026 FreshCart. All rights reserved.</p>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <CreditCard size={16} />
                Visa
              </span>
              <span className="flex items-center gap-1">
                <CreditCard size={16} />
                Mastercard
              </span>
              <span className="flex items-center gap-1">
                <CreditCard size={16} />
                PayPal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}