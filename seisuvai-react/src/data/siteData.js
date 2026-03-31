// All site data centralized here for easy updates

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
  { value: '₹250', label: 'Starting / Plate' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '100%', label: 'Hygienic' },
];

export const SERVICES = [
  {
    id: 'wedding',
    icon: '💍',
    title: 'Royal Weddings',
    description: 'Grand multi-course banquets with live counters, sadhya setups, and royal hospitality for your most memorable day.',
    image: '/images/wedding.png',
    alt: 'Wedding Catering — Seisuvai',
    cta: 'Book for Wedding',
  },
  {
    id: 'corporate',
    icon: '💼',
    title: 'Corporate Events',
    description: 'Professional, punctual catering for business meets, product launches, office parties, and conferences.',
    image: '/images/corporate.png',
    alt: 'Corporate Catering — Seisuvai',
    cta: 'Book for Event',
  },
  {
    id: 'birthday',
    icon: '🎂',
    title: 'Birthdays & Baby Showers',
    description: 'Heartwarming flavors and joyful spreads to make every birthday, anniversary, and baby shower truly special.',
    image: '/images/baby-shower-1.png',
    alt: 'Birthday Catering — Seisuvai',
    cta: 'Book for Party',
  },
  {
    id: 'family',
    icon: '🏠',
    title: 'Family Functions',
    description: 'Authentic home-style catering for Seemantham, Puberty functions, House Warming, and all family milestones.',
    image: '/images/family.png',
    alt: 'Family Function — Seisuvai',
    cta: 'Book for Function',
  },
  {
    id: 'outdoor',
    icon: '👥',
    title: 'Large Scale Events',
    description: 'Expert logistics, skilled staff, and scalable operations for 500 to 5000+ guests with seamless delivery.',
    image: '/images/outdoor.png',
    alt: 'Large Scale Catering — Seisuvai',
    cta: 'Book for Event',
  },
  {
    id: 'live',
    icon: '🔥',
    title: 'Live Food Counters',
    description: 'From Dosa & Chaat to Biryani live counters — wow your guests with freshly prepared interactive cooking stations.',
    image: '/images/dinner-1.png',
    alt: 'Live Food Counters — Seisuvai',
    cta: 'Explore Live Stalls',
  },
];

