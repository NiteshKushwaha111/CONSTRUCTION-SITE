import { Phone, Mail, MapPin, Award, Users, ShieldCheck, Clock } from 'lucide-react'
import PageHeader from '@/components/public/PageHeader'
import ContactForm from '@/components/public/ContactForm'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { getSettings } from '@/lib/services/settings.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | SKYBOUND Construction',
  description: 'Request a free consultation and project estimate from our licensed construction and architectural engineering team.',
}

export default async function ContactPage() {
  const settings = await getSettings()
  const address = settings.contact?.address
  const formattedAddress = address
    ? `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    : '123 Construction Ave, Suite 500, New York, NY 10001'

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <PageHeader
        title="Let’s Build Something Exceptional"
        subtitle="Start your construction journey with direct engineering consultation, transparent milestone budgeting, and guaranteed delivery."
        badge="Contact Us"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-[clamp(3.5rem,6vw,6rem)] border-b border-border">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Estimation Desk & Credentials */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">
                  ESTIMATION DESK
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
                  Speak Directly With Our Project Leaders
                </h2>
                <p className="text-foreground-muted text-base font-normal leading-relaxed max-w-prose mt-3">
                  Whether you are planning ground-up commercial construction, luxury residential developments, or civil infrastructure, our engineering estimators provide transparent guidance.
                </p>
              </div>

              {/* Trust Metric Tiles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <Award className="h-5 w-5 text-primary mb-2" />
                  <div className="text-base font-semibold text-foreground">
                    {settings.stats?.projectsCompleted}+ Builds
                  </div>
                  <div className="text-xs font-normal text-foreground-muted">Delivered on-time</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <ShieldCheck className="h-5 w-5 text-primary mb-2" />
                  <div className="text-base font-semibold text-foreground">
                    Licensed & Insured
                  </div>
                  <div className="text-xs font-normal text-foreground-muted">Class-A Contractor</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <Clock className="h-5 w-5 text-primary mb-2" />
                  <div className="text-base font-semibold text-foreground">
                    {settings.stats?.yearsExperience}+ Years
                  </div>
                  <div className="text-xs font-normal text-foreground-muted">Established 2003</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <Users className="h-5 w-5 text-primary mb-2" />
                  <div className="text-base font-semibold text-foreground">
                    Dedicated PM
                  </div>
                  <div className="text-xs font-normal text-foreground-muted">Direct Site Contact</div>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3 pt-2">
                <Card className="p-4 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                      Telephone Dispatch
                    </h4>
                    <p className="text-base font-bold text-foreground font-mono mt-0.5">
                      {settings.contact?.phone}
                    </p>
                    <p className="text-xs font-normal text-foreground-muted">{settings.contact?.hours || 'Mon - Fri: 7:00 AM - 6:00 PM EST'}</p>
                  </div>
                </Card>

                <Card className="p-4 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                      Estimation Email
                    </h4>
                    <p className="text-base font-bold text-foreground mt-0.5">
                      {settings.contact?.email}
                    </p>
                    <p className="text-xs font-normal text-foreground-muted">All RFPs reviewed within 24 business hours</p>
                  </div>
                </Card>

                <Card className="p-4 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                      Corporate Headquarters
                    </h4>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      {formattedAddress}
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column: Working Contact Form */}
            <div className="lg:col-span-7 bg-surface rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-border">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
                  DIRECT CONSULTATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-snug">
                  Request a Project Estimate
                </h3>
                <p className="text-sm font-normal text-foreground-muted mt-1 leading-relaxed">
                  Provide your project specifications below and an engineering estimator will prepare your complimentary feasibility review.
                </p>
              </div>

              <ContactForm defaultProjectType="Commercial Building" source="contact_page" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
