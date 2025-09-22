'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ShieldCheckIcon, LockClosedIcon, EyeIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'

export default function SecurityBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1612] to-[#1a1f2c] opacity-90" />
    )
  }

  // Security icons with positions and animations
  const securityElements = [
    { Icon: ShieldCheckIcon, x: '10%', y: '20%', delay: 0, duration: 8 },
    { Icon: LockClosedIcon, x: '85%', y: '15%', delay: 2, duration: 10 },
    { Icon: EyeIcon, x: '15%', y: '75%', delay: 4, duration: 9 },
    { Icon: DocumentCheckIcon, x: '80%', y: '70%', delay: 1, duration: 7 },
    { Icon: ShieldCheckIcon, x: '50%', y: '10%', delay: 3, duration: 11 },
    { Icon: LockClosedIcon, x: '25%', y: '45%', delay: 5, duration: 8 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1612]/95 to-[#1a1f2c]/95" />
      
      {/* Hexagonal security mesh pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern 
              id="hexPattern" 
              x="0" 
              y="0" 
              width="60" 
              height="52" 
              patternUnits="userSpaceOnUse"
            >
              <polygon 
                points="30,2 50,15 50,37 30,50 10,37 10,15" 
                fill="none" 
                stroke="rgba(61, 75, 97, 0.3)" 
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      {/* Animated security icons */}
      {securityElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 360],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <element.Icon className="h-8 w-8 text-accent/40" />
        </motion.div>
      ))}

      {/* Floating security badges */}
      <motion.div
        className="absolute top-1/4 left-1/3"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 border border-accent/30">
          <span className="text-white/60 text-sm font-medium">Security Focus</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 border border-accent/30">
          <span className="text-white/60 text-sm font-medium">Governance</span>
        </div>
      </motion.div>

      {/* Subtle animated lines connecting elements */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
        <defs>
          <linearGradient id="securityLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(61, 75, 97, 0.4)', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: 'rgba(61, 75, 97, 0.6)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(61, 75, 97, 0.4)', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 100 200 Q 400 100 800 300"
          stroke="url(#securityLineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M 200 400 Q 600 200 1000 500"
          stroke="url(#securityLineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </svg>

      {/* Central security shield with pulse effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ShieldCheckIcon className="h-32 w-32 text-accent/20" />
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-xl" />
      </motion.div>
    </div>
  )
}
