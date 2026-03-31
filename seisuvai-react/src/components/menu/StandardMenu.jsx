import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, useMenuStore } from '../../store/useStore';
import { STANDARD_MENUS } from '../../data/siteData';

const MealSection = ({ mealType, packages, isDark }) => {
  const { openEnquiry } = useMenuStore();
  const [filterType, setFilterType] = useState('All'); // 'All', 'Veg', 'Non-Veg'

  const filteredPackages = packages.filter(pkg => filterType === 'All' || pkg.type === filterType);

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{mealType}</h3>
        
        {/* Veg/Non-Veg Filter */}
        <div className={`inline-flex rounded-xl p-1 bg-white dark:bg-gray-800 shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
          {['All', 'Veg', 'Non-Veg'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filterType === type
                  ? type === 'Veg' ? 'bg-green-500 text-white shadow-md' : type === 'Non-Veg' ? 'bg-red-500 text-white shadow-md' : 'bg-orange-500 text-white shadow-md'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPackages.map((pkg) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={pkg.id}
              className={`relative overflow-hidden rounded-2xl border-2 p-6 flex flex-col transition-all duration-300 ${
                pkg.popular 
                  ? 'border-orange-500 shadow-xl shadow-orange-500/10' 
                  : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-orange-200'
              } ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold mb-3 ${
                    pkg.type === 'Veg' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${pkg.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {pkg.type}
                  </div>
                  <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {pkg.name}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-500">{pkg.price}</div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>per plate</div>
                </div>
              </div>

              <div className={`flex-grow border-t border-dashed my-4 pt-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className={`text-sm flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-orange-400 text-xs">●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openEnquiry({ menuType: 'Standard', selectedPackage: pkg })}
                className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-md hover:shadow-orange-500/30 transition-all"
              >
                Select Menu
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function StandardMenu() {
  const { isDark } = useThemeStore();
  const mealTypes = Object.keys(STANDARD_MENUS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
           Curated <span className="gradient-text">Standard Menus</span>
        </h2>
        <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-2xl mx-auto`}>
          Choose from our pre-designed authentic packages crafted perfectly for various occasions and budgets.
        </p>
      </div>

      {mealTypes.map(mealType => (
        <MealSection 
          key={mealType} 
          mealType={mealType} 
          packages={STANDARD_MENUS[mealType]} 
          isDark={isDark} 
        />
      ))}
    </motion.div>
  );
}
