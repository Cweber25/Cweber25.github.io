'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { AcademicCapIcon, CodeBracketIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

interface AboutSectionProps {
  isVisible: boolean;
}

export default function AboutSection({ isVisible }: AboutSectionProps) {
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
            className="relative md:col-span-1 flex items-center justify-center"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-primary/10 to-secondary/10">
              <Image
                src="/images/headshot.jpg"
                alt="Cole Weber"
                width={400}
                height={400}
                className="transition-all duration-300 hover:scale-[1.02]"
                priority
              />
            </div>
          </motion.div>

          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 card p-8 rounded-xl flex flex-col"
          >
            <h3 className="text-3xl font-bold text-high-contrast mb-6">
              Full-Stack Engineer & Security Enthusiast
            </h3>
            <p className="text-xl leading-relaxed text-medium-contrast mb-8">
              I'm a Full Stack Engineer at CVS Health, currently part of the Infrastructure Software Engineering Program (ISEP). I focus on backend development and automation, building internal tools and scalable systems that streamline infrastructure workflows and enhance the developer experience. My work spans technologies like Python, GitHub Actions, and Ansible, with a strong emphasis on improving internal platforms. I'm especially passionate about creating solutions that reduce developer toil and enable teams to ship faster with confidence.            
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-[#3d4b61]/20 text-white rounded-full text-base font-medium">
                Software Development
              </span>
              <span className="px-4 py-2 bg-[#3d4b61]/20 text-white rounded-full text-base font-medium">
                Automation
              </span>
              <span className="px-4 py-2 bg-[#3d4b61]/20 text-white rounded-full text-base font-medium">
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
              className="card py-4 px-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-[#3d4b61]/20 rounded-xl">
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-high-contrast mb-1.5">{card.title}</h3>
                  <p className="text-medium-contrast mb-2 text-sm leading-relaxed">{card.content}</p>
                  <p className="text-sm font-medium text-white/80">{card.highlight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 