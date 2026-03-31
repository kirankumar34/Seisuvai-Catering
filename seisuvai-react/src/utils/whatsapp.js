// WhatsApp integration utility
const WHATSAPP_NUMBER = '919788313225';

export const buildWhatsAppMessage = ({ name, phone, eventType, guests, date, menuItems, budget, message, menuType, selectedPackage }) => {
  let menuText = '';

  if (menuType === 'Standard' && selectedPackage) {
    menuText = `[Standard Package] ${selectedPackage.name}\n${selectedPackage.items.map((i) => `• ${i}`).join('\n')}`;
  } else if (menuType === 'Custom' || menuType === 'Live Counters') {
    menuText = menuItems && menuItems.length > 0
      ? menuItems.map((i) => `• ${i.name}`).join('\n')
      : 'To be discussed';
  } else {
    menuText = menuItems && menuItems.length > 0
      ? menuItems.map((i) => `• ${i.name}`).join('\n')
      : 'To be discussed';
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : 'To be confirmed';

  const text = `
🍽️ *Seisuvai Catering — Enquiry*
━━━━━━━━━━━━━━━━━━━

👤 *Name:* ${name || 'Not provided'}
📞 *Phone:* ${phone || 'Not provided'}
🎉 *Event Type:* ${eventType || 'Not specified'}
👥 *Guests:* ${guests || 'Not specified'}
📅 *Event Date:* ${formattedDate}
💰 *Budget:* ${budget ? `₹${budget}/plate` : 'To be discussed'}

🍛 *Selected Menu (${menuType || 'Custom'}):*
${menuText}

${message ? `📝 *Additional Notes:*\n${message}` : ''}

━━━━━━━━━━━━━━━━━━━
Hello! I am interested in catering service. Please get back to me with availability and a quote. Thank you!
  `.trim();

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const openWhatsApp = (formData) => {
  const url = buildWhatsAppMessage(formData);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const quickWhatsApp = () => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank', 'noopener,noreferrer');
};
