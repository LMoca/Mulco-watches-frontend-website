import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Globe, Clock, Search } from 'lucide-react';

interface Retailer {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  website?: string;
  hours: string;
  flagship?: boolean;
}

type Region = 'All' | 'USA' | 'Puerto Rico' | 'Latin America' | 'Europe';

const RETAILERS: Retailer[] = [
  // USA
  { id: 'r1',  name: 'MULCO Flagship Boutique',    address: '19790 W Dixie Hwy, Suite 201',  city: 'Aventura',       region: 'USA',          country: 'United States',  phone: '+1 (305) 933-0800', website: 'https://mulco.com', hours: 'Mon–Sat 10–7, Sun 12–6', flagship: true },
  { id: 'r2',  name: 'Mayors Jewelers',            address: '9700 Collins Ave',              city: 'Bal Harbour',    region: 'USA',          country: 'United States',  phone: '+1 (305) 865-0058', hours: 'Mon–Sat 10–8, Sun 12–6' },
  { id: 'r3',  name: 'Reeds Jewelers',             address: '3200 Northline Ave',            city: 'Greensboro',     region: 'USA',          country: 'United States',  phone: '+1 (336) 294-1772', hours: 'Mon–Sat 10–9, Sun 12–6' },
  { id: 'r4',  name: 'Whitehall Jewellers',        address: '8001 S Orange Blossom Trail',   city: 'Orlando',        region: 'USA',          country: 'United States',  phone: '+1 (407) 363-8550', hours: 'Mon–Sat 10–9, Sun 11–7' },
  { id: 'r5',  name: 'Friedman\'s Jewelers',       address: '4400 Ashford Dunwoody Rd',      city: 'Atlanta',        region: 'USA',          country: 'United States',  phone: '+1 (770) 394-1550', hours: 'Mon–Sat 10–9, Sun 12–6' },
  { id: 'r6',  name: 'Helzberg Diamonds',          address: '10000 W North Ave',             city: 'Wauwatosa',      region: 'USA',          country: 'United States',  phone: '+1 (414) 453-1600', hours: 'Mon–Sat 10–9, Sun 11–6' },
  // Puerto Rico
  { id: 'r7',  name: 'Joyería El Guajiro',         address: 'Plaza Las Américas, Local 248', city: 'San Juan',       region: 'Puerto Rico',  country: 'Puerto Rico',    phone: '+1 (787) 641-2100', hours: 'Mon–Sat 9–9, Sun 11–7' },
  { id: 'r8',  name: 'Carat Joyería',              address: 'Mall of San Juan, Nivel 1',     city: 'San Juan',       region: 'Puerto Rico',  country: 'Puerto Rico',    phone: '+1 (787) 729-0606', hours: 'Mon–Sat 10–9, Sun 11–7' },
  { id: 'r9',  name: 'Diamonds International PR',  address: 'Calle Fortaleza 206',           city: 'Old San Juan',   region: 'Puerto Rico',  country: 'Puerto Rico',    phone: '+1 (787) 977-1880', hours: 'Daily 9–6' },
  // Latin America
  { id: 'r10', name: 'Joyería Caribe',             address: 'Av. Insurgentes Sur 1605',      city: 'Ciudad de México', region: 'Latin America', country: 'Mexico',       phone: '+52 55 5563-0011',  hours: 'Mon–Sat 10–8, Sun 12–6' },
  { id: 'r11', name: 'Casa del Tiempo',            address: 'Centro Comercial Santafé',      city: 'Bogotá',         region: 'Latin America', country: 'Colombia',      phone: '+57 1 744-2200',    hours: 'Mon–Sat 10–8, Sun 11–7' },
  { id: 'r12', name: 'Relojería del Sol',          address: 'Av. Corrientes 1215',           city: 'Buenos Aires',   region: 'Latin America', country: 'Argentina',     phone: '+54 11 4382-0044',  hours: 'Mon–Fri 10–7, Sat 10–5' },
  { id: 'r13', name: 'Óptica & Relojería Torres',  address: 'Av. Paulista 1374',             city: 'São Paulo',      region: 'Latin America', country: 'Brazil',        phone: '+55 11 3251-6677',  hours: 'Mon–Sat 9–7, Sun 12–5' },
  { id: 'r14', name: 'Galería del Reloj',          address: 'Av. Larco 1036',                city: 'Lima',           region: 'Latin America', country: 'Peru',          phone: '+51 1 241-5530',    hours: 'Mon–Sat 10–8' },
  // Europe
  { id: 'r15', name: 'Chronos Barcelona',          address: 'Passeig de Gràcia 41',          city: 'Barcelona',      region: 'Europe',       country: 'Spain',          phone: '+34 93 215-4400',   hours: 'Mon–Sat 10–8:30' },
  { id: 'r16', name: 'Relojería Madrid Centro',    address: 'Calle Gran Vía 32',             city: 'Madrid',         region: 'Europe',       country: 'Spain',          phone: '+34 91 532-1100',   hours: 'Mon–Sat 10–9, Sun 12–8' },
  { id: 'r17', name: 'Zeitgeist Uhren',            address: 'Kurfürstendamm 216',            city: 'Berlin',         region: 'Europe',       country: 'Germany',        phone: '+49 30 8817-2230',  hours: 'Mon–Sat 10–7' },
  { id: 'r18', name: 'Montres Prestige',           address: '18 Rue de la Paix',             city: 'Paris',          region: 'Europe',       country: 'France',         phone: '+33 1 4261-3355',   hours: 'Mon–Sat 10–7' },
];

