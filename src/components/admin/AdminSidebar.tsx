'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Building2,
  LayoutDashboard,
  Inbox,
  Hammer,
  FolderGit2,
  Settings,
  Palette,
  ExternalLink,
  LogOut,
} from 'lucide-react'

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Leads & Inquiries', href: '/admin/leads', icon: Inbox },
  { name: 'Services', href: '/admin/services', icon: Hammer },
  { name: 'Projects & Portfolio', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Theme & Brand Colors', href: '/admin/settings/theme', icon: Palette },
  { name: 'Company Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch {
      router.push('/admin/login')
    }
  }

  return (
    <aside className="w-64 shrink-0 bg-surface border-r border-border flex flex-col min-h-screen">
      {/* Brand header */}
      <div className="h-16 flex items-center px-6 border-b border-border gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <span className="text-sm font-bold text-foreground tracking-tight block">SKYBOUND</span>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Admin CMS</span>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="p-4 space-y-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'text-foreground-muted hover:text-foreground hover:bg-surface-muted font-medium'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-1.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
