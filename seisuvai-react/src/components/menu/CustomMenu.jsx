import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, ShoppingCart, ChevronRight } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../../store/useStore';
import { CUSTOM_MENU_VEG_DATA, CUSTOM_MENU_NONVEG_DATA } from '../../data/siteData';

function TagBadge({ tag }) {
  return (
    <span
      className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold z-10 ${
        tag === 'Veg' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {tag === 'Veg' ? '🌿 Veg' : '🍖 Non-Veg'}
    </span>
  );
}

function MenuItemCard({ item, isDark }) {
  const { selectedItems, toggleItem } = useMenuStore();
  const isSelected = selectedItems.some((s) => s.id === item.id);

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      onClick={() => toggleItem(item)}
      className="relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        border: isSelected
          ? '2px solid #c8a24b'
          : `1.5px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
        background: isDark ? '#1c1c1c' : '#fff',
        boxShadow: isSelected ? '0 4px 24px rgba(200,162,75,0.25)' : 'none',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '130px' }}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="img-cover transition-transform duration-300"
          style={{ transition: 'transform 0.4s ease' }}
        />
        <TagBadge tag={item.tag} />

        {/* Selected overlay */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(200,162,75,0.3)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#c8a24b' }}
              >
                <Check size={20} className="text-black" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="p-3 flex items-center justify-between gap-2">
        <h4
          className="font-semibold text-sm leading-tight"
          style={{ color: isDark ? '#f0ead8' : '#1a1a1a', flex: 1 }}
        >
          {item.name}
        </h4>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background: isSelected ? '#c8a24b' : isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.12)',
          }}
        >
          {isSelected ? (
            <Minus size={12} className="text-black" />
          ) : (
            <Plus size={12} style={{ color: '#c8a24b' }} />
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function CustomMenu() {
  const { isDark } = useThemeStore();
  const { selectedItems, openEnquiry, clearItems } = useMenuStore();
  const [menuType, setMenuType] = useState('Veg'); // 'Veg', 'Non-Veg'

  const currentCategories = menuType === 'Veg' ? CUSTOM_MENU_VEG_DATA : CUSTOM_MENU_NONVEG_DATA;
  const [activeCategory, setActiveCategory] = useState(currentCategories[0]?.id || '');

  // Reset category and selections when switching Veg/Non-Veg
  useEffect(() => {
    setActiveCategory(currentCategories[0]?.id || '');
    clearItems();
  }, [menuType, clearItems, currentCategories]);

  const currentCategory = currentCategories.find((c) => c.id === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="font-luxury font-bold mb-3"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
        >
          Build Your <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Custom Menu</span>
        </h2>
        <p className="text-body max-w-2xl mx-auto" style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}>
          Select precisely what you want from our massive spread. Mix and match to build your perfect feast.
        </p>
      </div>

      {/* Veg/Non-Veg Type Tab Selector */}
      <div className="flex justify-center mb-8">
        <div
          className="inline-flex rounded-xl p-1 gap-1"
          style={{
            background: isDark ? 'rgba(26,26,26,0.9)' : 'rgba(255,255,255,0.9)',
            border: `1px solid ${isDark ? 'rgba(200,162,75,0.15)' : 'rgba(200,162,75,0.2)'}`,
          }}
        >
          {['Veg', 'Non-Veg'].map((type) => (
            <button
              key={type}
              onClick={() => setMenuType(type)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer"
              style={{
                minHeight: '44px',
                ...(menuType === type
                  ? {
                      background: type === 'Veg' ? '#16a34a' : '#dc2626',
                      color: '#fff',
                      boxShadow: `0 4px 16px ${type === 'Veg' ? 'rgba(22,163,74,0.35)' : 'rgba(220,38,38,0.35)'}`,
                    }
                  : { color: isDark ? 'rgba(200,180,140,0.6)' : 'rgba(100,80,50,0.6)' }),
              }}
            >
              {type === 'Veg' ? '🌿 Vegetarian' : '🍖 Non-Vegetarian'}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs — horizontal scroll strip */}
      <div className="overflow-x-auto hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 mb-8">
        <div className="flex gap-2.5 w-max sm:w-auto sm:flex-wrap sm:justify-center">
          {currentCategories.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer flex-shrink-0"
              style={{
                minHeight: '44px',
                whiteSpace: 'nowrap',
                ...(activeCategory === cat.id
                  ? {
                      background: 'linear-gradient(135deg, #c8a24b, #e6c878)',
                      color: '#0a0a0a',
                      boxShadow: '0 4px 16px rgba(200,162,75,0.35)',
                    }
                  : {
                      background: isDark ? 'rgba(26,26,26,0.9)' : 'rgba(255,255,255,0.9)',
                      color: isDark ? 'rgba(200,180,140,0.6)' : 'rgba(100,80,50,0.6)',
                      border: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                    }),
              }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Items grid — responsive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${menuType}_${activeCategory}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {currentCategory?.items.map((item) => (
            <MenuItemCard key={item.id} item={item} isDark={isDark} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Selected summary + enquiry button */}
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
                  <ShoppingCart size={16} style={{ color: '#c8a24b' }} />
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </div>
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto py-1 hide-scrollbar">
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
                onClick={() => openEnquiry({ menuType: 'Custom' })}
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
