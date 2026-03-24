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
import { LayoutDashboard, MessageSquare, FileText } from "lucide-react"
import { useLocation, useNavigate } from 'react-router-dom'
import MarkdownDocPage from '@/components/MarkdownDocPage'
import { useModuleMarkdownFiles } from '@/hooks/useModuleMarkdownFiles'
import DashboardPage from './components/DashboardPage'
import ChatHistoryPage from './components/ChatHistoryPage'
import ConversationDetailPage from './components/ConversationDetailPage'
import ChatWidget from './components/ChatWidget'
import { ChatSessionsProvider } from './hooks/ChatSessionsContext'
import './AiSupportChat.css'

const mdFiles = import.meta.glob('./*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>

const menuItems = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, path: '' },
  { id: 'chats', title: 'Chat History', icon: MessageSquare, path: 'chats' },
]

export default function AiSupportChat() {
  const location = useLocation()
  const navigate = useNavigate()
  const basePath = '/ai-support-chat'
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
    <ChatSessionsProvider>
    <div className="relative h-full overflow-hidden module-sidebar-wrapper">
      <SidebarProvider className="h-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>AI Support Chat</SidebarGroupLabel>
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
              <Route index element={<DashboardPage />} />
              <Route path="chats" element={<ChatHistoryPage />} />
              <Route path="chats/:chatId" element={<ConversationDetailPage />} />
              <Route path="docs/:filename" element={<MarkdownDocPage globImport={mdFiles} />} />
              <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <ChatWidget />
    </div>
    </ChatSessionsProvider>
  )
}
