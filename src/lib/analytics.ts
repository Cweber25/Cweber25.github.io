// Google Analytics tracking functions

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
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
