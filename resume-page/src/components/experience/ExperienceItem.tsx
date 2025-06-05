'use client'

import { motion } from 'framer-motion'
import { BriefcaseIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  location: string
  description: string[]
  index: number
}

export default function ExperienceItem({
  title,
  company,
  period,
  location,
  description,
  index,
}: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="card p-8 rounded-xl mb-6"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h3 className="experience-title mb-1">
              {title}
            </h3>
            <p className="experience-company">{company}</p>
          </div>
          <div className="flex flex-col space-y-2 md:text-right mt-2 md:mt-0">
            <div className="flex items-center md:justify-end">
              <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
              <span className="experience-period">{period}</span>
            </div>
            <div className="flex items-center md:justify-end">
              <MapPinIcon className="h-4 w-4 mr-1 text-primary" />
              <span className="experience-location">{location}</span>
            </div>
          </div>
        </div>
        <ul className="space-y-3">
          {description.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
              className="flex items-start"
            >
              <BriefcaseIcon className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
              <span className="experience-description">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
} 