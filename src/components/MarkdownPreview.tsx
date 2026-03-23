import Markdown from 'react-markdown'

interface MarkdownPreviewProps {
  content: string
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <article className="prose prose-stone dark:prose-invert max-w-none">
      <Markdown>{content}</Markdown>
    </article>
  )
}
