'use client'

import { motion } from 'framer-motion'

interface SkillItemProps {
  name: string
  level: number
  index: number
}

export default function SkillItem({ name, level, index }: SkillItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <h3 className="text-high-contrast font-medium mb-2">{name}</h3>
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
        />
      </div>
    </motion.div>
  )
} 