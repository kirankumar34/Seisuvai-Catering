import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import { useThemeStore } from '../store/useStore';
import { TESTIMONIALS } from '../data/siteData';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

const avatarGradients = [
  'linear-gradient(135deg, #f97316, #ec4899)',
  'linear-gradient(135deg, #8b5cf6, #6366f1)',
  'linear-gradient(135deg, #10b981, #14b8a6)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #f97316)',
  'linear-gradient(135deg, #ec4899, #a855f7)',
];

export default function Testimonials() {
  const { isDark } = useThemeStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="testimonials"
      className="section-pad"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)'
          : 'linear-gradient(180deg, #fff 0%, #fdf8f0 100%)',
      }}
    >
      <div className="container-luxury">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label">Testimonials</span>
          <h2
            className="font-luxury font-bold mt-4 mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: isDark ? '#f0ead8' : '#1a1a1a',
              lineHeight: 1.1,
            }}
          >
            Real Stories,{' '}
            <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Real Celebrations</span>
          </h2>
          <p
            className="text-body max-w-lg mx-auto"
            style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}
          >
            Hear from the families and businesses in Chennai we've had the privilege to serve.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative flex flex-col p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: t.featured
                  ? isDark ? 'rgba(200,162,75,0.06)' : 'rgba(200,162,75,0.04)'
                  : isDark ? '#1c1c1c' : '#fff',
                border: t.featured
                  ? '1.5px solid rgba(200,162,75,0.4)'
                  : `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                boxShadow: t.featured
                  ? '0 8px 40px rgba(200,162,75,0.12)'
                  : 'none',
              }}
            >
              {/* Featured badge */}
              {t.featured && (
                <div
                  className="absolute -top-3 left-5 px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider text-black"
                  style={{ background: 'linear-gradient(135deg, #c8a24b, #e6c878)' }}
                >
                  ⭐ Featured Review
                </div>
              )}

              {/* Gold quote mark */}
              <div
                className="font-luxury text-5xl leading-none mb-2"
                style={{ color: '#c8a24b', opacity: 0.6 }}
              >
                "
              </div>

              <StarRating rating={t.rating} />

              <p
                className="text-caption leading-relaxed my-4 flex-grow"
                style={{ color: isDark ? 'rgba(200,180,140,0.8)' : 'rgba(80,60,40,0.75)' }}
              >
                {t.text}
              </p>

              {/* Author */}
              <div
                className="flex items-center gap-3 mt-auto pt-4"
                style={{ borderTop: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.12)'}` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{
                    background: avatarGradients[i % avatarGradients.length],
                    border: '2px solid rgba(200,162,75,0.3)',
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: isDark ? '#f0ead8' : '#1a1a1a' }}>
                    {t.name}
                  </div>
                  <div className="text-[11px]" style={{ color: isDark ? 'rgba(200,162,75,0.6)' : 'rgba(168,133,46,0.7)' }}>
                    {t.event}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl"
            style={{
              background: isDark ? 'rgba(26,26,26,0.9)' : 'rgba(255,255,255,0.9)',
              border: `1px solid ${isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)'}`,
              boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              width="28"
              height="28"
            />
            <div>
              <div className="font-bold text-sm" style={{ color: isDark ? '#f0ead8' : '#1a1a1a' }}>
                4.9 ★ on Google Reviews
              </div>
              <div
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: isDark ? 'rgba(200,162,75,0.6)' : 'rgba(168,133,46,0.7)' }}
              >
                Based on 100+ verified ratings
              </div>
            </div>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
