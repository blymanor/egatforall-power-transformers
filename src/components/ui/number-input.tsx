
import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

interface NumberInputProps extends React.InputHTMLAttributes<HTMLDivElement> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
  inputClassName?: string
  buttonClassName?: string
}

const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  ({ value, onChange, min = 0, max = 100, step = 1, className, inputClassName, buttonClassName, ...props }, ref) => {
    
    const handleIncrease = () => {
      if (max !== undefined && value + step > max) return
      onChange(value + step)
    }

    const handleDecrease = () => {
      if (min !== undefined && value - step < min) return
      onChange(value - step)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10)
      if (isNaN(newValue)) return
      
      if (min !== undefined && newValue < min) {
        onChange(min)
        return
      }
      
      if (max !== undefined && newValue > max) {
        onChange(max)
        return
      }
      
      onChange(newValue)
    }

    return (
      <div 
        ref={ref}
        className={cn(
          "relative flex items-center",
          className
        )}
        {...props}
      >
        <input
          type="number"
          value={value}
          onChange={handleChange}
          className={cn(
            "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
          min={min}
          max={max}
          step={step}
        />
        <div className="absolute right-1 flex flex-col">
          <button
            type="button"
            onClick={handleIncrease}
            className={cn(
              "flex h-4 w-6 items-center justify-center rounded-sm opacity-70 hover:opacity-100",
              buttonClassName
            )}
          >
            <ChevronUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={handleDecrease}
            className={cn(
              "flex h-4 w-6 items-center justify-center rounded-sm opacity-70 hover:opacity-100",
              buttonClassName
            )}
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    )
  }
)

NumberInput.displayName = "NumberInput"

export { NumberInput }
