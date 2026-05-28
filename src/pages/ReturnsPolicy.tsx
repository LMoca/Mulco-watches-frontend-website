import { Link } from 'react-router-dom';
import { ChevronRight, RotateCcw, CheckCircle, XCircle, Clock } from 'lucide-react';

const steps = [
  { n: '01', title: 'Contact Us',       body: 'Email support@mulco.com within 30 days of delivery. Include your order number and reason for return. Our team will respond within 1 business day.' },
  { n: '02', title: 'Receive Label',    body: 'For eligible returns within the US and Puerto Rico, we will email you a prepaid return shipping label at no cost to you.' },
  { n: '03', title: 'Pack & Ship',      body: 'Pack the item securely in its original box with all accessories, documentation, and tags. Attach the label and drop off at any authorised carrier location.' },
  { n: '04', title: 'Refund Processed', body: 'Once we receive and inspect your return, we will process your refund within 5–10 business days. You will receive a confirmation email.' },
];

const eligible = [
  'Unworn, in original condition',
  'Original packaging and box included',
  'All tags, documentation, and warranty card present',
  'Returned within 30 days of delivery',
  'No signs of wear, scratches, or alteration',
];

const notEligible = [
  'Items showing signs of wear or use',
  'Items without original packaging or documentation',
  'Personalised or engraved items',
  'Special or custom orders',
  'Items returned after 30 days',
  'Gift cards',
];

export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Returns Policy</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Customer Care</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Returns &amp; Exchanges</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
          <p className="font-sans text-sm text-brand-muted mt-4 max-w-xl leading-relaxed">
            We stand behind every MULCO timepiece. If you are not completely satisfied, we make returns straightforward.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 pb-28 space-y-16">

        {/* Key facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-gold/8">
          {[
            { icon: Clock,     label: '30-Day Window',   body: 'Returns accepted within 30 days of delivery' },
            { icon: RotateCcw, label: 'Free Returns',    body: 'Prepaid label provided for US & PR returns' },
            { icon: CheckCircle, label: '5–10 Day Refund', body: 'Refunds processed after inspection' },
          ].map(({ icon: Icon, label, body }) => (
            <div key={label} className="bg-brand-black p-6 flex flex-col gap-3">
              <Icon size={20} className="text-brand-gold" strokeWidth={1.5} />
              <div>
                <p className="font-serif text-base text-brand-white">{label}</p>
                <p className="font-sans text-xs text-brand-muted mt-1 leading-snug">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Return process */}
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-4">How to Return</h2>
          <div className="w-8 h-px bg-brand-gold mb-8" />
          <div className="space-y-0 border-l border-brand-gold/20 ml-4 pl-8 space-y-10">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="absolute -left-[2.625rem] top-0.5 w-3 h-3 rounded-full bg-brand-gold border-2 border-brand-black ring-1 ring-brand-gold/40" />
                <span className="font-serif text-3xl text-brand-gold/12 leading-none block">{s.n}</span>
                <h3 className="font-serif text-lg text-brand-white mt-0.5 mb-2">{s.title}</h3>
                <p className="font-sans text-sm text-brand-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-gold/8">
          <div className="bg-brand-black p-7">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={16} className="text-brand-gold" strokeWidth={1.5} />
              <h3 className="font-serif text-lg text-brand-white">Eligible for Return</h3>
            </div>
            <ul className="space-y-3">
              {eligible.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                  <span className="font-sans text-sm text-brand-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-brand-black p-7">
            <div className="flex items-center gap-2 mb-5">
              <XCircle size={16} className="text-brand-muted" strokeWidth={1.5} />
              <h3 className="font-serif text-lg text-brand-white">Not Eligible</h3>
            </div>
            <ul className="space-y-3">
              {notEligible.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-muted flex-shrink-0" />
                  <span className="font-sans text-sm text-brand-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Exchanges */}
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-4">Exchanges</h2>
          <div className="w-8 h-px bg-brand-gold mb-6" />
          <div className="space-y-4 font-sans text-sm text-brand-muted leading-relaxed">
            <p>We do not process direct exchanges. To exchange an item, return it for a refund and place a new order for the preferred item. This ensures the fastest turnaround and guarantees availability.</p>
            <p>If you received a defective or incorrect item, please contact us within 48 hours of delivery at <span className="text-brand-white">support@mulco.com</span> with photos of the issue. We will resolve this at no cost to you.</p>
          </div>
        </div>

        {/* Refund timeline */}
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-4">Refund Timeline</h2>
          <div className="w-8 h-px bg-brand-gold mb-6" />
          <div className="space-y-4 font-sans text-sm text-brand-muted leading-relaxed">
            <p>Refunds are issued to your original payment method. Once we receive your return and complete inspection, your refund will be processed within <span className="text-brand-white">5–10 business days</span>. You will receive an email confirmation.</p>
            <p>Please allow an additional 3–5 business days for your bank or card issuer to post the credit to your account. If you have not received your refund after 15 business days, contact us at support@mulco.com.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-brand-gold/15 bg-brand-gold/[0.02] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-serif text-xl text-brand-white mb-1">Ready to start a return?</p>
            <p className="font-sans text-sm text-brand-muted">Our team is available Monday–Saturday, 10 AM–6 PM EST.</p>
          </div>
          <Link
            to="/support"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-brand-white transition-colors duration-200"
          >
            Contact Support
          </Link>
        </div>

        {/* Related links */}
        <div className="pt-4 border-t border-brand-gold/10 flex flex-wrap gap-6">
          <Link to="/shipping" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Shipping Policy</Link>
          <Link to="/faq" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">FAQ</Link>
          <Link to="/terms" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Terms &amp; Conditions</Link>
        </div>
      </div>
    </div>
  );
}
