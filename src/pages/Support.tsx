import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { sanitizeInput } from '../utils/sanitize';

const SUBJECTS = [
  'Order Inquiry',
  'Shipping & Tracking',
  'Returns & Exchanges',
  'Warranty Claim',
  'Repair Service',
  'Product Question',
  'Other',
];

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Support() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: sanitizeInput(value) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputBase =
    'w-full bg-brand-gold/[0.04] border border-brand-gold/18 focus:border-brand-gold text-brand-white placeholder:text-brand-muted text-sm font-sans px-4 py-3.5 outline-none transition-colors duration-200 rounded-none';

  return (
    <div className="min-h-screen bg-brand-black">

      {/* Hero banner */}
      <div
        className="relative h-[38vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: 'url(https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/55 to-brand-black/10" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 pb-12">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-4">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Support</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-2">We're Here to Help</p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-white">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 lg:gap-20 items-start">

          {/* Contact form */}
          <FadeSection>
            <div>
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-2">Send a Message</p>
              <h2 className="font-serif text-3xl text-brand-white mb-1">Get in Touch</h2>
              <div className="w-8 h-px bg-brand-gold mb-8" />

              {submitted ? (
                <div className="border border-brand-gold/30 bg-brand-gold/5 p-10 flex flex-col items-center text-center gap-4">
                  <CheckCircle size={32} className="text-brand-gold" strokeWidth={1.5} />
                  <div>
                    <p className="font-serif text-xl text-brand-white mb-2">Message Received</p>
                    <p className="font-sans text-sm text-brand-muted">{t('contact.success')} Our team will respond within 1 business day.</p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors mt-2"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-2 block">{t('contact.name')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Jane Smith"
                        aria-label={t('contact.name')}
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-2 block">{t('contact.email')}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="jane@example.com"
                        aria-label={t('contact.email')}
                        className={inputBase}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-2 block">{t('contact.subject')}</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      aria-label={t('contact.subject')}
                      className={`${inputBase} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select a topic...</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-[#111]">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-2 block">{t('contact.message')}</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="How can we help you today?"
                      aria-label={t('contact.message')}
                      className={`${inputBase} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-brand-white transition-colors duration-200"
                  >
                    {t('contact.send')} <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </FadeSection>

          {/* Store info */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <FadeSection delay={100}>
              <div className="border border-brand-gold/15 bg-brand-gold/[0.02]">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                <div className="p-7 space-y-6">
                  <div>
                    <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-2">Miami Service Center</p>
                    <h3 className="font-serif text-xl text-brand-white">Aventura Flagship</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: <MapPin size={14} />, lines: ['19790 W Dixie Hwy, Suite 201', 'Aventura, FL 33180'] },
                      { icon: <Phone size={14} />, lines: ['+1 (305) 936-9200'] },
                      { icon: <Mail size={14} />, lines: ['support@mulco.com', 'service@mulco.com'] },
                      { icon: <Clock size={14} />, lines: ['Mon – Sat · 10 AM – 6 PM EST', 'Sunday · Closed'] },
                    ].map(({ icon, lines }, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-brand-gold mt-0.5 flex-shrink-0">{icon}</span>
                        <div>
                          {lines.map((l) => <p key={l} className="font-sans text-sm text-brand-muted leading-snug">{l}</p>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeSection>

            {/* Quick links */}
            <FadeSection delay={150}>
              <div className="border border-brand-gold/15 bg-brand-gold/[0.02] p-7">
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-5">Quick Links</p>
                <div className="space-y-0 divide-y divide-brand-gold/[0.08]">
                  {[
                    { label: 'Warranty Policy', to: '/faq' },
                    { label: 'Repair Process', to: '/faq' },
                    { label: 'Shipping Info', to: '/faq' },
                    { label: 'Full FAQ', to: '/faq' },
                  ].map(({ label, to }) => (
                    <Link
                      key={label}
                      to={to}
                      className="flex items-center justify-between py-3 text-sm font-sans text-brand-muted hover:text-brand-gold transition-colors duration-150 group"
                    >
                      {label}
                      <ChevronRight size={12} className="text-brand-muted group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-150" />
                    </Link>
                  ))}
                </div>
              </div>
            </FadeSection>
          </aside>
        </div>
      </div>
    </div>
  );
}
