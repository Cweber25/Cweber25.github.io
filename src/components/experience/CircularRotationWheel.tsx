'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { CheckCircleIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline'

interface Rotation {
  id: number
  title: string
  team: string
  period: string
  status: 'completed' | 'current' | 'upcoming'
  description: string[]
  technologies: string[]
}

interface Program {
  title: string
  company: string
  period: string
  location: string
  description: string
}

interface CircularRotationWheelProps {
  program: Program
  rotations: Rotation[]
  isVisible: boolean
}

export default function CircularRotationWheel({ program, rotations, isVisible }: CircularRotationWheelProps) {
  const [selectedRotation, setSelectedRotation] = useState<number | null>(null)

  // Calculate positions for rotations around the circle
  const radius = 120
  const rotationPositions = rotations.map((_, index) => {
    const angle = (index * 90) - 90 // Start at top, 90 degrees apart
    const radian = (angle * Math.PI) / 180
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
      angle: angle
    }
  })

  const handleRotationClick = (rotationIndex: number) => {
    setSelectedRotation(selectedRotation === rotationIndex ? null : rotationIndex)
  }

  // Function to wrap text intelligently
  const wrapText = (text: string) => {
    const words = text.split(' ')
    if (words.length === 1) {
      return [text]
    } else if (words.length === 2) {
      return words
    } else {
      // For 3+ words, try to balance the lines
      const midPoint = Math.ceil(words.length / 2)
      return [
        words.slice(0, midPoint).join(' '),
        words.slice(midPoint).join(' ')
      ]
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-accent" />
      case 'current':
        return <PlayIcon className="h-4 w-4 text-accent" />
      case 'upcoming':
        return <ClockIcon className="h-4 w-4 text-white/60" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-accent/30 to-primary/20 border-accent/40'
      case 'current':
        return 'from-accent/40 to-secondary/30 border-accent/50'
      case 'upcoming':
        return 'from-primary/30 to-secondary/20 border-primary/40'
      default:
        return 'from-primary/30 to-secondary/20 border-primary/40'
    }
  }

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { fill: 'rgba(61, 75, 97, 0.6)', stroke: 'rgba(61, 75, 97, 1)' }
      case 'current':
        return { fill: 'rgba(61, 75, 97, 0.8)', stroke: 'rgba(61, 75, 97, 1)' }
      case 'upcoming':
        return { fill: 'rgba(42, 52, 65, 0.4)', stroke: 'rgba(42, 52, 65, 0.8)' }
      default:
        return { fill: 'rgba(42, 52, 65, 0.4)', stroke: 'rgba(42, 52, 65, 0.8)' }
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Subtle Professional Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Very Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(61, 75, 97, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(61, 75, 97, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Minimal Floating Dots */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-accent/10 rounded-full"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}

        {/* Subtle Corner Accents */}
        <motion.div
          className="absolute left-[5%] top-[10%] w-8 h-8 border border-accent/3 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute right-[5%] bottom-[10%] w-6 h-6 border border-primary/3 rotate-45"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Soft Radial Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(61, 75, 97, 0.02) 90%, transparent 100%)'
          }}
        />

        {/* Very Subtle Breathing Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(61, 75, 97, 0.01) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Program Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 max-w-3xl"
      >
        <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>
        <div className="flex flex-wrap justify-center items-center gap-2 text-white/70 text-sm">
          <span className="font-semibold">{program.company}</span>
          <span>•</span>
          <span>{program.period}</span>
          <span>•</span>
          <span>{program.location}</span>
        </div>
        <p className="text-white/60 mt-2 text-sm">{program.description}</p>
      </motion.div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl">
        {/* Rotation Wheel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-96 h-96 flex-shrink-0"
        >
          {/* Subtle Animated Rings - Much Lighter */}
          <motion.div 
            className="absolute inset-8 rounded-full border border-accent/5"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-12 rounded-full border border-primary/3"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <svg viewBox="-180 -180 360 360" className="w-full h-full">
            <style>{`
              .rotation-node { cursor: pointer; }
              .rotation-node:hover circle { stroke-width: 4; }
            `}</style>
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(61, 75, 97, 0.4)" />
                <stop offset="100%" stopColor="rgba(26, 31, 44, 0.6)" />
              </radialGradient>
            </defs>

            {/* Background circle */}
            <circle
              cx="0"
              cy="0"
              r="130"
              fill="none"
              stroke="rgba(61, 75, 97, 0.2)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />

            {/* Connection lines */}
            {rotationPositions.map((pos, index) => (
              <motion.line
                key={`line-${index}`}
                x1="0"
                y1="0"
                x2={pos.x}
                y2={pos.y}
                stroke={selectedRotation === index ? "rgba(61, 75, 97, 0.8)" : "rgba(61, 75, 97, 0.3)"}
                strokeWidth={selectedRotation === index ? "3" : "2"}
                animate={{
                  opacity: selectedRotation === index ? [0.8, 1, 0.8] : 0.3,
                  strokeWidth: selectedRotation === index ? [3, 4, 3] : 2
                }}
                transition={{
                  duration: 2,
                  repeat: selectedRotation === index ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Rotation nodes */}
            {rotations.map((rotation, index) => {
              const pos = rotationPositions[index]
              const isSelected = selectedRotation === index
              const colors = getNodeColor(rotation.status)
              
              return (
                <g 
                  key={`rotation-${rotation.id}`}
                  className="rotation-node"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Clicked rotation:', index, rotation.title)
                    handleRotationClick(index)
                  }}
                >
                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 22 : 18}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={isSelected ? "3" : "2"}
                    className="transition-all duration-200"
                    style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(61, 75, 97, 0.6))' : 'none' }}
                  />
                  
                  {/* Node number */}
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {rotation.id}
                  </text>

                  {/* Node label - intelligently wrapped text */}
                  {(() => {
                    const wrappedLines = wrapText(rotation.title)
                    if (wrappedLines.length === 1) {
                      return (
                        <text
                          x={pos.x}
                          y={pos.y - 35}
                          textAnchor="middle"
                          className="pointer-events-none select-none"
                          fill="rgba(255, 255, 255, 0.8)"
                          fontSize="12"
                          fontWeight="500"
                        >
                          {wrappedLines[0]}
                        </text>
                      )
                    } else {
                      return (
                        <>
                          <text
                            x={pos.x}
                            y={pos.y - 42}
                            textAnchor="middle"
                            className="pointer-events-none select-none"
                            fill="rgba(255, 255, 255, 0.8)"
                            fontSize="11"
                            fontWeight="500"
                          >
                            {wrappedLines[0]}
                          </text>
                          <text
                            x={pos.x}
                            y={pos.y - 28}
                            textAnchor="middle"
                            className="pointer-events-none select-none"
                            fill="rgba(255, 255, 255, 0.8)"
                            fontSize="11"
                            fontWeight="500"
                          >
                            {wrappedLines[1]}
                          </text>
                        </>
                      )
                    }
                  })()}
                </g>
              )
            })}

            {/* Center hub */}
            <circle
              cx="0"
              cy="0"
              r="25"
              fill="url(#centerGradient)"
              stroke="rgba(61, 75, 97, 0.8)"
              strokeWidth="3"
            />
            <text
              x="0"
              y="-3"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              ISEP
            </text>
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.6)"
              fontSize="12"
              fontWeight="500"
            >
              Program
            </text>
          </svg>

          {/* HTML Button Overlays for better click handling */}
          {rotations.map((rotation, index) => {
            const pos = rotationPositions[index]
            const isSelected = selectedRotation === index
            
            // Convert SVG coordinates to percentage for absolute positioning
            const xPercent = ((pos.x + 180) / 360) * 100
            const yPercent = ((pos.y + 180) / 360) * 100
            
            return (
              <button
                key={`button-${rotation.id}`}
                onClick={() => {
                  console.log('Button clicked:', index, rotation.title)
                  handleRotationClick(index)
                }}
                className={`absolute w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                  isSelected ? 'ring-2 ring-accent/60' : ''
                }`}
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'transparent',
                  zIndex: 10
                }}
                aria-label={`Select ${rotation.title} rotation`}
              />
            )
          })}

          {/* Instructions */}
          <p className="text-center text-white/50 text-sm mt-4">
            Click on any rotation to learn more
          </p>
          
          {/* Debug info */}
          <div className="text-center text-white/30 text-xs mt-2">
            Selected: {selectedRotation !== null ? `Rotation ${selectedRotation + 1}` : 'None'}
          </div>
          
          {/* Test buttons for debugging */}
          <div className="flex justify-center gap-2 mt-2">
            {rotations.map((rotation, index) => (
              <button
                key={`test-${rotation.id}`}
                onClick={() => handleRotationClick(index)}
                className="px-2 py-1 bg-accent/20 text-white/60 rounded text-xs hover:bg-accent/30"
              >
                {rotation.id}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Details Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1 max-w-lg"
        >
          <AnimatePresence mode="wait">
            {selectedRotation !== null ? (
              <motion.div
                key={selectedRotation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-xl bg-gradient-to-br backdrop-blur-sm border ${getStatusColor(rotations[selectedRotation].status)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-white">
                    {rotations[selectedRotation].title}
                  </h4>
                  {getStatusIcon(rotations[selectedRotation].status)}
                </div>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Team:</span>
                    <span className="text-white font-medium">{rotations[selectedRotation].team}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Period:</span>
                    <span className="text-white font-medium">{rotations[selectedRotation].period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Status:</span>
                    <span className="text-white font-medium capitalize">
                      {rotations[selectedRotation].status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-white font-semibold mb-2 text-sm">Key Responsibilities:</h5>
                  <ul className="space-y-1">
                    {rotations[selectedRotation].description.map((item, index) => (
                      <li key={index} className="text-white/70 text-sm flex items-start">
                        <span className="text-accent mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-white font-semibold mb-2 text-sm">Technologies:</h5>
                  <div className="flex flex-wrap gap-2">
                    {rotations[selectedRotation].technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent/30 text-white/90 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 rounded-xl bg-primary/30 backdrop-blur-sm border border-primary/40 text-center"
              >
                <h4 className="text-lg font-semibold text-white/60 mb-2">
                  Select a Rotation
                </h4>
                <p className="text-white/50 text-sm">
                  Click on any rotation in the wheel to see detailed information.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}