'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DynamicWavesProps {
  className?: string;
}

export default function DynamicWaves({ className = '' }: DynamicWavesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={`absolute inset-0 w-full overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 w-full">
        {/* First Wave */}
        <motion.div
          className="absolute inset-0 w-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="w-full h-full scale-110"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,181.3C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#gradient1)"
              className="blur-sm"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#0A1612', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#1a1f2c', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#0A1612', stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Second Wave */}
        <motion.div
          className="absolute inset-0 w-full"
          animate={{
            y: [0, 25, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <svg
            className="w-full h-full scale-110"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,197.3C672,171,768,149,864,160C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#gradient2)"
              className="blur-sm"
            />
            <defs>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#0A1612', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#1a1f2c', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#0A1612', stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Third Wave */}
        <motion.div
          className="absolute inset-0 w-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg
            className="w-full h-full scale-110"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,218.7C672,213,768,235,864,234.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#gradient3)"
              className="blur-sm"
            />
            <defs>
              <linearGradient id="gradient3" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0A1612', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#1a1f2c', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#0A1612', stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </div>
  );
} 