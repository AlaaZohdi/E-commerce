import { ArrowRightToLineIcon } from 'lucide-react';
import React from 'react';

export default function PromoBanners() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      
      {/* البانر الأول: الفواكه العضوية الطازجة (الأخضر) */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[240px] text-white bg-gradient-to-r from-[#009b4d] to-[#0cb15e]">
        {/* أشكال الخلفية الدائرية (البابلز الـ Abstract) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 -translate-y-8 blur-sm pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xs pointer-events-none" />

        {/* محتوى البانر */}
        <div>
          {/* شارة الـ Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-medium tracking-wide backdrop-blur-xs mb-4 w-fit">
            <span>🔥</span> Deal of the Day
          </div>
          
          {/* العناوين */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Fresh Organic Fruits
          </h2>
          <p className="text-white/90 text-xs md:text-sm font-light mb-6">
            Get up to 40% off on selected organic fruits
          </p>
        </div>

        {/* الخصم وزر الدعوة لاتخاذ إجراء */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black tracking-tighter">40% OFF</span>
            <span className="text-[10px] md:text-xs text-white/80 font-normal">
              Use code: <strong className="font-bold text-white">ORGANIC40</strong>
            </span>
          </div>

          <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[#009b4d] font-semibold text-xs md:text-sm rounded-full shadow-md hover:bg-neutral-50 transition-colors cursor-pointer w-fit self-start sm:self-auto group">
            Shop Now 
            <ArrowRightToLineIcon size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* البانر الثاني: الخضروات الاستوائية (البرتقالي/الأحمر) */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[240px] text-white bg-gradient-to-r from-[#ff9100] via-[#ff523b] to-[#ff2a5f]">
        {/* أشكال الخلفية الدائرية (البابلز الـ Abstract) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 -translate-y-8 blur-sm pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xs pointer-events-none" />

        {/* محتوى البانر */}
        <div>
          {/* شارة الـ Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-medium tracking-wide backdrop-blur-xs mb-4 w-fit">
            <span>✨</span> New Arrivals
          </div>
          
          {/* العناوين */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Exotic Vegetables
          </h2>
          <p className="text-white/90 text-xs md:text-sm font-light mb-6">
            Discover our latest collection of premium vegetables
          </p>
        </div>

        {/* الخصم وزر الدعوة لاتخاذ إجراء */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black tracking-tighter">25% OFF</span>
            <span className="text-[10px] md:text-xs text-white/80 font-normal">
              Use code: <strong className="font-bold text-white">FRESH25</strong>
            </span>
          </div>

          <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[#ff523b] font-semibold text-xs md:text-sm rounded-full shadow-md hover:bg-neutral-50 transition-colors cursor-pointer w-fit self-start sm:self-auto group">
            Explore Now 
            <ArrowRightToLineIcon size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
