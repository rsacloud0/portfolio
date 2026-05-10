import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { Calendar } from 'lucide-react'

interface Props {
  post: Post
}

export default function PostPreview({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-card-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="mb-3 flex items-center gap-2 text-xs text-muted">
        <Calendar size={12} />
        <time dateTime={post.frontmatter.date}>
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
        {post.frontmatter.title}
      </h3>

      <p className="text-sm leading-relaxed text-muted">
        {post.frontmatter.description}
      </p>

      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.frontmatter.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
