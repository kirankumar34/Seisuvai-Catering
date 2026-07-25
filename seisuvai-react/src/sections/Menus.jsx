import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, useMenuStore } from '../store/useStore';
import StandardMenu from '../components/menu/StandardMenu';
import CustomMenu from '../components/menu/CustomMenu';
import LiveCounters from '../components/menu/LiveCounters';

const TABS = [
  { id: 'standard', label: 'Standard Menus', icon: '🍽️' },
  { id: 'custom', label: 'Custom Menu Selector', icon: '✨' },
  { id: 'live', label: 'Live Food Counters', icon: '🔥' }
];

export default function Menus() {
  const { isDark } = useThemeStore();
  const { clearItems } = useMenuStore();
  const [activeTab, setActiveTab] = useState('standard');

  // Clear selections when switching tabs to avoid conflicting data types in WhatsApp msg
  useEffect(() => {
    clearItems();
  }, [activeTab, clearItems]);

  return (
    <section
      id="menus"
      className="section-pad"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0a0a0a 0%, #0e0e0e 100%)'
          : 'linear-gradient(180deg, #f8f4ec 0%, #fdf8f0 100%)',
      }}
    >
      <div className="container-luxury">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Our Offerings</span>
          <h2
            className="font-luxury font-bold mt-4 mb-4"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: isDark ? '#f0ead8' : '#1a1a1a',
              lineHeight: 1.1,
            }}
          >
            Explore our{' '}
            <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Menus</span>
          </h2>
          <p
            className="text-body max-w-2xl mx-auto"
            style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}
          >
            From authentic South Indian banana leaf packages to interactive live counters, select what you love and enquire for a custom quote.
          </p>
        </motion.div>

        {/* ── Tab Bar ── */}
        {/* Full-bleed scroll container: negative mx so the pill tracks to viewport edges on mobile */}
        <div className="mb-14 overflow-x-auto hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 sm:flex sm:justify-center">
          <div
            className="inline-flex p-1.5 gap-1.5 rounded-2xl"
            style={{
              background: isDark ? 'rgba(26,26,26,0.9)' : 'rgba(255,255,255,0.9)',
              border: `1px solid ${isDark ? 'rgba(200,162,75,0.15)' : 'rgba(200,162,75,0.2)'}`,
              backdropFilter: 'blur(16px)',
              boxShadow: isDark ? '0 4px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 outline-none cursor-pointer"
                  style={{
                    color: isActive ? '#0a0a0a' : isDark ? 'rgba(200,180,140,0.6)' : 'rgba(100,80,50,0.6)',
                    minHeight: '48px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, #c8a24b 0%, #e6c878 50%, #c8a24b 100%)',
                        backgroundSize: '200% 100%',
                        boxShadow: '0 4px 20px rgba(200,162,75,0.4)',
                      }}
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 text-base">{tab.icon}</span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'standard' && <StandardMenu key="standard" />}
            {activeTab === 'custom' && <CustomMenu key="custom" />}
            {activeTab === 'live' && <LiveCounters key="live" />}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
