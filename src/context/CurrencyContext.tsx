import { createContext, useContext, useState, useCallback } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'MXN' | 'COP';

interface CurrencyMeta {
  symbol: string;
  rate: number;
}

export const CURRENCIES: Record<Currency, CurrencyMeta> = {
  USD: { symbol: '$',    rate: 1.00   },
  EUR: { symbol: '€',   rate: 0.92   },
  GBP: { symbol: '£',   rate: 0.79   },
  MXN: { symbol: 'MX$', rate: 17.5   },
  COP: { symbol: 'COP', rate: 4150   },
};

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = 'mulco-currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved && saved in CURRENCIES ? saved : 'USD') as Currency;
  });

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, c);
  }, []);

  const formatPrice = useCallback((usdAmount: number): string => {
    const { symbol, rate } = CURRENCIES[currency];
    const converted = usdAmount * rate;
    if (currency === 'MXN' || currency === 'COP') {
      return `${symbol} ${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
