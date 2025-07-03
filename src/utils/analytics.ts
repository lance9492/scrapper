// Analytics utility for tracking user interactions
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
}

class Analytics {
  private isEnabled: boolean = false;

  constructor() {
    // Enable analytics in production
    this.isEnabled = import.meta.env.PROD;
  }

  track(event: string, properties?: Record<string, any>, userId?: string) {
    if (!this.isEnabled) {
      console.log('Analytics (dev):', { event, properties, userId });
      return;
    }

    // In production, integrate with your analytics provider
    // Example: Google Analytics, Mixpanel, Amplitude, etc.
    try {
      // gtag('event', event, properties);
      console.log('Analytics:', { event, properties, userId });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log('Analytics identify (dev):', { userId, traits });
      return;
    }

    try {
      // analytics.identify(userId, traits);
      console.log('Analytics identify:', { userId, traits });
    } catch (error) {
      console.error('Analytics identify error:', error);
    }
  }

  page(name: string, properties?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log('Analytics page (dev):', { name, properties });
      return;
    }

    try {
      // gtag('config', 'GA_MEASUREMENT_ID', { page_title: name, ...properties });
      console.log('Analytics page:', { name, properties });
    } catch (error) {
      console.error('Analytics page error:', error);
    }
  }
}

export const analytics = new Analytics();

// Common event tracking functions
export const trackListingCreated = (type: 'recycle' | 'salvage', category: string) => {
  analytics.track('listing_created', { type, category });
};

export const trackBidPlaced = (listingType: 'recycle' | 'salvage', amount: number) => {
  analytics.track('bid_placed', { listing_type: listingType, amount });
};

export const trackContainerRequested = (containerType: string, quantity: number) => {
  analytics.track('container_requested', { container_type: containerType, quantity });
};

export const trackUserRegistered = (isBusinessAccount: boolean) => {
  analytics.track('user_registered', { is_business: isBusinessAccount });
};

export const trackSearchPerformed = (query: string, filters: Record<string, any>) => {
  analytics.track('search_performed', { query, ...filters });
};

export const trackPageView = (pageName: string) => {
  analytics.page(pageName);
};