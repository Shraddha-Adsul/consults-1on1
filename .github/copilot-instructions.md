# Copilot Instructions — The Longevity Circle (consults-1on1)

## Project Overview
This is a static landing site for **The Longevity Circle**, a consultation booking platform by **PreventiveHealth.AI**. It connects users with physicians and specialists focused on preventive health and longevity.

## Tech Stack
- **Plain HTML / CSS / JS** — no build tools, no npm, no framework
- 3 HTML pages: `index.html` (home), `providers.html` (provider listing + booking modal), `prepare.html` (how to prepare guide)
- 1 CSS file: `styles.css` (~990 lines)
- 1 JS file: `script.js` (~170 lines, vanilla JS)
- Fonts: Instrument Sans (body), Instrument Serif (headings), Inter (nav links, form labels)
- Form backend: **Formspree** (`https://formspree.io/f/mlgwzbpe`) — AJAX POST with `Accept: application/json`
- Designed for static hosting (GitHub Pages, Netlify, etc.)

## Architecture & Patterns
- CSS uses custom properties (`:root` vars) for theming: `--primary`, `--background`, `--foreground`, `--accent`, `--border`, `--muted`
- Layout: flexbox & grid, `.container-narrow` (880px max-width), sticky nav with backdrop-filter
- Media query breakpoints: 640px, 768px, 1024px
- Provider cards use an accordion pattern (click to expand, only one open at a time)
- Pill navigation with scroll-spy for active state tracking
- Booking modal: overlay with form state → thank-you state, toggle button groups for location & duration
- All interactivity is vanilla JS (no jQuery, no libraries)

## Key CSS Classes
- `.container-narrow` — 880px max-width content container
- `.nav-inner` — 880px nav alignment
- `.nav-link` — Inter font, 0.75rem, uppercase
- `.provider-card` / `.provider-header` / `.provider-content` — accordion cards
- `.provider-cta` — full-width booking CTA, visible only when card is `.open`
- `.pill-nav` / `.pill` — specialty category navigation (2-col grid on mobile → 3-col on 640px+)
- `.modal-overlay` / `.modal` — centered booking modal with blur backdrop
- `.toggle-group` / `.toggle-btn` — selectable button groups (location, duration)
- `.concern-section` — provider specialty sections with `scroll-margin-top`

## Providers (9 total across 6 specialties)
1. **Hormones & Metabolism**: Dr. Chhaya Makhija (🇺🇸)
2. **Pain, Movement & Recovery**: Dr. Kashinath Bangar (🇮🇳), Dr. Sourabh Sane (🇮🇳)
3. **Endurance & Performance**: Andrew Talansky (🇺🇸)
4. **Mind & Emotional Wellbeing**: Dr. Kalpana Raval (🇮🇳), Dr. Nischol Raval (🇮🇳)
5. **Women's Health & Fertility**: Dr. Mugdha Parasnis (🇮🇳)
6. **Chronic Conditions & Aging Well**: Dr. Sanat Phatak (🇮🇳), Dr. Meetali Bidaye (🇮🇳)

## Booking Form Fields
- Provider name (hidden, auto-filled from CTA)
- Your Name (text, required)
- Email (email, required)
- Phone Number (tel, required, with country code hint)
- Your Location (toggle: U.S. / India / Other)
- Consultation Duration (toggle: 15 min / 30 min / 60 min)

## Design Preferences
- Clean, minimal aesthetic — warm neutrals (cream/beige background, dark text)
- Primary color: `#2A6F5B` (forest green)
- No arrow icons on CTA buttons
- Country flags appear to the right of provider names (CSS `order: 1`)
- Individual provider pricing has been removed (pricing is only on index.html)
- Buttons and interactive elements should always show `cursor: pointer`
- Copy tone: warm, thoughtful, prevention-focused — not salesy

## Development Notes
- No individual pricing on provider cards — removed intentionally
- Pill nav uses dynamic offset calculation (nav height + pill nav height + 24px)
- Mobile pill nav is horizontal scroll (not grid)
- The `prepare.html` page has received minimal styling attention compared to the other pages
