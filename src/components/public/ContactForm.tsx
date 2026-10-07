'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { leadSchema, type LeadInput } from '@/lib/validations/lead.schema'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ContactFormProps {
  defaultProjectType?: string
  source?: string
}

export default function ContactForm({
  defaultProjectType = 'Residential Construction',
  source = 'contact_page',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      projectType: defaultProjectType,
      source,
    },
  })

  const onSubmit = async (data: LeadInput) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit inquiry')
      }

      setSuccess(true)
      reset()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message)
      } else {
        setServerError('Something went wrong. Please try again or call us directly.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center space-y-4">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="text-xl font-bold text-foreground">
          Consultation Request Received
        </h3>
        <p className="text-sm text-foreground-muted max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out to Skybound Construction. Our engineering estimation desk will contact you within 24 business hours.
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline" size="sm">
          Submit Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-error/10 border border-error/20 text-error text-xs font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="fullName"
          label="Full Name"
          required
          error={errors.fullName?.message}
        >
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="e.g. Robert Mitchell"
            error={!!errors.fullName}
          />
        </FormField>

        <FormField
          id="email"
          label="Work / Personal Email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="robert@company.com"
            error={!!errors.email}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="phone"
          label="Phone Number"
          required
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(555) 123-4567"
            error={!!errors.phone}
          />
        </FormField>

        <FormField
          id="projectType"
          label="Project Discipline"
          required
          error={errors.projectType?.message}
        >
          <Select id="projectType" {...register('projectType')}>
            <option value="Commercial Building">Commercial Building</option>
            <option value="Residential Construction">Residential Construction</option>
            <option value="Renovation & Remodeling">Full Gut Renovation</option>
            <option value="Maintenance & Repairs">Institutional & Healthcare</option>
            <option value="Architectural Design">Architectural & BIM Design</option>
            <option value="Other Project">Civil Infrastructure / Other</option>
          </Select>
        </FormField>
      </div>

      <FormField id="budgetRange" label="Estimated Budget Window (Optional)">
        <Select id="budgetRange" {...register('budgetRange')}>
          <option value="">Select an estimated investment tier</option>
          <option value="$100k - $250k">$100,000 – $250,000</option>
          <option value="$250k - $500k">$250,000 – $500,000</option>
          <option value="$500k - $1M">$500,000 – $1,000,000</option>
          <option value="$1M - $5M">$1,000,000 – $5,000,000</option>
          <option value="$5M+">$5,000,000+</option>
        </Select>
      </FormField>

      <FormField
        id="message"
        label="Project Scope & Location"
        required
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={3}
          {...register('message')}
          placeholder="Please describe site address, approximate gross square footage, target groundbreaking date, or specific architectural parameters..."
          error={!!errors.message}
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full mt-2 px-4 py-3 min-h-[3rem] text-sm sm:text-base font-semibold whitespace-normal sm:whitespace-nowrap text-center"
        rightIcon={<Send className="h-4 w-4 shrink-0" />}
      >
        <span className="hidden sm:inline">Request Complimentary Feasibility Review</span>
        <span className="sm:hidden">Request Feasibility Review</span>
      </Button>
    </form>
  )
}
