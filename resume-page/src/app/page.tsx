'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { BriefcaseIcon, AcademicCapIcon, CodeBracketIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline'
import ResumeSection from '../components/ResumeSection'
import ExperienceItem from '../components/ExperienceItem'
import SkillItem from '../components/SkillItem'
import SectionNavigation from '../components/SectionNavigation'
import SectionIndicator from '../components/SectionIndicator'
import MorphingBlobs from '../components/MorphingBlobs'
import AboutSection from '../components/AboutSection'
import Timeline from '../components/Timeline'
import ProfessionalExperience from '../components/ProfessionalExperience'

const sections = ['hero', 'about', 'experience', 'skills', 'education', 'projects']

const skills = [
  { name: 'Java', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'JavaScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'SQL', level: 80 },
  { name: 'HTML/CSS', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'React', level: 85 },
  { name: 'Git', level: 85 },
  { name: 'Information Security', level: 80 },
  { name: 'Problem Solving', level: 90 },
  { name: 'Team Leadership', level: 85 }
]

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lastScrollTime, setLastScrollTime] = useState(0)

  // Add initialization effect
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
    
    // Force scroll to hero section
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'instant' })
    }

    // Prevent default scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Reset to first section
    setCurrentSection(0)
  }, [])

  const navigateToSection = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSection(index)
    const element = document.getElementById(sections[index])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  const handlePrevious = useCallback(() => {
    if (currentSection > 0) {
      navigateToSection(currentSection - 1)
    }
  }, [currentSection, navigateToSection])

  const handleNext = useCallback(() => {
    if (currentSection < sections.length - 1) {
      navigateToSection(currentSection + 1)
    }
  }, [currentSection, navigateToSection, sections.length])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        handlePrevious()
      } else if (event.key === 'ArrowDown') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleNext, handlePrevious])

  useEffect(() => {
    let lastScrollY = window.scrollY
    const scrollThreshold = 30
    const scrollCooldown = 400

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown) return
      
      const deltaY = e.deltaY
      const scrollDistance = Math.abs(deltaY)
      
      if (scrollDistance > scrollThreshold) {
        if (deltaY > 0) {
          handleNext()
        } else {
          handlePrevious()
        }
        setLastScrollTime(now)
      }
    }

    // Prevent default scroll behavior
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault()
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('wheel', preventScroll, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('wheel', preventScroll)
    }
  }, [handleNext, handlePrevious, lastScrollTime])

  // Optimize touch handling
  useEffect(() => {
    let touchStartY = 0
    const touchThreshold = 30
    const touchCooldown = 400
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      
      const now = Date.now()
      if (now - lastScrollTime < touchCooldown) return
      
      const touchEndY = e.touches[0].clientY
      const deltaY = touchEndY - touchStartY
      
      if (Math.abs(deltaY) > touchThreshold) {
        if (deltaY < 0) {
          handleNext()
        } else {
          handlePrevious()
        }
        setLastScrollTime(now)
        touchStartY = touchEndY
      }
    }
    
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleNext, handlePrevious, lastScrollTime])

  const sectionStyle = (index: number): React.CSSProperties => ({
    height: '100vh',
    opacity: currentSection === index ? 1 : 0,
    pointerEvents: currentSection === index ? 'auto' : 'none',
    transition: 'opacity 0.4s ease-in-out',
    position: 'relative',
    overflow: 'hidden'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1612] to-[#1a1f2c] overflow-hidden">
      <SectionNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        showPrevious={currentSection > 0}
        showNext={currentSection < sections.length - 1}
      />

      <SectionIndicator
        sections={sections}
        currentSection={currentSection}
        onNavigate={navigateToSection}
      />

      {/* Hero Section */}
      <section id="hero" style={sectionStyle(0)} className="relative min-h-screen overflow-hidden bg-[#0A1612]">
        {/* Morphing Blobs Background */}
        {currentSection === 0 && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <MorphingBlobs />
          </div>
        )}
        
        {/* Content Container */}
        <div className="relative z-30 min-h-screen flex flex-col items-center justify-center px-4">
          {/* Name and Title */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-4">
              Cole Weber
            </h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="h-1 w-32 bg-white mx-auto mb-6 origin-center"
              style={{ willChange: 'transform' }}
            />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-2xl sm:text-3xl font-medium text-white/90"
            >
              Full-Stack Engineer
              <span className="inline-block ml-2 animate-pulse">|</span>
            </motion.h2>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            <motion.a
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              href="mailto:Cweber8@ashland.edu"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full flex items-center text-lg font-medium shadow-lg hover:shadow-xl"
              style={{ willChange: 'transform' }}
            >
              <span className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Contact Me
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              href="https://www.linkedin.com/in/ColeW8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full flex items-center text-lg font-medium shadow-lg hover:shadow-xl"
              style={{ willChange: 'transform' }}
            >
              <span className="flex items-center">
                <LinkIcon className="h-5 w-5 mr-2" />
                LinkedIn
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              href="https://github.com/Cweber25"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full flex items-center text-lg font-medium shadow-lg hover:shadow-xl"
              style={{ willChange: 'transform' }}
            >
              <span className="flex items-center">
                <CodeBracketIcon className="h-5 w-5 mr-2" />
                GitHub
              </span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
          >
            <p className="text-sm mb-2">Scroll to explore</p>
            <motion.div
              animate={{ translateY: [0, 8, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-1 h-8 bg-white/30 rounded-full mx-auto"
              style={{ willChange: 'transform' }}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={sectionStyle(1)} className="flex items-center justify-center px-16">
        <AboutSection isVisible={currentSection === 1} />
      </section>

      {/* Experience Section */}
      <section id="experience" style={sectionStyle(2)}>
        <ProfessionalExperience isVisible={currentSection === 2} currentSection={currentSection} />
      </section>

      {/* Skills Section */}
      <section id="skills" style={sectionStyle(3)} className="flex items-center justify-center px-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection === 3 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h2 className="section-title mb-6">Technical Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {skills.map((skill, index) => (
                <SkillItem
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={sectionStyle(4)} className="flex items-center justify-center px-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection === 4 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-6">Education</h2>
            <div className="card p-6 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-high-contrast mb-2">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-lg font-semibold accent-gradient">Ashland University</p>
                  <p className="text-medium-contrast mt-2">Major: Computer Science</p>
                  <p className="text-medium-contrast">Minor: Cyber Security</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-medium-contrast">Expected Graduation</p>
                  <p className="text-high-contrast font-medium">May 2024</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={sectionStyle(5)} className="flex items-center justify-center px-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection === 5 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Ludum Dare 50 Game Jam",
                  description: "Collaborated in a team of five to develop a game during a weekend game jam. Worked as one of two programmers alongside an artist and two sound designers.",
                  link: "https://ldjam.com/events/ludum-dare/50/honored-execution"
                },
                {
                  title: "Mini Sorry",
                  description: "Developed a board game simulation for a professor to run large-scale data collection. Implemented progressive rule updates throughout the summer.",
                  link: "https://github.com/Cweber25/Mini-Sorry"
                },
                {
                  title: "Sojourn Medical",
                  description: "Designed and implemented a prototype hospital scheduling website using HTML, CSS, JavaScript, and SQL. Features MySQL database integration for user and doctor data management.",
                  link: "https://github.com/Cweber25/Sojourn"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-high-contrast mb-3">
                    {project.title}
                  </h3>
                  <p className="text-medium-contrast mb-4">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center link-hover"
                  >
                    View Project
                    <LinkIcon className="h-4 w-4 ml-1" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
