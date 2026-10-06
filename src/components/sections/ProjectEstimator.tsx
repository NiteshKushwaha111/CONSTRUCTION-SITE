'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, ShieldCheck, Sparkles, Building2, Home, Hammer, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ProjectTypeOption {
  id: string
  name: string
  icon: typeof Building2
  baseCostPerSqft: number
  typicalDurationMonths: number
  description: string
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'commercial',
    name: 'Commercial Complex',
    icon: Building2,
    baseCostPerSqft: 220,
    typicalDurationMonths: 14,
    description: 'Offices, retail centers, corporate headquarters, and multi-tenant facilities.',
  },
  {
    id: 'residential',
    name: 'Luxury Residential',
    icon: Home,
    baseCostPerSqft: 280,
    typicalDurationMonths: 10,
    description: 'Custom estate residences, multi-family developments, and architectural villas.',
  },
  {
    id: 'renovation',
    name: 'Full Gut Renovation',
    icon: Hammer,
    baseCostPerSqft: 140,
    typicalDurationMonths: 6,
    description: 'Structural retrofits, interior transformations, and space modernization.',
  },
  {
    id: 'specialized',
    name: 'Medical & Healthcare',
    icon: Stethoscope,
    baseCostPerSqft: 340,
    typicalDurationMonths: 16,
    description: 'Clean-rooms, ambulatory surgical suites, and specialized clinical spaces.',
  },
]

const FINISH_TIERS = [
  { id: 'standard', name: 'Standard Grade', multiplier: 1.0, desc: 'Durable, code-compliant commercial finishes' },
  { id: 'executive', name: 'Executive Architectural', multiplier: 1.25, desc: 'Custom millwork, high-efficiency glazing & acoustics' },
  { id: 'luxury', name: 'Ultra-Luxury Bespoke', multiplier: 1.6, desc: 'Imported materials, smart automation, LEED Platinum' },
]

export default function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState<string>('commercial')
  const [sqft, setSqft] = useState<number>(15000)
  const [tier, setTier] = useState<string>('executive')

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0]
  const currentTier = FINISH_TIERS.find((t) => t.id === tier) || FINISH_TIERS[1]

  const estimatedTotal = Math.round(sqft * currentType.baseCostPerSqft * currentTier.multiplier)
  const shellEstimate = Math.round(estimatedTotal * 0.42)
  const mepEstimate = Math.round(estimatedTotal * 0.28)
  const finishesEstimate = Math.round(estimatedTotal * 0.20)
  const pmoEstimate = Math.round(estimatedTotal * 0.10)

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <section className="py-[clamp(3.5rem,7vw,7rem)] bg-background text-foreground relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="theme-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[clamp(2.5rem,4.5vw,4.5rem)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-3">
            <Calculator className="h-4 w-4 text-primary shrink-0" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">
              Interactive Planning Tool
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground mb-3">
            Construction Cost <span className="text-primary">Estimator</span>
          </h2>
          <p className="text-foreground-muted text-base font-normal leading-relaxed max-w-prose mx-auto">
            Configure your project parameters below to generate an instant preliminary budget and engineering breakdown.
          </p>
        </div>

        {/* Estimator Card Grid */}
        <div className="grid lg:grid-cols-12 gap-[clamp(1.5rem,3vw,2.5rem)] items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-surface border border-border rounded-3xl p-[clamp(1.25rem,2.5vw,2rem)] space-y-6 sm:space-y-8 shadow-lg">
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
                1. Select Construction Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((t) => {
                  const Icon = t.icon
                  const isSelected = selectedType === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedType(t.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer min-h-[4.5rem] ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-md shadow-primary/10'
                          : 'border-border bg-background hover:border-primary/40'
                      }`}
                    >
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 mb-2 ${isSelected ? 'text-primary' : 'text-foreground-muted'}`} />
                      <div className="font-semibold text-sm text-foreground">{t.name}</div>
                      <div className="text-xs text-foreground-muted mt-0.5 line-clamp-1">{t.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Square Footage Slider */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  2. Gross Floor Area (GFA)
                </label>
                <span className="text-lg sm:text-xl font-bold text-primary font-mono">
                  {sqft.toLocaleString()} sq. ft.
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="80000"
                step="500"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-foreground-muted mt-2 font-mono">
                <span>1,000 sqft</span>
                <span className="hidden sm:inline">25,000 sqft</span>
                <span className="hidden sm:inline">50,000 sqft</span>
                <span>80,000+ sqft</span>
              </div>
            </div>

            {/* Step 3: Finish Tier */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
                3. Architectural Specifications & Finish Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FINISH_TIERS.map((ft) => {
                  const isSelected = tier === ft.id
                  return (
                    <button
                      key={ft.id}
                      type="button"
                      onClick={() => setTier(ft.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer min-h-[4rem] ${
                        isSelected
                          ? 'border-primary bg-primary/15'
                          : 'border-border bg-background hover:border-primary/40'
                      }`}
                    >
                      <div className="font-semibold text-xs text-foreground">{ft.name}</div>
                      <div className="text-xs text-foreground-muted mt-1 line-clamp-2">{ft.desc}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Results Column - Feature Dark Container */}
          <div className="lg:col-span-5 bg-secondary text-secondary-foreground border border-border-strong rounded-3xl p-[clamp(1.25rem,2.5vw,2rem)] shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              <Sparkles className="h-4 w-4 text-accent shrink-0" />
              <span>Preliminary Estimate Output</span>
            </div>

            {/* Fluid Cost Output */}
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-secondary-foreground tracking-tight my-2 break-words">
              {formatCurrency(estimatedTotal)}
            </div>

            <div className="text-xs text-secondary-foreground/70 mb-6">
              Range: {formatCurrency(Math.round(estimatedTotal * 0.95))} – {formatCurrency(Math.round(estimatedTotal * 1.1))}
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
              <div className="flex justify-between items-center gap-2">
                <span className="text-secondary-foreground/70 truncate">Structural Shell & Framing (42%)</span>
                <span className="font-mono font-medium text-secondary-foreground shrink-0">{formatCurrency(shellEstimate)}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-secondary-foreground/70 truncate">MEP & HVAC Systems (28%)</span>
                <span className="font-mono font-medium text-secondary-foreground shrink-0">{formatCurrency(mepEstimate)}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-secondary-foreground/70 truncate">Interior Finishes & Glazing (20%)</span>
                <span className="font-mono font-medium text-secondary-foreground shrink-0">{formatCurrency(finishesEstimate)}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-secondary-foreground/70 truncate">Management & Permitting (10%)</span>
                <span className="font-mono font-medium text-secondary-foreground shrink-0">{formatCurrency(pmoEstimate)}</span>
              </div>
            </div>

            {/* Project Timeline Indicator */}
            <div className="mt-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="block text-xs text-secondary-foreground/70">Estimated Delivery Timeframe</span>
                <span className="block text-sm font-bold text-secondary-foreground mt-0.5">
                  Approx. {currentType.typicalDurationMonths} Months Turnkey
                </span>
              </div>
              <ShieldCheck className="h-6 w-6 text-accent shrink-0" />
            </div>

            {/* Action Button */}
            <div className="mt-6 sm:mt-8">
              <Button asChild variant="primary" size="lg" className="w-full shadow-lg shadow-primary/25">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <span className="font-semibold">Request Formal Audit</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
              <p className="text-xs text-secondary-foreground/60 text-center mt-2.5">
                *Estimates reflect current Q4 materials and regional labor indices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
