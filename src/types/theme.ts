export type ThemeColors = {
  primary: string
  primaryHover: string
  primaryForeground: string

  secondary: string
  secondaryHover: string
  secondaryForeground: string

  accent: string
  accentForeground: string

  background: string
  surface: string
  surfaceMuted: string

  foreground: string
  foregroundMuted: string

  border: string
  borderStrong: string

  success: string
  warning: string
  error: string
  info: string

  overlay: string
}

export type ThemePresetId =
  | 'obsidianCopper'
  | 'deepNavy'
  | 'charcoalBrass'
  | 'graphiteTerracotta'
  | 'forestSlate'
  | 'slateOrange'

export interface ThemePreset {
  id: ThemePresetId
  name: string
  style: string
  description: string
  colors: ThemeColors
}

export interface ThemeConfig {
  presetId: ThemePresetId | 'custom'
  name: string
  colors: ThemeColors
}
