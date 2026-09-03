import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import { servicesData } from '../data/services.js';
import { businessInfo } from '../data/business.js';
import Container from '../components/common/Container.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import Button from '../components/common/Button.jsx';

export const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1] pt-28 pb-24">
      {/* Header */}
      <section className="py-12 md:py-20 border-b border-white/10 bg-[#141417]/50">
        <Container size="lg">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a880] mb-3 block">
              Our Capabilities
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.1] mb-6">
              Turnkey Interior Solutions Engineered for Perfection.
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Explore our core disciplines. From high-grade wooden carpentry and modular kitchen engineering to architectural false ceilings and concealed electrical systems, we deliver end-to-end craftsmanship.
            </p>
          </div>
        </Container>
      </section>

      {/* Services List - Deep Dive */}
      <section className="py-20">
        <Container size="lg">
          <div className="flex flex-col gap-24 md:gap-32">
            {servicesData.map((service, index) => {
              const isEven = index % 2 === 1;
              const whatsappServiceUrl = `https://wa.me/91${businessInfo.whatsappPrimary}?text=${encodeURIComponent(
                `Hello Prem A to Z Interior Design, I am interested in your ${service.title} services. Please share more details & arrange consultation.`
              )}`;

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7 }}
                    className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="relative h-[380px] sm:h-[460px] w-full border border-white/10 overflow-hidden bg-black/40 group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11]/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/75 backdrop-blur-md text-[#c5a880] text-[10px] uppercase tracking-[0.25em] font-semibold px-3 py-1 border border-white/10">
                          {service.tag || 'Craftsmanship'}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7 }}
                    className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <span className="text-xs font-mono text-[#c5a880] tracking-widest block mb-2">
                      0{index + 1} / SERVICE
                    </span>

                    <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-6">
                      {service.title}
                    </h2>

                    <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mb-10">
                      <h4 className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold mb-4">
                        Key Specifications & Features
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300 font-light">
                            <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                      <Button
                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                        variant="primary"
                        size="md"
                        icon={ArrowRight}
                      >
                        Enquire for {service.title}
                      </Button>

                      <Button
                        href={whatsappServiceUrl}
                        variant="outline"
                        size="md"
                        icon={MessageCircle}
                      >
                        Quick WhatsApp
                      </Button>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="py-20 bg-[#141417] border-t border-white/10">
        <Container size="default" className="text-center">
          <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-white mb-4">
            Need Multiple Services or a Complete 3BHK Turnkey Package?
          </h3>
          <p className="text-stone-400 text-sm sm:text-base font-light max-w-xl mx-auto mb-8">
            We provide integrated turnkey packages that combine doors, modular kitchen, electrical work, false ceiling, and complete furniture under a single contract with unified milestone delivery.
          </p>
          <Button to="/contact" variant="primary" size="lg">
            Request Comprehensive BoQ Estimate
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage;
