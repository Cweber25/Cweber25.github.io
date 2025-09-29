'use client'

import { useState, useEffect, useContext } from 'react'
import SkillCategory from './SkillCategory'
import { SkillsSectionContext } from './SkillsContext'
import { trackSkillCategoryExpand } from '../../lib/analytics'

// Example skill data structure - you can modify this based on your actual skills
const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces',
    skills: [
      { name: 'React', level: 85 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Framer Motion', level: 75 },
      { name: 'JavaScript', level: 90 },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Server-side applications and API development',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Spring Boot', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'PostgreSQL', level: 50, inProgress: true },
      { name: 'REST APIs', level: 85 },
      { name: 'GraphQL', level: 25, inProgress: true },
    ],
  },
  {
    title: 'DevOps & Cloud',
    description: 'Infrastructure, deployment, and cloud technologies',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 60 },
      { name: 'Kubernetes', level: 40, inProgress: true },
      { name: 'AWS', level: 50, inProgress: true },
      { name: 'Azure', level: 65 },
      { name: 'Terraform', level: 45, inProgress: true },
    ],
  },
  {
    title: 'Automation & Tools',
    description: 'Infrastructure and workflow automation tools',
    skills: [
      { name: 'GitHub Actions', level: 85 },
      { name: 'Ansible', level: 85 },
      { name: 'Shell Scripting', level: 60 },
      { name: 'Jenkins', level: 90 },
      { name: 'Temporal', level: 50, inProgress: true },
      { name: 'Postman', level: 90 },
    ],
  },
  {
    title: 'Security & Governance',
    description: 'Security tools and governance practices from internship experience',
    skills: [
      { name: 'Tenable', level: 75 },
      { name: 'SecurityScorecard', level: 70 },
      { name: 'SharePoint Development', level: 80 },
      { name: 'SOC Analysis', level: 70 },
      { name: 'Vulnerability Management', level: 75 },
      { name: 'Security Ticketing', level: 80 },
    ],
  },
]

export default function SkillCategories() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const { isVisible } = useContext(SkillsSectionContext)

  const handleCategoryClick = (title: string) => {
    const isExpanding = expandedCategory !== title
    setExpandedCategory(expandedCategory === title ? null : title)
    
    // Track when a category is expanded (not collapsed)
    if (isExpanding) {
      trackSkillCategoryExpand(title)
    }
  }

  // Close all categories when section becomes invisible
  useEffect(() => {
    if (!isVisible) {
      setExpandedCategory(null)
    }
  }, [isVisible])

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
          inProgress={false}
        />
      ))}
    </div>
  )
} 