import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronDown
} from 'lucide-react';

import { businessInfo } from '../data/business.js';
import { servicesData } from '../data/services.js';
import { projectsData } from '../data/projects.js';
import { testimonialsData } from '../data/testimonials.js';
import { statsData, processSteps, whyChooseUsData } from '../data/stats.js';

import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import ServiceCard from '../components/cards/ServiceCard.jsx';
import ProjectCard from '../components/cards/ProjectCard.jsx';
import TestimonialCard from '../components/cards/TestimonialCard.jsx';
import LightboxModal from '../components/gallery/LightboxModal.jsx';

export const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Hero Background Image with Editorial Dimming */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Modern Interior Architecture"
            className="w-full h-full object-cover object-center transform scale-105 animate-pulse-slow"
          />
          {/* Multi-tier gradients for depth & readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/70 to-[#0f0f11]/40" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <Container size="lg" className="relative z-10 text-center flex flex-col items-center">
          {/* Studio Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 bg-white/5 border border-white/15 px-4 py-1.5 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c5a880]">
              {businessInfo.name}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white max-w-5xl leading-[1.08] mb-6"
          >
            Transforming Spaces. <br />
            <span className="italic font-light text-[#e2cca8]">Creating Experiences.</span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-stone-300 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10"
          >
            {businessInfo.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button to="/services" variant="primary" size="lg" icon={ArrowRight}>
              Explore Services
            </Button>
            <Button to="/contact" variant="outline" size="lg" icon={ArrowUpRight}>
              Get a Quote
            </Button>
          </motion.div>

          {/* Subtle scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-stone-400 text-xs uppercase tracking-[0.25em]"
          >
            <span>Scroll To Discover</span>
            <ChevronDown className="w-4 h-4 text-[#c5a880] animate-bounce" />
          </motion.div>
        </Container>
      </section>

      {/* 2. TRUST / STATS SECTION */}
      <section className="py-16 md:py-20 border-y border-white/10 bg-[#141417]/70 backdrop-blur-md">
        <Container size="lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {statsData.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <span className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#c5a880] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm uppercase tracking-wider font-semibold text-white mt-1">
                  {stat.label}
                </span>
                <span className="text-xs text-stone-400 font-light mt-1 hidden sm:block">
                  {stat.sublabel}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. ABOUT PREVIEW SECTION */}
      <section className="py-20 md:py-32 relative">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Editorial Image Composition */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative h-[420px] sm:h-[500px] w-full border border-white/10 overflow-hidden bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                  alt="Craftsmanship in Interior Design"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Accent Card */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-[#1a1a1f] p-6 border border-[#c5a880]/40 shadow-2xl max-w-xs hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-[#c5a880]" />
                  <span className="text-xs uppercase tracking-widest text-[#c5a880] font-bold">
                    Master Craftsmanship
                  </span>
                </div>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  Turnkey architectural carpentry, precision false ceilings, and certified electrical execution under one roof.
                </p>
              </div>
            </motion.div>

            {/* Editorial Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-[#c5a880]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
                  Designed Around You
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-[1.15] mb-6">
                Where Architectural Precision Meets Bespoke Luxury.
              </h2>

              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                At <strong>{businessInfo.name}</strong>, we believe an interior is not just decoration—it is an intimate reflection of how you live and work. Based out of Gorakhpur and executing turnkey projects across India, our seasoned master craftsmen bring decades of spatial design and woodwork mastery to life.
              </p>

              <p className="text-stone-400 text-sm font-light leading-relaxed mb-8">
                From precision boiling-water-proof modular kitchens and solid teak entrance doors to artistic POP cove false ceilings and concealed electrical engineering, we manage the entire project from initial 2D space planning to the final turnkey handover.
              </p>

              <div className="grid grid-cols-2 gap-4 w-full mb-8 pt-6 border-t border-white/10">
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Customized Design</h4>
                  <p className="text-xs text-stone-400 font-light">Engineered around your exact floor plan & lifestyle.</p>
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Complete Execution</h4>
                  <p className="text-xs text-stone-400 font-light">Zero contractor hassle; 100% turnkey delivery.</p>
                </div>
              </div>

              <Button to="/about" variant="goldOutline" size="md" icon={ArrowRight}>
                Learn More About Studio
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 4. SERVICES PREVIEW SECTION */}
      <section className="py-20 md:py-28 bg-[#141417]/40 border-t border-white/5">
        <Container size="lg">
          <SectionHeading
            badge="Our Core Expertise"
            title="Comprehensive Turnkey Interior Services"
            description="Explore our five core interior disciplines, crafted with the highest standards of materials, hardware, and engineering precision."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button to="/services" variant="outline" size="md" icon={ArrowUpRight}>
              View All Services & Specifications
            </Button>
          </div>
        </Container>
      </section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <section className="py-20 md:py-32">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <SectionHeading
              badge="Portfolio Showcase"
              title="Featured Interior Projects"
              description="A curated look into recently completed residential and commercial transformations."
              align="left"
              className="mb-0"
            />
            <Button to="/gallery" variant="text" icon={ArrowRight}>
              View Full Gallery
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.slice(0, 6).map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section className="py-20 md:py-28 bg-[#141417] border-y border-white/10">
        <Container size="lg">
          <SectionHeading
            badge="The Prem Advantage"
            title="Why Discerning Homeowners Choose Us"
            description="We combine artisanal craftsmanship with modern project management for a smooth, stress-free interior journey."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {whyChooseUsData.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-8 bg-[#17171a] border border-white/5 hover:border-[#c5a880]/40 transition-colors"
              >
                <span className="text-xs font-mono text-[#c5a880] tracking-widest block mb-3">
                  0{idx + 1}
                </span>
                <h3 className="font-editorial text-2xl font-normal text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. FIVE-STEP PROCESS SECTION */}
      <section className="py-20 md:py-32">
        <Container size="lg">
          <SectionHeading
            badge="Seamless Journey"
            title="Our Turnkey Execution Process"
            description="From the first site sketch to the final key handover, our streamlined 5-step workflow ensures clarity and on-time delivery."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-6 bg-[#17171a] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="font-editorial text-3xl font-light text-[#c5a880] block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-20 md:py-28 bg-[#141417]/50 border-t border-white/5">
        <Container size="lg">
          <SectionHeading
            badge="Client Voices"
            title="What Our Clients Say"
            description="Real feedback from families and business owners whose spaces we have transformed in Gorakhpur and beyond."
            align="center"
          />

          <div className="max-w-4xl mx-auto">
            <TestimonialCard testimonial={testimonialsData[activeTestimonialIndex]} />

            {/* Testimonial Nav Pills */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonialIndex(idx)}
                  className={`h-2 transition-all duration-300 rounded-none ${
                    activeTestimonialIndex === idx ? 'w-8 bg-[#c5a880]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 9. FINAL CALL TO ACTION (CTA) */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f0f11] via-[#17171a] to-[#0a0a0b] border-t border-white/10">
        <Container size="default" className="text-center relative z-10 flex flex-col items-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a880] mb-4 block">
            Start Your Transformation
          </span>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white max-w-3xl leading-[1.1] mb-6">
            Let's Build Your Dream Space Together.
          </h2>

          <p className="text-stone-300 text-base sm:text-lg font-light max-w-xl leading-relaxed mb-10">
            Tell us about your project, timeline, and vision. Our senior design team is ready to provide free estimates and technical consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
              Contact Us Today
            </Button>

            <Button
              href={businessInfo.whatsappUrl}
              variant="outline"
              size="lg"
              icon={MessageCircle}
            >
              WhatsApp Us (7458905073)
            </Button>
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <LightboxModal
          item={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
