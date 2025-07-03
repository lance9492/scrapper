import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, SEO_DATA, SEOData } from '../utils/seo';
import { trackPageView } from '../utils/analytics';

export const useSEO = (customSEO?: Partial<SEOData>) => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    let seoData: SEOData;

    // Determine SEO data based on current route
    if (pathname === '/') {
      seoData = SEO_DATA.home;
    } else if (pathname.startsWith('/marketplace')) {
      if (pathname === '/marketplace/prices') {
        seoData = SEO_DATA.prices;
      } else if (pathname === '/marketplace/recyclers') {
        seoData = SEO_DATA.recyclers;
      } else {
        seoData = SEO_DATA.marketplace;
      }
    } else if (pathname.startsWith('/salvage')) {
      seoData = SEO_DATA.salvage;
    } else {
      // Default SEO data
      seoData = {
        title: 'Scrapper - Recycling & Salvage Marketplace',
        description: 'South Africa\'s premier platform for recycling and salvage materials.',
        keywords: ['recycling', 'salvage', 'marketplace', 'south africa']
      };
    }

    // Merge with custom SEO data if provided
    if (customSEO) {
      seoData = { ...seoData, ...customSEO };
    }

    // Add current URL
    seoData.url = window.location.href;

    // Update SEO
    updateSEO(seoData);

    // Track page view
    trackPageView(seoData.title);
  }, [location.pathname, customSEO]);
};