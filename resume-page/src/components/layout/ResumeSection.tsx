import { ReactNode } from 'react'
import AnimatedSection from './AnimatedSection'

interface ResumeSectionProps {
  id?: string
  title: string
  icon: ReactNode
  delay?: number
  children: ReactNode
}

const ResumeSection = ({ id, title, icon, delay = 0, children }: ResumeSectionProps) => {
  return (
    <AnimatedSection id={id} className="mb-16" delay={delay}>
      <div className="flex items-center mb-6">
        <div className="h-8 w-8 text-primary-500 mr-3">
          {icon}
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </AnimatedSection>
  )
}

export default ResumeSection 