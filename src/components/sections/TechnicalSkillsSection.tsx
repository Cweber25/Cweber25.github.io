'use client'

import { motion } from 'framer-motion'
import SkillCategories from '../skills/SkillCategories'
import CircuitBackground from '../ui/CircuitBackground'
import { SkillsSectionContext } from '../skills/SkillsContext'

interface TechnicalSkillsSectionProps {
  isVisible: boolean;
}

export default function TechnicalSkillsSection({ isVisible }: TechnicalSkillsSectionProps) {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <CircuitBackground />
      <SkillsSectionContext.Provider value={{ isVisible }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 30
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: isVisible ? 0.1 : 0
          }}
          className="relative z-10 h-full py-8"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isVisible ? 0.2 : 0
            }}
            className="section-title mb-8 text-center"
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isVisible ? 0.3 : 0
            }}
            className="overflow-y-auto"
          >
            <SkillCategories />
          </motion.div>
        </motion.div>
      </SkillsSectionContext.Provider>
    </div>
  )
} 