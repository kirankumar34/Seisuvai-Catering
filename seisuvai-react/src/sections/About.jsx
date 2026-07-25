import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Sparkles, Clock, Users, Coffee, MapPin } from 'lucide-react';
import { useThemeStore } from '../store/useStore';
import { SERVICES } from '../data/siteData';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function About() {
  const { isDark } = useThemeStore();
  const uspsRef = useRef(null);
  const uspsInView = useInView(uspsRef, { once: true, margin: '-60px' });

  const usps = [
    { icon: <Shield className="text-[#c8a24b] w-6 h-6" />, title: 'FSSAI Certified & Hygienic', desc: 'Strict hygiene protocols, fresh premium ingredients, and certified professional kitchen operations.' },
    { icon: <Sparkles className="text-[#c8a24b] w-6 h-6" />, title: 'Authentic Traditional Flavours', desc: 'Time-tested recipes passed through generations — replicating the perfect taste of home.' },
    { icon: <Users className="text-[#c8a24b] w-6 h-6" />, title: 'Trained & Professional Staff', desc: 'Dedicated serving teams, event coordinators, and highly experienced specialty chefs.' },
    { icon: <Clock className="text-[#c8a24b] w-6 h-6" />, title: 'Punctual & Always On Time', desc: 'We arrive early at the venue, set up perfectly, and start service strictly on schedule.' },
    { icon: <Coffee className="text-[#c8a24b] w-6 h-6" />, title: '100% Customisable Menus', desc: 'Build your dream event menu from our extensive list of traditional and live food counter items.' },
    { icon: <MapPin className="text-[#c8a24b] w-6 h-6" />, title: 'Chennai Service Coverage', desc: 'Serving all key areas in Chennai, including marriage halls, corporate offices, and homes.' },
  ];

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="section-pad"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0f0f0f 0%, #141414 100%)'
          : 'linear-gradient(180deg, #fff 0%, #fdf8f0 100%)',
      }}
    >
      <div className="container-luxury">

        {/* ═══════════════════════════════════════════
            1. ABOUT STORY — Two column
            ═══════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">

          {/* Image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div
              className="tilt-card rounded-3xl overflow-hidden"
              style={{
                border: '1.5px solid rgba(200,162,75,0.2)',
                boxShadow: isDark
                  ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,162,75,0.08)'
                  : '0 20px 60px rgba(0,0,0,0.12)',
              }}
            >
              <img
                src="/images/about/gallery-1-south-indian.png"
                alt="Seisuvai Catering Team Serving Banquet"
                className="img-responsive"
                style={{ height: 'clamp(300px, 40vw, 500px)', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>

            {/* Experience badge */}
            <div
              className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 p-5 rounded-2xl text-black shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #c8a24b, #e6c878)',
                boxShadow: '0 8px 32px rgba(200,162,75,0.5)',
              }}
            >
              <div
                className="font-luxury font-bold"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', lineHeight: 1 }}
              >
                15+
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest mt-1">Years Experience</div>
            </div>

            {/* Decorative corner accent */}
            <div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl pointer-events-none"
              style={{
                border: '2px solid rgba(200,162,75,0.3)',
                background: 'transparent',
              }}
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="section-label">Our Journey</span>
            <h2
              className="font-luxury font-bold mt-4 mb-6"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                color: isDark ? '#f0ead8' : '#1a1a1a',
                lineHeight: 1.1,
              }}
            >
              Crafting Traditional Flavours{' '}
              <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Since 2011</span>
            </h2>

            <p
              className="text-body mb-5"
              style={{ color: isDark ? 'rgba(200,180,140,0.8)' : 'rgba(80,60,40,0.75)' }}
            >
              Seisuvai Catering was founded with a singular vision: to serve the most authentic, rich, and delicious South Indian food across Chennai. Over the last decade and a half, we have catered to over 500+ happy families, weddings, and corporate gatherings.
            </p>
            <p
              className="text-body mb-8"
              style={{ color: isDark ? 'rgba(200,180,140,0.8)' : 'rgba(80,60,40,0.75)' }}
            >
              Our kitchen adheres to the highest level of food safety (FSSAI Certified). Every dish is prepared using fresh ingredients, traditional spices, and absolute care, ensuring your guests experience hospitality they will remember for years.
            </p>

            <button onClick={scrollToEnquiry} className="btn-gold">
              Enquire for Your Event
            </button>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════
            2. SERVICES GRID
            ═══════════════════════════════════════════ */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <span className="section-label">Our Services</span>
            <h2
              className="font-luxury font-bold mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                color: isDark ? '#f0ead8' : '#1a1a1a',
                lineHeight: 1.1,
              }}
            >
              Specialty Catering{' '}
              <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>For All Gatherings</span>
            </h2>
          </div>

          <div className="grid-cards-3">
            {SERVICES.map((service, i) => (
              <motion.article
                key={service.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="group luxury-card"
                style={{
                  background: isDark ? '#1a1a1a' : '#fff',
                  border: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.12)'}`,
                }}
              >
                {/* Image area */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 'clamp(160px, 22vw, 220px)' }}
                >
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    className="img-cover transition-transform duration-700"
                    style={{ transition: 'transform 0.7s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />

                  {/* Icon badge */}
                  <div
                    className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: 'rgba(0,0,0,0.65)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(200,162,75,0.2)',
                    }}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="font-luxury font-bold mb-2"
                    style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-caption leading-relaxed mb-4"
                    style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}
                  >
                    {service.description}
                  </p>
                  <button
                    onClick={scrollToEnquiry}
                    className="flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer"
                    style={{ color: '#c8a24b' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e6c878'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c8a24b'}
                  >
                    Select Service & Enquire →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            3. WHY CHOOSE US — USP Cards
            ═══════════════════════════════════════════ */}
        <div ref={uspsRef}>
          <div className="text-center mb-12">
            <span className="section-label">Our Promises</span>
            <h2
              className="font-luxury font-bold mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                color: isDark ? '#f0ead8' : '#1a1a1a',
                lineHeight: 1.1,
              }}
            >
              Why Chennai Chooses{' '}
              <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Seisuvai</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {usps.map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={uspsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex gap-4 p-5 rounded-2xl transition-all duration-300 group"
                style={{
                  background: isDark ? '#1a1a1a' : 'rgba(253,248,240,0.7)',
                  border: `1px solid ${isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)'}`,
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,162,75,0.4)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(200,162,75,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(200,162,75,0.1)' : 'rgba(200,162,75,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div
                  className="p-3 rounded-xl flex-shrink-0 h-max"
                  style={{ background: 'rgba(200,162,75,0.1)' }}
                >
                  {usp.icon}
                </div>
                <div>
                  <h4
                    className="font-bold text-sm mb-1.5"
                    style={{ color: isDark ? '#f0ead8' : '#1a1a1a' }}
                  >
                    {usp.title}
                  </h4>
                  <p
                    className="text-caption leading-relaxed"
                    style={{ color: isDark ? 'rgba(180,160,120,0.7)' : 'rgba(80,60,40,0.65)' }}
                  >
                    {usp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
