'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  id?: string
  className?: string
  delay?: number
  children: ReactNode
}

const AnimatedSection = ({ id, className = '', delay = 0, children }: AnimatedSectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default AnimatedSection 