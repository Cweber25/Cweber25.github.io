'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { BriefcaseIcon, CodeBracketIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline'
import ResumeSection from '../components/layout/ResumeSection'
import ExperienceItem from '../components/experience/ExperienceItem'
import SkillItem from '../components/skills/SkillItem'
import SectionNavigation from '../components/layout/SectionNavigation'
import SectionIndicator from '../components/layout/SectionIndicator'
import MorphingBlobs from '../components/ui/MorphingBlobs'
import AboutSection from '../components/sections/AboutSection'
import Timeline from '../components/experience/Timeline'
import ProfessionalExperience from '../components/experience/ProfessionalExperience'
import TechnicalSkillsSection from '../components/sections/TechnicalSkillsSection'
import ProjectsSection from '../components/sections/ProjectsSection'

const sections = ['hero', 'about', 'experience', 'skills', 'projects']

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
        <TechnicalSkillsSection isVisible={currentSection === 3} />
      </section>

      {/* Projects Section */}
      <section id="projects" style={sectionStyle(4)} className="flex items-center justify-center px-16">
        <ProjectsSection isVisible={currentSection === 4} />
      </section>
    </div>
  )
}
