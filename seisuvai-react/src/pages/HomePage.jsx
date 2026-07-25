import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { STATS, SERVICES, TESTIMONIALS, FAQS, COMPANY } from '../data/siteData';
import HeroMobileVisual from '../components/hero/HeroMobileVisual';

// Code-split 3D WebGL scene so mobile devices never download Three.js
const HeroScene3D = lazy(() => import('../components/hero/HeroScene3D'));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const SIGNATURE_DISHES = [
  {
    name: 'Imperial Ghee Pongal',
    desc: 'Rice and lentils slow-cooked with premium ghee, cashews and fresh black pepper.',
    image: '/images/menu/imperial-ghee-pongal.png',
    tag: 'Breakfast Favourite',
  },
  {
    name: 'Nizam Mutton Biryani',
    desc: 'Fragrant Basmati layered with tender mutton, cooked on slow dum fire with authentic spices.',
    image: '/images/menu/nizam-mutton-biryani.png',
    tag: 'Crowd Favourite',
  },
  {
    name: 'Shahi Malai Sandwich',
    desc: 'Layers of rich milk solids and dry fruits soaked in cardamom syrup. A traditional sweet finish.',
    image: '/images/menu/shahi-malai-sandwich.png',
    tag: 'Signature Sweet',
  },
];

