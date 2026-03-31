import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/useStore';
import { GALLERY_IMAGES, COMPANY } from '../data/siteData';

export default function Gallery() {
  const { isDark } = useThemeStore();
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            Our Work In Action
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Events We've <span className="gradient-text">Catered</span>
          </h2>
          <p className={`text-base max-w-lg mx-auto text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            A glimpse into the beautiful events and memorable meals we've delivered across Chennai.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              onClick={() => setLightbox(img)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                img.large ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover gallery-img"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-end">
                <div className="w-full p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white font-semibold text-sm drop-shadow">{img.label}</span>
                </div>
              </div>

              {/* Magnify icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm">
                🔍
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href={COMPANY.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all hover:scale-105 ${
              isDark
                ? 'border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-400'
                : 'border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-600'
            }`}
          >
            📸 Follow us on Instagram for More
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] modal-backdrop flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src={lightbox.src} alt={lightbox.alt} className="w-full object-contain max-h-[80vh]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold">{lightbox.label}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-black/70"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
