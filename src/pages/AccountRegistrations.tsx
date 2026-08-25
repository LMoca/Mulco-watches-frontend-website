import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import Eyebrow from '../components/Eyebrow';

function getWarranties(): Record<string, string>[] {
  try { return JSON.parse(localStorage.getItem('mulco-warranty-registrations') ?? '[]'); }
  catch { return []; }
}

export default function AccountRegistrations() {
  const { account } = useAccount();
  const navigate = useNavigate();

  if (!account) {
    navigate('/account/login', { replace: true });
    return null;
  }

  const warranties = getWarranties();

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">

      {/* Header */}
      <div className="border-b border-brand-gold/10 px-6 md:px-14 lg:px-24 pt-16 pb-0">
        <div className="max-w-5xl mx-auto">

          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-10">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-[400ms]">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <Link to="/account" className="hover:text-brand-gold transition-colors duration-[400ms]">My Account</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Registered Products</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <Eyebrow text="My MULCO" className="mb-3" />
              <h1 className="font-serif text-[3rem] md:text-[4rem] lg:text-[4.5rem] text-brand-white leading-[0.92] tracking-[-0.02em]">
                Registered<br />Products
              </h1>
            </div>
            <Link
              to="/warranty-registration"
              className="flex-shrink-0 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-black bg-brand-gold px-6 py-3 hover:bg-brand-white transition-colors duration-[400ms] self-start md:self-end"
            >
              + Register a Watch
            </Link>
          </div>

          {/* Tab-style nav back to account */}
          <div className="flex gap-0 border-t border-brand-gold/10">
            <Link
              to="/account"
              className="px-0 mr-8 pt-4 pb-3 font-sans text-[11px] uppercase tracking-[0.2em] border-t-2 border-transparent -mt-px text-brand-muted hover:text-brand-white transition-colors duration-[400ms]"
            >
              Overview
            </Link>
            <span className="px-0 mr-8 pt-4 pb-3 font-sans text-[11px] uppercase tracking-[0.2em] border-t-2 border-brand-gold -mt-px text-brand-gold">
              Registered Products
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-14 lg:px-24 py-14 pb-28">
        {warranties.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={22} className="text-brand-gold/50" strokeWidth={1.5} />
            </div>
            <p className="font-serif text-2xl text-brand-white mb-3">No products registered yet</p>
            <p className="font-sans text-[13px] text-brand-muted mb-8 max-w-[36ch] mx-auto leading-[1.7]">
              Register your MULCO watch to activate your warranty and receive priority support.
            </p>
            <Link
              to="/warranty-registration"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-[400ms]"
            >
              Register a Watch
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-gold/10">
            {warranties.map((w, i) => {
              const expiry = new Date(w.purchaseDate);
              expiry.setFullYear(expiry.getFullYear() + 2);
              const daysLeft = Math.ceil((expiry.getTime() - Date.now()) / 86400000);
              const expiring = daysLeft > 0 && daysLeft <= 90;
              const expired = daysLeft <= 0;

              return (
                <div key={i} className="py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
                  {/* Left: watch details */}
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold mb-2">
                      {expired ? 'Expired' : expiring ? 'Expiring Soon' : 'Active Warranty'}
                    </p>
                    <p className="font-serif text-2xl text-brand-white mb-1">{w.model}</p>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3">
                      <span className="font-sans text-[12px] text-brand-muted">
                        Serial: <span className="text-brand-white">{w.serialNumber ?? w.serial ?? '—'}</span>
                      </span>
                      {w.orderNumber && (
                        <span className="font-sans text-[12px] text-brand-muted">
                          Order: <span className="text-brand-white">{w.orderNumber}</span>
                        </span>
                      )}
                      <span className="font-sans text-[12px] text-brand-muted">
                        Purchased:{' '}
                        <span className="text-brand-white">
                          {new Date(w.purchaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </span>
                      {w.purchaseSource && (
                        <span className="font-sans text-[12px] text-brand-muted">
                          Via: <span className="text-brand-white">{w.purchaseSource}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: warranty status */}
                  <div className="md:text-right flex-shrink-0">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] font-sans uppercase tracking-[0.15em] mb-3 ${
                      expired
                        ? 'border-brand-muted/30 text-brand-muted'
                        : expiring
                        ? 'border-brand-rose/40 text-brand-rose'
                        : 'border-brand-gold/30 text-brand-gold'
                    }`}>
                      <ShieldCheck size={11} strokeWidth={2} />
                      {expired ? 'Expired' : expiring ? `${daysLeft}d remaining` : 'Active'}
                    </div>
                    <p className="font-sans text-[12px] text-brand-muted block">
                      Covered until{' '}
                      <span className="text-brand-white">
                        {expiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </p>
                    {expired && (
                      <Link
                        to="/support"
                        className="mt-2 inline-block font-sans text-[10px] uppercase tracking-[0.15em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-[400ms]"
                      >
                        Contact Support
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {warranties.length > 0 && (
          <div className="pt-10 border-t border-brand-gold/10">
            <Link
              to="/warranty-registration"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-[400ms]"
            >
              + Register Another Watch
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
