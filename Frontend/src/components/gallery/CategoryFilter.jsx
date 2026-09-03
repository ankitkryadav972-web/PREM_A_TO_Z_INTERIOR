import React from 'react';
import { motion } from 'framer-motion';

export const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-2 px-1 no-scrollbar mb-10 md:mb-14">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`relative text-xs uppercase tracking-[0.2em] font-medium px-5 py-2.5 rounded-none transition-colors whitespace-nowrap select-none cursor-pointer ${
              isActive ? 'text-[#0f0f11]' : 'text-stone-300 hover:text-white bg-white/5 border border-white/10'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-[#c5a880] z-0"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 font-semibold">{category}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
