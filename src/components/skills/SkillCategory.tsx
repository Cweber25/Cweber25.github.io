'use client'

import { motion, AnimatePresence } from 'framer-motion'
import SkillItem from './SkillItem'

interface SkillCategoryProps {
  id: string
  title: string
  description: string
  skills: { name: string; level: number; inProgress?: boolean }[]
  index: number
  isExpanded: boolean
  onToggle: () => void
}

export default function SkillCategory({ 
  id,
  title, 
  description, 
  skills, 
  index,
  isExpanded,
  onToggle
}: SkillCategoryProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1,
        y: 0
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="w-full"
    >
      <motion.div
        onClick={onToggle}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        className={`
          cursor-pointer bg-[#1a1f2c]/80 backdrop-blur-sm rounded-lg p-6
          border border-[#3d4b61]/20 transition-colors duration-300
          hover:border-[#3d4b61]/40 hover:bg-[#1a1f2c]/90
          ${isExpanded ? 'shadow-xl border-[#3d4b61]/40' : 'shadow-lg'}
        `}
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-high-contrast">
              {title}
            </h2>
          </div>
          <motion.div
            animate={{ 
              rotate: isExpanded ? 180 : 0
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-high-contrast"
          >
            ▼
          </motion.div>
        </div>
        <p className="text-medium-contrast mt-2 text-sm">
          {description}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.2, delay: 0.15 }
              }
            }}
            exit={{ 
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 px-2">
              {skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: skillIndex * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <SkillItem
                    name={skill.name}
                    level={skill.level}
                    index={skillIndex}
                    inProgress={skill.inProgress}
                    isVisible={isExpanded}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 