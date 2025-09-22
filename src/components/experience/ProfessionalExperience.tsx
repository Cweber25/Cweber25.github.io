'use client'

import { motion } from 'framer-motion'
import CircularRotationWheel from './CircularRotationWheel'

interface ProfessionalExperienceProps {
  isVisible: boolean
  currentSection: number
}

const rotationalProgram = {
  program: {
    title: "Infrastructure Software Engineering Program (ISEP)",
    company: "CVS Health",
    period: "June 2024 – Present",
    location: "Remote",
    description: "Rotational program specializing in DevSecOps, automation, and enterprise infrastructure solutions"
  },
  rotations: [
    {
      id: 1,
      title: "DevSecOps",
      team: "Colleague XP",
      period: "August 2024 – January 2025",
      status: "completed" as const,
      description: [
        "Led refactoring of legacy server patch management application",
        "Rebuilt core functionalities using React, SQL, and Python",
        "Streamlined server update workflows and improved usability",
        "Modernized unowned legacy app into scalable, user-friendly tool"
      ],
      technologies: ["React", "Python", "SQL", "MUI"]
    },
    {
      id: 2,
      title: "Platform Engineering",
      team: "PE Automation",
      period: "January 2025 – July 2025",
      status: "completed" as const,
      description: [
        "Developed automation solutions for Apic and DataPower systems",
        "Automated Must Gather, operator restarts, and inventory tracking",
        "Implemented cluster monitoring to reduce manual effort",
        "Delivered solutions saving ~300 hours annually"
      ],
      technologies: ["Python", "Automation Tools", "Apic", "DataPower"]
    },
    {
      id: 3,
      title: "Taxi",
      team: "TAXI",
      period: "July 2025 – January 2026",
      status: "current" as const,
      description: [
        "Developing API endpoints for infrastructure automation",
        "Using Spring Boot and TAXI framework for Cloud Platform provisioning",
        "Integrating Temporal for workflow orchestration",
        "Automating infrastructure processes across organization"
      ],
      technologies: ["Spring Boot", "Temporal", "Typescript", "Jenkins"]
    },
    {
      id: 4,
      title: "Coming Soon",
      team: "TBD",
      period: "January 2026 – June 2026",
      status: "upcoming" as const,
      description: [
        "Final rotation assignment pending",
        
      ],
      technologies: ["TBD"]
    }
  ]
}

export default function ProfessionalExperience({ isVisible, currentSection }: ProfessionalExperienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="section-title mb-12">Professional Experience</h2>
      
      <CircularRotationWheel
        program={rotationalProgram.program}
        rotations={rotationalProgram.rotations}
        isVisible={isVisible}
      />
    </motion.div>
  )
} 