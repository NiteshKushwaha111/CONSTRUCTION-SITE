import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ThemePresetProvider } from '@/components/providers/ThemePresetProvider'
import ThemePresetSwitcher from '@/components/shared/ThemePresetSwitcher'
import ConditionalLayout from '@/components/layout/ConditionalLayout'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'SKYBOUND Construction | Premier Building Solutions',
  description: 'Quality general contracting, civil engineering, and construction solutions for residential and commercial developments.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <ThemePresetProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <ThemePresetSwitcher />
          </ThemePresetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}