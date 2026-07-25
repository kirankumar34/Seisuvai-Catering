import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Star, Award, Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import { useThemeStore } from '../store/useStore';
import { STATS } from '../data/siteData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const SIGNATURE_DISHES = [
  {
    name: 'Imperial Ghee Pongal',
    desc: 'Slow-cooked traditional rice and lentil dish loaded with premium ghee, cashews, and fresh black pepper.',
    image: '/images/menu/imperial-ghee-pongal.png',
    tag: 'Signature Savoury',
  },
  {
    name: 'Nizam Mutton Biryani',
    desc: 'Fragrant Basmati rice layered with tender mutton, cooked in authentic spices on a slow dum fire.',
    image: '/images/menu/nizam-mutton-biryani.png',
    tag: 'Signature Biryani',
  },
  {
    name: 'Shahi Malai Sandwich',
    desc: 'An exquisite dessert featuring layers of rich milk solids and dry fruits soaked in cardamom syrup.',
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


export default function Home() {
  const { isDark } = useThemeStore();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
  };

  return (
    <div id="home">

      {/* ═══════════════════════════════════════════
          1. HERO SECTION — Cinematic Full-Viewport
          ═══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden grain-overlay"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #0a0a0a 0%, #0e0800 50%, #0a0a0a 100%)'
            : 'linear-gradient(135deg, #fdf8f0 0%, #f8f4ec 50%, #ffebd8 100%)',
        }}
      >
        {/* Hero background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero/hero-south-indian.png')",
            opacity: isDark ? 0.12 : 0.08,
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(14,8,0,0.9) 100%)'
              : 'linear-gradient(135deg, rgba(253,248,240,0.9) 0%, rgba(248,244,236,0.85) 100%)',
          }}
        />

        {/* Decorative orbs */}
        <div
          className="absolute animate-pulse-slow pointer-events-none"
          style={{
            top: '10%', right: '5%',
            width: 'clamp(200px, 30vw, 500px)',
            height: 'clamp(200px, 30vw, 500px)',
            background: 'radial-gradient(circle, rgba(200,162,75,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute animate-pulse-slow pointer-events-none"
          style={{
            bottom: '10%', left: '3%',
            width: 'clamp(150px, 25vw, 380px)',
            height: 'clamp(150px, 25vw, 380px)',
            background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animationDelay: '1.5s',
          }}
        />

        <div className="container-luxury relative z-10" style={{ paddingTop: 'clamp(5rem, 12vw, 9rem)', paddingBottom: 'clamp(3rem, 8vw, 6rem)' }}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* ── Left: Text Column ── */}
            <div className={isDark ? 'text-white' : 'text-gray-900'}>

              {/* Badge */}
              <motion.div
                custom={0} variants={fadeUp} initial="hidden" animate="visible"
              >
                <span className="badge-gold">
                  <Award size={12} style={{ color: '#c8a24b' }} />
                  Chennai's Premier South Indian Caterer
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="visible"
                className="font-luxury font-bold mt-5 mb-5"
                style={{ fontSize: 'clamp(2.5rem, 6vw + 0.5rem, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                Unforgettable
                <br />
                Flavour for{' '}
                <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Every Celebration</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="visible"
                className="text-body mb-8 max-w-lg"
                style={{ color: isDark ? 'rgba(220,205,180,0.85)' : 'rgba(80,60,40,0.8)' }}
              >
                From intimate family milestones to grand royal weddings — we craft premium South Indian culinary experiences with impeccable hygiene and gold-standard service.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="visible"
                className="flex flex-wrap gap-6 sm:gap-8 mb-8 py-5"
                style={{ borderTop: '1px solid rgba(200,162,75,0.2)', borderBottom: '1px solid rgba(200,162,75,0.2)' }}
              >
                {STATS.map((stat, i) => (
                  <StatCounter key={i} stat={stat} index={i} />
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                custom={4} variants={fadeUp} initial="hidden" animate="visible"
                className="flex flex-wrap gap-4 mb-8"
              >
                <button
                  onClick={() => scrollTo('enquiry')}
                  className="btn-gold flex items-center gap-2"
                >
                  <Calendar size={16} />
                  Enquire for a Custom Quote
                </button>
                <button
                  onClick={() => scrollTo('menus')}
                  className="btn-outline-gold flex items-center gap-2"
                  style={isDark ? { color: '#e6c878', borderColor: 'rgba(200,162,75,0.4)' } : { color: '#a8852e', borderColor: 'rgba(200,162,75,0.5)' }}
                >
                  View Menu <ArrowRight size={14} />
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                custom={5} variants={fadeUp} initial="hidden" animate="visible"
                className="flex flex-wrap items-center gap-4 text-caption font-semibold uppercase tracking-wider"
                style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(120,90,50,0.6)' }}
              >
                <span className="flex items-center gap-1.5">
                  <Shield size={13} className="text-green-500" /> FSSAI Certified
                </span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span className="flex items-center gap-1.5">🌿 100% Traditional & Hygienic</span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span className="flex items-center gap-1.5">
                  <Star size={13} className="text-amber-400 fill-amber-400" /> 4.9★ Google
                </span>
              </motion.div>
            </div>

            {/* ── Right: 3D Floating Image Card ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block"
              style={{ perspective: '1000px' }}
            >
              <div
                className="animate-float-3d relative rounded-3xl overflow-hidden"
                style={{
                  border: '1.5px solid rgba(200,162,75,0.3)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,162,75,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <img
                  src="/images/hero/gallery-2-south-indian.png"
                  alt="Traditional South Indian Feast Catering"
                  className="w-full object-cover"
                  style={{ height: 'clamp(380px, 45vw, 540px)' }}
                  loading="eager"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,8,0,0.88) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)' }} />

                {/* Gold status badge — top */}
                <div
                  className="absolute top-4 right-4 px-4 py-2 text-xs font-bold rounded-xl"
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(12px)',
                    color: '#e6c878',
                    border: '1px solid rgba(200,162,75,0.3)',
                  }}
                >
                  ✨ Gold Standard Catering
                </div>

                {/* Bottom info card */}
                <div
                  className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl text-white"
                  style={{
                    background: 'rgba(10,8,0,0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(200,162,75,0.2)',
                  }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: '#c8a24b' }}
                  >
                    Catering Highlight
                  </div>
                  <div className="font-luxury font-bold text-lg mb-1">Traditional South Indian Sadhya</div>
                  <p className="text-xs" style={{ color: 'rgba(220,205,180,0.75)' }}>
                    Authentic banana leaf dining setups served by professionally trained staff.
                  </p>
                </div>
              </div>

              {/* Floating accent dot */}
              <div
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full animate-pulse-slow"
                style={{
                  background: 'radial-gradient(circle, rgba(200,162,75,0.3) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => scrollTo('about')}
        >
          <span className="text-caption font-medium tracking-widest uppercase" style={{ color: 'rgba(200,162,75,0.6)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={18} style={{ color: '#c8a24b' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          2. SIGNATURE DISHES SHOWCASE
          ═══════════════════════════════════════════ */}
      <section
        className="section-pad"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, #0e0e0e 0%, #111111 100%)'
            : 'linear-gradient(180deg, #fdf8f0 0%, #f8f4ec 100%)',
        }}
      >
        <div className="container-luxury">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="section-label">Chef's Specials</span>
            <h2
              className="font-luxury font-bold mt-4 mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: isDark ? '#fff' : '#1a1a1a',
                lineHeight: 1.1,
              }}
            >
              Our Signature{' '}
              <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Culinary Masterpieces</span>
            </h2>
            <p className="text-body max-w-xl mx-auto" style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}>
              A glimpse into the highlight reel of traditional dishes that have made us the most preferred caterer in Chennai.
            </p>
          </div>

          {/* Cards — responsive auto-fit */}
          <div className="grid-cards-3">
            {SIGNATURE_DISHES.map((dish, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group luxury-card"
                style={{
                  background: isDark ? '#1a1a1a' : '#fff',
                  border: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: 'clamp(180px, 25vw, 240px)' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="img-cover group-hover:scale-108 transition-transform duration-700"
                    style={{ transition: 'transform 0.7s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide text-black"
                    style={{ background: '#c8a24b' }}
                  >
                    {dish.tag}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3
                    className="font-luxury font-bold mb-2"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
                  >
                    {dish.name}
                  </h3>
                  <p className="text-caption leading-relaxed" style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}>
                    {dish.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. CTA BANNER
          ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden grain-overlay"
        style={{ padding: 'clamp(3rem, 7vw, 6rem) 0', borderTop: '1px solid rgba(200,162,75,0.15)' }}
      >
        {/* Dark background always for CTA */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0e0e0e 0%, #1a1000 50%, #0e0e0e 100%)' }} />

        {/* Glow orbs */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 animate-pulse-slow pointer-events-none"
          style={{
            width: 'clamp(300px, 60vw, 800px)',
            height: '60%',
            background: 'radial-gradient(ellipse, rgba(200,162,75,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="container-luxury relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Get Started</span>

            <h2
              className="font-luxury font-bold mt-5 mb-4 text-white"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', lineHeight: 1.1, color: '#e6c878' }}
            >
              Planning a Special Event in Chennai?
            </h2>
            <p className="text-body max-w-xl mx-auto mb-8" style={{ color: 'rgba(220,200,160,0.75)' }}>
              Whether it is an intimate family gathering of 50 or a grand wedding for thousands, let us craft the perfect menu.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => scrollTo('enquiry')}
                className="btn-gold flex items-center gap-2"
              >
                Get Custom Quote <ArrowRight size={16} />
              </button>
              <a
                href={`tel:${'+919788313225'}`}
                className="btn-outline-gold flex items-center gap-2"
                style={{ color: '#e6c878', borderColor: 'rgba(200,162,75,0.4)' }}
              >
                📞 Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
