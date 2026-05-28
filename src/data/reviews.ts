export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

const SEED_REVIEWS: Review[] = [
  // Blue Marine Fusion
  { id: 's1', productId: 'blue-marine-fusion', author: 'Gabriela M.', location: 'Miami, FL', rating: 5, title: 'Absolutely stunning', body: 'I bought this for a beach wedding and got compliments all night. The dial color shifts in different lighting — it looks electric outdoors and more subtle indoors. Quality feels premium for the price.', date: '2026-03-12', verified: true },
  { id: 's2', productId: 'blue-marine-fusion', author: 'Raquel V.', location: 'San Juan, PR', rating: 5, title: 'My everyday statement piece', body: 'Wore it every day for three months and it still looks brand new. The silicone strap is surprisingly comfortable, no sweat marks. MULCO really nailed this one.', date: '2026-02-04', verified: true },
  { id: 's3', productId: 'blue-marine-fusion', author: 'Tania R.', location: 'Orlando, FL', rating: 4, title: 'Love the design, size runs a touch large', body: 'Beautiful watch. Just be aware the case is on the larger side for smaller wrists. I had to adjust my expectations but ended up loving the bold look.', date: '2025-12-20', verified: false },

  // Blue Marine Infinity
  { id: 's4', productId: 'blue-marine-infinity', author: 'Camila S.', location: 'Bogotá, CO', rating: 5, title: 'Worth every penny', body: 'The gradient dial is unlike anything I have seen at this price point. Looks straight out of a luxury boutique. Shipping was fast too.', date: '2026-04-01', verified: true },
  { id: 's5', productId: 'blue-marine-infinity', author: 'Mariana L.', location: 'Houston, TX', rating: 4, title: 'Great gift idea', body: 'Bought this for my sister\'s birthday. She was blown away. Packaging is beautiful, very giftable. The only minor thing is the clasp took a second to figure out.', date: '2026-01-15', verified: true },

  // Blue Marine Medusa
  { id: 's6', productId: 'blue-marine-medusa', author: 'Patricia O.', location: 'New York, NY', rating: 5, title: 'The boldest watch I own', body: 'I wanted something that made a statement and this delivers. The Medusa-inspired dial is conversation-starting. Gets noticed at every event I wear it to.', date: '2026-03-28', verified: true },

  // Buzo Dive Silicone
  { id: 's7', productId: 'buzo-dive-silicone', author: 'Marcos D.', location: 'Fort Lauderdale, FL', rating: 5, title: 'Best dive-style watch under $300', body: 'I take this snorkeling every weekend. Water-resistant beyond its spec, no fogging, no issues. The orange colorway is sharp and very visible underwater. Highly recommend.', date: '2026-04-10', verified: true },
  { id: 's8', productId: 'buzo-dive-silicone', author: 'Andrés B.', location: 'Tampa, FL', rating: 5, title: 'Durable and good-looking', body: 'Survived a beach trip, paddleboarding, and daily gym sessions. Strap doesn\'t retain smell. The bezel rotates smoothly. This is my go-to active watch now.', date: '2026-02-22', verified: true },
  { id: 's9', productId: 'buzo-dive-silicone', author: 'Luis F.', location: 'Dallas, TX', rating: 4, title: 'Solid sport watch', body: 'Great quality for the price. I was skeptical about the yellow accents but they grow on you. Lume is excellent — readable at night easily.', date: '2025-11-30', verified: false },

  // Buzo Atlantis
  { id: 's10', productId: 'buzo-atlantis', author: 'Fernando C.', location: 'Coral Gables, FL', rating: 5, title: 'The blue dial is perfect', body: 'I own four MULCO watches and the Atlantis has the best dial of them all. Deep ocean blue with just enough texture to catch the light. Paired with the stainless steel bracelet it looks incredible.', date: '2026-03-05', verified: true },
  { id: 's11', productId: 'buzo-atlantis', author: 'Santiago P.', location: 'Chicago, IL', rating: 4, title: 'Great everyday watch', body: 'Comfortable, well-built, looks expensive. The only reason I knocked a star is the clasp feels slightly cheap compared to the rest of the watch. But overall very happy.', date: '2026-01-09', verified: true },

  // Cobra
  { id: 's12', productId: 'cobra', author: 'Diego R.', location: 'Los Angeles, CA', rating: 5, title: 'A head-turner', body: 'The Cobra is aggressive in the best way. Yellow dial on the black case looks like nothing else on the market. I get asked about it everywhere I go. A real conversation piece.', date: '2026-04-18', verified: true },
  { id: 's13', productId: 'cobra', author: 'Javier A.', location: 'Atlanta, GA', rating: 5, title: 'My go-to bold piece', body: 'Had my eye on this for months and finally pulled the trigger. Zero regrets. The movement is accurate, and the build quality is on par with watches twice the price.', date: '2026-02-11', verified: true },

  // Kripton Viper
  { id: 's14', productId: 'kripton-viper', author: 'Roberto N.', location: 'New York, NY', rating: 5, title: 'Sharp, versatile, tough', body: 'MULCO\'s Kripton line keeps impressing me. The Viper wears as well at a business dinner as it does at a casual cookout. The green-yellow dial is bolder than the photos suggest — in a good way.', date: '2026-03-30', verified: true },
  { id: 's15', productId: 'kripton-viper', author: 'Carlos M.', location: 'Phoenix, AZ', rating: 4, title: 'Strong design, comfortable fit', body: 'Solid chronograph. The bezel markings are clean and the pushers have a satisfying click. Runs very accurately. Would love more strap options but overall excellent.', date: '2026-01-25', verified: true },

  // Enchanted Maple
  { id: 's16', productId: 'enchanted-maple', author: 'Isabel D.', location: 'San Diego, CA', rating: 5, title: 'Delicate and feminine', body: 'Exactly what I was looking for. The pink and rose gold tones are elegant without being over the top. Pairs perfectly with both casual and formal outfits. Already recommended it to three friends.', date: '2026-04-05', verified: true },
  { id: 's17', productId: 'enchanted-maple', author: 'Lucia V.', location: 'Austin, TX', rating: 5, title: 'A beautiful gift', body: 'Bought for my mother\'s birthday. She cried when she opened it. The packaging is luxurious and the watch itself is stunning. Definitely purchase again.', date: '2026-02-14', verified: true },

  // Frost Full Moon
  { id: 's18', productId: 'frost-full-moon', author: 'Andrea K.', location: 'Seattle, WA', rating: 5, title: 'Understated and beautiful', body: 'The white/silver dial is so clean. I wanted something minimal that could go with everything and this is it. The moon-phase detail is subtle but gorgeous.', date: '2026-03-17', verified: true },
  { id: 's19', productId: 'frost-full-moon', author: 'Valeria T.', location: 'Boston, MA', rating: 4, title: 'Clean everyday watch', body: 'Really like this one. Crystal clear display, smooth movement, feels lightweight on the wrist. Packaging was beautiful. Shipping was a bit slow but worth the wait.', date: '2026-01-03', verified: true },

  // Evol Reloaded
  { id: 's20', productId: 'evol-reloaded', author: 'Kevin B.', location: 'San Francisco, CA', rating: 5, title: 'The MULCO crown jewel', body: 'The Evol Reloaded is something else entirely. Wearing it feels like a statement about who you are. The skeletonized elements are crisp and the layered dial gives so much depth.', date: '2026-04-22', verified: true },
  { id: 's21', productId: 'evol-reloaded', author: 'Michael T.', location: 'Denver, CO', rating: 5, title: 'Worth the splurge', body: 'Saved up for this one and absolutely do not regret it. The finishing on the case is impeccable and the movement keeps perfect time. A watch you pass down.', date: '2026-02-28', verified: true },

  // Kripton Lady
  { id: 's22', productId: 'kripton-lady', author: 'Paola H.', location: 'Miami, FL', rating: 5, title: 'The perfect crossover watch', body: 'Works for the gym and dinner alike. I love that MULCO makes sport watches that are also genuinely pretty. The dial is vibrant without being garish.', date: '2026-03-20', verified: true },
  { id: 's23', productId: 'kripton-lady', author: 'Alejandra F.', location: 'Puerto Rico', rating: 4, title: 'Great sporty option for women', body: 'Very comfortable strap, easy to read dial, accurate movement. Would definitely buy another MULCO after this experience.', date: '2026-01-18', verified: true },

  // M10 Namaste
  { id: 's24', productId: 'm10-namaste', author: 'Elena B.', location: 'New York, NY', rating: 5, title: 'Unique and thoughtful', body: 'The M10 has an energy to it. The design is different from anything else in my collection. I appreciate that MULCO makes watches with meaning behind them.', date: '2026-04-08', verified: true },
  { id: 's25', productId: 'm10-namaste', author: 'Sophia C.', location: 'Miami, FL', rating: 5, title: 'Beautifully crafted', body: 'Light, elegant, and very accurate. The strap quality is excellent and the clasp is secure. One of my favorite purchases this year.', date: '2026-02-19', verified: true },

  // Dreamcatcher
  { id: 's26', productId: 'dreamcatcher', author: 'Natalia G.', location: 'Orlando, FL', rating: 5, title: 'A work of art on your wrist', body: 'The dreamcatcher motif on the dial is so intricate in person. Photos don\'t do it justice. I keep stopping to look at it throughout the day. Worth every dollar.', date: '2026-03-14', verified: true },
  { id: 's27', productId: 'dreamcatcher', author: 'Monica R.', location: 'Houston, TX', rating: 4, title: 'Artistic and wearable', body: 'Beautifully designed. The craftsmanship on the dial is exceptional for the price point. Fits comfortably and keeps accurate time. Would recommend for anyone who appreciates detail.', date: '2026-01-27', verified: false },
];

export function getSeedReviews(productId: string): Review[] {
  return SEED_REVIEWS.filter((r) => r.productId === productId);
}
