import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';

const RETAILERS = [
  { name: 'MULCO Watches Inc.', location: 'Aventura, FL — United States', note: 'Flagship Boutique & Service Center', href: 'https://maps.google.com/?q=19790+W+Dixie+Hwy+Suite+201+Aventura+FL+33180' },
  { name: 'mulco.com/apps/store-locator', location: 'Worldwide', note: 'Official Store Locator', href: 'https://mulco.com/apps/store-locator' },
  { name: 'Authorized Dealers', location: 'United States · Latin America · Europe', note: 'Contact us to find the nearest point of sale', href: '/support' },
];

export default function FindRetailer() {
  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 pt-16 pb-10">
        <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-8">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-[400ms]">Home</Link>
          <ChevronRight size={10} className="opacity-40" />
          <span className="text-brand-white">Find a Retailer</span>
        </nav>
        <Eyebrow text="Where to Buy" className="mb-4" />
        <h1 className="font-serif text-[3rem] md:text-[4rem] text-brand-white leading-[0.95] tracking-[-0.02em]">Find a Retailer</h1>
        <p className="font-sans text-[14px] text-brand-muted mt-5 max-w-xl leading-[1.7]">
          Experience MULCO in person at our flagship boutique or through our global network of authorized retailers.
        </p>
      </div>

      {/* Map embed */}
      <div className="w-full h-[50vh] bg-brand-gold/[0.03] border-y border-brand-gold/10 overflow-hidden">
        <iframe
          title="MULCO Aventura Flagship"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3589.1!2d-80.1362!3d25.9669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad2a63bfffff%3A0x0!2s19790+W+Dixie+Hwy+%23201%2C+Aventura%2C+FL+33180!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="100%"
          className="border-0 grayscale opacity-70"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* Retailer list */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 py-20 pb-32">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold mb-8">Locations</p>

        <div className="divide-y divide-brand-gold/10">
          {RETAILERS.map(({ name, location, note, href }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-7 gap-2 hover:bg-white/[0.01] transition-colors duration-[400ms] -mx-2 px-2"
            >
              <div>
                <p className="font-serif text-xl text-brand-white group-hover:text-brand-gold transition-colors duration-[400ms] leading-tight">{name}</p>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-brand-muted mt-1">{location}</p>
              </div>
              <p className="font-sans text-[12px] text-brand-muted/60 group-hover:text-brand-gold/60 transition-colors duration-[400ms] flex-shrink-0">{note}</p>
            </a>
          ))}
        </div>

        {/* Wholesale note */}
        <p className="font-sans text-[13px] text-brand-muted leading-[1.7] mt-16 border-t border-brand-gold/10 pt-8 max-w-xl">
          Interested in carrying MULCO?{' '}
          <a href="mailto:info@mulcowatches.com" className="text-brand-gold hover:text-brand-white transition-colors duration-[400ms]">
            info@mulcowatches.com
          </a>
        </p>
      </div>
    </div>
  );
}
