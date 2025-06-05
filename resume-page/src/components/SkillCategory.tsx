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
  inProgress?: boolean
}

export default function SkillCategory({ 
  id,
  title, 
  description, 
  skills, 
  index,
  isExpanded,
  onToggle,
  inProgress = false
}: SkillCategoryProps) {
  return (
    <motion.div
      id={id}
      initial={false}
      animate={{ 
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: index * 0.1 }
      }}
      className="w-full"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <motion.div
        onClick={onToggle}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        animate={{
          y: [0, -5, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * 0.5
          }
        }}
        className={`
          cursor-pointer bg-[#1a1f2c]/80 backdrop-blur-sm rounded-lg p-6
          border border-[#3d4b61]/20 transition-colors duration-300
          hover:border-[#3d4b61]/40 hover:bg-[#1a1f2c]/90
          ${isExpanded ? 'shadow-xl border-[#3d4b61]/40' : 'shadow-lg'}
          ${inProgress ? 'border-[#3d4b61]/40' : ''}
        `}
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.h2 
              className="text-xl font-semibold text-high-contrast"
              animate={{
                background: inProgress ? [
                  "linear-gradient(90deg, #3d4b61 0%, #4a5d78 50%, #3d4b61 100%)",
                  "linear-gradient(90deg, #3d4b61 100%, #4a5d78 150%, #3d4b61 200%)"
                ] : undefined,
                backgroundClip: inProgress ? "text" : undefined,
                WebkitBackgroundClip: inProgress ? "text" : undefined,
                backgroundSize: inProgress ? "200% 100%" : undefined,
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={inProgress ? { WebkitTextFillColor: "transparent" } : undefined}
            >
              {title}
            </motion.h2>
            {inProgress && (
              <motion.span 
                className="px-2 py-0.5 text-xs font-medium bg-[#3d4b61]/30 rounded-full text-high-contrast"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                In Progress
              </motion.span>
            )}
          </div>
          <motion.div
            animate={{ 
              rotate: isExpanded ? 180 : 0,
              scale: [1, 1.1, 1],
              transition: {
                rotate: { duration: 0.3 },
                scale: { 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }
            }}
            className="text-high-contrast"
          >
            ▼
          </motion.div>
        </div>
        <motion.p 
          className="text-medium-contrast mt-2 text-sm"
          animate={{
            opacity: [0.8, 1, 0.8],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: index * 0.3
            }
          }}
        >
          {description}
        </motion.p>
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
            <motion.div
              initial={false}
              animate={{ 
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  delay: 0.15
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 px-2"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            >
              {skills.map((skill, skillIndex) => (
                <SkillItem
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={skillIndex}
                  inProgress={skill.inProgress}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 