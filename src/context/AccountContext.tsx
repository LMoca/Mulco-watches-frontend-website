import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { mockOrders, getLoyaltyPoints, getLoyaltyTier, type MockOrder } from '../data/mockOrders';

interface AccountData {
  name: string;
  email: string;
}

interface AccountContextType {
  account: AccountData | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  orders: MockOrder[];
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Gold' | 'Diamond';
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  miniDashboardOpen: boolean;
  openMiniDashboard: () => void;
  closeMiniDashboard: () => void;
}

const AccountContext = createContext<AccountContextType | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AccountData | null>(() => {
    try {
      const stored = localStorage.getItem('mulco-account');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('mulco-wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [miniDashboardOpen, setMiniDashboardOpen] = useState(false);

  useEffect(() => {
    if (account) {
      localStorage.setItem('mulco-account', JSON.stringify(account));
    } else {
      localStorage.removeItem('mulco-account');
    }
  }, [account]);

  useEffect(() => {
    localStorage.setItem('mulco-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  function login(name: string, email: string) {
    setAccount({ name, email });
  }

  function logout() {
    setAccount(null);
    setMiniDashboardOpen(false);
  }

  function toggleWishlist(productId: string) {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }

  function isWishlisted(productId: string) {
    return wishlist.includes(productId);
  }

  const orders = account ? mockOrders : [];
  const loyaltyPoints = getLoyaltyPoints(orders);
  const loyaltyTier = getLoyaltyTier(loyaltyPoints);

  return (
    <AccountContext.Provider
      value={{
        account,
        login,
        logout,
        orders,
        loyaltyPoints,
        loyaltyTier,
        wishlist,
        toggleWishlist,
        isWishlisted,
        miniDashboardOpen,
        openMiniDashboard: () => setMiniDashboardOpen(true),
        closeMiniDashboard: () => setMiniDashboardOpen(false),
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');
  return ctx;
}
