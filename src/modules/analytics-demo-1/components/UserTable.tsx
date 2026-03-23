import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { testUsers, type User } from "../data/testUsers"
import { useAnalyticsNavigation } from "../hooks/useAnalyticsNavigation"

export default function UserTable() {
  const { navigateToUser } = useAnalyticsNavigation()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead className="text-right">Total Visits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testUsers.map((user: User) => (
            <TableRow
              key={user.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => navigateToUser(user.id)}
            >
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.lastActivity}</TableCell>
              <TableCell className="text-right">{user.totalVisits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
