import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MessageSquare, Users, Clock, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'

const stats = [
  { label: 'Total Conversations', value: '1,284', icon: MessageSquare, change: '+12%' },
  { label: 'Active Chats', value: '23', icon: Users, change: '+3' },
  { label: 'Avg. Response Time', value: '1.2s', icon: Clock, change: '-0.3s' },
  { label: 'Resolution Rate', value: '94%', icon: TrendingUp, change: '+2%' },
]

const recentActivity = [
  { customer: 'Sarah Johnson', action: 'opened a new chat', time: '2 min ago', status: 'active' },
  { customer: 'Michael Chen', action: 'rated support 5 stars', time: '15 min ago', status: 'closed' },
  { customer: 'Lisa Wang', action: 'sent a follow-up message', time: '32 min ago', status: 'active' },
  { customer: 'James Patel', action: 'chat resolved', time: '1 hr ago', status: 'closed' },
  { customer: 'Anna Müller', action: 'uploaded an attachment', time: '2 hr ago', status: 'closed' },
]

const topTopics = [
  { topic: 'Login Issues', count: 342, percentage: 27 },
  { topic: 'Billing & Payments', count: 256, percentage: 20 },
  { topic: 'Feature Requests', count: 198, percentage: 15 },
  { topic: 'Bug Reports', count: 167, percentage: 13 },
  { topic: 'Account Settings', count: 134, percentage: 10 },
  { topic: 'Integration Help', count: 112, percentage: 9 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest customer interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.status === 'active' ? (
                    <AlertCircle className="h-4 w-4 text-blue-500 shrink-0" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{item.customer}</span>{' '}
                      <span className="text-muted-foreground">{item.action}</span>
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Support Topics</CardTitle>
            <CardDescription>Most common conversation categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTopics.map((item) => (
                <div key={item.topic} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.topic}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{item.count}</Badge>
                      <span className="text-muted-foreground w-8 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
