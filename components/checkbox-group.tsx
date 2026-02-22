"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface CheckboxGroupProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export function CheckboxGroup({ label, options, selected, onChange }: CheckboxGroupProps) {
  const [search, setSearch] = useState("")

  function handleToggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  const filtered = search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options

  const showSearch = options.length > 10

  return (
    <div className="flex flex-col gap-3">
      {label && <Label className="text-sm font-medium text-foreground">{label}</Label>}

      {/* Selected pills */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleToggle(item)}
              className="flex cursor-pointer items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {item}
              <span className="ml-0.5 text-primary/60">&times;</span>
            </button>
          ))}
        </div>
      )}

      {/* Search filter */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={`Search ${label.toLowerCase() || "options"}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>
      )}

      {/* Scrollable checkbox list */}
      <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${showSearch ? "max-h-48 overflow-y-auto rounded-lg border border-border/40 p-2" : ""}`}>
        {filtered.length === 0 ? (
          <p className="col-span-full py-2 text-center text-xs text-muted-foreground">
            No matches found
          </p>
        ) : (
          filtered.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 py-2 transition-colors hover:bg-muted/80 has-[button[data-state=checked]]:border-primary/40 has-[button[data-state=checked]]:bg-primary/5"
            >
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={() => handleToggle(option)}
              />
              <span className="truncate text-xs text-foreground">{option}</span>
            </label>
          ))
        )}
      </div>
    </div>
  )
}
