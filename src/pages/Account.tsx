import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Heart } from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { useCurrency } from '../context/CurrencyContext';
import { products } from '../data/products';
import { getNextTierThreshold } from '../data/mockOrders';
import Eyebrow from '../components/Eyebrow';

const TIER_LABEL_COLORS: Record<string, string> = {
  Bronze: '#CD7F32',
  Gold: '#C9A84C',
  Diamond: '#B9F2FF',
};

const STATUS_STYLES: Record<string, string> = {
  Delivered: 'text-brand-gold',
  Processing: 'text-brand-muted',
  Shipped: 'text-brand-white',
};


type Tab = 'orders' | 'warranties' | 'wishlist';

function getWarranties() {
  try { return JSON.parse(localStorage.getItem('mulco-warranty-registrations') ?? '[]'); }
  catch { return []; }
}

export default function Account() {
  const { account, orders, loyaltyPoints, loyaltyTier, wishlist, toggleWishlist } = useAccount();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const location = useLocation();

  const searchTab = new URLSearchParams(location.search).get('tab') as Tab | null;
  const [tab, setTab] = useState<Tab>(searchTab ?? 'orders');

  useEffect(() => {
    if (searchTab && ['orders', 'warranties', 'wishlist'].includes(searchTab)) {
      setTab(searchTab as Tab);
    }
  }, [searchTab]);

  if (!account) {
    navigate('/account/login', { replace: true });
    return null;
  }

  const nextThreshold = getNextTierThreshold(loyaltyPoints);
  const progress = Math.min((loyaltyPoints / nextThreshold) * 100, 100);
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const warranties = getWarranties();

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'orders', label: 'Orders', count: orders.length },
    { key: 'warranties', label: 'Warranties', count: warranties.length },
    { key: 'wishlist', label: 'Wishlist', count: wishlist.length },
  ];

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">

      {/* ── Restructured Editorial Header ── */}
      <div className="border-b border-brand-gold/10 px-6 md:px-14 lg:px-24 pt-16 pb-0">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-10">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-[400ms]">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">My Account</span>
          </nav>

          {/* Identity & Status Split Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
            {/* Left: name + email */}
            <div>
              <Eyebrow text="My MULCO" className="mb-3" />
              <h1 className="font-serif text-[3rem] md:text-[4rem] lg:text-[5rem] text-brand-white leading-[0.92] tracking-[-0.02em] mb-3">
                {account.name}
              </h1>
              <p className="font-sans text-[12px] text-brand-muted">{account.email}</p>
            </div>

            {/* Right: tier → points → benefits link */}
            <div className="flex-shrink-0 md:text-right">
              <p className="font-serif text-2xl mb-4" style={{ color: TIER_LABEL_COLORS[loyaltyTier] }}>
                {loyaltyTier} Member
              </p>

              {loyaltyTier !== 'Diamond' ? (
                <div className="mb-4 md:w-48">
                  <div className="flex justify-between font-sans text-[10px] uppercase tracking-[0.12em] text-brand-muted mb-2">
                    <span>{loyaltyPoints.toLocaleString()} pts</span>
                    <span>{nextThreshold.toLocaleString()} → {loyaltyTier === 'Bronze' ? 'Gold' : 'Diamond'}</span>
                  </div>
                  <div className="h-px bg-brand-gold/15 relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-brand-gold"
                      style={{ width: `${progress}%`, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                  </div>
                </div>
              ) : (
                <p className="font-sans text-[11px] text-brand-muted mb-4">{loyaltyPoints.toLocaleString()} pts</p>
              )}

              <Link
                to="/membership"
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-gold/70 hover:text-brand-gold transition-colors duration-[400ms]"
              >
                View benefits →
              </Link>
            </div>
          </div>

          {/* Tab nav — editorial style */}
          <div className="flex gap-0 border-t border-brand-gold/10">
            {tabs.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-0 mr-8 pt-4 pb-3 font-sans text-[11px] uppercase tracking-[0.2em] border-t-2 -mt-px transition-colors duration-[400ms] ${
                  tab === key
                    ? 'text-brand-gold border-brand-gold'
                    : 'text-brand-muted border-transparent hover:text-brand-white'
                }`}
              >
                {label}
                {count > 0 && <span className="ml-1.5 opacity-60">({count})</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-14 lg:px-24 py-14 pb-28">

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-2xl text-brand-white mb-4">No orders yet</p>
                <Link to="/collections" className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
                  Shop the Collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-brand-gold/10 hover:border-brand-gold/25 transition-colors duration-[400ms]">
                    <Link to={`/product/${order.items[0].productId}`} className="block relative aspect-[4/3] overflow-hidden">
                      <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[600ms]"
                      />
                      <span className={`absolute top-3 left-3 font-sans text-[9px] uppercase tracking-[0.2em] px-2 py-1 bg-brand-black/70 backdrop-blur-sm ${STATUS_STYLES[order.status]}`}>
                        {order.status}
                      </span>
                    </Link>
                    <div className="p-4">
                      <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-brand-gold mb-1">{order.id}</p>
                      <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-brand-muted mb-3">
                        {order.items[0].collection}
                      </p>
                      <Link
                        to={`/product/${order.items[0].productId}`}
                        className="font-serif text-base text-brand-white hover:text-brand-gold transition-colors duration-[400ms] leading-tight block mb-1"
                      >
                        {order.items[0].name}
                      </Link>
                      {order.items[0].variant && (
                        <p className="font-sans text-[11px] text-brand-muted mb-3">{order.items[0].variant}</p>
                      )}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-gold/10">
                        <p className="font-sans text-[11px] text-brand-muted">
                          {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="font-serif text-base text-brand-white">{formatPrice(order.total)}</p>
                      </div>
                      {order.trackingNumber && order.status !== 'Processing' && (
                        <p className="font-sans text-[10px] text-brand-muted mt-2">
                          Tracking: <span className="text-brand-white">{order.trackingNumber}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WARRANTIES */}
        {tab === 'warranties' && (
          <div>
            {warranties.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-2xl text-brand-white mb-4">No watches registered</p>
                <Link to="/warranty-registration" className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
                  Register a Watch
                </Link>
              </div>
            ) : (
              <div className="space-y-0 divide-y divide-brand-gold/10">
                {warranties.map((w: Record<string, string>, i: number) => {
                  const expiry = new Date(w.purchaseDate);
                  expiry.setFullYear(expiry.getFullYear() + 2);
                  const daysLeft = Math.ceil((expiry.getTime() - Date.now()) / 86400000);
                  const expiring = daysLeft > 0 && daysLeft <= 90;
                  const expired = daysLeft <= 0;
                  return (
                    <div key={i} className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-serif text-xl text-brand-white mb-1">{w.model}</p>
                        <p className="font-sans text-[12px] text-brand-muted">
                          Serial: {w.serialNumber ?? w.serial ?? '—'}
                        </p>
                        <p className="font-sans text-[12px] text-brand-muted">
                          Purchased: {new Date(w.purchaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className={`font-sans text-[10px] uppercase tracking-[0.2em] mb-1 ${
                          expired ? 'text-brand-muted' : expiring ? 'text-brand-rose' : 'text-brand-gold'
                        }`}>
                          {expired ? 'Expired' : expiring ? 'Expiring Soon' : 'Active'}
                        </p>
                        <p className="font-sans text-[12px] text-brand-muted">
                          Covered until {expiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="pt-10 border-t border-brand-gold/10">
              <Link
                to="/warranty-registration"
                className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors"
              >
                + Register Another Watch
              </Link>
            </div>
          </div>
        )}

        {/* WISHLIST */}
        {tab === 'wishlist' && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-2xl text-brand-white mb-3">Nothing saved yet</p>
                <p className="font-sans text-sm text-brand-muted mb-8">Tap the heart on any watch to save it here.</p>
                <Link to="/collections" className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
                  Explore the Collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden mb-4">
                      <Link to={`/product/${p.id}`}>
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[600ms]"
                        />
                      </Link>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        aria-label="Remove from wishlist"
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-brand-black/60 backdrop-blur-sm hover:bg-brand-black/80 transition-colors duration-200"
                      >
                        <Heart size={14} className="text-brand-gold" fill="#C9A84C" />
                      </button>
                    </div>
                    <Link
                      to={`/product/${p.id}`}
                      className="font-serif text-base text-brand-white hover:text-brand-gold transition-colors duration-[400ms] leading-tight block"
                    >
                      {p.name}
                    </Link>
                    <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-brand-muted mt-1.5">{formatPrice(p.price)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}