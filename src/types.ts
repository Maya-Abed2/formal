export type PageType = 'catalog' | 'about' | 'contact';

export interface Suit {
  id: string;
  name: string;
  subtitle: string;
  category: 'formal' | 'wedding' | 'three-piece' | 'casual' | 'tuxedo' | 'summer';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  secondaryImage?: string;
  color: string;
  colorHex: string;
  colorName: string;
  fit: 'slim' | 'classic' | 'modern';
  fitLabel: string;
  pieces: 2 | 3;
  piecesLabel: string;
  fabric: string;
  origin: string;
  sizes: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  careInstructions: string;
  inStock: boolean;
}

export interface CartItem {
  suit: Suit;
  selectedSize: string;
  quantity: number;
}

export interface FilterOptions {
  category: string;
  fit: string;
  color: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery: string;
}

export interface AppointmentBooking {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface BoutiqueBranch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  workingHours: string;
  mapQuery: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
