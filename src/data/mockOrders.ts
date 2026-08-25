export interface MockOrderItem {
  productId: string;
  name: string;
  collection: string;
  image: string;
  price: number;
  variant?: string;
}

export interface MockOrder {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped';
  items: MockOrderItem[];
  total: number;
  trackingNumber?: string;
}

export const mockOrders: MockOrder[] = [
  {
    id: 'ORD-2026-4821',
    date: '2026-01-14',
    status: 'Delivered',
    trackingNumber: '1Z999AA10123456784',
    items: [
      {
        productId: 'blue-marine-fusion',
        name: 'Blue Marine Fusion',
        collection: 'Blue Marine',
        image: '/images/watches/blue_marine_fusion/white/blue_marine_fusion_white.jpg',
        price: 205,
        variant: 'White',
      },
    ],
    total: 205,
  },
  {
    id: 'ORD-2025-3197',
    date: '2025-10-03',
    status: 'Delivered',
    trackingNumber: '1Z999AA10123456701',
    items: [
      {
        productId: 'buzo-atlantis',
        name: 'Buzo Atlantis',
        collection: 'Buzo',
        image: '/images/watches/buzo_atlantis/black_and_blue/buzo_atlantis_black_and_blue.jpg',
        price: 245,
        variant: 'Black & Blue',
      },
    ],
    total: 245,
  },
  {
    id: 'ORD-2026-5901',
    date: '2026-05-28',
    status: 'Processing',
    items: [
      {
        productId: 'kripton-royale-lady',
        name: 'Kripton Royale Lady',
        collection: 'Kripton',
        image: '/images/watches/kripton_royale_lady/beige/kripton_royale_lady_beige.jpg',
        price: 205,
        variant: 'Beige',
      },
    ],
    total: 205,
  },
];

export function getLoyaltyPoints(orders: MockOrder[]): number {
  return orders
    .filter((o) => o.status === 'Delivered')
    .reduce((sum, o) => sum + o.total, 0);
}

export function getLoyaltyTier(points: number): 'Bronze' | 'Gold' | 'Diamond' {
  if (points >= 1000) return 'Diamond';
  if (points >= 500) return 'Gold';
  return 'Bronze';
}

export function getNextTierThreshold(points: number): number {
  if (points >= 1000) return 1000;
  if (points >= 500) return 1000;
  return 500;
}
