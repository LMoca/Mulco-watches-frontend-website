# MULCO Watches — Website Build Phases (Revised)

---

## Phase 1: Foundation and Configuration

### 1. Tailwind Configuration

- Extend `tailwind.config.js` with MULCO brand color palette:
  - `brand-black`: #0A0A0A
  - `brand-navy`: #1A1A2E
  - `brand-gold`: #C9A84C
  - `brand-rose`: #B76E79
  - `brand-white`: #F5F5F0
  - `brand-muted`: #888880
- Add custom font families: Cormorant Garamond (serif for headlines), DM Sans (body/UI sans-serif)
- Configure custom animation utilities: fade-in-up, shimmer, parallax shift
- Add custom scrollbar track/thumb colors to match dark luxury theme
- Define extended spacing and breakpoint values for editorial layouts

### 2. Global Styles and Fonts

- Add Google Fonts import in `index.html` for Cormorant Garamond (400, 500, 600, 700) and DM Sans (400, 500, 700)
- Configure `src/index.css` with:
  - Base background: #0A0A0A, text: #F5F5F0
  - Smooth scroll behavior on html element
  - Custom scrollbar styling (dark track, gold thumb, thin profile)
  - CSS keyframe definitions for fade-in-up, shimmer overlay, and parallax
  - Selection highlight color using brand gold

### 3. Public Folder Setup

- Create `public/_redirects` with content: `/* /index.html 200`
- Create `public/robots.txt` allowing all crawlers
- Create `public/sitemap.xml` listing all planned page routes

### 4. Input Sanitization Utility

- Create a shared `src/utils/sanitize.ts` utility module
- Implement sanitization that strips patterns for: SQL injection, XSS, command injection, template injection, and XML/XXE attacks
- Export a reusable function to be applied on every input field across the site

### 5. Language Context Provider (EN/ES)

- Create `src/context/LanguageContext.tsx` with React Context
- Store language preference in localStorage
- Create a translations JSON structure for all UI strings (navigation, CTAs, section headings, product labels)
- Scaffold both English and Spanish translations from the start
- Export a `useLanguage` hook for components to consume

### 6. Cart Context Provider

- Create `src/context/CartContext.tsx` with React Context
- Implement local state cart management: add item, remove item, update quantity, clear cart, get total
- Store cart in localStorage for persistence across sessions
- Export a `useCart` hook for components to consume

---

## Phase 2: Layout Shell and Navigation

### 1. Routing Setup

- Install `react-router-dom`
- Create route structure in `App.tsx`:
  - `/` — Home
  - `/collections` — All Collections
  - `/collections/men` — Men's Watches
  - `/collections/women` — Women's Watches
  - `/collections/new-arrivals` — New Arrivals
  - `/collections/:slug` — Individual Collection
  - `/product/:id` — Product Detail
  - `/accessories` — Accessories Landing
  - `/accessories/sunglasses` — Sunglasses
  - `/accessories/jewelry` — Jewelry
  - `/accessories/straps` — Straps
  - `/our-story` — Brand Story
  - `/support` — Support/Contact
  - `/faq` — FAQ Page
  - `/cart` — Cart Page
- Implement scroll-to-top on every route change

### 2. Navbar Component

- Fixed top-0 with z-50, transparent background that transitions to solid #0A0A0A on scroll
- **Left**: White MULCO logo (from CDN URL), links to home
- **Center**: Navigation links — Collections (mega dropdown with Men/Women/New Arrivals and campaign images), Accessories, Our Story
- **Right**: Search icon, Language toggle (EN/ES), Cart icon with item count badge (from cart context)
- Mega dropdown for Collections: two-column with category links on left, campaign banner image on right
- All navigation item clicks trigger scroll-to-top
- `className` set to `fixed top-0`
- Gold accent on hover states with smooth 200ms transitions

### 3. Mobile Navigation

- Hamburger icon (`Menu` from lucide-react) triggers full-screen overlay
- Overlay fills entire viewport with #0A0A0A background at 98% opacity
- Navigation items centered both horizontally and vertically, evenly spaced
- Each item in Cormorant Garamond serif, large text
- Close button (`X` from lucide-react) top-right
- Language toggle and cart accessible from mobile menu
- Smooth slide-in animation from right

### 4. Footer Component

