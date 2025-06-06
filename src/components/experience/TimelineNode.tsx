'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface TimelineNodeProps {
  position: 'top' | 'bottom'
  company: string
  role: string
  period: string
  location: string
  description: string[]
  isVisible: boolean
  delay: number
}

export default function TimelineNode({
  position,
  company,
  role,
  period,
  location,
  description,
  isVisible,
  delay
}: TimelineNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const variants = {
    hidden: {
      opacity: 0,
      y: position === 'top' ? -50 : 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        className={`absolute left-1/2 -translate-x-1/2 w-full p-4 sm:p-5 rounded-xl 
          bg-gradient-to-br from-primary/30 to-secondary/20 backdrop-blur-sm
          border border-white/10 hover:border-white/20 
          transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl
          hover:scale-105 group
          ${position === 'top' ? 'bottom-6' : 'top-6'}`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ y: position === 'top' ? -5 : 5 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Connection line to timeline dot */}
        <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-accent/60 
          ${position === 'top' ? 'top-full h-6' : 'bottom-full h-6'}`} />
        
        <div className="flex flex-col relative z-10">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-accent-300 group-hover:to-white transition-all duration-300 pr-2">
              {role}
            </h3>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm sm:text-base font-semibold text-white/90">{company}</p>
            <span className="text-xs text-white/60 bg-accent/20 px-2 py-1 rounded-full whitespace-nowrap ml-2 flex-shrink-0">
              {period}
            </span>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                  <div className="flex items-center text-sm text-white/70 mb-3 sm:mb-4">
                    <span className="bg-accent/30 px-3 py-1 rounded-full text-xs">{location}</span>
                  </div>
                  <ul className="space-y-2">
                    {description.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="text-white/70 text-xs sm:text-sm leading-relaxed flex items-start"
                      >
                        <span className="mr-2 text-accent/80 mt-1 flex-shrink-0">•</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Expand indicator */}
          <div className="flex justify-center mt-2 sm:mt-3">
            <motion.div
              className="text-white/40 text-xs"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 