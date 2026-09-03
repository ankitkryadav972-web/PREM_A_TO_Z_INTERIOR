import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';

export const ServiceCard = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#17171a] border border-white/10 hover:border-[#c5a880]/60 transition-all duration-500 flex flex-col overflow-hidden"
    >
      {/* Image container with subtle zoom */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/40">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transform group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17171a] via-[#17171a]/40 to-transparent" />
        
        {/* Category / Tag badge */}
        {service.tag && (
          <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#c5a880] text-[10px] uppercase tracking-[0.2em] font-medium px-3 py-1 border border-white/10">
            {service.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white group-hover:text-[#c5a880] transition-colors duration-300">
              {service.title}
            </h3>
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 group-hover:bg-[#c5a880] group-hover:text-[#0f0f11] group-hover:border-[#c5a880] transition-all duration-300 shrink-0">
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <p className="text-sm text-stone-400 font-light leading-relaxed mb-6">
            {service.shortDescription}
          </p>

          {/* Key Features List */}
          {service.features && (
            <ul className="space-y-2 mb-6 pt-4 border-t border-white/5">
              {service.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-stone-300 font-light">
                  <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Link */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#c5a880] hover:text-[#d4b58b] pt-4 border-t border-white/5 transition-colors"
        >
          <span>Explore Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
