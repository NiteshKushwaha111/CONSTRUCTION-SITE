import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, defaultChecked, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked ?? false)

    React.useEffect(() => {
      if (checked !== undefined) setIsChecked(checked)
    }, [checked])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked)
      onChange?.(e)
    }

    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-center gap-2.5 text-sm font-medium text-foreground cursor-pointer select-none',
          className
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            checked={isChecked}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'h-5 w-5 rounded-md border transition-all duration-200 flex items-center justify-center',
              isChecked
                ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                : 'border-border bg-surface hover:border-border-strong'
            )}
          >
            {isChecked && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
          </div>
        </div>
        {label && <span>{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'
