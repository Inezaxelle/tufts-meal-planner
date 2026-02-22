"use client"

import { useEffect, useState, useCallback } from "react"
import { MealForm } from "@/components/meal-form"
import { MealPlanResult } from "@/components/meal-plan-result"
import { UtensilsCrossed } from "lucide-react"

const API_BASE = "https://dfood.up.railway.app"

export default function MealPlannerPage() {
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [datesLoading, setDatesLoading] = useState(true)
  const [date, setDate] = useState("")
  const [calories, setCalories] = useState(500)
  const [allergens, setAllergens] = useState<string[]>([])
  const [prefs, setPrefs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any | null>(null)

  // Fetch available dates on mount
  useEffect(() => {
    async function fetchDates() {
      try {
        const res = await fetch(`${API_BASE}/api/available-dates`)
        if (!res.ok) throw new Error("Failed to fetch available dates")
        const data = await res.json()
        setAvailableDates(data)
      } catch {
        setError("Unable to load available dates. Please try again later.")
      } finally {
        setDatesLoading(false)
      }
    }
    fetchDates()
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!date) return

    // Clear previous results
    setResult(null)
    setError(null)
    setLoading(true)

    try {
      const params = new URLSearchParams()
      params.append("date", date)
      params.append("calories", String(calories))
      allergens.forEach((a) => params.append("allergens", a))
      prefs.forEach((p) => params.append("prefs", p))

      const res = await fetch(`${API_BASE}/api/plan?${params.toString()}`)

      if (res.status === 422) {
        const body = await res.json().catch(() => null)
        throw new Error(
          body?.detail || body?.message || "Validation error. Please check your inputs."
        )
      }

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }, [date, calories, allergens, prefs])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-4 py-8 text-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
              Smart Meal Planner
            </h1>
          </div>
          <p className="text-sm text-muted-foreground text-pretty">
            Plan your dining based on calories, allergies, and preferences
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
        <MealForm
          availableDates={availableDates}
          datesLoading={datesLoading}
          date={date}
          calories={calories}
          allergens={allergens}
          prefs={prefs}
          loading={loading}
          onDateChange={setDate}
          onCaloriesChange={setCalories}
          onAllergensChange={setAllergens}
          onPrefsChange={setPrefs}
          onSubmit={handleSubmit}
        />

        <MealPlanResult loading={loading} error={error} result={result} />
      </main>
    </div>
  )
}
