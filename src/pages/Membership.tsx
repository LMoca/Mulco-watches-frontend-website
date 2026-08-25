import { Link } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import Eyebrow from '../components/Eyebrow';

const TIERS = [
  {
    key: 'Bronze',
    color: '#CD7F32',
    threshold: '0 – 499 pts',
    tagline: 'Where every journey begins.',
    description:
      'Becoming a MULCO member is free and instant. The moment you create an account, you enter the circle — and every purchase moves you forward.',
    benefits: [
      'Access to member-only pricing',
      'Order history & warranty management',
      'Wishlist across all devices',
      'Early access to seasonal events',
    ],
  },
  {
    key: 'Gold',
    color: '#C9A84C',
    threshold: '500 – 999 pts',
    tagline: 'For those who live by precision.',
    description:
      'Gold status unlocks a higher level of access — arriving before the public, leaving your mark on every timepiece.',
    benefits: [
      'All Bronze benefits',
      'Priority customer service',
      'Early access to new arrivals',
      'Complimentary engraving on any order',
    ],
  },
  {
    key: 'Diamond',
    color: '#B9F2FF',
    threshold: '1,000+ pts',
    tagline: 'The pinnacle of the MULCO circle.',
    description:
      'Diamond members are our most distinguished collectors. Exclusive drops, concierge-level service, and repairs handled with the care your collection deserves.',
    benefits: [
      'All Gold benefits',
      'Access to exclusive Diamond drops',
      'Priority repair & service handling',
      'Dedicated account concierge',
    ],
  },
];

export default function Membership() {
  const { account, loyaltyTier } = useAccount();

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">

      {/* Hero */}
      <div className="border-b border-brand-gold/10 px-6 md:px-14 lg:px-24 pt-16 pb-16">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-10">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-[400ms]">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Membership</span>
          </nav>

          <Eyebrow text="MULCO Membership" className="mb-4" />
          <h1 className="font-serif text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] text-brand-white leading-[0.92] tracking-[-0.02em] mb-6">
            Join the Circle.
          </h1>
          <p className="font-sans text-[14px] leading-[1.8] text-brand-muted max-w-[52ch] mb-6">
            Every MULCO purchase earns you points. Points elevate your tier. Your tier defines your experience —
            from early access to concierge service. One point for every dollar spent.
          </p>
          <div className="border-l-2 border-brand-gold/30 pl-5 max-w-[48ch]">
            <p className="font-sans text-[12px] leading-[1.75] text-brand-muted">
              Points are only earned and tracked when you purchase as a signed-in MULCO account holder.
              Guest orders do not accrue points.{' '}
              <Link to="/account/login" className="text-brand-gold/80 hover:text-brand-gold transition-colors duration-[400ms]">
                Create a free account
              </Link>{' '}
              to start earning from your very first order.
            </p>
          </div>
        </div>
      </div>

      {/* Tier cards */}
      <div className="px-6 md:px-14 lg:px-24 py-20 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-gold/10">
          {TIERS.map((tier) => {
            const isActive = account && loyaltyTier === tier.key;
            return (
              <div
                key={tier.key}
                className="bg-brand-black px-8 pt-10 pb-12 flex flex-col relative"
              >
                {isActive && (
                  <span className="absolute top-6 right-6 font-sans text-[9px] uppercase tracking-[0.2em] text-brand-black bg-brand-gold px-2 py-0.5">
                    Current
                  </span>
                )}

                {/* Tier name */}
                <p
                  className="font-sans text-[10px] uppercase tracking-[0.25em] mb-3"
                  style={{ color: tier.color }}
                >
                  {tier.key}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-brand-muted/60 mb-6">
                  {tier.threshold}
                </p>

                {/* Divider in tier color */}
                <div className="h-px mb-8" style={{ backgroundColor: tier.color, opacity: 0.25 }} />

                {/* Tagline */}
                <p className="font-serif text-[1.4rem] text-brand-white leading-[1.15] mb-4">
                  {tier.tagline}
                </p>
                <p className="font-sans text-[12px] leading-[1.75] text-brand-muted mb-8 flex-1">
                  {tier.description}
                </p>

                {/* Benefits list */}
                <ul className="space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check size={12} className="flex-shrink-0 mt-0.5" style={{ color: tier.color }} strokeWidth={2.5} />
                      <span className="font-sans text-[12px] text-brand-muted">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-5xl mx-auto mt-16 text-center">
          {account ? (
            <Link
              to="/account"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-[400ms]"
            >
              Back to My Account
            </Link>
          ) : (
            <div className="space-y-4">
              <p className="font-serif text-xl text-brand-white">Ready to join?</p>
              <p className="font-sans text-[12px] text-brand-muted mb-6">Create an account — it's free, and you start earning from your first order.</p>
              <Link
                to="/account/login"
                className="inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-brand-black bg-brand-gold px-8 py-3 hover:bg-brand-white transition-colors duration-[400ms]"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
