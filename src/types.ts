export interface ServerPlan {
  id: string;
  name: string;
  tier: 'Dirt' | 'Iron' | 'Diamond' | 'Netherite' | 'Custom';
  ramGb: number;
  vCpus: string;
  storage: string;
  recommendedPlayers: string;
  priceMonthly: number;
  popular?: boolean;
  tagline: string;
  specs: string[];
}

export interface ServerSoftware {
  id: string;
  name: string;
  category: 'Vanilla / Optimized' | 'Modded' | 'Proxy' | 'Bedrock';
  icon: string;
  description: string;
  badge: string;
  recommendedFor: string;
}

export interface ServerNode {
  id: string;
  city: string;
  country: string;
  region: string;
  basePing: number;
  uptime: string;
  hardware: string;
  coordinates: { x: number; y: number };
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Mobile App' | 'Performance' | 'Billing' | 'Support';
}