- Background: #0A0A0A with subtle gold top border (1px, low opacity)
- White MULCO logo centered at top of footer
- Three navigation columns:
  - **Shop**: Men, Women, New Arrivals, Accessories, All Collections
  - **About**: Our Story, Warranty, Repairs, FAQ
  - **Support**: Shipping Policy, Returns, Contact Us, Store Location
- All links serve as backlinks to respective pages
- Social icons row: Instagram (primary), Facebook, Twitter/X (from lucide-react)
- Copyright: "MULCO Watches Inc." with dynamic year via `new Date().getFullYear()`
- Address: 19790 W Dixie Hwy, Suite 201, Aventura, FL 33180
- Responsive: columns stack on mobile

---

## Phase 3: Homepage — Hero and Collections Grid

### 1. Hero Section

- Full-bleed cinematic section using bestsellers editorial banner (`X2A2691.jpg`) as background
- Subtle parallax effect: background moves at 0.5x scroll speed
- Dark overlay gradient (bottom-heavy) to ensure text readability
- Centered content:
  - Headline in Cormorant Garamond: "Time, Reimagined."
  - Subtext in DM Sans: "Swiss Precision. Fashion-Forward."
  - Ghost button CTA: gold 1px border, transparent fill, "Explore Collections" text, hover fills with gold and text goes dark
- Responsive: reduced vertical padding on mobile, text scales down gracefully
- Lazy-load background image with placeholder color

### 2. Collections Grid Section

- Section heading: "Collections" in Cormorant Garamond, centered, with gold decorative line beneath
- 4-column grid on desktop, 2-column on tablet, 1-column on mobile
- Four cards: Men / Women / New Arrivals / Limited Editions
- Each card:
  - Campaign image as background (use women's/men's campaign banner URLs)
  - Dark gradient overlay
  - Collection name in serif at bottom-left
  - On hover: overlay lightens slightly, brief descriptor text fades in, card scales to 1.02
- Cards link to respective collection routes
- Fade-in on scroll using Intersection Observer

### 3. Trust Bar

- Horizontal strip section with #1A1A2E background
- 5 trust signals in a row (flex, evenly distributed):
  - Shield icon + "Swiss Movement Quality"
  - Award icon + "2-Year International Warranty"
  - Truck icon + "Free Shipping (PR & USA)"
  - RefreshCcw icon + "Easy Returns"
  - Wrench icon + "Miami Service Center"
- Icons in brand gold, text in brand muted
- Vertical dividers between items (gold, low opacity)
- Mobile: horizontally scrollable with snap points

---

## Phase 4: Homepage — Featured Products and Brand Story

### 1. Featured Product Spotlight Sections

- Four alternating hero-style sections (image left/right alternates):
  - **Section 1**: Blue Marine Medusa — use beige product shot
  - **Section 2**: Enchanted Quartz — use green product shot
  - **Section 3**: Buzo Tentacles — use men's product shot
  - **Section 4**: Kripton Royale — use men's Kripton shot
- Each section layout:
  - One side: large product image with subtle float animation
  - Other side: product name (serif, large), collection badge, material callouts (Mother of Pearl, Swarovski, Swiss Quartz as tag pills), movement type, price, "Add to Collection" button (gold filled, triggers cart context)
- Fade-in-up transition as each section scrolls into view
- On mobile: stacks vertically, image on top, info below
- Bilingual: product names and descriptions pull from language context

### 2. Brand Story Section

- Background: #0A0A0A with a subtle texture or grain overlay
- Large serif headline: "Since 1958"
- Two-column layout on desktop:
  - **Left**: editorial copy about Swiss heritage, founding by Muller & Co., Jennifer Muller's fashion-first disruption, the philosophy of bold design meets precision engineering
  - **Right**: campaign image (use one of the hero banners)
- Copy tone: textured, specific, avoids cliches
- Gold accent line separating headline from body
- Mobile: single column, image above text
- "Discover Our Story" link/button leading to full `/our-story` page

### 3. Social Proof Section

- Section heading: "Voices of the Bold" or similar editorial title
- Three customer review cards in horizontal layout:
  - **Card 1**: "I get numerous compliments on my Cobra. I simply love it."
  - **Card 2**: "It arrived on time, looks exactly like the photo. Packaged beautifully. Included a bonus gift."
  - **Card 3**: "This is my third watch from Mulco — each one more exclusive than the last."
- Card design: dark card with subtle border, large gold serif quotation mark as decorative element, review text in DM Sans, reviewer attribution below
- No star ratings — typography carries the weight
- Desktop: 3-column grid; Mobile: horizontal scroll with snap

