import { useEffect, useRef, useId } from 'react'
import Markdown from 'react-markdown'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId().replace(/:/g, '_')

  useEffect(() => {
    if (!ref.current) return
    mermaid.render(`mermaid${id}`, chart).then(({ svg }) => {
      ref.current!.innerHTML = svg
    })
  }, [chart, id])

  return <div ref={ref} className="my-4" />
}

interface MarkdownPreviewProps {
  content: string
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <article className="prose prose-stone dark:prose-invert max-w-none">
      <Markdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-mermaid/.test(className || '')
            if (match) {
              return <MermaidDiagram chart={String(children).trim()} />
            }
            return <code className={className} {...props}>{children}</code>
          },
          pre({ children }) {
            return <>{children}</>
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  )
}
