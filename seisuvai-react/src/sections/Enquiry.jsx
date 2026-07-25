import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useThemeStore } from '../store/useStore';
import { openWhatsApp } from '../utils/whatsapp';
import { submitEnquiry } from '../utils/api';
import { COMPANY, EVENT_TYPES } from '../data/siteData';

// Custom SVG Icons for compatibility and brand styling
const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const MapPinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const SendIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function Enquiry() {
  const { isDark } = useThemeStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      enquiryType: 'booking',
      selectedItems: [],
      paxCount: parseInt(data.guests, 10) || 0,
      message: `Enquiry — Event: ${data.eventType}, Date: ${data.date}. ${data.message || ''}`
    };

    await submitEnquiry(payload);
    openWhatsApp({ ...data, menuItems: [] });
    reset();
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '0.75rem',
    border: hasError
      ? '1.5px solid #ef4444'
      : isDark ? '1.5px solid rgba(200,162,75,0.2)' : '1.5px solid rgba(200,162,75,0.25)',
    background: isDark ? 'rgba(20,18,12,0.8)' : 'rgba(253,248,240,0.8)',
    color: isDark ? '#f0ead8' : '#1a1a1a',
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.25s ease',
    minHeight: '52px',
    outline: 'none',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
    color: isDark ? 'rgba(200,180,140,0.8)' : 'rgba(100,75,40,0.8)',
  };

  const contactItems = [
    { icon: <PhoneIcon style={{ color: '#c8a24b' }} />, label: 'Call / SMS', value: COMPANY.phone, href: `tel:${COMPANY.phoneRaw}` },
    { icon: <WhatsAppIcon style={{ color: '#c8a24b' }} />, label: 'WhatsApp Chat', value: 'WhatsApp Live Chat', href: `https://wa.me/${COMPANY.whatsapp}` },
    { icon: <MapPinIcon style={{ color: '#c8a24b' }} />, label: 'Our Location', value: COMPANY.address, href: COMPANY.mapsUrl },
    { icon: <InstagramIcon style={{ color: '#c8a24b' }} />, label: 'Follow Us', value: '@seisuvai_catering_', href: COMPANY.instagram },
  ];

  return (
    <section
      id="enquiry"
      className="section-pad"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)'
          : 'linear-gradient(135deg, #f8f4ec 0%, #fdf8f0 100%)',
      }}
    >
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Contact Info & Map ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Let's Connect</span>
            <h2
              className="font-luxury font-bold mt-4 mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                color: isDark ? '#f0ead8' : '#1a1a1a',
                lineHeight: 1.1,
              }}
            >
              Request a{' '}
              <span style={{ color: '#c8a24b', fontStyle: 'italic' }}>Custom Quote</span>
            </h2>
            <p
              className="text-body mb-10"
              style={{ color: isDark ? 'rgba(200,180,140,0.75)' : 'rgba(80,60,40,0.7)' }}
            >
              Tell us about your catering needs and our event planning team will verify availability and respond with a tailored menu recommendation and quote within 2 hours.
            </p>

            {/* Contact cards */}
            <div className="space-y-3">
              {contactItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                  style={{
                    background: isDark ? 'rgba(26,26,26,0.8)' : 'rgba(255,255,255,0.85)',
                    border: `1px solid ${isDark ? 'rgba(200,162,75,0.12)' : 'rgba(200,162,75,0.18)'}`,
                    textDecoration: 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg flex-shrink-0"
                    style={{ background: 'rgba(200,162,75,0.1)' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: isDark ? 'rgba(200,162,75,0.5)' : 'rgba(168,133,46,0.6)' }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="font-semibold text-sm transition-colors"
                      style={{ color: isDark ? '#f0ead8' : '#1a1a1a' }}
                    >
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Google Map */}
            <div
              className="mt-6 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(200,162,75,0.2)' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzE2LjciTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Seisuvai Catering Location Map"
              />
            </div>
          </motion.div>

          {/* ── Right: Enquiry Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl p-7 sm:p-8"
            style={{
              background: isDark ? 'rgba(20,18,12,0.85)' : 'rgba(255,255,255,0.92)',
              border: `1.5px solid ${isDark ? 'rgba(200,162,75,0.15)' : 'rgba(200,162,75,0.2)'}`,
              boxShadow: isDark
                ? '0 20px 60px rgba(0,0,0,0.5)'
                : '0 20px 60px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Form header */}
            <div
              className="pb-5 mb-6"
              style={{ borderBottom: '1px solid rgba(200,162,75,0.15)' }}
            >
              <h3
                className="font-luxury font-bold"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
              >
                Send an Enquiry
              </h3>
              <p className="text-caption mt-1" style={{ color: isDark ? 'rgba(200,162,75,0.6)' : 'rgba(168,133,46,0.7)' }}>
                We will respond with custom pricing options within 2 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Full Name */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Your full name"
                    style={{
                      ...inputStyle(errors.name),
                      ...(errors.name ? { boxShadow: '0 0 0 3px rgba(239,68,68,0.15)' } : {}),
                    }}
                    onFocus={e => { e.target.style.borderColor = '#c8a24b'; e.target.style.boxShadow = '0 0 0 3px rgba(200,162,75,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.name ? '#ef4444' : (isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)'); e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    {...register('phone', { required: true })}
                    placeholder="9876543210"
                    type="tel"
                    inputMode="tel"
                    style={{
                      ...inputStyle(errors.phone),
                      ...(errors.phone ? { boxShadow: '0 0 0 3px rgba(239,68,68,0.15)' } : {}),
                    }}
                    onFocus={e => { e.target.style.borderColor = '#c8a24b'; e.target.style.boxShadow = '0 0 0 3px rgba(200,162,75,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.phone ? '#ef4444' : (isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)'); e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    {...register('email')}
                    placeholder="your@email.com"
                    type="email"
                    inputMode="email"
                    style={inputStyle(false)}
                    onFocus={e => { e.target.style.borderColor = '#c8a24b'; e.target.style.boxShadow = '0 0 0 3px rgba(200,162,75,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Event Date */}
                <div>
                  <label style={labelStyle}>Event Date *</label>
                  <input
                    {...register('date', { required: true })}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      ...inputStyle(errors.date),
                      ...(errors.date ? { boxShadow: '0 0 0 3px rgba(239,68,68,0.15)' } : {}),
                    }}
                    onFocus={e => { e.target.style.borderColor = '#c8a24b'; e.target.style.boxShadow = '0 0 0 3px rgba(200,162,75,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.date ? '#ef4444' : (isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)'); e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Guests */}
                <div>
                  <label style={labelStyle}>Expected Guests *</label>
                  <input
                    {...register('guests', { required: true })}
                    type="number"
                    inputMode="numeric"
                    placeholder="150"
                    style={{
                      ...inputStyle(errors.guests),
                      ...(errors.guests ? { boxShadow: '0 0 0 3px rgba(239,68,68,0.15)' } : {}),
                    }}
                    onFocus={e => { e.target.style.borderColor = '#c8a24b'; e.target.style.boxShadow = '0 0 0 3px rgba(200,162,75,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.guests ? '#ef4444' : (isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)'); e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label style={labelStyle}>Event Type</label>
                  <select
                    {...register('eventType')}
                    style={inputStyle(false)}
                    onFocus={e => { e.target.style.borderColor = '#c8a24b'; e.target.style.boxShadow = '0 0 0 3px rgba(200,162,75,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)'; e.target.style.boxShadow = 'none'; }}
                  >
                    {EVENT_TYPES.map((et) => <option key={et.value} value={et.value}>{et.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Additional Details</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about food preferences (vegetarian or non-vegetarian), special dishes, service style..."
                  style={{ ...inputStyle(false), resize: 'none', lineHeight: '1.6' }}
                  onFocus={e => { e.target.style.borderColor = '#c8a24b'; e.target.style.boxShadow = '0 0 0 3px rgba(200,162,75,0.15)'; }}
                  onBlur={e => { e.target.style.borderColor = isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 font-bold rounded-xl text-white cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: '0 4px 24px rgba(37,211,102,0.3)',
                  padding: '1rem 2rem',
                  minHeight: '56px',
                  fontSize: '1rem',
                  border: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <SendIcon />
                Send Inquiry via WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
