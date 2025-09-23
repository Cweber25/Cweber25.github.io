'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { AcademicCapIcon, CodeBracketIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

interface AboutSectionProps {
  isVisible: boolean;
}

// Simplified animations without complex text splitting to prevent hydration issues

const aboutCards = [
  {
    icon: AcademicCapIcon,
    title: "Education",
    content: "Graduated with a Bachelor's of Science in Computer Science from Ashland University and a minor in Cybersecurity.",
    highlight: "Graduated: May 2024"
  },
  {
    icon: CodeBracketIcon,
    title: "Certifications",
    content: "Microsoft Certified: Azure Fundamentals and Agile SAFe certified. Currently pursuing AWS Cloud Practitioner certification.",
    highlight: "Azure & Agile Certified"
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
    content: "Passionate about creating new and innovative solutions to problems. I'm always looking for new challenges and opportunities to learn and grow.",
    highlight: "Innovation & Problem Solving"
  }
]

export default function AboutSection({ isVisible }: AboutSectionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="section-title mb-6">About Me</h2>
        
        {/* Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Image */}
          <div 
            className={`relative md:col-span-1 flex items-center justify-center ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}
            style={{ 
              transition: `opacity 0.4s ease-out ${isVisible ? '0.1s' : '0s'}, transform 0.4s ease-out ${isVisible ? '0.1s' : '0s'}`
            }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-200 bg-gradient-to-br from-primary/10 to-secondary/10 hover:scale-[1.02] group">
              <Image
                src="/images/headshot.jpg"
                alt="Cole Weber"
                width={400}
                height={400}
                className="transition-all duration-200 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Main Description */}
          <div 
            className={`md:col-span-2 card p-8 rounded-xl flex flex-col hover:shadow-xl hover:-translate-y-1 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            style={{ 
              transition: `opacity 0.4s ease-out ${isVisible ? '0.2s' : '0s'}, transform 0.4s ease-out ${isVisible ? '0.2s' : '0s'}, box-shadow 0.2s ease-out`
            }}
          >
            <h3 className="text-3xl font-bold text-high-contrast mb-6 hover:text-accent transition-colors duration-200">
              Full-Stack Engineer & Security Enthusiast
            </h3>
            
            <p className="text-xl leading-relaxed text-medium-contrast mb-8 hover:text-white transition-colors duration-200">
              I'm a Full Stack Engineer at CVS Health, currently part of the Infrastructure Software Engineering Program (ISEP). I focus on backend development and automation, building internal tools and scalable systems that streamline infrastructure workflows and enhance the developer experience. My work spans technologies like Python, GitHub Actions, and Ansible, with a strong emphasis on improving internal platforms. I'm especially passionate about creating solutions that reduce developer toil and enable teams to ship faster with confidence.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {['Software Development', 'Automation', 'Team Leadership'].map((skill, index) => (
                <span 
                  key={skill}
                  className={`px-4 py-2 bg-[#3d4b61]/20 text-white rounded-full text-base font-medium hover:bg-accent/30 hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transition: `opacity 0.3s ease-out ${isVisible ? `${0.3 + index * 0.05}s` : '0s'}, transform 0.3s ease-out ${isVisible ? `${0.3 + index * 0.05}s` : '0s'}, background-color 0.15s ease-out, scale 0.15s ease-out`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutCards.map((card, index) => (
            <div
              key={card.title}
              className={`card py-4 px-6 rounded-xl hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] group ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transition: `opacity 0.3s ease-out ${isVisible ? `${0.4 + index * 0.1}s` : '0s'}, transform 0.3s ease-out ${isVisible ? `${0.4 + index * 0.1}s` : '0s'}, box-shadow 0.15s ease-out`
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-[#3d4b61]/20 rounded-xl group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-150">
                  <card.icon className="w-5 h-5 text-white group-hover:text-accent transition-colors duration-150" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-high-contrast mb-1.5 group-hover:text-accent transition-colors duration-150">{card.title}</h3>
                  <p className="text-medium-contrast mb-2 text-sm leading-relaxed group-hover:text-white transition-colors duration-150">{card.content}</p>
                  <p className="text-sm font-medium text-white/80 group-hover:text-accent transition-colors duration-150">{card.highlight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 