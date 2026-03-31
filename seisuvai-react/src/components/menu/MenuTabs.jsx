import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, useMenuStore } from '../../store/useStore';
import StandardMenu from './StandardMenu';
import CustomMenu from './CustomMenu';
import LiveCounters from './LiveCounters';

const TABS = [
  { id: 'standard', label: 'Standard Menu', icon: '🍽️' },
  { id: 'custom', label: 'Custom Menu', icon: '✨' },
  { id: 'live', label: 'Live Counters', icon: '🔥' }
];

export default function MenuTabs() {
  const { isDark } = useThemeStore();
  const { clearItems } = useMenuStore();
  const [activeTab, setActiveTab] = useState('standard');

  // Clear selections when switching tabs to avoid conflicting data types in WhatsApp msg
  useEffect(() => {
    clearItems();
  }, [activeTab, clearItems]);

  return (
    <section id="menu" className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-orange-50/40'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            Masterpieces
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Explore our <span className="gradient-text">Menu</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            From classic combinations to fully customized extravaganzas, build the perfect feast for your guests.
          </p>
        </motion.div>

        {/* Tabs Desktop & Mobile */}
        <div className="flex justify-center mb-16 overflow-x-auto hide-scrollbar">
          <div className={`flex w-max sm:w-auto p-1.5 gap-2 rounded-2xl shadow-sm border ${
            isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
          }`}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 outline-none ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 text-lg">{tab.icon}</span>
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
