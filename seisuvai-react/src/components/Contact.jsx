import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useThemeStore } from '../store/useStore';
import { openWhatsApp } from '../utils/whatsapp';
import { COMPANY, EVENT_TYPES, BUDGET_RANGES } from '../data/siteData';

// Availability / Quick check form
export function AvailabilitySection() {
  const { isDark } = useThemeStore();
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

  const onSubmit = (data) => {
    openWhatsApp({ ...data, menuItems: [] });
    reset();
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all ${
      hasError
        ? 'border-red-400 focus:ring-2 focus:ring-red-400/30'
        : isDark
        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
    }`;

  return (
    <section id="quote" className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-orange-50/50'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
            Quick Check
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Check <span className="gradient-text">Availability</span>
          </h2>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Tell us your event date and details — we'll confirm availability and send a quote within 2 hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`p-8 rounded-3xl border ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200 shadow-xl shadow-orange-100'
          }`}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Your Name *</label>
              <input {...register('name', { required: true })} placeholder="Ramesh Kumar" className={inputClass(errors.name)} />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number *</label>
              <input {...register('phone', { required: true })} placeholder="9876543210" type="tel" className={inputClass(errors.phone)} />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Event Date *</label>
              <input {...register('date', { required: true })} type="date" min={new Date().toISOString().split('T')[0]} className={inputClass(errors.date)} />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Event Type</label>
              <select {...register('eventType')} className={inputClass(false)}>
                {EVENT_TYPES.map((et) => <option key={et.value} value={et.value}>{et.label}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>No. of Guests *</label>
              <input {...register('guests', { required: true, min: 10 })} type="number" placeholder="150" className={inputClass(errors.guests)} />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Budget / Plate</label>
              <select {...register('budget')} className={inputClass(false)}>
                {BUDGET_RANGES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all text-base"
          >
            🔍 Check Availability & Get Quote via WhatsApp
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

// Full booking & contact section
export default function Contact() {
  const { isDark } = useThemeStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    openWhatsApp({ ...data, menuItems: [] });
    reset();
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all ${
      hasError
        ? 'border-red-400 focus:ring-2 focus:ring-red-400/30'
        : isDark
        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
    }`;

  return (
    <section
      id="contact"
      className="py-24"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0f0a00, #1a0f00)'
          : 'linear-gradient(135deg, #7c2d12, #1a0a00)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-bold uppercase tracking-widest mb-6">
              Let's Connect
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Book Your <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-300 mb-10 leading-relaxed">
              Tell us about your event and our team will contact you within 2 hours with a personalised quote and availability confirmation.
            </p>

            {/* Contact items */}
            <div className="space-y-4">
              {[
                { icon: '📞', label: 'Call / WhatsApp', value: COMPANY.phone, href: `tel:${COMPANY.phoneRaw}` },
                { icon: '💬', label: 'WhatsApp Chat', value: 'Quick reply within minutes', href: `https://wa.me/${COMPANY.whatsapp}` },
                { icon: '📍', label: 'Our Location', value: COMPANY.address, href: COMPANY.mapsUrl },
                { icon: '📸', label: 'Instagram', value: '@seisuvai_catering_', href: COMPANY.instagram },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/10 transition-all group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{item.label}</div>
                    <div className="text-white font-semibold text-sm group-hover:text-orange-300 transition-colors">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzE2LjciTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Seisuvai Catering Location"
              />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl border ${
              isDark
                ? 'bg-gray-900 border-gray-700'
                : 'bg-white border-white/20 shadow-2xl'
            }`}
          >
            <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Send an Inquiry</h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fill in details and we'll get back within 2 hours.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name *</label>
                  <input {...register('name', { required: true })} placeholder="Your full name" className={inputClass(errors.name)} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone *</label>
                  <input {...register('phone', { required: true })} placeholder="9876543210" type="tel" className={inputClass(errors.phone)} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input {...register('email')} placeholder="your@email.com" type="email" className={inputClass(false)} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Event Date *</label>
                  <input {...register('date', { required: true })} type="date" min={new Date().toISOString().split('T')[0]} className={inputClass(errors.date)} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Guests *</label>
                  <input {...register('guests', { required: true })} type="number" placeholder="~150" className={inputClass(errors.guests)} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Event Type</label>
                  <select {...register('eventType')} className={inputClass(false)}>
                    {EVENT_TYPES.map((et) => <option key={et.value} value={et.value}>{et.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Budget / Plate</label>
                <select {...register('budget')} className={inputClass(false)}>
                  {BUDGET_RANGES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Additional Details</label>
                <textarea
                  {...register('message')}
                  rows={3}
                  placeholder="Special requirements, dietary needs, venue..."
                  className={`${inputClass(false)} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 text-base transition-all"
              >
                📤 Send My Inquiry via WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
