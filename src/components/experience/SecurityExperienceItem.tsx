'use client'

import { motion } from 'framer-motion'
import { ShieldCheckIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'

interface SecurityExperienceItemProps {
  title: string
  company: string
  period: string
  location: string
  description: string[]
  index: number
}

export default function SecurityExperienceItem({
  title,
  company,
  period,
  location,
  description,
  index,
}: SecurityExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="relative group h-full"
    >
      {/* Enhanced card with security-themed styling - responsive padding */}
      <div className="card p-4 sm:p-6 lg:p-8 rounded-xl relative overflow-hidden border border-accent/20 bg-gradient-to-br from-card/95 to-accent/5 backdrop-blur-sm h-full flex flex-col">
        {/* Security-themed corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-full" />
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        
        <div className="relative z-10 flex flex-col space-y-3 sm:space-y-4 flex-1">
          <div className="flex flex-col space-y-2">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-accent mr-2 sm:mr-3 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-accent transition-colors duration-300 leading-tight">
                  {title}
                </h3>
              </div>
              <p className="text-accent font-semibold text-base sm:text-lg">{company}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm space-y-1 sm:space-y-0">
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-accent flex-shrink-0" />
                <span className="text-white/90">{period}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-accent flex-shrink-0" />
                <span className="text-white/90">{location}</span>
              </div>
            </div>
          </div>
          
          {/* Security-focused achievement list - more compact */}
          <ul className="space-y-2 flex-1">
            {description.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                className="flex items-start group/item"
              >
                <div className="flex-shrink-0 mt-1.5 mr-3">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-accent rounded-full group-hover/item:scale-125 transition-transform duration-200" />
                </div>
                <span className="text-sm sm:text-base text-white/90 group-hover/item:text-white transition-colors duration-200 leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
          
          {/* Security badge - more compact */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
            className="flex justify-center pt-2"
          >
            <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-accent/20 border border-accent/30 rounded-full">
              <ShieldCheckIcon className="h-3 w-3 sm:h-4 sm:w-4 text-accent mr-1 sm:mr-2" />
              <span className="text-accent text-xs sm:text-sm font-medium">Security Focus</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
