import { z } from 'zod'

const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
const colorStringRegex = /^(#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})|rgba?\(.+?\))$/

export const hexColorSchema = z
  .string()
  .regex(hexColorRegex, 'Must be a valid hex color code (e.g. #C46A2B)')

export const colorStringSchema = z
  .string()
  .regex(colorStringRegex, 'Must be a valid hex or rgba color string')

export const themeColorsSchema = z.object({
  primary: hexColorSchema,
  primaryHover: hexColorSchema,
  primaryForeground: hexColorSchema,

  secondary: hexColorSchema,
  secondaryHover: hexColorSchema,
  secondaryForeground: hexColorSchema,

  accent: hexColorSchema,
  accentForeground: hexColorSchema,

  background: hexColorSchema,
  surface: hexColorSchema,
  surfaceMuted: hexColorSchema,

  foreground: hexColorSchema,
  foregroundMuted: hexColorSchema,

  border: hexColorSchema,
  borderStrong: hexColorSchema,

  success: hexColorSchema,
  warning: hexColorSchema,
  error: hexColorSchema,
  info: hexColorSchema,

  overlay: colorStringSchema,
})

export const themePresetIdSchema = z.enum([
  'obsidianCopper',
  'deepNavy',
  'charcoalBrass',
  'graphiteTerracotta',
  'forestSlate',
  'slateOrange',
])

export const themeConfigSchema = z.object({
  presetId: z.union([themePresetIdSchema, z.literal('custom')]),
  name: z.string().min(1, 'Theme name is required'),
  colors: themeColorsSchema,
})

export type ThemeColorsInput = z.infer<typeof themeColorsSchema>
export type ThemeConfigInput = z.infer<typeof themeConfigSchema>
