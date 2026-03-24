import { useChatSessions } from '../hooks/ChatSessionsContext'
import { useChatNavigation } from '../hooks/useChatNavigation'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function ChatHistoryPage() {
  const { sessions } = useChatSessions()
  const { navigateToChat } = useChatNavigation()

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">All customer support conversations</p>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Messages</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow
                key={session.id}
                className="cursor-pointer"
                onClick={() => navigateToChat(session.id)}
              >
                <TableCell className="font-mono text-xs">{session.id}</TableCell>
                <TableCell className="font-medium">{session.customerName}</TableCell>
                <TableCell>{session.subject}</TableCell>
                <TableCell className="text-muted-foreground">{session.date}</TableCell>
                <TableCell className="text-center">{session.messages.length}</TableCell>
                <TableCell>
                  <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                    {session.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
