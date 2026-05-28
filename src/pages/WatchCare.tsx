import { Link } from 'react-router-dom';
import { ChevronRight, Droplets, Zap, Settings, Wind, Package, AlertTriangle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const highlights = [
  { icon: Droplets,      label: 'Water Resistance',  body: 'Know your watch\'s rating before exposing it to water' },
  { icon: Zap,           label: 'Battery Service',   body: 'Replace batteries every 1–2 years to prevent leakage' },
  { icon: Settings,      label: 'Annual Service',    body: 'Professional servicing every 3–5 years keeps movement accurate' },
  { icon: Package,       label: 'Proper Storage',    body: 'Store in a cool, dry place away from magnets and direct sunlight' },
];

const waterResistance = [
  { rating: '30m / 3 ATM',  label: 'Splash Resistant',     body: 'Resistant to rain and accidental splashes. Not suitable for swimming or showering.' },
  { rating: '50m / 5 ATM',  label: 'Water Resistant',      body: 'Suitable for swimming in shallow water. Avoid diving or high-pressure water jets.' },
  { rating: '100m / 10 ATM', label: 'Swim & Snorkel',      body: 'Suitable for swimming and snorkeling. Not suitable for scuba diving.' },
  { rating: '200m / 20 ATM', label: 'Dive Ready',          body: 'Suitable for recreational scuba diving. Not for saturation diving.' },
];

const doList = [
  'Rinse with fresh water after exposure to salt water or chlorine',
  'Clean the case and bracelet with a soft, lint-free cloth',
  'Have water resistance re-tested annually if the watch is regularly used near water',
  'Wind mechanical watches every 1–2 days if not worn',
  'Remove your watch before contact sports or heavy impact activities',
  'Store in the provided box or a soft pouch when not in use',
];

const dontList = [
  'Do not operate the crown or pushers underwater unless the watch is rated for it',
  'Do not expose to extreme heat, such as saunas or steam rooms — heat degrades seals',
  'Do not place near strong magnets (speakers, clasps, MRI machines)',
  'Do not use chemical cleaners, solvents, or ultrasonic cleaners at home',
  'Do not ignore a fogged crystal — this signals a compromised seal and needs immediate service',
  'Do not leave a dead battery in the watch — it can leak and damage the movement',
];

const strapTips = [
  { material: 'Silicone / Rubber', tip: 'Rinse with water and mild soap. Pat dry. Avoid prolonged sun exposure which can cause cracking.' },
  { material: 'Stainless Steel Bracelet', tip: 'Clean with a soft toothbrush and warm soapy water. Dry thoroughly to prevent water marks.' },
  { material: 'Leather Strap', tip: 'Keep away from water and sweat. Apply leather conditioner every few months. Replace when worn or cracked.' },
  { material: 'Nylon / Fabric', tip: 'Hand-wash with mild soap and air dry flat. Do not machine wash.' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <h2 className="font-serif text-2xl text-brand-white mb-4">{title}</h2>
      <div className="w-8 h-px bg-brand-gold mb-6" />
      {children}
    </div>
  );
}

export default function WatchCare() {
  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Watch Care</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Ownership Guide</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Watch Care &amp; Maintenance</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
          <p className="font-sans text-sm text-brand-muted mt-4 max-w-xl leading-relaxed">
            A MULCO timepiece is built to last. With the right care, your watch will keep performing and looking its best for years to come.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 pb-28 space-y-16">

        {/* Key facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-gold/8">
          {highlights.map(({ icon: Icon, label, body }) => (
            <div key={label} className="bg-brand-black p-5 flex flex-col gap-2">
              <Icon size={16} className="text-brand-gold" strokeWidth={1.5} />
              <p className="font-serif text-sm text-brand-white">{label}</p>
              <p className="font-sans text-xs text-brand-muted leading-snug">{body}</p>
            </div>
          ))}
        </div>

        {/* Daily care */}
        <Section title="Daily Care">
          <div className="space-y-4 font-sans text-sm text-brand-muted leading-relaxed">
            <p>
              Your MULCO watch is precision-engineered, but like all fine timepieces it benefits from routine attention. After wearing it in salt water, chlorinated pools, or during heavy perspiration, rinse the case and bracelet under fresh running water and dry with a soft cloth.
            </p>
            <p>
              For the case and crystal, use a slightly damp microfibre cloth. Avoid paper towels or rough fabrics — they can scratch the finish over time. Polish the crystal gently in circular motions. For metal bracelets, a soft toothbrush with mild soapy water cleans between the links effectively; rinse well and dry thoroughly.
            </p>
          </div>
        </Section>

        {/* Do / Don't */}
        <Section title="Do's &amp; Don'ts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-gold/8">
            <div className="bg-brand-black p-6">
              <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold mb-4">Do</p>
              <ul className="space-y-3">
                {doList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                    <span className="font-sans text-sm text-brand-muted leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-black p-6">
              <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-rose mb-4">Don't</p>
              <ul className="space-y-3">
                {dontList.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-muted flex-shrink-0" />
                    <span className="font-sans text-sm text-brand-muted leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Water resistance */}
        <Section title="Understanding Water Resistance">
          <p className="font-sans text-sm text-brand-muted leading-relaxed mb-6">
            Water resistance ratings indicate the static pressure a watch can withstand in a lab — not real-world diving depth. Always check your model's spec before exposing it to water.
          </p>
          <div className="space-y-0 divide-y divide-brand-gold/8 border border-brand-gold/12">
            {waterResistance.map(({ rating, label, body }) => (
              <div key={rating} className="grid grid-cols-[120px_1fr] gap-4 p-4 items-start">
                <div>
                  <p className="font-sans text-xs font-semibold text-brand-gold">{rating}</p>
                  <p className="font-sans text-[10px] text-brand-muted mt-0.5 tracking-wide">{label}</p>
                </div>
                <p className="font-sans text-sm text-brand-muted leading-snug">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2.5 bg-brand-gold/[0.04] border border-brand-gold/15 p-4">
            <AlertTriangle size={14} className="text-brand-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="font-sans text-xs text-brand-muted leading-relaxed">
              Gaskets and seals degrade over time. Have water resistance pressure-tested annually if your watch is regularly exposed to water. Never adjust the crown or press pushers while submerged.
            </p>
          </div>
        </Section>

        {/* Strap care */}
        <Section title="Strap &amp; Bracelet Care">
          <div className="space-y-0 divide-y divide-brand-gold/8 border border-brand-gold/12">
            {strapTips.map(({ material, tip }) => (
              <div key={material} className="p-5">
                <p className="font-sans text-xs font-semibold text-brand-white tracking-wide mb-1.5">{material}</p>
                <p className="font-sans text-sm text-brand-muted leading-snug">{tip}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-xs text-brand-muted mt-4 leading-relaxed">
            MULCO replacement silicone straps are available in multiple colorways.{' '}
            <Link to="/accessories" className="text-brand-gold hover:text-brand-white transition-colors">Browse replacement straps →</Link>
          </p>
        </Section>

        {/* Battery service */}
        <Section title="Battery Service">
          <div className="space-y-4 font-sans text-sm text-brand-muted leading-relaxed">
            <p>
              Most MULCO quartz watches use a standard SR626SW or similar silver-oxide cell with a lifespan of <span className="text-brand-white">1–3 years</span> depending on the movement and complications in use. Chronograph functions, illumination, and alarms consume significantly more power.
            </p>
            <p>
              When your watch begins losing time or stops, have the battery replaced promptly by an authorized service center. A dead battery left inside the watch can leak, permanently damaging the movement. Always request a water resistance test after battery replacement if your watch is rated for water exposure.
            </p>
            <p>
              <span className="text-brand-white">Do not attempt to replace the battery yourself</span> unless you have the correct tools and a dust-free environment — improper reassembly can void your warranty and compromise seals.
            </p>
          </div>
        </Section>

        {/* Professional servicing */}
        <Section title="Professional Servicing">
          <div className="space-y-4 font-sans text-sm text-brand-muted leading-relaxed">
            <p>
              We recommend professional servicing every <span className="text-brand-white">3–5 years</span>. A full service includes movement cleaning and lubrication, gasket replacement, water resistance testing, case and bracelet polishing, and accuracy regulation.
            </p>
            <p>
              For warranty service or to locate an authorized service center, contact our support team with your proof of purchase and warranty registration details.
            </p>
          </div>
        </Section>

        {/* Storage */}
        <Section title="Storage">
          <div className="space-y-4 font-sans text-sm text-brand-muted leading-relaxed">
            <p>
              When not wearing your watch, store it in its original box or a dedicated watch roll in a cool, dry location. Avoid bathroom storage — humidity and temperature swings accelerate gasket degradation.
            </p>
            <p>
              Keep watches away from strong magnetic fields — stereo speakers, tablet covers with magnetic clasps, and certain bag closures can all affect movement accuracy. If your watch runs fast or slow after proximity to a magnet, it may need demagnetisation by a watchmaker.
            </p>
            <p>
              For long-term storage exceeding several months, remove the watch from its bracelet if leather, and allow the battery to discharge naturally rather than leaving it in an unused state.
            </p>
          </div>
        </Section>

        {/* CTA */}
        <div className="border border-brand-gold/15 bg-brand-gold/[0.02] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-serif text-xl text-brand-white mb-1">Need service or have a question?</p>
            <p className="font-sans text-sm text-brand-muted">Our team is available Monday–Saturday, 10 AM–6 PM EST.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-brand-white transition-colors duration-200"
            >
              Contact Support
            </Link>
            <Link
              to="/warranty-registration"
              className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-gold text-xs font-sans font-medium tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
            >
              Register Warranty
            </Link>
          </div>
        </div>

        {/* Related links */}
        <div className="pt-4 border-t border-brand-gold/10 flex flex-wrap gap-6">
          <Link to="/faq" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">FAQ</Link>
          <Link to="/warranty-registration" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Warranty Registration</Link>
          <Link to="/find-a-retailer" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Find a Retailer</Link>
        </div>
      </div>
    </div>
  );
}
