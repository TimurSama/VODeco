// Google Analytics 4 Configuration
export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track user engagement
export const trackEngagement = (type: 'login' | 'signup' | 'dao_vote' | 'water_check' | 'project_create') => {
  trackEvent('engagement', 'user_action', type);
};

// Track water resource interactions
export const trackWaterResourceInteraction = (resourceId: string, action: 'view' | 'monitor' | 'report') => {
  trackEvent(action, 'water_resource', resourceId);
};

// Track DAO activities
export const trackDAOActivity = (proposalId: string, action: 'view' | 'vote' | 'create') => {
  trackEvent(action, 'dao_activity', proposalId);
};

// Performance monitoring
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
    });
  }
};

// Error tracking
export const trackError = (error: Error, context?: string) => {
  trackEvent('error', 'application_error', context || 'unknown', 1);
  console.error('Analytics Error:', error, context);
};

// User properties
export const setUserProperties = (properties: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      custom_map: properties,
    });
  }
};

// E-commerce tracking for token transactions
export const trackTokenTransaction = (
  transactionId: string,
  value: number,
  currency: string = 'USD',
  items: Array<{ id: string; name: string; quantity: number; price: number }>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  }
};

// Custom dimensions for VODeco specific metrics
export const setCustomDimensions = (dimensions: Record<string, string>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    Object.entries(dimensions).forEach(([key, value]) => {
      window.gtag('config', GA_TRACKING_ID, {
        [key]: value,
      });
    });
  }
};

// Export types for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
