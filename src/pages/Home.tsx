import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import CollectionsGrid from '../components/home/CollectionsGrid';
import ProductSpotlight from '../components/home/ProductSpotlight';
import SocialProof from '../components/home/SocialProof';
import AccessoriesSection from '../components/home/AccessoriesSection';
import InstagramSection from '../components/home/InstagramSection';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CollectionsGrid />
      <ProductSpotlight />
      <AccessoriesSection />
      <SocialProof />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}
