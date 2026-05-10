import ScrollReveal from './ScrollReveal'

interface Props {
  id?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, title, subtitle, children, className = '' }: Props) {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        {(title || subtitle) && (
          <ScrollReveal className="mb-14 text-center">
            {title && (
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-lg text-muted">{subtitle}</p>
            )}
          </ScrollReveal>
        )}
        {children}
      </div>
    </section>
  )
}
