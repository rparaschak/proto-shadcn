import { Flag } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { flaggedDimensions, type Asset, type CiaDimension, type RiskLevel } from '../data/assets'
import type { useRiskPicture } from '../hooks/useRiskPicture'

const levelBadge: Record<RiskLevel, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
}

const DIMS: CiaDimension[] = ['c', 'i', 'a']

interface AssetListViewProps {
  data: ReturnType<typeof useRiskPicture>
  search: string
}

export default function AssetListView({ data, search }: AssetListViewProps) {
  const term = search.trim().toLowerCase()
  const rows = data.assets.filter((a) => !term || a.name.toLowerCase().includes(term))

  return (
    <div className="h-full overflow-auto rounded-lg border border-stone-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>C</TableHead>
            <TableHead>I</TableHead>
            <TableHead>A</TableHead>
            <TableHead>Relations</TableHead>
            <TableHead>Flag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((asset: Asset) => {
            const flagged = new Set(flaggedDimensions(asset))
            return (
              <TableRow key={asset.id}>
                <TableCell className="font-medium text-stone-900">{asset.name}</TableCell>
                <TableCell className="text-stone-500">{asset.source}</TableCell>
                {DIMS.map((d) => (
                  <TableCell key={d}>
                    <Badge variant="secondary" className={levelBadge[asset.cia[d].assessed]}>
                      {asset.cia[d].assessed}
                    </Badge>
                  </TableCell>
                ))}
                <TableCell className="text-stone-600">
                  {data.getRelationsForAsset(asset.id).length}
                </TableCell>
                <TableCell>
                  {flagged.size > 0 && (
                    <span className="inline-flex items-center gap-1 text-red-600">
                      <Flag className="h-3.5 w-3.5 fill-red-500" />
                      {[...flagged].map((d) => d.toUpperCase()).join(', ')}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
