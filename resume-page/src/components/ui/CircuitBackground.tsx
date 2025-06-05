'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

interface CircuitPath {
  id: number
  path: string
  delay: number
  duration: number
}

export default function CircuitBackground() {
  const [isClient, setIsClient] = useState(false)

  const paths = useMemo(() => {
    const newPaths: CircuitPath[] = []
    const pathCount = 12

    // Helper function to create a 90-degree turn
    const createCorner = (x: number, y: number, direction: 'right' | 'down' | 'up'): string => {
      const radius = 5
      if (direction === 'right') {
        return `L ${x - radius} ${y} Q ${x} ${y} ${x} ${y + radius}`
      } else if (direction === 'down') {
        return `L ${x} ${y - radius} Q ${x} ${y} ${x + radius} ${y}`
      } else {
        return `L ${x} ${y + radius} Q ${x} ${y} ${x + radius} ${y}`
      }
    }

    for (let i = 0; i < pathCount; i++) {
      // Start from edges for better coverage
      const isVertical = i % 2 === 0
      let startX, startY
      
      if (isVertical) {
        startX = (i / 2) * 20 // Reduced spacing between paths
        startY = 0
      } else {
        startX = 0
        startY = ((i - 1) / 2) * 20 // Reduced spacing between paths
      }

      let pathString = `M ${startX} ${startY}`
      let currentX = startX
      let currentY = startY

      // Create branching paths
      const steps = 6 // Increased steps for longer paths
      for (let j = 0; j < steps; j++) {
        const stepSize = 20 + Math.random() * 25 // Adjusted step size

        if (isVertical) {
          // Vertical starting paths
          if (j === 0) {
            // First move down
            currentY += stepSize
            pathString += ` V ${currentY}`
            // Then turn right
            currentX += stepSize
            pathString += createCorner(currentX - stepSize, currentY, 'right')
            pathString += ` H ${currentX}`
          } else if (j === steps - 1) {
            // Last step: branch out
            currentY += stepSize * (Math.random() > 0.5 ? 1 : -1)
            currentX += stepSize
            pathString += ` L ${currentX} ${currentY}`
          } else {
            // Middle steps: alternate between vertical and horizontal
            if (j % 2 === 0) {
              currentY += stepSize
              pathString += ` V ${currentY}`
            } else {
              currentX += stepSize
              pathString += createCorner(currentX - stepSize, currentY, 'right')
              pathString += ` H ${currentX}`
            }
          }
        } else {
          // Horizontal starting paths
          if (j === 0) {
            // First move right
            currentX += stepSize
            pathString += ` H ${currentX}`
            // Then turn down or up
            const goDown = Math.random() > 0.5
            currentY += stepSize * (goDown ? 1 : -1)
            pathString += createCorner(currentX, currentY - stepSize * (goDown ? -1 : 1), goDown ? 'down' : 'up')
            pathString += ` V ${currentY}`
          } else if (j === steps - 1) {
            // Last step: branch out
            currentX += stepSize
            currentY += stepSize * (Math.random() > 0.5 ? 1 : -1)
            pathString += ` L ${currentX} ${currentY}`
          } else {
            // Middle steps: alternate between horizontal and vertical
            if (j % 2 === 0) {
              currentX += stepSize
              pathString += ` H ${currentX}`
            } else {
              const goDown = Math.random() > 0.5
              currentY += stepSize * (goDown ? 1 : -1)
              pathString += createCorner(currentX, currentY - stepSize * (goDown ? -1 : 1), goDown ? 'down' : 'up')
              pathString += ` V ${currentY}`
            }
          }
        }
      }

      newPaths.push({
        id: i,
        path: pathString,
        delay: i * 0.2,
        duration: 3 + (i % 2)
      })
    }
    return newPaths
  }, [])

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything during SSR
  if (!isClient) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 scale-[3]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 150 150"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 opacity-50"
          style={{ 
            transform: 'rotate(-10deg) scale(1.5)',
            transformOrigin: 'center'
          }}
        >
          <defs>
            <linearGradient id={`circuit-gradient-${paths[0]?.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d4b61" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3d4b61" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3d4b61" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Circuit node points */}
          {paths.map((circuitPath) => {
            const [startX, startY] = circuitPath.path
              .split(' ')[1]
              .split(',')
              .map(Number)
            
            return (
              <circle
                key={`node-${circuitPath.id}`}
                cx={startX + '%'}
                cy={startY + '%'}
                r="0.75"
                fill="#3d4b61"
                className="opacity-30"
              />
            )
          })}

          {/* Animated circuit paths */}
          {paths.map((circuitPath) => (
            <g key={circuitPath.id}>
              {/* Background path */}
              <path
                d={circuitPath.path}
                stroke="#0A1612"
                strokeWidth="0.4"
                fill="none"
                className="opacity-20"
              />
              
              {/* Animated glowing path */}
              <motion.path
                d={circuitPath.path}
                stroke={`url(#circuit-gradient-${circuitPath.id})`}
                strokeWidth="0.6"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0.2, 0.4]
                }}
                transition={{
                  duration: circuitPath.duration,
                  delay: circuitPath.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
} 