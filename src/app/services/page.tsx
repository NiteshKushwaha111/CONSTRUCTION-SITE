// app/services/page.tsx
import {
  Hammer,
  Wrench,
  Clock,
  Building2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      category: 'Residential Construction',
      icon: Hammer,
      items: [
        { name: 'Custom Home Building', desc: 'End-to-end design & construction', duration: '6–12 months' },
        { name: 'Home Additions', desc: 'Expand your living space', duration: '2–4 months' },
        { name: 'Kitchen Remodeling', desc: 'Modern & functional kitchens', duration: '4–8 weeks' },
        { name: 'Bathroom Renovation', desc: 'Luxury upgrades & fittings', duration: '3–6 weeks' },
      ],
    },
    {
      category: 'Commercial Construction',
      icon: Building2,
      items: [
        { name: 'Office Buildings', desc: 'Corporate & workspace solutions', duration: '12–24 months' },
        { name: 'Retail Spaces', desc: 'Stores & shopping centers', duration: '6–12 months' },
        { name: 'Restaurant Build-outs', desc: 'Commercial kitchens & dining', duration: '4–8 months' },
        { name: 'Warehouse Facilities', desc: 'Industrial & logistics spaces', duration: '8–16 months' },
      ],
    },
    {
      category: 'Specialized Services',
      icon: Wrench,
      items: [
        { name: 'Concrete & Foundation', desc: 'Structural & foundation work', duration: 'Varies' },
        { name: 'Roofing Solutions', desc: 'Installation & repairs', duration: '1–4 weeks' },
        { name: 'Electrical Systems', desc: 'Wiring & installations', duration: '2–6 weeks' },
        { name: 'Plumbing Services', desc: 'Complete plumbing solutions', duration: '1–4 weeks' },
      ],
    },
  ]

  const processSteps = [
    { step: '01', title: 'Consultation', desc: 'Free discussion to understand your needs' },
    { step: '02', title: 'Design & Planning', desc: 'Detailed architectural & execution plan' },
    { step: '03', title: 'Cost Estimation', desc: 'Transparent pricing & timelines' },
    { step: '04', title: 'Construction', desc: 'Execution with quality supervision' },
    { step: '05', title: 'Inspection', desc: 'Strict quality & safety checks' },
    { step: '06', title: 'Delivery', desc: 'Handover with warranty & support' },
  ]

  return (
    <main>

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-primary/30 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="theme-container relative py-24">
          <h1 className="text-5xl md:text-6xl font-extrabold max-w-4xl">
            Comprehensive <span className="text-primary">Construction</span> Services
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            From residential renovations to large-scale commercial developments,
            SKYBOUND delivers precision, safety, and lasting quality.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SERVICES */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24 space-y-24">
        {services.map((category) => (
          <div key={category.category}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <category.icon className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">
                {category.category}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.items.map((service) => (
                <div
                  key={service.name}
                  className="group bg-white p-8 rounded-2xl border shadow-sm hover:shadow-xl transition"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.desc}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                  >
                    Get Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PROCESS */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-50 py-24">
        <div className="theme-container">
          <h2 className="text-center text-3xl font-bold mb-16">
            Our 6-Step Process
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition"
              >
                <div className="text-primary text-4xl font-extrabold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA */}
      {/* ------------------------------------------------------------------ */}
      <section className="theme-container py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Need a Custom Construction Solution?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Every project is unique. Let’s discuss your requirements and build
          a solution tailored specifically for you.
        </p>

        <Link
          href="/contact"
          className="inline-block px-10 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition"
        >
          Request Free Consultation
        </Link>
      </section>

    </main>
  )
}
