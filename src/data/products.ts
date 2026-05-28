export interface Product {
  id: string;
  name: string;
  collection: string;
  category: 'watches' | 'jewelry' | 'straps';
  gender: 'women' | 'men' | 'unisex';
  price: number;
  originalPrice?: number;
  images: string[];
  tags: string[];
  description: string;
  specs: {
    // Watch-specific
    movement?: string;
    waterResistance?: string;
    caseDiameter?: string;
    caseMaterial?: string;
    bandType?: string;
    crystalType?: string;
    // Jewelry & Strap-specific
    material?: string;
    finish?: string;
    dimensions?: string;
    closure?: string;
  };
  isNew?: boolean;
  isFeatured?: boolean;
  isSoldOut?: boolean;
}

export const products: Product[] = [

  // ── WATCHES — WOMEN'S ─────────────────────────────────────────────────────

  {
    id: 'blue-marine-fusion',
    name: 'Blue Marine Fusion',
    collection: 'Blue Marine',
    category: 'watches',
    gender: 'women',
    price: 205,
    images: [
      '/images/watches/blue_marine_fusion/white/blue_marine_fusion_white.jpg',
      '/images/watches/blue_marine_fusion/detail/blue_marine_fusion_detail_01.jpg',
      '/images/watches/blue_marine_fusion/blue/blue_marine_fusion_blue.jpg',
    ],
    tags: ['Swarovski Crystals', 'Quartz', '100M Water Resistant'],
    description:
      'Experience the perfect fusion of luxury and sport. Crafted with stainless steel, adorned with sparkling Swarovski crystals, and paired with a pure silicone band. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '47mm',
      caseMaterial: 'Stainless Steel with Rose Gold Accent',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isFeatured: true,
  },
  {
    id: 'blue-marine-infinity',
    name: 'Blue Marine Infinity',
    collection: 'Blue Marine',
    category: 'watches',
    gender: 'women',
    price: 185,
    images: [
      '/images/watches/blue_marine_infinity/blue/blue_marine_infinity_blue.jpg',
      '/images/watches/blue_marine_infinity/detail/blue_marine_infinity_detail_01.jpg',
      '/images/watches/blue_marine_infinity/white/blue_marine_infinity_white.jpg',
    ],
    tags: ['Mother of Pearl', 'Quartz', '100M Water Resistant'],
    description:
      'Designed with luxury in mind, featuring a mother-of-pearl sundial display, stainless steel case, and pure silicone band. Available in 9 stunning colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '42mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
  },
  {
    id: 'blue-marine-medusa',
    name: 'Blue Marine Medusa',
    collection: 'Blue Marine',
    category: 'watches',
    gender: 'women',
    price: 196,
    images: [
      '/images/watches/blue_marine_medusa/white/blue_marine_medusa_white.jpg',
      '/images/watches/blue_marine_medusa/detail/blue_marine_medusa_detail_02.jpg',
      '/images/watches/blue_marine_medusa/detail/blue_marine_medusa_detail_05.jpg',
    ],
    tags: ['Quartz Multifunctional', 'Silicone Band', '100M Water Resistant'],
    description:
      'Draws inspiration from rare, electrifying jellyfish that glow in the deep ocean. A bold statement of femininity and oceanic elegance. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '43mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isFeatured: true,
  },
  {
    id: 'enchanted-maple',
    name: 'Enchanted Maple',
    collection: 'Enchanted',
    category: 'watches',
    gender: 'women',
    price: 195,
    images: [
      '/images/watches/enchanted_maple/pink/enchanted_maple_pink.jpg',
      '/images/watches/enchanted_maple/detail/enchanted_maple_detail_02.jpg',
      '/images/watches/enchanted_maple/blue/enchanted_maple_blue.jpg',
    ],
    tags: ['Rose Gold Details', 'Quartz', '100M Water Resistant'],
    description:
      'Inspired by the vibrant colors of the season and Maple trees, with rose gold details and silicone band. Water-resistant up to 100 meters. Available in 9 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
  },
  {
    id: 'enchanted-quartz',
    name: 'Enchanted Quartz',
    collection: 'Enchanted',
    category: 'watches',
    gender: 'women',
    price: 196,
    images: [
      '/images/watches/enchanted_quartz/white/enchanted_quartz_white.jpg',
      '/images/watches/enchanted_quartz/detail/enchanted_quartz_detail_01.jpg',
      '/images/watches/enchanted_quartz/detail/enchanted_quartz_detail_02.jpg',
    ],
    tags: ['Mother of Pearl', 'Rose Gold Accents', '100M Water Resistant'],
    description:
      'Features a mother-of-pearl display with rose gold accents and comes in six color variants. Backed by a two-year manufacturer warranty.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
  },
  {
    id: 'kripton-lady',
    name: 'Kripton Lady',
    collection: 'Kripton',
    category: 'watches',
    gender: 'women',
    price: 215,
    images: [
      '/images/watches/kripton_lady/white/kripton_lady_white.jpg',
      '/images/watches/kripton_lady/detail/kripton_lady_detail_07.jpg',
      '/images/watches/kripton_lady/detail/kripton_lady_detail_13.jpg',
    ],
    tags: ['Pearl Finish Dial', 'Rose Gold Accents', '100M Water Resistant'],
    description:
      'A luxury women\'s timepiece featuring a pearl finish sundial and rose gold accents, combining elegance with sport-ready durability. Available in 7 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '44mm',
      caseMaterial: 'Stainless Steel with Rose Gold Accents',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  {
    id: 'kripton-royale-lady',
    name: 'Kripton Royale Lady',
    collection: 'Kripton',
    category: 'watches',
    gender: 'women',
    price: 205,
    images: [
      '/images/watches/kripton_royale_lady/pink/kripton_royale_lady_pink.jpg',
      '/images/watches/kripton_royale_lady/detail/kripton_royale_lady_detail_01.jpg',
      '/images/watches/kripton_royale_lady/detail/kripton_royale_lady_detail_02.jpg',
    ],
    tags: ['Textured Dial', 'Rose Gold Accents', '100M Water Resistant'],
    description:
      'An elegant timepiece featuring a textured dial with rose gold accents, inspired by aristocratic sophistication and timeless elegance. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
  },
  {
    id: 'dreamcatcher',
    name: 'Dreamcatcher',
    collection: 'Dreamcatcher',
    category: 'watches',
    gender: 'women',
    price: 245,
    images: [
      '/images/watches/dreamcatcher/white/dreamcatcher_white.jpg',
      '/images/watches/dreamcatcher/detail/dreamcatcher_detail_01.jpg',
      '/images/watches/dreamcatcher/detail/dreamcatcher_detail_02.jpg',
    ],
    tags: ['Quartz Multifunctional', 'Silicone Band', '100M Water Resistant'],
    description:
      'A watch that holds time like a dream suspended in silence. Subtle, mysterious, woven with intention. Available in 5 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'la-fleur-gardenia',
    name: 'La Fleur Gardenia',
    collection: 'La Fleur',
    category: 'watches',
    gender: 'women',
    price: 195,
    images: [
      '/images/watches/la_fleur_gardenia/white/la_fleur_gardenia_white.jpg',
      '/images/watches/la_fleur_gardenia/detail/la_fleur_gardenia_detail_01.jpg',
      '/images/watches/la_fleur_gardenia/detail/la_fleur_gardenia_detail_02.jpg',
    ],
    tags: ['Swarovski Crystals', 'Floral Design', '100M Water Resistant'],
    description:
      'Inspired by the elegance of the Gardenia flower, combining refined beauty with subtle sophistication — capturing the timeless grace and delicate allure of nature. Available in 7 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
  },
  {
    id: 'lady-d',
    name: 'Lady D',
    collection: 'Lady D',
    category: 'watches',
    gender: 'women',
    price: 195,
    images: [
      '/images/watches/lady_d/detail/lady_d_detail_01.jpg',
      '/images/watches/lady_d/detail/lady_d_detail_02.jpg',
      '/images/watches/lady_d/detail/lady_d_detail_03.jpg',
    ],
    tags: ['Pearl Accents', 'Rose Gold', '100M Water Resistant'],
    description:
      'A sophisticated timepiece with tweed, embroidery, pearl, and rose gold accents in heavy-duty silicone — suitable for everyday wear with a touch of couture. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '44mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  {
    id: 'm10-namaste',
    name: 'M10 Namaste',
    collection: 'M10',
    category: 'watches',
    gender: 'women',
    price: 195,
    images: [
      '/images/watches/m10_namaste/purple/m10_namaste_purple.jpg',
      '/images/watches/m10_namaste/detail/m10_namaste_detail_01.jpg',
      '/images/watches/m10_namaste/detail/m10_namaste_detail_02.jpg',
    ],
    tags: ['Zen Design', 'Rose Gold', '100M Water Resistant'],
    description:
      'Inspired to maintain your spirit and mind in a Zen mental state. The M10 Namaste features rose gold accents and a silicone band for daily wear. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '43mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  {
    id: 'frost-full-moon',
    name: 'Frost Full Moon',
    collection: 'Frost',
    category: 'watches',
    gender: 'women',
    price: 200,
    images: [
      '/images/watches/frost_full_moon/red/frost_full_moon_red.jpg',
      '/images/watches/frost_full_moon/detail/frost_full_moon_detail_01.jpg',
      '/images/watches/frost_full_moon/detail/frost_full_moon_detail_02.jpg',
    ],
    tags: ['Mother of Pearl', 'Swarovski Stones', '100M Water Resistant'],
    description:
      'Features mother-of-pearl accents, Swarovski stones, and rose gold detailing. The Frost Full Moon is a luminous statement for every occasion. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '44mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  {
    id: 'freedom',
    name: 'Freedom',
    collection: 'Freedom',
    category: 'watches',
    gender: 'women',
    price: 175,
    originalPrice: 205,
    images: [
      '/images/watches/freedom/yellow/freedom_yellow.jpg',
      '/images/watches/freedom/detail/freedom_detail_01.jpg',
      '/images/watches/freedom/detail/freedom_detail_02.jpg',
    ],
    tags: ['Quartz Multifunctional', 'Silicone Band', '100M Water Resistant'],
    description:
      'A bold silicone timepiece with multifunction capabilities and durable construction. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  {
    id: 'titans-snap-ladies',
    name: 'Titans Snap Ladies',
    collection: 'Titans',
    category: 'watches',
    gender: 'women',
    price: 140,
    originalPrice: 195,
    images: [
      '/images/watches/titans_snap_ladies/blue/titans_snap_ladies_blue.jpg',
      '/images/watches/titans_snap_ladies/detail/titans_snap_ladies_detail_01.jpg',
      '/images/watches/titans_snap_ladies/white/titans_snap_ladies_white.jpg',
    ],
    tags: ['Quartz', 'Stainless Steel', '100M Water Resistant'],
    description:
      'Luxury and function in one. Stainless steel case, silicone band, anti-scratch coating, quartz movement, and 10 ATM water resistance. Available in 8 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '44mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },

  // ── WATCHES — UNISEX ──────────────────────────────────────────────────────

  {
    id: 'mulco-breathe',
    name: 'Mulco Breathe',
    collection: 'Breathe',
    category: 'watches',
    gender: 'unisex',
    price: 195,
    images: [
      '/images/watches/mulco_breathe/white/mulco_breathe_white.jpg',
      '/images/watches/mulco_breathe/detail/mulco_breathe_detail_01.jpg',
      '/images/watches/mulco_breathe/detail/mulco_breathe_detail_02.jpg',
    ],
    tags: ['Mother of Pearl', 'Embossed Dial', '100M Water Resistant'],
    description:
      'A timepiece featuring mother-of-pearl finishes and an embossed sundial design that encourages mindful living. Available for women and men in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  {
    id: 'era-50',
    name: 'Era 50',
    collection: 'Era',
    category: 'watches',
    gender: 'unisex',
    price: 160,
    originalPrice: 210,
    images: [
      '/images/watches/era_50/black/era_50_black.jpg',
      '/images/watches/era_50/detail/era_50_detail_01.jpg',
      '/images/watches/era_50/detail/era_50_detail_02.jpg',
    ],
    tags: ['Luminous Markers', 'Stainless Steel', '100M Water Resistant'],
    description:
      'Durable, waterproof watch ready for adventure with luminous markers and stainless steel construction. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '44mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  {
    id: 'pride',
    name: 'Pride',
    collection: 'Pride',
    category: 'watches',
    gender: 'unisex',
    price: 175,
    originalPrice: 205,
    images: [
      '/images/watches/pride/white/pride_white.jpg',
      '/images/watches/pride/detail/pride_detail_01.jpg',
      '/images/watches/pride/detail/pride_detail_02.jpg',
    ],
    tags: ['Quartz Multifunctional', 'Luminous', '100M Water Resistant'],
    description:
      'A vibrant timepiece celebrating self-acceptance, featuring the "I DECIDE" design on the dial with luminous elements. Available in white, black, and rose gold.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },

  // ── WATCHES — MEN'S ───────────────────────────────────────────────────────

  {
    id: 'buzo-tentacles',
    name: 'Buzo Tentacles',
    collection: 'Buzo',
    category: 'watches',
    gender: 'men',
    price: 215,
    images: [
      '/images/watches/buzo_tentacles/blue/buzo_tentacles_blue.jpg',
      '/images/watches/buzo_tentacles/detail/buzo_tentacles_detail_01.jpg',
      '/images/watches/buzo_tentacles/white/buzo_tentacles_white.jpg',
    ],
    tags: ['Quartz Multifunctional', 'IP Black Steel', '100M Water Resistant'],
    description:
      'Inspired by octopus camouflage, combining sleek design with adaptive innovation. IP black stainless steel case, 51mm. Available in 5 colorways.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '51mm',
      caseMaterial: 'Stainless Steel & IP Black',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isFeatured: true,
  },
  {
    id: 'buzo-atlantis',
    name: 'Buzo Atlantis',
    collection: 'Buzo',
    category: 'watches',
    gender: 'men',
    price: 245,
    images: [
      '/images/watches/buzo_atlantis/black_and_pink/buzo_atlantis_black_and_pink.jpg',
      '/images/watches/buzo_atlantis/detail/buzo_atlantis_detail_01.jpg',
      '/images/watches/buzo_atlantis/ochre/buzo_atlantis_ochre.jpg',
    ],
    tags: ['Quartz Multifunctional', 'Silicone Band', '100M Water Resistant'],
    description:
      'Inspired by the mythical city of Atlantis — merging timeless design with the mysterious depths of the lost city. Bold 46mm case. Available in 5 colorways.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
  },
  {
    id: 'buzo-dive-silicone',
    name: 'Buzo Dive Silicone',
    collection: 'Buzo',
    category: 'watches',
    gender: 'men',
    price: 220,
    images: [
      '/images/watches/buzo_dive_silicone/black_and_rose_gold/buzo_dive_silicone_black_and_rose_gold.jpg',
      '/images/watches/buzo_dive_silicone/blue/buzo_dive_silicone_blue.jpg',
      '/images/watches/buzo_dive_silicone/detail/buzo_dive_silicone_detail_07.jpg',
    ],
    tags: ['Chronograph', 'Black Steel', '100M Water Resistant'],
    description:
      'Perfect for water adventures with an elegant and adventurous style. Chronograph movement, flame fusion crystal. Available in 9 colors.',
    specs: {
      movement: 'Miyota JS05 Quartz Chronograph',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Black Stainless Steel',
      bandType: '"A" Quality Silicone',
      crystalType: 'Flame Fusion Crystal',
    },
  },
  {
    id: 'buzo-dive-stainless-steel',
    name: 'Buzo Dive Stainless Steel',
    collection: 'Buzo',
    category: 'watches',
    gender: 'men',
    price: 245,
    images: [
      '/images/watches/buzo_dive_stainless/gold_and_white/buzo_dive_stainless_gold_and_white.jpg',
      '/images/watches/buzo_dive_stainless/silver_and_black/buzo_dive_stainless_silver_and_black.jpg',
      '/images/watches/buzo_dive_stainless/detail/buzo_dive_stainless_detail_03.jpg',
    ],
    tags: ['Chronograph', 'Steel Bracelet', '100M Water Resistant'],
    description:
      'Sport functionality with premium construction. Chronograph movement and stainless steel bracelet with removable links. Available in 6 finishes.',
    specs: {
      movement: 'Quartz Chronograph',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Stainless Steel Bracelet',
      crystalType: 'Mineral Anti-Scratch',
    },
    isFeatured: true,
  },
  {
    id: 'cobra',
    name: 'COBRA',
    collection: 'Cobra',
    category: 'watches',
    gender: 'men',
    price: 205,
    images: [
      '/images/watches/cobra/yellow/cobra_yellow.jpg',
      '/images/watches/cobra/blue/cobra_blue.jpg',
      '/images/watches/cobra/black_and_red/cobra_black_and_red.jpg',
    ],
    tags: ['Miyota Quartz', 'Ion-Plated Steel', '100M Water Resistant'],
    description:
      'Exudes bravery, heroism, and persistence. Sporty steel case through a 48-hour ionization process, delivering a tasteful yet commanding aesthetic. Available in 6 colorways.',
    specs: {
      movement: 'Miyota JP25 Quartz',
      waterResistance: '100M',
      caseDiameter: '48mm',
      caseMaterial: 'Stainless Steel (Ion-Plated)',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Crystal',
    },
    isNew: true,
  },
  {
    id: 'kripton-royale-gents',
    name: 'Kripton Royale Gents',
    collection: 'Kripton',
    category: 'watches',
    gender: 'men',
    price: 215,
    images: [
      '/images/watches/kripton_royale_gents/black_and_pink/kripton_royale_gents_black_and_pink.jpg',
      '/images/watches/kripton_royale_gents/detail/kripton_royale_gents_detail_01.jpg',
      '/images/watches/kripton_royale_gents/detail/kripton_royale_gents_detail_02.jpg',
    ],
    tags: ['Quartz Multifunctional', 'Bold Luxury', '100M Water Resistant'],
    description:
      'Blends bold luxury with timeless style, offering a striking design that exudes confidence and sophistication with every glance. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
  },
  {
    id: 'kripton-square',
    name: 'Kripton Square',
    collection: 'Kripton',
    category: 'watches',
    gender: 'men',
    price: 255,
    images: [
      '/images/watches/kripton_square/white/kripton_square_white.jpg',
      '/images/watches/kripton_square/detail/kripton_square_detail_01.jpg',
      '/images/watches/kripton_square/detail/kripton_square_detail_02.jpg',
    ],
    tags: ['Square Case', 'Quartz Analog', '100M Water Resistant'],
    description:
      'Inspired by 1850s style, the Kripton Square features a distinctive square case with precious metal accents and a classic aesthetic built for the modern gentleman. Available in 5 colors.',
    specs: {
      movement: 'Quartz Analog & Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
    isNew: true,
  },
  {
    id: 'kripton-viper',
    name: 'Kripton Viper',
    collection: 'Kripton',
    category: 'watches',
    gender: 'men',
    price: 180,
    originalPrice: 275,
    images: [
      '/images/watches/kripton_viper/neon_green/kripton_viper_neon_green.jpg',
      '/images/watches/kripton_viper/detail/kripton_viper_detail_01.jpg',
      '/images/watches/kripton_viper/detail/kripton_viper_detail_02.jpg',
    ],
    tags: ['Quartz Multifunctional', 'Date Window', '100M Water Resistant'],
    description:
      'Features a semicircular date window and curved case designed for comfort. High quality, water-resistant construction with a bold sporty profile. Available in 8 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  {
    id: 'evol-reloaded',
    name: 'Evol Reloaded',
    collection: 'Evol',
    category: 'watches',
    gender: 'men',
    price: 205,
    images: [
      '/images/watches/evol_reloaded/white/evol_reloaded_white.jpg',
      '/images/watches/evol_reloaded/detail/evol_reloaded_detail_01.jpg',
      '/images/watches/evol_reloaded/detail/evol_reloaded_detail_02.jpg',
    ],
    tags: ['Radial Sunray Dial', 'IP Black Steel', '100M Water Resistant'],
    description:
      'A sleek 46mm watch featuring a radial sunray texture display and stainless steel with IP black construction. Built for the man who demands both style and endurance. Available in 6 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel & IP Black',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },

  // ── JEWELRY — WOMEN'S ─────────────────────────────────────────────────────

  {
    id: 'big-star-chain-necklace',
    name: 'Big Star Chain Necklace',
    collection: 'Necklaces',
    category: 'jewelry',
    gender: 'women',
    price: 32,
    images: [
      '/images/jewelry/big_star_chain_necklace/big_star_chain_necklace_01.jpg',
      '/images/jewelry/big_star_chain_necklace/big_star_chain_necklace_02.jpg',
    ],
    tags: ['Cubic Zirconia', 'White Gold Dipped', 'Layerable'],
    description:
      'A delicate white gold-dipped chain pendant necklace with cubic zirconia star accents, designed to be worn alone or layered with a choker for a statement look.',
    specs: {
      material: 'White Gold-Dipped Brass',
      finish: 'High Polish',
      closure: 'Lobster Clasp',
    },
  },
  {
    id: 'chunky-hoop-earrings',
    name: 'Chunky Hoop Earrings',
    collection: 'Earrings',
    category: 'jewelry',
    gender: 'women',
    price: 25,
    images: [
      '/images/jewelry/chunky_hoop_earrings/chunky_hoop_earrings_01.jpg',
      '/images/jewelry/chunky_hoop_earrings/chunky_hoop_earrings_02.jpg',
      '/images/jewelry/chunky_hoop_earrings/chunky_hoop_earrings_03.jpg',
    ],
    tags: ['Stainless Steel', 'Hypoallergenic', 'Gold or Silver'],
    description:
      'Bold 31mm hypoallergenic stainless steel hoop earrings available in sleek silver or 18K gold-plated finishes. A wardrobe essential with effortless impact.',
    specs: {
      material: 'Stainless Steel',
      finish: '18K Gold Plated or Silver',
      dimensions: '31mm diameter',
    },
  },
  {
    id: 'connecting-drop-chain-earrings',
    name: 'Connecting Drop Chain Earrings',
    collection: 'Earrings',
    category: 'jewelry',
    gender: 'women',
    price: 46,
    images: [
      '/images/jewelry/connecting_drop_chain_earrings/connecting_drop_chain_earrings_01.png',
      '/images/jewelry/connecting_drop_chain_earrings/connecting_drop_chain_earrings_02.jpg',
      '/images/jewelry/connecting_drop_chain_earrings/connecting_drop_chain_earrings_03.jpg',
    ],
    tags: ['Drop Style', 'Chain Link', 'Classic Design'],
    description:
      'Elegant drop chain earrings crafted from high-quality materials with a classic, timeless design that complements any look from casual to black tie.',
    specs: {
      material: 'Gold-Plated Brass',
      finish: 'High Polish',
      closure: 'Post & Butterfly Back',
    },
  },
  {
    id: 'entwined-hoop-earrings',
    name: 'Entwined Hoop Earrings',
    collection: 'Earrings',
    category: 'jewelry',
    gender: 'women',
    price: 22,
    images: [
      '/images/jewelry/entwined_hoop_earrings/entwined_hoop_earrings_01.jpg',
      '/images/jewelry/entwined_hoop_earrings/entwined_hoop_earrings_02.jpg',
      '/images/jewelry/entwined_hoop_earrings/entwined_hoop_earrings_03.jpg',
    ],
    tags: ['Hoop', 'Gold & Silver', 'Everyday Wear'],
    description:
      'Sophisticated hoop earrings with an entwined design in gold and sterling silver, suitable for everyday wear or elevated occasions.',
    specs: {
      material: 'Gold & Sterling Silver',
      finish: 'High Polish',
      closure: 'Post & Butterfly Back',
    },
  },
  {
    id: 'u-hoop-earrings',
    name: 'U Hoop Earrings',
    collection: 'Earrings',
    category: 'jewelry',
    gender: 'women',
    price: 17,
    images: [
      '/images/jewelry/u_hoop_earrings/u_hoop_earrings_01.jpg',
      '/images/jewelry/u_hoop_earrings/u_hoop_earrings_02.png',
      '/images/jewelry/u_hoop_earrings/u_hoop_earrings_03.png',
    ],
    tags: ['Minimalist', 'Everyday', 'U-Shape'],
    description:
      'Minimalist U-shaped hoop earrings crafted from high-quality materials for a clean, timeless look. Perfect for everyday wear, day to night.',
    specs: {
      material: 'Stainless Steel',
      finish: 'High Polish',
      closure: 'Post & Butterfly Back',
    },
  },
  {
    id: 'a-round-tennis-bracelet',
    name: 'A+ Round Tennis Bracelet',
    collection: 'Bracelets',
    category: 'jewelry',
    gender: 'women',
    price: 45,
    images: [
      '/images/jewelry/a_round_tennis_bracelet/a_round_tennis_bracelet_01.jpg',
      '/images/jewelry/a_round_tennis_bracelet/a_round_tennis_bracelet_02.jpg',
      '/images/jewelry/a_round_tennis_bracelet/a_round_tennis_bracelet_03.jpg',
    ],
    tags: ['Zirconia', 'Butterfly Clasp', 'Gold or Silver'],
    description:
      'An elegant tennis bracelet adorned with round zircon stones and a butterfly clasp. Available in rhodium-plated or rose gold finishes — effortless luxury for every wrist.',
    specs: {
      material: 'Stainless Steel',
      finish: 'Rhodium Plated or Rose Gold',
      closure: 'Butterfly Clasp',
    },
  },

  // ── JEWELRY — UNISEX ──────────────────────────────────────────────────────

  {
    id: 'havana-gold-chain-necklace',
    name: 'Havana Gold Chain Necklace',
    collection: 'Necklaces',
    category: 'jewelry',
    gender: 'unisex',
    price: 36,
    images: [
      '/images/jewelry/havana_gold_chain_necklace/havana_gold_chain_necklace_01.jpg',
      '/images/jewelry/havana_gold_chain_necklace/havana_gold_chain_necklace_02.jpg',
      '/images/jewelry/havana_gold_chain_necklace/havana_gold_chain_necklace_03.jpg',
    ],
    tags: ['Cubic Zirconia', 'Gold Dipped', 'Adjustable'],
    description:
      'A gold-dipped chain pendant with cubic zirconia accents and an adjustable lobster clasp. Perfect for solo wear or layering — a versatile statement for any wardrobe.',
    specs: {
      material: 'Gold-Dipped Brass',
      finish: '18K Gold Plated',
      closure: 'Lobster Clasp',
    },
  },
  {
    id: 'star-shape-zirconia-ring',
    name: 'Star Shape Zirconia Ring',
    collection: 'Rings',
    category: 'jewelry',
    gender: 'unisex',
    price: 79,
    images: [
      '/images/jewelry/star_shape_zirconia_ring/star_shape_zirconia_ring_01.jpg',
      '/images/jewelry/star_shape_zirconia_ring/star_shape_zirconia_ring_02.jpg',
    ],
    tags: ['Sterling Silver 925', 'Two-Finger', 'Pavé Zirconia'],
    description:
      'A sterling silver 925 double-finger ring featuring a star-shaped design covered in pavé clear zirconia with a polished shiny finish. A bold declaration of style.',
    specs: {
      material: 'Sterling Silver 925',
      finish: 'High Polish',
    },
  },
  {
    id: 'bar-pave-bangle-bracelet',
    name: 'Bar Pave Bangle Bracelet',
    collection: 'Bracelets',
    category: 'jewelry',
    gender: 'unisex',
    price: 28,
    images: [
      '/images/jewelry/bar_pave_bangle_bracelet/bar_pave_bangle_bracelet_01.jpg',
      '/images/jewelry/bar_pave_bangle_bracelet/bar_pave_bangle_bracelet_02.jpg',
      '/images/jewelry/bar_pave_bangle_bracelet/bar_pave_bangle_bracelet_03.jpg',
    ],
    tags: ['Pavé Zircon', 'Magnetic Closure', 'Silver / Gold / Rose Gold'],
    description:
      'A stainless steel bangle with pavé zircon accents and a magnetic closure. Available in silver, gold, or rose gold — built for everyday luxury.',
    specs: {
      material: 'Stainless Steel',
      finish: 'Silver, Gold, or Rose Gold',
      closure: 'Magnetic',
    },
  },
  {
    id: 'braided-leather-bracelet',
    name: 'Braided Leather Bracelet',
    collection: 'Bracelets',
    category: 'jewelry',
    gender: 'unisex',
    price: 35,
    images: [
      '/images/jewelry/braided_leather_bracelet/braided_leather_bracelet_01.jpg',
      '/images/jewelry/braided_leather_bracelet/braided_leather_bracelet_02.jpg',
      '/images/jewelry/braided_leather_bracelet/braided_leather_bracelet_03.jpg',
    ],
    tags: ['Genuine Leather', 'Stainless Steel', 'Magnetic Closure'],
    description:
      'A stainless steel and genuine leather bracelet with a braided design and magnetic closure. Available in multiple color options with a 2-year warranty.',
    specs: {
      material: 'Genuine Leather & Stainless Steel',
      finish: 'Multiple Colors',
      closure: 'Magnetic',
    },
  },
  {
    id: 'love-bracelet',
    name: 'Love Bracelet',
    collection: 'Bracelets',
    category: 'jewelry',
    gender: 'unisex',
    price: 33,
    images: [
      '/images/jewelry/love_bracelet/love_bracelet_01.jpg',
      '/images/jewelry/love_bracelet/love_bracelet_02.jpg',
      '/images/jewelry/love_bracelet/love_bracelet_03.png',
    ],
    tags: ['Chain Link', 'Love Charm', 'Silver or Gold'],
    description:
      'A sterling silver chain bracelet with an engraved love charm accent and adjustable lobster clasp. Available in silver and gold finishes — a gift that says everything.',
    specs: {
      material: 'Sterling Silver',
      finish: 'Silver or Gold',
      closure: 'Lobster Clasp',
    },
  },
  {
    id: 'oval-zirconia-bracelet',
    name: 'Oval Zirconia Bracelet',
    collection: 'Bracelets',
    category: 'jewelry',
    gender: 'unisex',
    price: 42,
    images: [
      '/images/jewelry/oval_zirconia_bracelet/oval_zirconia_bracelet_01.jpg',
      '/images/jewelry/oval_zirconia_bracelet/oval_zirconia_bracelet_02.jpg',
      '/images/jewelry/oval_zirconia_bracelet/oval_zirconia_bracelet_03.jpg',
    ],
    tags: ['Oval-Cut Zircon', 'Flexible Fit', 'Hypoallergenic'],
    description:
      'A flexible, adjustable stainless steel bangle featuring oval-cut zircon accents. Available in rhodium silver or 18K gold plating — hypoallergenic and built for daily wear.',
    specs: {
      material: 'Stainless Steel',
      finish: 'Rhodium Silver or 18K Gold',
      dimensions: 'Adjustable',
    },
  },

  // ── STRAPS ────────────────────────────────────────────────────────────────

  {
    id: 'silicone-strap-black',
    name: 'Silicone Watch Strap — Black',
    collection: 'Replacement Straps',
    category: 'straps',
    gender: 'unisex',
    price: 20,
    images: [
      '/images/straps/silicone_strap_black/silicone_strap_black_01.jpg',
      '/images/straps/silicone_strap_black/silicone_strap_black_02.jpg',
    ],
    tags: ['Silicone', 'Water Resistant', 'Universal Fit'],
    description:
      'Official Mulco replacement silicone strap in classic black. Compatible with most Mulco watch models. Features a stainless steel buckle and durable construction.',
    specs: {
      material: '100% Pure Silicone',
      finish: 'Matte Black',
      closure: 'Stainless Steel Buckle',
    },
  },
  {
    id: 'silicone-strap-yellow',
    name: 'Silicone Watch Strap — Yellow',
    collection: 'Replacement Straps',
    category: 'straps',
    gender: 'unisex',
    price: 20,
    images: [
      '/images/straps/silicone_strap_yellow/silicone_strap_yellow_01.jpg',
      '/images/straps/silicone_strap_yellow/silicone_strap_yellow_02.jpg',
    ],
    tags: ['Silicone', 'Water Resistant', 'Universal Fit'],
    description:
      'Official Mulco replacement silicone strap in vibrant yellow. Compatible with most Mulco watch models. Features a stainless steel buckle and lightweight silicone construction.',
    specs: {
      material: '100% Pure Silicone',
      finish: 'Vibrant Yellow',
      closure: 'Stainless Steel Buckle',
    },
  },
  {
    id: 'silicone-strap-white',
    name: 'Silicone Watch Strap — White',
    collection: 'Replacement Straps',
    category: 'straps',
    gender: 'unisex',
    price: 20,
    images: [
      '/images/straps/silicone_strap_yellow/silicone_strap_yellow_01.jpg',
      '/images/straps/silicone_strap_black/silicone_strap_black_02.jpg',
    ],
    tags: ['Silicone', 'Water Resistant', 'Universal Fit'],
    description:
      'Official Mulco replacement silicone strap in clean white. Compatible with most Mulco watch models. Features a stainless steel buckle and easy-swap design.',
    specs: {
      material: '100% Pure Silicone',
      finish: 'Clean White',
      closure: 'Stainless Steel Buckle',
    },
  },
  {
    id: 'silicone-strap-multicolor',
    name: 'Silicone Watch Strap — Multicolor',
    collection: 'Replacement Straps',
    category: 'straps',
    gender: 'unisex',
    price: 20,
    images: [
      '/images/straps/silicone_strap_black/silicone_strap_black_01.jpg',
      '/images/straps/silicone_strap_yellow/silicone_strap_yellow_02.jpg',
    ],
    tags: ['Silicone', 'Water Resistant', '20+ Colors Available'],
    description:
      'Official Mulco replacement silicone straps available in over 20 colors. Mix and match to express your style. Compatible with most Mulco watch models.',
    specs: {
      material: '100% Pure Silicone',
      finish: '20+ Color Options',
      closure: 'Stainless Steel Buckle',
    },
  },

];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByGender(gender: 'women' | 'men'): Product[] {
  return products.filter((p) => p.gender === gender || p.gender === 'unisex');
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter(
    (p) => p.collection.toLowerCase() === collection.toLowerCase()
  );
}

export function getRelatedProducts(id: string, limit = 4): Product[] {
  const current = getProductById(id);
  if (!current) return products.slice(0, limit);
  return products
    .filter(
      (p) =>
        p.id !== id &&
        p.category === current.category &&
        (p.gender === current.gender || p.collection === current.collection)
    )
    .slice(0, limit);
}
