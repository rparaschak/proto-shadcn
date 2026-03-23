import type { ChartConfig } from "@/components/ui/chart"

export const visitData = [
  { date: "Jan", visits: 65 },
  { date: "Feb", visits: 59 },
  { date: "Mar", visits: 80 },
  { date: "Apr", visits: 81 },
  { date: "May", visits: 56 },
  { date: "Jun", visits: 55 },
]

export const sessionData = [
  { time: "00:00", sessions: 12 },
  { time: "04:00", sessions: 5 },
  { time: "08:00", sessions: 45 },
  { time: "12:00", sessions: 67 },
  { time: "16:00", sessions: 89 },
  { time: "20:00", sessions: 34 },
]

export const deviceData = [
  { name: "Desktop", value: 45, fill: "#0088fe" },
  { name: "Mobile", value: 35, fill: "#00c49f" },
  { name: "Tablet", value: 20, fill: "#ffbb28" },
]

export const pageViewData = [
  { page: "Home", views: 234 },
  { page: "Products", views: 187 },
  { page: "About", views: 98 },
  { page: "Contact", views: 45 },
  { page: "Blog", views: 67 },
]

export const engagementData = [
  { month: "Jan", engagement: 75 },
  { month: "Feb", engagement: 82 },
  { month: "Mar", engagement: 67 },
  { month: "Apr", engagement: 91 },
  { month: "May", engagement: 88 },
  { month: "Jun", engagement: 95 },
]

export const bounceRateData = [
  { week: "Week 1", rate: 32 },
  { week: "Week 2", rate: 28 },
  { week: "Week 3", rate: 35 },
  { week: "Week 4", rate: 25 },
]

export const chartConfig = {
  visits: {
    label: "Visits",
    color: "hsl(var(--chart-1))",
  },
  sessions: {
    label: "Sessions",
    color: "hsl(var(--chart-2))",
  },
  views: {
    label: "Views",
    color: "hsl(var(--chart-3))",
  },
  engagement: {
    label: "Engagement",
    color: "hsl(var(--chart-4))",
  },
  rate: {
    label: "Bounce Rate",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig
