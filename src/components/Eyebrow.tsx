interface EyebrowProps {
  text: string;
  rule?: boolean;
  className?: string;
}

export default function Eyebrow({ text, rule = false, className = '' }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {rule && <span className="block w-8 h-px bg-brand-gold/80 flex-shrink-0" />}
      <span className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-brand-gold/80">
        {text}
      </span>
    </div>
  );
}
