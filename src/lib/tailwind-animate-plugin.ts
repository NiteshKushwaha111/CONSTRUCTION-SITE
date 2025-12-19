// src/lib/tailwind-animate-plugin.ts
import plugin from 'tailwindcss/plugin'

export const tailwindAnimatePlugin = plugin(({ addUtilities, theme }) => {
  addUtilities({
    '.animate-accordion-down': {
      animation: 'accordion-down 0.2s ease-out',
    },
    '.animate-accordion-up': {
      animation: 'accordion-up 0.2s ease-out',
    },
    '.animate-fade-in': {
      animation: 'fade-in 0.6s ease-out',
    },
    '.animate-slide-in': {
      animation: 'slide-in 0.3s ease-out',
    },
    '.animate-pulse-gentle': {
      animation: 'pulse-gentle 2s infinite',
    },
  })
})