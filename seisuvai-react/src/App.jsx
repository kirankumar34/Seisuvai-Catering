import { useEffect } from 'react';
import { useThemeStore } from './store/useStore';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import MenuTabs from './components/menu/MenuTabs';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact, { AvailabilitySection } from './components/Contact';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import StickyActions from './components/StickyActions';

function WhyChooseUs() {
  const { isDark } = useThemeStore();
  const usps = [
    { icon: '🛡️', title: 'FSSAI Certified & Hygienic', desc: 'Strict hygiene protocols, fresh ingredients, and certified kitchen operations.' },
    { icon: '🌿', title: 'Authentic Traditional Flavours', desc: 'Recipes passed through generations — the taste of home on your grandest day.' },
    { icon: '💰', title: 'Transparent & Fair Pricing', desc: 'No hidden charges. Starting at ₹250/plate with customisable packages.' },
    { icon: '👨‍🍳', title: 'Trained & Professional Staff', desc: 'Dedicated serving team, event coordinators, and experienced chefs.' },
    { icon: '⏰', title: 'Always On Time', desc: 'We reach the venue early, set up perfectly, and start serving on schedule.' },
    { icon: '🎛️', title: '100% Customisable Menus', desc: 'Build your perfect menu with our custom menu selector or speak to our team.' },
  ];

  return (
    <section id="why" className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-amber-50/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/gallery-1-south-indian.png"
                alt="Why Choose Seisuvai"
                loading="lazy"
                className="w-full h-[460px] object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-orange-500 text-white shadow-xl">
              <div className="text-4xl font-extrabold">500+</div>
              <div className="text-sm font-medium text-orange-100">Happy Clients</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              Our Promise
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Chennai Chooses <span className="gradient-text">Seisuvai</span>
            </h2>
            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              We don't just serve food — we craft experiences that your guests talk about for years.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {usps.map((usp, i) => (
                <div
                  key={i}
                  className={`flex gap-3 p-4 rounded-2xl ${
                    isDark ? 'bg-gray-700/50' : 'bg-white shadow-sm'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{usp.icon}</span>
                  <div>
                    <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{usp.title}</h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{usp.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
              }}
              className="mt-8 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25"
            >
              Get Your Free Quote Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { isDark } = useThemeStore();

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <div className={isDark ? 'dark bg-gray-950' : 'bg-white'}>
      {/* SEO Meta (injected into index.html via template) */}
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <MenuTabs />
        <Pricing />
        <Gallery />
        <Testimonials />
        <AvailabilitySection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <EnquiryModal />
      <StickyActions />
    </div>
  );
}
