import { BarChart3 } from 'lucide-react'
import type { ComponentType } from 'react'

export interface ModuleDefinition {
  id: string
  name: string
  description: string
  icon: ComponentType<{ className?: string }>
  path: string
}

export const modules: ModuleDefinition[] = [
  {
    id: 'analytics-demo-1',
    name: 'Analytics Demo 1',
    description: 'User analytics dashboard with charts',
    icon: BarChart3,
    path: '/analytics-demo-1',
  },
]
