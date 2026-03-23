import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { ResponsiveContainer } from "recharts"
import { chartConfig } from "../data/userStatistics"
import type { ComponentType, ReactElement } from "react"

interface StatCardProps {
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  children: ReactElement
}

export default function StatCard({ title, description, icon: Icon, children }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={200}>
            {children}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
