import { ExternalLink, GitFork } from 'lucide-react'
import type { Project } from '@/lib/projects'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="group rounded-xl border border-card-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {project.title}
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span
            key={t}
            className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <GitFork size={16} /> Source
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <ExternalLink size={16} /> Live
          </a>
        )}
      </div>
    </div>
  )
}
