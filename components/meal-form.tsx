"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { CheckboxGroup } from "@/components/checkbox-group"
import { ALL_ALLERGENS, ALL_PREFERENCES, DIET_TYPES } from "@/lib/constants"
import { CalendarDays, Flame, Leaf, ShieldAlert, UtensilsCrossed } from "lucide-react"

interface MealFormProps {
  availableDates: string[]
  datesLoading: boolean
  date: string
  calories: number
  dietType: string
  allergens: string[]
  prefs: string[]
  loading: boolean
  onDateChange: (date: string) => void
  onCaloriesChange: (calories: number) => void
  onDietTypeChange: (dietType: string) => void
  onAllergensChange: (allergens: string[]) => void
  onPrefsChange: (prefs: string[]) => void
  onSubmit: () => void
}

export function MealForm({
  availableDates,
  datesLoading,
  date,
  calories,
  dietType,
  allergens,
  prefs,
  loading,
  onDateChange,
  onCaloriesChange,
  onDietTypeChange,
  onAllergensChange,
  onPrefsChange,
  onSubmit,
}: MealFormProps) {
  return (
    <Card className="rounded-xl border-border/60 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <UtensilsCrossed className="size-5 text-primary" />
          Meal Planner
        </CardTitle>
        <CardDescription>
          Configure your preferences and generate a personalized meal plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Date Selector */}
        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <CalendarDays className="size-4 text-primary" />
            Date
          </Label>
          {datesLoading ? (
            <div className="flex h-9 items-center gap-2 rounded-md border border-border bg-muted/40 px-3">
              <Spinner className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Loading dates...</span>
            </div>
          ) : (
            <Select value={date} onValueChange={onDateChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a date" />
              </SelectTrigger>
              <SelectContent>
                {availableDates.map((d) => (
                  <SelectItem key={d} value={d}>
                    {new Date(d + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Calorie Limit */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="calories" className="flex items-center gap-2 text-sm font-medium">
            <Flame className="size-4 text-accent" />
            Meal Calorie Limit
          </Label>
          <Input
            id="calories"
            type="number"
            min={0}
            value={calories}
            onChange={(e) => onCaloriesChange(Number(e.target.value))}
          />
        </div>

        {/* Diet Type */}
        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Leaf className="size-4 text-accent" />
            Diet Type
          </Label>
          <Select value={dietType} onValueChange={onDietTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              {DIET_TYPES.map((dt) => (
                <SelectItem key={dt} value={dt}>
                  {dt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Allergies */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-destructive" />
            <span className="text-sm font-medium text-foreground">Allergies</span>
          </div>
          <CheckboxGroup
            label=""
            options={ALL_ALLERGENS}
            selected={allergens}
            onChange={onAllergensChange}
          />
        </div>

        {/* Preferences */}
        <CheckboxGroup
          label="Preferences"
          options={ALL_PREFERENCES}
          selected={prefs}
          onChange={onPrefsChange}
        />

        {/* Submit */}
        <Button
          size="lg"
          className="w-full cursor-pointer"
          disabled={!date || loading}
          onClick={onSubmit}
        >
          {loading ? (
            <>
              <Spinner className="size-4" />
              Generating...
            </>
          ) : (
            "Generate Meal Plan"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
