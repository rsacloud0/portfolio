import { GitFork, Globe, Mail, ArrowUp } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, React.ReactNode> = {
  github: <GitFork size={18} />,
  linkedin: <Globe size={18} />,
  twitter: <Globe size={18} />,
  mail: <Mail size={18} />,
}

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rsacloud0', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/RabiaSosanArian/', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:rabia.sosan.arian0@gmail.com', icon: 'mail' },
]

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10">
        <div className="flex items-center gap-6">
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
              aria-label={link.name}
            >
              {iconMap[link.icon]}
            </a>
          ))}
        </div>

        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Portfolio. Built with Next.js.
        </p>

        <Link
          href="#"
          className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
        >
          Back to top <ArrowUp size={12} />
        </Link>
      </div>
    </footer>
  )
}
