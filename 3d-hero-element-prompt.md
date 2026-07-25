# Agent Prompt: 3D Traditional Handi & Steaming Cauldron Hero Element — Seisuvai Catering Site

Paste everything below into your coding agent, run it from the repo root.

---

## Context

The Home page hero (`Fresh, tasty food for every occasion — big or small`) features an interactive 3D centerpiece inspired by traditional South Indian grand wedding catering — featuring twin/single traditional **Cooking Handi / Brass Deg (Cauldron)** over glowing fire flames, with realistic rising steam smoke, glowing embers, and floating authentic spices (star anise, cardamoms, cashews).

Reference animation inspiration: Traditional live South Indian catering handi cooking over open woodfire flame (`https://pin.it/13KCaSnBi`).

---

## Technical Specifications

### 1. Desktop 3D Scene (`HeroScene3D.jsx` via Three.js / WebGL)
- **Primary 3D Mesh**: Traditional South Indian Brass Cooking Handi / Deg with curved bellied body, metallic neck, decorative lid, and handles.
- **Lighting & Materials**:
  - Metallic Brass/Gold material (`#c8a24b` & `#e6c878` with specular reflections).
  - Internal warm embers glow (`#f97316` and `#eab308`).
- **Particle Systems**:
  - **Rising Steam**: Alpha-blended semi-transparent rising smoke particles.
  - **Glowing Embers**: Sparkling fire particles floating gently upward.
  - **Floating Spices**: 3D orbiting spices (Star Anise, Cardamom, Curry Leaf, Cashews) floating dynamically around the Handi.
- **Idle Animation**:
  - 360° slow rotational drift (`rotation.y`).
  - Floating sine-wave vertical bobbing.
- **Performance & Code-Splitting**:
  - Code-split dynamically (`React.lazy` + `<Suspense>`).
  - `prefers-reduced-motion: reduce` compliance (pauses all rotation & particle physics).

### 2. Mobile Visual (`HeroMobileVisual.jsx`)
- Lightweight (<15KB) animated card presentation for mobile viewports (<1024px).
- Zero WebGL / Three.js bundle size on mobile devices.
- Features rising animated steam particles, glowing fire ring aura, and traditional handi presentation card.

---

## Verification Checklist

- [x] **Desktop (1024px+)**: WebGL Handi scene renders cleanly next to hero headline & CTAs.
- [x] **Mobile (<1024px)**: Renders lightweight mobile variant; Three.js JS bundle is NOT downloaded on mobile.
- [x] **Accessibility**: `prefers-reduced-motion: reduce` pauses all particle animation & rotation.
- [x] **Zero CLS**: Fixed container dimensions prevent layout shifts.
