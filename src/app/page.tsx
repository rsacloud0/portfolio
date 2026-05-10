import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import StarField from '@/components/StarField'
import ScrollReveal from '@/components/ScrollReveal'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import PostPreview from '@/components/PostPreview'
import { getAllProjects } from '@/lib/projects'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const projects = getAllProjects()
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      <StarField />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <ScrollReveal className="text-center">
          <p className="mb-4 text-sm font-medium text-accent">Hi, I&apos;m</p>
          <h1 className="mb-4 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
            Rabia!
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg text-muted">
            Computer Science undergrad passionate about building things for the web.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-card-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Read Blog
            </Link>
          </div>
        </ScrollReveal>

        <div className="absolute bottom-10 animate-bounce">
          <ArrowDown size={20} className="text-muted" />
        </div>
      </section>

      {/* About */}
      <Section
        id="about"
        title="About Me"
        subtitle="A quick introduction to who I am and what I do."
        className="bg-background"
      >
        <ScrollReveal className="mx-auto max-w-2xl text-center" delay={0.1}>
          <p className="leading-relaxed text-muted">
            I&apos;m a Computer Science undergraduate with a passion for full-stack
            development, system design, and creating polished user experiences.
            This site is my corner of the internet where I share projects,
            write about things I&apos;m learning, and document my journey.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
          >
            More about me <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </Section>

      {/* Projects */}
      <Section
        id="projects"
        title="Featured Projects"
        subtitle="Some things I've built recently."
        className="border-t border-card-border bg-background"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-10 text-center" delay={0.3}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </Section>

      {/* Blog */}
      <Section
        id="blog"
        title="Latest Posts"
        subtitle="Thoughts, tutorials, and updates."
        className="border-t border-card-border bg-background"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <PostPreview post={post} />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-10 text-center" delay={0.3}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
          >
            Read all posts <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        title="Get In Touch"
        subtitle="I'm always open to new opportunities and conversations."
        className="border-t border-card-border bg-background"
      >
        <ScrollReveal className="text-center" delay={0.1}>
          <a
            href="mailto:rabia.sosan.arian0@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Say Hello
          </a>
        </ScrollReveal>
      </Section>
    </>
  )
}
