import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Headset, X } from 'lucide-react'

interface ContactSupportFormProps {
  onSubmit: (email: string, note: string) => void
  onCancel: () => void
}

export default function ContactSupportForm({ onSubmit, onCancel }: ContactSupportFormProps) {
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')

  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim())

  const handleSubmit = () => {
    if (!emailValid) return
    onSubmit(email.trim(), note.trim())
  }

  return (
    <div className="rounded-lg border bg-background p-3 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Headset className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold">Contact support</h4>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onCancel} aria-label="Cancel">
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <p className="mb-3 text-xs text-muted-foreground">
        We'll share this conversation with our support team so they can follow up with more details by email.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="space-y-2"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="h-9"
          autoFocus
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything else we should know? (optional)"
          rows={2}
          className="flex w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={!emailValid}>
            Send to support
          </Button>
        </div>
      </form>
    </div>
  )
}
