import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Sparkles, Award, MapPin, Phone, MessageCircle } from 'lucide-react';
import { businessInfo } from '../data/business.js';
import Container from '../components/common/Container.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import Button from '../components/common/Button.jsx';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1] pt-28 pb-20">
      {/* Page Header */}
      <section className="py-12 md:py-20 border-b border-white/10 bg-[#141417]/50">
        <Container size="lg">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a880] mb-3 block">
              About Studio
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.1] mb-6">
              Crafting Timeless Spaces With Passion, Precision & Integrity.
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Based in Gorakhpur and serving clients across India, <strong>{businessInfo.name}</strong> brings together architectural vision, master carpentry, and turnkey project management to create spaces that endure.
            </p>
          </div>
        </Container>
      </section>

      {/* Philosophy & Story */}
      <section className="py-20 md:py-28">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="h-[450px] w-full border border-white/10 overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                  alt="Our Workshop and Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#1a1a1f] p-6 border border-[#c5a880]/30 hidden sm:block max-w-xs">
                <span className="text-xs uppercase tracking-widest text-[#c5a880] font-bold block mb-1">
                  Turnkey Reliability
                </span>
                <p className="text-xs text-stone-400 font-light">
                  From structural 2D planning to the last decorative switch plate.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <SectionHeading
                badge="Our Philosophy"
                title="Design Without Compromise"
                align="left"
                className="mb-6"
              />
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                Too often, homeowners face friction between what is conceptualized on a blueprint and what carpenters build on-site. Prem A to Z was founded to bridge that gap completely.
              </p>
              <p className="text-stone-400 text-sm font-light leading-relaxed mb-8">
                We handle design, carpentry fabrication, modular kitchen engineering, false ceiling casting, and concealed electrical installations under one unified banner. With our workshop in Gorakhpur and execution teams deployed for turnkey projects across India, we take personal pride in every edge-banded shelf, smooth-running drawer, and clean ceiling cove.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-white/5 border border-white/10 text-[#c5a880] shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-1">Architectural Focus</h4>
                    <p className="text-xs text-stone-400 font-light">
                      Balancing aesthetics with ergonomic storage and daily utility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-white/5 border border-white/10 text-[#c5a880] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-1">Material Integrity</h4>
                    <p className="text-xs text-stone-400 font-light">
                      Genuine IS 710 marine ply and branded architectural hardware.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Turnkey Values / Pillars */}
      <section className="py-20 bg-[#141417] border-y border-white/10">
        <Container size="lg">
          <SectionHeading
            badge="Core Standards"
            title="Our Four Pillars of Quality"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Bespoke Customization',
                desc: 'Every element—from entrance door heights to internal wardrobe compartments—is tailored to your space.'
              },
              {
                title: 'Certified Safety',
                desc: 'Fire-retardant electrical wiring, load-balanced circuit breakers, and moisture-sealed wet areas.'
              },
              {
                title: 'All India Execution',
                desc: 'Serving homeowners and commercial institutions across India with disciplined timelines.'
              },
              {
                title: 'Transparent Pricing',
                desc: 'Detailed itemized quotes with exact brand specifications and zero surprise add-ons.'
              }
            ].map((pillar, idx) => (
              <div key={idx} className="p-6 bg-[#17171a] border border-white/5">
                <span className="text-xs font-mono text-[#c5a880] block mb-3">0{idx + 1}</span>
                <h3 className="font-editorial text-2xl font-normal text-white mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Workshop Location & CTA */}
      <section className="py-20 md:py-28">
        <Container size="default" className="text-center">
          <div className="inline-flex items-center gap-2 text-xs text-[#c5a880] uppercase tracking-widest font-semibold mb-3">
            <MapPin className="w-4 h-4" />
            <span>{businessInfo.address}</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white mb-6">
            Ready to Plan Your Interior Journey?
          </h2>

          <p className="text-stone-300 text-base max-w-xl mx-auto font-light leading-relaxed mb-10">
            Visit our workshop or schedule an on-site spatial consultation with our senior interior specialists today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg">
              Book Spatial Consultation
            </Button>
            <Button href={businessInfo.whatsappUrl} variant="outline" size="lg" icon={MessageCircle}>
              Chat with Us
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
