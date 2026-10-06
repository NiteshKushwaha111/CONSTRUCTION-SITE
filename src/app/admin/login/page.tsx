'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Building2, Lock, Mail, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/providers/ThemeProvider'

function LoginFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get('next') || '/admin/dashboard'

  const [email, setEmail] = useState('admin@skybound.com')
  const [password, setPassword] = useState('admin123456')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeLogin = async (loginEmail: string, loginPass: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      router.push(nextUrl)
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    executeLogin(email, password)
  }

  const handleQuickDemoLogin = () => {
    setEmail('admin@skybound.com')
    setPassword('admin123456')
    executeLogin('admin@skybound.com', 'admin123456')
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleLogin} className="space-y-5">
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
            Admin Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@skybound.com"
              className="w-full pl-11 pr-4 py-3 bg-surface-muted border border-border rounded-lg text-foreground text-sm focus:border-primary focus:bg-surface outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-2">
            Master Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="w-full pl-11 pr-4 py-3 bg-surface-muted border border-border rounded-lg text-foreground text-sm focus:border-primary focus:bg-surface outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-hover shadow-xs disabled:opacity-50 transition cursor-pointer active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In to Admin Console</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* 1-Click Demo Login */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Instant 1-Click Demo Sign In</span>
        </button>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle className="h-10 w-10" />
      </div>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm mb-4">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">SKYBOUND CMS</h1>
          <p className="text-sm text-foreground-muted mt-1">
            Construction Company Management & Admin Console
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <Suspense
            fallback={
              <div className="py-12 flex flex-col items-center justify-center text-foreground-muted gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-sm">Loading security portal...</span>
              </div>
            }
          >
            <LoginFormContent />
          </Suspense>

          {/* Quick Demo Helper */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <span className="text-xs text-foreground-muted block mb-2">Default Product Credentials:</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-muted border border-border text-xs text-foreground font-mono">
              <span>admin@skybound.com</span>
              <span className="text-foreground-muted">/</span>
              <span>admin123456</span>
            </div>
          </div>
        </div>

        {/* Back to public site */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-foreground-muted hover:text-foreground transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  )
}
