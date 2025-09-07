"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface SimpleComboboxProps {
  options: { value: string; label: string }[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
}

export function SimpleCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  className,
  disabled = false,
}: SimpleComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const selectedOption = options.find((option) => option.value === value)
  
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <div className="relative">
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("w-full justify-between", className)}
        disabled={disabled}
        onClick={() => {
          console.log("Simple combobox clicked, current open state:", open)
          setOpen(!open)
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-sm text-gray-500">{emptyText}</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onValueChange?.(option.value === value ? "" : option.value)
                    setOpen(false)
                    setSearchValue("")
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
