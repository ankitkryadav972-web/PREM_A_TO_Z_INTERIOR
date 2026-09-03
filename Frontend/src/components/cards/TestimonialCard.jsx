import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-[#17171a] p-8 sm:p-10 border border-white/10 hover:border-[#c5a880]/40 transition-colors duration-400 flex flex-col justify-between h-full relative">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 pointer-events-none" />

      <div>
        {/* 5-Star Rating */}
        <div className="flex items-center gap-1 mb-6">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#c5a880] text-[#c5a880]" />
          ))}
        </div>

        {/* Review Quote */}
        <p className="text-stone-300 font-light text-base sm:text-lg leading-relaxed italic mb-8">
          "{testimonial.review}"
        </p>
      </div>

      {/* Customer Credential */}
      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
        <div>
          <h4 className="font-editorial text-xl font-normal text-white">
            {testimonial.name}
          </h4>
          <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
            {testimonial.location || 'Gorakhpur'}
          </span>
        </div>

        {testimonial.service && (
          <span className="text-[11px] uppercase tracking-wider text-[#c5a880] bg-[#c5a880]/10 px-2.5 py-1 border border-[#c5a880]/20 font-medium">
            {testimonial.service}
          </span>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
