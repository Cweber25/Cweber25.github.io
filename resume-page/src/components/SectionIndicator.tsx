'use client'

import { motion } from 'framer-motion'

interface SectionIndicatorProps {
  sections: string[]
  currentSection: number
  onNavigate: (index: number) => void
}

export default function SectionIndicator({
  sections: rawSections,
  currentSection,
  onNavigate,
}: SectionIndicatorProps) {
  // Convert section names to display names
  const sections = rawSections.map(section => ({
    id: section,
    label: section.charAt(0).toUpperCase() + section.slice(1)
  }))

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Label that appears on hover */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="whitespace-nowrap text-sm font-semibold text-white bg-primary/95 dark:bg-primary/95 px-3 py-1.5 rounded shadow-lg">
                {section.label}
              </span>
            </div>

            {/* Dot indicator */}
            <button
              onClick={() => onNavigate(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSection === index
                  ? 'bg-primary scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-secondary hover:scale-110'
              }`}
              aria-label={`Navigate to ${section.label} section`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
} 