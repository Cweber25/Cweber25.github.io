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
    <div className="relative w-full max-w-[350px] mx-auto">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        className={`absolute left-1/2 -translate-x-1/2 w-full p-6 rounded-xl card backdrop-blur-sm 
          bg-[#1a1f2c]/40 border border-white/5 hover:bg-[#1a1f2c]/60 hover:border-white/10 
          transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl
          ${position === 'top' ? 'bottom-[32px]' : 'top-[32px]'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              {role}
            </h3>
          </div>
          <div className="flex justify-between items-start">
            <p className="text-lg font-semibold text-white/80">{company}</p>
            <span className="text-sm text-white/50 whitespace-nowrap ml-2">
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
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center text-sm text-white/70 mb-4">
                    <span className="bg-[#3d4b61]/30 px-3 py-1 rounded-full">{location}</span>
                  </div>
                  <ul className="space-y-2">
                    {description.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="text-white/60 text-sm leading-relaxed flex items-start"
                      >
                        <span className="mr-2 text-white/40">•</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
} 