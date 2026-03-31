import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useThemeStore } from '../store/useStore';
import { FAQS } from '../data/siteData';

export default function FAQ() {
  const { isDark } = useThemeStore();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            Common Questions
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className={`text-base text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Got questions? We've got answers. If you don't see yours here, just call or WhatsApp us.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl border overflow-hidden transition-all ${
                openIndex === i
                  ? isDark
                    ? 'border-orange-500/50 bg-gray-800/80'
                    : 'border-orange-300 bg-orange-50/50'
                  : isDark
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className={`font-semibold text-sm pr-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex-shrink-0 ${openIndex === i ? 'text-orange-500' : isDark ? 'text-gray-400' : 'text-gray-400'}`}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className={`px-5 pb-5 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Still have questions?
          </p>
          <a
            href="tel:+919788313225"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
          >
            📞 Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
