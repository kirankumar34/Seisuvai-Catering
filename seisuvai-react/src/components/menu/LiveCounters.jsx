import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, ShoppingCart } from 'lucide-react';
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
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
           Interactive <span className="gradient-text">Live Counters</span>
        </h2>
        <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-2xl mx-auto`}>
          Delight your guests with freshly prepared delicacies right before their eyes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LIVE_COUNTERS_DATA.map((counter) => {
          const isSelected = selectedItems.some(i => i.id === counter.id);
          
          return (
            <motion.div
              layout
              key={counter.id}
              whileHover={{ y: -5 }}
              onClick={() => toggleItem({ ...counter, price: 'To be discussed' })}
              className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full ${
                isSelected 
                  ? 'border-orange-500 bg-orange-50 dark:bg-gray-800 shadow-xl shadow-orange-500/10' 
                  : isDark ? 'border-gray-700 bg-gray-800 hover:border-gray-600' : 'border-gray-100 bg-white hover:border-orange-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl text-2xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-gray-700 dark:to-gray-600 shadow-inner">
                  {counter.icon}
                </div>
                
                <div className={`p-1.5 rounded-full transition-colors ${
                  isSelected ? 'bg-orange-500 text-white' : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}>
                  {isSelected ? <Check size={18} /> : <Plus size={18} />}
                </div>
              </div>

              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {counter.name}
              </h3>
              
              <p className={`text-sm flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {counter.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                  counter.tag === 'Veg' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 
                  counter.tag === 'Non-Veg' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 
                  'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
                }`}>
                  {counter.tag}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

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
                  {selectedItems.length} live counter{selectedItems.length > 1 ? 's' : ''} added
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
                onClick={() => openEnquiry({ menuType: 'Live Counters' })}
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
