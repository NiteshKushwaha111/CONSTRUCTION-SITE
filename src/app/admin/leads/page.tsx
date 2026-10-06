'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import {
  Inbox,
  Phone,
  Mail,
  Trash2,
  Loader2,
  Calendar,
} from 'lucide-react'
import type { ILead, LeadStatus } from '@/types'

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<ILead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<ILead | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchLeads = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/leads')
      const data = await res.json()
      if (data.success) {
        setLeads(data.leads)
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      setIsUpdating(true)
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
        )
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null))
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return

    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l._id !== id))
        if (selectedLead?._id === id) setSelectedLead(null)
      }
    } catch (err) {
      console.error('Failed to delete lead:', err)
    }
  }

  const filteredLeads = leads.filter((l) => {
    if (filter === 'all') return true
    return l.status === filter
  })

  return (
    <AdminShell>
      <div className="space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Customer Leads & Inquiries</h1>
            <p className="text-sm text-foreground-muted mt-0.5">
              Review and manage incoming consultation requests from prospective clients.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {['all', 'new', 'in_review', 'contacted', 'closed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                  filter === st
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-surface text-foreground-muted hover:text-foreground border border-border hover:bg-surface-muted shadow-xs'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Leads List (2 cols) */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 shadow-xs overflow-hidden">
            {isLoading ? (
              <div className="py-20 text-center text-foreground-muted flex flex-col items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-sm">Loading customer inquiries...</span>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-20 text-center text-foreground-muted text-sm">
                <Inbox className="h-10 w-10 mx-auto text-foreground-muted/60 mb-3" />
                <span>No inquiries found matching this filter.</span>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredLeads.map((lead) => {
                  const isSelected = selectedLead?._id === lead._id

                  return (
                    <div
                      key={lead._id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-4 rounded-xl cursor-pointer transition-colors ${
                        isSelected ? 'bg-primary/10 border border-primary/30' : 'hover:bg-surface-muted/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-foreground">{lead.fullName}</h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
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
                      </div>

                      <div className="text-xs text-foreground-muted mb-2 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Project: <strong className="text-foreground">{lead.projectType}</strong></span>
                        {lead.budgetRange && (
                          <span>Budget: <strong className="text-foreground">{lead.budgetRange}</strong></span>
                        )}
                      </div>

                      <p className="text-xs text-foreground-muted line-clamp-1 italic">
                        &ldquo;{lead.message}&rdquo;
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Lead Detail Panel (1 col) */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs">
            {selectedLead ? (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">Inquiry Detail</span>
                  <h3 className="text-lg font-bold text-foreground mt-1">{selectedLead.fullName}</h3>
                  <div className="flex items-center gap-2 text-xs text-foreground-muted mt-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {selectedLead.createdAt
                        ? new Date(selectedLead.createdAt).toLocaleString()
                        : 'Recent'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border text-xs">
                  <div className="flex items-center gap-3 text-foreground">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline truncate">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <a href={`tel:${selectedLead.phone}`} className="hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-2 text-xs">
                  <div>
                    <span className="text-foreground-muted block">Requested Discipline</span>
                    <span className="text-foreground font-semibold">{selectedLead.projectType}</span>
                  </div>
                  {selectedLead.budgetRange && (
                    <div>
                      <span className="text-foreground-muted block">Estimated Budget</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedLead.budgetRange}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider block mb-2">
                    Client Message
                  </span>
                  <div className="p-4 rounded-xl bg-surface-muted border border-border text-xs text-foreground leading-relaxed whitespace-pre-line">
                    {selectedLead.message}
                  </div>
                </div>

                {/* Status Toggling */}
                <div className="pt-4 border-t border-border space-y-2">
                  <span className="text-xs font-semibold text-foreground-muted block">Update Pipeline Status</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['new', 'in_review', 'contacted', 'closed'] as LeadStatus[]).map((status) => (
                      <button
                        key={status}
                        disabled={isUpdating}
                        onClick={() => selectedLead._id && handleStatusChange(selectedLead._id, status)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                          selectedLead.status === status
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'bg-surface-muted text-foreground-muted hover:text-foreground hover:bg-surface border border-border shadow-xs'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delete button */}
                <div className="pt-4 border-t border-border">
                  <button
                    onClick={() => selectedLead._id && handleDelete(selectedLead._id)}
                    className="w-full py-2.5 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete This Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center text-foreground-muted text-xs">
                Select an inquiry from the list on the left to inspect customer details and manage lead status.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
