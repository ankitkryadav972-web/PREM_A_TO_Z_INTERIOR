import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check } from 'lucide-react';
import { businessInfo } from '../../data/business.js';
import { resolveImageUrl, handleImageError, defaultGalleryImages } from '../../utils/imageHelper.js';

export const ProductCard = ({ product, onSelect, index = 0 }) => {
  const whatsappProductUrl = `https://wa.me/91${businessInfo.whatsappPrimary}?text=${encodeURIComponent(
    `Hello Prem A to Z Interior Design, I am interested in your product: ${product.name} (${product.category}). Please share catalog & price details.`
  )}`;

  const resolvedImage = resolveImageUrl(product.image || product.images?.[0], product.category || 'furniture');
  const fallbackUrl = defaultGalleryImages[index % defaultGalleryImages.length];

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
          src={resolvedImage}
          alt={product.name}
          loading="lazy"
          onError={(e) => handleImageError(e, fallbackUrl)}
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
            <ul className="space-y-1.5 mb-6">
              {product.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-stone-300 font-light">
                  <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <button
            onClick={() => onSelect && onSelect(product)}
            className="text-xs uppercase tracking-wider text-[#c5a880] hover:text-white font-medium transition-colors cursor-pointer"
          >
            Quick Specs
          </button>

          <a
            href={whatsappProductUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
