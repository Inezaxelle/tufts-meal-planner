"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CheckboxGroupProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export function CheckboxGroup({ label, options, selected, onChange }: CheckboxGroupProps) {
  function handleToggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-muted/40 px-3 py-2.5 transition-colors hover:bg-muted/80 has-[button[data-state=checked]]:border-primary/40 has-[button[data-state=checked]]:bg-primary/5"
          >
            <Checkbox
              checked={selected.includes(option)}
              onCheckedChange={() => handleToggle(option)}
            />
            <span className="text-sm text-foreground">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
