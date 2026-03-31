import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { SERVICES } from '../data/siteData';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function SectionHeader({ label, title, subtitle, isDark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
        {label}
      </div>
      <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base max-w-xl mx-auto text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default function Services() {
  const { isDark } = useThemeStore();
  const { openEnquiry } = useMenuStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="What We Offer"
          title={<>Catering For <span className="gradient-text">Every Occasion</span></>}
          subtitle="We bring passion, hygiene, and professional excellence to every event we serve — big or small."
          isDark={isDark}
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800 border-gray-700 hover:border-orange-500/40'
                  : 'bg-white border-gray-100 hover:border-orange-200'
              }`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <button
                    onClick={scrollToContact}
                    className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-xl text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    {service.cta}
                  </button>
                </div>

                {/* Icon pill */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
                  {service.icon}
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {service.description}
                </p>
                <button
                  onClick={scrollToContact}
                  className="text-orange-500 font-semibold text-sm hover:text-orange-600 flex items-center gap-1 group/link"
                >
                  Get Quote
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Not sure what you need? Let us help you plan the perfect catering experience.
          </p>
          <button
            onClick={scrollToContact}
            className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all hover:scale-105"
          >
            Request a Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
