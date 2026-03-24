import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Grid3x3, Search } from 'lucide-react'
import { modules } from '@/modules/registry'

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentModule = modules.find(m => location.pathname.startsWith(m.path)) || modules[0]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white w-full">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Grid3x3 className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72">
                <div className="px-3 py-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">Modules</h3>
                </div>
                <DropdownMenuSeparator />
                {modules.map((module) => (
                  <DropdownMenuItem
                    key={module.id}
                    className="flex items-center gap-3 px-3 py-2.5"
                    onClick={() => navigate(module.path)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                      <module.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{module.name}</div>
                      <div className="text-xs text-muted-foreground">{module.description}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
                <currentModule.icon className="w-4 h-4" />
              </div>
              <h1 className="text-lg font-semibold">{currentModule.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search"
                className="w-80 pl-9"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full min-h-0">
        <Outlet />
      </main>
    </div>
  )
}
