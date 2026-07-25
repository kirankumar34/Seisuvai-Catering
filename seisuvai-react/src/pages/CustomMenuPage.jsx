import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../store/useStore';
import {
  CUSTOM_MENU_VEG_BREAKFAST,
  CUSTOM_MENU_VEG_LUNCH,
  CUSTOM_MENU_NONVEG_LUNCH,
} from '../data/customMenuData';

const MENU_TYPES = [
  {
    id: 'breakfast',
    icon: '🌅',
    title: 'Veg Breakfast',
    subtitle: 'Idly, Dosa, Pongal, Vada, Chutneys, Beverages & more',
    tag: 'Veg',
    tagColor: '#16a34a',
    data: CUSTOM_MENU_VEG_BREAKFAST,
  },
  {
    id: 'veg-lunch',
    icon: '🍛',
    title: 'Veg Lunch & Dinner',
    subtitle: 'Rice, Biryani, Gravies, Poriyal, Payasam, Desserts & more',
    tag: 'Veg',
    tagColor: '#16a34a',
    data: CUSTOM_MENU_VEG_LUNCH,
  },
  {
    id: 'nonveg-lunch',
    icon: '🍗',
    title: 'Non-Veg Lunch & Dinner',
    subtitle: 'Chicken, Mutton, Fish, Biryani, Starters & more',
    tag: 'Non-Veg',
    tagColor: '#dc2626',
    data: CUSTOM_MENU_NONVEG_LUNCH,
  },
];

function MenuItemCard({ item, isDark, selected, onToggle }) {
  return (
    <motion.button
      onClick={() => onToggle(item)}
      whileTap={{ scale: 0.96 }}
      className="relative rounded-xl overflow-hidden text-left w-full cursor-pointer group"
      style={{
        background: isDark ? 'rgba(26,26,26,0.9)' : '#ffffff',
        border: `2px solid ${selected ? '#c8a24b' : isDark ? 'rgba(200,162,75,0.08)' : 'rgba(200,162,75,0.12)'}`,
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        boxShadow: selected ? '0 0 0 3px rgba(200,162,75,0.2)' : 'none',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '110px' }}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          onError={e => { e.target.src = '/images/menu/gallery-2.png'; }}
        />
        {/* Veg/NonVeg dot */}
        <span
          className="absolute top-2 left-2 w-4 h-4 rounded-sm border border-white/80 flex items-center justify-center"
          style={{ background: item.tag === 'Veg' ? '#fff' : '#fff' }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.tag === 'Veg' ? '#16a34a' : '#dc2626' }} />
        </span>
        {/* Selection overlay */}
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(200,162,75,0.25)' }}>
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #c8a24b, #e6c878)' }}>✓</span>
          </div>
        )}
      </div>
      {/* Name */}
      <div className="px-2.5 py-2.5">
        <p className="text-xs font-semibold leading-tight"
          style={{ color: isDark ? 'rgba(253,248,240,0.9)' : '#1a0f00' }}>
          {item.name}
        </p>
      </div>
    </motion.button>
  );
}

