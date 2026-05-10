import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'src', 'content', 'blog')

export interface PostFrontmatter {
  title: string
  date: string
  description: string
  tags?: string[]
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))

  return files
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const source = fs.readFileSync(path.join(contentDir, file), 'utf-8')
      const { data } = matter(source)
      return { slug, frontmatter: data as PostFrontmatter }
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getPost(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(source)

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  }
}
