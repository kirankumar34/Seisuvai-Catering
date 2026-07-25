import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, MessageCircle, Trash2 } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { openWhatsApp } from '../utils/whatsapp';
import { submitEnquiry } from '../utils/api';
import { EVENT_TYPES } from '../data/siteData';

export default function EnquiryModal() {
  const { isDark } = useThemeStore();
  const { isEnquiryOpen, closeEnquiry, selectedItems, clearItems, prefilledEvent, removeItem, menuType, selectedPackage } = useMenuStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { eventType: prefilledEvent || 'wedding' },
  });

  // Reset form when opened
  useEffect(() => {
    if (isEnquiryOpen) {
      reset({ eventType: prefilledEvent || 'wedding' });
    }
  }, [isEnquiryOpen, prefilledEvent, reset]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeEnquiry(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeEnquiry]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isEnquiryOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isEnquiryOpen]);

  const onSubmit = async (data) => {
    let selectedItemsList = [];
    if (menuType === 'Standard' && selectedPackage) {
      selectedItemsList = [selectedPackage.name];
    } else if (menuType === 'Custom' || menuType === 'Live Counters') {
      selectedItemsList = selectedItems.map(item => item.name);
    }

    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      enquiryType: menuType === 'Live Counters' ? 'live_stall' : menuType === 'Custom' ? 'custom_menu' : 'booking',
      selectedItems: selectedItemsList,
      paxCount: parseInt(data.guests, 10),
      message: `Event: ${data.eventType}, Date: ${data.date}. ${data.message || ''}`
    };

    await submitEnquiry(payload);

    openWhatsApp({
      ...data,
      menuItems: selectedItems,
      menuType,
      selectedPackage,
    });

    clearItems();
    closeEnquiry();
    reset();
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.8125rem 1rem',
    borderRadius: '0.75rem',
    border: hasError
      ? '1.5px solid #ef4444'
      : isDark ? '1.5px solid rgba(200,162,75,0.2)' : '1.5px solid rgba(200,162,75,0.25)',
    background: isDark ? 'rgba(20,18,12,0.9)' : 'rgba(253,248,240,0.8)',
    color: isDark ? '#f0ead8' : '#1a1a1a',
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.25s ease',
    minHeight: '50px',
    outline: 'none',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.4rem',
    color: isDark ? 'rgba(200,180,140,0.7)' : 'rgba(100,75,40,0.7)',
  };

  const focusInput = (e) => {
    e.target.style.borderColor = '#c8a24b';
    e.target.style.boxShadow = '0 0 0 3px rgba(200,162,75,0.15)';
  };
  const blurInput = (e, hasError) => {
    e.target.style.borderColor = hasError ? '#ef4444' : (isDark ? 'rgba(200,162,75,0.2)' : 'rgba(200,162,75,0.25)');
    e.target.style.boxShadow = 'none';
  };

  return (
    <AnimatePresence>
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnquiry}
            className="absolute inset-0 modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
            style={{
              background: isDark ? '#111111' : '#fff',
              border: '1.5px solid rgba(200,162,75,0.2)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Gold top accent */}
            <div
              className="h-[2px] w-full rounded-t-3xl"
              style={{ background: 'linear-gradient(90deg, transparent, #c8a24b, #e6c878, #c8a24b, transparent)' }}
            />

            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 rounded-t-3xl"
              style={{
                background: isDark ? 'rgba(17,17,17,0.95)' : 'rgba(255,255,255,0.95)',
                borderBottom: '1px solid rgba(200,162,75,0.12)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div>
                <h2
                  className="font-luxury font-bold"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: isDark ? '#f0ead8' : '#1a1a1a' }}
                >
                  📩 Send Enquiry via WhatsApp
                </h2>
                <p className="text-xs mt-0.5" style={{ color: isDark ? 'rgba(200,162,75,0.6)' : 'rgba(168,133,46,0.7)' }}>
                  We'll reply within minutes!
                </p>
              </div>
              <button
                onClick={closeEnquiry}
                className="p-2 rounded-xl transition-colors"
                style={{ color: isDark ? 'rgba(200,180,140,0.6)' : 'rgba(100,80,50,0.6)' }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* Standard package summary */}
              {menuType === 'Standard' && selectedPackage && (
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: isDark ? 'rgba(200,162,75,0.08)' : 'rgba(200,162,75,0.06)',
                    border: '1px solid rgba(200,162,75,0.25)',
                  }}
                >
                  <div className="text-sm font-bold mb-3" style={{ color: isDark ? '#f0ead8' : '#1a1a1a' }}>
                    📦 Selected Package: {selectedPackage.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{
                          background: isDark ? 'rgba(200,162,75,0.12)' : 'rgba(200,162,75,0.1)',
                          color: isDark ? '#e6c878' : '#a8852e',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom/Live items summary */}
              {(menuType === 'Custom' || menuType === 'Live Counters') && selectedItems.length > 0 && (
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: isDark ? 'rgba(200,162,75,0.08)' : 'rgba(200,162,75,0.06)',
                    border: '1px solid rgba(200,162,75,0.25)',
                  }}
                >
                  <div className="text-sm font-bold mb-3" style={{ color: isDark ? '#f0ead8' : '#1a1a1a' }}>
                    🍛 Selected {menuType === 'Live Counters' ? 'Counters' : 'Menu Items'} ({selectedItems.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{
                          background: isDark ? 'rgba(200,162,75,0.12)' : 'rgba(200,162,75,0.1)',
                          color: isDark ? '#e6c878' : '#a8852e',
                        }}
                      >
                        {item.name}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="hover:text-red-500 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">

                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="e.g., Ramesh Kumar"
                      style={inputStyle(errors.name)}
                      onFocus={focusInput}
                      onBlur={e => blurInput(e, errors.name)}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit number' },
                      })}
                      placeholder="e.g., 9876543210"
                      type="tel"
                      inputMode="tel"
                      style={inputStyle(errors.phone)}
                      onFocus={focusInput}
                      onBlur={e => blurInput(e, errors.phone)}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Event Type */}
                  <div>
                    <label style={labelStyle}>Event Type *</label>
                    <select
                      {...register('eventType', { required: 'Please select event type' })}
                      style={inputStyle(false)}
                      onFocus={focusInput}
                      onBlur={e => blurInput(e, false)}
                    >
                      {EVENT_TYPES.map((et) => (
                        <option key={et.value} value={et.value}>{et.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label style={labelStyle}>No. of Guests *</label>
                    <input
                      {...register('guests', {
                        required: 'Guest count is required',
                        min: { value: 10, message: 'Minimum 10 guests' },
                      })}
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g., 150"
                      style={inputStyle(errors.guests)}
                      onFocus={focusInput}
                      onBlur={e => blurInput(e, errors.guests)}
                    />
                    {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests.message}</p>}
                  </div>

                  {/* Date */}
                  <div className="sm:col-span-2">
                    <label style={labelStyle}>Event Date *</label>
                    <input
                      {...register('date', { required: 'Event date is required' })}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      style={inputStyle(errors.date)}
                      onFocus={focusInput}
                      onBlur={e => blurInput(e, errors.date)}
                    />
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Any special requirements, dietary needs, venue details..."
                    style={{ ...inputStyle(false), resize: 'none', lineHeight: '1.6' }}
                    onFocus={focusInput}
                    onBlur={e => blurInput(e, false)}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 font-bold rounded-xl text-white"
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    boxShadow: '0 4px 24px rgba(37,211,102,0.3)',
                    padding: '1rem 2rem',
                    minHeight: '56px',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <MessageCircle size={20} />
                  Send Enquiry on WhatsApp
                </motion.button>

                <p className="text-xs text-center" style={{ color: isDark ? 'rgba(180,160,120,0.5)' : 'rgba(120,90,50,0.5)' }}>
                  You'll be redirected to WhatsApp with a pre-filled message. We respond within 2 hours! 🚀
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
