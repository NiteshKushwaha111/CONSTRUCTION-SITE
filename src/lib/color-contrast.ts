import type { ThemeColors } from '@/types/theme'

/**
 * Calculates WCAG 2.1 relative luminance and contrast ratio between two hex or rgb colors.
 */

function parseColorToRgb(color: string): [number, number, number] | null {
  if (!color) return null
  const trimmed = color.trim()

  // Handle Hex
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1)
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('')
    }
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return [r, g, b]
    }
    return null
  }

  // Handle rgb/rgba
  const rgbMatch = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (rgbMatch) {
    return [parseInt(rgbMatch[1], 10), parseInt(rgbMatch[2], 10), parseInt(rgbMatch[3], 10)]
  }

  return null
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [sR, sG, sB] = [r, g, b].map((val) => {
    const channel = val / 255
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB
}

export function getContrastRatio(fg: string, bg: string): number {
  const rgb1 = parseColorToRgb(fg)
  const rgb2 = parseColorToRgb(bg)

  if (!rgb1 || !rgb2) return 1

  const l1 = getRelativeLuminance(rgb1[0], rgb1[1], rgb1[2])
  const l2 = getRelativeLuminance(rgb2[0], rgb2[1], rgb2[2])

  const brighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return Number(((brighter + 0.05) / (darker + 0.05)).toFixed(2))
}

export type WCAGLevel = 'AAA' | 'AA' | 'AA_LARGE' | 'FAIL'

export function getWCAGRating(ratio: number): {
  level: WCAGLevel
  label: string
  isPass: boolean
} {
  if (ratio >= 7.0) {
    return { level: 'AAA', label: 'AAA Enhanced (7.0+)', isPass: true }
  }
  if (ratio >= 4.5) {
    return { level: 'AA', label: 'AA Standard (4.5+)', isPass: true }
  }
  if (ratio >= 3.0) {
    return { level: 'AA_LARGE', label: 'AA Large / UI (3.0+)', isPass: true }
  }
  return { level: 'FAIL', label: 'Fails Contrast (< 3.0)', isPass: false }
}

export interface ContrastCheckResult {
  id: string
  name: string
  fgName: string
  fgColor: string
  bgName: string
  bgColor: string
  ratio: number
  level: WCAGLevel
  label: string
  isPass: boolean
  warning?: string
}

export function evaluateThemeContrast(colors: ThemeColors): {
  results: ContrastCheckResult[]
  hasFailures: boolean
  failureCount: number
} {
  const checks: {
    id: string
    name: string
    fgName: string
    fgColor: string
    bgName: string
    bgColor: string
    minRatio: number
  }[] = [
    {
      id: 'primary-button',
      name: 'Primary Button',
      fgName: 'Primary Foreground',
      fgColor: colors.primaryForeground,
      bgName: 'Primary',
      bgColor: colors.primary,
      minRatio: 4.5,
    },
    {
      id: 'secondary-button',
      name: 'Secondary / Dark Blocks',
      fgName: 'Secondary Foreground',
      fgColor: colors.secondaryForeground,
      bgName: 'Secondary',
      bgColor: colors.secondary,
      minRatio: 4.5,
    },
    {
      id: 'accent-badge',
      name: 'Accent Badges & Highlights',
      fgName: 'Accent Foreground',
      fgColor: colors.accentForeground,
      bgName: 'Accent',
      bgColor: colors.accent,
      minRatio: 3.0,
    },
    {
      id: 'page-body-text',
      name: 'Main Page Body Text',
      fgName: 'Foreground',
      fgColor: colors.foreground,
      bgName: 'Background',
      bgColor: colors.background,
      minRatio: 4.5,
    },
    {
      id: 'card-body-text',
      name: 'Card / Surface Text',
      fgName: 'Foreground',
      fgColor: colors.foreground,
      bgName: 'Surface',
      bgColor: colors.surface,
      minRatio: 4.5,
    },
    {
      id: 'muted-descriptions',
      name: 'Surface Muted Descriptions',
      fgName: 'Foreground Muted',
      fgColor: colors.foregroundMuted,
      bgName: 'Surface',
      bgColor: colors.surface,
      minRatio: 3.0,
    },
  ]

  let failureCount = 0

  const results: ContrastCheckResult[] = checks.map((c) => {
    const ratio = getContrastRatio(c.fgColor, c.bgColor)
    const rating = getWCAGRating(ratio)
    const isPass = ratio >= c.minRatio

    if (!isPass) failureCount++

    let warning: string | undefined
    if (!isPass) {
      warning = `Contrast ratio is ${ratio}:1, below the recommended ${c.minRatio}:1 threshold for ${c.name}. Adjust ${c.fgName} or ${c.bgName}.`
    }

    return {
      id: c.id,
      name: c.name,
      fgName: c.fgName,
      fgColor: c.fgColor,
      bgName: c.bgName,
      bgColor: c.bgColor,
      ratio,
      level: rating.level,
      label: rating.label,
      isPass,
      warning,
    }
  })

  return {
    results,
    hasFailures: failureCount > 0,
    failureCount,
  }
}
