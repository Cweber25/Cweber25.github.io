'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

interface SkillItemProps {
  name: string
  level: number
  index: number
  inProgress?: boolean
  isVisible?: boolean
}

export default function SkillItem({ name, level, index, inProgress = false, isVisible = true }: SkillItemProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0)
  const [isClient, setIsClient] = useState(false)
  
  // Generate unique IDs for SVG filters
  const filterId = useMemo(() => `glow-${name.replace(/\s+/g, '-').toLowerCase()}-${index}`, [name, index])
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Start animations when component becomes visible
  useEffect(() => {
    if (!isClient || !isVisible) return

    // Animate the level number counting up (faster and smoother)
    const duration = 800 // Reduced from 1.5s to 0.8s
    const steps = 30 // Reduced from 60 to 30 steps
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
      setAnimatedLevel(Math.min(Math.round(level * easedProgress), level))

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [level, isClient, isVisible])

  // Calculate points for hexagon
  const size = 60
  const center = size / 2
  const radius = size * 0.4
  const points = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    return `${x},${y}`
  }).join(' ')

  // Calculate progress path for partial fill
  const progressPoints = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2
    const progressRadius = radius * (animatedLevel / 100)
    const x = center + progressRadius * Math.cos(angle)
    const y = center + progressRadius * Math.sin(angle)
    return `${x},${y}`
  }).join(' ')

  // Generate particles (reduced complexity)
  const particles = useMemo(() => {
    const particleCount = Math.min(Math.floor(level / 20), 4) // Max 4 particles, 1 per 20% skill level
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / particleCount,
      speed: 1, // Fixed speed instead of random
      delay: i * 0.5 // Staggered delay instead of random
    }))
  }, [level])

  if (!isClient) {
    return (
      <div className={`
        bg-[#1a1f2c]/80 backdrop-blur-sm rounded-lg p-4 shadow-lg
        border border-[#3d4b61]/20
        ${inProgress ? 'border-[#3d4b61]/40' : ''}
      `}>
        <div className="flex items-center gap-4">
          <div className="relative w-[60px] h-[60px]">
            <div className="absolute inset-0 rounded-full bg-[#3d4b61]/20" />
          </div>
          <div className="flex-1">
            <h3 className="text-high-contrast font-medium">{name}</h3>
            <div className="h-0.5 bg-[#3d4b61]/20 mt-1" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`
        bg-[#1a1f2c]/80 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl 
        transition-all duration-300 border border-[#3d4b61]/20
        ${inProgress ? 'border-[#3d4b61]/40' : ''}
      `}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-[60px] h-[60px] group">
          {/* Glow Effect */}
          <div className={`
            absolute inset-0 rounded-full bg-[#3d4b61]/20 blur-xl scale-75 
            group-hover:scale-100 transition-transform duration-300
            ${inProgress ? 'animate-pulse' : ''}
          `} />
          
          {/* Particles */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0"
          >
            {particles.map((particle) => (
              <motion.circle
                key={particle.id}
                cx={center + Math.cos(particle.angle) * radius * 0.8}
                cy={center + Math.sin(particle.angle) * radius * 0.8}
                r={1.5}
                fill={inProgress ? "#4a5d78" : "#3d4b61"}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 0.6 : 0 }}
                transition={{
                  duration: 0.5,
                  delay: particle.delay
                }}
                className={inProgress ? 'animate-pulse' : ''}
              />
            ))}
          </svg>

          {/* Base Hexagon */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0"
          >
            <defs>
              <filter id={filterId}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <polygon
              points={points}
              fill="none"
              stroke="#3d4b61"
              strokeWidth="1"
              className="opacity-50"
            />
            <polygon
              points={progressPoints}
              fill={inProgress ? "#4a5d78" : "#3d4b61"}
              className={`opacity-20 ${inProgress ? 'animate-pulse' : ''}`}
            />
          </svg>
          
          {/* Progress Hexagon */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0"
          >
            <polygon
              points={progressPoints}
              fill="none"
              stroke={inProgress ? "#4a5d78" : "#3d4b61"}
              strokeWidth="2"
              filter={`url(#${filterId})`}
              className={inProgress ? 'animate-pulse' : ''}
            />
          </svg>

          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-xs font-medium text-high-contrast"
            >
              {animatedLevel}%
            </motion.span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-high-contrast font-medium">{name}</h3>
            {inProgress && (
              <motion.span 
                className="px-2 py-0.5 text-xs font-medium bg-[#4a5d78]/30 rounded-full text-high-contrast border border-[#4a5d78]/40"
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
                Learning
              </motion.span>
            )}
          </div>
          <motion.div 
            className={`h-0.5 mt-1 ${inProgress ? 'bg-[#4a5d78]/40' : 'bg-[#3d4b61]/20'}`}
            style={{
              scaleX: animatedLevel / 100,
              transformOrigin: "left"
            }}
          />
        </div>
      </div>
    </div>
  )
} 