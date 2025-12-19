import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Generic debounce function with proper typing
export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): (...args: Args) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Args): void => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Alternative: More specific debounce for event handlers
export function debounceEvent<T extends Event>(
  handler: (event: T) => void,
  wait: number
): (event: T) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (event: T): void => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      handler(event)
    }, wait)
  }
}

// Async debounce for API calls
export function debounceAsync<Args extends unknown[], ReturnType>(
  func: (...args: Args) => Promise<ReturnType>,
  wait: number
): (...args: Args) => Promise<ReturnType> {
  let timeout: NodeJS.Timeout | null = null
  let pendingResolve: ((value: ReturnType) => void) | null = null
  
  return (...args: Args): Promise<ReturnType> => {
    return new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout)
      }
      
      if (pendingResolve) {
        pendingResolve = null
      }
      
      timeout = setTimeout(async () => {
        try {
          const result = await func(...args)
          if (pendingResolve) {
            pendingResolve(result)
          }
          resolve(result)
        } catch (error) {
          // Handle error appropriately
          throw error
        }
      }, wait)
      
      pendingResolve = resolve
    })
  }
}

// Utility types for better TypeScript support
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>
} : T

export type Nullable<T> = T | null

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

// Date formatting
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Number formatting with locale
export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num)
}

// Percentage formatting
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

// File size formatting
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

// Color utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error('Invalid hex color')
  }
  
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  }
}

export function getContrastColor(hexColor: string): 'black' | 'white' {
  const { r, g, b } = hexToRgb(hexColor)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? 'black' : 'white'
}

// Array utilities
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Object utilities
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

// URL utilities
export function getUrlParams(url: string): Record<string, string> {
  const params: Record<string, string> = {}
  const urlObj = new URL(url, window.location.origin)
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

export function buildUrl(
  baseUrl: string,
  params: Record<string, string | number | boolean>
): string {
  const url = new URL(baseUrl, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })
  return url.toString()
}