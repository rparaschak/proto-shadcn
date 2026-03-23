import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp, Activity, Users } from "lucide-react"
import { Bar, BarChart, Line, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie } from "recharts"
import { visitData, sessionData, deviceData, pageViewData, engagementData, bounceRateData } from "../data/userStatistics"
import { testUsers } from "../data/testUsers"
import { useAnalyticsNavigation } from "../hooks/useAnalyticsNavigation"
import StatCard from "./StatCard"

export default function UserStatistics() {
  const { userId, navigateBack } = useAnalyticsNavigation()
  const user = testUsers.find(u => u.id === userId)

  if (!user) {
    return <div className="text-muted-foreground">User not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={navigateBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{user.name} Statistics</h1>
          <p className="text-muted-foreground">User ID: {userId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Monthly Visits" description="User visits over the last 6 months" icon={BarChart3}>
          <BarChart data={visitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visits" fill="var(--color-visits)" />
          </BarChart>
        </StatCard>

        <StatCard title="Daily Sessions" description="Session activity throughout the day" icon={LineChartIcon}>
          <LineChart data={sessionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sessions" stroke="var(--color-sessions)" strokeWidth={2} />
          </LineChart>
        </StatCard>

        <StatCard title="Device Usage" description="Distribution of device types" icon={PieChartIcon}>
          <PieChart>
            <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </StatCard>

        <StatCard title="Page Views" description="Most visited pages" icon={Activity}>
          <BarChart data={pageViewData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="page" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="views" fill="var(--color-views)" />
          </BarChart>
        </StatCard>

        <StatCard title="Engagement Rate" description="User engagement over time" icon={TrendingUp}>
          <AreaChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="engagement" stroke="var(--color-engagement)" fill="var(--color-engagement)" fillOpacity={0.3} />
          </AreaChart>
        </StatCard>

        <StatCard title="Bounce Rate" description="Weekly bounce rate percentage" icon={Users}>
          <BarChart data={bounceRateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rate" fill="var(--color-rate)" />
          </BarChart>
        </StatCard>
      </div>
    </div>
  )
}
