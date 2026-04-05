'use client'
import { useState, useEffect } from 'react'
import { useUser } from './layout'
import { ADVISORS, SEED_ANNOUNCEMENTS, getInitials } from '@/lib/data'
import { getActivity, getLeads } from '@/lib/store'
import Link from 'next/link'

function AdvisorCard({ advisor, onClick }: { advisor: typeof ADVISORS[0]; onClick: () => void }) {
  return (
    <div onClick={onClick} className="advisor-card bg-white border border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-purple-300 hover:shadow-md">
      <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg" style={{ background: advisor.color }}>
        {getInitials(advisor.first, advisor.last)}
      </div>
      <div className="text-sm font-bold text-navy mb-0.5">{advisor.first} {advisor.last}</div>
      <div className="text-xs text-gray-500 mb-2.5 leading-snug">{advisor.title}</div>
      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {advisor.specialties.slice(0, 2).map(s => (
          <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold">{s}</span>
        ))}
      </div>
      <div className="flex gap-1.5 justify-center">
        <button onClick={e => { e.stopPropagation() }} className="text-xs px-2.5 py-1 border border-gray-200 rounded-md text-gray-500 hover:border-purple-300 hover:text-purple-600 transition-all font-semibold">Slack</button>
        <button onClick={e => { e.stopPropagation() }} className="text-xs px-2.5 py-1 border border-gray-200 rounded-md text-gray-500 hover:border-purple-300 hover:text-purple-600 transition-all font-semibold">LinkedIn</button>
      </div>
    </div>
  )
}

function AdvisorModal({ advisor, onClose }: { advisor: typeof ADVISORS[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <h2 className="text-lg font-bold text-navy">{advisor.first} {advisor.last}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-2xl" style={{ background: advisor.color }}>
          {getInitials(advisor.first, advisor.last)}
        </div>
        <p className="text-sm text-gray-500 text-center mb-5">{advisor.title}</p>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{advisor.bio}</p>
        <div className="space-y-2.5 text-sm mb-5">
          <div className="flex gap-2"><span className="text-gray-400 font-semibold w-24 flex-shrink-0">Specialties</span><span className="text-gray-700">{advisor.specialties.join(' · ')}</span></div>
          <div className="flex gap-2"><span className="text-gray-400 font-semibold w-24 flex-shrink-0">Email</span><span className="text-purple">{advisor.email}</span></div>
          <div className="flex gap-2"><span className="text-gray-400 font-semibold w-24 flex-shrink-0">Agreement</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              advisor.agreement === 'Sales Agent' ? 'bg-yellow-50 text-yellow-800' :
              advisor.agreement === 'Equity' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'
            }`}>{advisor.agreement}</span>
          </div>
          <div className="flex gap-2"><span className="text-gray-400 font-semibold w-24 flex-shrink-0">Outreach</span>
            <span className="text-gray-700">{advisor.outreachManagedBy === 'tek' ? 'Tek manages' : 'Self-managed'}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-grad text-white text-sm px-4 py-2 rounded-lg font-semibold">Message on Slack</button>
          <button className="border border-gray-200 text-sm px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold">View LinkedIn</button>
        </div>
      </div>
    </div>
  )
}

export default function PortalHome() {
  const user = useUser()
  const [selectedAdvisor, setSelectedAdvisor] = useState<typeof ADVISORS[0] | null>(null)
  const [leads] = useState(getLeads())
  const [activity] = useState(getActivity())

  const totalCommission = leads.filter(l => l.status === 'Closed Won').reduce((sum) => sum + 8750, 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Here's what's happening across the Advisory Force</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { num: '10', label: 'Active advisors', color: '#E8436A' },
          { num: leads.length.toString(), label: 'Leads in pipeline', color: '#7B4FCC' },
          { num: '$142K', label: 'Commission earned', color: '#15803D' },
          { num: '3', label: 'Deals closed', color: '#F4813F' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.num}</div>
            <div className="text-xs text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Slack banner */}
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 mb-5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: '#4A154B' }}>S</div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-navy">Advisory Force Slack</div>
          <div className="text-xs text-gray-500">Quick messages · Real-time collaboration · #advisory-force</div>
        </div>
        <button className="text-sm font-semibold text-purple-600 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-all">Join channel →</button>
      </div>

      {/* Announcement */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">New Announcement</span>
          <span className="text-xs text-gray-400 ml-auto">3 days ago · Vijay Anand</span>
        </div>
        <div className="text-sm font-semibold text-navy mb-1">Winning Ads launches April 15 — advisor beta access is ready</div>
        <div className="text-sm text-gray-600">All advisors now have access to Winning Ads beta. Your feedback is critical before public launch.</div>
      </div>

      {/* Advisor grid */}
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">The Advisory Force</div>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
        {ADVISORS.map(a => (
          <AdvisorCard key={a.id} advisor={a} onClick={() => setSelectedAdvisor(a)} />
        ))}
      </div>

      {selectedAdvisor && <AdvisorModal advisor={selectedAdvisor} onClose={() => setSelectedAdvisor(null)} />}
    </div>
  )
}
