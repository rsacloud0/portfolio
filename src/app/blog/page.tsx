import type { Metadata } from 'next'
import Section from '@/components/Section'
import ScrollReveal from '@/components/ScrollReveal'
import PostPreview from '@/components/PostPreview'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, tutorials, and thoughts.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <Section
      title="Blog"
      subtitle="Articles, tutorials, and things I am thinking about."
      className="min-h-screen pt-32"
    >
      {posts.length === 0 ? (
        <ScrollReveal className="text-center text-muted">
          <p>No posts yet. Check back soon!</p>
        </ScrollReveal>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.05}>
              <PostPreview post={post} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </Section>
  )
}
