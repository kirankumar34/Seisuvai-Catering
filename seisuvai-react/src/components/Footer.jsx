import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { COMPANY } from '../data/siteData';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Standard Menus', to: '/menus' },
  { label: 'Custom Menu', to: '/custom-menu' },
  { label: 'Live Counters', to: '/live-counters' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

const SERVICE_LINKS = [
  { label: 'Wedding Catering', to: '/contact' },
  { label: 'Corporate Events', to: '/contact' },
  { label: 'Birthday Parties', to: '/contact' },
  { label: 'Family Functions', to: '/contact' },
  { label: 'Live Food Counters', to: '/live-counters' },
  { label: 'Baby Showers', to: '/contact' },
];

export default function Footer() {
  const { openEnquiry } = useMenuStore();

  return (
    <footer className="pb-24 sm:pb-0" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(200,162,75,0.12)' }}>

      {/* Gold top accent line */}
      <div
        className="h-[2px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #c8a24b 20%, #e6c878 50%, #c8a24b 80%, transparent)' }}
      />

      <div className="container-luxury py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={COMPANY.logo}
                alt="Seisuvai Logo"
                className="w-11 h-11 rounded-xl object-cover"
                style={{ border: '1.5px solid rgba(200,162,75,0.3)' }}
              />
              <div>
                <div className="font-bold text-sm text-white tracking-widest">SEISUVAI CATERING</div>
                <div className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: '#c8a24b' }}>
                  The Crafted Flavour
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(200,180,140,0.6)', maxWidth: '260px' }}>
              We make fresh, tasty South Indian food for weddings, birthdays, corporate events and every family occasion. Based in Chennai, serving since 2011.
            </p>

            {/* Social links */}
            <div className="flex gap-2.5 mb-5">
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
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all"
                  style={{
                    background: 'rgba(200,162,75,0.1)',
                    border: '1px solid rgba(200,162,75,0.2)',
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex gap-3">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(180,160,120,0.5)' }}>
                🛡️ FSSAI Certified
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(180,160,120,0.5)' }}>
                ⭐ 4.9 Rated
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-5 tracking-wider" style={{ color: '#c8a24b' }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm transition-all flex items-center gap-1.5 group"
                    style={{ color: 'rgba(200,180,140,0.55)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c8a24b'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,180,140,0.55)'}
                  >
                    <span style={{ color: '#c8a24b', opacity: 0.5, fontSize: '10px' }}>◆</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm mb-5 tracking-wider" style={{ color: '#c8a24b' }}>
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm transition-all flex items-center gap-1.5"
                    style={{ color: 'rgba(200,180,140,0.55)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c8a24b'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,180,140,0.55)'}
                  >
                    <span style={{ color: '#c8a24b', opacity: 0.5, fontSize: '10px' }}>◆</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-sm mb-5 tracking-wider" style={{ color: '#c8a24b' }}>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="text-sm flex gap-2.5" style={{ color: 'rgba(200,180,140,0.55)' }}>
                <span className="flex-shrink-0 mt-0.5">📍</span>
                <span>{COMPANY.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="text-sm flex gap-2.5 transition-colors"
                  style={{ color: 'rgba(200,180,140,0.55)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c8a24b'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,180,140,0.55)'}
                >
                  <span>📞</span>
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex gap-2.5 transition-colors"
                  style={{ color: 'rgba(200,180,140,0.55)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,180,140,0.55)'}
                >
                  <span>💬</span>
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li className="text-sm flex gap-2.5" style={{ color: 'rgba(200,180,140,0.55)' }}>
                <span>🕗</span>
                <span>Mon – Sun: 8 AM – 8 PM</span>
              </li>
            </ul>

            <button
              onClick={() => openEnquiry()}
              className="mt-5 w-full py-2.5 font-bold text-sm rounded-xl text-black cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #c8a24b, #e6c878)',
                border: 'none',
                minHeight: '44px',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              📅 Get a Free Quote
            </button>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="gold-divider mx-6 sm:mx-16" />

      {/* Bottom bar */}
      <div className="py-5" style={{ borderTop: '1px solid rgba(200,162,75,0.08)' }}>
        <div
          className="container-luxury flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: 'rgba(200,180,140,0.65)' }}
        >
          <p>© 2026 Seisuvai Catering. All Rights Reserved.</p>
          <p>Made with ❤️ for Chennai families</p>
        </div>
      </div>
    </footer>
  );
}
