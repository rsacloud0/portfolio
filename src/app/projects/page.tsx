import type { Metadata } from 'next'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import ProjectCard from '@/components/ProjectCard'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects I have built and worked on.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <Section
      title="Projects"
      subtitle="Things I have built and contributed to."
      className="min-h-screen pt-32"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ScrollReveal key={project.title} delay={i * 0.1}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
