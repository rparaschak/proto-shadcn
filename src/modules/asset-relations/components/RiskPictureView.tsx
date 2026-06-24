import { useState, useMemo, useCallback } from 'react'
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react'
import { toast } from 'sonner'
import { useZoomPan } from '../hooks/useZoomPan'
import { CARD_W, CARD_H, type RelationInfo } from '../hooks/useRiskPicture'
import { hasFlag, RISK_ORDER, type Asset, type CiaDimension, type CiaRating } from '../data/assets'
import type { useRiskPicture } from '../hooks/useRiskPicture'
import type { RiskFilter } from './RiskToolbar'
import AssetCard from './AssetCard'
import RelationLines from './RelationLines'
import RemoveRelationModal from './RemoveRelationModal'
import ConfirmRemoveDialog from './ConfirmRemoveDialog'
import EditAssetDialog from './EditAssetDialog'
import RiskDialog from './RiskDialog'

type RiskData = ReturnType<typeof useRiskPicture>

interface RiskPictureViewProps {
  data: RiskData
  search: string
  filter: RiskFilter
}

function isHighRisk(asset: Asset): boolean {
  return (['c', 'i', 'a'] as CiaDimension[]).some(
    (d) => RISK_ORDER[asset.cia[d].assessed] >= 2 || RISK_ORDER[asset.cia[d].calculated] >= 2,
  )
}