const REGIONS: Region[] = ['All', 'USA', 'Puerto Rico', 'Latin America', 'Europe'];

function RetailerCard({ r }: { r: Retailer }) {
  return (
    <div className="bg-brand-gold/[0.02] border border-brand-gold/12 p-6 hover:border-brand-gold/30 hover:bg-brand-gold/[0.04] transition-all duration-250 group relative">
      {r.flagship && (
        <span className="absolute top-4 right-4 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-2 py-0.5">
          Flagship
        </span>
      )}
      <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold mb-1">{r.country}</p>
      <h3 className="font-serif text-lg text-brand-white group-hover:text-brand-gold transition-colors duration-200 pr-16">{r.name}</h3>
      <div className="mt-4 space-y-2.5">
        <div className="flex items-start gap-2.5">
          <MapPin size={12} className="text-brand-gold/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <span className="text-xs font-sans text-brand-muted leading-snug">{r.address}, {r.city}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone size={12} className="text-brand-gold/60 flex-shrink-0" strokeWidth={1.5} />
          <a href={`tel:${r.phone}`} className="text-xs font-sans text-brand-muted hover:text-brand-white transition-colors">{r.phone}</a>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock size={12} className="text-brand-gold/60 flex-shrink-0" strokeWidth={1.5} />
          <span className="text-xs font-sans text-brand-muted">{r.hours}</span>
        </div>
        {r.website && (
          <div className="flex items-center gap-2.5">
            <Globe size={12} className="text-brand-gold/60 flex-shrink-0" strokeWidth={1.5} />
            <a href={r.website} target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-brand-gold hover:text-brand-white transition-colors">
              Visit website
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FindRetailer() {
  const [activeRegion, setActiveRegion] = useState<Region>('All');
  const [query, setQuery] = useState('');

  const filtered = RETAILERS.filter((r) => {
    const matchRegion = activeRegion === 'All' || r.region === activeRegion;
    const q = query.trim().toLowerCase();
    const matchQuery = !q || r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q) || r.country.toLowerCase().includes(q);
    return matchRegion && matchQuery;
  });

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Find a Retailer</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Where to Buy</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Find a Retailer</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
          <p className="font-sans text-sm text-brand-muted mt-4 max-w-xl leading-relaxed">
            MULCO timepieces are available through authorized retailers worldwide. Visit a location near you for a personalized experience.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-12 pb-28">

        {/* Search + region filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city or retailer name…"
              className="w-full bg-transparent border border-brand-gold/20 text-brand-white text-sm font-sans pl-9 pr-4 py-2.5 placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold/60 transition-colors"
            />
          </div>

          {/* Region chips */}
          <div className="flex gap-1.5 flex-wrap">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-3.5 py-2 text-[10px] font-sans font-medium tracking-[0.15em] uppercase transition-all duration-200 border flex-shrink-0 ${
                  activeRegion === r
                    ? 'bg-brand-gold text-brand-black border-brand-gold'
                    : 'text-brand-muted border-brand-gold/20 hover:border-brand-gold/50 hover:text-brand-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs font-sans text-brand-muted mb-6">
          {filtered.length} {filtered.length === 1 ? 'retailer' : 'retailers'} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r) => (
              <RetailerCard key={r.id} r={r} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-brand-gold/10">
            <MapPin size={28} className="text-brand-gold/30 mx-auto mb-4" strokeWidth={1.5} />
            <p className="font-serif text-xl text-brand-muted mb-1">No retailers found</p>
            <p className="text-xs font-sans text-brand-muted/60">Try a different search or region.</p>
          </div>
        )}

        {/* Become a retailer CTA */}
        <div className="mt-16 border border-brand-gold/15 bg-brand-gold/[0.02] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-serif text-xl text-brand-white mb-1">Interested in carrying MULCO?</p>
            <p className="font-sans text-sm text-brand-muted">We work with select retailers worldwide. Contact our wholesale team to learn more.</p>
          </div>
          <Link
            to="/support"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-brand-white transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
