export const brand = {
  name: "Veyra",
  email: "support@veyra.com",
  phone: "+1 (212) 555-0134",
  address: ["Veyra HQ", "45 Greenview Avenue,", "New York, NY 10001, USA"],
};

export const nav = [
  { label: "Explore Hotels", href: "#discover" },
  { label: "Deals & Offers", href: "#trusted" },
  { label: "Destinations", href: "#destinations" },
];

export const hero = {
  titleLines: ["Find Your Perfect Stay", "at the Best Price"],
  searchPlaceholder: "Search hotel",
};

export const story = {
  label: "Our Story",
  statement:
    "From city escapes to beachside retreats, we connect you with hotels that fit your lifestyle wherever the journey takes you.",
};

export type Destination = {
  name: string;
  location: string;
  rating: string;
  image: string;
  alt: string;
};

export const destinations: Destination[] = [
  {
    name: "Vista Grand Suites",
    location: "Phuket, Thailand",
    rating: "5 out of 5",
    image: "/images/dest-vista-grand-suites.jpg",
    alt: "Thatched-roof resort pavilion on a lawn above a lake, with a volcano behind",
  },
  {
    name: "Mountain Peak Lodge",
    location: "Aspen, Colorado",
    rating: "4.9 out of 5",
    image: "/images/dest-mountain-peak-lodge.jpg",
    alt: "Small timber cabin on a glacial lake below dark snowy peaks",
  },
  {
    name: "Ocean View Resort",
    location: "Bali, Indonesia",
    rating: "4.8 out of 5",
    image: "/images/dest-ocean-view-resort.jpg",
    alt: "Palm trees on a green clifftop above a turquoise ocean",
  },
];

export type Stay = { name: string; price: number; location: string; image: string; alt: string };

export const stays: Stay[] = [
  {
    name: "City Center Apartments",
    price: 150,
    location: "New York, USA",
    image: "/images/stay-city-center.jpg",
    alt: "Concrete apartment tower with glowing windows in evening fog",
  },
  {
    name: "Tropical Paradise Resort",
    price: 110,
    location: "Maui, Hawaii",
    image: "/images/stay-tropical-paradise.jpg",
    alt: "Aerial view of a villa and pool surrounded by rainforest",
  },
  {
    name: "Pinecone Lodge",
    price: 85,
    location: "Lake Tahoe, California",
    image: "/images/stay-pinecone-lodge.jpg",
    alt: "Red wooden boathouse reflected in a misty lake",
  },
  {
    name: "Lakeside Retreat",
    price: 95,
    location: "Lake Bled, Slovenia",
    image: "/images/stay-lakeside-retreat.jpg",
    alt: "Wooden stilt houses on a foggy lake shore",
  },
  {
    name: "Desert Dune Camp",
    price: 120,
    location: "Wadi Rum, Jordan",
    image: "/images/stay-desert-dune-camp.jpg",
    alt: "Glowing dome tents among red desert cliffs at dusk",
  },
];

export const trusted = {
  label: "Explore Hotels",
  titleLines: ["Trusted Stays, Seamless", "Booking Explore Now!"],
  sub: "Discover top hotels near you with just a tap — effortless booking, ultimate comfort.",
  note: "Pause or cancel anytime",
};

export const community = {
  line: "Join our community of travelers and experience unforgettable stays.",
};

export type Testimonial = { name: string; title: string; body: string; rating: string; avatar: string };

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Ahmed",
    title: "Exactly What We Needed — Smooth & Stress-Free!",
    body: "The booking process was incredibly smooth, and the hotel was exactly as shown. Clean, comfortable, and located right where we needed. This platform made our vacation stress-free!",
    rating: "5 out of 5",
    avatar: "/images/avatar-sarah.jpg",
  },
  {
    name: "Daniel Okafor",
    title: "Found Our Dream Cabin in Ten Minutes",
    body: "We searched by lake and forest, compared three cabins side by side and booked in minutes. The photos matched reality and check-in was effortless.",
    rating: "5 out of 5",
    avatar: "/images/avatar-daniel.jpg",
  },
  {
    name: "Mei Lin",
    title: "The Best Rate We've Ever Booked",
    body: "Same resort, same dates, and noticeably cheaper than anywhere else we checked. Support answered within minutes when we changed our flight.",
    rating: "4.9 out of 5",
    avatar: "/images/avatar-mei.jpg",
  },
];

export const faqs = [
  {
    q: "How do I find the best deals on Veyra?",
    a: "We compare prices from hundreds of trusted travel sites in real time to help you find the best deal for your ideal stay, whether it's a luxury resort or a cozy cabin.",
  },
  {
    q: "Is it safe to book through Veyra?",
    a: "Yes. Payments are encrypted and processed by certified providers, and every property is verified before it is listed.",
  },
  {
    q: "Can I cancel or change my reservation?",
    a: "Most stays offer free cancellation up to 48 hours before check-in. Your booking page shows the exact policy and a one-click change option.",
  },
  {
    q: "Do I need an account to book?",
    a: "No. You can book as a guest with just your email. An account lets you save favorites and manage trips in one place.",
  },
  {
    q: "Are taxes and fees included in the prices shown?",
    a: 'The final price, including taxes and fees, is shown before you pay. Toggle "Show total price" to see it on every card.',
  },
  {
    q: "How do I contact customer support?",
    a: "Our team is available 24/7 by chat and at support@veyra.com, with an average reply time under five minutes.",
  },
];

export const footer = {
  titleLines: ["Discover Places You'll", "Never Want to Leave"],
  sub: "Your next great stay is waiting. Explore a wide range of handpicked hotels and cozy stays, all tailored to make your journey smooth and memorable. Booking has never been this easy.",
  socials: ["Facebook", "Instagram", "YouTube", "Twitter", "LinkedIn"],
  legal: ["Privacy Policy", "Terms of Use", "Legal Disclaimer", "Cookie Policy"],
};