export default function RiskPictureView({ data, search, filter }: RiskPictureViewProps) {
  const {
    assets,
    relations,
    nodePositions,
    getRelationsForAsset,
    removeRelation,
    removeRelations,
    togglePin,
    updateAssetCia,
    renameAsset,
  } = data

  const { transform, handlers, zoomBy, reset } = useZoomPan({ x: 80, y: 28, scale: 1 })

  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Remove-relation dialogs
  const [modalAsset, setModalAsset] = useState<Asset | null>(null)
  const [modalRelations, setModalRelations] = useState<RelationInfo[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmAsset, setConfirmAsset] = useState<Asset | null>(null)
  const [confirmRelation, setConfirmRelation] = useState<RelationInfo | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  // Edit + risk dialogs
  const [editAsset, setEditAsset] = useState<Asset | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [riskAsset, setRiskAsset] = useState<Asset | null>(null)
  const [riskOpen, setRiskOpen] = useState(false)

  // Shift positions into positive space and size the canvas layer to fit.
  const layout = useMemo(() => {
    const entries = Object.entries(nodePositions)
    const xs = entries.map(([, p]) => p.x)
    const ys = entries.map(([, p]) => p.y)
    const minX = Math.min(...xs, 0)
    const minY = Math.min(...ys, 0)
    const maxX = Math.max(...xs, 0)
    const maxY = Math.max(...ys, 0)
    const pad = 64
    const off = { x: -minX + pad, y: -minY + pad }
    const positions: Record<string, { x: number; y: number; level: number }> = {}
    for (const [id, p] of entries) {
      positions[id] = { x: p.x + off.x, y: p.y + off.y, level: p.level }
    }
    return {
      positions,
      width: maxX - minX + CARD_W + pad * 2,
      height: maxY - minY + CARD_H + pad * 2,
    }
  }, [nodePositions])

  const matchedIds = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term && filter === 'all') return null
    const ids = new Set<string>()
    for (const a of assets) {
      const matchesSearch = !term || a.name.toLowerCase().includes(term)
      const matchesFilter =
        filter === 'all' || (filter === 'flagged' ? hasFlag(a) : isHighRisk(a))
      if (matchesSearch && matchesFilter) ids.add(a.id)
    }
    return ids
  }, [assets, search, filter])

  const closeRemoveDialogs = useCallback(() => {
    setModalOpen(false)
    setModalAsset(null)
    setModalRelations([])
    setConfirmOpen(false)
    setConfirmAsset(null)
    setConfirmRelation(null)
  }, [])

  // Remove is scoped to one relation direction: the top "−" removes assets that
  // depend on this one, the bottom "−" removes assets this one depends on.
  const handleRemoveClick = useCallback(
    (asset: Asset, direction: RelationInfo['direction']) => {
      closeRemoveDialogs()
      const rels = getRelationsForAsset(asset.id).filter((r) => r.direction === direction)
      if (rels.length === 0) return
      if (rels.length === 1) {
        setConfirmAsset(asset)
        setConfirmRelation(rels[0])
        setConfirmOpen(true)
      } else {
        setModalAsset(asset)
        setModalRelations(rels)
        setModalOpen(true)
      }
    },
    [getRelationsForAsset, closeRemoveDialogs],
  )

  const handleConfirmSingle = useCallback(() => {
    if (!confirmRelation) return
    removeRelation(confirmRelation.relation.id)
    toast.success('Relation removed')
    closeRemoveDialogs()
  }, [confirmRelation, removeRelation, closeRemoveDialogs])

  const handleConfirmMultiple = useCallback(
    (relationIds: string[]) => {
      removeRelations(relationIds)
      toast.success(`${relationIds.length} relation${relationIds.length > 1 ? 's' : ''} removed`)
      closeRemoveDialogs()
    },
    [removeRelations, closeRemoveDialogs],
  )

  const openEdit = (asset: Asset) => {
    setEditAsset(asset)
    setEditOpen(true)
  }
  const openRisk = (asset: Asset) => {
    setRiskAsset(asset)
    setRiskOpen(true)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-stone-200 bg-stone-50/60">
      {/* Pan/zoom interaction layer */}
      <div
        className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        {...handlers}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: layout.width,
            height: layout.height,
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          <RelationLines
            relations={relations}
            positions={layout.positions}
            selectedAssetId={selectedId}
            matchedIds={matchedIds}
          />

          {assets.map((asset) => {
            const pos = layout.positions[asset.id]
            if (!pos) return null
            const dimmed = matchedIds !== null && !matchedIds.has(asset.id)
            const rels = getRelationsForAsset(asset.id)
            const dependedOnByCount = rels.filter((r) => r.direction === 'depended_on_by').length
            const dependsOnCount = rels.filter((r) => r.direction === 'depends_on').length
            return (
              <div
                key={asset.id}
                className="absolute transition-[left,top,opacity] duration-300"
                style={{ left: pos.x, top: pos.y, opacity: dimmed ? 0.3 : 1 }}
              >
                <AssetCard
                  asset={asset}
                  selected={selectedId === asset.id}
                  dependedOnByCount={dependedOnByCount}
                  dependsOnCount={dependsOnCount}
                  onSelect={() => setSelectedId((prev) => (prev === asset.id ? null : asset.id))}
                  onTogglePin={() => {
                    togglePin(asset.id)
                    toast.success(asset.pinned ? `${asset.name} unpinned` : `${asset.name} pinned`)
                  }}
                  onEdit={() => openEdit(asset)}
                  onRisk={() => openRisk(asset)}
                  onAddDependedOnBy={() =>
                    toast.info(`Add an asset that depends on ${asset.name}`)
                  }
                  onRemoveDependedOnBy={() => handleRemoveClick(asset, 'depended_on_by')}
                  onAddDependsOn={() => toast.info(`Add an asset that ${asset.name} depends on`)}
                  onRemoveDependsOn={() => handleRemoveClick(asset, 'depends_on')}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1 rounded-md border border-stone-200 bg-white p-1 shadow-sm">
        <button
          onClick={() => zoomBy(1.2)}
          className="flex h-7 w-7 items-center justify-center rounded text-stone-600 hover:bg-stone-100"
          title="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => zoomBy(1 / 1.2)}
          className="flex h-7 w-7 items-center justify-center rounded text-stone-600 hover:bg-stone-100"
          title="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={reset}
          className="flex h-7 w-7 items-center justify-center rounded text-stone-600 hover:bg-stone-100"
          title="Reset view"
        >
          <Maximize className="h-4 w-4" />
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 rounded bg-white/80 px-2 py-1 text-xs text-stone-400">
        Scroll to zoom · drag to pan
      </div>

      {modalAsset && (
        <RemoveRelationModal
          open={modalOpen}
          onOpenChange={(open) => !open && closeRemoveDialogs()}
          asset={modalAsset}
          relations={modalRelations}
          onConfirm={handleConfirmMultiple}
        />
      )}
      {confirmAsset && (
        <ConfirmRemoveDialog
          open={confirmOpen}
          onOpenChange={(open) => !open && closeRemoveDialogs()}
          asset={confirmAsset}
          relationInfo={confirmRelation}
          onConfirm={handleConfirmSingle}
        />
      )}
      <EditAssetDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        asset={editAsset}
        onSave={(name) => {
          if (editAsset) {
            renameAsset(editAsset.id, name)
            toast.success('Asset updated')
          }
        }}
      />
      <RiskDialog
        open={riskOpen}
        onOpenChange={setRiskOpen}
        asset={riskAsset}
        onSave={(cia: Record<CiaDimension, CiaRating>) => {
          if (riskAsset) {
            updateAssetCia(riskAsset.id, cia)
            toast.success('Risk assessment saved')
          }
        }}
      />
    </div>
  )
}
