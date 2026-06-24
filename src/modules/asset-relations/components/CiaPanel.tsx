import { Flag } from 'lucide-react'
import { flaggedDimensions, type Asset, type CiaDimension, type RiskLevel } from '../data/assets'

const levelStyle: Record<RiskLevel, string> = {
  low: 'bg-emerald-50 text-emerald-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-red-50 text-red-700',
}

const DIMS: { key: CiaDimension; label: string }[] = [
  { key: 'c', label: 'C' },
  { key: 'i', label: 'I' },
  { key: 'a', label: 'A' },
]

interface CiaPanelProps {
  asset: Asset
}

/**
 * The C / I / A column on the left edge of a card. Each cell is tinted by its
 * assessed level; a red flag replaces the letter when the calculated level
 * exceeds the assessed one (NEUP-12685).
 */
export default function CiaPanel({ asset }: CiaPanelProps) {
  const flagged = new Set(flaggedDimensions(asset))

  return (
    <div className="flex flex-col overflow-hidden rounded-l-md border-r border-stone-200">
      {DIMS.map(({ key, label }, idx) => {
        const isFlagged = flagged.has(key)
        return (
          <div
            key={key}
            className={`flex h-[25px] w-[26px] items-center justify-center text-[11px] font-semibold leading-none ${
              idx > 0 ? 'border-t border-stone-200/70' : ''
            } ${isFlagged ? 'bg-red-100 text-red-600' : levelStyle[asset.cia[key].assessed]}`}
            title={
              isFlagged
                ? `${label}: calculated risk (${asset.cia[key].calculated}) exceeds assessed (${asset.cia[key].assessed})`
                : `${label}: ${asset.cia[key].assessed}`
            }
          >
            {isFlagged ? <Flag className="h-3 w-3 fill-red-500 text-red-500" /> : label}
          </div>
        )
      })}
    </div>
  )
}
