import { ArrowRight } from 'lucide-react'
import type { useRiskPicture } from '../hooks/useRiskPicture'

interface RelationsListViewProps {
  data: ReturnType<typeof useRiskPicture>
  search: string
}

export default function RelationsListView({ data, search }: RelationsListViewProps) {
  const { assets, relations } = data
  const byId = (id: string) => assets.find((a) => a.id === id)
  const term = search.trim().toLowerCase()

  const rows = relations.filter((r) => {
    if (!term) return true
    const from = byId(r.fromAssetId)?.name.toLowerCase() ?? ''
    const to = byId(r.toAssetId)?.name.toLowerCase() ?? ''
    return from.includes(term) || to.includes(term)
  })

  return (
    <div className="h-full overflow-auto rounded-lg border border-stone-200 bg-white p-4">
      <ul className="space-y-2">
        {rows.map((rel) => {
          const from = byId(rel.fromAssetId)
          const to = byId(rel.toAssetId)
          if (!from || !to) return null
          return (
            <li
              key={rel.id}
              className="flex items-center gap-3 rounded-md border border-stone-200 px-3 py-2.5 text-sm"
            >
              <span className="font-medium text-stone-900">{from.name}</span>
              <span className="flex items-center gap-1 text-xs text-stone-400">
                depends on <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium text-stone-900">{to.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
