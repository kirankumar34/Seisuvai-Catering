# Seisuvai Catering — Website Restructure & Repo Cleanup (One-Shot Agent Spec)

**Target:** `seisuvaicatering.netlify.app` codebase (V1 static HTML → V2 React/Vite)
**Agent type:** Claude Code / autonomous coding agent
**Goal:** Turn the current site into a clean, production-grade catering business website with a clear information architecture, real food/serving photography, no pricing section, and a repo free of dead weight.

---

## 0. Read This First (Agent Instructions)

1. Run a full repo inventory before touching anything (Section 5).
2. Do not delete anything until Section 5's "Safe to Delete" list is confirmed against the actual repo — cross-check every file against active imports using `grep -r` before removal.
3. Work in this order: (A) repo cleanup → (B) information architecture / routing → (C) component rebuild per section → (D) image sourcing/replacement → (E) responsive QA → (F) final acceptance checks.
4. Every acceptance criterion in Section 8 must be verifiable with a shell command (`grep`, `find`, `ls`, `npm run build`) — run them yourself before declaring done.
5. If the repo is still V1 static HTML (no `package.json`/no `src/`), treat Section 3's file paths as the target structure to create fresh under a `v2/` or `src/` directory rather than editing HTML in place.

---

## 1. Current State Assumptions (verify against actual repo)

- Two possible codebases may exist side by side: a **V1 static HTML/CSS/JS** version and a **V2 React + Vite** rebuild in progress.
- Sections currently mixed together without clear separation (e.g., pricing tables embedded inside menu sections, no dedicated enquiry form, no testimonials block).
- Images are likely generic stock/AI-style photos not specific to Seisuvai's actual food or service style.
- Brand palette: **black + gold**, South Indian catering identity.

If any of these assumptions don't match reality, the agent should stop and report the actual structure found in Section 5's inventory step before proceeding.

---

## 2. Target Information Architecture

Single-page or multi-route site (React Router if V2), with these top-level sections **and no others**:

| # | Section | Route (if multi-page) | Anchor (if single-page) | Purpose |
|---|---------|------------------------|--------------------------|---------|
| 1 | Home | `/` | `#home` | Hero, brand intro, CTA to enquiry, highlight reel of signature dishes |
| 2 | About Us | `/about` | `#about` | Story, founders/team, years of experience, service area (Chennai), certifications/hygiene standards |
| 3 | Menus | `/menus` | `#menus` | Categorized menu (breakfast/tiffin, lunch/sadhya, dinner, snacks, sweets, event-specific) — **no prices anywhere** |
| 4 | Enquiry | `/enquiry` | `#enquiry` | Lead-capture form (event date, guest count, event type, contact info, message) — this replaces any pricing/quote-request section |
| 5 | Testimonials / Reviews | `/testimonials` | `#testimonials` | Client quotes, star ratings, optionally event photos |

### Explicitly Remove
- **Pricing section** — any per-plate rates, package tiers, "starting from ₹X" blocks, pricing tables/cards. Replace all pricing CTAs with **"Enquire for a custom quote"** buttons linking to the Enquiry section/route.
- Any placeholder/lorem-ipsum content left over from templates.
- Any duplicate nav items or dead links pointing to removed sections.

### Global Elements (present on every page)
- Sticky header with logo + nav (Home / About / Menus / Enquiry / Testimonials) + phone/WhatsApp CTA button.
- Footer: business name, Chennai service area, contact (phone, email, Instagram/WhatsApp if available), copyright.

---

## 3. Target File Structure (React/Vite — V2)

