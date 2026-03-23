export interface User {
  id: string
  name: string
  lastActivity: string
  totalVisits: number
}

export const testUsers: User[] = [
  {
    id: "USR-001",
    name: "Alice Johnson",
    lastActivity: "2024-01-15 14:23:00",
    totalVisits: 127
  },
  {
    id: "USR-002", 
    name: "Bob Smith",
    lastActivity: "2024-01-14 09:45:00",
    totalVisits: 89
  },
  {
    id: "USR-003",
    name: "Carol Davis",
    lastActivity: "2024-01-15 16:12:00", 
    totalVisits: 203
  },
  {
    id: "USR-004",
    name: "David Wilson",
    lastActivity: "2024-01-13 11:30:00",
    totalVisits: 45
  },
  {
    id: "USR-005",
    name: "Emma Brown",
    lastActivity: "2024-01-15 13:07:00",
    totalVisits: 156
  },
  {
    id: "USR-006",
    name: "Frank Miller",
    lastActivity: "2024-01-12 17:22:00",
    totalVisits: 78
  },
  {
    id: "USR-007",
    name: "Grace Lee",
    lastActivity: "2024-01-15 10:45:00",
    totalVisits: 234
  },
  {
    id: "USR-008",
    name: "Henry Garcia",
    lastActivity: "2024-01-14 15:18:00",
    totalVisits: 167
  }
]