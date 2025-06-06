'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

interface SkillItemProps {
  name: string
  level: number
  index: number
  inProgress?: boolean
}

export default function SkillItem({ name, level, index, inProgress = false }: SkillItemProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0)
  const [isClient, setIsClient] = useState(false)
  
  // Generate unique IDs for SVG filters
  const filterId = useMemo(() => `glow-${name.replace(/\s+/g, '-').toLowerCase()}-${index}`, [name, index])
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Start animations when component mounts
  useEffect(() => {
    if (!isClient) return

    // Animate the level number counting up
    const duration = 1500 // 1.5 seconds
    const steps = 60 // Update 60 times during the animation
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
  }, [level, isClient])

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

  // Generate particles
  const particles = useMemo(() => {
    const particleCount = Math.floor(level / 10) // 1 particle per 10% skill level
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / particleCount,
      speed: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 2
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
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`
        bg-[#1a1f2c]/80 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl 
        transition-all duration-300 border border-[#3d4b61]/20
        ${inProgress ? 'border-[#3d4b61]/40' : ''}
      `}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
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
                initial={{ 
                  cx: center,
                  cy: center,
                  opacity: 0 
                }}
                animate={{
                  cx: [
                    center,
                    center + Math.cos(particle.angle) * radius * 1.2,
                    center + Math.cos(particle.angle + Math.PI * 2) * radius * 1.2,
                    center
                  ],
                  cy: [
                    center,
                    center + Math.sin(particle.angle) * radius * 1.2,
                    center + Math.sin(particle.angle + Math.PI * 2) * radius * 1.2,
                    center
                  ],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3 + particle.speed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: particle.delay
                }}
                r={2}
                fill={inProgress ? "#4a5d78" : "#3d4b61"}
                className={`opacity-60 ${inProgress ? 'animate-pulse' : ''}`}
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
          <motion.svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0"
            initial={false}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <polygon
              points={progressPoints}
              fill="none"
              stroke={inProgress ? "#4a5d78" : "#3d4b61"}
              strokeWidth="2"
              filter={`url(#${filterId})`}
              className={inProgress ? 'animate-pulse' : ''}
            />
          </motion.svg>

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
          <h3 className="text-high-contrast font-medium">{name}</h3>
          <motion.div 
            className="h-0.5 bg-[#3d4b61]/20 mt-1"
            style={{
              scaleX: animatedLevel / 100,
              transformOrigin: "left"
            }}
          />
        </div>
      </div>
    </motion.div>
  )
} 