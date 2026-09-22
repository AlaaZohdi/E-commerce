'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface SlideData {
  image: string;
  title: string;
  subtitle: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
}

export default function Slider({
  spaceBetween,
  slidesPerView,
  slides,
}: {
  spaceBetween: number;
  slidesPerView: number;
  slides: SlideData[];
}) {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.slider-next',
          prevEl: '.slider-prev',
        }}
        loop={true}
        pagination={{
          clickable: true,
          el: '.slider-pagination',
        }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[300px] w-full sm:h-[350px] md:h-[400px]">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Green gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-center gap-4 px-8 sm:px-16">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  {slide.title}
                </h2>

                <p className="text-base text-white/90 sm:text-lg">
                  {slide.subtitle}
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    href={slide.primaryButton.href}
                    className="rounded-full bg-white px-6 py-3 font-semibold text-primary transition-opacity hover:opacity-90"
                  >
                    {slide.primaryButton.text}
                  </Link>

                  <Link
                    href={slide.secondaryButton.href}
                    className="rounded-full border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {slide.secondaryButton.text}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination dots */}
        <div className="slider-pagination absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" />
      </Swiper>

      {/* Prev Arrow */}
      <button className="slider-prev absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-colors hover:bg-white">
        <ChevronLeft size={22} />
      </button>

      {/* Next Arrow */}
      <button className="slider-next absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-colors hover:bg-white">
        <ChevronRight size={22} />
      </button>
    </div>
  );
}