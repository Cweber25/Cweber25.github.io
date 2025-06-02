'use client'

import { motion } from 'framer-motion'
import { BriefcaseIcon, AcademicCapIcon, CodeBracketIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline'
import ResumeSection from '../components/ResumeSection'
import ExperienceItem from '../components/ExperienceItem'
import SkillItem from '../components/SkillItem'

const skills = [
  { name: 'Java', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'JavaScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'SQL', level: 80 },
  { name: 'HTML', level: 85 },
  { name: 'PHP', level: 75 },
  { name: 'Information Security', level: 80 },
  { name: 'Git', level: 85 }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0A1612] dark:to-[#0F1F1B]">
      {/* Navigation */}
      <nav className="nav-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex justify-center flex-1">
              <div className="hidden sm:flex sm:space-x-8">
                {['About', 'Experience', 'Skills', 'Education', 'Projects'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-high-contrast hover:text-secondary transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient pt-12 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-5xl font-bold text-high-contrast mb-4">
              Cole Weber
            </h1>
            <p className="text-lg sm:text-xl font-medium text-medium-contrast mb-6">
              Software Engineer
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="mailto:Cweber8@ashland.edu"
                className="button flex items-center text-sm"
              >
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                Contact Me
              </a>
              <a
                href="https://www.linkedin.com/in/ColeW8"
                target="_blank"
                rel="noopener noreferrer"
                className="button flex items-center text-sm"
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Cweber25"
                target="_blank"
                rel="noopener noreferrer"
                className="button flex items-center text-sm"
              >
                <CodeBracketIcon className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Section */}
        <section id="about" className="mb-20">
          <h2 className="section-title">About Me</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8 rounded-xl"
          >
            <p className="text-lg mb-4">
              I am a Computer Science student at Ashland University, specializing in software engineering and cyber security. With hands-on experience in information security and a strong foundation in various programming languages, I combine technical expertise with practical problem-solving skills.
            </p>
            <p className="text-lg mb-4">
              As a Varsity Esports Captain and ACM Club Team Lead, I've developed strong leadership and collaboration skills. My experience ranges from securing enterprise environments at Mettler Toledo to developing web applications and game projects.
            </p>
            <p className="text-lg">
              I'm passionate about creating secure, efficient solutions and continuously expanding my knowledge in software development and information security.
            </p>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-20">
          <h2 className="section-title">Professional Experience</h2>
          <div className="space-y-6">
            <ExperienceItem
              title="Information Security and Governance Intern"
              company="Mettler Toledo"
              period="June 2023 – August 2023"
              location="Columbus, OH"
              description={[
                "Developed Security team MS Sharepoint pages to provide transparency to the organization's security statistics",
                "Identified aging vulnerabilities in our environment through Tenable that were older than 90 days",
                "Monitored Security ticket queue and resolved tickets, including website unblocking requests and CrowdStrike incidents"
              ]}
              index={0}
            />
            <ExperienceItem
              title="Information Security and Governance Intern"
              company="Mettler Toledo"
              period="June 2022 – August 2022"
              location="Columbus, OH"
              description={[
                "Reviewed possible malicious emails and blocked malicious URLs",
                "Monitored SecurityScorecard and Black Kite to remediate cyber exposure issues",
                "Created digestible graphs from SOC statistics for leadership presentations"
              ]}
              index={1}
            />
            <ExperienceItem
              title="Customer Service Representative"
              company="Kroger"
              period="June 2017 – January 2022"
              location="Westerville, Ohio"
              description={[
                "Progressed from Bagger to Customer Service Representative",
                "Managed multiple responsibilities including people management",
                "Developed strong interpersonal skills through customer service"
              ]}
              index={2}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20">
          <h2 className="section-title">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                name={skill.name}
                level={skill.level}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-20">
          <h2 className="section-title">Education</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8 rounded-xl"
          >
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
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </section>
      </main>
    </div>
  )
}
