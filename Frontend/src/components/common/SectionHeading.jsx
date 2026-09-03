import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({
  badge,
  title,
  description,
  align = 'center',
  className = '',
  light = false
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 mb-3.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className="w-6 h-[1px] bg-[#c5a880]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
            {badge}
          </span>
          {isCenter && <span className="w-6 h-[1px] bg-[#c5a880]" />}
        </div>
      )}

      <h2
        className={`font-editorial text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.15] ${
          light ? 'text-[#0f0f11]' : 'text-white'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-sm sm:text-base md:text-lg leading-relaxed font-light ${
            light ? 'text-stone-600' : 'text-stone-400'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