function MobileSelectedDrawer({ items, isDark, onRemove, onEnquire }) {
  const [expanded, setExpanded] = useState(false);
  if (items.length === 0) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden" style={{ paddingBottom: '68px' }}>
      <motion.div
        initial={false}
        animate={{ y: 0 }}
        className="rounded-t-2xl overflow-hidden shadow-2xl"
        style={{
          background: isDark ? '#111' : '#fdf8f0',
          border: '1px solid rgba(200,162,75,0.2)',
          borderBottom: 'none',
        }}
      >
        {/* Handle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-5 py-3.5 font-bold text-sm"
          style={{ color: '#c8a24b' }}
        >
          <span className="flex items-center gap-2">
            <ShoppingBag size={16} />
            My Selected Menu ({items.length} items)
          </span>
          {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-4 pb-4 max-h-48 overflow-y-auto space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm py-1"
                    style={{ color: isDark ? 'rgba(220,200,160,0.8)' : '#1a0f00' }}>
                    <span>• {item.name}</span>
                    <button onClick={() => onRemove(item.id)} className="text-red-400 ml-2">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={onEnquire}
                  className="w-full py-3 rounded-xl font-bold text-sm text-black btn-gold"
                >
                  📅 Enquire for this Menu
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function CustomMenuPage() {
  const { isDark } = useThemeStore();
  const { selectedItems, toggleItem, removeItem, openEnquiry, clearItems } = useMenuStore();
  const [menuTypeId, setMenuTypeId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const bg = isDark ? '#0a0a0a' : '#fdf8f0';
  const textPrimary = isDark ? 'rgba(253,248,240,0.95)' : '#1a0f00';
  const textMuted = isDark ? 'rgba(200,180,140,0.6)' : 'rgba(80,60,20,0.65)';

  const selectedMenuType = MENU_TYPES.find(m => m.id === menuTypeId);
  const categories = selectedMenuType?.data || [];
  const currentCat = categories.find(c => c.id === activeCategory) || categories[0];

  const handleTypeSelect = (id) => {
    setMenuTypeId(id);
    const type = MENU_TYPES.find(m => m.id === id);
    setActiveCategory(type?.data?.[0]?.id || null);
  };

  const handleEnquire = () => {
    openEnquiry({ menuType: 'Custom' });
  };

  return (
    <div style={{ background: bg, paddingTop: '80px', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="container-luxury pt-8 pb-2">
        <nav className="flex items-center gap-2 text-xs" style={{ color: textMuted }}>
          <Link to="/" style={{ color: '#c8a24b', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span>Custom Menu Builder</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container-luxury py-8 text-center">
        <div className="label-badge mb-4">Build Your Own Menu</div>
        <h1 className="heading-section mb-3" style={{ color: textPrimary }}>
          Pick exactly what you want
        </h1>
        <p className="text-base sm:text-lg mx-auto" style={{ color: textMuted, maxWidth: '560px' }}>
          Select the dishes you like, skip the ones you don't. We'll prepare your exact custom menu for the event.
        </p>
      </div>

      {/* Step 1 — Choose Menu Type */}
      {!menuTypeId && (
        <div className="container-luxury pb-20">
          <p className="text-center font-semibold mb-8" style={{ color: '#c8a24b' }}>
            Step 1 — Which type of menu are you building?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {MENU_TYPES.map((type, i) => (
              <motion.button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl p-6 text-left cursor-pointer"
                style={{
                  background: isDark ? 'rgba(26,26,26,0.9)' : '#ffffff',
                  border: '1.5px solid rgba(200,162,75,0.2)',
                  boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-base" style={{ color: textPrimary }}>{type.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: type.tagColor }}>{type.tag}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: textMuted }}>{type.subtitle}</p>
                <div className="mt-4 text-xs font-bold" style={{ color: '#c8a24b' }}>Select this →</div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Menu Builder */}
      {menuTypeId && (
        <div className="container-luxury pb-32 sm:pb-20">
          {/* Active type badge + change */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedMenuType?.icon}</span>
              <div>
                <div className="font-bold text-base" style={{ color: textPrimary }}>{selectedMenuType?.title}</div>
                <button
                  onClick={() => { setMenuTypeId(null); setActiveCategory(null); }}
                  className="text-xs underline"
                  style={{ color: '#c8a24b' }}
                >
                  Change menu type
                </button>
              </div>
            </div>
            {selectedItems.length > 0 && (
              <button onClick={clearItems} className="text-xs text-red-400 underline">Clear all</button>
            )}
          </div>

          <div className="flex gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Category pills — horizontal scroll */}
              <div className="overflow-x-auto hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 mb-6">
                <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold flex-shrink-0 cursor-pointer transition-all duration-200"
                      style={{
                        whiteSpace: 'nowrap',
                        minHeight: '40px',
                        ...(activeCategory === cat.id || (!activeCategory && cat.id === categories[0]?.id)
                          ? {
                              background: 'linear-gradient(135deg, #c8a24b, #e6c878)',
                              color: '#0a0a0a',
                              boxShadow: '0 4px 14px rgba(200,162,75,0.3)',
                            }
                          : {
                              background: isDark ? 'rgba(26,26,26,0.9)' : '#ffffff',
                              color: textMuted,
                              border: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                            }),
                      }}
                    >
                      <span>{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCat?.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
                >
                  {currentCat?.items.map(item => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      isDark={isDark}
                      selected={!!selectedItems.find(s => s.id === item.id)}
                      onToggle={toggleItem}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop sidebar — sticky selected menu */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div
                className="sticky top-24 rounded-2xl overflow-hidden"
                style={{
                  background: isDark ? 'rgba(20,16,8,0.95)' : '#ffffff',
                  border: '1.5px solid rgba(200,162,75,0.2)',
                  boxShadow: isDark ? '0 8px 40px rgba(0,0,0,0.4)' : '0 8px 40px rgba(0,0,0,0.08)',
                }}
              >
                {/* Sidebar header */}
                <div
                  className="px-5 py-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(200,162,75,0.15), rgba(230,200,120,0.08))',
                    borderBottom: '1px solid rgba(200,162,75,0.15)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={16} style={{ color: '#c8a24b' }} />
                    <span className="font-bold text-sm" style={{ color: '#c8a24b' }}>My Selected Menu</span>
                    {selectedItems.length > 0 && (
                      <span className="ml-auto w-6 h-6 rounded-full text-xs font-bold text-black flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #c8a24b, #e6c878)' }}>
                        {selectedItems.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Items list */}
                <div className="p-4 max-h-[400px] overflow-y-auto space-y-2">
                  {selectedItems.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-3xl mb-3">🍽️</div>
                      <p className="text-sm" style={{ color: textMuted }}>
                        Tap any dish to add it here
                      </p>
                    </div>
                  ) : (
                    selectedItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-1.5 px-2 rounded-lg text-sm"
                        style={{
                          background: isDark ? 'rgba(200,162,75,0.06)' : 'rgba(200,162,75,0.05)',
                        }}
                      >
                        <span style={{ color: isDark ? 'rgba(220,200,160,0.9)' : '#1a0f00' }}>
                          • {item.name}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-2 text-red-400 hover:text-red-500 flex-shrink-0"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Enquire button */}
                {selectedItems.length > 0 && (
                  <div className="p-4" style={{ borderTop: '1px solid rgba(200,162,75,0.12)' }}>
                    <button
                      onClick={handleEnquire}
                      className="w-full py-3 rounded-xl font-bold text-sm text-black btn-gold"
                      style={{ minHeight: '48px' }}
                    >
                      📅 Enquire for this Menu
                    </button>
                    <p className="text-[10px] text-center mt-2" style={{ color: textMuted }}>
                      We'll get back to you with a quote within 2 hours
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Selected Drawer */}
      <MobileSelectedDrawer
        items={selectedItems}
        isDark={isDark}
        onRemove={removeItem}
        onEnquire={handleEnquire}
      />
    </div>
  );
}
