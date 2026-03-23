import { Routes, Route, Navigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Users, BarChart, FileText } from "lucide-react"
import { useLocation, useNavigate } from 'react-router-dom'
import UserTable from './components/UserTable'
import ChartsPage from './components/ChartsPage'
import UserStatistics from './components/UserStatistics'
import MarkdownDocPage from '@/components/MarkdownDocPage'
import { useModuleMarkdownFiles } from '@/hooks/useModuleMarkdownFiles'
import './AnalyticsDemo1.css'

const mdFiles = import.meta.glob('./*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>

const menuItems = [
  { id: 'users', title: 'Users', icon: Users, path: '' },
  { id: 'charts', title: 'Charts', icon: BarChart, path: 'charts' },
]

export default function AnalyticsDemo1() {
  const location = useLocation()
  const navigate = useNavigate()
  const basePath = '/analytics-demo-1'
  const docFiles = useModuleMarkdownFiles(mdFiles)

  const activeItem = menuItems.find(item =>
    item.path === ''
      ? location.pathname === basePath || location.pathname === basePath + '/'
      : location.pathname.startsWith(`${basePath}/${item.path}`)
  ) || menuItems[0]

  const activeDocId = location.pathname.startsWith(`${basePath}/docs/`)
    ? location.pathname.replace(`${basePath}/docs/`, '')
    : null

  const pageTitle = activeDocId
    ? docFiles.find(f => f.id === activeDocId)?.title ?? 'Document'
    : activeItem.title

  return (
    <div className="relative h-full overflow-hidden module-sidebar-wrapper">
      <SidebarProvider className="h-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Analytics Demo 1</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path === '' ? basePath : `${basePath}/${item.path}`)}
                        isActive={!activeDocId && activeItem.id === item.id}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {docFiles.length > 0 && (
              <SidebarGroup>
                <SidebarGroupLabel>Documents</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {docFiles.map((doc) => (
                      <SidebarMenuItem key={doc.id}>
                        <SidebarMenuButton
                          onClick={() => navigate(`${basePath}/docs/${doc.id}`)}
                          isActive={activeDocId === doc.id}
                        >
                          <FileText className="w-4 h-4" />
                          <span>{doc.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-6">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-lg font-semibold">
                {pageTitle}
              </h1>
            </div>
            <Routes>
              <Route index element={<UserTable />} />
              <Route path="charts" element={<ChartsPage />} />
              <Route path="user/:userId" element={<UserStatistics />} />
              <Route path="docs/:filename" element={<MarkdownDocPage globImport={mdFiles} />} />
              <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