```
seisuvai-catering/
├── public/
│   └── images/
│       ├── hero/
│       ├── menu/
│       ├── about/
│       └── testimonials/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes/                      # or sections/ if single-page
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Menus.tsx
│   │   ├── Enquiry.tsx
│   │   └── Testimonials.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Nav.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── SignatureDishes.tsx
│   │   │   └── CTABanner.tsx
│   │   ├── menus/
│   │   │   ├── MenuCategoryTabs.tsx
│   │   │   └── MenuItemCard.tsx
│   │   ├── enquiry/
│   │   │   └── EnquiryForm.tsx
│   │   ├── testimonials/
│   │   │   ├── TestimonialCard.tsx
│   │   │   └── TestimonialCarousel.tsx
│   │   └── ui/                      # shared buttons, badges, section wrappers
│   ├── data/
│   │   ├── menuData.ts              # no price fields
│   │   └── testimonialsData.ts
│   ├── styles/
│   │   └── tokens.css               # black/gold design tokens
│   └── lib/
│       └── validators.ts            # enquiry form validation
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

If the project stays static HTML (no build step), mirror this as `index.html`, `about.html`, `menus.html`, `enquiry.html`, `testimonials.html` with a shared `partials/header.html` / `footer.html` pattern, plus `/assets/images/{hero,menu,about,testimonials}/`.

---

## 4. Data Contracts

### `menuData.ts`
```ts
export interface MenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'sweets' | 'event-special';
  description: string;
  imagePath: string;      // real photographed dish, not stock
  isVeg: boolean;
  isSignature?: boolean;
  // NOTE: no `price` field — pricing is intentionally excluded from the data model
}
```

### `testimonialsData.ts`
```ts
export interface Testimonial {
  id: string;
  clientName: string;
  eventType: string;       // e.g. "Wedding reception, 300 pax"
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  photoPath?: string;      // optional event photo
  date: string;             // ISO date
}
```

### Enquiry form fields
```ts
interface EnquiryFormData {
  fullName: string;
  phone: string;
  email?: string;
  eventDate: string;       // ISO date, must be future date
  eventType: 'wedding' | 'housewarming' | 'corporate' | 'birthday' | 'other';
  guestCount: number;
  message?: string;
}
```
Submission target: connect to existing backend endpoint if one exists (check for `/api/enquiry` or similar in current repo); otherwise wire to a simple email/WhatsApp deep-link or a form service (e.g., Formspree) as a placeholder and flag this clearly in the PR description for Kiran to swap in the real backend.

---

## 5. Repo & Git Cleanup

### Step 1 — Inventory (run first, report results before deleting anything)
```bash
git status --porcelain
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" | sort
du -sh node_modules dist build 2>/dev/null
git log --oneline -20
cat .gitignore 2>/dev/null
```

### Step 2 — Candidates for removal (verify each is truly unused before deleting)
- `node_modules/`, `dist/`, `build/`, `.next/`, `.vite/` — should never be committed; ensure `.gitignore` covers them, then `git rm -r --cached` if they're tracked.
- Duplicate/backup files: `*.bak`, `*-copy.*`, `*-old.*`, `Untitled*`, `test.html`, `temp.js`.
- Unused stock/AI-generated placeholder images once real photos are in place (Section 6) — search for references first: `grep -rl "old-image-name.jpg" src/ public/`.
- Leftover template boilerplate (e.g. default Vite/CRA README, favicon, logo assets not matching the Seisuvai brand).
- Any committed `.env` file with real secrets — remove from tracking and add to `.gitignore`; rotate any exposed credentials.
- Orphaned CSS/JS files not imported anywhere: cross-check with `grep -r "import.*filename"`.
- Multiple lockfiles (`package-lock.json` + `yarn.lock` + `pnpm-lock.yaml` together) — keep only the one matching the actual package manager in use.

### Step 3 — `.gitignore` (create/update to at least this)
```
node_modules/
dist/
build/
.env
.env.local
.DS_Store
*.log
.vite/
```

### Step 4 — Commit hygiene
- Squash or clearly label WIP commits before merging into main, if Kiran wants a clean history (confirm with Kiran — do not force-push over shared branches without explicit confirmation).
- Ensure `README.md` reflects the actual current stack, setup steps, and env vars needed (`.env.example`).

---

## 6. Image Sourcing Requirements

**Rule: no generic/random stock photography.** Every image must look like it belongs to an actual South Indian catering business — real dishes, real plating, real serving/buffet setups — not staged Western food photography or obviously AI-generated images.

### Sourcing approach
1. **First choice:** actual photos from Seisuvai's own events (ask Kiran for a photo dump — WhatsApp/Google Drive event photos are ideal and should be prioritized over any external source).
2. **If real photos aren't available yet**, source specific, relevant stock photography (Pexels/Unsplash/Pixabay, all free-to-use) using precise search terms — not generic "food" queries:
   - Hero/banner: `"south indian banana leaf food"`, `"south indian wedding catering buffet"`
   - Menu — breakfast: `"idli sambar dosa plate"`, `"south indian tiffin breakfast"`
   - Menu — lunch/sadhya: `"south indian sadhya banana leaf"`, `"traditional thali south india"`
   - Menu — sweets: `"indian sweets mithai tray"`
   - About/service: `"indian wedding catering chef live counter"`, `"caterers serving buffet event india"`
   - Testimonials backdrop: real or stock event photography showing actual serving setups, not isolated plate close-ups
3. Every image file must be renamed descriptively (`idli-sambar-breakfast.jpg`, not `IMG_2043.jpg` or `pexels-123456.jpg`) and placed in the matching `public/images/<section>/` folder from Section 3.
4. Add `alt` text describing the actual dish/scene for every image (accessibility + SEO), e.g. `alt="Idli, sambar, and coconut chutney served on a banana leaf"`.
5. Compress/optimize all images (WebP where possible, target < 200KB each) before committing — do not commit raw multi-MB camera files.

---

## 7. Design System (Black & Gold Brand)

```css
:root {
  --color-black: #0e0e0e;
  --color-charcoal: #1c1c1c;
  --color-gold: #c8a24b;
  --color-gold-light: #e6c878;
  --color-cream: #f8f4ec;
  --font-heading: /* elegant serif, e.g. 'Playfair Display' */;
  --font-body: /* clean sans, e.g. 'Inter' */;
}
```
- Card-based layouts for menu items and testimonials — **avoid HTML tables**, especially on mobile.
- Mobile-first: single-column stacking below 640px, 2-column grid 640–1024px, 3-column above.
- CTA buttons: gold fill on black background for primary actions (e.g. "Enquire Now"), outlined gold on hover/secondary actions.
- No pricing typography/iconography (₹ symbols, "starting at", "per plate") anywhere in the UI.

---

## 8. Acceptance Criteria (grep-verifiable)

Run these before declaring the task complete:

```bash
# No pricing references remain in source
! grep -rniE "₹|price|per plate|pricing|cost per" src/ --include=*.tsx --include=*.ts

