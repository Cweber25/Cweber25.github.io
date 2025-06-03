'use client'

import { motion } from 'framer-motion'
import { AcademicCapIcon, CodeBracketIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

interface AboutSectionProps {
  isVisible: boolean;
}

export default function AboutSection({ isVisible }: AboutSectionProps) {
  const aboutCards = [
    {
      icon: AcademicCapIcon,
      title: "Education & Focus",
      content: "Computer Science student at Ashland University, specializing in software engineering and cyber security.",
      highlight: "Expected graduation: May 2024"
    },
    {
      icon: CodeBracketIcon,
      title: "Technical Background",
      content: "Strong foundation in various programming languages with hands-on experience in information security.",
      highlight: "Full-stack development & Security"
    },
    {
      icon: UserGroupIcon,
      title: "Leadership",
      content: "Varsity Esports Captain and ACM Club Team Lead, developing strong collaboration and team management skills.",
      highlight: "Team Leadership & Collaboration"
    },
    {
      icon: RocketLaunchIcon,
      title: "Goals & Passion",
      content: "Passionate about creating secure, efficient solutions and continuously expanding knowledge in software development.",
      highlight: "Security & Innovation"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title mb-6">About Me</h2>
        
        {/* Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square md:aspect-auto md:col-span-1 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
          >
            <div className="text-6xl font-bold text-primary/20">CW</div>
            {/* Add your profile image here */}
            {/* <Image src="/path-to-your-image.jpg" alt="Cole Weber" fill className="object-cover" /> */}
          </motion.div>

          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 card p-6 rounded-xl flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-high-contrast mb-4">
              Software Engineer & Security Enthusiast
            </h3>
            <p className="text-lg text-medium-contrast mb-4">
              I am a Computer Science student with a focus on creating secure and efficient software solutions. My experience spans from enterprise security to full-stack development, always emphasizing best practices and innovation.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Software Development
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Cyber Security
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Team Leadership
              </span>
            </div>
          </motion.div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="card p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-high-contrast mb-2">{card.title}</h3>
                  <p className="text-medium-contrast mb-3">{card.content}</p>
                  <p className="text-sm font-medium text-primary">{card.highlight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 