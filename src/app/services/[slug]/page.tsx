import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, CheckCircle2, ShieldCheck, Phone } from 'lucide-react'
import PageHeader from '@/components/public/PageHeader'
import ContactForm from '@/components/public/ContactForm'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getServiceBySlug, getAllServices } from '@/lib/services/service.service'
import type { Metadata } from 'next'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return { title: 'Service Not Found | SKYBOUND Construction' }
  }

  return {
    title: `${service.title} | SKYBOUND Construction`,
    description: service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const allServices = await getAllServices()
  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 4)

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <PageHeader
        title={service.title}
        subtitle={service.shortDescription}
        badge={service.category}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="py-[clamp(2.5rem,5vw,4.5rem)] border-b border-border">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Optional Cover Image */}
              {service.coverImage && (
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden shadow-lg border border-border">
                  <Image
                    src={service.coverImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Overview */}
              <Card className="p-6 sm:p-8 space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Service Scope & Technical Overview
                </h2>
                <p className="text-foreground-muted text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {service.fullDescription}
                </p>

                {/* Key Features */}
                {service.features && service.features.length > 0 && (
                  <div className="pt-6 border-t border-border space-y-4">
                    <h3 className="text-base font-bold text-foreground">
                      Key Deliverables & Specifications
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-3 rounded-lg bg-surface-muted border border-border"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* In-Page Consultation Request Form */}
              <Card className="p-6 sm:p-8 space-y-6">
                <div>
                  <Badge variant="primary" size="sm">
                    Direct Intake
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground mt-2">
                    Request a Proposal for {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted mt-1">
                    Connect directly with our engineering division overseeing this discipline.
                  </p>
                </div>

                <ContactForm defaultProjectType={service.title} source={`service_${service.slug}`} />
              </Card>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Details Card */}
              <Card className="p-6 space-y-5">
                <h4 className="text-base font-bold text-foreground pb-3 border-b border-border">
                  Service Parameters
                </h4>

                <div className="flex items-center gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-foreground-muted">Typical Schedule</div>
                    <div className="text-sm font-bold text-foreground">
                      {service.durationEstimate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-foreground-muted">Quality Assurance</div>
                    <div className="text-sm font-bold text-foreground">
                      10-Year Structural Warranty
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-foreground-muted">Direct Inquiry</div>
                    <div className="text-sm font-bold text-foreground font-mono">
                      (555) 123-4567
                    </div>
                  </div>
                </div>
              </Card>

              {/* Other Services Navigation */}
              {otherServices.length > 0 && (
                <Card className="p-6 space-y-4">
                  <h4 className="text-sm font-bold text-foreground">
                    Related Capabilities
                  </h4>
                  <div className="space-y-2">
                    {otherServices.map((other) => (
                      <Link
                        key={other.slug}
                        href={`/services/${other.slug}`}
                        className="block p-3 rounded-lg bg-surface-muted hover:bg-primary/10 hover:text-primary transition-all text-xs font-semibold text-foreground border border-border"
                      >
                        {other.title}
                      </Link>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>View all services</span>
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
