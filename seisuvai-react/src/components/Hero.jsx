import { motion } from 'framer-motion';
import { Shield, Star, Award, ChevronDown } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { STATS } from '../data/siteData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const { isDark } = useThemeStore();
  const { openEnquiry } = useMenuStore();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0f0f1a 0%, #1a0a00 50%, #0f0f1a 100%)'
          : 'linear-gradient(135deg, #fff7ed 0%, #1a0a00 50%, #7c2d12 100%)',
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-south-indian.png')" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(15,5,0,0.80) 100%)'
            : 'linear-gradient(135deg, rgba(10,5,0,0.78) 0%, rgba(30,15,0,0.70) 100%)',
        }}
      />

      {/* Animated decorative orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left — Text */}
        <div className="text-white">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium mb-6"
          >
            <Award size={14} />
            Trusted by 500+ Families Across Chennai
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Delicious Catering
            <br />
            for{' '}
            <span className="gradient-text">Every Occasion</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-200 leading-relaxed mb-8 max-w-lg"
          >
            From intimate family gatherings to grand royal weddings — we bring{' '}
            <strong className="text-orange-300">authentic South Indian flavours</strong>,
            impeccable hygiene, and passionate service to your special day.
          </motion.p>

          {/* Stats row */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-6 mb-10"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-10"
          >
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(249,115,22,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl text-base shadow-xl shadow-orange-500/30 transition-all"
            >
              📅 Book Now
            </motion.button>
            <motion.button
              onClick={() => scrollTo('quote')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl text-base hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              📋 Get Free Quote
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4 text-sm text-gray-300"
          >
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-green-400" /> FSSAI Certified
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5">
              ✅ 100% Hygienic
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-400 fill-yellow-400" /> 4.9★ Google
            </span>
          </motion.div>
        </div>

        {/* Right — Hero image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 animate-float">
            <img
              src="/images/gallery-2-south-indian.png"
              alt="Traditional South Indian Banquet"
              className="w-full h-[480px] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Floating badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5">
              🌿 Fresh & Hygienic
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass text-white">
              <div className="text-sm font-semibold">Starting from</div>
              <div className="text-2xl font-bold text-orange-400">₹250 <span className="text-sm text-gray-300">/plate</span></div>
            </div>
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -left-8 top-1/3 p-4 rounded-2xl glass text-white shadow-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-lg">⭐</div>
              <div>
                <div className="text-xs text-gray-300">Google Rating</div>
                <div className="font-bold text-sm">4.9 / 5.0</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollTo('services')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white flex flex-col items-center gap-1 text-xs transition-colors"
      >
        Scroll to explore
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
