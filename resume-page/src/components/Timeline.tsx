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
    <div className="relative w-full mx-auto pt-24 pb-16">
      <TimelineBackground />
      
      {/* Timeline container */}
      <div className="relative min-h-[500px] flex items-center">
        {/* Timeline line with gradient edges and year markers */}
        <div className="absolute inset-x-0 flex items-center">
          <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#3d4b61]" />
          <div className="h-[2px] bg-[#3d4b61] flex-grow relative">
            {/* Year markers directly on the line */}
            <div className="absolute inset-x-0 flex justify-between -top-5">
              {years.map((year, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-white/70 text-xs font-medium"
                >
                  {year}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="w-8 h-[2px] bg-gradient-to-r from-[#3d4b61] to-transparent" />
        </div>
        
        {/* Timeline nodes */}
        <div className="relative flex justify-between w-full px-8 mx-auto max-w-[1400px]">
          {sortedExperiences.map((experience, index) => {
            const isEven = index % 2 === 0
            const isFirst = index === 0
            const isLast = index === sortedExperiences.length - 1
            
            return (
              <div 
                key={index} 
                className={`flex-1 ${!isFirst && 'ml-4'} ${!isLast && 'mr-4'}`}
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

        {/* Timeline dots */}
        <div className="absolute inset-x-0 flex justify-between items-center px-8 mx-auto max-w-[1400px]">
          {sortedExperiences.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              <div className="w-3 h-3 rounded-full bg-[#3d4b61] border-2 border-white/20" />
              <div className="absolute -inset-1 bg-[#3d4b61] rounded-full opacity-20 animate-pulse" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Click to learn more text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12 text-white/50 text-sm"
      >
        Click to learn more
      </motion.div>
    </div>
  )
} 