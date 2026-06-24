import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { RelationInfo } from '../hooks/useRiskPicture'
import type { Asset } from '../data/assets'

interface ConfirmRemoveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  asset: Asset
  relationInfo: RelationInfo | null
  onConfirm: () => void
}

export default function ConfirmRemoveDialog({
  open,
  onOpenChange,
  asset,
  relationInfo,
  onConfirm,
}: ConfirmRemoveDialogProps) {
  if (!relationInfo) return null

  const label =
    relationInfo.direction === 'depends_on'
      ? `"${asset.name}" depends on "${relationInfo.connectedAsset.name}"`
      : `"${relationInfo.connectedAsset.name}" depends on "${asset.name}"`

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Relation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove the relation where {label}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
