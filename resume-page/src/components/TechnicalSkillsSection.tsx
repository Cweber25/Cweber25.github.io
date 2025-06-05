'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, createContext, useContext, useState } from 'react'
import SkillCategories from './SkillCategories'
import AnimatedSection from './AnimatedSection'
import CircuitBackground from './CircuitBackground'

interface TechnicalSkillsSectionProps {
  isVisible: boolean;
}

// Create a context to share the visibility state
export const SkillsSectionContext = createContext<{
  isVisible: boolean;
}>({ isVisible: true })

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
      <div className="relative min-h-screen w-full">
        <CircuitBackground />
        <div className="relative z-10 h-full py-8">
          <h2 className="text-3xl font-bold text-high-contrast mb-8 text-center">
            Technical Skills
          </h2>
          <div className="overflow-y-auto px-4">
            <SkillCategories />
          </div>
        </div>
      </div>
    )
  }

  const shouldAnimate = isClient && isVisible

  return (
    <div ref={sectionRef} className="relative min-h-screen w-full">
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
            className="overflow-y-auto px-4"
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