# ⚡ Seisuvai Catering — React Frontend Application

> Modern, ultra-fast frontend built with React 19, Vite 8, Tailwind CSS v4, Zustand, and Three.js.

---

## 🎨 Highlights & Architecture

- **React 19 & Vite 8**: High-speed Hot Module Replacement (HMR) and optimized build chunks.
- **Tailwind CSS v4**: Utility-first styling with a luxury South Indian **Black & Gold Palette** (`#c8a24b` accents, `#1a1a1a` dark backgrounds).
- **Zustand State Store (`store/useStore.js`)**:
  - `useThemeStore`: Dark/Light luxury theme toggle.
  - `useMenuStore`: Cart items, custom menu selections, modal visibility, and mobile dietary filters (`Veg` vs `Non-Veg`).
- **3D Hero WebGL (`components/hero/`)**:
  - `HeroScene3D.jsx`: Interactive Three.js brass handi, particle steam, and floating spices on desktop viewports (`≥1024px`).
  - `HeroMobileVisual.jsx`: CSS-animated lightweight alternative for mobile screens (`<1024px`).
- **Unit Tested with Vitest**:
  - 100% test coverage on menu filtering, custom menu builder logic, modal actions, and API fallback utilities.

---

## 📁 Component Organization

```
seisuvai-react/src/
├── components/
│   ├── hero/                  # HeroScene3D & HeroMobileVisual
│   ├── menu/                  # StandardMenu, CustomMenu, LiveCounters, DietaryToggle, MenuDetailModal
│   ├── Navbar.jsx             # Responsive Navigation with Sticky Blur
│   ├── Footer.jsx             # Footer with Contact Info & Brand Story
│   ├── EnquiryModal.jsx       # Global Catering Inquiry Popup
│   └── StickyActions.jsx      # Mobile Quick Call / WhatsApp Bar
├── data/
│   ├── siteData.js            # General Site Content & Standard Packages
│   ├── customMenuData.js      # Categorized Custom Menu Items (Veg & Non-Veg)
│   └── liveCountersData.js    # Interactive Live Counter Stalls
├── pages/
│   └── HomePage.jsx           # Main Landing Page
├── sections/
│   ├── Hero.jsx               # Top Hero Banner Section
│   ├── About.jsx              # Brand Story & Services
│   ├── MenusSection.jsx       # Menu Showcase Tabs
│   └── Testimonials.jsx       # Customer Reviews
├── store/
│   └── useStore.js            # Zustand Global State
└── utils/
    ├── api.js                 # Axios REST Client & Fallback Handler
    └── whatsapp.js            # WhatsApp Quote Generator
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Vitest test suite
npx vitest run

# Production build
npm run build
```

---

## 🧪 Unit Tests

Run tests using Vitest:
```bash
npx vitest run
```

Tests cover:
- `CustomMenu.test.jsx`: Tab switching between Veg/Non-Veg categories.
- `LiveCounters.test.jsx`: Interactive stall selection and tray updates.
- `StandardMenu.test.jsx`: Package inspection modal triggers.
- `MobileDietaryToggle.test.jsx`: Mobile sticky toggle behavior.
- `api.test.js`: Backend API failure catching and WhatsApp fallback generation.
