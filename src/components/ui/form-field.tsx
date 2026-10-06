import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  required?: boolean
  error?: string
  hint?: string
  id?: string
}

export function FormField({
  label,
  required,
  error,
  hint,
  id,
  className,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)} {...props}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs sm:text-sm font-semibold text-foreground tracking-wide"
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      {children}

      {hint && !error && (
        <p className="text-xs text-foreground-muted">{hint}</p>
      )}

      {error && (
        <p className="text-xs font-medium text-error flex items-center gap-1">
          <span>•</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
