import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import { toast } from 'sonner'
import { chatSessions as initialSessions, type ChatSession, type ChatMessage } from '../data/chats'

const loremResponses = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.',
  'Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.',
]

const WELCOME_TEXT =
  "Hi! 👋 I'm your AI support assistant. Ask me anything about the platform and I'll do my best to help."
const IDLE_TEXT = 'Is there anything else I can help you with? 😊'
// Short so the idle behaviour is easy to demo.
const IDLE_MS = 12000

type Feedback = 'up' | 'down'

interface ChatSessionsContextValue {
  sessions: ChatSession[]
  // Widget state
  widgetSessionId: string | null
  widgetIsLoading: boolean
  isOpen: boolean
  toggle: () => void
  sendWidgetMessage: (text: string) => void
  // Feedback + support escalation
  messageFeedback: Record<string, Feedback>
  rateMessage: (messageId: string, value: Feedback) => void
  sendToSupport: (email: string, note: string) => void
}

const ChatSessionsContext = createContext<ChatSessionsContextValue | null>(null)

const preview = (text: string) => (text.length > 50 ? text.slice(0, 50) + '...' : text)

export function ChatSessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>(initialSessions)
  const [widgetIsLoading, setWidgetIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messageFeedback, setMessageFeedback] = useState<Record<string, Feedback>>({})
  const widgetSessionIdRef = useRef<string | null>(null)
  const responseIndex = useRef(0)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Keep a live handle on sessions so async callbacks read the latest transcript.
  const sessionsRef = useRef(sessions)
  sessionsRef.current = sessions

  const widgetSessionId = widgetSessionIdRef.current

  const appendMessage = useCallback((sessionId: string, message: ChatMessage) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, messages: [...s.messages, message] } : s))
    )
  }, [])

  const clearIdle = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [])

  // Proactively check in after a period of inactivity while the assistant waits on the user.
  const scheduleIdle = useCallback((sessionId: string) => {
    clearIdle()
    idleTimerRef.current = setTimeout(() => {
      const session = sessionsRef.current.find(s => s.id === sessionId)
      const last = session?.messages[session.messages.length - 1]
      if (last?.kind === 'idle') return // don't stack idle prompts
      appendMessage(sessionId, {
        id: `m-${Date.now()}`,
        sender: 'ai',
        kind: 'idle',
        text: IDLE_TEXT,
        timestamp: new Date().toISOString(),
      })
    }, IDLE_MS)
  }, [appendMessage, clearIdle])

  const open = useCallback(() => {
    setIsOpen(true)
    if (widgetSessionIdRef.current) return
    // Seed a fresh conversation with a welcome message.
    const id = `chat-live-${Date.now()}`
    widgetSessionIdRef.current = id
    const now = new Date()
    const welcome: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'ai',
      kind: 'welcome',
      text: WELCOME_TEXT,
      timestamp: now.toISOString(),
    }
    setSessions(prev => [
      {
        id,
        customerName: 'You (Live Chat)',
        subject: 'Live chat',
        status: 'active',
        date: now.toISOString().split('T')[0],
        messages: [welcome],
      },
      ...prev,
    ])
    scheduleIdle(id)
  }, [scheduleIdle])

  const close = useCallback(() => {
    setIsOpen(false)
    clearIdle()
  }, [clearIdle])

  const toggle = useCallback(() => {
    if (isOpen) close()
    else open()
  }, [isOpen, open, close])

  const sendWidgetMessage = useCallback((text: string) => {
    clearIdle()
    const now = new Date()
    const timestamp = now.toISOString()
    const dateStr = timestamp.split('T')[0]

    const userMsg: ChatMessage = { id: `m-${Date.now()}`, sender: 'customer', text, timestamp }

    let currentSessionId = widgetSessionIdRef.current

    if (!currentSessionId) {
      currentSessionId = `chat-live-${Date.now()}`
      widgetSessionIdRef.current = currentSessionId
      setSessions(prev => [
        {
          id: currentSessionId as string,
          customerName: 'You (Live Chat)',
          subject: preview(text),
          status: 'active',
          date: dateStr,
          messages: [userMsg],
        },
        ...prev,
      ])
    } else {
      setSessions(prev =>
        prev.map(s =>
          s.id === currentSessionId
            ? {
                ...s,
                subject: s.subject === 'Live chat' ? preview(text) : s.subject,
                messages: [...s.messages, userMsg],
              }
            : s
        )
      )
    }

    setWidgetIsLoading(true)

    const sessionIdForTimeout = currentSessionId
    setTimeout(() => {
      appendMessage(sessionIdForTimeout, {
        id: `m-${Date.now()}`,
        sender: 'ai',
        text: loremResponses[responseIndex.current % loremResponses.length],
        timestamp: new Date().toISOString(),
      })
      responseIndex.current++
      setWidgetIsLoading(false)
      scheduleIdle(sessionIdForTimeout)
    }, 1000)
  }, [appendMessage, clearIdle, scheduleIdle])

  const rateMessage = useCallback((messageId: string, value: Feedback) => {
    setMessageFeedback(prev => {
      const next = { ...prev }
      if (next[messageId] === value) delete next[messageId] // toggle off
      else next[messageId] = value
      return next
    })
  }, [])

  const sendToSupport = useCallback((email: string, note: string) => {
    clearIdle()
    const sessionId = widgetSessionIdRef.current
    const session = sessionId ? sessionsRef.current.find(s => s.id === sessionId) : undefined

    const transcript = (session?.messages ?? [])
      .map(m => `[${m.sender === 'ai' ? 'AI' : 'You'}] ${m.text}`)
      .join('\n')

    // Prototype: package the ticket and log it instead of sending a real email.
    const ticket = {
      email,
      note,
      sessionId,
      createdAt: new Date().toISOString(),
      transcript,
    }
    console.log('[AI Support] Escalation sent to support team:', ticket)

    toast.success('Sent to our support team', {
      description: `We've shared this conversation and will email you at ${email}.`,
    })

    if (sessionId) {
      appendMessage(sessionId, {
        id: `m-${Date.now()}`,
        sender: 'ai',
        kind: 'support-confirm',
        text: `Thanks! I've shared this conversation with our support team. They'll get back to you by email at ${email}.`,
        timestamp: new Date().toISOString(),
      })
    }
  }, [appendMessage, clearIdle])

  return (
    <ChatSessionsContext.Provider
      value={{
        sessions,
        widgetSessionId,
        widgetIsLoading,
        isOpen,
        toggle,
        sendWidgetMessage,
        messageFeedback,
        rateMessage,
        sendToSupport,
      }}
    >
      {children}
    </ChatSessionsContext.Provider>
  )
}

export function useChatSessions() {
  const ctx = useContext(ChatSessionsContext)
  if (!ctx) throw new Error('useChatSessions must be used within ChatSessionsProvider')
  return ctx
}
