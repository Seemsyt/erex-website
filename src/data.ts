import { ServerPlan, ServerSoftware, ServerNode, FaqItem } from './types';

export const ANDROID_APK_URL = "https://github.com/Seemsyt/EREX-Releases/releases/download/v1.0.0/app-release.apk";
export const ANDROID_REPO_URL = "https://github.com/Seemsyt/EREX-Releases";
export const APK_VERSION = "v1.0.0";
export const APK_FILE_SIZE = "24.8 MB";
export const MIN_ANDROID_VERSION = "Android 8.0+";
export const SUPPORT_EMAIL = "support@erex.nx.kg";
export const PRIMARY_DOMAIN = "erex.nx.kg";
export const WEBSITE_URL = "https://erex.nx.kg";

export const SERVER_PLANS: ServerPlan[] = [
  {
    id: 'starter-2gb',
    name: 'Starter Node',
    tier: 'Dirt',
    ramGb: 2,
    vCpus: '1 vCPU (AWS / Hetzner Cloud)',
    storage: '30 GB NVMe SSD',
    recommendedPlayers: '1 - 8 Players',
    priceMonthly: 5.00,
    tagline: 'Perfect for vanilla survival, duos, and small SMPs with friends',
    specs: [
      '2 GB High-Speed RAM',
      'AWS EC2 & Hetzner Cloud Compute',
      '30 GB Enterprise NVMe Storage',
      'Auto-Sleep & Wake-on-Connect',
      'Full EREX Android App Management',
      'Unmetered 3.2 Tbps DDoS Defense',
      'Free Dedicated Subdomain',
      'Automated Daily Backups'
    ]
  },
  {
    id: 'standard-4gb',
    name: 'Community Node',
    tier: 'Iron',
    ramGb: 4,
    vCpus: '2 vCPUs (Hetzner / Contabo / AWS)',
    storage: '70 GB NVMe SSD',
    recommendedPlayers: '8 - 25 Players',
    priceMonthly: 10.00,
    popular: true,
    tagline: 'Best for active SMPs running Paper, Purpur & essential plugins',
    specs: [
      '4 GB High-Speed RAM',
      'Hetzner Dedicated & Contabo Cloud Nodes',
      '70 GB High-Speed NVMe Storage',
      'Auto-Sleep & Wake-on-Connect',
      '1-Click Plugin & Modpack Installer',
      'Free MySQL Database Included',
      'GeyserMC Bedrock Crossplay',
      'Full EREX Android App Management',
      'Automated Daily Backups'
    ]
  },
  {
    id: 'pro-8gb',
    name: 'Extreme Node',
    tier: 'Diamond',
    ramGb: 8,
    vCpus: '4 vCPUs (AWS EC2 / Hetzner Compute)',
    storage: '150 GB NVMe SSD',
    recommendedPlayers: '25 - 60+ Players',
    priceMonthly: 20.00,
    tagline: 'Engineered for heavy modpacks (ATM9, Create) & mini-game networks',
    specs: [
      '8 GB High-Speed RAM',
      'High-Performance AWS EC2 & Hetzner Compute',
      '150 GB Enterprise NVMe Storage',
      'Aikar’s Tuned Garbage Collection',
      'Modded Forge, Fabric & NeoForge',
      'Auto-Sleep & Wake-on-Connect',
      'Unlimited Player Slots',
      'Priority 24/7 Node Placement',
      'Full EREX Android App Management'
    ]
  }
];

export const SOFTWARE_LIST: ServerSoftware[] = [
  {
    id: 'paper',
    name: 'PaperMC',
    category: 'Vanilla / Optimized',
    icon: '📜',
    badge: 'Fastest Vanilla',
    description: 'High-performance Minecraft server aiming to fix gameplay and mechanics inconsistencies while improving TPS significantly.',
    recommendedFor: 'SMP, Spigot plugins, Survival, Towny'
  },
  {
    id: 'purpur',
    name: 'Purpur',
    category: 'Vanilla / Optimized',
    icon: '🔮',
    badge: 'Feature Rich',
    description: 'Drop-in replacement for Paper with tons of gameplay customizations, ridable mobs, and deep performance tweaks.',
    recommendedFor: 'Custom SMPs, Minigames, Fun survival'
  },
  {
    id: 'fabric',
    name: 'Fabric',
    category: 'Modded',
    icon: '🧵',
    badge: 'Modern Modding',
    description: 'Lightweight, modular modding toolchain with groundbreaking optimization mods like Sodium, Lithium, and FerriteCore.',
    recommendedFor: 'Technical servers, modern modpacks'
  },
  {
    id: 'forge',
    name: 'Forge / NeoForge',
    category: 'Modded',
    icon: '🔨',
    badge: 'Heavy Modpacks',
    description: 'The definitive modding platform for massive modpacks including All The Mods, Pixelmon, Create, and Twilight Forest.',
    recommendedFor: 'All The Mods, RLcraft, Tech packs'
  },
  {
    id: 'geyser',
    name: 'Bedrock & GeyserMC',
    category: 'Bedrock',
    icon: '📱',
    badge: 'Crossplay',
    description: 'Bridge Java Edition and Bedrock Edition so players on Windows, iOS, Android, Xbox, PlayStation, and Switch can play together.',
    recommendedFor: 'Crossplay communities & mobile players'
  },
  {
    id: 'velocity',
    name: 'Velocity Proxy',
    category: 'Proxy',
    icon: '⚡',
    badge: 'Network Proxy',
    description: 'Next-gen, ultra-high performance proxy designed to link multiple servers together into a seamless network with zero lag.',
    recommendedFor: 'Hub servers, Hub & Spoke networks'
  }
];

