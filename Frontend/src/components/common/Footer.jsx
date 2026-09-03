import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { businessInfo } from '../../data/business.js';
import { servicesData } from '../../data/services.js';
import Container from './Container.jsx';

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0b] text-[#a8a29e] pt-16 md:pt-24 pb-12 border-t border-white/10">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col">
            <Link to="/" className="inline-block mb-4 focus:outline-none">
              <span className="font-editorial text-2xl font-bold tracking-wider text-white">
                PREM A TO Z
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#c5a880] -mt-1 font-medium">
                Interior Design
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-stone-400 max-w-sm mb-6 font-light">
              Transforming residential and commercial spaces across India with customized architectural interiors, precision modular kitchens, bespoke woodwork, and turnkey execution.
            </p>

            <div className="flex flex-col gap-2.5 text-xs">
              <span className="text-white font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Service Area: <span className="text-[#c5a880]">{businessInfo.serviceArea}</span>
              </span>
              <span className="text-stone-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
                {businessInfo.workingHours}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Studio', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Product Showcase', path: '/products' },
                { name: 'Project Gallery', path: '/gallery' },
                { name: 'Contact & Quote', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#c5a880]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-5">
              Core Services
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="hover:text-white transition-colors duration-200 block text-stone-400"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-5">
              Direct Contact
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              <a
                href={businessInfo.telUrl}
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#c5a880] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-stone-500">Phone Consultation</span>
                  <span className="text-white font-medium">{businessInfo.phone}</span>
                </div>
              </a>

              <a
                href={businessInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-stone-500">Primary WhatsApp</span>
                  <span className="text-white font-medium">{businessInfo.whatsappPrimary}</span>
                </div>
              </a>

              <a
                href={businessInfo.whatsappSecondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-stone-500">Secondary WhatsApp</span>
                  <span className="text-white font-medium">{businessInfo.whatsappSecondary}</span>
                </div>
              </a>

              <div className="flex items-start gap-3 pt-1 text-stone-400">
                <MapPin className="w-4 h-4 text-[#c5a880] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-stone-500">Workshop & Office</span>
                  <span className="text-stone-300">{businessInfo.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {businessInfo.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-stone-300 transition-colors">Client Portal</Link>
            <Link to="/admin" className="hover:text-[#c5a880] transition-colors">Admin Area</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
