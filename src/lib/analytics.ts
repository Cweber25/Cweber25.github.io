// Google Analytics tracking functions

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('📊 Tracking event:', { action, category, label, value });
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.warn('❌ gtag not available:', { window: typeof window, gtag: typeof window?.gtag });
  }
};

// Specific tracking functions for your portfolio
export const trackSkillClick = (skillName: string) => {
  trackEvent('click', 'Skills', skillName);
};

export const trackSkillCategoryExpand = (categoryName: string) => {
  trackEvent('expand', 'Skills', categoryName);
};

export const trackProjectClick = (projectName: string, linkType: 'view' | 'github') => {
  trackEvent('click', 'Projects', `${projectName} - ${linkType}`);
};

export const trackSectionNavigation = (sectionName: string) => {
  trackEvent('navigate', 'Sections', sectionName);
};

export const trackRotationClick = (rotationName: string) => {
  trackEvent('click', 'Experience', rotationName);
};
