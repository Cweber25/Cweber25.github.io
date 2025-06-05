import { motion } from 'framer-motion';
import { LinkIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

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
}

export default function ProjectCard({
  title,
  description,
  projectLink,
  githubLink,
  technologies,
  imageUrl,
  index,
}: ProjectCardProps) {
  const handleCardClick = () => {
    window.open(githubLink || projectLink, '_blank', 'noopener,noreferrer');
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking specific links
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
      className="card p-6 rounded-xl bg-card hover:bg-card-hover transition-colors duration-300 relative overflow-hidden group cursor-pointer"
    >
      {/* Project Image */}
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Project Title */}
      <h3 className="text-xl font-bold text-high-contrast mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Project Description */}
      <p className="text-medium-contrast mb-4 line-clamp-3">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4" onClick={handleLinkClick}>
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

      {/* Links */}
      <div className="flex gap-4 mt-auto" onClick={handleLinkClick}>
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center link-hover text-sm"
        >
          <LinkIcon className="h-4 w-4 mr-1" />
          View Project
        </a>
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center link-hover text-sm"
          >
            <CodeBracketIcon className="h-4 w-4 mr-1" />
            Source Code
          </a>
        )}
      </div>

      {/* Overlay hint */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
} 