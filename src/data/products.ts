export interface Product {
  id: string;
  name: string;
  collection: string;
  gender: 'women' | 'men' | 'unisex';
  price: number;
  originalPrice?: number;
  images: string[];
  tags: string[];
  description: string;
  specs: {
    movement: string;
    waterResistance: string;
    caseDiameter: string;
    caseMaterial: string;
    bandType: string;
    crystalType: string;
  };
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  // ── Women's Collection ─────────────────────────────────────────────────────
  {
    id: 'blue-marine-fusion',
    name: 'Blue Marine Fusion',
    collection: 'Blue Marine',
    gender: 'women',
    price: 205,
    images: [
      'https://mulco.com/cdn/shop/files/Blue_Marine_Fusion_White.jpg?v=1774540858',
      'https://mulco.com/cdn/shop/files/Fusion_1.jpg?v=1774540858',
      'https://mulco.com/cdn/shop/files/Blue_Marine_Fusion_Blue.jpg?v=1774540858',
    ],
    tags: ['Swarovski Crystals', 'Quartz', '100M Water Resistant'],
    description:
      'Experience the perfect fusion of luxury and sport with the Mulco Blue Marine Fusion. Crafted with stainless steel and adorned with sparkling Swarovski crystals, paired with a pure silicone band. With 10 ATM water resistance, it\'s designed for those who shine both on and off the water. Available in 6 colors.',
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
    gender: 'women',
    price: 185,
    images: [
      'https://mulco.com/cdn/shop/files/BlueMarineInfinityBlue.jpg?v=1776695028',
      'https://mulco.com/cdn/shop/files/Infinity_2_d311b037-4459-41be-87b4-72221e806bf5.jpg?v=1776695028',
      'https://mulco.com/cdn/shop/files/Blue_Marine_Infinity_White.jpg?v=1774457553',
    ],
    tags: ['Mother of Pearl', 'Quartz', '100M Water Resistant'],
    description:
      'Designed with luxury in mind, the Blue Marine Infinity features a mother-of-pearl sundial display, stainless steel case, and pure silicone band. Its elegant profile pairs effortlessly with both casual and formal looks. Available in 9 stunning colors.',
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
    gender: 'women',
    price: 196,
    images: [
      'https://mulco.com/cdn/shop/files/MW3-241029-012-Front_3.jpg?v=1774547283',
      'https://mulco.com/cdn/shop/files/Medusa_2.jpg?v=1774547283',
      'https://mulco.com/cdn/shop/files/MedusaBlack_Silver-2_1.jpg?v=1774547283',
    ],
    tags: ['Quartz Multifunctional', 'Silicone Band', '100M Water Resistant'],
    description:
      'Draws inspiration from rare, electrifying jellyfish that glow in the deep ocean, their vibrant colors illuminating the dark waters. The Blue Marine Medusa is a statement of bold femininity and oceanic elegance. Available in 6 colors.',
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
    gender: 'women',
    price: 195,
    images: [
      'https://mulco.com/cdn/shop/files/Enchanted_Maple_Pink.jpg?v=1772291845',
      'https://mulco.com/cdn/shop/files/Maple_9.jpg?v=1774453467',
      'https://mulco.com/cdn/shop/files/Enchanted_Maple_Blue.jpg?v=1776699840',
    ],
    tags: ['Rose Gold Details', 'Quartz', '100M Water Resistant'],
    description:
      'A stylish silicone timepiece with rose gold details, inspired by the vibrant colors of the season and Maple trees. Water-resistant up to 100 meters, making it perfect for everyday wear from dawn to dusk. Available in 9 colors.',
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
    gender: 'women',
    price: 215,
    images: [
      'https://mulco.com/cdn/shop/files/kripton_lady_blanco_1.jpg?v=1776439179',
      'https://mulco.com/cdn/shop/files/Kripton_Lady_1.jpg?v=1776439179',
      'https://mulco.com/cdn/shop/files/KRIPTON_LADIES_NEGRO.jpg?v=1776439179',
    ],
    tags: ['Pearl Finish Dial', 'Rose Gold Accents', '100M Water Resistant'],
    description:
      'A luxury women\'s timepiece featuring a pearl finish sundial and rose gold accents. The Kripton Lady effortlessly combines elegance with sport-ready durability, making it a versatile companion for any occasion. Available in 7 colors.',
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
    id: 'titans-snap-ladies',
    name: 'Titans Snap Ladies',
    collection: 'Titans',
    gender: 'women',
    price: 140,
    originalPrice: 195,
    images: [
      'https://mulco.com/cdn/shop/files/MW3-22810L-043-Front.jpg?v=1774542927',
      'https://mulco.com/cdn/shop/files/Titan_6.jpg?v=1774542927',
      'https://mulco.com/cdn/shop/files/MW3-22810L-013-Front.jpg?v=1774542927',
    ],
    tags: ['Quartz', 'Stainless Steel', '100M Water Resistant'],
    description:
      'Luxury and function in one. The Titans Snap Ladies features a stainless steel case, silicone band, anti-scratch mineral coating, quartz movement, and 10 ATM water resistance — built for the woman who refuses to compromise. Available in 8 colors.',
    specs: {
      movement: 'Quartz Multifunctional',
      waterResistance: '100M',
      caseDiameter: '44mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Pure Silicone',
      crystalType: 'Mineral Anti-Scratch',
    },
  },
  // ── Men's Collection ───────────────────────────────────────────────────────
  {
    id: 'buzo-tentacles',
    name: 'Buzo Tentacles',
    collection: 'Buzo',
    gender: 'men',
    price: 215,
    images: [
      'https://mulco.com/cdn/shop/files/Tentacles_3_1.jpg?v=1773865362',
      'https://mulco.com/cdn/shop/files/Tentacles_4.jpg?v=1774494932',
      'https://mulco.com/cdn/shop/files/Tentacles5_1.jpg?v=1775498664',
    ],
    tags: ['Quartz Multifunctional', 'IP Black Steel', '100M Water Resistant'],
    description:
      'Inspired by octopus camouflage, the Buzo Tentacles combines sleek design with adaptive innovation. Built with IP black stainless steel and a bold 51mm case for commanding presence. Available in 5 colorways.',
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
    gender: 'men',
    price: 245,
    images: [
      'https://mulco.com/cdn/shop/files/MW3-24979-028-Front_1.jpg?v=1772292527',
      'https://mulco.com/cdn/shop/files/Atlantis_3.jpg?v=1774468500',
      'https://mulco.com/cdn/shop/files/MW3-24979-305-Front_1.jpg?v=1774468500',
    ],
    tags: ['Quartz Multifunctional', 'Silicone Band', '100M Water Resistant'],
    description:
      'Inspired by the mythical city of Atlantis, this watch merges timeless design with the mysterious depths of the lost city. A bold 46mm case and quartz multifunctional movement for the explorer who commands every room. Available in 5 colorways.',
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
    gender: 'men',
    price: 220,
    images: [
      'https://mulco.com/cdn/shop/files/Ajustes_buzo_Silicone_723_3.jpg?v=1775570711',
      'https://mulco.com/cdn/shop/files/Buzo_blue.jpg?v=1776355895',
      'https://mulco.com/cdn/shop/files/Buzo_Silicon_1.jpg?v=1774628011',
    ],
    tags: ['Chronograph', 'Black Steel', '100M Water Resistant'],
    description:
      'Perfect for water adventures with an elegant and adventurous style. The Buzo Dive Silicone features 10 ATM water resistance, Chronograph movement, and a premium flame fusion crystal. Available in 9 colors.',
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
    gender: 'men',
    price: 245,
    images: [
      'https://mulco.com/cdn/shop/files/Ajuste_Buzo_Steel_021_2.jpg?v=1776365153',
      'https://mulco.com/cdn/shop/files/Buzo_Metal_Gold_copia_2.jpg?v=1759331416',
      'https://mulco.com/cdn/shop/files/Buzo_Dive_Stainless_Steel_Silver_and_black_1.jpg?v=1776364447',
    ],
    tags: ['Chronograph', 'Steel Bracelet', '100M Water Resistant'],
    description:
      'The Buzo Dive Stainless Steel is built for water adventures without sacrificing premium style. Features Chronograph movement and a stainless steel bracelet with removable links. Available in 6 finishes.',
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
    gender: 'men',
    price: 205,
    images: [
      'https://mulco.com/cdn/shop/files/Cobra_Yellow.jpg?v=1776367211',
      'https://mulco.com/cdn/shop/files/COBRA_Blue.jpg?v=1776367211',
      'https://mulco.com/cdn/shop/files/COBRA_Black.jpg?v=1776367211',
    ],
    tags: ['Miyota Quartz', 'Ion-Plated Steel', '100M Water Resistant'],
    description:
      'A men\'s watch that exudes bravery, heroism, and persistence. The COBRA features a sporty steel case crafted through a 48-hour ionization process, delivering a tasteful yet commanding aesthetic. Available in 6 bold colorways.',
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
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByGender(gender: 'women' | 'men'): Product[] {
  return products.filter((p) => p.gender === gender || p.gender === 'unisex');
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
        (p.gender === current.gender || p.collection === current.collection)
    )
    .slice(0, limit);
}
