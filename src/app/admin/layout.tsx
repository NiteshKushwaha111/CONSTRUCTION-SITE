import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin CMS Console | SKYBOUND Construction',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground font-sans antialiased">{children}</div>
}
