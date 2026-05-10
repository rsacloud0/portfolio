interface Props {
  id: string
  title?: string
}

export default function YouTubeEmbed({ id, title = 'YouTube video' }: Props) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}
