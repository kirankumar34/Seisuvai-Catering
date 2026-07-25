import { motion } from 'framer-motion';

export default function HeroMobileVisual({ isDark }) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="relative w-full max-w-[280px] mx-auto py-2 my-4 pointer-events-none select-none">
      {/* Outer fire glow aura */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, #f97316 0%, #c8a24b 50%, transparent 80%)',
        }}
      />

      {/* 3D-styled animated handi card container */}
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="relative z-10 rounded-3xl p-4 text-center overflow-hidden"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(28,24,16,0.95), rgba(14,12,8,0.95))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(253,248,240,0.95))',
          border: '1.5px solid rgba(200, 162, 75, 0.35)',
          boxShadow: isDark
            ? '0 12px 36px rgba(0,0,0,0.6), inset 0 1px 1px rgba(250,230,170,0.2)'
            : '0 12px 36px rgba(200,162,75,0.25), inset 0 1px 1px rgba(255,255,255,0.8)',
        }}
      >
        {/* Steam rising animation */}
        {!prefersReducedMotion && (
          <div className="flex justify-center gap-3 mb-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -14, -24], opacity: [0, 0.9, 0], scale: [0.8, 1.2, 1.5] }}
                transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.45, ease: 'easeOut' }}
                className="text-xs font-bold"
                style={{ color: '#e6c878' }}
              >
                ♨️
              </motion.span>
            ))}
          </div>
        )}

        {/* Handi Cooking Image Showcase */}
        <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#c8a24b] via-[#ea580c] to-[#f0d68a] shadow-xl">
          <img
            src="/images/menu/nizam_mutton_biryani.png"
            alt="Traditional Steaming Handi Cooking"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => { e.target.src = '/images/menu/gallery-1-south-indian.png'; }}
          />
        </div>

        {/* Live Flame Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-black bg-gradient-to-r from-[#c8a24b] to-[#e6c878] shadow-md">
          <span>🔥</span>
          <span>Traditional Handi Feast</span>
        </div>
      </motion.div>
    </div>
  );
}
