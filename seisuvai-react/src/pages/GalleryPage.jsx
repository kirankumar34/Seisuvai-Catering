import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useThemeStore } from '../store/useStore';
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../data/siteData';

export default function GalleryPage() {
  const { isDark } = useThemeStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const bg = isDark ? '#0a0a0a' : '#fdf8f0';
  const textPrimary = isDark ? 'rgba(253,248,240,0.95)' : '#1a0f00';
  const textMuted = isDark ? 'rgba(200,180,140,0.6)' : 'rgba(80,60,20,0.65)';

  const filtered = activeFilter === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeFilter);

  const handlePrev = () => setLightboxIndex(i => (i === 0 ? filtered.length - 1 : i - 1));
  const handleNext = () => setLightboxIndex(i => (i === filtered.length - 1 ? 0 : i + 1));

  return (
    <div style={{ background: bg, paddingTop: '80px', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="container-luxury pt-8 pb-2">
        <nav className="flex items-center gap-2 text-xs" style={{ color: textMuted }}>
          <Link to="/" style={{ color: '#c8a24b', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span>Gallery</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container-luxury py-10 text-center">
        <div className="label-badge mb-4">Photo Gallery</div>
        <h1 className="heading-section mb-4" style={{ color: textPrimary }}>
          Events we have catered
        </h1>
        <p className="text-base sm:text-lg mx-auto" style={{ color: textMuted, maxWidth: '520px' }}>
          A look at the setups and spreads from weddings, corporate events, birthdays, and more that we have catered across Chennai.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="container-luxury mb-8">
        <div className="overflow-x-auto hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center">
            {GALLERY_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className="px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 cursor-pointer transition-all duration-200"
                style={{
                  whiteSpace: 'nowrap',
                  ...(activeFilter === f.value
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
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="container-luxury pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl"
                onClick={() => setLightboxIndex(i)}
                style={{
                  border: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ aspectRatio: img.large ? '4/3' : '1/1' }}
                  onError={e => { e.target.src = '/images/gallery-1-south-indian.png'; }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}
                >
                  <p className="px-4 pb-4 text-white font-semibold text-sm">{img.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: textMuted }}>No photos in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <X size={20} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filtered[lightboxIndex]?.src}
              alt={filtered[lightboxIndex]?.alt}
              className="max-w-full max-h-full object-contain rounded-xl"
              style={{ maxHeight: '85vh', maxWidth: '90vw' }}
              onClick={e => e.stopPropagation()}
            />
            {/* Prev / Next */}
            <button
              onClick={e => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              ‹
            </button>
            <button
              onClick={e => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              ›
            </button>
            <p className="absolute bottom-5 text-white/60 text-sm">
              {filtered[lightboxIndex]?.label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
