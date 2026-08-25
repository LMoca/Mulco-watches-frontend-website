import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';
import { useCurrency } from '../context/CurrencyContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { getNextTierThreshold } from '../data/mockOrders';

const TIER_COLORS: Record<string, string> = {
  Bronze: '#CD7F32',
  Gold: '#C9A84C',
  Diamond: '#B9F2FF',
};

const STATUS_LABEL: Record<string, string> = {
  Delivered: '#C9A84C',
  Processing: '#888880',
  Shipped: '#F5F5F0',
};

export default function MiniDashboard() {
  const {
    account, logout,
    orders, loyaltyPoints, loyaltyTier, wishlist,
    miniDashboardOpen, closeMiniDashboard,
  } = useAccount();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, miniDashboardOpen && !!account);

  useEffect(() => {
    document.body.style.overflow = miniDashboardOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [miniDashboardOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMiniDashboard();
    }
    if (miniDashboardOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [miniDashboardOpen, closeMiniDashboard]);

  const nextThreshold = getNextTierThreshold(loyaltyPoints);
  const progress = Math.min((loyaltyPoints / nextThreshold) * 100, 100);
  const recentOrder = orders[0] ?? null;
  const warranties: unknown[] = (() => {
    try { return JSON.parse(localStorage.getItem('mulco-warranty-registrations') ?? '[]'); }
    catch { return []; }
  })();

  function go(path: string) {
    closeMiniDashboard();
    navigate(path);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeMiniDashboard}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 300,
          opacity: miniDashboardOpen ? 1 : 0,
          pointerEvents: miniDashboardOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Account"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '420px', maxWidth: '100vw',
          background: 'rgb(var(--brand-black))',
          borderLeft: '1px solid rgba(201,168,76,0.1)',
          zIndex: 301,
          display: 'flex', flexDirection: 'column',
          transform: miniDashboardOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: miniDashboardOpen ? 'auto' : 'none',
        }}
      >
        {account && (
          <>
            {/* ── Identity block ── */}
            <div className="px-7 pt-7 pb-6 border-b border-brand-gold/10 flex-shrink-0">
              <div className="flex items-start justify-between mb-5">
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold">My MULCO</p>
                <button
                  onClick={closeMiniDashboard}
                  aria-label="Close"
                  className="font-serif text-2xl leading-none text-brand-gold/30 hover:text-brand-gold transition-colors duration-300 -mt-1"
                >
                  ×
                </button>
              </div>

              <p className="font-serif text-[2rem] text-brand-white leading-[0.95] tracking-[-0.01em] mb-1">
                Welcome back,<br />{account.name.split(' ')[0]}.
              </p>
              <p className="font-sans text-[11px]" style={{ color: TIER_COLORS[loyaltyTier] }}>
                {loyaltyTier} Member
              </p>

              {/* Loyalty bar */}
              {loyaltyTier !== 'Diamond' && (
                <div className="mt-5">
                  <div className="flex justify-between font-sans text-[10px] uppercase tracking-[0.12em] text-brand-muted mb-2">
                    <span>{loyaltyPoints.toLocaleString()} pts</span>
                    <span>{nextThreshold.toLocaleString()} → {loyaltyTier === 'Bronze' ? 'Gold' : 'Diamond'}</span>
                  </div>
                  <div className="h-px bg-brand-gold/12 relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-brand-gold"
                      style={{ width: `${progress}%`, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto">

              {/* View Full Account */}
              <button
                onClick={() => go('/account')}
                className="w-full flex items-center justify-between px-7 py-4 border-b border-brand-gold/10 font-sans text-[12px] text-brand-white hover:text-brand-gold transition-colors duration-[400ms] group"
              >
                View Full Account
                <span className="text-brand-gold/50 group-hover:text-brand-gold transition-colors duration-[400ms] text-lg leading-none">›</span>
              </button>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-brand-gold/10 border-b border-brand-gold/10">
                {[
                  { label: 'Orders', value: orders.length, path: '/account?tab=orders' },
                  { label: 'Watches', value: warranties.length, path: '/account/registrations' },
                  { label: 'Saved', value: wishlist.length, path: '/account?tab=wishlist' },
                ].map(({ label, value, path }) => (
                  <button
                    key={label}
                    onClick={() => go(path)}
                    className="py-5 text-center hover:bg-brand-gold/[0.03] transition-colors duration-[400ms] group"
                  >
                    <p className="font-serif text-2xl text-brand-white group-hover:text-brand-gold transition-colors duration-[400ms]">{value}</p>
                    <p className="font-sans text-[9px] uppercase tracking-[0.18em] text-brand-muted mt-1">{label}</p>
                  </button>
                ))}
              </div>

              {/* Recent order */}
              {recentOrder && (
                <div className="px-7 py-6 border-b border-brand-gold/10">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold mb-4">Recent Order</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={recentOrder.items[0].image}
                      alt={recentOrder.items[0].name}
                      className="w-16 h-16 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: TIER_COLORS.Gold }}>
                        {recentOrder.items[0].collection}
                      </p>
                      <p className="font-serif text-base text-brand-white truncate">{recentOrder.items[0].name}</p>
                      {recentOrder.items[0].variant && (
                        <p className="font-sans text-[11px] text-brand-muted mt-0.5">{recentOrder.items[0].variant}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className="font-sans text-[10px] uppercase tracking-[0.12em] mb-1"
                        style={{ color: STATUS_LABEL[recentOrder.status] }}
                      >
                        {recentOrder.status}
                      </p>
                      <p className="font-sans text-[11px] text-brand-muted">
                        {new Date(recentOrder.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="font-sans text-[11px] text-brand-white mt-0.5">{formatPrice(recentOrder.total)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation links */}
              <div className="px-7 py-2">
                {[
                  { label: 'Orders', path: '/account?tab=orders' },
                  { label: 'My Watches', path: '/account/registrations' },
                  { label: 'Wishlist', path: '/account?tab=wishlist' },
                ].map(({ label, path }) => (
                  <button
                    key={label}
                    onClick={() => go(path)}
                    className="w-full flex items-center justify-between py-4 border-b border-brand-gold/8 font-sans text-[12px] text-brand-muted hover:text-brand-gold transition-colors duration-[400ms] group last:border-0"
                  >
                    {label}
                    <span className="text-brand-gold/30 group-hover:text-brand-gold transition-colors duration-[400ms] text-lg leading-none">›</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex-shrink-0 border-t border-brand-gold/10 px-7 py-5 flex items-center justify-between">
              <p className="font-sans text-[11px] text-brand-muted truncate mr-4">{account.email}</p>
              <button
                onClick={() => { logout(); closeMiniDashboard(); }}
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-muted hover:text-brand-gold transition-colors duration-[400ms] whitespace-nowrap flex-shrink-0"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
