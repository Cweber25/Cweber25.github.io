'use client'

import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface SectionNavigationProps {
  onPrevious: () => void
  onNext: () => void
  showPrevious: boolean
  showNext: boolean
}

export default function SectionNavigation({
  onPrevious,
  onNext,
  showPrevious,
  showNext,
}: SectionNavigationProps) {
  return (
    <>
      {/* Up arrow at top */}
      {showPrevious && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onPrevious}
          className="fixed top-2 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-primary hover:bg-secondary text-white shadow-lg transition-all z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUpIcon className="h-5 w-5" />
        </motion.button>
      )}
      
      {/* Down arrow at bottom */}
      {showNext && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          className="fixed bottom-2 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-primary hover:bg-secondary text-white shadow-lg transition-all z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </motion.button>
      )}
    </>
  )
} 