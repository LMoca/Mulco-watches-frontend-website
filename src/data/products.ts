export interface Product {
  id: string;
  name: string;
  collection: string;
  gender: 'women' | 'men' | 'unisex';
  price: number;
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
  {
    id: 'blue-marine-medusa',
    name: 'Blue Marine Medusa',
    collection: 'Blue Marine',
    gender: 'women',
    price: 249,
    images: [
      'https://mulco.com/cdn/shop/files/MedusaBlack_Silver-2_1_1_640x640_crop_center.jpg?v=1774547283',
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994',
    ],
    tags: ['Mother of Pearl', 'Swarovski', 'Swiss Quartz'],
    description:
      'The Blue Marine Medusa captures the hypnotic depth of the ocean. A shimmering mother-of-pearl dial adorned with hand-set Swarovski crystals, encased in a sculpted stainless steel case. Worn as much for its artistry as its timekeeping.',
    specs: {
      movement: 'Swiss Quartz',
      waterResistance: '50M',
      caseDiameter: '38mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Silicone',
      crystalType: 'Mineral Crystal',
    },
    isFeatured: true,
  },
  {
    id: 'enchanted-quartz',
    name: 'Enchanted Quartz',
    collection: 'Enchanted',
    gender: 'women',
    price: 279,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994',
    ],
    tags: ['Mother of Pearl', 'Swiss Quartz', 'Sunray Dial'],
    description:
      'The Enchanted Quartz is a statement in refined femininity. Its sunray-finished dial transitions through soft sage to emerald, framed by a polished case with precision-cut lugs. Swiss movement ensures accuracy as elegant as the design itself.',
    specs: {
      movement: 'Swiss Quartz',
      waterResistance: '30M',
      caseDiameter: '36mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Mesh Bracelet',
      crystalType: 'Mineral Crystal',
    },
    isNew: true,
  },
  {
    id: 'lush-flora',
    name: 'Lush Flora',
    collection: 'Lush',
    gender: 'women',
    price: 259,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994',
    ],
    tags: ['Floral Dial', 'Swarovski', 'Swiss Quartz'],
    description:
      'Lush Flora brings the garden to the wrist. A delicately printed floral dial blooms beneath a domed mineral crystal, set within a rose-gold plated case. Each hour marker is a hand-placed Swarovski crystal.',
    specs: {
      movement: 'Swiss Quartz',
      waterResistance: '30M',
      caseDiameter: '34mm',
      caseMaterial: 'Rose Gold Plated Steel',
      bandType: 'Leather',
      crystalType: 'Mineral Dome Crystal',
    },
  },
  {
    id: 'couture-rose',
    name: 'Couture Rose',
    collection: 'Couture',
    gender: 'women',
    price: 319,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/MedusaBlack_Silver-2_1_1_640x640_crop_center.jpg?v=1774547283',
    ],
    tags: ['Rose Gold', 'Ceramic Band', 'Swiss Quartz'],
    description:
      'The Couture Rose is runway-ready. Crafted with a high-gloss ceramic bracelet in blush rose and a sunburst-finished dial, it merges haute couture aesthetics with the reliability of Swiss quartz precision.',
    specs: {
      movement: 'Swiss Quartz',
      waterResistance: '30M',
      caseDiameter: '36mm',
      caseMaterial: 'Rose Gold IP Steel',
      bandType: 'Ceramic Bracelet',
      crystalType: 'Sapphire Crystal',
    },
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'illusion-lady',
    name: 'Illusion Lady',
    collection: 'Illusion Lady',
    gender: 'women',
    price: 289,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994',
    ],
    tags: ['Crystal Indices', 'Swiss Quartz', 'Multi-Texture Dial'],
    description:
      'Illusion Lady plays with light and structure. Its multi-texture dial shifts from matte to mirror-polished with each angle, bordered by crystal-set indices that catch every glimmer. A watch that reveals itself slowly.',
    specs: {
      movement: 'Swiss Quartz',
      waterResistance: '50M',
      caseDiameter: '37mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Silicone',
      crystalType: 'Mineral Crystal',
    },
  },
  {
    id: 'buzo-tentacles',
    name: 'Buzo Tentacles',
    collection: 'Buzo',
    gender: 'men',
    price: 329,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994',
    ],
    tags: ['Swiss Automatic', 'Diver Grade', '200M WR'],
    description:
      'The Buzo Tentacles is engineered for depth. A diver-rated 200M water resistance, unidirectional bezel, and luminous indices built for legibility in the darkest water. Swiss automatic movement keeps ticking whether you\'re on the surface or 60 meters below it.',
    specs: {
      movement: 'Swiss Automatic',
      waterResistance: '200M',
      caseDiameter: '45mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Silicone Dive Strap',
      crystalType: 'Sapphire Crystal',
    },
    isFeatured: true,
  },
  {
    id: 'kripton-royale',
    name: 'Kripton Royale',
    collection: 'Kripton',
    gender: 'men',
    price: 399,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994',
    ],
    tags: ['Chronograph', 'Ion-Plated', 'Swiss Quartz'],
    description:
      'Kripton Royale is authority on the wrist. Full black ion-plated case and bracelet, triple chronograph sub-dials, tachymeter bezel. Powered by Swiss precision quartz — because performance has no room for compromise.',
    specs: {
      movement: 'Swiss Quartz Chronograph',
      waterResistance: '100M',
      caseDiameter: '47mm',
      caseMaterial: 'IP Black Steel',
      bandType: 'IP Steel Bracelet',
      crystalType: 'Mineral Crystal',
    },
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'evol-racer',
    name: 'Evol Racer',
    collection: 'Evol',
    gender: 'men',
    price: 349,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994',
    ],
    tags: ['Tachymeter', 'Silicone Band', 'Swiss Quartz'],
    description:
      'Evol Racer channels motorsport precision into everyday wear. The tachymeter-ringed bezel, rally-inspired sub-dials, and high-contrast dial are built for the man who moves fast and dresses the part.',
    specs: {
      movement: 'Swiss Quartz',
      waterResistance: '100M',
      caseDiameter: '46mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Silicone',
      crystalType: 'Mineral Crystal',
    },
    isNew: true,
  },
  {
    id: 'cobra-noir',
    name: 'Cobra Noir',
    collection: 'Cobra',
    gender: 'men',
    price: 379,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994',
    ],
    tags: ['Matte Dial', 'Bold Case', 'Swiss Quartz'],
    description:
      'Cobra Noir is uncompromising. Matte black dial, oversized case with angular lugs, and a double-layered crown guard. This watch doesn\'t ask for attention — it commands it.',
    specs: {
      movement: 'Swiss Quartz',
      waterResistance: '100M',
      caseDiameter: '48mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Rubber Strap',
      crystalType: 'Mineral Crystal',
    },
  },
  {
    id: 'kripton-steel',
    name: 'Kripton Steel',
    collection: 'Kripton',
    gender: 'men',
    price: 359,
    images: [
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994',
      'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994',
    ],
    tags: ['Stainless Steel', 'Date Display', 'Swiss Quartz'],
    description:
      'Kripton Steel is the everyday anchor of the collection. Brushed stainless case with polished bevels, clean three-hand dial with date window, and a solid bracelet that wears as well with a suit as it does with denim.',
    specs: {
      movement: 'Swiss Quartz',
      waterResistance: '100M',
      caseDiameter: '44mm',
      caseMaterial: 'Stainless Steel',
      bandType: 'Steel Bracelet',
      crystalType: 'Mineral Crystal',
    },
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
    .filter((p) => p.id !== id && (p.gender === current.gender || p.collection === current.collection))
    .slice(0, limit);
}
