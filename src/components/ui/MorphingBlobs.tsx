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
    
    try {
      for (let i = 0; i < pointCount; i++) {
        const angle = i * angleStep
        const randRadius = radius + (seededRandom(seed + i) - 0.5) * randomness
        points.push({
          x: Math.cos(angle) * randRadius,
          y: Math.sin(angle) * randRadius
        })
      }
    } catch (error) {
      // Fallback to a simple circle if point generation fails
      for (let i = 0; i < pointCount; i++) {
        const angle = i * angleStep
        points.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        })
      }
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
        
        // Ensure points are valid numbers
        if (isNaN(currentPoint.x) || isNaN(currentPoint.y) || isNaN(nextPoint.x) || isNaN(nextPoint.y)) {
          throw new Error('Invalid point coordinates')
        }
        
        const midPoint = {
          x: ((currentPoint.x + nextPoint.x) / 2).toFixed(2),
          y: ((currentPoint.y + nextPoint.y) / 2).toFixed(2)
        }
        path += ` Q ${currentPoint.x.toFixed(2)} ${currentPoint.y.toFixed(2)} ${midPoint.x} ${midPoint.y}`
      }
      
      return path + ' Z'
    } catch (error) {
      // Return a simple circle path as fallback
      const radius = 200
      return `M ${radius} 0 A ${radius} ${radius} 0 1 1 ${-radius} 0 A ${radius} ${radius} 0 1 1 ${radius} 0 Z`
    }
  }

  // Initialize blob paths only on client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true)
    
    try {
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
    } catch (error) {
      // Fallback to simple circles if blob generation fails
      setBlobPaths([
        {
          initial: 'M 200 0 A 200 200 0 1 1 -200 0 A 200 200 0 1 1 200 0 Z',
          target: 'M 210 0 A 210 210 0 1 1 -210 0 A 210 210 0 1 1 210 0 Z'
        },
        {
          initial: 'M 180 0 A 180 180 0 1 1 -180 0 A 180 180 0 1 1 180 0 Z',
          target: 'M 190 0 A 190 190 0 1 1 -190 0 A 190 190 0 1 1 190 0 Z'
        }
      ])
    }
  }, [])

  // Don't render the animated content until client-side to avoid hydration mismatch
  if (!isClient || blobPaths.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1612]/80 to-[#1a1f2c]/80" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Dark background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1612]/90 to-[#1a1f2c]/90" />
      
      <svg
        viewBox="-300 -300 600 600"
        className="absolute w-full h-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
        style={{ 
          filter: 'blur(30px)',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        <defs>
          <radialGradient id="blob-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(61, 75, 97, 0.3)" />
            <stop offset="100%" stopColor="rgba(26, 31, 44, 0.2)" />
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
              fill={index === 0 ? "url(#blob-gradient)" : `rgba(61, 75, 97, ${0.2 - index * 0.05})`}
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