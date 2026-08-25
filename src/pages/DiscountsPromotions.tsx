import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';

const sections = [
  {
    title: 'Seasonal Sales',
    body: 'MULCO runs select promotional periods throughout the year — including holiday events and anniversary collections. Discounted items are marked directly on the product page. No code required.',
  },
  {
    title: 'Member Pricing',
    body: 'MULCO account holders receive access to member-only pricing on select pieces. Sign in before adding to cart to ensure member prices are applied automatically.',
  },
  {
    title: 'Promotional Codes',
    body: 'Codes issued via email or campaign partnerships are single-use and non-transferable. They cannot be combined with other offers or applied to already-discounted items. Codes expire at the date stated in the communication.',
  },
  {
    title: 'Bundle Offers',
    body: 'From time to time MULCO offers bundle pricing on watch and strap combinations. Bundle pricing is applied at checkout and is not available on individual items.',
  },
  {
    title: 'Final Sale Items',
    body: 'Deeply discounted or clearance items are marked as Final Sale and are not eligible for returns, exchanges, or further discount application.',
  },
  {
    title: 'Exclusions',
    body: 'Limited-edition and Diamond-tier exclusive pieces are excluded from all promotional discounts. MULCO reserves the right to modify or withdraw any promotion at any time without prior notice.',
  },
];

export default function DiscountsPromotions() {
  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      <div className="border-b border-brand-gold/10 px-6 md:px-14 lg:px-24 pt-16 pb-16">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-10">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-[400ms]">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Discounts & Promotions</span>
          </nav>
          <Eyebrow text="Policies" className="mb-4" />
          <h1 className="font-serif text-[3rem] md:text-[4rem] text-brand-white leading-[0.92] tracking-[-0.02em]">
            Discounts &<br />Promotions
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-14 lg:px-24 py-16 pb-32 space-y-12">
        {sections.map(({ title, body }) => (
          <div key={title} className="border-b border-brand-gold/10 pb-12 last:border-0 last:pb-0">
            <h2 className="font-serif text-xl text-brand-white mb-3">{title}</h2>
            <p className="font-sans text-[13px] leading-[1.8] text-brand-muted">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
