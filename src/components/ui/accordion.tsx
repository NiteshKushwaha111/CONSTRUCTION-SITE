'use client'

import * as React from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultOpenId?: string
  className?: string
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<Record<string, boolean>>(() => {
    return defaultOpenId ? { [defaultOpenId]: true } : {}
  })

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={cn('divide-y divide-border border-y border-border', className)}>
      {items.map((item) => {
        const isOpen = !!openIds[item.id]
        return (
          <div key={item.id} className="py-4 sm:py-5">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between text-left text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md cursor-pointer group"
              aria-expanded={isOpen}
            >
              <span className="pr-4">{item.question}</span>
              <div className="h-8 w-8 rounded-lg bg-surface-muted border border-border flex items-center justify-center text-foreground-muted group-hover:border-primary group-hover:text-primary transition-colors shrink-0">
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </div>
            </button>

            {isOpen && (
              <div className="pt-3 pr-12 text-sm sm:text-base text-foreground-muted leading-relaxed animate-in fade-in-50 duration-200">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
