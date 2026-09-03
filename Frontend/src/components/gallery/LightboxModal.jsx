import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, MapPin } from 'lucide-react';
import { businessInfo } from '../../data/business.js';

export const LightboxModal = ({ item, onClose }) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const whatsappInquiryUrl = `https://wa.me/91${businessInfo.whatsappPrimary}?text=${encodeURIComponent(
    `Hello Prem A to Z Interior Design, I am interested in this design from your gallery: ${item.title} (${item.category}). Please share details.`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 bg-[#141417] border border-white/15 max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl shadow-black"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:text-[#c5a880] border border-white/20 flex items-center justify-center transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="md:w-3/5 bg-black/60 relative min-h-[300px] md:min-h-[500px]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Information Panel */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold bg-[#c5a880]/10 px-2.5 py-1 border border-[#c5a880]/20">
                  {item.category}
                </span>
                {item.location && (
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#c5a880]" />
                    {item.location}
                  </span>
                )}
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-4">
                {item.title}
              </h3>

              <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">
                {item.description}
              </p>

              {item.tags && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] text-stone-400 bg-white/5 px-2.5 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Consultation CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#22bf5b] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire About This Project</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs uppercase tracking-wider text-stone-400 hover:text-white transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LightboxModal;
