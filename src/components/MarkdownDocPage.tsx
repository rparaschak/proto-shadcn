import { useParams } from 'react-router-dom'
import { useMarkdownContent } from '@/hooks/useModuleMarkdownFiles'
import MarkdownPreview from './MarkdownPreview'

interface MarkdownDocPageProps {
  globImport: Record<string, () => Promise<string>>
}

export default function MarkdownDocPage({ globImport }: MarkdownDocPageProps) {
  const { filename } = useParams()
  const { content, loading } = useMarkdownContent(globImport, filename ? `${filename}.md` : undefined)

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>
  }

  if (!content) {
    return <p className="text-muted-foreground">Document not found.</p>
  }

  return <MarkdownPreview content={content} />
}
