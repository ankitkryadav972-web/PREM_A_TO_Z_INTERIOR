import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check } from 'lucide-react';
import { businessInfo } from '../../data/business.js';

export const ProductCard = ({ product, onSelect, index = 0 }) => {
  const whatsappProductUrl = `https://wa.me/91${businessInfo.whatsappPrimary}?text=${encodeURIComponent(
    `Hello Prem A to Z Interior Design, I am interested in your product: ${product.name} (${product.category}). Please share catalog & price details.`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-[#17171a] border border-white/10 hover:border-[#c5a880]/50 transition-all duration-400 flex flex-col overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden bg-black/40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17171a] via-transparent to-transparent opacity-80" />
        
        {/* Category Pill */}
        <span className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md text-[#c5a880] text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 border border-white/10">
          {product.category}
        </span>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-editorial text-2xl font-normal text-white group-hover:text-[#c5a880] transition-colors mb-2">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Bullet specifications */}
          {product.features && (
            <ul className="space-y-1.5 mb-6 pt-3 border-t border-white/5">
              {product.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                  <Check className="w-3 h-3 text-[#c5a880] shrink-0" />
                  <span className="truncate">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <button
            onClick={() => onSelect && onSelect(product)}
            className="text-xs uppercase tracking-wider text-stone-300 hover:text-white font-medium transition-colors"
          >
            Quick Specs
          </button>

          <a
            href={whatsappProductUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1f1f26] hover:bg-[#c5a880] text-stone-200 hover:text-[#0f0f11] text-xs font-semibold uppercase tracking-wider px-3.5 py-2 border border-white/10 hover:border-[#c5a880] transition-all duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
