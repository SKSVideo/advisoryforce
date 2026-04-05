'use client'
import { getLeads } from '@/lib/store'
import { LEAD_STATUS_STYLES } from '@/lib/data'
export default function AllLeadsPage() {
  const leads = getLeads()
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">All Leads</h1><p className="text-sm text-gray-500 mt-1">All advisor referrals · Synced to HubSpot</p></div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid px-5 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide" style={{gridTemplateColumns:'2fr 1.5fr 1fr 1.2fr 1fr',gap:12}}>
          <div>Contact</div><div>Advisor</div><div>Deal Size</div><div>Status</div><div>Commission</div>
        </div>
        {leads.map(l => (
          <div key={l.id} className="grid px-5 py-3.5 border-t border-gray-100 items-center text-sm" style={{gridTemplateColumns:'2fr 1.5fr 1fr 1.2fr 1fr',gap:12}}>
            <div><div className="font-semibold text-navy">{l.contactName}</div><div className="text-xs text-gray-400">{l.company}</div></div>
            <div className="text-gray-500 text-xs">{l.advisorName}</div>
            <div className="font-semibold text-navy">{l.dealSize}</div>
            <div><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${LEAD_STATUS_STYLES[l.status]}`}>{l.status}</span></div>
            <div className="font-semibold text-green-700">{l.commission}</div>
          </div>
        ))}
        {leads.length===0 && <div className="px-5 py-10 text-center text-gray-400 text-sm">No leads yet</div>}
      </div>
    </div>
  )
}
