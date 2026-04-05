'use client'
import { useState } from 'react'
import { getInvites, sendInvite } from '@/lib/store'
export default function InvitePage() {
  const [invites, setInvites] = useState(getInvites())
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('advisor')
  const [agreement, setAgreement] = useState('Referral')
  const [toast, setToast] = useState('')
  function handleSend() {
    if (!email||!email.includes('@')) { setToast('Please enter a valid email'); setTimeout(()=>setToast(''),2500); return }
    sendInvite(email, role==='admin'?'Admin':'Advisor', agreement)
    setInvites(getInvites())
    setToast('Invite link sent to '+email)
    setTimeout(()=>setToast(''),2500)
    setEmail('')
  }
  const STATUS_STYLE: Record<string,string> = { active:'bg-green-50 text-green-700', invited:'bg-purple-50 text-purple-700', pending:'bg-yellow-50 text-yellow-800' }
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Invite Advisors</h1><p className="text-sm text-gray-500 mt-1">Send invite links · No manual credential sharing</p></div>
      <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-5 text-sm text-green-700">
        Advisors receive a branded email with a one-click invite link. They click, set their password, and land on the portal automatically.
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 max-w-lg">
        <div className="text-sm font-bold text-navy mb-4">Send invitation</div>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label><input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" type="email" placeholder="advisor@company.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label><select className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" value={role} onChange={e=>setRole(e.target.value)}><option value="advisor">Advisor</option><option value="admin">Admin</option></select></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Agreement</label><select className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" value={agreement} onChange={e=>setAgreement(e.target.value)}>{['Referral','Sales Agent','Both','Equity Only'].map(a=><option key={a}>{a}</option>)}</select></div>
        </div>
        <button onClick={handleSend} className="btn-grad text-white text-sm px-5 py-2.5 rounded-lg font-semibold">Send invite link</button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid px-5 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide" style={{gridTemplateColumns:'2fr 1fr 1fr 100px',gap:12}}>
          <div>Email</div><div>Role</div><div>Agreement</div><div>Status</div>
        </div>
        {invites.map((inv,i) => (
          <div key={i} className="grid px-5 py-3.5 border-t border-gray-100 items-center text-sm" style={{gridTemplateColumns:'2fr 1fr 1fr 100px',gap:12}}>
            <div className="font-medium text-navy truncate">{inv.email}</div>
            <div><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">{inv.role}</span></div>
            <div className="text-gray-500 text-xs">{inv.agreement}</div>
            <div><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[inv.status]||''}`}>{inv.status==='active'?'Active':inv.status==='invited'?'Invite sent':'Pending'}</span></div>
          </div>
        ))}
      </div>
      {toast && <div className="fixed bottom-6 right-6 bg-green-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  )
}
