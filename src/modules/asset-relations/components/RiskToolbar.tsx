import { NavLink } from 'react-router-dom'
import { Plus, Search, Filter, Printer, ChevronDown, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type RiskFilter = 'all' | 'flagged' | 'high'

interface RiskToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  filter: RiskFilter
  onFilterChange: (filter: RiskFilter) => void
  onCreate: () => void
  onPrint: () => void
}

const BASE = '/asset-relations'
const views = [
  { label: 'List', to: `${BASE}/list`, end: false },
  { label: 'Relations', to: `${BASE}/relations`, end: false },
  { label: 'Risk Picture', to: BASE, end: true },
]

const filterLabels: Record<RiskFilter, string> = {
  all: 'All assets',
  flagged: 'Flagged only',
  high: 'High risk',
}

export default function RiskToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  onCreate,
  onPrint,
}: RiskToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onCreate}>New asset</DropdownMenuItem>
          <DropdownMenuItem onClick={onCreate}>New relation</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Segmented view control */}
      <div className="inline-flex rounded-md border border-stone-200 bg-stone-100/70 p-0.5">
        {views.map((v) => (
          <NavLink
            key={v.label}
            to={v.to}
            end={v.end}
            className={({ isActive }) =>
              `rounded px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`
            }
          >
            {v.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search"
            className="h-9 w-44 pl-8"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1.5">
              <Filter className="h-4 w-4" />
              {filterLabels[filter]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(filterLabels) as RiskFilter[]).map((key) => (
              <DropdownMenuItem key={key} onClick={() => onFilterChange(key)} className="justify-between">
                {filterLabels[key]}
                {filter === key && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={onPrint}
          className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  )
}
