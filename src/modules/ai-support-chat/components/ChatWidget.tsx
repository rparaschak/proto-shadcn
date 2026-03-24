import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, X, Send, Loader2, Bot, User } from 'lucide-react'
import { useChatSessions } from '../hooks/ChatSessionsContext'

export default function ChatWidget() {
  const { sessions, widgetSessionId, widgetIsLoading, isOpen, toggle, sendWidgetMessage } = useChatSessions()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const widgetMessages = widgetSessionId
    ? sessions.find(s => s.id === widgetSessionId)?.messages ?? []
    : []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [widgetMessages.length, widgetIsLoading])

  const handleSend = () => {
    const text = input.trim()
    if (!text || widgetIsLoading) return
    sendWidgetMessage(text)
    setInput('')
  }

  return (
    <>
      <Button
        onClick={toggle}
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[380px] flex-col rounded-lg border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI Support</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {widgetMessages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground text-center">
                  Send a message to start a conversation
                </p>
              </div>
            )}
            {widgetMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'customer' ? 'justify-end' : ''}`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                    <Bot className="h-3 w-3" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === 'customer'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'customer' && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
            {widgetIsLoading && (
              <div className="flex gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="rounded-lg bg-muted px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend() }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={widgetIsLoading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={widgetIsLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
