import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { COMPANY } from '../data/siteData';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'menu', label: 'Menu' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { isDark, toggle } = useThemeStore();
  const { selectedItems, openEnquiry } = useMenuStore();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef(null);

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // Navbar background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-black/20'
              : 'bg-white/95 backdrop-blur-lg shadow-lg shadow-black/10'
            : isDark
            ? 'bg-gray-900/70 backdrop-blur-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-orange-500/30 group-hover:ring-orange-500 transition-all">
                <img src={COMPANY.logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight">
                <div className={`font-bold text-sm tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  SEISUVAI CATERING
                </div>
                <div className="text-[10px] text-orange-500 font-medium tracking-widest uppercase">
                  The Crafted Flavour
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {link.id === activeSection && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="h-0.5 w-full bg-orange-500 mt-0.5 rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Cart badge */}
              {selectedItems.length > 0 && (
                <motion.button
                  onClick={() => openEnquiry()}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold"
                >
                  🛒 {selectedItems.length} Selected
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                    {selectedItems.length}
                  </span>
                </motion.button>
              )}

              {/* Dark mode toggle */}
              <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'text-yellow-400 hover:bg-white/10'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* Book Now CTA */}
              <motion.button
                onClick={() => scrollTo('contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200"
              >
                📅 Book Now
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col shadow-2xl lg:hidden ${
                isDark ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <img src={COMPANY.logo} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>SEISUVAI</div>
                    <div className="text-orange-500 text-[9px] font-medium">THE CRAFTED FLAVOUR</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className={`p-1.5 rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      activeSection === link.id
                        ? 'bg-orange-500 text-white'
                        : isDark
                        ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  <Phone size={16} className="text-orange-500" />
                  {COMPANY.phone}
                </a>
                <button
                  onClick={() => { scrollTo('contact'); setMobileOpen(false); }}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl text-sm"
                >
                  📅 Book Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
