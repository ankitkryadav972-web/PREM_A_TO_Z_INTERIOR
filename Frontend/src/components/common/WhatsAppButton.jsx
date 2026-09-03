import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { businessInfo } from '../../data/business.js';

export const WhatsAppButton = () => {
  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center"
    >
      <motion.a
        href={businessInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.8 }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 border border-white/20"
        aria-label={`Chat on WhatsApp with ${businessInfo.name} at ${businessInfo.whatsappPrimary}`}
      >
        {/* Pulsing indicator ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-white"></span>
        </span>

        <MessageCircle className="w-5 h-5 fill-current" />
        
        <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider pr-1">
          Chat on WhatsApp
        </span>
      </motion.a>
    </aside>
  );
};

export default WhatsAppButton;
