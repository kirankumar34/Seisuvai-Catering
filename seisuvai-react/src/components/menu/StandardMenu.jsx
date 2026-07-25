import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, useMenuStore } from '../../store/useStore';
import { STANDARD_MENUS } from '../../data/siteData';
import MenuDetailModal from './MenuDetailModal';
import DietaryToggle, { MobileDietaryToggle } from './DietaryToggle';

const MealSection = ({ mealType, packages, isDark, onViewDetails, mobileFilter, isMobileView }) => {
  const { openEnquiry } = useMenuStore();
  const [desktopFilterType, setDesktopFilterType] = useState('All'); // 'All', 'Veg', 'Non-Veg'

  const effectiveFilter = isMobileView ? mobileFilter : desktopFilterType;
  const filteredPackages = packages.filter(
    (pkg) => effectiveFilter === 'All' || pkg.type === effectiveFilter
  );

  // On mobile view, if there are no packages matching the filter (e.g. Non-Veg Breakfast), hide section
  if (isMobileView && filteredPackages.length === 0) {
    return null;
  }

  return (
    <div className="mb-14">
      {/* Meal type header + desktop filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3
          className="font-luxury font-bold"
          style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.875rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
        >
          {mealType}
        </h3>

        {/* Unique Desktop Dietary Toggle (Hidden on mobile) */}
        {!isMobileView && (
          <div className="hidden sm:block">
            <DietaryToggle
              value={desktopFilterType}
              onChange={setDesktopFilterType}
              isDark={isDark}
              layoutGroup={mealType.replace(/\s+/g, '-').toLowerCase()}
            />
          </div>
        )}
      </div>

      {/* Package cards grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPackages.map((pkg) => (
            <motion.article
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={pkg.id}
              className="relative overflow-hidden rounded-2xl p-6 flex flex-col transition-all duration-300"
              style={{
                background: isDark ? '#1c1c1c' : '#fff',
                border: pkg.popular
                  ? '2px solid #c8a24b'
                  : `1.5px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                boxShadow: pkg.popular
                  ? isDark ? '0 8px 40px rgba(200,162,75,0.12)' : '0 8px 40px rgba(200,162,75,0.15)'
                  : 'none',
              }}
            >
              {/* Popular ribbon */}
              {pkg.popular && (
                <div
                  className="absolute top-0 right-0 text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-wider text-black"
                  style={{ background: 'linear-gradient(135deg, #c8a24b, #e6c878)' }}
                >
                  ⭐ Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-4">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold mb-3 ${
                    pkg.type === 'Veg'
                      ? isDark ? 'bg-green-500/15 text-green-400' : 'bg-green-100 text-green-700'
                      : isDark ? 'bg-red-500/15 text-red-400' : 'bg-red-100 text-red-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${pkg.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                  {pkg.type}
                </div>
                <h4
                  className="font-luxury font-bold"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
                >
                  {pkg.name}
                </h4>
              </div>

              {/* Item list */}
              <div
                className="flex-grow border-t border-dashed my-4 pt-4"
                style={{ borderColor: isDark ? 'rgba(200,162,75,0.15)' : 'rgba(200,162,75,0.2)' }}
              >
                <ul className="grid grid-cols-2 gap-y-2 gap-x-3">
                  {pkg.items.slice(0, 6).map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm flex items-center gap-2"
                      style={{ color: isDark ? 'rgba(220,200,160,0.8)' : 'rgba(80,60,40,0.75)' }}
                    >
                      <span style={{ color: '#c8a24b', fontSize: '8px' }}>◆</span>
                      {item}
                    </li>
                  ))}
                  {pkg.items.length > 6 && (
                    <li
                      className="text-sm font-semibold italic"
                      style={{ color: isDark ? 'rgba(200,162,75,0.7)' : 'rgba(168,133,46,0.8)' }}
                    >
                      + {pkg.items.length - 6} more dishes…
                    </li>
                  )}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewDetails(pkg)}
                  className="py-3 font-bold rounded-xl border text-sm transition-all focus:outline-none cursor-pointer"
                  style={{
                    color: '#c8a24b',
                    borderColor: 'rgba(200,162,75,0.4)',
                    background: 'transparent',
                    minHeight: '48px',
                  }}
                >
                  View Full Menu
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openEnquiry({ menuType: 'Standard', selectedPackage: pkg })}
                  className="py-3 font-bold rounded-xl text-sm cursor-pointer text-black"
                  style={{
                    background: 'linear-gradient(135deg, #c8a24b 0%, #e6c878 50%, #c8a24b 100%)',
                    backgroundSize: '200% 100%',
                    boxShadow: '0 4px 16px rgba(200,162,75,0.3)',
                    minHeight: '48px',
                    transition: 'background-position 0.4s ease, box-shadow 0.2s ease',
                  }}
                >
                  Select Menu
                </motion.button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(max-width: 639px)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(max-width: 639px)');
    const listener = (e) => setIsMobile(e.matches);
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else if (media.addListener) {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, []);

  return isMobile;
}

export default function StandardMenu() {
  const { isDark } = useThemeStore();
  const { openEnquiry, mobileDietaryFilter, setMobileDietaryFilter } = useMenuStore();
  const isMobile = useIsMobile();
  const mealTypes = Object.keys(STANDARD_MENUS);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMenu(null);
    setIsModalOpen(false);
  };

  const handleSelectMenu = (menu) => {
    openEnquiry({ menuType: 'Standard', selectedPackage: menu });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2
          className="font-luxury font-bold mb-3"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
        >
          Curated <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Standard Menus</span>
        </h2>
        <p
          className="text-body max-w-2xl mx-auto"
          style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}
        >
          Choose from our pre-designed authentic packages crafted perfectly for various occasions and budgets.
        </p>
      </div>

      {/* Sticky Mobile Filter Bar (Mobile view only) */}
      {isMobile && (
        <div
          className="sticky top-[60px] z-30 py-3 mb-8 transition-all duration-300"
          style={{
            background: isDark
              ? 'rgba(10, 10, 10, 0.85)'
              : 'rgba(253, 248, 240, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <MobileDietaryToggle
            value={mobileDietaryFilter}
            onChange={setMobileDietaryFilter}
            isDark={isDark}
          />
        </div>
      )}

      {/* Render Meal Sections */}
      {isMobile ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={mobileDietaryFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {mealTypes.map((mealType) => (
              <MealSection
                key={mealType}
                mealType={mealType}
                packages={STANDARD_MENUS[mealType]}
                isDark={isDark}
                onViewDetails={handleOpenModal}
                mobileFilter={mobileDietaryFilter}
                isMobileView={true}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div>
          {mealTypes.map((mealType) => (
            <MealSection
              key={mealType}
              mealType={mealType}
              packages={STANDARD_MENUS[mealType]}
              isDark={isDark}
              onViewDetails={handleOpenModal}
              isMobileView={false}
            />
          ))}
        </div>
      )}

      <MenuDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        menu={selectedMenu}
        onSelect={handleSelectMenu}
      />
    </motion.div>
  );
}
