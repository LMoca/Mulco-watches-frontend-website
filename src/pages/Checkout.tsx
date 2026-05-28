import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, CheckCircle, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

type Step = 'information' | 'payment' | 'confirmation';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const EMPTY_SHIPPING: ShippingInfo = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '', country: 'United States',
};

const EMPTY_PAYMENT: PaymentInfo = {
  cardName: '', cardNumber: '', expiry: '', cvv: '',
};

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  return digits;
}

function generateOrderNumber() {
  return `MLQ-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

const inputBase =
  'w-full bg-white/[0.03] border border-brand-gold/18 focus:border-brand-gold text-brand-white placeholder:text-brand-muted text-sm font-sans px-4 py-3 outline-none transition-colors duration-200';

const labelBase = 'block text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-1.5';

/* ─── Step indicator ─── */
function StepBar({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: 'information', label: 'Information' },
    { key: 'payment', label: 'Payment' },
    { key: 'confirmation', label: 'Confirmation' },
  ];
  const activeIndex = steps.findIndex((s) => s.key === step);

  return (
    <nav className="flex items-center gap-0 mb-10">
      {steps.map((s, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <div key={s.key} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-sans font-bold transition-colors duration-300 ${
                  done
                    ? 'bg-brand-gold text-brand-black'
                    : active
                    ? 'border border-brand-gold text-brand-gold'
                    : 'border border-brand-gold/25 text-brand-muted'
                }`}
              >
                {done ? <CheckCircle size={13} /> : i + 1}
              </div>
              <span
                className={`text-[11px] font-sans tracking-[0.18em] uppercase transition-colors duration-300 ${
                  active ? 'text-brand-white' : done ? 'text-brand-gold' : 'text-brand-muted'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight size={12} className="mx-3 text-brand-gold/25 flex-shrink-0" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ─── Order summary sidebar ─── */
function OrderSummary({ items, totalPrice }: { items: ReturnType<typeof useCart>['items']; totalPrice: number }) {
  return (
    <div className="border border-brand-gold/15 bg-white/[0.015]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="p-6 space-y-5">
        <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold">Order Summary</p>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.variant ?? ''}`} className="flex gap-3 items-start">
              <div className="relative flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-gold text-brand-black text-[10px] font-bold flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-xs text-brand-white leading-snug truncate">{item.name}</p>
                <p className="font-sans text-[10px] text-brand-gold mt-0.5">{item.collection}</p>
              </div>
              <span className="font-sans text-sm text-brand-white flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-brand-gold/12 pt-4 space-y-2">
          <div className="flex justify-between text-sm font-sans">
            <span className="text-brand-muted">Subtotal</span>
            <span className="text-brand-white">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-sans">
            <span className="text-brand-muted">Shipping</span>
            <span className="text-[10px] font-sans tracking-wider uppercase text-brand-gold border border-brand-gold/30 px-2 py-0.5">Free</span>
          </div>
          <div className="flex justify-between font-serif text-xl pt-2 border-t border-brand-gold/12 mt-2">
            <span className="text-brand-white">Total</span>
            <span className="text-brand-gold">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-brand-muted pt-1">
          <Lock size={10} />
          <span className="text-[10px] font-sans tracking-wide">256-bit SSL secure checkout</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1: Information ─── */
