'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function MorphingBlobs() {
  const [isClient, setIsClient] = useState(false)
  const [blobPaths, setBlobPaths] = useState<Array<{ initial: string; target: string }>>([])

  // Generate random points for blob path with seeded randomness
  const generateBlobPoints = (pointCount: number, radius: number, randomness: number, seed: number) => {
    const points = []
    const angleStep = (Math.PI * 2) / pointCount
    
    // Simple seeded random number generator to avoid hydration issues
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000
      return x - Math.floor(x)
    }
    
    for (let i = 0; i < pointCount; i++) {
      const angle = i * angleStep
      const randRadius = radius + (seededRandom(seed + i) - 0.5) * randomness
      points.push({
        x: Math.cos(angle) * randRadius,
        y: Math.sin(angle) * randRadius
      })
    }
    
    return points
  }

  // Convert points to SVG path with smoother curves
  const generateBlobPath = (points: { x: number; y: number }[]) => {
    if (!points.length) return 'M 0 0 Z'
    
    try {
      const firstPoint = points[0]
      let path = `M ${firstPoint.x.toFixed(2)} ${firstPoint.y.toFixed(2)}`
      
      for (let i = 0; i < points.length; i++) {
        const currentPoint = points[i]
        const nextPoint = points[(i + 1) % points.length]
        const midPoint = {
          x: ((currentPoint.x + nextPoint.x) / 2).toFixed(2),
          y: ((currentPoint.y + nextPoint.y) / 2).toFixed(2)
        }
        path += ` Q ${currentPoint.x.toFixed(2)} ${currentPoint.y.toFixed(2)} ${midPoint.x} ${midPoint.y}`
      }
      
      return path + ' Z'
    } catch (error) {
      console.warn('Error generating blob path:', error)
      return 'M 0 0 Z'
    }
  }

  // Initialize blob paths only on client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true)
    
    const blobs = []
    // Reduced to 2 blobs for better performance
    for (let i = 0; i < 2; i++) {
      const seed1 = i * 100
      const seed2 = i * 100 + 50
      const initialPoints = generateBlobPoints(8, 200, 100, seed1)
      const targetPoints = generateBlobPoints(8, 200, 100, seed2)
      blobs.push({
        initial: generateBlobPath(initialPoints),
        target: generateBlobPath(targetPoints)
      })
    }
    setBlobPaths(blobs)
  }, [])

  // Don't render the animated content until client-side to avoid hydration mismatch
  if (!isClient || blobPaths.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Dark background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80" />
      
      <svg
        viewBox="-300 -300 600 600"
        className="absolute w-full h-full opacity-30"
        preserveAspectRatio="xMidYMid slice"
        style={{ 
          filter: 'blur(30px)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        <defs>
          <radialGradient id="blob-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
          </radialGradient>
        </defs>
        {/* Background blobs */}
        <g>
          {blobPaths.map((blob, index) => (
            <motion.path
              key={`blob-${index}`}
              d={blob.initial}
              animate={{
                d: [blob.initial, blob.target, blob.initial],
                scale: [1, 1.05, 1],
                rotate: [0, index * 10, 0],
              }}
              transition={{
                duration: 30 + index * 5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 2
              }}
              fill={index === 0 ? "url(#blob-gradient)" : `rgba(255, 255, 255, ${0.1 - index * 0.02})`}
              style={{ 
                transformOrigin: 'center',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
} 