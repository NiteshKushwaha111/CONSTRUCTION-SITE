import { Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react'
import ContactForm from '@/components/public/ContactForm'
import { Container } from '@/components/ui/container'

interface CTASectionProps {
  phone?: string
  email?: string
}

export default function CTASection({
  phone = '(555) 123-4567',
  email = 'info@skybound.com',
}: CTASectionProps) {
  return (
    <section className="py-[clamp(3.5rem,7vw,7rem)] bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Direct Consultation Value */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-accent text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>DIRECT ENGINEERING ESTIMATION</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground leading-tight tracking-tight">
              Ready to Bring Your Vision <br className="hidden sm:inline" />
              <span className="text-accent">To Reality?</span>
            </h2>

            <p className="text-base sm:text-lg font-normal text-secondary-foreground/80 leading-relaxed max-w-prose">
              Whether you are planning a high-rise commercial development, a luxury private residence, or complex structural renovation, our team delivers milestone transparency, OSHA-compliant safety, and master craftsmanship.
            </p>

            {/* Value bullets */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-secondary-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                <span>Zero-Obligation Estimate</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-secondary-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                <span>Licensed & Insured Builders</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-secondary-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                <span>3D BIM Clash Detection</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-secondary-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                <span>Dedicated Project Manager</span>
              </div>
            </div>

            {/* Quick Contact Strips with accessible touch targets */}
            <div className="space-y-3 pt-3">
              <a
                href={`tel:${phone}`}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:bg-white/10 transition-all min-h-[3.25rem]"
              >
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-accent shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-secondary-foreground/60 uppercase tracking-wider">
                    Direct Consultation Line
                  </div>
                  <div className="text-base sm:text-lg font-bold text-secondary-foreground font-mono">
                    {phone}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:bg-white/10 transition-all min-h-[3.25rem]"
              >
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-accent shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-secondary-foreground/60 uppercase tracking-wider">
                    Estimation & RFP Desk
                  </div>
                  <div className="text-base sm:text-lg font-bold text-secondary-foreground">
                    {email}
                  </div>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 min-h-[3.25rem]">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-accent shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-secondary-foreground/60 uppercase tracking-wider">
                    Guaranteed Response Window
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-accent">
                    All inquiries reviewed within 24 business hours
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-6 bg-surface text-foreground rounded-2xl p-5 sm:p-7 md:p-9 lg:p-10 shadow-2xl border border-border">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                Request a Free Estimate
              </h3>
              <p className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                Provide your project specifications below and an engineering estimator will prepare your complimentary feasibility review.
              </p>
            </div>
            <ContactForm defaultProjectType="Residential Construction" source="home_cta" />
          </div>
        </div>
      </Container>
    </section>
  )
}