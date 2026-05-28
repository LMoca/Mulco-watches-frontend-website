export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const faqData: FaqCategory[] = [
  {
    category: 'Orders & Payment',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are processed securely through our encrypted checkout.',
      },
      {
        question: 'How do I track my order?',
        answer:
          'Once your order ships, you will receive a confirmation email with a tracking number. You can use this number on our carrier\'s website or visit the Support page to check your order status.',
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer:
          'Orders can be modified or cancelled within 2 hours of placement. After that window, the order enters fulfillment and cannot be changed. Contact us immediately at support@mulco.com if you need assistance.',
      },
    ],
  },
  {
    category: 'Shipping',
    items: [
      {
        question: 'Do you offer free shipping?',
        answer:
          'Yes. We offer complimentary standard shipping on all orders within Puerto Rico and the continental United States. Expedited and international shipping rates are calculated at checkout.',
      },
      {
        question: 'How long does shipping take?',
        answer:
          'Standard domestic shipping takes 5–7 business days. Expedited shipping (2-day) is available at checkout. International orders typically arrive in 10–14 business days depending on destination and customs clearance.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we ship to most countries worldwide. International orders may be subject to customs duties and import taxes, which are the responsibility of the recipient.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer:
          'We accept returns within 30 days of delivery for unworn items in their original packaging with all tags attached. Items showing signs of wear, damage, or alteration will not be accepted for return.',
      },
      {
        question: 'How do I initiate a return?',
        answer:
          'Visit our Support page and fill out the return request form with your order number and reason. Our team will provide a prepaid return label within 1–2 business days. Refunds are processed within 5–7 business days of receiving the item.',
      },
    ],
  },
  {
    category: 'Repairs & Service',
    items: [
      {
        question: 'Where can I get my MULCO watch repaired?',
        answer:
          'Our authorized service center is located at 19790 W Dixie Hwy, Suite 201, Aventura, FL 33180. We also offer a mail-in repair service — contact us at service@mulco.com to initiate a service request.',
      },
      {
        question: 'How long does a repair take?',
        answer:
          'Standard repairs typically take 2–4 weeks depending on parts availability. Complex restorations or international repairs may take 4–8 weeks. You will receive status updates throughout the process.',
      },
      {
        question: 'Do you provide repair services for international customers?',
        answer:
          'Yes. International customers can ship their timepiece to our Miami service center. We recommend using a tracked and insured shipping method. Contact us before shipping for specific instructions.',
      },
    ],
  },
  {
    category: 'Warranty',
    items: [
      {
        question: 'What does the MULCO warranty cover?',
        answer:
          'All MULCO watches come with a 2-year international limited warranty covering manufacturing defects in materials and workmanship. The warranty does not cover damage from accidents, misuse, water damage beyond rated resistance, or unauthorized modifications.',
      },
      {
        question: 'How do I register my warranty?',
        answer:
          'Your warranty is automatically registered at the time of purchase through our website. For in-store purchases, register your timepiece within 30 days via the Support page using your proof of purchase.',
      },
      {
        question: 'Is the warranty valid internationally?',
        answer:
          'Yes, MULCO\'s 2-year warranty is honored internationally at any authorized MULCO service center or through our Miami service center via mail-in service.',
      },
    ],
  },
  {
    category: 'Store Information',
    items: [
      {
        question: 'Where is the MULCO store located?',
        answer:
          '19790 W Dixie Hwy, Suite 201, Aventura, FL 33180. We are open Monday through Saturday, 10 AM – 6 PM EST.',
      },
      {
        question: 'How can I contact customer service?',
        answer:
          'You can reach us by email at support@mulco.com, by phone at +1 (305) 936-9200, or by filling out the contact form on our Support page. Our team responds within 1 business day.',
      },
      {
        question: 'Do you offer in-store appointments?',
        answer:
          'Yes. We recommend scheduling an appointment for personalized styling consultations, watch fittings, or service drop-offs. Contact us to book a time that works for you.',
      },
    ],
  },
];

export const homepageFaqs: FaqItem[] = [
  faqData[0].items[0], // Payment methods
  faqData[1].items[0], // Free shipping
  faqData[1].items[1], // Shipping time
  faqData[4].items[0], // Warranty coverage
  faqData[5].items[1], // Customer care
];
