import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { PRICING_PLANS } from '../data/siteData';

export default function Pricing() {
  const { isDark } = useThemeStore();
  const { openEnquiry } = useMenuStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="pricing" className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            Transparent Pricing
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Packages That Fit <span className="gradient-text">Every Budget</span>
          </h2>
          <p className={`text-base max-w-lg mx-auto text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Quality catering doesn't have to break the bank. Choose a plan or get a custom quote.
          </p>
        </motion.div>

        {/* Plans */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                plan.featured
                  ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/30 scale-105'
                  : isDark
                  ? 'bg-gray-800 border border-gray-700 hover:border-orange-500/40 hover:shadow-xl'
                  : 'bg-gray-50 border border-gray-200 hover:border-orange-300 hover:shadow-xl'
              }`}
            >
              {/* Most Popular badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                  ✨ {plan.badge}
                </div>
              )}

              {/* Icon */}
              <div className="text-4xl mb-4">{plan.icon}</div>

              {/* Plan name */}
              <h3 className={`text-xl font-bold mb-1 ${plan.featured ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-4xl font-extrabold ${plan.featured ? 'text-white' : 'text-orange-500'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.featured ? 'text-orange-100' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {plan.unit}
                </span>
              </div>

              <p className={`text-sm mb-8 ${plan.featured ? 'text-orange-100' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {plan.tagline}
              </p>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feat, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.featured ? 'bg-white/25' : 'bg-orange-100'
                    }`}>
                      <Check size={11} className={plan.featured ? 'text-white' : 'text-orange-500'} />
                    </div>
                    <span className={`text-sm ${plan.featured ? 'text-white/90' : isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openEnquiry()}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                  plan.featured
                    ? 'bg-white text-orange-500 hover:bg-orange-50'
                    : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20'
                }`}
              >
                {plan.id === 'royal' ? 'Get Custom Quote' : `Book This Plan`}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-center text-sm mt-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
        >
          ℹ️ All prices are indicative. Final pricing depends on menu selection, guest count, and event type.{' '}
          <button
            onClick={() => openEnquiry()}
            className="text-orange-500 hover:underline font-medium"
          >
            Contact us
          </button>{' '}
          for a free, personalised quote.
        </motion.p>
      </div>
    </section>
  );
}
