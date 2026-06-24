import { Plus, Minus, Pin, PinOff, Pencil } from 'lucide-react'
import CiaPanel from './CiaPanel'
import { hasFlag, type Asset } from '../data/assets'
import { CARD_W, CARD_H } from '../hooks/useRiskPicture'

interface AssetCardProps {
  asset: Asset
  selected: boolean
  /** Number of assets that depend on this one (the "depended on by" group). */
  dependedOnByCount: number
  /** Number of assets this one depends on (the "depends on" group). */
  dependsOnCount: number
  /** A relation is being added: the whole card is a connect target. */
  connecting: boolean
  /** This card is the origin of the in-progress relation. */
  isPendingOrigin: boolean
  onSelect: () => void
  onTogglePin: () => void
  onEdit: () => void
  onRisk: () => void
  onAddDependedOnBy: () => void
  onRemoveDependedOnBy: () => void
  onAddDependsOn: () => void
  onRemoveDependsOn: () => void
}

const cornerBtn =
  'flex h-5 w-5 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 shadow-sm transition-colors'

export default function AssetCard({
  asset,
  selected,
  dependedOnByCount,
  dependsOnCount,
  connecting,
  isPendingOrigin,
  onSelect,
  onTogglePin,
  onEdit,
  onRisk,
  onAddDependedOnBy,
  onRemoveDependedOnBy,
  onAddDependsOn,
  onRemoveDependsOn,
}: AssetCardProps) {
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation()
    fn()
  }

  // While connecting, the whole card is a click target: hide the hover
  // controls and make the CIA panel non-interactive so clicks reach the card.
  const cardStateClasses = isPendingOrigin
    ? 'border-sky-400 ring-2 ring-sky-300/60'
    : connecting
      ? 'border-emerald-300 hover:border-emerald-400 hover:ring-2 hover:ring-emerald-300/60'
      : selected
        ? 'border-sky-400 ring-2 ring-sky-300/60'
        : 'border-stone-200 hover:border-stone-300 hover:shadow'

  return (
    <div
      className={`group relative ${connecting ? 'cursor-pointer' : ''}`}
      style={{ width: CARD_W, height: CARD_H }}
      onClick={onSelect}
    >
      {/* Top controls: add / remove an asset that depends on this one */}
      <div
        className={`absolute -top-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 ${
          connecting ? 'hidden' : ''
        }`}
      >
        <button
          onClick={stop(onAddDependedOnBy)}
          className={`${cornerBtn} opacity-0 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 group-hover:opacity-100`}
          title="Add relation: another asset depends on this one"
        >
          <Plus className="h-3 w-3" />
        </button>
        {dependedOnByCount > 0 && (
          <button
            onClick={stop(onRemoveDependedOnBy)}
            className={`${cornerBtn} opacity-0 hover:bg-red-50 hover:text-red-600 hover:border-red-300 group-hover:opacity-100`}
            title="Remove relation: an asset that depends on this one"
          >
            <Minus className="h-3 w-3" />
          </button>
        )}
      </div>

      <div
        className={`flex h-full w-full cursor-pointer overflow-hidden rounded-md border bg-white shadow-sm transition-all ${cardStateClasses}`}
      >
        {/* CIA column — clicking opens the risk dialog (inert while connecting) */}
        {connecting ? (
          <div className="shrink-0">
            <CiaPanel asset={asset} />
          </div>
        ) : (
          <button
            onClick={stop(onRisk)}
            className="shrink-0 cursor-pointer"
            title="View risk (CIA) details"
          >
            <CiaPanel asset={asset} />
          </button>
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-stone-900">{asset.name}</span>
            {hasFlag(asset) && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" title="Risk flag raised" />
            )}
          </div>
          <span className="truncate text-xs text-stone-500">{asset.source}</span>
        </div>
      </div>

      {/* Pin — always visible when pinned, otherwise on hover (top-right) */}
      <button
        onClick={stop(onTogglePin)}
        className={`${cornerBtn} absolute -top-2 -right-2 z-10 transition-opacity hover:border-sky-300 hover:text-sky-600 ${
          connecting ? 'hidden' : ''
        } ${
          asset.pinned
            ? 'border-sky-300 bg-sky-50 text-sky-600 opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        }`}
        title={asset.pinned ? 'Unpin asset' : 'Pin asset'}
      >
        {asset.pinned ? <Pin className="h-3 w-3 fill-sky-500" /> : <PinOff className="h-3 w-3" />}
      </button>

      {/* Edit (bottom-right) */}
      <button
        onClick={stop(onEdit)}
        className={`${cornerBtn} absolute -bottom-2 -right-2 z-10 opacity-0 hover:border-stone-300 hover:text-stone-700 group-hover:opacity-100 ${
          connecting ? 'hidden' : ''
        }`}
        title="Edit asset"
      >
        <Pencil className="h-3 w-3" />
      </button>

      {/* Bottom controls: add / remove an asset this one depends on */}
      <div
        className={`absolute -bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 ${
          connecting ? 'hidden' : ''
        }`}
      >
        <button
          onClick={stop(onAddDependsOn)}
          className={`${cornerBtn} opacity-0 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 group-hover:opacity-100`}
          title="Add relation: this asset depends on another"
        >
          <Plus className="h-3 w-3" />
        </button>
        {dependsOnCount > 0 && (
          <button
            onClick={stop(onRemoveDependsOn)}
            className={`${cornerBtn} opacity-0 hover:bg-red-50 hover:text-red-600 hover:border-red-300 group-hover:opacity-100`}
            title="Remove relation: an asset this one depends on"
          >
            <Minus className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}
