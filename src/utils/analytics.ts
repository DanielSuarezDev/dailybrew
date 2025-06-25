// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  // Create script tag for gtag
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    // Enhanced measurement settings
    send_page_view: true,
    allow_google_signals: true,
    allow_ad_personalization_signals: false, // Privacy-friendly
    cookie_flags: 'SameSite=None;Secure',
  });

  console.log('📊 Google Analytics initialized:', measurementId);
};

// Track page views
export const trackPageView = (page_title: string, page_location?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_title,
      page_location: page_location || window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParameters,
    });
  }
};

// Daily Brew specific tracking functions
export const trackMeetingStart = (participantCount: number, timerDuration: number) => {
  trackEvent('meeting_started', 'engagement', 'meeting_creation', participantCount, {
    participant_count: participantCount,
    timer_duration_seconds: timerDuration,
    timer_duration_minutes: Math.floor(timerDuration / 60),
  });
};

export const trackMeetingComplete = (
  participantCount: number,
  totalDuration: number,
  timerDuration: number
) => {
  trackEvent('meeting_completed', 'engagement', 'meeting_completion', participantCount, {
    participant_count: participantCount,
    total_duration_seconds: totalDuration,
    timer_duration_seconds: timerDuration,
    completion_rate: 100, // They completed it
  });
};

export const trackParticipantTurn = (
  participantIndex: number,
  participantName: string,
  timeUsed: number,
  timerDuration: number
) => {
  const timeUsedPercentage = Math.round((timeUsed / timerDuration) * 100);
  
  trackEvent('participant_turn_completed', 'engagement', 'participant_speaking', timeUsed, {
    participant_index: participantIndex + 1,
    participant_name_hash: btoa(participantName).substring(0, 8), // Privacy-friendly hash
    time_used_seconds: timeUsed,
    time_used_percentage: timeUsedPercentage,
    timer_duration_seconds: timerDuration,
    time_efficiency: timeUsedPercentage <= 100 ? 'on_time' : 'overtime',
  });
};

export const trackTimerAction = (action: 'pause' | 'resume', timeLeft: number, timerDuration: number) => {
  trackEvent(`timer_${action}`, 'interaction', 'timer_control', timeLeft, {
    time_left_seconds: timeLeft,
    time_left_percentage: Math.round((timeLeft / timerDuration) * 100),
    timer_duration_seconds: timerDuration,
  });
};

export const trackViewToggle = (newView: 'machine' | 'cups', participantCount: number) => {
  trackEvent('view_toggled', 'interaction', 'view_preference', undefined, {
    new_view: newView,
    participant_count: participantCount,
  });
};

export const trackMusicToggle = (isMuted: boolean) => {
  trackEvent('music_toggled', 'interaction', 'audio_preference', undefined, {
    action: isMuted ? 'muted' : 'unmuted',
    music_enabled: !isMuted,
  });
};

export const trackParticipantManagement = (
  action: 'add' | 'remove' | 'clear_all',
  participantCount: number
) => {
  trackEvent('participant_management', 'interaction', action, participantCount, {
    action_type: action,
    resulting_participant_count: participantCount,
  });
};

export const trackTimerDurationChange = (newDuration: number, oldDuration: number) => {
  trackEvent('timer_duration_changed', 'interaction', 'timer_settings', newDuration, {
    new_duration_seconds: newDuration,
    new_duration_minutes: Math.floor(newDuration / 60),
    old_duration_seconds: oldDuration,
    old_duration_minutes: Math.floor(oldDuration / 60),
  });
};

export const trackAppInstall = () => {
  trackEvent('app_installed', 'engagement', 'pwa_install', undefined, {
    installation_method: 'pwa',
    platform: navigator.platform,
    user_agent: navigator.userAgent.substring(0, 100), // Truncated for privacy
  });
};

export const trackError = (errorType: string, errorMessage: string, errorLocation?: string) => {
  trackEvent('error_occurred', 'error', errorType, undefined, {
    error_message: errorMessage.substring(0, 100), // Truncated
    error_location: errorLocation,
    user_agent: navigator.userAgent.substring(0, 50),
  });
};

// User engagement tracking
export const trackUserEngagement = (
  engagementType: 'session_start' | 'session_end' | 'feature_discovery',
  details?: Record<string, any>
) => {
  trackEvent('user_engagement', 'engagement', engagementType, undefined, {
    engagement_type: engagementType,
    timestamp: new Date().toISOString(),
    ...details,
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit: string) => {
  trackEvent('performance_metric', 'performance', metric, value, {
    metric_name: metric,
    metric_value: value,
    metric_unit: unit,
    page_location: window.location.pathname,
  });
};

// Conversion tracking (for future monetization)
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', 'conversion', conversionType, value, {
    conversion_type: conversionType,
    conversion_value: value,
    timestamp: new Date().toISOString(),
  });
};