'use client'

import { motion } from 'framer-motion'
import { Award, ShieldCheck, Building2, HardHat, CheckCircle2 } from 'lucide-react'

export default function TrustStatsStrip() {
  const stats = [
    {
      icon: Building2,
      value: '250+',
      label: 'Turnkey Deliveries',
      sublabel: 'Commercial & Luxury Residential',
    },
    {
      icon: Award,
      value: '$1.2B+',
      label: 'Portfolio Valuation',
      sublabel: 'On Time & On Budget',
    },
    {
      icon: HardHat,
      value: '0',
      label: 'Lost-Time Incidents',
      sublabel: 'Over 2.4M Safe Man-Hours',
    },
    {
      icon: ShieldCheck,
      value: '20+',
      label: 'Years of Excellence',
      sublabel: 'Licensed & Insured Since 2003',
    },
  ]

  const accreditations = [
    'AGC Master Builder',
    'LEED Platinum Certified',
    'OSHA 30-Hour Standard',
    'AIA Alliance Partner',
  ]

  return (
    <section className="relative z-20 -mt-[clamp(1.5rem,3.5vw,2.75rem)] mb-[clamp(1.5rem,4vw,3rem)] theme-container">
      {/* Elevated Stats Card */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-[clamp(1.25rem,2.5vw,2rem)] shadow-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,2vw,2rem)]">
          {stats.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center sm:items-start gap-3.5 p-2 rounded-2xl"
              >
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tracking-tight leading-none">
                    {item.value}
                  </div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {item.sublabel}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Accreditation Badges Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Certified Industry Credentials:
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            {accreditations.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
