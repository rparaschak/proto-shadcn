import { useState, useEffect, useMemo } from 'react'

export interface MarkdownFile {
  id: string
  title: string
  filename: string
}

type GlobImport = Record<string, () => Promise<string>>

function filenameToTitle(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function filenameToId(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9-]/g, '-')
}

export function useModuleMarkdownFiles(globImport: GlobImport) {
  const files = useMemo<MarkdownFile[]>(() => {
    return Object.keys(globImport).map(path => {
      const filename = path.split('/').pop()!
      return {
        id: filenameToId(filename),
        title: filenameToTitle(filename),
        filename,
      }
    })
  }, [globImport])

  return files
}

export function useMarkdownContent(globImport: GlobImport, filename: string | undefined) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!filename) {
      setLoading(false)
      return
    }

    const key = `./${filename}`
    const loader = globImport[key]
    if (!loader) {
      setContent(null)
      setLoading(false)
      return
    }

    setLoading(true)
    loader().then(raw => {
      setContent(raw)
      setLoading(false)
    })
  }, [globImport, filename])

  return { content, loading }
}