function StatCounter({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <div className="font-luxury font-bold" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#c8a24b', lineHeight: 1 }}>
        {stat.value}
      </div>
      <div className="text-caption font-semibold uppercase tracking-widest mt-1" style={{ color: 'rgba(150,130,100,0.8)' }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

function FAQItem({ q, a, isDark }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background: isDark ? 'rgba(26,26,26,0.8)' : 'rgba(255,255,255,0.9)',
        border: `1px solid ${isDark ? 'rgba(200,162,75,0.12)' : 'rgba(200,162,75,0.18)'}`,
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <span className="font-semibold text-sm sm:text-base" style={{ color: isDark ? 'rgba(255,255,240,0.9)' : '#1a1a1a' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
          style={{ color: '#c8a24b', flexShrink: 0, fontSize: '1.25rem', lineHeight: 1 }}>+</motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: isDark ? 'rgba(200,180,140,0.65)' : 'rgba(80,60,30,0.8)' }}>{a}</p>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const { isDark } = useThemeStore();
  const { openEnquiry } = useMenuStore();
  const heroRef = useRef(null);

  // Viewport detection for code-split WebGL loading
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const bg = isDark ? '#0a0a0a' : '#fdf8f0';
  const textPrimary = isDark ? 'rgba(253,248,240,0.95)' : '#1a0f00';
  const textMuted = isDark ? 'rgba(200,180,140,0.6)' : 'rgba(80,60,20,0.65)';

  return (
    <div style={{ background: bg }}>

      {/* ══════ HERO ══════ */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(200,162,75,0.06) 0%, transparent 60%), #0a0a0a'
            : 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(200,162,75,0.08) 0%, transparent 60%), #fdf8f0',
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(200,162,75,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,162,75,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="container-luxury relative z-10 py-12 sm:py-20">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">

            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                variants={fadeUp} custom={0} initial="hidden" animate="visible"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{
                  background: 'rgba(200,162,75,0.1)',
                  border: '1px solid rgba(200,162,75,0.25)',
                  color: '#c8a24b',
                }}
              >
                <span>⭐ 4.9 Rated on Google</span>
                <span style={{ color: 'rgba(200,162,75,0.4)' }}>•</span>
                <span>FSSAI Certified</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp} custom={1} initial="hidden" animate="visible"
                className="font-luxury font-bold leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)', color: textPrimary }}
              >
                Fresh, tasty food for{' '}
                <span style={{ color: '#c8a24b' }}>every occasion</span>
                {' '}— big or small
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeUp} custom={2} initial="hidden" animate="visible"
                className="text-lg sm:text-xl mb-8 mx-auto lg:mx-0"
                style={{ color: textMuted, maxWidth: '640px', lineHeight: 1.7 }}
              >
                We prepare fresh South Indian food for weddings, birthdays, family functions, corporate events and more.
                Our team handles everything — cooking, serving, and cleanup.
              </motion.p>

              {/* Mobile visual showcase — lightweight (<15KB) */}
              {!isDesktop && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <HeroMobileVisual isDark={isDark} />
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp} custom={3} initial="hidden" animate="visible"
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 lg:mb-0"
              >
                <motion.button
                  onClick={() => openEnquiry()}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-black btn-gold"
                  style={{ minHeight: '52px' }}
                >
                  📅 Get a Free Quote
                  <ArrowRight size={18} />
                </motion.button>
                <Link
                  to="/menus"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid rgba(200,162,75,0.35)',
                    color: isDark ? 'rgba(253,248,240,0.85)' : '#1a1a1a',
                    minHeight: '52px',
                    textDecoration: 'none',
                  }}
                >
                  🍛 View Menus
                </Link>
              </motion.div>
            </div>

            {/* Right Column — 3D WebGL Scene on Desktop */}
            {isDesktop && (
              <div className="lg:col-span-5 flex justify-center items-center">
                <Suspense
                  fallback={
                    <div className="w-80 h-80 rounded-full flex items-center justify-center border border-amber-500/20 bg-amber-500/5 text-amber-500 text-xs font-semibold">
                      ✨ Loading 3D Thali...
                    </div>
                  }
                >
                  <HeroScene3D isDark={isDark} />
                </Suspense>
              </div>
            )}

          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0"
          >
            {STATS.map((stat, i) => <StatCounter key={stat.label} stat={stat} index={i} />)}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(200,162,75,0.4)' }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ══════ SIGNATURE DISHES ══════ */}
      <section className="section-gap">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <div className="label-badge mb-4">Our Signature Dishes</div>
            <h2 className="heading-section" style={{ color: textPrimary }}>
              Food people keep coming back for
            </h2>
            <p className="text-base sm:text-lg mt-4 mx-auto" style={{ color: textMuted, maxWidth: '520px' }}>
              These are some of the dishes our customers ask for at every event. Made fresh, every time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SIGNATURE_DISHES.map((dish, i) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden"
                style={{
                  background: isDark ? 'rgba(20,16,8,0.9)' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                  boxShadow: isDark ? '0 4px 30px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => { e.target.src = '/images/menu/gallery-2.png'; }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }}
                  />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #c8a24b, #e6c878)' }}
                  >
                    {dish.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-2" style={{ color: textPrimary }}>{dish.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/menus"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:gap-3"
              style={{ color: '#c8a24b', textDecoration: 'none' }}
            >
              See all menus <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="section-gap" style={{ background: isDark ? 'rgba(10,8,3,0.8)' : 'rgba(253,248,240,0.8)' }}>
        <div className="container-luxury">
          <div className="text-center mb-14">
            <div className="label-badge mb-4">What We Do</div>
            <h2 className="heading-section" style={{ color: textPrimary }}>We cater for all occasions</h2>
            <p className="text-base sm:text-lg mt-4 mx-auto" style={{ color: textMuted, maxWidth: '520px' }}>
              From a small family gathering to a 2000-person wedding — we have done it all.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: isDark ? 'rgba(20,16,8,0.9)' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.12)'}`,
                }}
                onClick={() => openEnquiry({ event: svc.id })}
              >
                <div className="relative overflow-hidden" style={{ height: '180px' }}>
                  <img
                    src={svc.image}
                    alt={svc.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => { e.target.src = '/images/gallery-1-south-indian.png'; }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                  <span className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                    {svc.icon}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base mb-2" style={{ color: textPrimary }}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: textMuted }}>{svc.description}</p>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#c8a24b' }}>{svc.cta} →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="section-gap">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <div className="label-badge mb-4">What Customers Say</div>
            <h2 className="heading-section" style={{ color: textPrimary }}>Feedback from real events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.filter(t => t.featured).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl"
                style={{
                  background: isDark ? 'rgba(26,26,26,0.9)' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(200,162,75,0.12)' : 'rgba(200,162,75,0.18)'}`,
                }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} style={{ color: s < Math.floor(t.rating) ? '#f59e0b' : 'rgba(200,162,75,0.3)', fontSize: '14px' }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: isDark ? 'rgba(220,200,160,0.8)' : 'rgba(60,40,10,0.8)' }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-black"
                    style={{ background: 'linear-gradient(135deg, #c8a24b, #e6c878)' }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: textPrimary }}>{t.name}</div>
                    <div className="text-xs" style={{ color: textMuted }}>{t.event}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="section-gap">
        <div className="container-luxury max-w-3xl">
          <div className="text-center mb-12">
            <div className="label-badge mb-4">Questions & Answers</div>
            <h2 className="heading-section" style={{ color: textPrimary }}>Things people usually ask us</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA BAND ══════ */}
      <section className="section-gap">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(200,162,75,0.15) 0%, rgba(230,200,120,0.08) 50%, rgba(200,162,75,0.12) 100%)',
              border: '1.5px solid rgba(200,162,75,0.25)',
            }}
          >
            <h2 className="font-luxury font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: textPrimary }}>
              Planning an event?
            </h2>
            <p className="text-base sm:text-lg mb-8 mx-auto" style={{ color: textMuted, maxWidth: '520px' }}>
              Tell us about your function and we'll send you a quote within 2 hours. No commitment needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={() => openEnquiry()}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-bold text-base text-black btn-gold"
                style={{ minHeight: '52px' }}
              >
                📅 Get a Free Quote
              </motion.button>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  minHeight: '52px',
                  textDecoration: 'none',
                }}
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
