import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import type { RelationInfo } from '../hooks/useRiskPicture'
import type { Asset } from '../data/assets'

interface RemoveRelationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  asset: Asset
  relations: RelationInfo[]
  onConfirm: (relationIds: string[]) => void
}

export default function RemoveRelationModal({
  open,
  onOpenChange,
  asset,
  relations,
  onConfirm,
}: RemoveRelationModalProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleConfirm = () => {
    onConfirm(Array.from(selected))
    setSelected(new Set())
    onOpenChange(false)
  }

  const handleCancel = () => {
    setSelected(new Set())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Relations</DialogTitle>
          <DialogDescription>
            {relations[0]?.direction === 'depends_on' ? (
              <>
                Select which assets <strong>{asset.name}</strong> should no longer depend on.
              </>
            ) : (
              <>
                Select which assets should no longer depend on <strong>{asset.name}</strong>.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2 max-h-64 overflow-y-auto">
          {relations.map((info) => {
            const label =
              info.direction === 'depends_on'
                ? `${asset.name} depends on ${info.connectedAsset.name}`
                : `${info.connectedAsset.name} depends on ${asset.name}`
            return (
              <label
                key={info.relation.id}
                className="flex items-center gap-3 rounded-md border border-stone-200 px-3 py-2.5 cursor-pointer hover:bg-stone-50 transition-colors"
              >
                <Checkbox
                  checked={selected.has(info.relation.id)}
                  onCheckedChange={() => toggle(info.relation.id)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800">{label}</p>
                  <p className="text-xs text-stone-500">
                    {info.direction === 'depends_on' ? 'Depends on' : 'Depended on by'}{' '}
                    · {info.connectedAsset.source}
                  </p>
                </div>
              </label>
            )
          })}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={selected.size === 0}
          >
            Remove {selected.size > 0 ? `(${selected.size})` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
