// All site data centralized here for easy updates
import { MENU_DATA } from './menuData';
import { CUSTOM_MENU_VEG, CUSTOM_MENU_NONVEG } from './customMenuData';
import { LIVE_COUNTERS_DATA as LIVE_COUNTERS_REAL } from './liveCountersData';

export const COMPANY = {
  name: 'Seisuvai Catering',
  tagline: 'The Crafted Flavour',
  phone: '+91 97883 13225',
  phoneRaw: '+919788313225',
  whatsapp: '919788313225',
  email: 'seisuvai@gmail.com',
  address: '5/7 Ethiraj Garden Street, Chennai - 600 012',
  mapsUrl: 'https://maps.app.goo.gl/aMj2cG6WjZfRk5GA7?g_st=iw',
  instagram: 'https://www.instagram.com/seisuvai_catering_?igsh=N2pjY21sdmo4MzJq',
  logo: '/images/seisuvai-logo.png',
  googleVerification: 'ul7Poc-GWpgS9nxFdONUgTXglxMZanhIgx6lfUvWVaQ',
};

export const STATS = [
  { value: '500+', label: 'Events Served' },
  { value: '15+', label: 'Years Experience' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '100%', label: 'Hygienic' },
];

// ─── Humanized Services ───────────────────────────────────────
export const SERVICES = [
  {
    id: 'wedding',
    icon: '💍',
    title: 'Weddings',
    description: 'We handle full wedding catering — from the morning breakfast sadhya to the evening dinner. Our team sets up, serves, and cleans up so your family can enjoy the day without worrying about the food.',
    image: '/images/about/wedding.png',
    alt: 'Wedding Catering — Seisuvai',
    cta: 'Book for Wedding',
  },
  {
    id: 'corporate',
    icon: '💼',
    title: 'Corporate Events',
    description: 'We serve office events on time, set up properly, and make sure there is enough food for everyone. Whether it\'s a small team lunch or a 500-person annual day, we handle it professionally.',
    image: '/images/about/corporate.png',
    alt: 'Corporate Catering — Seisuvai',
    cta: 'Book for Event',
  },
  {
    id: 'birthday',
    icon: '🎂',
    title: 'Birthdays & Baby Showers',
    description: 'Good food makes a birthday more memorable. We set up a spread that guests genuinely enjoy — whether it\'s a small family gathering or a big celebration with 200+ people.',
    image: '/images/about/baby-shower-1.png',
    alt: 'Birthday Catering — Seisuvai',
    cta: 'Book for Party',
  },
  {
    id: 'family',
    icon: '🏠',
    title: 'Family Functions',
    description: 'For Seemantham, house warming, puberty function, or any family milestone — we prepare traditional home-style food that feels right for the occasion. Fresh, tasty, and served properly.',
    image: '/images/about/family.png',
    alt: 'Family Function — Seisuvai',
    cta: 'Book for Function',
  },
  {
    id: 'outdoor',
    icon: '👥',
    title: 'Large Scale Events',
    description: 'We regularly cook for 500 to 5000+ guests. We bring our own equipment, serving staff, and do everything on site. You tell us the guest count and we make sure no one goes hungry.',
    image: '/images/about/outdoor.png',
    alt: 'Large Scale Catering — Seisuvai',
    cta: 'Book for Event',
  },
  {
    id: 'live',
    icon: '🔥',
    title: 'Live Food Counters',
    description: 'Add a live dosa counter, chaat station, biryani counter, or mocktail bar to your event. Guests love watching their food being made fresh right in front of them.',
    image: '/images/about/dinner-1.png',
    alt: 'Live Food Counters — Seisuvai',
    cta: 'See Live Counters',
  },
];

