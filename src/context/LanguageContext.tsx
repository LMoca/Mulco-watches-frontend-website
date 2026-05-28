import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.collections': 'Collections',
    'nav.men': 'Men',
    'nav.women': 'Women',
    'nav.newArrivals': 'New Arrivals',
    'nav.limitedEditions': 'Limited Editions',
    'nav.accessories': 'Accessories',
    'nav.sunglasses': 'Sunglasses',
    'nav.jewelry': 'Jewelry',
    'nav.straps': 'Straps',
    'nav.ourStory': 'Our Story',
    'nav.support': 'Support',
    'nav.faq': 'FAQ',
    'nav.cart': 'Cart',
    'nav.search': 'Search',

    'hero.headline': 'Time, Reimagined.',
    'hero.subtext': 'Swiss Precision. Fashion-Forward.',
    'hero.cta': 'Explore Collections',

    'collections.title': 'Collections',
    'collections.men': 'Men',
    'collections.women': 'Women',
    'collections.newArrivals': 'New Arrivals',
    'collections.limitedEditions': 'Limited Editions',

    'trust.swissMovement': 'Swiss Movement Quality',
    'trust.warranty': '2-Year International Warranty',
    'trust.shipping': 'Free Shipping (PR & USA)',
    'trust.returns': 'Easy Returns',
    'trust.service': 'Miami Service Center',

    'spotlight.addToCollection': 'Add to Collection',
    'spotlight.movement': 'Movement',
    'spotlight.waterResistance': 'Water Resistance',
    'spotlight.caseMaterial': 'Case Material',

    'story.headline': 'Since 1958',
    'story.cta': 'Discover Our Story',

    'reviews.title': 'Reviews',

    'accessories.title': 'Beyond the Watch',
    'accessories.discover': 'Discover',

    'newsletter.headline': 'Join the MULCO Community',
    'newsletter.subtext': 'First access to new collections and exclusive offers.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.submit': 'Subscribe',
    'newsletter.success': 'Welcome to the community.',

    'faq.title': 'Frequently Asked Questions',
    'faq.viewAll': 'View All FAQs',

    'cart.title': 'Your Collection',
    'cart.empty': 'Your collection is empty.',
    'cart.explore': 'Explore Collections',
    'cart.subtotal': 'Subtotal',
    'cart.shippingNote': 'Shipping calculated at checkout',
    'cart.checkout': 'Proceed to Checkout',
    'cart.remove': 'Remove',

    'product.addToCollection': 'Add to Collection',
    'product.description': 'Description',
    'product.specifications': 'Specifications',
    'product.warranty': 'Warranty',
    'product.related': 'You May Also Like',

    'footer.shop': 'Shop',
    'footer.about': 'About',
    'footer.support': 'Support',
    'footer.shippingPolicy': 'Shipping Policy',
    'footer.returns': 'Returns',
    'footer.contact': 'Contact Us',
    'footer.storeLocation': 'Store Location',
    'footer.warranty': 'Warranty',
    'footer.repairs': 'Repairs',
    'footer.copyright': 'MULCO Watches Inc. All rights reserved.',

    'contact.name': 'Full Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully.',

    'filter.all': 'All',
    'filter.sortBy': 'Sort By',
    'filter.featured': 'Featured',
    'filter.priceLowHigh': 'Price: Low to High',
    'filter.priceHighLow': 'Price: High to Low',
    'filter.newest': 'Newest',
  },
  es: {
    'nav.collections': 'Colecciones',
    'nav.men': 'Hombre',
    'nav.women': 'Mujer',
    'nav.newArrivals': 'Novedades',
    'nav.limitedEditions': 'Ediciones Limitadas',
    'nav.accessories': 'Accesorios',
    'nav.sunglasses': 'Gafas de Sol',
    'nav.jewelry': 'Joyas',
    'nav.straps': 'Correas',
    'nav.ourStory': 'Nuestra Historia',
    'nav.support': 'Soporte',
    'nav.faq': 'Preguntas Frecuentes',
    'nav.cart': 'Carrito',
    'nav.search': 'Buscar',

    'hero.headline': 'El Tiempo, Reimaginado.',
    'hero.subtext': 'Precisión Suiza. Vanguardia en Moda.',
    'hero.cta': 'Explorar Colecciones',

    'collections.title': 'Colecciones',
    'collections.men': 'Hombre',
    'collections.women': 'Mujer',
    'collections.newArrivals': 'Novedades',
    'collections.limitedEditions': 'Ediciones Limitadas',

    'trust.swissMovement': 'Movimiento Suizo',
    'trust.warranty': 'Garantía Internacional de 2 Años',
    'trust.shipping': 'Envío Gratis (PR y EE.UU.)',
    'trust.returns': 'Devoluciones Fáciles',
    'trust.service': 'Centro de Servicio en Miami',

    'spotlight.addToCollection': 'Agregar a la Colección',
    'spotlight.movement': 'Movimiento',
    'spotlight.waterResistance': 'Resistencia al Agua',
    'spotlight.caseMaterial': 'Material de Caja',

    'story.headline': 'Desde 1958',
    'story.cta': 'Descubre Nuestra Historia',

    'reviews.title': 'Voces de los Audaces',

    'accessories.title': 'Más Allá del Reloj',
    'accessories.discover': 'Descubrir',

    'newsletter.headline': 'Únete a la Comunidad MULCO',
    'newsletter.subtext': 'Acceso anticipado a nuevas colecciones y ofertas exclusivas.',
    'newsletter.placeholder': 'Ingresa tu correo',
    'newsletter.submit': 'Suscribirse',
    'newsletter.success': 'Bienvenido a la comunidad.',

    'faq.title': 'Preguntas Frecuentes',
    'faq.viewAll': 'Ver Todas las Preguntas',

    'cart.title': 'Tu Colección',
    'cart.empty': 'Tu colección está vacía.',
    'cart.explore': 'Explorar Colecciones',
    'cart.subtotal': 'Subtotal',
    'cart.shippingNote': 'Envío calculado al finalizar compra',
    'cart.checkout': 'Proceder al Pago',
    'cart.remove': 'Eliminar',

    'product.addToCollection': 'Agregar a la Colección',
    'product.description': 'Descripción',
    'product.specifications': 'Especificaciones',
    'product.warranty': 'Garantía',
    'product.related': 'También Te Puede Gustar',

    'footer.shop': 'Tienda',
    'footer.about': 'Acerca de',
    'footer.support': 'Soporte',
    'footer.shippingPolicy': 'Política de Envío',
    'footer.returns': 'Devoluciones',
    'footer.contact': 'Contáctanos',
    'footer.storeLocation': 'Ubicación de Tienda',
    'footer.warranty': 'Garantía',
    'footer.repairs': 'Reparaciones',
    'footer.copyright': 'MULCO Watches Inc. Todos los derechos reservados.',

    'contact.name': 'Nombre Completo',
    'contact.email': 'Correo Electrónico',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.success': 'Mensaje enviado exitosamente.',

    'filter.all': 'Todos',
    'filter.sortBy': 'Ordenar Por',
    'filter.featured': 'Destacados',
    'filter.priceLowHigh': 'Precio: Menor a Mayor',
    'filter.priceHighLow': 'Precio: Mayor a Menor',
    'filter.newest': 'Más Recientes',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('mulco-language');
    return (stored === 'es' ? 'es' : 'en') as Language;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mulco-language', lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
