import type { ThemePreset, ThemePresetId, ThemeColors, ThemeConfig } from '@/types/theme'

export const THEME_PRESETS: Record<ThemePresetId, ThemePreset> = {
  obsidianCopper: {
    id: 'obsidianCopper',
    name: 'Obsidian Copper',
    style: 'Premium Construction',
    description: 'Recommended default theme. Warm copper accents anchored by deep architectural obsidian tones.',
    colors: {
      primary: '#C46A2B',
      primaryHover: '#A94D1F',
      primaryForeground: '#FFFFFF',

      secondary: '#171A1D',
      secondaryHover: '#292D31',
      secondaryForeground: '#FFFFFF',

      accent: '#E09A5B',
      accentForeground: '#171A1D',

      background: '#F7F5F2',
      surface: '#FFFFFF',
      surfaceMuted: '#F0EDE8',

      foreground: '#171A1D',
      foregroundMuted: '#6B7280',

      border: '#E5E1DB',
      borderStrong: '#D2CDC5',

      success: '#2F7D57',
      warning: '#B7791F',
      error: '#B54444',
      info: '#3E718F',

      overlay: 'rgba(23, 26, 29, 0.65)',
    },
  },

  deepNavy: {
    id: 'deepNavy',
    name: 'Deep Navy',
    style: 'Corporate / Engineering / Established Construction',
    description: 'Authoritative deep marine palettes engineered for corporate contractors and civic developers.',
    colors: {
      primary: '#17324D',
      primaryHover: '#10283D',
      primaryForeground: '#FFFFFF',

      secondary: '#0B1623',
      secondaryHover: '#162536',
      secondaryForeground: '#FFFFFF',

      accent: '#3E7FA3',
      accentForeground: '#FFFFFF',

      background: '#F5F7F9',
      surface: '#FFFFFF',
      surfaceMuted: '#EAF0F4',

      foreground: '#16202A',
      foregroundMuted: '#667482',

      border: '#DCE3E8',
      borderStrong: '#CBD5DD',

      success: '#2F7D57',
      warning: '#B7791F',
      error: '#B54444',
      info: '#3E7FA3',

      overlay: 'rgba(11, 22, 35, 0.65)',
    },
  },

  charcoalBrass: {
    id: 'charcoalBrass',
    name: 'Charcoal Brass',
    style: 'Luxury / Premium Builder / Real Estate',
    description: 'Refined brass and charcoal aesthetic tailored for custom residential architects and high-end estates.',
    colors: {
      primary: '#B68A3A',
      primaryHover: '#94702E',
      primaryForeground: '#FFFFFF',

      secondary: '#202326',
      secondaryHover: '#303438',
      secondaryForeground: '#FFFFFF',

      accent: '#D2AA5A',
      accentForeground: '#202326',

      background: '#F6F5F2',
      surface: '#FFFFFF',
      surfaceMuted: '#EEEBE4',

      foreground: '#202326',
      foregroundMuted: '#6D6D68',

      border: '#E2E0D9',
      borderStrong: '#D0CDC3',

      success: '#2F7D57',
      warning: '#B7791F',
      error: '#B54444',
      info: '#3E718F',

      overlay: 'rgba(32, 35, 38, 0.65)',
    },
  },

  graphiteTerracotta: {
    id: 'graphiteTerracotta',
    name: 'Graphite Terracotta',
    style: 'Modern Architecture / Earthy / Contemporary Construction',
    description: 'Warm earthen terracotta balanced with structural graphite for modern design-build firms.',
    colors: {
      primary: '#B9573A',
      primaryHover: '#97452F',
      primaryForeground: '#FFFFFF',

      secondary: '#242628',
      secondaryHover: '#333639',
      secondaryForeground: '#FFFFFF',

      accent: '#D98262',
      accentForeground: '#242628',

      background: '#F8F6F3',
      surface: '#FFFFFF',
      surfaceMuted: '#F0EBE6',

      foreground: '#242628',
      foregroundMuted: '#73706C',

      border: '#E5E0DA',
      borderStrong: '#D3CBC3',

      success: '#2F7D57',
      warning: '#B7791F',
      error: '#B54444',
      info: '#3E718F',

      overlay: 'rgba(36, 38, 40, 0.65)',
    },
  },

  forestSlate: {
    id: 'forestSlate',
    name: 'Forest Slate',
    style: 'Sustainable Construction / Green Buildings / Modern Residential',
    description: 'Deep forest greens and mineral slate conveying sustainability, LEED excellence, and eco-architecture.',
    colors: {
      primary: '#315C4A',
      primaryHover: '#254838',
      primaryForeground: '#FFFFFF',

      secondary: '#1F2925',
      secondaryHover: '#2C3934',
      secondaryForeground: '#FFFFFF',

      accent: '#71947F',
      accentForeground: '#FFFFFF',

      background: '#F4F6F3',
      surface: '#FFFFFF',
      surfaceMuted: '#E9EEE9',

      foreground: '#202923',
      foregroundMuted: '#68736D',

      border: '#DDE3DE',
      borderStrong: '#CBD3CC',

      success: '#2F7D57',
      warning: '#B7791F',
      error: '#B54444',
      info: '#3E718F',

      overlay: 'rgba(31, 41, 37, 0.65)',
    },
  },

  slateOrange: {
    id: 'slateOrange',
    name: 'Slate Orange',
    style: 'Construction / Infrastructure / Engineering',
    description: 'High-visibility industrial amber orange with durable steel slate for infrastructure & civil works.',
    colors: {
      primary: '#C65D28',
      primaryHover: '#A84B1F',
      primaryForeground: '#FFFFFF',

      secondary: '#29313A',
      secondaryHover: '#37414B',
      secondaryForeground: '#FFFFFF',

      accent: '#E28A52',
      accentForeground: '#20262D',

      background: '#F5F7F8',
      surface: '#FFFFFF',
      surfaceMuted: '#EDEFF1',

      foreground: '#20262D',
      foregroundMuted: '#69737D',

      border: '#DEE3E7',
      borderStrong: '#CAD2D8',

      success: '#2F7D57',
      warning: '#B7791F',
      error: '#B54444',
      info: '#3E718F',

      overlay: 'rgba(41, 49, 58, 0.65)',
    },
  },
}

export const DEFAULT_THEME_PRESET_ID: ThemePresetId = 'obsidianCopper'

export function getDefaultThemeConfig(): ThemeConfig {
  const preset = THEME_PRESETS[DEFAULT_THEME_PRESET_ID]
  return {
    presetId: preset.id,
    name: preset.name,
    colors: { ...preset.colors },
  }
}

export type ThemePresetKey = ThemePresetId
