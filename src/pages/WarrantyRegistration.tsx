import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, CheckCircle, ChevronDown } from 'lucide-react';

const WATCH_MODELS = [
  'Blue Marine Fusion',
  'Blue Marine Infinity',
  'Blue Marine Medusa',
  'Buzo Atlantis',
  'Buzo Dive Silicone',
  'Buzo Dive Stainless Steel',
  'Buzo Tentacles',
  'COBRA',
  'Dreamcatcher',
  'Enchanted Maple',
  'Enchanted Quartz',
  'Era 50',
  'Evol Reloaded',
  'Freedom',
  'Frost Full Moon',
  'Kripton Lady',
  'Kripton Royale Gents',
  'Kripton Royale Lady',
  'Kripton Square',
  'Kripton Viper',
  'La Fleur Gardenia',
  'Lady D',
  'M10 Namaste',
  'Mulco Breathe',
  'Pride',
  'Titans Snap Ladies',
];

const PURCHASE_SOURCES = ['Online at mulco.com', 'Authorized Retailer', 'Gift'];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  purchaseSource: string;
  retailerName: string;
  country: string;
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  model: '',
  serialNumber: '',
  purchaseDate: '',
  purchaseSource: '',
  retailerName: '',
  country: '',
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">
        {label}{required && <span className="text-brand-gold ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = 'bg-transparent border border-brand-gold/20 text-brand-white text-sm font-sans px-3 py-2.5 placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold/60 transition-colors w-full';

export default function WarrantyRegistration() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.model) e.model = 'Please select your watch model';
    if (!form.serialNumber.trim()) e.serialNumber = 'Required';
    if (!form.purchaseDate) e.purchaseDate = 'Required';
    if (!form.purchaseSource) e.purchaseSource = 'Please select where you purchased';
    if (form.purchaseSource === 'Authorized Retailer' && !form.retailerName.trim()) e.retailerName = 'Required';
    if (!form.country.trim()) e.country = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const stored = JSON.parse(localStorage.getItem('mulco-warranty-registrations') ?? '[]');
    localStorage.setItem('mulco-warranty-registrations', JSON.stringify([
      ...stored,
      { ...form, registeredAt: new Date().toISOString() },
    ]));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-black pt-[72px] flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-brand-gold" strokeWidth={1.5} />
          </div>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Registration Complete</p>
          <h1 className="font-serif text-3xl md:text-4xl text-brand-white mb-4">Your warranty is registered.</h1>
          <div className="w-10 h-px bg-brand-gold mx-auto mb-6" />
          <p className="font-sans text-sm text-brand-muted leading-relaxed mb-8">
            Thank you, <span className="text-brand-white">{form.firstName}</span>. Your <span className="text-brand-white">{form.model}</span> is now registered under your 2-year international limited warranty. A confirmation has been saved for your records.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/collections"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-brand-white transition-colors duration-200"
            >
              Continue Shopping
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center justify-center gap-2 border border-brand-gold/30 text-brand-gold text-xs font-sans font-medium tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Warranty Registration</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">After Your Purchase</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Warranty Registration</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
          <p className="font-sans text-sm text-brand-muted mt-4 leading-relaxed">
            Register your MULCO timepiece to activate your 2-year international limited warranty and receive priority support.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 md:px-12 lg:px-20 py-14 pb-28">

        {/* What you get */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-gold/8 mb-12">
          {[
            { icon: Shield, label: '2-Year Coverage',    body: 'Manufacturing defects in materials and workmanship' },
            { icon: CheckCircle, label: 'Priority Support', body: 'Registered owners receive faster claim processing' },
            { icon: Shield, label: 'Proof of Ownership', body: 'Your registration serves as official ownership record' },
          ].map(({ icon: Icon, label, body }) => (
            <div key={label} className="bg-brand-black p-5 flex flex-col gap-2">
              <Icon size={16} className="text-brand-gold" strokeWidth={1.5} />
              <p className="font-serif text-sm text-brand-white">{label}</p>
              <p className="font-sans text-xs text-brand-muted leading-snug">{body}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <p className="font-serif text-xl text-brand-white">Your Information</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="First Name" required>
              <input value={form.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="Jane" className={inputCls} autoComplete="given-name" />
              {errors.firstName && <span className="text-[10px] font-sans text-brand-rose">{errors.firstName}</span>}
            </Field>
            <Field label="Last Name" required>
              <input value={form.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Smith" className={inputCls} autoComplete="family-name" />
              {errors.lastName && <span className="text-[10px] font-sans text-brand-rose">{errors.lastName}</span>}
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Email Address" required>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="jane@example.com" className={inputCls} autoComplete="email" />
              {errors.email && <span className="text-[10px] font-sans text-brand-rose">{errors.email}</span>}
            </Field>
            <Field label="Phone Number">
              <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+1 (305) 000-0000" className={inputCls} autoComplete="tel" />
            </Field>
          </div>

          <Field label="Country of Residence" required>
            <input value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="United States" className={inputCls} autoComplete="country-name" />
            {errors.country && <span className="text-[10px] font-sans text-brand-rose">{errors.country}</span>}
          </Field>

          <div className="pt-2 border-t border-brand-gold/10">
            <p className="font-serif text-xl text-brand-white mb-6">Watch Details</p>

            <div className="space-y-5">
              <Field label="Watch Model" required>
                <div className="relative">
                  <select
                    value={form.model}
                    onChange={(e) => set('model', e.target.value)}
                    className={`${inputCls} appearance-none pr-8 cursor-pointer`}
                    style={{ backgroundColor: '#0A0A0A' }}
                  >
                    <option value="">Select your model…</option>
                    {WATCH_MODELS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                </div>
                {errors.model && <span className="text-[10px] font-sans text-brand-rose">{errors.model}</span>}
              </Field>

              <Field label="Serial Number" required>
                <input value={form.serialNumber} onChange={(e) => set('serialNumber', e.target.value)} placeholder="Found on the case back" className={inputCls} />
                {errors.serialNumber && <span className="text-[10px] font-sans text-brand-rose">{errors.serialNumber}</span>}
                <span className="text-[10px] font-sans text-brand-muted/60">The serial number is engraved on the case back of your watch.</span>
              </Field>

              <Field label="Date of Purchase" required>
                <input
                  type="date"
                  value={form.purchaseDate}
                  onChange={(e) => set('purchaseDate', e.target.value)}
                  max={new Date().toISOString().slice(0, 10)}
                  className={`${inputCls} [color-scheme:dark]`}
                />
                {errors.purchaseDate && <span className="text-[10px] font-sans text-brand-rose">{errors.purchaseDate}</span>}
              </Field>

              <Field label="Where did you purchase?" required>
                <div className="relative">
                  <select
                    value={form.purchaseSource}
                    onChange={(e) => set('purchaseSource', e.target.value)}
                    className={`${inputCls} appearance-none pr-8 cursor-pointer`}
                    style={{ backgroundColor: '#0A0A0A' }}
                  >
                    <option value="">Select…</option>
                    {PURCHASE_SOURCES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                </div>
                {errors.purchaseSource && <span className="text-[10px] font-sans text-brand-rose">{errors.purchaseSource}</span>}
              </Field>

              {form.purchaseSource === 'Authorized Retailer' && (
                <Field label="Retailer Name" required>
                  <input value={form.retailerName} onChange={(e) => set('retailerName', e.target.value)} placeholder="Store name and city" className={inputCls} />
                  {errors.retailerName && <span className="text-[10px] font-sans text-brand-rose">{errors.retailerName}</span>}
                </Field>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.25em] uppercase hover:bg-brand-white transition-colors duration-200 active:scale-[0.99]"
            >
              Register My Watch
            </button>
            <p className="text-[10px] font-sans text-brand-muted/60 text-center mt-3">
              Fields marked <span className="text-brand-gold">*</span> are required. Registration must be submitted within 30 days of purchase.
            </p>
          </div>
        </form>

        {/* Related links */}
        <div className="pt-10 mt-10 border-t border-brand-gold/10 flex flex-wrap gap-6">
          <Link to="/faq" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Warranty FAQ</Link>
          <Link to="/support" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Contact Support</Link>
          <Link to="/returns" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">Returns Policy</Link>
        </div>
      </div>
    </div>
  );
}
