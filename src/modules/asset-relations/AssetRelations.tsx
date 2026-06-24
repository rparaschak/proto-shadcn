import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useRiskPicture } from './hooks/useRiskPicture'
import RiskToolbar, { type RiskFilter } from './components/RiskToolbar'
import RiskPictureView from './components/RiskPictureView'
import AssetListView from './components/AssetListView'
import RelationsListView from './components/RelationsListView'

export default function AssetRelations() {
  const data = useRiskPicture()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<RiskFilter>('all')

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-stone-900">Risk Landscape</h2>
        <p className="text-sm text-stone-500">Risk Picture · asset dependencies &amp; CIA risk</p>
      </div>

      <div className="mb-4">
        <RiskToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          onCreate={() => toast.info('Create flow not implemented in this prototype')}
          onPrint={() => toast.info('Preparing print view…')}
        />
      </div>

      <div className="min-h-0 flex-1">
        <Routes>
          <Route index element={<RiskPictureView data={data} search={search} filter={filter} />} />
          <Route path="list" element={<AssetListView data={data} search={search} />} />
          <Route path="relations" element={<RelationsListView data={data} search={search} />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </div>
  )
}
