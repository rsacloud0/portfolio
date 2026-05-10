import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground">
            About Me
          </h1>
        </ScrollReveal>

        <div className="space-y-6 text-muted leading-relaxed">
          <ScrollReveal delay={0.1}>
            <p>
              I&apos;m a Computer Science undergraduate with a passion for
              building software that makes a difference. I love working across
              the full stack — from designing polished user interfaces to
              architecting backend systems.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p>
              My interests include web development, system design, open source,
              and everything in between. I&apos;m always exploring new
              technologies and looking for opportunities to learn and grow.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="pt-4 text-xl font-semibold text-foreground">
              Skills &amp; Technologies
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                'TypeScript',
                'JavaScript',
                'React',
                'Next.js',
                'Node.js',
                'Python',
                'Go',
                'PostgreSQL',
                'Docker',
                'Git',
                'Tailwind CSS',
                'GraphQL',
              ].map(skill => (
                <span
                  key={skill}
                  className="rounded-full bg-accent/10 px-3.5 py-1.5 text-sm font-medium text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <h2 className="pt-4 text-xl font-semibold text-foreground">
              Current Focus
            </h2>
            <p>
              Right now I&apos;m focused on building this portfolio, exploring
              full-stack development patterns, and contributing to open source
              projects. I&apos;m also working through coursework in algorithms,
              operating systems, and computer networks.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h2 className="pt-4 text-xl font-semibold text-foreground">
              Get In Touch
            </h2>
            <p>
              I&apos;m always open to connecting with fellow developers,
              potential collaborators, or anyone interested in tech. Feel free to
              reach out!
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="https://github.com/rsacloud0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent transition-colors hover:text-accent-hover"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/RabiaSosanArian/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent transition-colors hover:text-accent-hover"
              >
                LinkedIn
              </Link>
              <a
                href="mailto:rabia.sosan.arian0@gmail.com"
                className="flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
              >
                Email <ArrowRight size={12} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
