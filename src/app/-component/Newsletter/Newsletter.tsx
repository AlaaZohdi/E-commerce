import {
  ArrowRight,
  Check,
  Download,
  Leaf,
  Mail,
  Play,
  Smartphone,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";

export default function Newsletter() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-green-100 bg-gradient-to-br from-green-50 via-white to-green-50 px-6 py-10 shadow-[0_20px_60px_rgba(22,163,74,0.08)] sm:px-10 lg:px-16 lg:py-14">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.65fr_1fr] lg:gap-12">

          {/* ================= LEFT ================= */}
          <div className="flex flex-col justify-center">

            {/* Newsletter Label */}
            <div className="mb-7 flex items-center gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-green-200">
                <Mail size={30} />
              </div>

              <div>
                <p className="text-lg font-medium tracking-wide text-primary">
                  NEWSLETTER
                </p>

                <p className="text-sm text-secondary">
                  50,000+ subscribers
                </p>
              </div>

            </div>


            {/* Heading */}
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[44px]">
              Get the Freshest Updates{" "}
              <span className="text-primary">
                Delivered Free
              </span>
            </h2>


            {/* Description */}
            <p className="mt-5 text-base text-secondary sm:text-lg">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>


            {/* Benefits */}
            <div className="mt-8 flex flex-wrap gap-4">

              {/* Benefit 1 */}
              <div className="flex items-center gap-3 rounded-full border border-green-100 bg-white px-5 py-3 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-primary">
                  <Leaf size={18} />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  Fresh Picks Weekly
                </span>

              </div>


              {/* Benefit 2 */}
              <div className="flex items-center gap-3 rounded-full border border-green-100 bg-white px-5 py-3 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-primary">
                  <Truck size={18} />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  Free Delivery Codes
                </span>

              </div>


              {/* Benefit 3 */}
              <div className="flex items-center gap-3 rounded-full border border-green-100 bg-white px-5 py-3 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-primary">
                  <Tag size={18} />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  Members-Only Deals
                </span>

              </div>

            </div>


            {/* Email Form */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <div className="flex h-[74px] flex-1 items-center rounded-2xl border border-gray-200 bg-white px-6 shadow-sm">

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
                />

              </div>

              <button
                type="button"
                className="flex h-[74px] items-center justify-center gap-3 rounded-2xl bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-green-200 transition hover:-translate-y-0.5 hover:opacity-90 sm:min-w-[205px]"
              >
                Subscribe
                <ArrowRight size={21} />
              </button>

            </div>


            {/* Note */}
            <div className="mt-4 flex items-center gap-2 text-sm text-secondary">

              <Sparkles
                size={17}
                className="text-yellow-500"
              />

              <span>
                Unsubscribe anytime. No spam, ever.
              </span>

            </div>

          </div>


          {/* ================= RIGHT ================= */}
          <div className="flex items-center">

            <div className="w-full rounded-[30px] bg-slate-900 p-7 text-white sm:p-9">

              {/* App Label */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">

                <Smartphone size={17} />

                MOBILE APP

              </div>


              {/* Heading */}
              <h3 className="mt-7 text-2xl font-bold leading-tight sm:text-3xl">
                Shop Faster on Our App
              </h3>


              {/* Description */}
              <p className="mt-5 text-sm leading-6 text-slate-400 sm:text-base">
                Get app-exclusive deals & 15% off your first order.
              </p>


              {/* App Store */}
              <button className="mt-8 flex w-full items-center gap-4 rounded-2xl border border-slate-600 bg-slate-700/70 px-6 py-4 text-left transition hover:bg-slate-700">

                <span className="text-2xl">
                  
                </span>

                <span>
                  <span className="block text-xs text-slate-400">
                    DOWNLOAD ON
                  </span>

                  <span className="block text-base font-semibold">
                    App Store
                  </span>
                </span>

              </button>


              {/* Google Play */}
              <button className="mt-4 flex w-full items-center gap-4 rounded-2xl border border-slate-600 bg-slate-700/70 px-6 py-4 text-left transition hover:bg-slate-700">

                <Play
                  size={25}
                  fill="currentColor"
                />

                <span>
                  <span className="block text-xs text-slate-400">
                    GET IT ON
                  </span>

                  <span className="block text-base font-semibold">
                    Google Play
                  </span>
                </span>

              </button>


              {/* Rating */}
              <div className="mt-8 flex items-center gap-2">

                <div className="flex text-yellow-400">
                  ★★★★★
                </div>

                <span className="text-sm text-slate-400">
                  4.9 · 100K+ downloads
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}