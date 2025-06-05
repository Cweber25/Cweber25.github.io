import { createContext } from 'react';

export const SkillsSectionContext = createContext<{
  isVisible: boolean;
}>({ isVisible: true }); 