function InformationStep({
  shipping,
  setShipping,
  onNext,
}: {
  shipping: ShippingInfo;
  setShipping: (s: ShippingInfo) => void;
  onNext: () => void;
}) {
  function set(field: keyof ShippingInfo, value: string) {
    setShipping({ ...shipping, [field]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact */}
      <div>
        <h2 className="font-serif text-xl text-brand-white mb-5">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelBase}>First Name</label>
            <input required className={inputBase} placeholder="Jane" value={shipping.firstName}
              onChange={(e) => set('firstName', e.target.value)} />
          </div>
          <div>
            <label className={labelBase}>Last Name</label>
            <input required className={inputBase} placeholder="Smith" value={shipping.lastName}
              onChange={(e) => set('lastName', e.target.value)} />
          </div>
          <div>
            <label className={labelBase}>Email</label>
            <input required type="email" className={inputBase} placeholder="jane@example.com" value={shipping.email}
              onChange={(e) => set('email', e.target.value)} />
          </div>
          <div>
            <label className={labelBase}>Phone</label>
            <input type="tel" className={inputBase} placeholder="+1 (305) 000-0000" value={shipping.phone}
              onChange={(e) => set('phone', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Shipping address */}
      <div>
        <h2 className="font-serif text-xl text-brand-white mb-5">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <label className={labelBase}>Street Address</label>
            <input required className={inputBase} placeholder="123 Ocean Drive" value={shipping.address}
              onChange={(e) => set('address', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className={labelBase}>City</label>
              <input required className={inputBase} placeholder="Miami" value={shipping.city}
                onChange={(e) => set('city', e.target.value)} />
            </div>
            <div>
              <label className={labelBase}>State</label>
              <input required className={inputBase} placeholder="FL" value={shipping.state}
                onChange={(e) => set('state', e.target.value)} />
            </div>
            <div>
              <label className={labelBase}>ZIP Code</label>
              <input required className={inputBase} placeholder="33139" value={shipping.zip}
                onChange={(e) => set('zip', e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelBase}>Country</label>
            <select
              required
              className={`${inputBase} appearance-none cursor-pointer`}
              value={shipping.country}
              onChange={(e) => set('country', e.target.value)}
            >
              {['United States', 'Puerto Rico', 'Canada', 'Mexico', 'Colombia', 'Venezuela', 'Argentina', 'Brazil', 'Spain', 'Other'].map((c) => (
                <option key={c} value={c} className="bg-[#111]">{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.22em] uppercase px-12 py-4 hover:bg-brand-white transition-colors duration-200"
      >
        Continue to Payment <ArrowRight size={13} />
      </button>
    </form>
  );
}

/* ─── Step 2: Payment ─── */
function PaymentStep({
  payment,
  setPayment,
  shipping,
  onNext,
  onBack,
}: {
  payment: PaymentInfo;
  setPayment: (p: PaymentInfo) => void;
  shipping: ShippingInfo;
  onNext: () => void;
  onBack: () => void;
}) {
  function set(field: keyof PaymentInfo, value: string) {
    setPayment({ ...payment, [field]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping summary */}
      <div className="border border-brand-gold/12 bg-white/[0.015] p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Shipping To</span>
          <button type="button" onClick={onBack} className="text-[10px] font-sans text-brand-gold hover:text-brand-white transition-colors uppercase tracking-wider">
            Edit
          </button>
        </div>
        <p className="font-sans text-sm text-brand-white">{shipping.firstName} {shipping.lastName}</p>
        <p className="font-sans text-sm text-brand-muted">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
        <p className="font-sans text-sm text-brand-muted">{shipping.email}</p>
      </div>

      {/* Card details */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl text-brand-white">Payment Details</h2>
          <div className="flex gap-1.5 items-center">
            <CreditCard size={14} className="text-brand-gold" />
            <span className="text-[10px] font-sans text-brand-muted">Visa · MC · Amex · Discover</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelBase}>Cardholder Name</label>
            <input required className={inputBase} placeholder="Jane Smith" value={payment.cardName}
              onChange={(e) => set('cardName', e.target.value)} />
          </div>
          <div>
            <label className={labelBase}>Card Number</label>
            <input
              required
              className={inputBase}
              placeholder="1234 5678 9012 3456"
              value={payment.cardNumber}
              inputMode="numeric"
              onChange={(e) => set('cardNumber', formatCardNumber(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Expiry Date</label>
              <input
                required
                className={inputBase}
                placeholder="MM / YY"
                value={payment.expiry}
                inputMode="numeric"
                onChange={(e) => set('expiry', formatExpiry(e.target.value))}
              />
            </div>
            <div>
              <label className={labelBase}>CVV</label>
              <input
                required
                className={inputBase}
                placeholder="•••"
                maxLength={4}
                inputMode="numeric"
                value={payment.cvv}
                onChange={(e) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] font-sans text-brand-muted/70 flex items-center gap-1.5">
        <Lock size={10} className="text-brand-gold" />
        Your payment information is encrypted and never stored on our servers.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 border border-brand-gold/25 text-brand-muted text-xs font-sans tracking-[0.2em] uppercase px-8 py-4 hover:border-brand-gold hover:text-brand-white transition-colors duration-200"
        >
          <ArrowLeft size={12} /> Back
        </button>
        <button
          type="submit"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.22em] uppercase px-12 py-4 hover:bg-brand-white transition-colors duration-200"
        >
          Place Order <ArrowRight size={13} />
        </button>
      </div>
    </form>
  );
}

/* ─── Step 3: Confirmation ─── */
function ConfirmationStep({ orderNumber, shipping, totalPrice }: { orderNumber: string; shipping: ShippingInfo; totalPrice: number }) {
  return (
    <div className="space-y-10">
      {/* Success header */}
      <div className="flex flex-col items-start gap-4">
        <div className="w-14 h-14 border border-brand-gold/30 flex items-center justify-center">
          <CheckCircle size={28} className="text-brand-gold" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-1">Order Confirmed</p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-white">Thank You, {shipping.firstName}.</h2>
        </div>
        <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-md">
          Your order has been received and is being prepared. A confirmation will be sent to{' '}
          <span className="text-brand-white">{shipping.email}</span>.
        </p>
      </div>

      {/* Order details */}
      <div className="border border-brand-gold/15 bg-white/[0.015] divide-y divide-brand-gold/10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 divide-x divide-brand-gold/10">
          {[
            { label: 'Order Number', value: orderNumber },
            { label: 'Order Total', value: `$${totalPrice.toFixed(2)}` },
            { label: 'Est. Delivery', value: '5 – 7 Business Days' },
          ].map(({ label, value }) => (
            <div key={label} className="p-5">
              <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-1">{label}</p>
              <p className="font-serif text-base text-brand-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="p-5">
          <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-1">Shipping To</p>
          <p className="font-sans text-sm text-brand-white">{shipping.firstName} {shipping.lastName}</p>
          <p className="font-sans text-sm text-brand-muted">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}, {shipping.country}</p>
        </div>
      </div>

      {/* What's next */}
      <div className="space-y-2">
        <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold">What Happens Next</p>
        <div className="space-y-2">
          {[
            'You will receive an order confirmation email within minutes.',
            'Our team will process and ship your order within 1–2 business days.',
            'A tracking number will be emailed once your timepiece ships.',
            'Questions? Contact us at support@mulco.com or +1 (305) 936-9200.',
          ].map((line, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 w-4 h-4 border border-brand-gold/30 flex items-center justify-center text-[9px] font-sans text-brand-gold">{i + 1}</span>
              <p className="font-sans text-sm text-brand-muted">{line}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          to="/collections"
          className="inline-flex items-center justify-center gap-2.5 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.22em] uppercase px-10 py-4 hover:bg-brand-white transition-colors duration-200"
        >
          Continue Shopping <ArrowRight size={13} />
        </Link>
        <Link
          to="/support"
          className="inline-flex items-center justify-center gap-2 border border-brand-gold/25 text-brand-muted text-xs font-sans tracking-[0.2em] uppercase px-8 py-4 hover:border-brand-gold hover:text-brand-white transition-colors duration-200"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Checkout Page ─── */
export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [step, setStep] = useState<Step>('information');
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING);
  const [payment, setPayment] = useState<PaymentInfo>(EMPTY_PAYMENT);
  const [orderNumber, setOrderNumber] = useState('');

  if (items.length === 0 && step !== 'confirmation') {
    navigate('/cart');
    return null;
  }

  function handleInfoNext() {
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePaymentNext() {
    const num = generateOrderNumber();
    setOrderNumber(num);
    clearCart();
    setStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Slim header banner */}
      <div className="border-b border-brand-gold/10 bg-brand-black/60 backdrop-blur-sm py-4 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <Link to="/cart" className="hover:text-brand-gold transition-colors">Cart</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white capitalize">{step}</span>
          </nav>
          <div className="flex items-center gap-1.5 text-brand-muted">
            <Lock size={11} className="text-brand-gold" />
            <span className="text-[10px] font-sans tracking-wide hidden sm:block">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 pb-24">
        {step !== 'confirmation' && (
          <StepBar step={step} />
        )}

        <div className={`grid gap-10 lg:gap-16 ${step === 'confirmation' ? 'grid-cols-1 max-w-3xl' : 'grid-cols-1 lg:grid-cols-[1fr_380px]'} items-start`}>
          {/* Left — active step */}
          <div>
            {step === 'information' && (
              <InformationStep
                shipping={shipping}
                setShipping={setShipping}
                onNext={handleInfoNext}
              />
            )}
            {step === 'payment' && (
              <PaymentStep
                payment={payment}
                setPayment={setPayment}
                shipping={shipping}
                onNext={handlePaymentNext}
                onBack={() => setStep('information')}
              />
            )}
            {step === 'confirmation' && (
              <ConfirmationStep
                orderNumber={orderNumber}
                shipping={shipping}
                totalPrice={totalPrice}
              />
            )}
          </div>

          {/* Right — order summary (hidden on confirmation) */}
          {step !== 'confirmation' && (
            <aside className="lg:sticky lg:top-28">
              <OrderSummary items={items} totalPrice={totalPrice} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
