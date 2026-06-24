// Risk Picture data model — assets, CIA ratings, and dependency relations.
// CIA = Confidentiality / Integrity / Availability. Each dimension carries an
// *assessed* level (set by the risk owner) and a *calculated* level (derived by
// the system). When calculated > assessed, the card raises a flag on that
// dimension (epic NEUP-12685: "flag where calculated risk is higher than assessed").

export type RiskLevel = 'low' | 'medium' | 'high'

export const RISK_ORDER: Record<RiskLevel, number> = {
  low: 0,
  medium: 1,
  high: 2,
}

export type CiaDimension = 'c' | 'i' | 'a'

export interface CiaRating {
  assessed: RiskLevel
  calculated: RiskLevel
}

export interface Asset {
  id: string
  name: string
  source: string
  pinned: boolean
  cia: Record<CiaDimension, CiaRating>
}

export interface Relation {
  id: string
  /** The dependent asset (the one that "depends on" the target). */
  fromAssetId: string
  /** The asset being depended on. */
  toAssetId: string
  type: 'depends_on'
}

/** Dimensions where the calculated level exceeds the assessed level. */
export function flaggedDimensions(asset: Asset): CiaDimension[] {
  return (['c', 'i', 'a'] as CiaDimension[]).filter(
    (dim) => RISK_ORDER[asset.cia[dim].calculated] > RISK_ORDER[asset.cia[dim].assessed],
  )
}

export function hasFlag(asset: Asset): boolean {
  return flaggedDimensions(asset).length > 0
}

const lvl = (assessed: RiskLevel, calculated: RiskLevel = assessed): CiaRating => ({
  assessed,
  calculated,
})

// Mirrors the target design: assets A–G, all sourced from "Data Centre".
// Asset E and Asset G carry flagged dimensions (calculated > assessed).
export const assets: Asset[] = [
  {
    id: 'a',
    name: 'Asset A',
    source: 'Data Centre',
    pinned: false,
    cia: { c: lvl('low'), i: lvl('low'), a: lvl('low') },
  },
  {
    id: 'b',
    name: 'Asset B',
    source: 'Data Centre',
    pinned: false,
    cia: { c: lvl('low'), i: lvl('medium'), a: lvl('low') },
  },
  {
    id: 'c',
    name: 'Asset C',
    source: 'Data Centre',
    pinned: false,
    cia: { c: lvl('low'), i: lvl('low'), a: lvl('medium') },
  },
  {
    id: 'd',
    name: 'Asset D',
    source: 'Data Centre',
    pinned: false,
    cia: { c: lvl('low'), i: lvl('low'), a: lvl('low') },
  },
  {
    id: 'e',
    name: 'Asset E',
    source: 'Data Centre',
    pinned: false,
    cia: { c: lvl('low'), i: lvl('low', 'high'), a: lvl('medium', 'high') },
  },
  {
    id: 'f',
    name: 'Asset F',
    source: 'Data Centre',
    pinned: true,
    cia: { c: lvl('low'), i: lvl('low'), a: lvl('low') },
  },
  {
    id: 'g',
    name: 'Asset G',
    source: 'Data Centre',
    pinned: false,
    cia: { c: lvl('low', 'high'), i: lvl('low', 'high'), a: lvl('low') },
  },
]

// Child `depends_on` parent. Produces three levels:
//   level 0 (roots): A, B   level 1: C, D, E   level 2: F, G
export const relations: Relation[] = [
  { id: 'r1', fromAssetId: 'd', toAssetId: 'b', type: 'depends_on' },
  { id: 'r2', fromAssetId: 'd', toAssetId: 'a', type: 'depends_on' },
  { id: 'r3', fromAssetId: 'c', toAssetId: 'a', type: 'depends_on' },
  { id: 'r4', fromAssetId: 'e', toAssetId: 'a', type: 'depends_on' },
  { id: 'r5', fromAssetId: 'f', toAssetId: 'd', type: 'depends_on' },
  { id: 'r6', fromAssetId: 'f', toAssetId: 'c', type: 'depends_on' },
  { id: 'r7', fromAssetId: 'g', toAssetId: 'c', type: 'depends_on' },
  { id: 'r8', fromAssetId: 'g', toAssetId: 'e', type: 'depends_on' },
]
