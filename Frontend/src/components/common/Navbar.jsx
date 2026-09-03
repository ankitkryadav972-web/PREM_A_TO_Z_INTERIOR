import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowUpRight, User, LogOut, ShieldCheck } from 'lucide-react';
import { businessInfo } from '../../data/business.js';
import { useAuth } from '../../context/AuthContext.jsx';
import Container from './Container.jsx';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll listener for sticky navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav py-3.5 shadow-2xl shadow-black/40'
          : 'bg-gradient-to-b from-[#0f0f11]/90 via-[#0f0f11]/40 to-transparent py-5'
      }`}
    >
      <Container size="lg">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="group flex flex-col focus:outline-none">
            <span className="font-editorial text-xl sm:text-2xl font-semibold tracking-wider text-white group-hover:text-[#c5a880] transition-colors duration-300">
              PREM A TO Z
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a880] -mt-1 font-medium">
              Interior Design
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-xs uppercase tracking-[0.2em] font-medium py-1 transition-colors duration-300 ${
                    isActive
                      ? 'text-[#c5a880]'
                      : 'text-stone-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Auth / User Status + Call + Get a Quote */}
          <div className="hidden lg:flex items-center gap-5">
            {isAuthenticated ? (
              <div className="flex items-center gap-4 border-r border-white/10 pr-4">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#c5a880] hover:text-[#d4b58b] bg-[#c5a880]/10 px-2.5 py-1 border border-[#c5a880]/30"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-stone-300">
                    <User className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span className="truncate max-w-[120px]">{user?.name}</span>
                  </span>
                )}

                <button
                  onClick={logout}
                  title="Logout"
                  className="text-stone-400 hover:text-red-400 p-1 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs uppercase tracking-wider text-stone-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
            )}

            <a
              href={businessInfo.telUrl}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-300 hover:text-[#c5a880] transition-colors duration-300"
              title={`Call ${businessInfo.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>{businessInfo.phone}</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#c5a880] hover:bg-[#d4b58b] text-[#0f0f11] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 transition-all duration-300 shadow-md shadow-[#c5a880]/15 hover:shadow-[#c5a880]/25"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-200 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#141417]/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-4">
              {isAuthenticated && (
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white">
                    <User className="w-4 h-4 text-[#c5a880]" />
                    <span>Signed in as <strong>{user?.name}</strong></span>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[10px] uppercase tracking-wider text-[#c5a880] bg-[#c5a880]/10 px-2 py-0.5 border border-[#c5a880]/30"
                    >
                      Admin Console
                    </Link>
                  )}
                </div>
              )}

              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base uppercase tracking-wider py-2 font-medium border-b border-white/5 transition-colors ${
                      isActive ? 'text-[#c5a880] pl-2' : 'text-stone-300 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider text-red-300 bg-red-500/10 border border-red-500/20"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider text-white bg-white/5 border border-white/10"
                  >
                    <span>Client Portal Sign In</span>
                  </Link>
                )}

                <a
                  href={businessInfo.telUrl}
                  className="flex items-center justify-center gap-2.5 py-3 text-xs uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:border-[#c5a880]"
                >
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  <span>Call {businessInfo.phone}</span>
                </a>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-[#c5a880] text-[#0f0f11] text-xs font-semibold uppercase tracking-wider"
                >
                  <span>Get Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
