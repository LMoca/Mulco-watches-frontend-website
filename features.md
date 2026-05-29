# Mulco Watches — Frontend Feature Reference

A complete inventory of every implemented feature, page, and capability in the current build.

---

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/collections` | All Collections |
| `/collections/women` | Women's Watches |
| `/collections/men` | Men's Watches |
| `/collections/new-arrivals` | New Arrivals |
| `/product/:id` | Product Detail |
| `/accessories` | Accessories Landing |
| `/accessories/jewelry` | Jewelry Category |
| `/accessories/straps` | Straps Category |
| `/our-story` | Brand Story |
| `/lookbook` | Lookbook |
| `/campaign-films` | Campaign Films & Stories |
| `/find-a-retailer` | Find a Retailer |
| `/warranty-registration` | Warranty Registration |
| `/watch-care` | Watch Care Guide |
| `/faq` | FAQ |
| `/support` | Contact & Support |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms & Conditions |
| `/shipping` | Shipping Policy |
| `/returns` | Returns Policy |
| `*` | 404 Not Found |

---

## Home Page Sections

**Hero**
- Full-screen background image with directional gradient overlays
- Animated fade-in-up headline, subtext, and CTAs (staggered delays)
- Primary CTA: "Explore Collections" (bordered gold button with animated dash)
- Secondary CTA: "Our Story" (ghost link with arrow)
- Translucent overlay tuned for maximum image visibility

**Trust Bar**
- Four trust pillars: Free Shipping, 2-Year Warranty, Secure Checkout, Easy Returns
- Gradient gold accent lines top and bottom
- Scroll-triggered fade-in animation

**Collections Grid**
- Six collection tiles (Women's, Men's, New Arrivals, Accessories, Blue Marine, Buzo)
- Hover scale + overlay effect
- Links to correct collection/category route

**Product Spotlight**
- Split layout: featured Women's watch on left, Men's watch on right
- Gold dash label prefix (Women's / Men's)
- Live price display via currency formatter
- Sale badge + original price strikethrough where applicable
- "View Collection" CTA per side

**Accessories Section**
- Two-panel split: Jewelry and Straps
- Real product images from the catalog
- Hover scale animation
- Links to respective accessory category pages

**Social Proof**
- Customer review cards with star ratings, reviewer name, location, and body
- Aggregate rating strip: 5 gold stars · 4.9 · 800+ Verified Reviews
- Navy background for visual separation

**Instagram Section**
- Grid of lifestyle/campaign images
- "Follow us" CTA linking to Mulco's Instagram

**Newsletter Section**
- Exact Mulco copy: "Get 10% Off" badge, "Join Our Newsletter!" headline
- Single-row input + "Sign Me Up" button in a shared bordered container
- Client-side email validation with error messaging
- Success state with CheckCircle icon and confirmation copy
- Legal footnote: asterisk disclaimer matching Mulco's real site

---

## Navigation

**Navbar**
- Transparent on hero, solid dark on scroll (threshold-based)
- Logo centered on mobile, left on desktop
- Desktop links with hover underline animation
- Language toggle (EN / ES)
- Currency switcher dropdown (USD, EUR, GBP, MXN, COP) — desktop only
- Search icon → opens Search Modal
- Cart icon → opens Cart Drawer (with live item count badge)
- Hamburger → opens Mobile Nav

**Mobile Nav**
- Full-screen slide-in overlay
- All navigation links
- Language toggle
- Currency selector (native `<select>`)
- Social links (Instagram, Facebook, Twitter)
- Animated stagger entry per link

**Search Modal**
- Triggered by search icon or keyboard
- ESC to close
- Real-time product search across name, collection, tags, and description
- Highlighted match text
- Thumbnail + collection + name + price per result
- Quick-link chips when query is empty (Women's, Men's, New Arrivals, etc.)
- Navigates to product detail on selection

---

## Product Catalog

**Watches — Women's (13 models)**
Blue Marine Fusion · Blue Marine Infinity · Blue Marine Medusa · Enchanted Maple · Enchanted Quartz · Kripton Lady · Kripton Royale Lady · Dreamcatcher · La Fleur Gardenia · Lady D · M10 Namaste · Frost Full Moon · Freedom · Titans Snap Ladies

**Watches — Men's (8 models)**
Buzo Tentacles · Buzo Atlantis · Buzo Dive Silicone · Buzo Dive Stainless Steel · COBRA · Kripton Royale Gents · Kripton Square · Kripton Viper · Evol Reloaded

**Watches — Unisex (3 models)**
Mulco Breathe · Era 50 · Pride

**Jewelry — Women's (6 items)**
Big Star Chain Necklace · Chunky Hoop Earrings · Connecting Drop Chain Earrings · Entwined Hoop Earrings · U Hoop Earrings · A+ Round Tennis Bracelet

**Jewelry — Unisex (6 items)**
Havana Gold Chain Necklace · Star Shape Zirconia Ring · Bar Pave Bangle Bracelet · Braided Leather Bracelet · Love Bracelet · Oval Zirconia Bracelet

**Straps (4 items)**
Silicone Watch Strap Black · Yellow · White · Multicolor

Each product entry includes: name, collection, category, gender, price, optional original price, images array, color variants with images, perspective/detail images, description, and full specs.

---

## Collections Page

- Hero banner image per gender/slug (Women's, Men's, New Arrivals, All)
- Collection description tagline per slug
- Filter panel: Gender (All / Women's / Men's), Collection (16 watch collections)
- Sort: Featured · Price: Low to High · Price: High to Low · Newest
- Filter panel slides in on mobile with close button
- Product cards with: image, name, collection, tags, price, sale/new badges, low-stock badge
- Hover: scale animation + dark overlay + "Quick View / →" slide-up button row
- Quick View opens inline modal (see below)
- Add to cart from card with animated success state
- Zero results state with messaging
- Scroll-triggered staggered card animations

---

## Product Detail Page

**Image Gallery**
- Main image with click-to-zoom (1.5× scale)
- Zoom-in icon indicator (hides when zoomed)
- Color-keyed gallery: selecting a color shows that color's image + perspective shots
- Scrollable thumbnail strip (color image + all perspective images)
- Fallback to standard image array when no colors defined

**Product Information**
- Collection badge, product name, gold divider
- Feature tags (e.g. "Swarovski Crystals", "100M Water Resistant")
- Color picker: swatch thumbnails with gold outline + scale on selection
- Price display: current price, strikethrough original, "Save X" badge
- Low-stock indicator: gold left-border callout when stock ≤ 5
- Quantity selector (− / count / +)
- Engraving option (watches only): checkbox to enable, text input (max 20 chars with live counter), +$15 added to price
- Add to Cart button: animates to "Added to Collection" with CheckCircle icon, opens Cart Drawer
- Trust notes: Free shipping, 2-Year Warranty, Easy 30-day returns, Find a retailer link

**Tabbed Details**
- Description tab
- Specifications tab (movement, water resistance, case diameter, case material, band type, crystal type, material, finish, etc.)
- Warranty tab

**Customer Reviews**
- Seed reviews per product (realistic names, locations, dates)
- User-submitted reviews stored in localStorage
- Aggregate rating + star breakdown bar chart
- "Write a Review" form: author, location (optional), star rating picker, title, body
- Validation and success confirmation

**Related Products**
- Horizontal scroll row of up to 4 related products (same category + gender or collection)
- Each card: image, collection, name, price with hover effect

**Recently Viewed**
- Tracks last 4 visited product IDs in localStorage
- Renders a horizontal scroll row of those products (excluding the current one)
- Appears after at least one prior product has been visited

---

## Accessories Page

- Landing page with Jewelry and Straps category cards (image + label + description)
- Per-category grid (2 col mobile → 4 col desktop)
- Product cards with image, name, description snippet, price, new badge, low-stock badge
- Hover: scale + "Quick View / →" slide-up buttons
- Quick View modal (same as Collections)
- Add to cart with success animation

---

## Quick View Modal

- Triggered by "Quick View" button on any product card (Collections + Accessories)
- Slide-up + fade animation with backdrop blur
- Left: product image with new/low-stock badge
- Right: collection badge, name, divider, tags, color picker, price, Add to Cart button, "View Full Details" link
- Color picker updates displayed image
- Add to Cart animates to success state and opens Cart Drawer
- ESC or backdrop click to close

---

## Cart Drawer

- Slides in from the right with backdrop blur
- Opens automatically when any item is added to cart
- Opens manually via Navbar cart icon
- ESC or backdrop click to close
- Item rows: product image (links to detail), collection badge, name, variant, engraving text (if present)
- Per-item quantity controls (− / count / +) and remove (×)
- Subtotal formatted in selected currency
- "Shipping & taxes calculated at checkout" note
- Gold "Checkout" button → navigates to `/checkout`
- "View Full Cart" text link → navigates to `/cart`
- Empty state: icon, copy, "Browse Collections" link

---

## Cart Page

- Full cart view at `/cart`
- Product image (links to detail page), collection, name, variant, engraving text
- Inline quantity controls + remove with confirmation ("Are you sure? Yes / No")
- Desktop: qty and price columns in grid layout
- Mobile: qty and remove inline below product info
- Order summary sidebar: subtotal, shipping (Free), total
- Promo code input with apply/remove: `MULCO10`, `BOLD15`, `WELCOME20`, `SPRING25`
- Currency disclaimer shown when non-USD currency is selected
- Proceed to Checkout button
- Empty cart state with browse link
- Cart persists via localStorage across sessions

---

## Checkout

**Step 1 — Information**
- First name, last name, email, phone (auto-formatted)
- Address with Google Places autocomplete (when `VITE_GOOGLE_MAPS_API_KEY` is set)
- City, state, zip, country
- Input validation before advancing

**Step 2 — Payment**
- Payment trust icons: Visa, Mastercard, Amex, PayPal, Apple Pay
- Card name, card number (auto-grouped into 4s), expiry (MM / YY), CVV
- Promo code carry-over from cart
- Order summary sidebar with all line items
- 256-bit SSL secure checkout badge
- Currency disclaimer for non-USD selections

**Step 3 — Confirmation**
- Generated order number (format: `MLQ-XXXXXX-XXXX`)
- Summary of items, discount, and final total
- Shipping address recap
- "Continue Shopping" button clears cart and returns to collections

**Step progress bar** — visual stepper with gold fill for completed steps

---

## Currency Switcher

- Supported currencies: USD, EUR, GBP, MXN, COP
- Static exchange rates applied at display time (USD base)
- MXN and COP formatted with `toLocaleString` + rounding; others use 2 decimal places
- Selection persists in localStorage (`mulco-currency`)
- Applied across: Collections, Accessories, Product Detail, Search Modal, Cart Drawer, Cart Page, Checkout
- Non-USD disclaimer shown in Cart and Checkout

---

## Language Support

- Toggle between English (EN) and Spanish (ES)
- Translations applied to: Navbar, Hero, Footer, Product pages, Cart, Checkout, and more
- Language toggle in Navbar (desktop) and Mobile Nav

---

## Campaign Films Page

- Three YouTube videos with thumbnail-first loading (no iframe until clicked)
- Featured film displayed full-width
- Two secondary films in a 2-column grid
- Label badges per video (Collection Film, Brand Campaign, Press & Events)
- Description caption below each tile
- Videos: The New Buzo Collection, Campaign Film, MULCO at the Grammys

---

## Global UI Components

**Payment Icons**
- Visa, Mastercard, Amex, PayPal, Apple Pay rendered as styled card badges
- Present in: Checkout payment step, Checkout order summary, Footer

**Low-Stock Badges**
- "Only X left" overlay badge on product cards (Collections + Accessories)
- "Only X left in stock — order soon" callout on Product Detail
- Shown when `stock ≤ 5`

**WhatsApp Widget**
- Fixed floating button (bottom-right, z-index above all content)
- Custom SVG WhatsApp icon with green glow shadow
- Tooltip slides in on hover with brand styling
- Links to Mulco's verified WhatsApp Business link

**Cookie Consent Banner**
- Appears on first visit
- Accept / Decline actions
- Persists decision in localStorage

**Scroll To Top**
- Automatically scrolls to top on every route change

**404 Not Found Page**
- Branded page with "Error 404" eyebrow, serif headline, and description
- CTAs: "Browse Collections" and "Back to Home"

---

## Footer

- Centered Mulco logo
- Three navigation columns: Shop, About, Support
- As Seen In strip: E! Entertainment (Grammy Awards Sponsor), Fratello Watches (Featured Review), The Grammy Awards (Official Sponsor) — all with external links
- Social icons: Instagram, Facebook, Twitter
- Payment trust icons row
- Copyright, address (19790 W Dixie Hwy, Suite 201, Aventura, FL 33180)
- Legal links: Privacy Policy · Terms & Conditions · Shipping · Returns

---

## Engraving

- Available on all watch products in the Product Detail page
- Checkbox to enable; reveals text input when checked
- Maximum 20 characters with live character counter
- Adds $15 to the item price
- Engraving text displayed italicized in Cart Drawer, Cart Page, and Checkout Order Summary

---

## Recently Viewed

- Tracks the last 4 unique product detail pages visited (localStorage key: `mulco-recently-viewed`)
- Displayed as a horizontal scroll row on the Product Detail page
- Excludes the currently viewed product
- Reuses the RelatedCard component (image, collection, name, price)

---

## Performance & Code Quality

- Lazy loading (`loading="lazy"`, `decoding="async"`) on all product images
- `will-change: transform` and GPU compositing hints on animated images
- Scroll-triggered animations via custom `useInView` hook (IntersectionObserver)
- Staggered animation delays on grid cards
- `useCallback` and `useMemo` for expensive computations
- All state persisted where appropriate (cart, currency, language, reviews, recently viewed)
- Zero TypeScript errors (`npx tsc --noEmit` passes clean)

---

## Security

- Email sanitization on newsletter input
- Input validation on all checkout form fields
- `rel="noopener noreferrer"` on all external links
- No raw HTML injection; all user input rendered as text content
- `noValidate` + manual validation pattern on forms to control error UX