# All five required sections exist
for s in Home About Menus Enquiry Testimonials; do
  find src -iname "*${s}*" | grep -q . && echo "OK: $s" || echo "MISSING: $s"
done

# No tracked node_modules/dist/build
git ls-files | grep -E "^(node_modules|dist|build)/" && echo "FAIL: build artifacts tracked" || echo "OK: clean"

# No leftover backup/placeholder files
find . -not -path "./node_modules/*" -not -path "./.git/*" -iregex ".*\(bak\|old\|copy\|untitled\|temp\)\..*" 

# .env not tracked
git ls-files | grep -q "^\.env$" && echo "FAIL: .env tracked" || echo "OK"

# Build succeeds
npm run build

# All images have alt text (React/JSX check)
grep -rL "alt=" src/components --include=*.tsx | grep -i "img\|image" 
```

All checks should pass clean (no FAIL / MISSING output) before this is considered done.

---

## 9. Effort Estimate

| Task | Est. hours |
|---|---|
| Repo inventory + cleanup | 1–2 |
| Routing/section restructure (React) | 2–3 |
| Component rebuild per section | 4–6 |
| Enquiry form + validation | 1–2 |
| Image sourcing, optimization, replacement | 2–4 (longer if waiting on Kiran's real event photos) |
| Responsive/mobile QA | 1–2 |
| Final acceptance pass | 0.5–1 |
| **Total** | **~12–20 hours** |

---

## 10. Deliverable Checklist for the Agent

- [ ] Repo inventory reported before any deletions
- [ ] Unwanted/dead files removed, `.gitignore` updated, no build artifacts or secrets tracked
- [ ] Site restructured into exactly: Home, About Us, Menus, Enquiry, Testimonials
- [ ] Pricing section and all pricing references fully removed
- [ ] All images replaced with real/specifically-sourced South Indian catering photography, descriptive filenames + alt text
- [ ] Black/gold design system applied consistently, mobile-first, card-based (no tables)
- [ ] Enquiry form functional (or clearly flagged placeholder backend)
- [ ] All Section 8 acceptance commands pass
- [ ] README updated with accurate setup instructions
