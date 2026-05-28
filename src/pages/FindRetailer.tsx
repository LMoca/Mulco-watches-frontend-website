import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, MessageCircle, Globe, ExternalLink } from 'lucide-react';

export default function FindRetailer() {
  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Find a Retailer</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Where to Buy</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Find a Retailer</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
          <p className="font-sans text-sm text-brand-muted mt-4 max-w-xl leading-relaxed">
            Experience MULCO in person at our flagship boutique or shop online with worldwide shipping. Contact us to locate an authorized retailer near you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 pb-28 space-y-16">

        {/* Flagship */}
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-4">Flagship Boutique</h2>
          <div className="w-8 h-px bg-brand-gold mb-8" />

          <div className="border border-brand-gold/20 bg-brand-gold/[0.02] p-8 relative">
            <span className="absolute top-6 right-6 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-2 py-0.5">
              Flagship
            </span>

            <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-2">Aventura, Florida</p>
            <h3 className="font-serif text-2xl text-brand-white mb-6">MULCO Watches Inc.</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-brand-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-sans text-brand-white">19790 W Dixie Hwy, Suite 201</p>
                    <p className="text-xs font-sans text-brand-muted">Aventura, FL 33180</p>
                    <p className="text-xs font-sans text-brand-muted">United States</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-brand-gold flex-shrink-0" strokeWidth={1.5} />
                  <a href="tel:+18442394995" className="text-xs font-sans text-brand-muted hover:text-brand-white transition-colors">
                    +1 (844) 239-4995
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={14} className="text-brand-gold flex-shrink-0" strokeWidth={1.5} />
                  <a
                    href="https://wa.me/17868640808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans text-brand-muted hover:text-brand-white transition-colors"
                  >
                    WhatsApp: +1 (786) 864-0808
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-brand-gold flex-shrink-0" strokeWidth={1.5} />
                  <a href="mailto:info@mulcowatches.com" className="text-xs font-sans text-brand-muted hover:text-brand-white transition-colors">
                    info@mulcowatches.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={14} className="text-brand-gold flex-shrink-0" strokeWidth={1.5} />
                  <a
                    href="https://mulco.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans text-brand-gold hover:text-brand-white transition-colors inline-flex items-center gap-1"
                  >
                    mulco.com <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Map embed placeholder */}
              <a
                href="https://maps.google.com/?q=19790+W+Dixie+Hwy+Suite+201+Aventura+FL+33180"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center bg-brand-gold/[0.04] border border-brand-gold/15 min-h-[160px] group hover:border-brand-gold/40 transition-colors duration-200"
              >
                <div className="text-center">
                  <MapPin size={24} className="text-brand-gold/50 group-hover:text-brand-gold mx-auto mb-2 transition-colors duration-200" strokeWidth={1.5} />
                  <p className="text-[10px] font-sans tracking-widest uppercase text-brand-muted group-hover:text-brand-white transition-colors duration-200">
                    Open in Google Maps
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Authorized retailers note */}
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-4">Authorized Retailers</h2>
          <div className="w-8 h-px bg-brand-gold mb-6" />
          <div className="space-y-4 font-sans text-sm text-brand-muted leading-relaxed">
            <p>
              MULCO timepieces are carried by select authorized retailers across the United States, Latin America, and Europe.
              For the most current list of retailers near you, visit the official store locator at{' '}
              <a
                href="https://mulco.com/apps/store-locator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:text-brand-white transition-colors inline-flex items-center gap-1"
              >
                mulco.com/apps/store-locator <ExternalLink size={10} />
              </a>.
            </p>
            <p>
              You can also reach our team directly — we are happy to help you find the nearest point of sale.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border border-brand-gold/15 bg-brand-gold/[0.02] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-serif text-xl text-brand-white mb-1">Can't find a retailer near you?</p>
            <p className="font-sans text-sm text-brand-muted">Our team is available Monday–Saturday, 10 AM–6 PM EST.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-brand-white transition-colors duration-200"
            >
              Contact Us
            </Link>
            <a
              href="https://mulco.com/apps/store-locator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-gold text-xs font-sans font-medium tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
            >
              Official Locator <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Wholesale */}
        <div className="pt-4 border-t border-brand-gold/10">
          <p className="font-sans text-sm text-brand-muted leading-relaxed">
            <span className="text-brand-white">Interested in carrying MULCO?</span>{' '}
            Contact our wholesale team at{' '}
            <a href="mailto:info@mulcowatches.com" className="text-brand-gold hover:text-brand-white transition-colors">
              info@mulcowatches.com
            </a>{' '}
            to learn about becoming an authorized retailer.
          </p>
        </div>
      </div>
    </div>
  );
}
