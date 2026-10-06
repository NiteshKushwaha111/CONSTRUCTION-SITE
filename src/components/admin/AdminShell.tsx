'use client'

import Link from 'next/link'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { ThemeToggle } from '@/components/providers/ThemeProvider'
import { ExternalLink, ShieldCheck } from 'lucide-react'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-surface/90 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CMS Live System</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface-muted text-foreground-muted hover:text-foreground text-xs font-semibold transition-colors shadow-xs hover:border-primary/50"
            >
              <span>View Public Site</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <ThemeToggle className="h-9 w-9" />

            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-border text-xs text-foreground-muted">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>
                Role: <strong className="text-foreground font-semibold">Super Admin</strong>
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
