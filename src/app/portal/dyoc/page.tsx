'use client'
import { useState } from 'react'
import { useUser } from '../layout'
import { getDYOCByAdvisor, updateDYOCStatus, updateDYOCStrength } from '@/lib/store'
import { DYOC_STATUS_STYLES, DYOC_STATUS_ORDER, type DYOCLead } from '@/lib/data'

export default function DYOCPage() {
  const user = useUser()
  const [leads, setLeads] = useState<DYOCLead[]>(user?.advisorId ? getDYOCByAdvisor(user.advisorId) : [])
  const [toast, setToast] = useState('')
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500) }
  function advanceStatus(id: string, current: DYOCLead['status']) {
    const idx = DYOC_STATUS_ORDER.indexOf(current)
    if (idx >= DYOC_STATUS_ORDER.length - 1) return
    const next = DYOC_STATUS_ORDER[idx + 1]
    updateDYOCStatus(id, next)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: next } : l))
    showToast('Status updated: ' + next)
  }
  function setStr(id: string, strength: DYOCLead['strength']) {
    updateDYOCStrength(id, strength)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, strength } : l))
    showToast('Relationship strength saved')
  }
  const actioned = leads.filter(l => l.status !== 'Not contacted').length
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">DYOC — Drink Your Own Champagne</h1><p className="text-sm text-gray-500 mt-1">Your AI-qualified warm introductions from your LinkedIn network</p></div>
      <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-5 flex items-center gap-4">
        <div className="flex-1"><div className="text-sm font-bold text-green-700 mb-1">{leads.length} warm intros ready for review</div><div className="text-sm text-gray-500">AI-qualified from your LinkedIn network · Rate relationship strength · Approve for outreach</div></div>
        <div className="text-right flex-shrink-0"><div className="text-2xl font-bold text-green-700">{actioned}/{leads.length}</div><div className="text-xs text-gray-500">actioned</div></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid px-5 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide" style={{gridTemplateColumns:'2fr 1.2fr 1fr 130px 90px',gap:12}}>
          <div>Contact</div><div>Company</div><div>Relationship</div><div>Status</div><div>Action</div>
        </div>
        {leads.map(lead => (
          <div key={lead.id} className="grid px-5 py-3.5 border-t border-gray-100 items-center" style={{gridTemplateColumns:'2fr 1.2fr 1fr 130px 90px',gap:12}}>
            <div><div className="text-sm font-semibold text-navy">{lead.name}</div><div className="text-xs text-gray-400">{lead.title}</div></div>
            <div><div className="text-sm text-gray-700">{lead.company}</div><div className="text-xs text-gray-400">{lead.industry}</div></div>
            <div>
              <select value={lead.strength || ''} onChange={e => setStr(lead.id, (e.target.value||null) as DYOCLead['strength'])} className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white w-full">
                <option value="">Rate strength</option>
                {['Strong','Medium','Weak','Exclude'].map(v=><option key={v}>{v}</option>)}
              </select>
            </div>
            <div><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DYOC_STATUS_STYLES[lead.status]}`}>{lead.status}</span></div>
            <div>
              <button onClick={() => advanceStatus(lead.id, lead.status)} disabled={lead.status==='Email intro sent'} className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                {lead.status==='Not contacted'?'Send msg':lead.status==='LinkedIn sent'?'Follow up':lead.status==='Responded'?'Email intro':'Done'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {toast && <div className="fixed bottom-6 right-6 bg-green-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  )
}
