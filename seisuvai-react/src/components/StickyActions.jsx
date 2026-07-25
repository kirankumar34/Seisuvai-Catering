import { motion } from 'framer-motion';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { COMPANY } from '../data/siteData';
import { quickWhatsApp } from '../utils/whatsapp';

export default function StickyActions() {
  const { isDark } = useThemeStore();
  const { openEnquiry } = useMenuStore();

  return (
    <>
      {/* ── WhatsApp FAB — desktop only (sm+) to avoid overlap with mobile bar ── */}
      <motion.button
        onClick={quickWhatsApp}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="hidden sm:flex fixed bottom-24 right-5 z-40 items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-white shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          boxShadow: '0 8px 32px rgba(37,211,102,0.45)',
          minHeight: '52px',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Chat on WhatsApp"
      >
        💬 Chat with us
      </motion.button>

      {/* ── Call FAB — desktop only (sm+) ── */}
      <motion.a
        href={`tel:${COMPANY.phoneRaw}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="hidden sm:flex fixed bottom-10 right-5 z-40 items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-white"
        style={{
          background: 'linear-gradient(135deg, #f97316, #c8a24b)',
          boxShadow: '0 8px 32px rgba(249,115,22,0.4)',
          minHeight: '52px',
          textDecoration: 'none',
          border: 'none',
        }}
        aria-label="Call us now"
      >
        📞 Call Now
      </motion.a>

      {/* ── Mobile Bottom Sticky Bar (below sm hidden on desktop) ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 sm:hidden"
        style={{
          background: isDark
            ? 'rgba(10,10,10,0.97)'
            : 'rgba(253,248,240,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(200,162,75,0.2)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Gold top accent line */}
        <div
          className="h-[1.5px] w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #c8a24b 30%, #e6c878 50%, #c8a24b 70%, transparent)' }}
        />

        <div className="grid grid-cols-3 gap-2 px-3 py-2.5">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl font-bold text-xs"
            style={{
              color: isDark ? '#e6c878' : '#a8852e',
              border: '1.5px solid rgba(200,162,75,0.3)',
              background: 'transparent',
              textDecoration: 'none',
              minHeight: '52px',
            }}
          >
            <span className="text-base">📞</span>
            <span>Call</span>
          </a>
          <button
            onClick={quickWhatsApp}
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl font-bold text-xs text-white"
            style={{
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              border: 'none',
              minHeight: '52px',
              cursor: 'pointer',
            }}
          >
            <span className="text-base">💬</span>
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => openEnquiry()}
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl font-bold text-xs text-black"
            style={{
              background: 'linear-gradient(135deg, #c8a24b, #e6c878)',
              border: 'none',
              minHeight: '52px',
              cursor: 'pointer',
            }}
          >
            <span className="text-base">📅</span>
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </>
  );
}
