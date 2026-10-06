import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full'
  as?: React.ElementType
}

export function Container({
  className,
  size = 'default',
  as: Component = 'div',
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-[1440px]',
    wide: 'max-w-[1600px]',
    full: 'max-w-full',
  }

  return (
    <Component
      className={cn(
        'w-full mx-auto px-[clamp(1rem,3vw,3rem)]',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
