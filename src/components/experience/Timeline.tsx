'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import TimelineNode from './TimelineNode'
import TimelineBackground from './TimelineBackground'

interface TimelineProps {
  experiences: Array<{
    company: string
    title: string
    period: string
    location: string
    description: string[]
  }>
  isVisible: boolean
}

export default function Timeline({ experiences, isVisible }: TimelineProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Sort experiences chronologically (oldest to newest)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const getYear = (period: string) => parseInt(period.split(' ')[1])
    const yearA = getYear(a.period.split('–')[0].trim())
    const yearB = getYear(b.period.split('–')[0].trim())
    return yearA - yearB
  })

  // Get years array
  const years = sortedExperiences.map(exp => {
    const [startPeriod] = exp.period.split('–')
    return parseInt(startPeriod.split(' ')[1])
  })

  return (
    <div className="relative w-full py-16">
      <TimelineBackground />
      
      {/* Timeline container */}
      <div className="relative min-h-[600px]">
        {/* Timeline line - full width edge to edge */}
        <div className="absolute top-1/2 left-0 right-0 flex items-center">
          <div className="h-[3px] bg-accent w-full relative">
            {/* Year markers above the line */}
            <div className="absolute inset-x-0 flex -top-8 pl-12 pr-32 sm:pl-16 sm:pr-36 lg:pl-20 lg:pr-40">
              {years.map((year, index) => (
                <div 
                  key={index}
                  className="relative flex justify-center items-center"
                  style={{ flexBasis: `${100 / years.length}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-white/80 text-xs sm:text-sm font-medium bg-accent/20 px-2 sm:px-3 py-1 rounded-full"
                  >
                    {year}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Timeline dots positioned along the line */}
        <div className="absolute top-1/2 left-12 right-32 sm:left-16 sm:right-36 lg:left-20 lg:right-40 flex justify-between items-center">
          {sortedExperiences.map((_, index) => (
            <div 
              key={index}
              className="relative flex justify-center items-center"
              style={{ flexBasis: `${100 / sortedExperiences.length}%` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative -translate-y-1/2"
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent border-2 sm:border-4 border-white/20 shadow-lg" />
                <div className="absolute -inset-1 sm:-inset-2 bg-accent/30 rounded-full animate-pulse" />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Timeline nodes positioned relative to dots */}
        <div className="absolute top-1/2 left-12 right-32 sm:left-16 sm:right-36 lg:left-20 lg:right-40 flex justify-between">
          {sortedExperiences.map((experience, index) => {
            const isEven = index % 2 === 0
            
            return (
              <div 
                key={index} 
                className="relative flex justify-center items-center"
                style={{ flexBasis: `${100 / sortedExperiences.length}%` }}
              >
                <TimelineNode
                  position={isEven ? 'bottom' : 'top'}
                  company={experience.company}
                  role={experience.title}
                  period={experience.period}
                  location={experience.location}
                  description={experience.description}
                  isVisible={isVisible}
                  delay={index * 0.2}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Click to learn more text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8 text-white/50 text-sm"
      >
        Click on any experience to learn more
      </motion.div>
    </div>
  )
} 