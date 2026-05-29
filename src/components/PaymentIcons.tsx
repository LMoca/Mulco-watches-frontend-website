const cards = [
  {
    label: 'Visa',
    bg: '#1A1F71',
    content: (
      <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
        VISA
      </span>
    ),
  },
  {
    label: 'Mastercard',
    bg: '#252525',
    content: (
      <span className="flex items-center justify-center relative w-full h-full">
        <span style={{ position: 'absolute', left: 5, width: 14, height: 14, borderRadius: '50%', background: '#EB001B', opacity: 0.95 }} />
        <span style={{ position: 'absolute', left: 13, width: 14, height: 14, borderRadius: '50%', background: '#F79E1B', opacity: 0.95 }} />
      </span>
    ),
  },
  {
    label: 'Amex',
    bg: '#2E77BC',
    content: (
      <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.04em', fontFamily: 'sans-serif', lineHeight: 1 }}>
        AMERICAN<br />EXPRESS
      </span>
    ),
  },
  {
    label: 'PayPal',
    bg: '#003087',
    content: (
      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px', fontFamily: 'sans-serif' }}>
        Pay<span style={{ color: '#009CDE' }}>Pal</span>
      </span>
    ),
  },
  {
    label: 'Apple Pay',
    bg: '#1C1C1E',
    content: (
      <span style={{ fontSize: 10, fontWeight: 600, color: '#fff', letterSpacing: '-0.3px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
         Pay
      </span>
    ),
  },
];

export default function PaymentIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
      {cards.map(({ label, bg, content }) => (
        <span
          key={label}
          title={label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 26,
            borderRadius: 4,
            background: bg,
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {content}
        </span>
      ))}
    </div>
  );
}
