import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { ABOUT_CONTENT } from '../data/siteData';

export default function AboutPage() {
  const { isDark } = useThemeStore();
  const { openEnquiry } = useMenuStore();

  const bg = isDark ? '#0a0a0a' : '#fdf8f0';
  const textPrimary = isDark ? 'rgba(253,248,240,0.95)' : '#1a0f00';
  const textMuted = isDark ? 'rgba(200,180,140,0.6)' : 'rgba(80,60,20,0.65)';
  const cardBg = isDark ? 'rgba(26,26,26,0.9)' : '#ffffff';
  const cardBorder = isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)';

  return (
    <div style={{ background: bg, paddingTop: '80px', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="container-luxury pt-8 pb-2">
        <nav className="flex items-center gap-2 text-xs" style={{ color: textMuted }}>
          <Link to="/" style={{ color: '#c8a24b', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span>About Us</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="container-luxury py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="label-badge mb-4">About Seisuvai Catering</div>
          <h1 className="heading-section mb-6" style={{ color: textPrimary }}>
            Chennai's trusted catering team
          </h1>
          <p className="text-lg font-semibold mb-4" style={{ color: '#c8a24b' }}>
            {ABOUT_CONTENT.tagline}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container-luxury pb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>Our Story</h2>
        <div className="space-y-4">
          {ABOUT_CONTENT.story.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-base leading-relaxed"
              style={{ color: textMuted }}
            >
              {para}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(200,162,75,0.1), rgba(230,200,120,0.06))',
            border: '1.5px solid rgba(200,162,75,0.2)',
          }}
        >
          <p className="text-base font-semibold italic" style={{ color: isDark ? 'rgba(220,200,160,0.9)' : '#6b4c10' }}>
            "{ABOUT_CONTENT.promise}"
          </p>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="section-gap" style={{ background: isDark ? 'rgba(10,8,3,0.6)' : 'rgba(253,248,240,0.8)' }}>
        <div className="container-luxury">
          <div className="text-center mb-12">
            <div className="label-badge mb-4">How We Work</div>
            <h2 className="heading-section" style={{ color: textPrimary }}>
              What makes us different
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ABOUT_CONTENT.values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 rounded-2xl"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div className="text-3xl mb-4">{val.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: textPrimary }}>{val.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — stats */}
      <section className="section-gap">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <div className="label-badge mb-4">Why Choose Us</div>
            <h2 className="heading-section" style={{ color: textPrimary }}>Reasons our customers trust us</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {ABOUT_CONTENT.whyUs.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-5 rounded-2xl"
                style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-xl mb-1" style={{ color: '#c8a24b' }}>{item.stat}</div>
                <div className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: textPrimary }}>{item.label}</div>
                <div className="text-[10px]" style={{ color: textMuted }}>{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap">
        <div className="container-luxury max-w-2xl text-center">
          <h2 className="heading-section mb-4" style={{ color: textPrimary }}>
            Ready to book your catering?
          </h2>
          <p className="text-base mb-8" style={{ color: textMuted }}>
            Tell us about your event and we'll get back to you with a quote within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openEnquiry()}
              className="px-8 py-3.5 rounded-xl font-bold text-base text-black btn-gold"
              style={{ minHeight: '52px' }}
            >
              📅 Get a Free Quote
            </button>
            <Link
              to="/contact"
              className="flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-base transition-all"
              style={{
                border: '1.5px solid rgba(200,162,75,0.35)',
                color: isDark ? 'rgba(253,248,240,0.85)' : '#1a1a1a',
                textDecoration: 'none',
                minHeight: '52px',
              }}
            >
              See Contact Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
