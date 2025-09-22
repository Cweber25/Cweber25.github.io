'use client'

import { motion } from 'framer-motion'
import SecurityBackground from '../ui/SecurityBackground'
import SecurityExperienceItem from '../experience/SecurityExperienceItem'

interface InternshipSectionProps {
  isVisible: boolean;
}

const internships = [
  {
    title: "Information Security and Governance Intern", 
    company: "Mettler Toledo",
    period: "June 2022 – August 2022",
    location: "Columbus, OH",
    description: [
      "Reviewed malicious emails and blocked URLs",
      "Monitored SecurityScorecard remediation",
      "Created SOC statistics visualizations"
    ]
  },
  {
    title: "Information Security and Governance Intern",
    company: "Mettler Toledo",
    period: "June 2023 – August 2023",
    location: "Columbus, OH",
    description: [
      "Developed Security team MS Sharepoint pages",
      "Identified aging vulnerabilities through Tenable",
      "Monitored and resolved Security tickets"
    ]
  }
]

export default function InternshipSection({ isVisible }: InternshipSectionProps) {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center">
      {/* Security-themed background */}
      {isVisible && <SecurityBackground />}
      
      {/* Content container - responsive height */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -20
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center relative text-white"
        >
          <span className="relative z-10">Early Experience</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-16 sm:w-20 lg:w-24 bg-accent rounded-full"
          />
        </motion.h2>
        
        {/* Enhanced security-themed cards - responsive sizing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-h-[60vh] lg:max-h-[50vh]">
          {internships.map((internship, index) => (
            <SecurityExperienceItem
              key={index}
              title={internship.title}
              company={internship.company}
              period={internship.period}
              location={internship.location}
              description={internship.description}
              index={index}
            />
          ))}
        </div>

        {/* Security journey indicator - responsive spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20
          }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-4 sm:mt-6 lg:mt-8"
        >
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
            <span className="text-white/80 text-xs sm:text-sm">
              Foundation in <span className="text-accent font-semibold">Security & Governance</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
