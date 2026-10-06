import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'
import {
  Inbox,
  Hammer,
  FolderGit2,
  Settings,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react'
import { getAllLeads } from '@/lib/services/lead.service'
import { getAllServices } from '@/lib/services/service.service'
import { getAllProjects } from '@/lib/services/project.service'
import { getSettings } from '@/lib/services/settings.service'

export default async function AdminDashboardPage() {
  const [leads, services, projects, settings] = await Promise.all([
    getAllLeads(),
    getAllServices(),
    getAllProjects(),
    getSettings(),
  ])

  const newLeadsCount = leads.filter((l) => l.status === 'new').length
  const recentLeads = leads.slice(0, 5)

  return (
    <AdminShell>
      <div className="space-y-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-2xl bg-surface border border-border shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Platform Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Welcome back to {settings.companyName} CMS
            </h1>
            <p className="text-sm text-foreground-muted mt-1 max-w-2xl leading-relaxed">
              Manage website content, customer leads, and company branding dynamically with real-time preview.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/leads"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-primary-hover transition shadow-xs"
            >
              Review Inquiries ({newLeadsCount})
            </Link>
            <Link
              href="/admin/settings"
              className="px-5 py-2.5 rounded-lg bg-surface-muted text-foreground text-xs font-semibold uppercase tracking-wider hover:bg-surface transition border border-border shadow-xs"
            >
              Brand Settings
            </Link>
          </div>
        </div>

        {/* KPI Stat Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Total Inquiries</span>
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                <Inbox className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground leading-none">{leads.length}</div>
            <div className="text-xs text-foreground-muted mt-2">Customer consultation submissions</div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">New Leads</span>
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-amber-500 leading-none">{newLeadsCount}</div>
            <div className="text-xs text-foreground-muted mt-2">Pending contact or triage</div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Active Services</span>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Hammer className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground leading-none">{services.length}</div>
            <div className="text-xs text-foreground-muted mt-2">Service offerings displayed online</div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Portfolio Projects</span>
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500">
                <FolderGit2 className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground leading-none">{projects.length}</div>
            <div className="text-xs text-foreground-muted mt-2">Case studies and gallery items</div>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">Recent Customer Inquiries</h2>
              <p className="text-xs text-foreground-muted mt-0.5">Latest consultation requests submitted through the website</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All Inquiries</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="text-center py-12 text-foreground-muted text-sm">
              No inquiries received yet. Submit a test form on the Contact page to test the intake flow!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-foreground-muted text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Client Name</th>
                    <th className="pb-3 font-semibold">Contact Email</th>
                    <th className="pb-3 font-semibold">Project Type</th>
                    <th className="pb-3 font-semibold">Budget</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="py-4 font-semibold text-foreground">{lead.fullName}</td>
                      <td className="py-4 text-foreground-muted">{lead.email}</td>
                      <td className="py-4 text-foreground font-medium">{lead.projectType}</td>
                      <td className="py-4 text-foreground-muted">{lead.budgetRange || 'Unspecified'}</td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                            lead.status === 'new'
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : lead.status === 'contacted'
                              ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              : lead.status === 'in_review'
                              ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                              : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <Link
                          href="/admin/leads"
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Management Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/services"
            className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all space-y-2 shadow-xs"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Hammer className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
              Manage Services
            </h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Add, update, or reorganize construction capabilities and trade offerings.
            </p>
          </Link>

          <Link
            href="/admin/projects"
            className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all space-y-2 shadow-xs"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderGit2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
              Manage Portfolio
            </h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Upload project photos, write challenges and solutions, and showcase results.
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all space-y-2 shadow-xs"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Settings className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
              Brand & Company Config
            </h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Change company name, phone, email, address, and color theme without code.
            </p>
          </Link>
        </div>
      </div>
    </AdminShell>
  )
}
