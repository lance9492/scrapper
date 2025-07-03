export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

export const updateSEO = (data: SEOData) => {
  // Update document title
  document.title = data.title;

  // Update meta description
  updateMetaTag('description', data.description);

  // Update Open Graph tags
  updateMetaTag('og:title', data.title, 'property');
  updateMetaTag('og:description', data.description, 'property');
  updateMetaTag('og:type', data.type || 'website', 'property');

  if (data.image) {
    updateMetaTag('og:image', data.image, 'property');
  }

  if (data.url) {
    updateMetaTag('og:url', data.url, 'property');
  }

  // Update Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', data.title, 'name');
  updateMetaTag('twitter:description', data.description, 'name');

  if (data.image) {
    updateMetaTag('twitter:image', data.image, 'name');
  }

  // Update keywords
  if (data.keywords && data.keywords.length > 0) {
    updateMetaTag('keywords', data.keywords.join(', '));
  }
};

const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
};

// Predefined SEO data for common pages
export const SEO_DATA = {
  home: {
    title: 'Scrapper - South Africa\'s Premier Recycling Marketplace',
    description: 'Trade recyclable materials and salvage items on South Africa\'s leading platform. Connect with verified buyers and sellers across all provinces.',
    keywords: ['recycling', 'scrap metal', 'salvage', 'marketplace', 'south africa', 'waste management']
  },
  marketplace: {
    title: 'RecycleMart - Buy & Sell Recyclable Materials | Scrapper',
    description: 'Browse thousands of recyclable materials listings. Find the best prices for metals, paper, plastic, and more from verified sellers.',
    keywords: ['recyclable materials', 'scrap metal prices', 'paper recycling', 'plastic recycling']
  },
  salvage: {
    title: 'SalvageHub - Quality Used Parts & Equipment | Scrapper',
    description: 'Discover quality used vehicles, machinery, and parts. Professional assessment and verification on all salvage items.',
    keywords: ['salvage', 'used parts', 'machinery', 'vehicles', 'equipment']
  },
  recyclers: {
    title: 'Find Recycling Facilities Near You | Scrapper',
    description: 'Locate verified recycling facilities across South Africa. Compare services, materials accepted, and contact information.',
    keywords: ['recycling facilities', 'recyclers', 'waste management', 'south africa']
  },
  prices: {
    title: 'Live Scrap Metal Prices | Scrapper',
    description: 'Get real-time scrap metal prices and market trends. Updated pricing for ferrous metals, non-ferrous metals, and more.',
    keywords: ['scrap metal prices', 'metal prices', 'recycling prices', 'market trends']
  }
} as const;