---

## Phase 5: Homepage — Accessories, Newsletter, FAQ

### 1. Accessories / Lifestyle Section

- Section heading: "Beyond the Watch" in serif
- 3-card grid:
  - Sunglasses (use women's sunglasses image)
  - Jewelry (use a product shot or campaign image)
  - Straps (use a watch strap detail or product image)
- Each card: large image, category name overlay at bottom, "Discover" ghost button on hover
- Hover: scale 1.03, gold border fades in
- Links to respective `/accessories/*` routes
- Premium positioning — editorial feel, generous spacing

### 2. Newsletter Capture Section

- Full-width section with #1A1A2E background
- Centered content:
  - Headline in serif: "Join the MULCO Community"
  - Subtext: "First access to new collections and exclusive offers."
  - Single-line form: email input (dark field, gold focus ring) + submit button (gold filled, "Subscribe" text)
- Input sanitization applied via the sanitize utility
- Success state: input replaced with "Welcome to the community." confirmation
- No pop-ups, purely inline
- Bilingual labels from language context

### 3. FAQ Section (Homepage Preview)

- Show 4-5 most common FAQ items as an accordion preview on homepage
- Selected items: Payment Methods, Shipping Policy, Tracking Orders, Warranty Coverage, Customer Care Hours
- Accordion with clean expand/collapse animation, gold accent on active chevron
- "View All FAQs" link to full `/faq` page
- All FAQ content sourced from the provided FAQ data

---

## Phase 6: Collections and Product Pages

### 1. Collections Landing Page (`/collections`)

- Hero banner using bestsellers image
- Filter bar (sticky below navbar on scroll):
  - Category toggle: Men / Women / All
  - Collection dropdown: Blue Marine, Lush, Evol, Couture, Buzo, Kripton, La Fleur, Illusion Lady
  - Sort: Featured, Price Low-High, Price High-Low, Newest
- Product grid: 3-column desktop, 2-column tablet, 1-column mobile
- Product card design:
  - Dark background card
  - Product image centered
  - Product name (serif), collection name (muted), price
  - Hover: slight scale, "Quick View" overlay button, gold border reveal
- Lazy-load images with fade-in on scroll
- Pagination or infinite scroll

### 2. Individual Collection Pages (`/collections/:slug`)

- Collection-specific hero banner (use appropriate campaign image)
- Collection name and description copy
- Filtered product grid (same card component as landing)
- Breadcrumb navigation: Home > Collections > [Collection Name] (serves as backlinks)

### 3. Product Detail Page (`/product/:id`)

- **Left section**: Image gallery
  - Main large product image
  - Thumbnail row below (click to swap main image)
  - Zoom on hover for main image
- **Right section**: Product info
  - Breadcrumb: Home > Collections > [Collection] > [Product]
  - Product name (large serif)
  - Collection badge
  - Price (prominent, gold)
  - Color/strap variant selector (visual swatches — circles with color fill)
  - "Add to Collection" button (gold, full width, triggers cart context with selected variant)
  - Quantity selector
- Below: Tabbed details section
  - **Tab 1**: Description (editorial product story)
  - **Tab 2**: Specifications (movement, water resistance, case diameter, materials, band type)
  - **Tab 3**: Warranty Info (2-year coverage summary with link to full warranty FAQ)
- Related products carousel at bottom: 4 product cards, horizontally scrollable
- All text bilingual via language context

---

## Phase 7: Cart Page

### 1. Cart Page (`/cart`)

- Page heading: "Your Collection" in serif
- Cart items list:
  - Product image thumbnail
  - Product name and variant (color/strap)
  - Price per unit
  - Quantity adjuster (minus/plus buttons)
  - Remove button (`Trash2` icon from lucide-react)
  - Line total
- Order summary sidebar (right on desktop, below on mobile):
  - Subtotal
  - Shipping estimate note ("Calculated at checkout")
  - "Proceed to Checkout" button (gold, full-width) — links to external Shopify checkout or shows a "Coming Soon" state
- Empty cart state: elegant message with "Explore Collections" CTA
- All managed via CartContext local state

---

## Phase 8: Secondary Pages

### 1. Full FAQ Page (`/faq`)

- Page heading: "Frequently Asked Questions" in serif
- Organized by category sections:
  - **Orders and Payment** (order processing issues, payment methods, tracking)
  - **Shipping** (shipping policy, international orders)
  - **Repairs and Service** (national repair, international repair, parts)
  - **Warranty** (warranty coverage, online warranty, national service, international service)
  - **Store Information** (hours, address, contact)
- Each category: heading + accordion items with full content from provided FAQ data
- Search/filter input at top to filter FAQ items by keyword (with sanitization)
- Smooth expand/collapse animation with gold chevron accent
- Bilingual support via language context

### 2. Brand Story Page (`/our-story`)

- Full editorial layout:
  - Hero section with campaign image and "Our Story" overlay
  - Timeline or milestone markers: 1958 founding, Jennifer Muller era, key collection launches, expansion into accessories
  - Large campaign imagery interspersed between copy blocks
  - Values section: Swiss Precision, Fashion-Forward Design, Bold Community, Material Innovation
- Rich, textured copywriting throughout
- Backlinks to collections mentioned in the story

### 3. Accessories Pages

- **Sunglasses page** (`/accessories/sunglasses`): grid of sunglasses products using reference images, Men/Women filter toggle
- **Jewelry page** (`/accessories/jewelry`): grid layout, same card design system
- **Straps page** (`/accessories/straps`): grid with color/material filters
- All use same product card component and link to detail pages
- Breadcrumb navigation for backlinks

### 4. Support / Contact Page (`/support`)

- Two-column layout:
  - **Left**: Contact form (name, email, subject dropdown, message textarea) with full input sanitization
  - **Right**: Store information card (address, phone, email, hours from FAQ data)
- Miami service center highlighted with map placeholder or address block
- Quick links: Warranty Policy, Repair Process, Shipping Info, FAQ
- Form submission shows success confirmation (front-end only, no backend)

---

## Phase 9: Interactions, Animations, and Performance

### 1. Scroll Animations

- Create a reusable `useInView` hook wrapping Intersection Observer
- Fade-in-up animation on all major sections as they enter viewport
- Staggered delay on grid items (each card 100ms after previous)
- Parallax on hero sections: background translates at reduced scroll speed

### 2. Hover and Micro-interactions

- Product cards: `scale(1.02)` on hover, gold border or shimmer overlay
- CTA buttons: gold underline slides in from left on hover
- Navigation links: color transitions to brand-gold on hover (200ms ease)
- Image gallery: smooth crossfade between thumbnails
- Accordion: smooth height transition with easing

### 3. Performance Optimization

- Lazy-load all images below the fold using `loading="lazy"` and `decoding="async"`
- Implement image error fallbacks (dark placeholder with MULCO logo)
- Code-split all route pages using `React.lazy` and `Suspense` with a branded loading spinner
- Preload critical fonts via `<link rel="preload">` in `index.html`
- Minimize re-renders with proper memoization on context consumers

### 4. Mobile Optimization

- Verify all touch targets are minimum 44px
- Product carousels and review strips are swipeable with momentum
- Full-screen mobile navigation with body scroll lock when open
- Product grid transitions from 3-col to 2-col to 1-col gracefully
- Test at 320px, 375px, 390px, 768px, 1024px, 1440px breakpoints

---

## Phase 10: Final Polish and QA

### 1. Cross-browser Verification

- Test in Chrome, Firefox, Safari, Edge
- Verify iOS Safari and Android Chrome rendering
- Fix any flexbox/grid inconsistencies or overflow issues

### 2. Accessibility

- Proper `aria-labels` on all interactive elements (buttons, links, inputs)
- Keyboard navigation: all menus, modals, accordions, and carousels accessible via Tab/Enter/Escape
- Focus ring styling: gold outline, visible on all interactive elements
- Alt text on all images describing the product/scene
- Color contrast check: verify gold text on dark backgrounds meets WCAA AA

### 3. Backlinks and Navigation Audit

- Verify every page links back to Home and relevant parent pages
- Confirm breadcrumbs on all interior pages function correctly
- Footer links all resolve to correct routes
- Collection cards link to correct collection pages
- Product cards link to correct detail pages

### 4. Content and Brand Voice Review

- Confirm no "affordable," "budget," or discount language appears in hero/featured areas
- All CTAs use approved language: Explore, Discover, Add to Collection, Wear It
- All reference images load correctly from MULCO CDN URLs
- Spanish translations are complete and natural-sounding
- FAQ content matches provided data exactly
- Dynamic year renders correctly in footer