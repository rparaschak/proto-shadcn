import { type Relation } from '../data/assets'
import { CARD_W, CARD_H, type NodePosition } from '../hooks/useRiskPicture'

interface RelationLinesProps {
  relations: Relation[]
  positions: Record<string, NodePosition>
  selectedAssetId: string | null
  matchedIds: Set<string> | null
}

/** Rounded orthogonal elbow from child-top (x1,y1) up to parent-bottom (x2,y2). */
function elbowPath(x1: number, y1: number, x2: number, y2: number, offset: number) {
  if (Math.abs(x1 - x2) < 1) return `M ${x1} ${y1} L ${x2} ${y2}`
  const midY = (y1 + y2) / 2 + offset
  const sx = Math.sign(x2 - x1)
  const r = Math.min(10, Math.abs(x2 - x1) / 2, Math.abs(y1 - midY), Math.abs(midY - y2))
  return [
    `M ${x1} ${y1}`,
    `L ${x1} ${midY + r}`,
    `Q ${x1} ${midY} ${x1 + sx * r} ${midY}`,
    `L ${x2 - sx * r} ${midY}`,
    `Q ${x2} ${midY} ${x2} ${midY - r}`,
    `L ${x2} ${y2}`,
  ].join(' ')
}

export default function RelationLines({
  relations,
  positions,
  selectedAssetId,
  matchedIds,
}: RelationLinesProps) {
  return (
    <svg className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 1 9 L 5 2 L 9 9" fill="none" stroke="#a8a29e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id="arrow-active" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 1 9 L 5 2 L 9 9" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {relations.map((rel, idx) => {
        const from = positions[rel.fromAssetId] // child (lower)
        const to = positions[rel.toAssetId] // parent (upper)
        if (!from || !to) return null

        const x1 = from.x + CARD_W / 2
        const y1 = from.y // child top edge
        const x2 = to.x + CARD_W / 2
        const y2 = to.y + CARD_H // parent bottom edge

        // Stagger the horizontal run so nearby relations use separate paths.
        const offset = ((idx % 3) - 1) * 14

        const active =
          selectedAssetId === rel.fromAssetId || selectedAssetId === rel.toAssetId
        const dimmed =
          matchedIds !== null && !matchedIds.has(rel.fromAssetId) && !matchedIds.has(rel.toAssetId)

        return (
          <path
            key={rel.id}
            d={elbowPath(x1, y1, x2, y2, offset)}
            fill="none"
            stroke={active ? '#f59e0b' : '#d6d3d1'}
            strokeWidth={active ? 2.5 : 1.75}
            markerEnd={`url(#${active ? 'arrow-active' : 'arrow'})`}
            className="transition-all duration-300"
            opacity={dimmed ? 0.2 : 1}
          />
        )
      })}
    </svg>
  )
}
