export interface FeaturedProduct {
  id: number;
  subtitle: string;
  name: string;
  description: string;
  price: number;
  badge: string;
  image: string;
  gradient: string;
  delay?: string;
  // What the card searches for when the visitor clicks it.
  searchTerm: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
}
