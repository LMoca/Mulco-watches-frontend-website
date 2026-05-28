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
      '/images/watches/Blue_Marine_Fusion_White.jpg',
      '/images/watches/Fusion_1.jpg',
      '/images/watches/Blue_Marine_Fusion_Blue.jpg',
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
      '/images/watches/BlueMarineInfinityBlue.jpg',
      '/images/watches/Infinity_2_d311b037-4459-41be-87b4-72221e806bf5.jpg',
      '/images/watches/Blue_Marine_Infinity_White.jpg',
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
      '/images/watches/MW3-241029-012-Front_3.jpg',
      '/images/watches/Medusa_2.jpg',
      '/images/watches/MedusaBlack_Silver-2_1.jpg',
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
      '/images/watches/Enchanted_Maple_Pink.jpg',
      '/images/watches/Maple_9.jpg',
      '/images/watches/Enchanted_Maple_Blue.jpg',
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
      '/images/watches/Enchanted_Quartz_White_2.jpg',
      '/images/watches/Enchanted_Quartz_White_3.jpg',
      '/images/watches/Enchanted_Quartz_White_1.jpg',
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
      '/images/watches/kripton_lady_blanco_1.jpg',
      '/images/watches/Kripton_Lady_1.jpg',
      '/images/watches/KRIPTON_LADIES_NEGRO.jpg',
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
      '/images/watches/MW3-24993L-083-Front_1.jpg',
      '/images/watches/Kripton_Royal_Lady_2.jpg',
      '/images/watches/Kripton_royal_wopman_copia_4.jpg',
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
      '/images/watches/MW3-24053-013-Front.jpg',
      '/images/watches/Dream_catcher_4.jpg',
      '/images/watches/4_5387d335-9716-4d45-9ce4-25c29a79ccf3.jpg',
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
      '/images/watches/Gardenia-013_2.jpg',
      '/images/watches/Gardenia-013_3.jpg',
      '/images/watches/Gardenia-013_1.jpg',
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
      '/images/watches/Lady_D_4.jpg',
      '/images/watches/LAdy_d_4_1.jpg',
      '/images/watches/1500Photo_Jun_18_2024_5_26_14_PM.jpg',
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
      '/images/watches/M10NamastePurple.jpg',
      '/images/watches/Namaste_3.jpg',
      '/images/watches/M10_4_4.jpg',
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
      '/images/watches/Frost_Full_Moon_Red.jpg',
      '/images/watches/Frost_3.jpg',
      '/images/watches/Frost_3_1.jpg',
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
      '/images/watches/MW3-23928-803-Front.jpg',
      '/images/watches/Freedom_3.jpg',
      '/images/watches/Freedom_5.jpg',
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
      '/images/watches/MW3-22810L-043-Front.jpg',
      '/images/watches/Titan_6.jpg',
      '/images/watches/MW3-22810L-013-Front.jpg',
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
      '/images/watches/Breathe_whte.jpg',
      '/images/watches/Breathe_1.jpg',
      '/images/watches/Breathe_1_1.jpg',
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
      '/images/watches/Era_50_black.jpg',
      '/images/watches/Era_50_6.jpg',
      '/images/watches/Era_50_6_1.jpg',
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
      '/images/watches/MW3-23928-015-Front_2.jpg',
      '/images/watches/Pride_2.jpg',
      '/images/watches/Pride_1.jpg',
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
      '/images/watches/Tentacles_3_1.jpg',
      '/images/watches/Tentacles_4.jpg',
      '/images/watches/Tentacles5_1.jpg',
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
      '/images/watches/MW3-24979-028-Front_1.jpg',
      '/images/watches/Atlantis_3.jpg',
      '/images/watches/MW3-24979-305-Front_1.jpg',
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
      '/images/watches/Ajustes_buzo_Silicone_723_3.jpg',
      '/images/watches/Buzo_blue.jpg',
      '/images/watches/Buzo_Silicon_1.jpg',
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
      '/images/watches/Ajuste_Buzo_Steel_021_2.jpg',
      '/images/watches/Buzo_Metal_Gold_copia_2.jpg',
      '/images/watches/Buzo_Dive_Stainless_Steel_Silver_and_black_1.jpg',
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
      '/images/watches/Cobra_Yellow.jpg',
      '/images/watches/COBRA_Blue.jpg',
      '/images/watches/COBRA_Black.jpg',
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
      '/images/watches/MW3-24993G-085-Front.jpg',
      '/images/watches/Kripton_Royal_man_copia_5.jpg',
      '/images/watches/Royal_Hombre_copia_5.jpg',
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
      '/images/watches/MW3-241056-014-Front_1.jpg',
      '/images/watches/2_7a8d6e76-916c-4970-b0a8-a688f809b613.jpg',
      '/images/watches/Square_3-1.jpg',
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
      '/images/watches/MW5-4828-715Front_95c3790b-90b6-4c42-87a0-5996107fea4f.jpg',
      '/images/watches/Kripton_1.jpg',
      '/images/watches/Kripton_viper.jpg',
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
      '/images/watches/Evol_Reloaded_White.jpg',
      '/images/watches/Evol_6.jpg',
      '/images/watches/Reloaded_copia_2.jpg',
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
      '/images/jewelry/PhotoMay042023_52309PM.jpg',
      '/images/jewelry/IMG_3355.jpg',
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
      '/images/jewelry/110.jpg',
      '/images/jewelry/112.jpg',
      '/images/jewelry/Foto16-4-24_50642p.m.1000x1000.jpg',
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
      '/images/jewelry/2-_1.png',
      '/images/jewelry/27B.jpg',
      '/images/jewelry/27A.jpg',
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
      '/images/jewelry/37C.jpg',
      '/images/jewelry/30D.jpg',
      '/images/jewelry/30A.jpg',
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
      '/images/jewelry/WhatsAppImage2026-01-09at7.53.29PM.jpg',
      '/images/jewelry/7_1fb495c1-1c66-4888-b590-c170a162621f.png',
      '/images/jewelry/4_1c99a3fa-2e71-4896-a998-2d79ee28d6d0.png',
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
      '/images/jewelry/156.jpg',
      '/images/jewelry/4_fe8c4520-e9fe-47bc-ad64-e6aecedded11.jpg',
      '/images/jewelry/131_1de9ba1c-4768-47ff-9226-89d11f160ce9.jpg',
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
      '/images/jewelry/PhotoApr282023_75213PM.jpg',
      '/images/jewelry/PhotoApr282023_80949PM.jpg',
      '/images/jewelry/IMG_3410_1.jpg',
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
      '/images/jewelry/1.2.jpg',
      '/images/jewelry/1.1.jpg',
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
      '/images/jewelry/54.jpg',
      '/images/jewelry/12_ea6a67a9-89db-4bc2-a554-657e56aa778b.jpg',
      '/images/jewelry/23_15b74a84-6944-4aaa-9b77-c801ad05d90d.jpg',
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
      '/images/jewelry/Mesadetrabajo1copia12_1.jpg',
      '/images/jewelry/Mesadetrabajo1copia9_1.jpg',
      '/images/jewelry/19.jpg',
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
      '/images/jewelry/16B.jpg',
      '/images/jewelry/16A.jpg',
      '/images/jewelry/1._f338546a-bb89-4dc4-99b3-7651cc04e9cf.png',
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
      '/images/jewelry/152.jpg',
      '/images/jewelry/146.jpg',
      '/images/jewelry/144_83b4201d-8909-4363-84b3-16d3a2cc2794.jpg',
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
      '/images/straps/MW3-10302-033_a8928c04-41e5-4612-84dc-a3e1eea2d3fb.jpg',
      '/images/straps/MW3-10302-033.jpg',
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
      '/images/straps/MW1-10186-092_5e875868-6adf-4829-9ae7-d8687e7243d4.jpg',
      '/images/straps/MW1-10186-092.jpg',
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
      '/images/straps/MW1-10186-092_5e875868-6adf-4829-9ae7-d8687e7243d4.jpg',
      '/images/straps/MW3-10302-033.jpg',
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
      '/images/straps/MW3-10302-033_a8928c04-41e5-4612-84dc-a3e1eea2d3fb.jpg',
      '/images/straps/MW1-10186-092.jpg',
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
