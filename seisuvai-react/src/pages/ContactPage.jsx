import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/useStore';
import Enquiry from '../sections/Enquiry';
import { COMPANY } from '../data/siteData';

const CONTACT_ITEMS = [
  {
    icon: '📞',
    label: 'Phone',
    value: COMPANY.phone,
    href: `tel:${COMPANY.phoneRaw}`,
    sub: 'Call us anytime 8 AM – 8 PM',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: 'Chat with us',
    href: `https://wa.me/${COMPANY.whatsapp}`,
    sub: 'Usually reply within 30 minutes',
    external: true,
  },
  {
    icon: '📧',
    label: 'Email',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    sub: 'For formal enquiries and invoices',
  },
  {
    icon: '📍',
    label: 'Address',
    value: COMPANY.address,
    href: COMPANY.mapsUrl,
    sub: 'Chennai — serving nearby areas too',
    external: true,
  },
];

export default function ContactPage() {
  const { isDark } = useThemeStore();
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
          <span>Contact & Enquiry</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container-luxury py-10 text-center">
        <div className="label-badge mb-4">Get in Touch</div>
        <h1 className="heading-section mb-4" style={{ color: textPrimary }}>
          Let's talk about your event
        </h1>
        <p className="text-base sm:text-lg mx-auto" style={{ color: textMuted, maxWidth: '520px' }}>
          Fill out the form below or contact us directly. We'll get back to you with availability and a quote within 2 hours.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="container-luxury pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="flex items-start gap-3 p-4 rounded-2xl transition-all hover:shadow-lg"
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,162,75,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = cardBorder}
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-semibold text-xs uppercase tracking-wider mb-0.5" style={{ color: '#c8a24b' }}>
                  {item.label}
                </div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: textPrimary }}>{item.value}</div>
                <div className="text-xs" style={{ color: textMuted }}>{item.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="container-luxury pb-10">
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-2xl"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕗</span>
            <div>
              <div className="font-semibold text-sm" style={{ color: textPrimary }}>Business Hours</div>
              <div className="text-xs" style={{ color: textMuted }}>Monday to Sunday, 8:00 AM – 8:00 PM</div>
            </div>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: 'rgba(22,163,74,0.15)', color: '#16a34a' }}>
            ● Open Today
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="pb-20">
        <Enquiry />
      </div>

      {/* Google Maps */}
      <div className="container-luxury pb-20">
        <h2 className="text-xl font-bold mb-5 text-center" style={{ color: textPrimary }}>Find us on the map</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, height: '320px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.2707!3d13.0623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzQ0LjMiTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Seisuvai Catering Location"
          />
        </div>
        <div className="text-center mt-3">
          <a
            href={COMPANY.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold"
            style={{ color: '#c8a24b', textDecoration: 'none' }}
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}
