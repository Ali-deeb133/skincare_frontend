export interface Product {
  id: number;
  subtitle: string;
  name: string;
  description: string;
  price: number;
  badge: string;
  image: string;
  gradient: string;
  delay?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
}