// ─── Humanized About Content ─────────────────────────────────
export const ABOUT_CONTENT = {
  tagline: 'Good food, prepared with care, served on time.',
  story: [
    'We started Seisuvai Catering in 2011 because we wanted families in Chennai to have reliable, good-quality catering they could actually trust. Back then, it was just a small team with a big passion for traditional South Indian cooking.',
    'Over the past 15+ years, we have cooked for more than 500 events — weddings, office parties, house warmings, birthdays, and everything in between. Our kitchen uses fresh ingredients every single day, and we still follow the same traditional recipes that made our food popular in the first place.',
    'We are FSSAI certified. Our chefs are experienced. Our staff is trained. And we genuinely care about making your event a success.',
  ],
  promise: 'We won\'t overcharge you, we won\'t be late, and the food will be good. That\'s our commitment to every customer.',
  values: [
    { icon: '🥬', title: 'Fresh Every Day', desc: 'We buy fresh vegetables and ingredients daily. Nothing is carried over from the previous day.' },
    { icon: '👨‍🍳', title: 'Experienced Chefs', desc: 'Our chefs have been cooking traditional South Indian food for over 10 years. They know what good food tastes like.' },
    { icon: '✅', title: 'FSSAI Certified', desc: 'We follow all food safety guidelines. Our kitchen is clean, and our staff practises proper hygiene at every step.' },
    { icon: '⏰', title: 'Always On Time', desc: 'We understand that your event has a schedule. We arrive early, set up quietly, and have everything ready before guests arrive.' },
    { icon: '📋', title: 'Custom Menus', desc: 'You pick exactly what you want. We don\'t force a fixed package. Use our custom menu builder to choose only what your family likes.' },
    { icon: '🤝', title: 'Transparent Pricing', desc: 'We give you a clear quote upfront. No hidden charges. What we quote is what you pay.' },
  ],
  whyUs: [
    { icon: '⭐', stat: '4.9★', label: 'Google Rating', sub: 'From 100+ verified reviews' },
    { icon: '🎉', stat: '500+', label: 'Events Catered', sub: 'Weddings, corporates, birthdays' },
    { icon: '📅', stat: '15+', label: 'Years in Chennai', sub: 'Trusted by local families' },
    { icon: '🛡️', stat: 'FSSAI', label: 'Food Safety Certified', sub: 'Licensed & inspected kitchen' },
  ],
};

export const CUSTOM_MENU_VEG_DATA = CUSTOM_MENU_VEG;
export const CUSTOM_MENU_NONVEG_DATA = CUSTOM_MENU_NONVEG;
export const MENU_CATEGORIES = CUSTOM_MENU_VEG;

// Group the 16 extracted menus by category for V2 tab mapping
export const STANDARD_MENUS = MENU_DATA.cateringMenus.reduce((acc, menu) => {
  const cat = menu.category;
  if (!acc[cat]) {
    acc[cat] = [];
  }
  
  const flatItems = menu.sections.reduce((items, section) => {
    return [...items, ...section.items];
  }, []);

  const popular = MENU_DATA.highlightedMenus.some(hm => hm.menuId === menu.key);

  acc[cat].push({
    id: menu.id,
    name: menu.subtitle,
    mainTitle: menu.mainTitle,
    type: menu.type,
    popular,
    items: flatItems,
    sections: menu.sections,
    image: menu.image
  });
  
  return acc;
}, {});

export const LIVE_COUNTERS_DATA = LIVE_COUNTERS_REAL;

// ─── Gallery Images (with category tags for filter UI) ────────
export const GALLERY_IMAGES = [
  { id: 1, src: '/images/gallery-1-south-indian.png', alt: 'South Indian Banquet Setup', label: 'South Indian Banquet', category: 'wedding', large: true },
  { id: 2, src: '/images/gallery-2-south-indian.png', alt: 'Traditional Sadhya Setup', label: 'Traditional Sadhya', category: 'wedding' },
  { id: 3, src: '/images/gallery-3.png', alt: 'Wedding Catering Spread', label: 'Wedding Spread', category: 'wedding' },
  { id: 4, src: '/images/gallery-4.png', alt: 'Elegant Event Setup', label: 'Elegant Setup', category: 'corporate' },
  { id: 5, src: '/images/dinner-2.png', alt: 'Dinner Service', label: 'Dinner Service', category: 'food' },
  { id: 6, src: '/images/dinner-3.png', alt: 'Special Menu Spread', label: 'Special Menu', category: 'food' },
  { id: 7, src: '/images/dinner-4.png', alt: 'Grand Event Catering', label: 'Grand Event', category: 'birthday' },
  { id: 8, src: '/images/dinner-5.png', alt: 'Live Food Counter', label: 'Live Counter', category: 'live' },
];

