import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, MapPin } from 'lucide-react';

export const ProjectCard = ({ project, onSelect, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect && onSelect(project)}
      className="group relative h-80 sm:h-96 w-full overflow-hidden bg-[#17171a] cursor-pointer border border-white/10 hover:border-[#c5a880]/60 transition-colors duration-500"
    >
      {/* Background Image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-all duration-700 ease-out"
      />

      {/* Persistent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/30 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />

      {/* Category Pill */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-black/70 backdrop-blur-md text-[#c5a880] text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 border border-white/10">
          {project.category}
        </span>
      </div>

      {/* Expand Icon Button */}
      <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:text-[#c5a880] group-hover:border-[#c5a880] transition-colors">
        <Maximize2 className="w-4 h-4" />
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 text-xs text-[#c5a880] uppercase tracking-widest font-medium mb-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>{project.location || 'Gorakhpur'}</span>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white group-hover:text-[#c5a880] transition-colors duration-300 mb-2">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-stone-300 font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
