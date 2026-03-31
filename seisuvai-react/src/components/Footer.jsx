import { motion } from 'framer-motion';
import { useThemeStore } from '../store/useStore';
import { COMPANY } from '../data/siteData';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Menu', id: 'menu' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'FAQ', id: 'faq' },
  ],
  'Our Services': [
    { label: 'Royal Weddings', id: 'services' },
    { label: 'Corporate Events', id: 'services' },
    { label: 'Birthday Parties', id: 'services' },
    { label: 'Family Functions', id: 'services' },
    { label: 'Live Food Counters', id: 'services' },
    { label: 'Baby Showers', id: 'services' },
  ],
};

export default function Footer() {
  const { isDark } = useThemeStore();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: 'smooth' });
  };

  return (
    <footer className={isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-900 text-white'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={COMPANY.logo} alt="Logo" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <div className="font-bold text-sm text-white">SEISUVAI CATERING</div>
                <div className="text-orange-400 text-[10px] font-medium">THE CRAFTED FLAVOUR</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Crafting unforgettable culinary journeys with authentic South Indian flavours. Every meal is an opportunity to create a lasting memory.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { href: COMPANY.instagram, icon: '📸', label: 'Instagram' },
                { href: `https://wa.me/${COMPANY.whatsapp}`, icon: '💬', label: 'WhatsApp' },
                { href: `tel:${COMPANY.phoneRaw}`, icon: '📞', label: 'Phone' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15 }}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-base transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            {/* Certs */}
            <div className="flex gap-3 mt-5">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">🛡️ FSSAI Certified</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">⭐ 4.9 Rated</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="transition-transform group-hover:translate-x-1">›</span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm flex gap-2">
                <span>📍</span>
                <span>{COMPANY.address}</span>
              </li>
              <li>
                <a href={`tel:${COMPANY.phoneRaw}`} className="text-gray-400 hover:text-orange-400 text-sm flex gap-2 transition-colors">
                  <span>📞</span>
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 text-sm flex gap-2 transition-colors">
                  <span>💬</span>
                  <span>WhatsApp Chat</span>
                </a>
              </li>
            </ul>
            <button
              onClick={() => scrollTo('contact')}
              className="mt-5 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors"
            >
              📅 Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 Seisuvai Catering. All Rights Reserved.</p>
          <p>Crafted with ❤️ for every occasion in Chennai</p>
        </div>
      </div>
    </footer>
  );
}
