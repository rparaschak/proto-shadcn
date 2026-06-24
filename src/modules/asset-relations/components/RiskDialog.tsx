import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Flag } from 'lucide-react'
import {
  RISK_ORDER,
  type Asset,
  type CiaDimension,
  type CiaRating,
  type RiskLevel,
} from '../data/assets'

interface RiskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  asset: Asset | null
  onSave: (cia: Record<CiaDimension, CiaRating>) => void
}

const DIMS: { key: CiaDimension; label: string }[] = [
  { key: 'c', label: 'Confidentiality' },
  { key: 'i', label: 'Integrity' },
  { key: 'a', label: 'Availability' },
]

const levelBadge: Record<RiskLevel, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
}

export default function RiskDialog({ open, onOpenChange, asset, onSave }: RiskDialogProps) {
  const [cia, setCia] = useState<Record<CiaDimension, CiaRating> | null>(null)

  useEffect(() => {
    if (asset) setCia({ ...asset.cia })
  }, [asset])

  if (!asset || !cia) return null

  const setAssessed = (dim: CiaDimension, value: RiskLevel) => {
    setCia((prev) => (prev ? { ...prev, [dim]: { ...prev[dim], assessed: value } } : prev))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Risk · {asset.name}</DialogTitle>
          <DialogDescription>
            Assessed levels are set here. A flag is raised when the calculated level exceeds the
            assessed one.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-1">
          {DIMS.map(({ key, label }) => {
            const rating = cia[key]
            const flagged = RISK_ORDER[rating.calculated] > RISK_ORDER[rating.assessed]
            return (
              <div
                key={key}
                className="flex items-center justify-between gap-3 rounded-md border border-stone-200 px-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  {flagged && <Flag className="h-4 w-4 fill-red-500 text-red-500" />}
                  <span className="text-sm font-medium text-stone-800">{label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span>Calculated</span>
                    <Badge variant="secondary" className={levelBadge[rating.calculated]}>
                      {rating.calculated}
                    </Badge>
                  </div>
                  <Select value={rating.assessed} onValueChange={(v) => setAssessed(key, v as RiskLevel)}>
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(cia)
              onOpenChange(false)
            }}
          >
            Save assessment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
