import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../../store/useStore';
import { MENU_CATEGORIES } from '../../data/siteData';

function TagBadge({ tag }) {
  return (
    <span
      className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
    <motion.div
      layout
      whileHover={{ y: -4 }}
      onClick={() => toggleItem(item)}
      className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
        isSelected
          ? 'border-orange-500 shadow-lg shadow-orange-500/20'
          : isDark
          ? 'border-gray-700 hover:border-gray-500'
          : 'border-gray-100 hover:border-orange-200'
      } ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <TagBadge tag={item.tag} />

        {/* Selected overlay */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-orange-500/30 flex items-center justify-center"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Check size={20} className="text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="p-3">
        <h4 className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {item.name}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-orange-500 text-xs font-bold">{item.price}</span>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected ? 'bg-orange-500' : isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            {isSelected ? (
              <Minus size={12} className="text-white" />
            ) : (
              <Plus size={12} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CustomMenu() {
  const { isDark } = useThemeStore();
  const { selectedItems, openEnquiry } = useMenuStore();
  const [activeCategory, setActiveCategory] = useState('starters');

  const currentCategory = MENU_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-10">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
           Build Your <span className="gradient-text">Custom Menu</span>
        </h2>
        <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-2xl mx-auto`}>
          Select precisely what you want from our massive spread. Mix and match to build your perfect feast.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {MENU_CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : isDark
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 shadow-sm'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Items grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
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
            className={`mt-10 p-6 rounded-2xl border ${
              isDark
                ? 'bg-gray-800/80 border-orange-500/30'
                : 'bg-white border-orange-200 shadow-lg shadow-orange-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className={`font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <ShoppingCart size={16} className="inline mr-2 text-orange-500" />
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((item) => (
                    <span
                      key={item.id}
                      className="px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300 text-xs font-medium"
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
                className="flex-shrink-0 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30"
              >
                Proceed to Enquiry 📩
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