export const MENU_CATEGORIES = [
  {
    id: 'starters',
    label: 'Starters',
    icon: '🥗',
    items: [
      { id: 's1', name: 'Veg Spring Roll', tag: 'Veg', price: '₹80/plate', image: '/images/gallery-1.png' },
      { id: 's2', name: 'Shahi Malai Sandwich', tag: 'Veg', price: '₹90/plate', image: '/images/shahi_malai_sandwich.png' },
      { id: 's3', name: 'Chicken 65', tag: 'Non-Veg', price: '₹120/plate', image: '/images/menu-1.png' },
      { id: 's4', name: 'Crispy Paneer Tikka', tag: 'Veg', price: '₹110/plate', image: '/images/menu-2.png' },
      { id: 's5', name: 'Prawn Fry', tag: 'Non-Veg', price: '₹150/plate', image: '/images/gallery-2.png' },
    ],
  },
  {
    id: 'maincourse',
    label: 'Main Course',
    icon: '🍛',
    items: [
      { id: 'm1', name: 'Nizam Mutton Biryani', tag: 'Non-Veg', price: '₹200/plate', image: '/images/nizam_mutton_biryani.png' },
      { id: 'm2', name: 'Imperial Ghee Pongal', tag: 'Veg', price: '₹120/plate', image: '/images/imperial_ghee_pongal.png' },
      { id: 'm3', name: 'Grand Sadhya Spread', tag: 'Veg', price: '₹250/plate', image: '/images/gallery-2-south-indian.png' },
      { id: 'm4', name: 'Chettinad Chicken Curry', tag: 'Non-Veg', price: '₹160/plate', image: '/images/menu-1-south-indian.png' },
      { id: 'm5', name: 'Veg Kothu Parotta', tag: 'Veg', price: '₹110/plate', image: '/images/menu-3.png' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    icon: '🍮',
    items: [
      { id: 'd1', name: 'Kesari Bath', tag: 'Veg', price: '₹60/plate', image: '/images/gallery-3.png' },
      { id: 'd2', name: 'Gulab Jamun', tag: 'Veg', price: '₹70/plate', image: '/images/gallery-4.png' },
      { id: 'd3', name: 'Payasam', tag: 'Veg', price: '₹80/plate', image: '/images/dinner-2.png' },
      { id: 'd4', name: 'Rasgulla', tag: 'Veg', price: '₹65/plate', image: '/images/dinner-3.png' },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    icon: '🥤',
    items: [
      { id: 'dr1', name: 'Filter Coffee', tag: 'Veg', price: '₹30/cup', image: '/images/dinner-4.png' },
      { id: 'dr2', name: 'Masala Chai', tag: 'Veg', price: '₹25/cup', image: '/images/dinner-5.png' },
      { id: 'dr3', name: 'Rose Sherbet', tag: 'Veg', price: '₹40/glass', image: '/images/menu-3-south-indian.png' },
      { id: 'dr4', name: 'Fresh Lime Soda', tag: 'Veg', price: '₹35/glass', image: '/images/menu-2-south-indian.png' },
    ],
  },
];

export const STANDARD_MENUS = {
  Breakfast: [
    {
      id: 'bf-veg-1',
      name: 'Classic South Indian Breakfast',
      type: 'Veg',
      price: '₹150',
      popular: true,
      items: ['Idli', 'Medu Vada', 'Pongal', 'Mini Masala Dosa', 'Sambar', 'Coconut Chutney', 'Tomato Chutney', 'Filter Coffee'],
    },
    {
      id: 'bf-nonveg-1',
      name: 'Special Non-Veg Breakfast',
      type: 'Non-Veg',
      price: '₹220',
      popular: false,
      items: ['Idiyappam', 'Aapam', 'Mutton Paya', 'Chicken Stew', 'Boiled Egg', 'Filter Coffee'],
    }
  ],
  Lunch: [
    {
      id: 'lu-veg-1',
      name: 'Traditional Banana Leaf Meal',
      type: 'Veg',
      price: '₹250',
      popular: true,
      items: ['White Rice', 'Sambar', 'Rasam', 'Kootu', 'Poriyal', 'Aviyal', 'Payasam', 'Appalam', 'Pickle', 'Buttermilk'],
    },
    {
      id: 'lu-nonveg-1',
      name: 'Chettinad Non-Veg Feast',
      type: 'Non-Veg',
      price: '₹350',
      popular: true,
      items: ['Chicken Biryani', 'Mutton Chukka', 'Fish Fry', 'White Rice', 'Chicken Kulambu', 'Rasam', 'Curd', 'Dessert'],
    }
  ],
  Dinner: [
    {
      id: 'dn-veg-1',
      name: 'Light Veg Dinner / Tiffin',
      type: 'Veg',
      price: '₹180',
      popular: false,
      items: ['Chappati', 'Veg Kurma', 'Idiyappam', 'Coconut Milk', 'Mini Dosa', 'Onion Raita', 'Sweet Kesari'],
    },
    {
      id: 'dn-nonveg-1',
      name: 'Grand Non-Veg Dinner',
      type: 'Non-Veg',
      price: '₹400',
      popular: true,
      items: ['Mutton Biryani', 'Grill Chicken', 'Parotta', 'Mutton Salna', 'Chicken 65', 'Bread Halwa', 'Ice Cream'],
    }
  ]
};

export const LIVE_COUNTERS_DATA = [
  {
    id: 'lc-1',
    name: 'Live Dosa Station',
    description: 'Crispy hot dosas served with 3 types of chutneys and sambar. Varieties: Masala, Podi, Onion, Ghee Roast.',
    icon: '🥞',
    tag: 'Veg'
  },
  {
    id: 'lc-2',
    name: 'Delhi Chaat Counter',
    description: 'Pani Puri, Bhel Puri, Sev Puri, and Aloo Tikki prepared fresh with sweet and spicy chutneys.',
    icon: '🍘',
    tag: 'Veg'
  },
  {
    id: 'lc-3',
    name: 'Tandoori & BBQ Station',
    description: 'Live grilling of Chicken Tikka, Malai Kebab, Paneer Tikka, and Fish BBQ.',
    icon: '🍢',
    tag: 'Both'
  },
  {
    id: 'lc-4',
    name: 'Live Pasta & Noodles',
    description: 'Custom made Pasta (White/Red sauce) and Hakka Noodles tossed with fresh veggies & sauces.',
    icon: '🍝',
    tag: 'Veg'
  },
  {
    id: 'lc-5',
    name: 'Fresh Juice & Mocktail Bar',
    description: 'Refreshing welcome drinks, fresh fruit juices, and custom mocktails mixed live.',
    icon: '🍹',
    tag: 'Veg'
  },
  {
    id: 'lc-6',
    name: 'Jalebi & Rabdi Counter',
    description: 'Hot crispy jalebis fried live and served with thick creamy rabdi.',
    icon: '🍯',
    tag: 'Veg'
  }
];

export const PRICING_PLANS = [
  {
    id: 'essential',
    icon: '🌿',
    name: 'Essential',
    price: '₹250',
    unit: '/ plate',
    tagline: 'Perfect for small family gatherings',
    featured: false,
    features: [
      '5–8 Course Meal',
      'Veg or Non-Veg',
      'Basic Setup',
      'Serving Staff Included',
      'Minimum 50 guests',
    ],
  },
  {
    id: 'premium',
    icon: '👑',
    name: 'Premium',
    price: '₹400',
    unit: '/ plate',
    tagline: 'Ideal for weddings & big functions',
    featured: true,
    badge: 'Most Popular',
    features: [
      '12–15 Course Sadhya',
      'Veg + Non-Veg Combo',
      '1 Live Counter',
      'Decorated Setup',
      'Dedicated Coordinator',
      'Minimum 100 guests',
    ],
  },
  {
    id: 'royal',
    icon: '💎',
    name: 'Royal',
    price: '₹600+',
    unit: '/ plate',
    tagline: 'Grand events & large-scale banquets',
    featured: false,
    features: [
      'Full Sadhya + Grand Menu',
      'Multiple Live Counters',
      'Premium Decor Setup',
      'Full Event Coordination',
      'Custom Menu Building',
      '500–5000+ guests',
    ],
  },
];

export const GALLERY_IMAGES = [
  { id: 1, src: '/images/gallery-1-south-indian.png', alt: 'South Indian Banquet Setup', label: 'South Indian Banquet', large: true },
  { id: 2, src: '/images/gallery-2-south-indian.png', alt: 'Traditional Sadhya', label: 'Traditional Sadhya' },
  { id: 3, src: '/images/gallery-3.png', alt: 'Wedding Catering', label: 'Wedding Spread' },
  { id: 4, src: '/images/gallery-4.png', alt: 'Event Setup', label: 'Elegant Setup' },
  { id: 5, src: '/images/dinner-2.png', alt: 'Dinner Service', label: 'Dinner Service' },
  { id: 6, src: '/images/dinner-3.png', alt: 'Special Menu', label: 'Special Menu' },
  { id: 7, src: '/images/dinner-4.png', alt: 'Grand Event', label: 'Grand Event' },
  { id: 8, src: '/images/dinner-5.png', alt: 'Live Counter', label: 'Live Counter' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    event: 'Wedding — 400 Guests',
    initials: 'RK',
    rating: 5,
    text: 'Seisuvai Catering made our wedding truly unforgettable. The food was absolutely divine — every guest complimented the sadhya. Highly professional team!',
    featured: false,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    event: 'Corporate Event — 250 Guests',
    initials: 'PS',
    rating: 5,
    text: 'We hired Seisuvai for our company\'s annual day and the response was phenomenal. On-time, perfectly organised, and the live dosa counter was a huge hit with 250 employees!',
    featured: true,
  },
  {
    id: 3,
    name: 'Anitha Mohan',
    event: 'Birthday Celebration — 120 Guests',
    initials: 'AM',
    rating: 5,
    text: 'Best catering service in Chennai! They handled everything for my mother\'s 60th birthday. The ghee pongal and biryani were absolutely restaurant-quality. Will book again!',
    featured: false,
  },
  {
    id: 4,
    name: 'Suresh Nair',
    event: 'House Warming — 80 Guests',
    initials: 'SN',
    rating: 4.5,
    text: 'Exceptional value for money. Our house warming went beautifully — the food was fresh, staff were polite, and cleanup was spotless. Very satisfied!',
    featured: false,
  },
  {
    id: 5,
    name: 'Meena Venkatesh',
    event: 'Multiple Events — Loyal Customer',
    initials: 'MV',
    rating: 5,
    text: 'We\'ve used Seisuvai 3 times now for different events — and every time they exceed expectations. The team is polite, flexible, and the food is consistently amazing.',
    featured: false,
  },
  {
    id: 6,
    name: 'Karthik Raj',
    event: 'Family Function — 200 Guests',
    initials: 'KR',
    rating: 5,
    text: 'The custom menu builder is a game-changer! I curated exactly what my family loves and Seisuvai delivered it perfectly. The Mutton Biryani live counter was a showstopper!',
    featured: false,
  },
];

export const FAQS = [
  {
    q: 'What is the minimum guest count for catering?',
    a: 'Our minimum guest count is 50 for the Essential plan. For Premium and Royal plans, the minimum is 100 guests. We can accommodate up to 5000+ guests for large-scale events.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 2–4 weeks in advance for smaller events and 1–3 months for weddings or large events to ensure availability and proper planning.',
  },
  {
    q: 'Do you provide both Veg and Non-Veg options?',
    a: 'Yes! We offer a wide range of both Veg and Non-Veg menus. Choose from standard packages or use our Custom Menu Selector to create your perfect combination.',
  },
  {
    q: 'Are you FSSAI certified?',
    a: 'Yes. Seisuvai Catering is FSSAI certified and follows strict food safety and hygiene standards at every stage — from preparation to serving.',
  },
  {
    q: 'Do you provide serving staff and equipment?',
    a: 'Absolutely! All packages include trained serving staff. We also bring all necessary equipment — chafing dishes, serving vessels, tables, and more.',
  },
  {
    q: 'What are your payment terms?',
    a: 'We require a 30–50% advance to confirm the booking, with the balance due on the event day. We accept UPI, bank transfer, and cash.',
  },
  {
    q: 'Can you handle outdoor or destination events?',
    a: 'Yes! We cater to outdoor venues, marriage halls, open grounds, and destination events within Chennai and surrounding areas.',
  },
  {
    q: 'How do I get a custom quote?',
    a: 'Fill out our booking form, call us at +91 9788313225, or WhatsApp us directly. We\'ll respond within 2 hours with a personalised quote.',
  },
];

export const EVENT_TYPES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'birthday', label: 'Birthday / Party' },
  { value: 'family', label: 'Family Function' },
  { value: 'baby-shower', label: 'Baby Shower' },
  { value: 'house-warming', label: 'House Warming' },
  { value: 'other', label: 'Other' },
];

export const BUDGET_RANGES = [
  { value: '250-350', label: '₹250 – ₹350 / plate' },
  { value: '350-500', label: '₹350 – ₹500 / plate' },
  { value: '500-700', label: '₹500 – ₹700 / plate' },
  { value: '700+', label: '₹700+ / plate (Premium)' },
];
