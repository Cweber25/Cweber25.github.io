'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import SkillCategories from '../skills/SkillCategories'
import CircuitBackground from '../ui/CircuitBackground'
import { SkillsSectionContext } from '../skills/SkillsContext'

interface TechnicalSkillsSectionProps {
  isVisible: boolean;
}

export default function TechnicalSkillsSection({ isVisible }: TechnicalSkillsSectionProps) {
  const [isClient, setIsClient] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isVisible, hasAnimated])

  // Don't render animations until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="relative w-full max-w-7xl mx-auto">
        <CircuitBackground />
        <div className="relative z-10 h-full py-8">
          <h2 className="text-3xl font-bold text-high-contrast mb-8 text-center">
            Technical Skills
          </h2>
          <div className="overflow-y-auto">
            <SkillCategories />
          </div>
        </div>
      </div>
    )
  }

  const shouldAnimate = isClient && isVisible

  return (
    <div ref={sectionRef} className="relative w-full max-w-7xl mx-auto">
      <CircuitBackground />
      <SkillsSectionContext.Provider value={{ isVisible: shouldAnimate }}>
        <motion.div
          className="relative z-10 h-full py-8"
          initial={false}
          animate={{ 
            opacity: shouldAnimate ? 1 : 0,
            y: shouldAnimate ? 0 : 20,
            transition: { duration: 0.4 }
          }}
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
          <motion.h2
            initial={false}
            animate={{ 
              opacity: shouldAnimate ? 1 : 0,
              y: shouldAnimate ? 0 : 20 
            }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-high-contrast mb-8 text-center"
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            className="overflow-y-auto"
            initial={false}
            animate={{ 
              opacity: shouldAnimate ? 1 : 0,
              y: shouldAnimate ? 0 : 20 
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SkillCategories />
          </motion.div>
        </motion.div>
      </SkillsSectionContext.Provider>
    </div>
  )
} 