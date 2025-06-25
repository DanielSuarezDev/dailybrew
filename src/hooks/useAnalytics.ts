import { useEffect } from 'react';
import { initGA, trackPageView, trackUserEngagement } from '../utils/analytics';

// Environment variable for GA Measurement ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const useAnalytics = () => {
  useEffect(() => {
    // Only initialize in production or if explicitly enabled
    const shouldInitialize = 
      GA_MEASUREMENT_ID && 
      (import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true');

    if (shouldInitialize) {
      initGA(GA_MEASUREMENT_ID);
      
      // Track initial session start
      trackUserEngagement('session_start', {
        referrer: document.referrer,
        user_agent: navigator.userAgent.substring(0, 100),
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      // Track session end on page unload
      const handleBeforeUnload = () => {
        trackUserEngagement('session_end', {
          session_duration: Date.now() - performance.timing.navigationStart,
        });
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  return {
    isEnabled: !!GA_MEASUREMENT_ID && 
      (import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true'),
  };
};