import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const LAST_UPDATED = 'May 28, 2026';

const sections = [
  {
    title: 'Agreement to Terms',
    body: [
      'By accessing or using the MULCO Watches website, placing an order, or otherwise engaging with our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.',
      'These Terms apply to all visitors, customers, and others who access or use our services. We reserve the right to update these Terms at any time. Continued use of our website following any changes constitutes acceptance of the revised Terms.',
    ],
  },
  {
    title: 'Products and Pricing',
    body: [
      'All products are subject to availability. We reserve the right to discontinue any product at any time. Product images are for illustrative purposes; actual products may vary slightly in colour or appearance due to display settings.',
      'Prices are listed in US Dollars and are subject to change without notice. We reserve the right to correct pricing errors and will notify you if a pricing error affects your order. You will have the option to proceed at the correct price or cancel your order.',
      'We make every effort to display accurate product descriptions, specifications, and imagery. However, we do not warrant that product descriptions or other content on our website are complete, reliable, or error-free.',
    ],
  },
  {
    title: 'Orders and Payment',
    body: [
      'By placing an order, you represent that you are of legal age to form a binding contract and that all information you provide is accurate and complete.',
      'We accept major credit cards (Visa, Mastercard, American Express, Discover). Payment is processed securely. Your order is not confirmed until payment has been successfully authorised.',
      'We reserve the right to refuse or cancel any order at our discretion, including orders that appear fraudulent, orders with pricing errors, or orders we are unable to fulfil. If your order is cancelled after payment, a full refund will be issued.',
      'You will receive an order confirmation email once your order is placed. This confirmation is acknowledgment of receipt and does not constitute acceptance. Acceptance occurs when your order ships.',
    ],
  },
  {
    title: 'Shipping and Delivery',
    body: [
      'We offer free standard shipping on all orders to the continental United States and Puerto Rico. International shipping rates and delivery times vary by destination.',
      'Estimated delivery times are provided as a guide only. MULCO is not responsible for delays caused by carriers, customs, weather, or other factors beyond our control.',
      'Risk of loss and title for products pass to you upon delivery to the carrier. Please inspect your order upon receipt and contact us within 48 hours if goods are damaged or missing.',
      'For full details, please review our Shipping Policy.',
    ],
  },
  {
    title: 'Returns and Exchanges',
    body: [
      'We accept returns within 30 days of delivery for products in their original, unworn condition with all original packaging, tags, and documentation.',
      'Personalised or engraved items, special orders, and gift cards are final sale and not eligible for return.',
      'To initiate a return, contact our support team at support@mulco.com. We will provide return instructions and a prepaid label for eligible returns within the United States.',
      'Refunds are processed within 5–10 business days of receiving the returned item. For full details, please review our Returns Policy.',
    ],
  },
  {
    title: 'Warranty',
    body: [
      'All MULCO timepieces are covered by a two-year international limited warranty from the date of purchase against manufacturing defects in materials and workmanship.',
      'The warranty does not cover: damage resulting from accidents, misuse, or negligence; unauthorised modification or repair; normal wear and tear; cosmetic damage; water damage beyond the watch\'s rated resistance; or damage caused by failure to follow care instructions.',
      'To make a warranty claim, contact support@mulco.com with proof of purchase and a description of the defect. MULCO reserves the right to repair or replace the timepiece at its discretion.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'All content on this website — including text, graphics, logos, images, product designs, and software — is the property of MULCO Watches or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.',
      'You may not reproduce, distribute, modify, display, or otherwise use any content from this website without our express written permission.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, MULCO Watches shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products.',
      'Our total liability for any claim arising from these Terms or your purchase shall not exceed the amount you paid for the specific product giving rise to the claim.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These Terms are governed by the laws of the State of Florida, United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Miami-Dade County, Florida.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For questions about these Terms, please contact us at:\n\nlegal@mulco.com\nMULCO Watches, 19790 W Dixie Hwy, Suite 201, Aventura, FL 33180\n+1 (305) 936-9200',
    ],
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Terms &amp; Conditions</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Legal</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Terms &amp; Conditions</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
          <p className="font-sans text-sm text-brand-muted mt-4">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 pb-28">
        <p className="font-sans text-sm text-brand-muted leading-relaxed mb-12 max-w-2xl">
          Please read these Terms and Conditions carefully before using the MULCO Watches website or making a purchase. These Terms constitute a legally binding agreement between you and MULCO Watches.
        </p>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={section.title} className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-12 pb-12 border-b border-brand-gold/8 last:border-0">
              <div>
                <span className="font-serif text-4xl text-brand-gold/10 block leading-none">0{i + 1}</span>
                <h2 className="font-serif text-lg text-brand-white mt-1">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.body.map((para, j) => (
                  <p key={j} className="font-sans text-sm text-brand-muted leading-relaxed whitespace-pre-line">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-brand-gold/10 flex flex-wrap gap-6">
          <Link to="/privacy-policy" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
            Privacy Policy
          </Link>
          <Link to="/shipping" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
            Shipping Policy
          </Link>
          <Link to="/returns" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
            Returns Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
