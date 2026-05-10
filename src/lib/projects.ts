import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Project {
  title: string
  description: string
  tech: string[]
  links: {
    github?: string
    live?: string
  }
}

const contentDir = path.join(process.cwd(), 'src', 'content', 'projects')

export function getAllProjects(): Project[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))

  return files.map(file => {
    const source = fs.readFileSync(path.join(contentDir, file), 'utf-8')
    const { data } = matter(source)

    return {
      title: data.title,
      description: data.description,
      tech: data.tech || [],
      links: {
        github: data.github || undefined,
        live: data.live || undefined,
      },
    }
  })
}