export const SERVER_NODES: ServerNode[] = [
  {
    id: 'fra',
    city: 'Frankfurt',
    country: 'Germany',
    region: 'Europe Central',
    basePing: 18,
    uptime: '99.99%',
    hardware: 'Hetzner Dedicated / NVMe',
    coordinates: { x: 51, y: 32 }
  },
  {
    id: 'lon',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe West',
    basePing: 22,
    uptime: '99.98%',
    hardware: 'AWS EC2 (eu-west-2)',
    coordinates: { x: 47, y: 30 }
  },
  {
    id: 'ash',
    city: 'Virginia',
    country: 'United States',
    region: 'North America East',
    basePing: 15,
    uptime: '100%',
    hardware: 'AWS EC2 / Hetzner US / NVMe',
    coordinates: { x: 26, y: 36 }
  },
  {
    id: 'dal',
    city: 'Dallas',
    country: 'United States',
    region: 'North America Central',
    basePing: 24,
    uptime: '99.99%',
    hardware: 'Contabo Cloud / High-RAM NVMe',
    coordinates: { x: 21, y: 40 }
  },
  {
    id: 'sin',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia Pacific',
    basePing: 28,
    uptime: '99.99%',
    hardware: 'AWS EC2 (ap-southeast-1)',
    coordinates: { x: 78, y: 55 }
  },
  {
    id: 'syd',
    city: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    basePing: 31,
    uptime: '99.97%',
    hardware: 'AWS EC2 (ap-southeast-2)',
    coordinates: { x: 88, y: 76 }
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Mobile App',
    question: 'How do I download and install the EREX Android app?',
    answer: 'You can directly download the official APK (v1.0.0) from the download link at the top or in the mobile showcase section (or scan the on-screen QR code). Once downloaded to your Android device, tap the file to install. Ensure "Install from unknown sources" is enabled in your Android settings. The app requires Android 8.0 or newer.'
  },
  {
    category: 'Mobile App',
    question: 'What features does the EREX Android App include?',
    answer: 'The EREX app gives you real-time server control right in your pocket: live terminal console with command execution, instant Start/Stop/Restart toggles, live CPU/RAM/TPS graphs, player list management (kick/ban/op), file manager, crash alerts, and one-click backup triggers.'
  },
  {
    category: 'General',
    question: 'How fast is server provisioning after placing an order?',
    answer: 'All servers are provisioned automatically within 45 to 60 seconds. As soon as your order completes, your server boots up with your chosen Minecraft jar, generates your custom domain, and sends the connection credentials to your dashboard and mobile app.'
  },
  {
    category: 'Performance',
    question: 'What hardware and cloud infrastructure powers EREX?',
    answer: 'EREX specifically deploys on premium enterprise cloud and dedicated infrastructure: AWS EC2 (for ultra-reliable global routing and edge capacity), Hetzner (for high-frequency dedicated bare-metal and cloud nodes), and Contabo (for cost-efficient high-RAM performance). All servers utilize enterprise NVMe SSD arrays to eliminate chunk loading stutter and ensure constant 20.0 TPS.'
  },
  {
    category: 'Performance',
    question: 'What kind of DDoS protection do you provide?',
    answer: 'Every server is guarded by an automated 3.2 Tbps Layer 4 and Layer 7 filtration network powered by Path.net and Cosmic Guard. It specifically filters out Minecraft protocol spoofing, SYN floods, UDP reflection, and socket exhaust attacks with 0ms added delay.'
  },
  {
    category: 'General',
    question: 'Can Bedrock (Mobile, Xbox, PlayStation, Switch) players join my server?',
    answer: 'Yes! All EREX plans support 1-click GeyserMC and Floodgate setup, allowing players on phones, tablets, and gaming consoles to join standard Java Edition servers seamlessly without any client-side mods.'
  },
  {
    category: 'General',
    question: 'Can I connect my own custom domain to my server or community website?',
    answer: 'Yes! You can easily link custom domains and subdomains (such as play.yourdomain.com or mc.yourdomain.com) to your EREX server via standard DNS A and SRV records. Our platform also assigns free instant subdomains on erex.nx.kg for all provisioned nodes.'
  },
  {
    category: 'Support',
    question: 'How do I contact EREX customer and technical support?',
    answer: 'You can reach our dedicated 24/7 support desk directly by emailing support@erex.nx.kg. We provide assistance for server troubleshooting, modpack installations, billing questions, and network optimization.'
  }
];
