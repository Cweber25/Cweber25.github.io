'use client'

import { motion } from 'framer-motion'
import ProjectCard from '../projects/ProjectCard'
import { projects } from '../projects/projects'
import DynamicWaves from '../ui/DynamicWaves'

interface ProjectsSectionProps {
  isVisible: boolean;
}

export default function ProjectsSection({ isVisible }: ProjectsSectionProps) {
  return (
    <div className="relative flex items-center justify-center px-16">
      {/* Background container - positioned behind everything */}
      <div className="fixed inset-0 w-full">
        <DynamicWaves />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 