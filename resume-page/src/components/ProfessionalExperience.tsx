'use client'

import { motion } from 'framer-motion'
import Timeline from './Timeline'

interface ProfessionalExperienceProps {
  isVisible: boolean
  currentSection: number
}

const experiences = [
  {
    title: "Full Stack Engineer",
    company: "CVS Health",
    period: "June 2024 – Present",
    location: "Remote",
    description: [
      "Part of the Infrastructure Software Engineering Program (ISEP)",
      "Focus on backend development and automation",
      "Build internal tools and scalable systems",
      "Streamline infrastructure workflows"
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
  },
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
  }
]

export default function ProfessionalExperience({ isVisible, currentSection }: ProfessionalExperienceProps) {
  return (
    <section id="experience" className="flex items-center justify-center px-8">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="py-12"
        >
          <h2 className="section-title mb-16">Professional Experience</h2>
          <Timeline
            isVisible={isVisible}
            experiences={experiences}
          />
        </motion.div>
      </div>
    </section>
  )
} 