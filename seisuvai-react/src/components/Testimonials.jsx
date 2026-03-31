import { useState, useRef } from 'react';
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

export default function Testimonials() {
  const { isDark } = useThemeStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Color palette for avatars
  const avatarColors = [
    'from-orange-400 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-green-400 to-teal-500',
    'from-blue-400 to-cyan-500',
    'from-amber-400 to-orange-500',
    'from-pink-400 to-fuchsia-500',
  ];

  return (
    <section
      id="testimonials"
      className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            What Our Clients Say
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Real Stories, <span className="gradient-text">Real Happiness</span>
          </h2>
          <p className={`text-base max-w-lg mx-auto text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Don't just take our word for it — hear from the families and businesses we've served.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                t.featured
                  ? isDark
                    ? 'bg-gradient-to-br from-orange-500/15 to-amber-500/10 border-orange-500/40'
                    : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200'
                  : isDark
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-orange-500 text-white text-[11px] font-bold rounded-full">
                  ⭐ Featured Review
                </div>
              )}

              {/* Quote */}
              <div className="text-3xl text-orange-300 mb-2 font-serif leading-none">"</div>

              <StarRating rating={t.rating} />

              <p className={`text-sm leading-relaxed my-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.event}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google rating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              width="28"
              height="28"
            />
            <div>
              <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>4.9 ★ on Google</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Based on 100+ verified reviews</div>
            </div>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-amber-400 fill-amber-400" />)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
