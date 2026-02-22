"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MapPin, Flame, Drumstick, Wheat, Droplets, Coffee, Sun, Moon } from "lucide-react"

interface MealItem {
  Item: string
  Cals: number
  Protein: number
  Carbs: number
  Fat: number
}

interface MealCardProps {
  mealName: string
  hall: string
  items: MealItem[]
}

const mealIcons: Record<string, React.ReactNode> = {
  Breakfast: <Coffee className="size-5" />,
  Lunch: <Sun className="size-5" />,
  Dinner: <Moon className="size-5" />,
}

const mealColors: Record<string, string> = {
  Breakfast: "bg-amber-50 text-amber-700 border-amber-200",
  Lunch: "bg-sky-50 text-sky-700 border-sky-200",
  Dinner: "bg-indigo-50 text-indigo-700 border-indigo-200",
}

function formatHallName(hall: string): string {
  return hall
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function MealCard({ mealName, hall, items }: MealCardProps) {
  const totalCals = items.reduce((sum, item) => sum + (item.Cals || 0), 0)
  const totalProtein = items.reduce((sum, item) => sum + (item.Protein || 0), 0)
  const totalCarbs = items.reduce((sum, item) => sum + (item.Carbs || 0), 0)
  const totalFat = items.reduce((sum, item) => sum + (item.Fat || 0), 0)

  const colorClass = mealColors[mealName] || "bg-muted text-muted-foreground border-border"
  const icon = mealIcons[mealName] || <Sun className="size-5" />

  return (
    <Card className="overflow-hidden rounded-2xl border-border/50 shadow-sm transition-shadow hover:shadow-md">
      {/* Card Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-3">
        <div className="flex items-center gap-3">
          <div className={`flex size-10 items-center justify-center rounded-xl border ${colorClass}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{mealName}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {formatHallName(hall)}
            </div>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="flex items-center gap-1 border border-secondary bg-secondary/60 px-2.5 py-1 text-xs font-medium text-secondary-foreground"
        >
          <MapPin className="size-3" />
          {formatHallName(hall)}
        </Badge>
      </CardHeader>

      {/* Items Table */}
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Item
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center justify-center gap-1">
                    <Flame className="size-3" />
                    Cal
                  </span>
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center justify-center gap-1">
                    <Drumstick className="size-3" />
                    Protein
                  </span>
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center justify-center gap-1">
                    <Wheat className="size-3" />
                    Carbs
                  </span>
                </TableHead>
                <TableHead className="pr-6 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center justify-center gap-1">
                    <Droplets className="size-3" />
                    Fat
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow
                  key={index}
                  className="border-border/30 transition-colors hover:bg-muted/20"
                >
                  <TableCell className="pl-6 font-medium text-foreground">
                    {item.Item}
                  </TableCell>
                  <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                    {item.Cals}
                  </TableCell>
                  <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                    {item.Protein}g
                  </TableCell>
                  <TableCell className="text-center text-sm tabular-nums text-muted-foreground">
                    {item.Carbs}g
                  </TableCell>
                  <TableCell className="pr-6 text-center text-sm tabular-nums text-muted-foreground">
                    {item.Fat}g
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Totals Summary Row */}
        <div className="flex items-center justify-between border-t border-border/40 bg-muted/30 px-6 py-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Meal Totals
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
              <Flame className="size-3" />
              {totalCals} cal
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Drumstick className="size-3" />
              {totalProtein}g
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Wheat className="size-3" />
              {totalCarbs}g
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Droplets className="size-3" />
              {totalFat}g
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
