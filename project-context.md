# Project Context — Seisuvai Catering Website

## Overview & Architecture Spine

This repository houses the full-stack web application for **Seisuvai Catering**, a premium South Indian catering business.

### Core Technology Stack
- **Frontend (`seisuvai-react`)**: React 19, Vite 8, Tailwind CSS v4, Zustand, Framer Motion, Three.js WebGL.
- **Backend (`server`)**: Node.js, Express 5, MongoDB / Mongoose 9.
- **Scraper Utility (`scraper`)**: Menu parsing engine for raw catering menu processing.

---

## Technical & Architectural Invariants

1. **No Frontend Pricing Leakage**:
   - Menu cards and custom builders display delicacies and dietary tags (`Veg`/`Non-Veg`) without hardcoded item prices.
   - All quote requests are directed to the catering manager via structured WhatsApp messages or Express API backends.

2. **Mobile-First Responsive Layout**:
   - Minimum tap target bounds: `44px x 44px`.
   - On viewports `<1024px`, 3D WebGL scenes are dynamically excluded and replaced with lightweight CSS alternatives (`HeroMobileVisual.jsx`).

3. **Dietary Categorization Rules**:
   - **Veg Lunch & Dinner Custom Menu**: Contains 10 categories (Welcome Drinks, Soups, Starters, Rice & Biryani, Gravies & Curries, Poriyal & Kootu, Sweets & Desserts, Payasam, Extras & Beverages).
   - **Non-Veg Lunch & Dinner Custom Menu**: Contains 8 categories with curated non-veg specialties + vegetarian staples (Sambar, Rasam, Vathakulambu, Buttermilk, Onion Raitha, Brinjal Gravy).

4. **Testing Requirements**:
   - All component modifications or dataset alterations must maintain 100% pass rate on `npx vitest run`.
