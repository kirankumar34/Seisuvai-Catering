import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Phone, ShoppingCart, Calendar, X } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { COMPANY } from '../data/siteData';

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/menus', label: 'Menus' },
  { to: '/custom-menu', label: 'Custom Menu' },
  { to: '/live-counters', label: 'Live Counters' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { isDark, toggle } = useThemeStore();
  const { selectedItems, openEnquiry } = useMenuStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (link) =>
    link.exact ? pathname === link.to : pathname.startsWith(link.to);

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

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Main Navbar ─── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-[#c8a24b]/10'
              : 'shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-[#c8a24b]/15'
            : ''
        }`}
        style={{
          background: scrolled
            ? isDark
              ? 'rgba(10, 10, 10, 0.92)'
              : 'rgba(253, 248, 240, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Gold top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, #c8a24b 30%, #e6c878 50%, #c8a24b 70%, transparent)' }}
        />

        <div className="container-luxury">
          <div
            className="flex items-center justify-between"
            style={{ height: scrolled ? '60px' : '72px', transition: 'height 0.4s ease' }}
          >
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div
                className="rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(200,162,75,0.4)]"
                style={{
                  width: scrolled ? '36px' : '42px',
                  height: scrolled ? '36px' : '42px',
                  transition: 'all 0.4s ease',
                  border: '1.5px solid rgba(200, 162, 75, 0.3)',
                }}
              >
                <img src={COMPANY.logo} alt="Seisuvai Logo" className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight">
                <div
                  className={`font-bold tracking-widest uppercase transition-all duration-400 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontSize: scrolled ? '0.75rem' : '0.8125rem', transition: 'font-size 0.4s ease' }}
                >
                  SEISUVAI CATERING
                </div>
                <div
                  className="font-medium tracking-[0.2em] uppercase"
                  style={{ color: '#c8a24b', fontSize: '0.625rem' }}
                >
                  The Crafted Flavour
                </div>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      active
                        ? ''
                        : isDark
                        ? 'text-gray-300 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                    }`}
                    style={{ color: active ? '#c8a24b' : undefined }}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, #c8a24b, #e6c878)' }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-2">
              {/* Cart badge */}
              {selectedItems.length > 0 && (
                <motion.button
                  onClick={() => openEnquiry()}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-black"
                  style={{ background: 'linear-gradient(135deg, #c8a24b, #e6c878)' }}
                >
                  <ShoppingCart size={12} />
                  {selectedItems.length} Selected
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {selectedItems.length}
                  </span>
                </motion.button>
              )}

              {/* Dark mode toggle */}
              <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-xl transition-colors ${
                  isDark ? 'text-amber-400 hover:bg-white/10' : 'text-gray-500 hover:bg-black/5'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* Enquire Now CTA — Desktop */}
              <motion.button
                onClick={() => openEnquiry()}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-black rounded-xl btn-gold"
              >
                <Calendar size={15} />
                Enquire Now
              </motion.button>

              {/* ── Animated Hamburger — Mobile ── */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors ${
                  isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
                }`}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block h-[2px] w-5 rounded-full"
                  style={{ background: mobileOpen ? '#c8a24b' : (isDark ? 'white' : '#1a1a1a') }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-[2px] w-5 rounded-full"
                  style={{ background: isDark ? 'white' : '#1a1a1a' }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block h-[2px] w-5 rounded-full"
                  style={{ background: mobileOpen ? '#c8a24b' : (isDark ? 'white' : '#1a1a1a') }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 modal-backdrop lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col lg:hidden"
              style={{
                width: 'min(85vw, 320px)',
                background: isDark
                  ? 'linear-gradient(180deg, #0e0e0e 0%, #111111 100%)'
                  : 'linear-gradient(180deg, #fdf8f0 0%, #f8f4ec 100%)',
                borderLeft: '1px solid rgba(200, 162, 75, 0.2)',
                boxShadow: '-8px 0 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Gold top accent */}
              <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #c8a24b, #e6c878)' }} />

              {/* Drawer Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(200, 162, 75, 0.15)' }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={COMPANY.logo}
                    alt="Logo"
                    className="w-9 h-9 rounded-lg object-cover"
                    style={{ border: '1.5px solid rgba(200,162,75,0.3)' }}
                  />
                  <div>
                    <div className={`font-bold text-xs tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>SEISUVAI</div>
                    <div className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: '#c8a24b' }}>
                      The Crafted Flavour
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className={`p-2 rounded-xl transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'}`}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link);
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={link.to}
                        className={`block w-full px-4 py-3.5 rounded-xl font-medium transition-all duration-200 text-base ${
                          active
                            ? 'text-black font-bold'
                            : isDark
                            ? 'text-gray-300 hover:text-white hover:bg-white/8'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-black/5'
                        }`}
                        style={active ? { background: 'linear-gradient(135deg, #c8a24b, #e6c878)' } : {}}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="gold-divider mx-4" />

              {/* Bottom CTA */}
              <div className="p-4 space-y-3 pb-6">
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold min-h-[52px] ${
                    isDark ? 'bg-white/5 text-gray-300' : 'bg-black/5 text-gray-700'
                  }`}
                >
                  <div className="p-1.5 rounded-lg" style={{ background: 'rgba(200,162,75,0.15)' }}>
                    <Phone size={15} style={{ color: '#c8a24b' }} />
                  </div>
                  {COMPANY.phone}
                </a>
                <button
                  onClick={() => { openEnquiry(); setMobileOpen(false); }}
                  className="w-full py-3.5 text-sm font-bold text-black rounded-xl btn-gold min-h-[52px]"
                >
                  📅 Enquire Now
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
