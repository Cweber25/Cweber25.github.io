import { motion, AnimatePresence } from 'framer-motion';
import { LinkIcon, CodeBracketIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

interface Technology {
  name: string;
  color: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  projectLink: string;
  githubLink?: string;
  technologies: Technology[];
  imageUrl: string;
  index: number;
  features?: string[];
}

export default function ProjectCard({
  title,
  description,
  projectLink,
  githubLink,
  technologies,
  imageUrl,
  index,
  features = [],
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking specific links
  };

  return (
    <div className="h-fit">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: isExpanded ? 1 : 1.02, transition: { duration: 0.2 } }}
        onClick={handleCardClick}
        className={`
          card p-6 rounded-xl bg-card transition-all duration-300 relative overflow-hidden group cursor-pointer
          ${isExpanded ? 'bg-card-hover shadow-xl' : 'hover:bg-card-hover shadow-lg'}
        `}
      >
        <div className="relative">
          {/* Project Image */}
          <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`
                object-cover transition-all duration-300
                ${isExpanded ? 'scale-105' : 'group-hover:scale-105'}
              `}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={`
              absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
              transition-opacity duration-300
              ${isExpanded ? 'opacity-70' : 'opacity-0 group-hover:opacity-50'}
            `} />
          </div>

          {/* Project Title */}
          <h3 
            className={`
              text-xl font-bold mb-3 transition-colors duration-300 flex items-center justify-between
              ${isExpanded ? 'text-primary' : 'text-high-contrast group-hover:text-primary'}
            `}
          >
            {title}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon className="h-5 w-5" />
            </motion.span>
          </h3>

          {/* Project Description */}
          <div 
            className={`
              text-medium-contrast mb-4 transition-all duration-300
              ${isExpanded ? '' : 'line-clamp-3'}
            `}
          >
            {description}
          </div>

          {/* Technologies */}
          <div 
            className="flex flex-wrap gap-2 mb-4" 
            onClick={handleLinkClick}
          >
            {technologies.map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: tech.color + '20', color: tech.color }}
              >
                {tech.name}
              </span>
            ))}
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                style={{ transformOrigin: 'top' }}
              >
                <h4 className="text-high-contrast font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-medium-contrast">
                  {features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Links */}
          <div 
            className="flex gap-4 mt-auto" 
            onClick={handleLinkClick}
          >
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center text-sm transition-all duration-300
                ${isExpanded ? 'text-primary hover:text-primary/80' : 'link-hover'}
              `}
            >
              <LinkIcon className="h-4 w-4 mr-1" />
              View Project
            </a>
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex items-center text-sm transition-all duration-300
                  ${isExpanded ? 'text-primary hover:text-primary/80' : 'link-hover'}
                `}
              >
                <CodeBracketIcon className="h-4 w-4 mr-1" />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Overlay hint */}
        <div className={`
          absolute inset-0 bg-black/0 transition-colors duration-300 pointer-events-none
          ${isExpanded ? 'bg-black/5' : 'group-hover:bg-black/5'}
        `} />
      </motion.div>
    </div>
  );
} 