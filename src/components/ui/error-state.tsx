import * as React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Unable to Load Content',
  message = 'A temporary network interruption occurred while loading this section. Please refresh or try again.',
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-error/20 bg-error/5 p-8 sm:p-10 text-center max-w-md mx-auto flex flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      <div className="h-11 w-11 rounded-xl bg-error/10 border border-error/20 flex items-center justify-center text-error mb-4">
        <AlertCircle className="h-5 w-5" />
      </div>

      <h3 className="text-base font-bold text-foreground mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-foreground-muted mb-5 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
          Try Again
        </Button>
      )}
    </div>
  )
}
