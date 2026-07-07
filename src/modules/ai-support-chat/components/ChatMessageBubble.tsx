import { Bot, User, ThumbsUp, ThumbsDown, Headset } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ChatMessage } from '../data/chats'

interface ChatMessageBubbleProps {
  message: ChatMessage
  feedback?: 'up' | 'down'
  onRate: (value: 'up' | 'down') => void
  onContactSupport: () => void
}

export default function ChatMessageBubble({ message, feedback, onRate, onContactSupport }: ChatMessageBubbleProps) {
  const isCustomer = message.sender === 'customer'
  // Only genuine AI answers can be rated — not welcome / idle / confirmation messages.
  const canRate = message.sender === 'ai' && !message.kind

  return (
    <div className="space-y-1.5">
      <div className={`flex gap-2 ${isCustomer ? 'justify-end' : ''}`}>
        {message.sender === 'ai' && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
            <Bot className="h-3 w-3" />
          </div>
        )}
        <div
          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
            isCustomer ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          {message.text}
        </div>
        {isCustomer && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-3 w-3" />
          </div>
        )}
      </div>

      {canRate && (
        <div className="ml-8 flex items-center gap-1.5">
          {feedback !== 'down' && (
            <>
              <span className="text-xs text-muted-foreground">
                {feedback === 'up' ? 'Thanks for the feedback!' : 'Was this helpful?'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className={`h-6 w-6 ${feedback === 'up' ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => onRate('up')}
                aria-label="Helpful"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground"
                onClick={() => onRate('down')}
                aria-label="Not helpful"
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </Button>
            </>
          )}

          {feedback === 'down' && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Sorry about that.</span>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs" onClick={onContactSupport}>
                <Headset className="h-3.5 w-3.5" />
                Contact support team
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
