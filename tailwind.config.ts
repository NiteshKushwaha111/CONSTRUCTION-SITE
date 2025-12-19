// import { tailwindAnimatePlugin } from '@/lib/tailwind-animate-plugin'
// import type { Config } from 'tailwindcss'

// const config: Config = {
//   darkMode: 'class',
//   content: [
//     './src/pages/**/*.{ts,tsx}',
//     './src/components/**/*.{ts,tsx}',
//     './src/app/**/*.{ts,tsx}',
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: '2rem',
//       screens: {
//         '2xl': '1400px',
//       },
//     },
//     extend: {
//       colors: {
//         border: 'hsl(var(--border))',
//         input: 'hsl(var(--input))',
//         ring: 'hsl(var(--ring))',
//         background: 'hsl(var(--background))',
//         foreground: 'hsl(var(--foreground))',
//         primary: {
//           DEFAULT: '#0A6EBD',  // Construction blue
//           foreground: '#ffffff',
//           50: '#eff6ff',
//           100: '#dbeafe',
//           200: '#bfdbfe',
//           300: '#93c5fd',
//           400: '#60a5fa',
//           500: '#3b82f6',
//           600: '#2563eb',
//           700: '#1d4ed8',
//           800: '#1e40af',
//           900: '#1e3a8a',
//         },
//         secondary: {
//           DEFAULT: '#F59E0B',  // Construction yellow
//           foreground: '#000000',
//           50: '#fffbeb',
//           100: '#fef3c7',
//           200: '#fde68a',
//           300: '#fcd34d',
//           400: '#fbbf24',
//           500: '#f59e0b',
//           600: '#d97706',
//           700: '#b45309',
//           800: '#92400e',
//           900: '#78350f',
//         },
//         accent: {
//           DEFAULT: '#10B981',  // Construction green
//           foreground: '#ffffff',
//         },
//         destructive: {
//           DEFAULT: '#ef4444',
//           foreground: '#fafafa',
//         },
//         muted: {
//           DEFAULT: '#f8fafc',
//           foreground: '#64748b',
//         },
//         card: {
//           DEFAULT: '#ffffff',
//           foreground: '#020817',
//         },
//       },
//       fontFamily: {
//         sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
//         heading: ['var(--font-heading)', 'Georgia', 'serif'],
//       },
//       borderRadius: {
//         lg: '0.5rem',
//         md: '0.375rem',
//         sm: '0.25rem',
//       },
//       keyframes: {
//         'accordion-down': {
//           from: { height: '0' },
//           to: { height: 'var(--radix-accordion-content-height)' },
//         },
//         'accordion-up': {
//           from: { height: 'var(--radix-accordion-content-height)' },
//           to: { height: '0' },
//         },
//         'fade-in': {
//           from: { opacity: '0', transform: 'translateY(10px)' },
//           to: { opacity: '1', transform: 'translateY(0)' },
//         },
//         'slide-in': {
//           from: { transform: 'translateX(-100%)' },
//           to: { transform: 'translateX(0)' },
//         },
//         'pulse-gentle': {
//           '0%, 100%': { opacity: '1' },
//           '50%': { opacity: '0.8' },
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//         'fade-in': 'fade-in 0.6s ease-out',
//         'slide-in': 'slide-in 0.3s ease-out',
//         'pulse-gentle': 'pulse-gentle 2s infinite',
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-construction': 'linear-gradient(135deg, #0A6EBD 0%, #10B981 100%)',
//       },
//     },
//   },
//   plugins: [tailwindAnimatePlugin],
// }

// export default config

// tailwind.config.ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',  // Max width
      },
    },
    extend: {
      colors: {
        border: '#e5e7eb',
        input: '#e5e7eb',
        background: '#ffffff',
        foreground: '#020817',
        primary: {
          DEFAULT: '#0A6EBD',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          foreground: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Georgia', 'serif'],
      },
    },
  },
}

export default config