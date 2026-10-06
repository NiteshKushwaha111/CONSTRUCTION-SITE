import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: 'default' | 'strong' | 'subtle'
}

export function Divider({
  variant = 'default',
  className,
  ...props
}: DividerProps) {
  const variantClasses = {
    subtle: 'border-border/40',
    default: 'border-border',
    strong: 'border-border-strong',
  }

  return (
    <hr
      className={cn('w-full border-t my-6 sm:my-8', variantClasses[variant], className)}
      {...props}
    />
  )
}