// ─── Gallery filter categories ────────────────────────────────
export const GALLERY_FILTERS = [
  { value: 'all', label: 'All Photos' },
  { value: 'wedding', label: 'Weddings' },
  { value: 'birthday', label: 'Birthdays' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'food', label: 'Food' },
  { value: 'live', label: 'Live Counters' },
];

// ─── Testimonials ─────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    event: 'Wedding — 400 Guests',
    initials: 'RK',
    rating: 5,
    text: 'Seisuvai Catering handled our entire wedding — from morning breakfast to dinner. The food was really good and every guest enjoyed the sadhya. The team was professional and everything was on time.',
    featured: false,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    event: 'Corporate Event — 250 Guests',
    initials: 'PS',
    rating: 5,
    text: 'We hired Seisuvai for our company\'s annual day. They set up everything on time and the live dosa counter was a big hit with the employees. Everyone kept talking about it.',
    featured: true,
  },
  {
    id: 3,
    name: 'Anitha Mohan',
    event: 'Birthday Celebration — 120 Guests',
    initials: 'AM',
    rating: 5,
    text: 'Best catering service in Chennai. They took care of everything for my mother\'s 60th birthday. The ghee pongal and biryani were really good — everyone asked for seconds. Will definitely book again.',
    featured: false,
  },
  {
    id: 4,
    name: 'Suresh Nair',
    event: 'House Warming — 80 Guests',
    initials: 'SN',
    rating: 4.5,
    text: 'Very good value for money. The food was fresh, staff were polite, and they cleaned up after the function without any fuss. My family was very happy with everything.',
    featured: false,
  },
  {
    id: 5,
    name: 'Meena Venkatesh',
    event: 'Multiple Events — Loyal Customer',
    initials: 'MV',
    rating: 5,
    text: 'We have used Seisuvai 3 times now for different events — and every time the food is consistently good. The team is flexible and easy to work with.',
    featured: false,
  },
  {
    id: 6,
    name: 'Karthik Raj',
    event: 'Family Function — 200 Guests',
    initials: 'KR',
    rating: 5,
    text: 'The custom menu builder is really helpful. I selected exactly what my family likes and they delivered it perfectly. The Mutton Biryani live counter was the highlight of the evening.',
    featured: true,
  },
];

// ─── FAQs ─────────────────────────────────────────────────────
export const FAQS = [
  {
    q: 'How many guests is the minimum for catering?',
    a: 'Our minimum is 50 guests for the Economy plan. For Premium and Royal plans, the minimum is 100 guests. We can handle up to 5000+ guests for large events.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'For smaller events, 2–3 weeks notice is usually enough. For weddings or events with 300+ guests, we recommend booking 1–3 months in advance so we can plan properly.',
  },
  {
    q: 'Do you have both Veg and Non-Veg options?',
    a: 'Yes. We have a wide range of both. You can choose from our ready-made packages or build your own menu using our Custom Menu Builder.',
  },
  {
    q: 'Are you FSSAI certified?',
    a: 'Yes. Seisuvai Catering is FSSAI certified. We follow proper food safety and hygiene at every stage — from preparation to serving.',
  },
  {
    q: 'Do you bring serving staff and equipment?',
    a: 'Yes. All our packages include trained serving staff. We also bring chafing dishes, serving vessels, tables, and other necessary equipment.',
  },
  {
    q: 'What are your payment terms?',
    a: 'We ask for a 30–50% advance to confirm the booking. The remaining amount is due on the event day. We accept UPI, bank transfer, and cash.',
  },
  {
    q: 'Can you cater to outdoor or destination events?',
    a: 'Yes. We cater to outdoor venues, marriage halls, open grounds, and locations within Chennai and nearby areas.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Fill out our contact form, call us at +91 9788313225, or WhatsApp us. We will send you a quote within 2 hours.',
  },
];

// ─── Event Types (form dropdown) ─────────────────────────────
export const EVENT_TYPES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'birthday', label: 'Birthday / Party' },
  { value: 'family', label: 'Family Function' },
  { value: 'baby-shower', label: 'Baby Shower' },
  { value: 'house-warming', label: 'House Warming' },
  { value: 'other', label: 'Other' },
];
