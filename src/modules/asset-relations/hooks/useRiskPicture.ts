import { useState, useCallback, useMemo } from 'react'
import {
  assets as initialAssets,
  relations as initialRelations,
  type Asset,
  type Relation,
  type CiaDimension,
  type CiaRating,
} from '../data/assets'

export interface RelationInfo {
  relation: Relation
  connectedAsset: Asset
  direction: 'depends_on' | 'depended_on_by'
}

export interface NodePosition {
  x: number
  y: number
  level: number
}

export const CARD_W = 210
export const CARD_H = 78

export function useRiskPicture() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [relations, setRelations] = useState<Relation[]>(initialRelations)

  const getRelationsForAsset = useCallback(
    (assetId: string): RelationInfo[] => {
      const result: RelationInfo[] = []
      for (const rel of relations) {
        if (rel.fromAssetId === assetId) {
          const connected = assets.find((a) => a.id === rel.toAssetId)
          if (connected) {
            result.push({ relation: rel, connectedAsset: connected, direction: 'depends_on' })
          }
        }
        if (rel.toAssetId === assetId) {
          const connected = assets.find((a) => a.id === rel.fromAssetId)
          if (connected) {
            result.push({ relation: rel, connectedAsset: connected, direction: 'depended_on_by' })
          }
        }
      }
      return result
    },
    [relations, assets],
  )

  const removeRelation = useCallback((relationId: string) => {
    setRelations((prev) => prev.filter((r) => r.id !== relationId))
  }, [])

  const removeRelations = useCallback((relationIds: string[]) => {
    const idSet = new Set(relationIds)
    setRelations((prev) => prev.filter((r) => !idSet.has(r.id)))
  }, [])

  // Create a "fromId depends on toId" relation. Rejects self-links and pairs
  // that are already related in either direction.
  const addRelation = useCallback(
    (fromId: string, toId: string): { ok: boolean; reason?: string } => {
      if (fromId === toId) return { ok: false, reason: 'An asset cannot depend on itself' }
      const exists = relations.some(
        (r) =>
          (r.fromAssetId === fromId && r.toAssetId === toId) ||
          (r.fromAssetId === toId && r.toAssetId === fromId),
      )
      if (exists) return { ok: false, reason: 'These assets are already related' }
      setRelations((prev) => [
        ...prev,
        { id: `rel-${fromId}-${toId}`, fromAssetId: fromId, toAssetId: toId, type: 'depends_on' },
      ])
      return { ok: true }
    },
    [relations],
  )

  const togglePin = useCallback((assetId: string) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === assetId ? { ...a, pinned: !a.pinned } : a)),
    )
  }, [])

  const updateAssetCia = useCallback(
    (assetId: string, cia: Record<CiaDimension, CiaRating>) => {
      setAssets((prev) => prev.map((a) => (a.id === assetId ? { ...a, cia } : a)))
    },
    [],
  )

  const renameAsset = useCallback((assetId: string, name: string) => {
    setAssets((prev) => prev.map((a) => (a.id === assetId ? { ...a, name } : a)))
  }, [])

  // Tree layout by dependency level. Long paths are laid out first and the grid
  // is "broken" by staggering alternate columns vertically (epic POC notes).
  const nodePositions = useMemo<Record<string, NodePosition>>(() => {
    const positions: Record<string, NodePosition> = {}
    const visited = new Set<string>()
    const levelGroups: string[][] = []

    const roots = assets.filter((a) => !relations.some((r) => r.fromAssetId === a.id))

    function assignLevel(assetId: string, level: number) {
      if (visited.has(assetId)) return
      visited.add(assetId)
      if (!levelGroups[level]) levelGroups[level] = []
      levelGroups[level].push(assetId)
      const children = relations
        .filter((r) => r.toAssetId === assetId)
        .map((r) => r.fromAssetId)
      for (const child of children) assignLevel(child, level + 1)
    }

    // Order roots by subtree size so long relation paths are placed first.
    const subtreeSize = (id: string, seen = new Set<string>()): number => {
      if (seen.has(id)) return 0
      seen.add(id)
      const children = relations.filter((r) => r.toAssetId === id).map((r) => r.fromAssetId)
      return 1 + children.reduce((sum, c) => sum + subtreeSize(c, seen), 0)
    }
    const orderedRoots = [...roots].sort((a, b) => subtreeSize(b.id) - subtreeSize(a.id))

    for (const root of orderedRoots) assignLevel(root.id, 0)
    for (const asset of assets) {
      if (!visited.has(asset.id)) {
        if (!levelGroups[0]) levelGroups[0] = []
        levelGroups[0].push(asset.id)
      }
    }

    const gapX = 70
    const gapY = 90
    const stagger = 26 // vertical offset to alternate columns and break the grid

    for (let level = 0; level < levelGroups.length; level++) {
      const group = levelGroups[level] ?? []
      const totalWidth = group.length * CARD_W + (group.length - 1) * gapX
      const startX = -totalWidth / 2
      for (let i = 0; i < group.length; i++) {
        positions[group[i]] = {
          x: startX + i * (CARD_W + gapX),
          y: level * (CARD_H + gapY) + (i % 2 === 1 ? stagger : 0),
          level,
        }
      }
    }

    return positions
  }, [assets, relations])

  return {
    assets,
    relations,
    nodePositions,
    getRelationsForAsset,
    removeRelation,
    removeRelations,
    addRelation,
    togglePin,
    updateAssetCia,
    renameAsset,
  }
}
