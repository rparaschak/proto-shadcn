import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import { chatSessions as initialSessions, type ChatSession, type ChatMessage } from '../data/chats'

const loremResponses = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.',
  'Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.',
]

interface ChatSessionsContextValue {
  sessions: ChatSession[]
  // Widget state
  widgetSessionId: string | null
  widgetIsLoading: boolean
  isOpen: boolean
  toggle: () => void
  sendWidgetMessage: (text: string) => void
}

const ChatSessionsContext = createContext<ChatSessionsContextValue | null>(null)

export function ChatSessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>(initialSessions)
  const [widgetIsLoading, setWidgetIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const widgetSessionIdRef = useRef<string | null>(null)
  const responseIndex = useRef(0)

  const widgetSessionId = widgetSessionIdRef.current

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  const sendWidgetMessage = useCallback((text: string) => {
    const now = new Date()
    const timestamp = now.toISOString()
    const dateStr = now.toISOString().split('T')[0]

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'customer',
      text,
      timestamp,
    }

    let currentSessionId = widgetSessionIdRef.current

    if (!currentSessionId) {
      currentSessionId = `chat-live-${Date.now()}`
      widgetSessionIdRef.current = currentSessionId
      const newSession: ChatSession = {
        id: currentSessionId,
        customerName: 'You (Live Chat)',
        subject: text.length > 50 ? text.slice(0, 50) + '...' : text,
        status: 'active',
        date: dateStr,
        messages: [userMsg],
      }
      setSessions(prev => [newSession, ...prev])
    } else {
      setSessions(prev =>
        prev.map(s =>
          s.id === currentSessionId ? { ...s, messages: [...s.messages, userMsg] } : s
        )
      )
    }

    setWidgetIsLoading(true)

    const sessionIdForTimeout = currentSessionId
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'ai',
        text: loremResponses[responseIndex.current % loremResponses.length],
        timestamp: new Date().toISOString(),
      }
      responseIndex.current++

      setSessions(prev =>
        prev.map(s =>
          s.id === sessionIdForTimeout ? { ...s, messages: [...s.messages, aiMsg] } : s
        )
      )
      setWidgetIsLoading(false)
    }, 1000)
  }, [])

  return (
    <ChatSessionsContext.Provider value={{ sessions, widgetSessionId, widgetIsLoading, isOpen, toggle, sendWidgetMessage }}>
      {children}
    </ChatSessionsContext.Provider>
  )
}

export function useChatSessions() {
  const ctx = useContext(ChatSessionsContext)
  if (!ctx) throw new Error('useChatSessions must be used within ChatSessionsProvider')
  return ctx
}
