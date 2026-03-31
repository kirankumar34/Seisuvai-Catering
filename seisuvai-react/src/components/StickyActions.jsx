import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/useStore';
import { COMPANY } from '../data/siteData';
import { quickWhatsApp } from '../utils/whatsapp';

export default function StickyActions() {
  const { isDark } = useThemeStore();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
  };

  return (
    <>
      {/* WhatsApp floating button */}
      <motion.button
        onClick={quickWhatsApp}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 right-5 z-40 flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl shadow-green-500/40 font-semibold text-sm transition-colors"
        aria-label="Chat on WhatsApp"
      >
        💬 <span className="hidden sm:inline">Chat with us</span>
      </motion.button>

      {/* Call floating button */}
      <motion.a
        href={`tel:${COMPANY.phoneRaw}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.7, type: 'spring' }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl shadow-orange-500/40 font-semibold text-sm transition-colors"
        aria-label="Call us now"
      >
        📞 <span className="hidden sm:inline">Call Now</span>
      </motion.a>

      {/* Bottom sticky bar on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden sticky-shadow">
        <div className={`flex items-center ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} px-4 py-3 gap-3`}>
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className={`flex-1 py-2.5 rounded-xl text-center text-sm font-bold border-2 transition-colors ${
              isDark
                ? 'border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400'
                : 'border-gray-200 text-gray-700'
            }`}
          >
            📞 Call
          </a>
          <button
            onClick={quickWhatsApp}
            className="flex-1 py-2.5 rounded-xl text-center text-sm font-bold bg-[#25D366] text-white"
          >
            💬 WhatsApp
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="flex-1 py-2.5 rounded-xl text-center text-sm font-bold bg-orange-500 text-white"
          >
            📅 Book
          </button>
        </div>
      </div>
    </>
  );
}
