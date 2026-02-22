"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { MealCard } from "./meal-card"
import { AlertCircle, UtensilsCrossed, Flame, Drumstick, Wheat, Droplets } from "lucide-react"

interface MealItem {
  Item: string
  Cals: number
  Protein: number
  Carbs: number
  Fat: number
}

interface MealData {
  hall: string
  items: MealItem[]
}

interface MealPlanResultProps {
  loading: boolean
  error: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: Record<string, MealData> | any | null
}

const MEAL_ORDER = ["Breakfast", "Lunch", "Dinner"]

function getMealEntries(result: Record<string, MealData>): [string, MealData][] {
  const entries = Object.entries(result).filter(
    ([, value]) =>
      value &&
      typeof value === "object" &&
      "hall" in value &&
      "items" in value &&
      Array.isArray(value.items)
  ) as [string, MealData][]

  // Sort by known meal order
  return entries.sort((a, b) => {
    const indexA = MEAL_ORDER.indexOf(a[0])
    const indexB = MEAL_ORDER.indexOf(b[0])
    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
}

export function MealPlanResult({ loading, error, result }: MealPlanResultProps) {
  // Loading State
  if (loading) {
    return (
      <Card className="rounded-2xl border-primary/20 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center gap-5 py-20">
          <div className="relative flex items-center justify-center">
            <div className="absolute size-16 animate-ping rounded-full bg-primary/10" />
            <div className="relative flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Spinner className="size-7 text-primary" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-sm font-medium text-foreground">
              Generating your personalized meal plan...
            </p>
            <p className="text-xs text-muted-foreground">
              Finding the best dining options for you
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Error State
  if (error) {
    return (
      <Alert variant="destructive" className="rounded-2xl">
        <AlertCircle className="size-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // Empty State
  if (!result) {
    return (
      <Card className="rounded-2xl border-dashed border-border/60 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-20">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted/60">
            <UtensilsCrossed className="size-7 text-muted-foreground/40" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-sm font-medium text-muted-foreground">
              No meal plan generated yet
            </p>
            <p className="max-w-xs text-center text-xs text-muted-foreground/70">
              Fill out the form above and click Generate to see your personalized meal plan here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Parse the meal entries
  const mealEntries = getMealEntries(result)

  // If nothing matched the expected format, show a fallback
  if (mealEntries.length === 0) {
    return (
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardContent className="py-8">
          <p className="text-center text-sm text-muted-foreground">
            Received an unexpected response format.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
            {JSON.stringify(result, null, 2)}
          </pre>
        </CardContent>
      </Card>
    )
  }

  // Calculate grand totals
  const grandTotals = mealEntries.reduce(
    (acc, [, meal]) => {
      meal.items.forEach((item) => {
        acc.cals += item.Cals || 0
        acc.protein += item.Protein || 0
        acc.carbs += item.Carbs || 0
        acc.fat += item.Fat || 0
      })
      return acc
    },
    { cals: 0, protein: 0, carbs: 0, fat: 0 }
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Section Title */}
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <UtensilsCrossed className="size-4" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Your Meal Plan</h2>
      </div>

      {/* Meal Cards */}
      {mealEntries.map(([mealName, mealData]) => (
        <MealCard
          key={mealName}
          mealName={mealName}
          hall={mealData.hall}
          items={mealData.items}
        />
      ))}

      {/* Grand Total Summary */}
      <Card className="overflow-hidden rounded-2xl border-primary/20 bg-primary/5 shadow-sm">
        <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-semibold text-foreground">
            Daily Totals
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 text-sm font-bold text-primary">
              <Flame className="size-3.5" />
              {grandTotals.cals} cal
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
              <Drumstick className="size-3" />
              {grandTotals.protein}g protein
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
              <Wheat className="size-3" />
              {grandTotals.carbs}g carbs
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
              <Droplets className="size-3" />
              {grandTotals.fat}g fat
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
