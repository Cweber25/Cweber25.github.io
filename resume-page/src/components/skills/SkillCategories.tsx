'use client'

import { useState, useEffect, useContext } from 'react'
import SkillCategory from './SkillCategory'
import { SkillsSectionContext } from './SkillsContext'

// Example skill data structure - you can modify this based on your actual skills
const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Server-side applications and API development',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'SQL', level: 75 },
      { name: 'REST APIs', level: 85 },
    ],
  },
  {
    title: 'DevOps & Tools',
    description: 'Development operations and tooling',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'CI/CD', level: 70 },
      { name: 'AWS', level: 65 },
    ],
  },
  {
    title: 'Automation',
    description: 'Infrastructure and workflow automation tools',
    skills: [
      { name: 'GitHub Actions', level: 85 },
      { name: 'Ansible', level: 75 },
      { name: 'Shell Scripting', level: 80 },
      { name: 'Jenkins', level: 70 },
    ],
  },
  {
    title: 'AI & Machine Learning',
    description: 'Currently exploring and learning AI technologies',
    inProgress: true,
    skills: [
      { name: 'LangChain', level: 60, inProgress: true },
      { name: 'OpenAI API', level: 65, inProgress: true },
      { name: 'Prompt Engineering', level: 70, inProgress: true },
      { name: 'Vector Databases', level: 55, inProgress: true },
    ],
  },
]

export default function SkillCategories() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const { isVisible } = useContext(SkillsSectionContext)

  const handleCategoryClick = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title)
  }

  // Close all categories when section becomes invisible
  useEffect(() => {
    if (!isVisible && expandedCategory) {
      setExpandedCategory(null)
    }
  }, [isVisible, expandedCategory])

  // Only scroll if the expanded content would be off-screen
  useEffect(() => {
    if (expandedCategory) {
      const element = document.getElementById(`skill-category-${expandedCategory}`)
      if (element) {
        // Wait for the expansion animation to start
        setTimeout(() => {
          const rect = element.getBoundingClientRect()
          const headerHeight = 120 // Height of sticky header
          const viewportHeight = window.innerHeight
          const elementBottom = rect.bottom
          
          // Only scroll if the bottom of the expanded category would be off-screen
          if (elementBottom > viewportHeight) {
            const scrollNeeded = elementBottom - viewportHeight + 40 // Add small padding
            window.scrollBy({ top: scrollNeeded, behavior: 'smooth' })
          }
        }, 50)
      }
    }
  }, [expandedCategory])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      {skillCategories.map((category, index) => (
        <SkillCategory
          key={category.title}
          id={`skill-category-${category.title}`}
          title={category.title}
          description={category.description}
          skills={category.skills}
          index={index}
          isExpanded={expandedCategory === category.title}
          onToggle={() => handleCategoryClick(category.title)}
          inProgress={category.inProgress}
        />
      ))}
    </div>
  )
} 