import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ShoppingCart, ChevronRight, Flame } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../../store/useStore';
import { LIVE_COUNTERS_DATA } from '../../data/siteData';

export default function LiveCounters() {
  const { isDark } = useThemeStore();
  const { selectedItems, toggleItem, openEnquiry } = useMenuStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="font-luxury font-bold mb-3"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
        >
          Interactive <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Live Counters</span>
        </h2>
        <p className="text-body max-w-2xl mx-auto" style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}>
          Delight your guests with freshly prepared delicacies right before their eyes.
        </p>
      </div>

      {/* Counter cards — responsive grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {LIVE_COUNTERS_DATA.map((counter) => {
          const isSelected = selectedItems.some(i => i.id === counter.id);

          return (
            <motion.article
              layout
              key={counter.id}
              whileHover={{ y: -6 }}
              onClick={() => toggleItem({ ...counter, price: 'To be discussed' })}
              className="relative cursor-pointer p-5 rounded-2xl flex flex-col h-full transition-all duration-300"
              style={{
                border: isSelected
                  ? '2px solid #c8a24b'
                  : `1.5px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                background: isSelected
                  ? isDark ? 'rgba(200,162,75,0.08)' : 'rgba(200,162,75,0.04)'
                  : isDark ? '#1c1c1c' : '#fff',
                boxShadow: isSelected ? '0 8px 32px rgba(200,162,75,0.2)' : 'none',
              }}
            >
              {/* Header row */}
              <div className="flex justify-between items-start mb-4">
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl text-2xl"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(200,162,75,0.2), rgba(230,200,120,0.15))'
                      : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    border: isSelected ? '1px solid rgba(200,162,75,0.4)' : '1px solid transparent',
                  }}
                >
                  {counter.icon}
                </div>

                {/* Select/Deselect button */}
                <div
                  className="p-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: isSelected ? '#c8a24b' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  }}
                >
                  {isSelected
                    ? <Check size={18} className="text-black" />
                    : <Plus size={18} style={{ color: isDark ? 'rgba(200,180,140,0.6)' : 'rgba(120,90,50,0.6)' }} />
                  }
                </div>
              </div>

              {/* Name */}
              <h3
                className="font-luxury font-bold mb-2"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
              >
                {counter.name}
              </h3>

              {/* Description */}
              <p
                className="text-caption flex-grow leading-relaxed mb-4"
                style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}
              >
                {counter.description}
              </p>

              {/* Tag badge */}
              <div className="mt-auto">
                <span
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                    counter.tag === 'Veg'
                      ? isDark ? 'bg-green-500/15 text-green-400' : 'bg-green-100 text-green-700'
                      : counter.tag === 'Non-Veg'
                      ? isDark ? 'bg-red-500/15 text-red-400' : 'bg-red-100 text-red-700'
                      : isDark ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {counter.tag}
                </span>
              </div>

              {/* Selected indicator bar */}
              {isSelected && (
                <motion.div
                  layoutId={`selected-bar-${counter.id}`}
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                  style={{ background: 'linear-gradient(90deg, #c8a24b, #e6c878)' }}
                />
              )}
            </motion.article>
          );
        })}
      </div>

      {/* Selection summary */}
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="mt-10 p-5 rounded-2xl"
            style={{
              background: isDark ? 'rgba(26,26,26,0.9)' : 'rgba(255,255,255,0.95)',
              border: '1.5px solid rgba(200,162,75,0.35)',
              boxShadow: '0 8px 32px rgba(200,162,75,0.12)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div
                  className="font-bold text-base mb-2 flex items-center gap-2"
                  style={{ color: isDark ? '#f0ead8' : '#1a1a1a' }}
                >
                  <Flame size={16} style={{ color: '#c8a24b' }} />
                  {selectedItems.length} live counter{selectedItems.length > 1 ? 's' : ''} added
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((item) => (
                    <span
                      key={item.id}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: isDark ? 'rgba(200,162,75,0.15)' : 'rgba(200,162,75,0.1)',
                        color: isDark ? '#e6c878' : '#a8852e',
                        border: '1px solid rgba(200,162,75,0.3)',
                      }}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openEnquiry({ menuType: 'Live Counters' })}
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 font-bold rounded-xl text-black cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #c8a24b, #e6c878)',
                  boxShadow: '0 4px 24px rgba(200,162,75,0.4)',
                  minHeight: '52px',
                }}
              >
                Proceed to Enquiry
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
