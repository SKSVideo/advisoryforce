'use client'
import { useState } from 'react'
import { useUser } from '../layout'
import { getLeadsByAdvisor, addLead } from '@/lib/store'
import { LEAD_STATUS_STYLES, ADVISORS, type Lead } from '@/lib/data'

export default function MyLeads() {
  const user = useUser()
  const [leads, setLeads] = useState<Lead[]>(user?.advisorId ? getLeadsByAdvisor(user.advisorId) : [])
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({contactName:'',company:'',email:'',dealSize:'',notes:''})
  const advisor = ADVISORS.find(a => a.id === user?.advisorId)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500) }
  function submit() {
    if (!form.contactName||!form.company||!form.email) { showToast('Please fill in required fields'); return }
    if (!user?.advisorId||!advisor) return
    const lead = addLead({advisorId:user.advisorId,advisorName:advisor.first+' '+advisor.last,contactName:form.contactName,company:form.company,email:form.email,dealSize:form.dealSize||'TBD',status:'Intro Made',commission:'Calculating...',notes:form.notes})
    setLeads(prev => [lead, ...prev])
    setShowModal(false)
    setForm({contactName:'',company:'',email:'',dealSize:'',notes:''})
    showToast('Lead submitted and pushed to HubSpot · +10 pts')
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-navy">My Leads</h1><p className="text-sm text-gray-500 mt-1">Your referrals · Synced to HubSpot</p></div>
        <button onClick={() => setShowModal(true)} className="btn-grad text-white text-sm px-4 py-2.5 rounded-lg font-semibold">+ Submit new lead</button>
      </div>
      <div className="space-y-3">
        {leads.map(lead => (
          <div key={lead.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div><div className="text-base font-bold text-navy">{lead.contactName}</div><div className="text-sm text-gray-500">{lead.company} · {lead.email}</div></div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${LEAD_STATUS_STYLES[lead.status]}`}>{lead.status}</span>
            </div>
            <div className="flex flex-wrap gap-5 text-sm">
              <div><span className="text-gray-400">Deal: </span><span className="font-bold text-navy">{lead.dealSize}</span></div>
              <div><span className="text-gray-400">Commission: </span><span className="font-bold text-green-700">{lead.commission}</span></div>
              <div><span className="text-gray-400">Submitted: </span><span>{lead.date}</span></div>
              <div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${lead.synced?'bg-green-500':'bg-yellow-400'}`}/><span className="text-xs text-gray-400">{lead.synced?'Synced to HubSpot':'Syncing...'}</span></div>
            </div>
          </div>
        ))}
        {leads.length===0 && <div className="bg-white border border-gray-200 rounded-xl p-12 text-center"><div className="text-4xl mb-3">🎯</div><div className="text-base font-semibold text-navy mb-2">No leads yet</div><div className="text-sm text-gray-500 mb-4">Submit your first referral to get started</div><button onClick={() => setShowModal(true)} className="btn-grad text-white text-sm px-4 py-2 rounded-lg font-semibold">Submit a lead</button></div>}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-navy">Submit a new lead</h2><button onClick={() => setShowModal(false)} className="text-gray-400 text-xl">×</button></div>
            {[['contactName','Contact name','Jane Smith'],['company','Company','Acme Corp'],['email','Email','jane@acme.com'],['dealSize','Est. deal ARR','e.g. $75,000']].map(([k,l,p]) => (
              <div key={k} className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">{l}</label><input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder={p} value={(form as any)[k]} onChange={e => setForm(prev => ({...prev,[k]:e.target.value}))}/></div>
            ))}
            <div className="mb-5"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label><textarea className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" rows={3} value={form.notes} onChange={e => setForm(p=>({...p,notes:e.target.value}))}/></div>
            <div className="flex gap-2 justify-end"><button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-semibold">Cancel</button><button onClick={submit} className="btn-grad text-white px-4 py-2 rounded-lg text-sm font-semibold">Submit → HubSpot</button></div>
          </div>
        </div>
      )}
      {toast && <div className="fixed bottom-6 right-6 bg-green-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  )
}
