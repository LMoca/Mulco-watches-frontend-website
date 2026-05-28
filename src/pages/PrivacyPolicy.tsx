import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const LAST_UPDATED = 'May 28, 2026';

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'When you place an order or create an account, we collect your name, email address, phone number, shipping address, and payment information. Payment card details are processed securely by our payment processor and are never stored on our servers.',
      'When you browse our website, we automatically collect certain technical information including your IP address, browser type, device type, pages visited, time spent on pages, and referring URLs. We collect this information using cookies and similar tracking technologies.',
      'If you subscribe to our newsletter or contact our support team, we collect the information you voluntarily provide.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'To process and fulfil your orders, including sending order confirmations, shipping notifications, and tracking information.',
      'To provide customer support and respond to your inquiries, warranty claims, or repair requests.',
      'To send you marketing communications about new collections, exclusive offers, and brand news — only if you have opted in. You may unsubscribe at any time.',
      'To improve our website, analyse traffic patterns, and personalise your shopping experience.',
      'To comply with legal obligations, prevent fraud, and enforce our terms of service.',
    ],
  },
  {
    title: 'Cookies and Tracking Technologies',
    body: [
      'We use essential cookies that are necessary for the website to function, including session management and shopping cart persistence. These cannot be disabled.',
      'With your consent, we also use analytics cookies (such as Google Analytics) to understand how visitors interact with our site, and marketing cookies to deliver relevant advertisements.',
      'You can manage your cookie preferences at any time using the cookie consent banner or by adjusting your browser settings. Note that disabling certain cookies may affect website functionality.',
    ],
  },
  {
    title: 'Sharing Your Information',
    body: [
      'We do not sell, rent, or trade your personal information to third parties for their marketing purposes.',
      'We share your information with trusted service providers who assist us in operating our website and business, including payment processors, shipping carriers, and email service providers. These parties are contractually obligated to protect your data.',
      'We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect the rights, property, or safety of MULCO, our customers, or others.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.',
      'Order records are retained for seven years for tax and accounting purposes. You may request deletion of your account and associated data at any time, subject to legal retention requirements.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'Depending on your location, you may have the right to access, correct, or delete your personal data; object to or restrict certain processing; and receive a copy of your data in a portable format.',
      'To exercise any of these rights, please contact us at privacy@mulco.com. We will respond within 30 days. We may need to verify your identity before processing your request.',
      'If you are a resident of the European Union, you have the right to lodge a complaint with your local supervisory authority. If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA).',
    ],
  },
  {
    title: 'Security',
    body: [
      'We implement industry-standard security measures including SSL/TLS encryption, secure payment processing, and access controls to protect your personal information.',
      'While we take reasonable precautions, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security and encourage you to use strong passwords and to contact us immediately if you suspect any unauthorised access to your account.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email or by posting a prominent notice on our website prior to the changes taking effect.',
      'Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.',
    ],
  },
  {
    title: 'Contact Us',
    body: [
      'If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
      'Email: privacy@mulco.com\nPhone: +1 (305) 936-9200\nAddress: MULCO Watches, 19790 W Dixie Hwy, Suite 201, Aventura, FL 33180',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      {/* Header */}
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Privacy Policy</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Legal</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Privacy Policy</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
          <p className="font-sans text-sm text-brand-muted mt-4">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 pb-28">
        <p className="font-sans text-sm text-brand-muted leading-relaxed mb-12 max-w-2xl">
          MULCO Watches ("MULCO," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
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

        {/* Related links */}
        <div className="mt-16 pt-10 border-t border-brand-gold/10 flex flex-wrap gap-6">
          <Link to="/terms" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
            Terms &amp; Conditions
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
