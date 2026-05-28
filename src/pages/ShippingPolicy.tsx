import { Link } from 'react-router-dom';
import { ChevronRight, Truck, Globe, Clock, Package, AlertCircle } from 'lucide-react';

const highlights = [
  { icon: Truck,        label: 'Free Shipping',      body: 'All orders to the US & Puerto Rico' },
  { icon: Clock,        label: '1–2 Day Processing', body: 'Orders processed within 1–2 business days' },
  { icon: Package,      label: 'Tracked',            body: 'Tracking number emailed at shipment' },
  { icon: Globe,        label: 'International',      body: 'We ship to 40+ countries worldwide' },
];

const domestic = [
  { method: 'Standard Shipping',  time: '5–7 business days',  cost: 'Free' },
  { method: 'Expedited Shipping', time: '2–3 business days',  cost: '$14.99' },
  { method: 'Overnight',          time: 'Next business day',  cost: '$29.99' },
];

const international = [
  { region: 'Canada',         time: '7–14 business days',  cost: 'From $18.99' },
  { region: 'Latin America',  time: '10–18 business days', cost: 'From $22.99' },
  { region: 'Europe',         time: '10–16 business days', cost: 'From $24.99' },
  { region: 'Rest of World',  time: '14–21 business days', cost: 'From $29.99' },
];

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Shipping Policy</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Customer Care</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Shipping Policy</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 pb-28 space-y-16">

        {/* Highlight grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-gold/8">
          {highlights.map(({ icon: Icon, label, body }) => (
            <div key={label} className="bg-brand-black p-6 flex flex-col gap-3">
              <Icon size={20} className="text-brand-gold" strokeWidth={1.5} />
              <div>
                <p className="font-serif text-base text-brand-white">{label}</p>
                <p className="font-sans text-xs text-brand-muted mt-1 leading-snug">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Processing */}
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-4">Order Processing</h2>
          <div className="w-8 h-px bg-brand-gold mb-6" />
          <div className="space-y-4 font-sans text-sm text-brand-muted leading-relaxed">
            <p>Orders are processed Monday through Friday, excluding public holidays. Orders placed before <span className="text-brand-white">2:00 PM EST</span> on a business day are typically processed the same day. Orders placed after 2:00 PM or on weekends will be processed the next business day.</p>
            <p>You will receive an order confirmation email immediately after placing your order, and a separate shipping confirmation email with your tracking number once your order has been dispatched.</p>
            <p>During peak periods (holiday season, new collection launches), processing may take up to 3 business days. We will notify you by email if there is a delay.</p>
          </div>
        </div>

        {/* Domestic */}
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-4">US & Puerto Rico Shipping</h2>
          <div className="w-8 h-px bg-brand-gold mb-6" />
          <p className="font-sans text-sm text-brand-muted leading-relaxed mb-6">All orders to the continental United States, Alaska, Hawaii, and Puerto Rico qualify for free standard shipping. Expedited options are available at checkout.</p>
          <div className="border border-brand-gold/15 overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-gold/10">
                  <th className="text-left px-5 py-3 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Method</th>
                  <th className="text-left px-5 py-3 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Estimated Time</th>
                  <th className="text-right px-5 py-3 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/[0.08]">
                {domestic.map((row) => (
                  <tr key={row.method} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-5 py-4 font-sans text-sm text-brand-white">{row.method}</td>
                    <td className="px-5 py-4 font-sans text-sm text-brand-muted">{row.time}</td>
                    <td className="px-5 py-4 font-sans text-sm text-right">
                      {row.cost === 'Free'
                        ? <span className="text-[10px] tracking-widest uppercase text-brand-gold border border-brand-gold/30 px-2 py-0.5">Free</span>
                        : <span className="text-brand-white">{row.cost}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* International */}
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-4">International Shipping</h2>
          <div className="w-8 h-px bg-brand-gold mb-6" />
          <p className="font-sans text-sm text-brand-muted leading-relaxed mb-6">We ship to over 40 countries worldwide. International orders may be subject to customs duties and import taxes, which are the responsibility of the recipient. Delivery times are estimates and may vary due to customs processing.</p>
          <div className="border border-brand-gold/15 overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-gold/10">
                  <th className="text-left px-5 py-3 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Region</th>
                  <th className="text-left px-5 py-3 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Estimated Time</th>
                  <th className="text-right px-5 py-3 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Starting From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/[0.08]">
                {international.map((row) => (
                  <tr key={row.region} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-5 py-4 font-sans text-sm text-brand-white">{row.region}</td>
                    <td className="px-5 py-4 font-sans text-sm text-brand-muted">{row.time}</td>
                    <td className="px-5 py-4 font-sans text-sm text-brand-white text-right">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notice */}
        <div className="flex gap-4 border border-brand-gold/15 bg-brand-gold/[0.03] p-6">
          <AlertCircle size={18} className="text-brand-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="space-y-2">
            <p className="font-sans text-sm font-medium text-brand-white">Important Notice</p>
            <p className="font-sans text-sm text-brand-muted leading-relaxed">MULCO is not responsible for delays caused by shipping carriers, customs authorities, severe weather, or other factors outside our control. Once your order leaves our facility, the carrier assumes responsibility for delivery.</p>
          </div>
        </div>

        {/* Related links */}
        <div className="pt-4 border-t border-brand-gold/10 flex flex-wrap gap-6">
          <Link to="/returns" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Returns Policy</Link>
          <Link to="/faq" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">FAQ</Link>
          <Link to="/support" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
