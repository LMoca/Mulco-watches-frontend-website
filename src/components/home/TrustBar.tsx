import { Shield, Award, Truck, RefreshCcw, Wrench } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';

const trustItems = [
  { icon: Shield, key: 'trust.swissMovement' },
  { icon: Award, key: 'trust.warranty' },
  { icon: Truck, key: 'trust.shipping' },
  { icon: RefreshCcw, key: 'trust.returns' },
  { icon: Wrench, key: 'trust.service' },
];

export default function TrustBar() {
  const { t } = useLanguage();
  const { ref, inView } = useInView(0.2);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-brand-navy border-y border-brand-gold/20 py-14 md:py-20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-5 max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24">
        {trustItems.map((item, i) => (
          <div key={item.key} className="relative flex flex-col items-center gap-3 px-6 py-2">
            {i > 0 && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-brand-gold/15" />
            )}
            <item.icon size={22} className="text-brand-gold/40 flex-shrink-0" strokeWidth={1} />
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-muted text-center leading-snug font-sans">
              {t(item.key)}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile — horizontal scroll */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory pb-2 px-6 gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {trustItems.map((item) => (
          <div
            key={item.key}
            className="flex-shrink-0 snap-start flex flex-col items-center gap-2 min-w-[120px]"
          >
            <item.icon size={18} className="text-brand-gold/40" strokeWidth={1} />
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-muted text-center leading-tight font-sans">
              {t(item.key)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
