import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';

export default function MenuDetailModal({ isOpen, onClose, menu, onSelect }) {
  const { isDark } = useThemeStore();

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!menu) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 md:p-10">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative w-full max-w-4xl flex flex-col overflow-hidden"
            style={{
              maxHeight: '90vh',
              borderRadius: '1.5rem',
              background: isDark ? '#111111' : '#fff',
              border: '1.5px solid rgba(200,162,75,0.25)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Gold top accent */}
            <div
              className="h-[2px] w-full flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, transparent, #c8a24b, #e6c878, #c8a24b, transparent)' }}
            />

            {/* Hero Image Header */}
            <div className="relative flex-shrink-0" style={{ height: 'clamp(160px, 25vw, 240px)' }}>
              <img
                src={menu.image || '/images/hero.png'}
                alt={menu.mainTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md text-white transition-all focus:outline-none"
                aria-label="Close modal"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(200,162,75,0.3)',
                }}
              >
                <X size={18} />
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: menu.type === 'Veg' ? '#16a34a' : '#dc2626', color: '#fff' }}
                  >
                    {menu.type === 'Veg' ? '🌿 Veg' : '🍖 Non-Veg'}
                  </span>
                </div>
                <h2
                  className="font-luxury font-bold text-white"
                  style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.1 }}
                >
                  {menu.mainTitle}
                </h2>
                <p className="text-sm mt-1" style={{ color: '#e6c878' }}>{menu.name}</p>
              </div>
            </div>

            {/* Scrollable content */}
            <div
              className="flex-grow overflow-y-auto p-5 sm:p-7"
              style={{ background: isDark ? 'rgba(14,12,6,0.5)' : 'rgba(253,248,240,0.5)' }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {menu.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl transition-all duration-200"
                    style={{
                      background: isDark ? 'rgba(26,24,16,0.8)' : 'rgba(255,255,255,0.9)',
                      border: `1px solid ${isDark ? 'rgba(200,162,75,0.12)' : 'rgba(200,162,75,0.18)'}`,
                    }}
                  >
                    <h3
                      className="text-sm font-bold mb-4 pb-2"
                      style={{
                        color: '#c8a24b',
                        borderBottom: '1px dashed rgba(200,162,75,0.25)',
                      }}
                    >
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-sm flex items-start gap-2.5"
                          style={{ color: isDark ? 'rgba(220,200,160,0.8)' : 'rgba(80,60,40,0.75)' }}
                        >
                          <span style={{ color: '#c8a24b', fontSize: '8px', marginTop: '5px', flexShrink: 0 }}>◆</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky footer CTA */}
            <div
              className="flex-shrink-0 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                background: isDark ? 'rgba(17,17,17,0.98)' : 'rgba(253,248,240,0.98)',
                borderTop: '1px solid rgba(200,162,75,0.15)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="text-center sm:text-left">
                <div
                  className="text-[10px] uppercase tracking-widest font-bold mb-0.5"
                  style={{ color: isDark ? 'rgba(200,162,75,0.5)' : 'rgba(168,133,46,0.6)' }}
                >
                  Quotation
                </div>
                <div
                  className="font-luxury font-bold"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#c8a24b' }}
                >
                  Custom quote on enquiry
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelect(menu);
                  onClose();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold rounded-xl text-black cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #c8a24b 0%, #e6c878 50%, #c8a24b 100%)',
                  backgroundSize: '200% 100%',
                  padding: '0.875rem 2rem',
                  minHeight: '52px',
                  fontSize: '0.9375rem',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(200,162,75,0.35)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Calendar size={18} />
                Book This Menu
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
