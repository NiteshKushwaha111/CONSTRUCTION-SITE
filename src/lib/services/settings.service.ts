import { connectDB } from '@/lib/db'
import { SiteSettings } from '@/models/SiteSettings'
import type { ISiteSettings } from '@/types'
import type { SettingsInput } from '@/lib/validations/settings.schema'

import { DEFAULT_SETTINGS } from '@/config/data'
export { DEFAULT_SETTINGS }

declare global {
  var inMemorySettings: ISiteSettings | undefined
}

function getLocalSettings(): ISiteSettings {
  if (!globalThis.inMemorySettings) {
    globalThis.inMemorySettings = { ...DEFAULT_SETTINGS }
  }
  return globalThis.inMemorySettings
}

export async function getSettings(): Promise<ISiteSettings> {
  try {
    await connectDB()
    const settings = await SiteSettings.findOne().lean<ISiteSettings>()
    if (settings) {
      return JSON.parse(JSON.stringify(settings))
    }
  } catch (error) {
    console.warn('Could not fetch settings from DB, using defaults:', error)
  }
  return getLocalSettings()
}

export async function updateSettings(data: SettingsInput): Promise<ISiteSettings> {
  try {
    await connectDB()
    let settings = await SiteSettings.findOne()
    if (!settings) {
      settings = new SiteSettings(data)
    } else {
      Object.assign(settings, data)
    }
    await settings.save()
    return JSON.parse(JSON.stringify(settings))
  } catch (error) {
    console.warn('DB unavailable for updateSettings, updating local store:', error)
    const local = getLocalSettings()
    const updated: ISiteSettings = {
      ...local,
      ...data,
      theme: {
        ...local.theme,
        ...data.theme,
        colors: (data.theme?.colors as unknown as ISiteSettings['theme']['colors']) || local.theme.colors,
      },
    }
    globalThis.inMemorySettings = updated
    return updated
  }
}
