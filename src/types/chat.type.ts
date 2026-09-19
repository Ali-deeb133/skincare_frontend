

export interface Recommendation {
  product_name: string;
  product_type: string;
  brand: string;
  price: number;
  url: string;
  
}

export interface Suitability {
  skin_type: string;
  suitability: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;

  product_name?: string;
  product_type?: string;
  skin_type_user?: string;
  status?: string;

  suitability?: Suitability[];
  recommendations?: Recommendation[];
}