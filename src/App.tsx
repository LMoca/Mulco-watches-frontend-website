import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Accessories from './pages/Accessories';
import OurStory from './pages/OurStory';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsPolicy from './pages/ReturnsPolicy';
import Lookbook from './pages/Lookbook';
import FindRetailer from './pages/FindRetailer';
import WarrantyRegistration from './pages/WarrantyRegistration';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-black text-brand-white font-sans flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<Collections />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/accessories/:category" element={<Accessories />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/returns" element={<ReturnsPolicy />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/find-a-retailer" element={<FindRetailer />} />
            <Route path="/warranty-registration" element={<WarrantyRegistration />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}

export default App;
