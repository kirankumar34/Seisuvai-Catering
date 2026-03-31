import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, MessageCircle, Trash2 } from 'lucide-react';
import { useThemeStore, useMenuStore } from '../store/useStore';
import { openWhatsApp } from '../utils/whatsapp';
import { EVENT_TYPES, BUDGET_RANGES } from '../data/siteData';

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

  const onSubmit = (data) => {
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
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
              isDark ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-inherit rounded-t-3xl">
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  📩 Send Enquiry via WhatsApp
                </h2>
                <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  We'll reply within minutes!
                </p>
              </div>
              <button
                onClick={closeEnquiry}
                className={`p-2 rounded-xl transition-colors ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Selected Items / Package Summary */}
              {menuType === 'Standard' && selectedPackage && (
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-orange-50'}`}>
                  <div className={`text-sm font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    📦 Selected Package: {selectedPackage.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-orange-500/15 text-orange-700 dark:text-orange-300 text-xs font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(menuType === 'Custom' || menuType === 'Live Counters') && selectedItems.length > 0 && (
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-orange-50'}`}>
                  <div className={`text-sm font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    🍛 Selected {menuType === 'Live Counters' ? 'Counters' : 'Menu Items'} ({selectedItems.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/15 text-orange-700 dark:text-orange-300 text-xs font-semibold"
                      >
                        {item.name}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="e.g., Ramesh Kumar"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                        errors.name
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400/30'
                          : isDark
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number *
                    </label>
                    <input
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit number' },
                      })}
                      placeholder="e.g., 9876543210"
                      type="tel"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                        errors.phone
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400/30'
                          : isDark
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Event Type *
                    </label>
                    <select
                      {...register('eventType', { required: 'Please select event type' })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                        isDark
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                    >
                      {EVENT_TYPES.map((et) => (
                        <option key={et.value} value={et.value}>{et.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      No. of Guests *
                    </label>
                    <input
                      {...register('guests', {
                        required: 'Guest count is required',
                        min: { value: 10, message: 'Minimum 10 guests' },
                      })}
                      type="number"
                      placeholder="e.g., 150"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                        errors.guests
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400/30'
                          : isDark
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                    />
                    {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests.message}</p>}
                  </div>

                  {/* Date */}
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Event Date *
                    </label>
                    <input
                      {...register('date', { required: 'Event date is required' })}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                        errors.date
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400/30'
                          : isDark
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                    />
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Budget / Plate
                    </label>
                    <select
                      {...register('budget')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all ${
                        isDark
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                    >
                      {BUDGET_RANGES.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Additional Notes
                  </label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Any special requirements, dietary needs, venue details..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm resize-none transition-all ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                    }`}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl flex items-center justify-center gap-3 text-base shadow-lg shadow-green-500/25 transition-all"
                >
                  <MessageCircle size={20} />
                  Send Enquiry on WhatsApp
                </motion.button>

                <p className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
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
