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
      className="card p-6 rounded-lg"
    >
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{level}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className="skill-progress h-full rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
} 