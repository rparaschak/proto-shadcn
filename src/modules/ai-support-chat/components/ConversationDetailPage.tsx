import { useChatSessions } from '../hooks/ChatSessionsContext'
import { useChatNavigation } from '../hooks/useChatNavigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Bot, User } from 'lucide-react'

export default function ConversationDetailPage() {
  const { sessions } = useChatSessions()
  const { chatId, navigateBack } = useChatNavigation()
  const session = sessions.find(s => s.id === chatId)

  if (!session) {
    return <p className="text-muted-foreground">Conversation not found.</p>
  }

  const formatTime = (timestamp: string) => {
    const d = new Date(timestamp)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={navigateBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{session.customerName}</h2>
          <p className="text-sm text-muted-foreground">{session.subject}</p>
        </div>
        <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
          {session.status}
        </Badge>
        <span className="text-sm text-muted-foreground">{session.date}</span>
      </div>

      <div className="space-y-4">
        {session.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'ai' ? 'justify-end' : ''}`}
          >
            {msg.sender === 'customer' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User className="h-4 w-4" />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg px-4 py-3 ${
                msg.sender === 'customer'
                  ? 'bg-blue-50 text-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">{formatTime(msg.timestamp)}</p>
            </div>
            {msg.sender === 'ai' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <Bot className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
