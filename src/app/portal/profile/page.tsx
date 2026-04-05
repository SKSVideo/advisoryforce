'use client'
import { useState } from 'react'
import { useUser } from '../layout'
import { ADVISORS, getInitials } from '@/lib/data'
import { useRouter } from 'next/navigation'
export default function ProfilePage() {
  const user = useUser()
  const router = useRouter()
  const advisor = ADVISORS.find(a => a.id === user?.advisorId)
  const [form, setForm] = useState({first:advisor?.first||'',last:advisor?.last||'',title:advisor?.title||'',bio:advisor?.bio||'',linkedin:advisor?.linkedin||'',specialties:advisor?.specialties.join(', ')||'',outreach:advisor?.outreachManagedBy||'self'})
  const [toast, setToast] = useState('')
  function save() {
    if (advisor) {
      advisor.first=form.first; advisor.last=form.last; advisor.title=form.title
      advisor.bio=form.bio; advisor.linkedin=form.linkedin
      advisor.specialties=form.specialties.split(',').map(s=>s.trim()).filter(Boolean)
      advisor.outreachManagedBy=form.outreach as any
    }
    setToast('Profile saved successfully')
    setTimeout(()=>setToast(''),2500)
  }
  if (!advisor) return <div className="text-gray-500 text-sm">No advisor profile found.</div>
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">My Profile</h1><p className="text-sm text-gray-500 mt-1">Update your bio, specialties and contact information</p></div>
      <div className="bg-white border border-gray-200 rounded-xl p-7 max-w-xl">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2" style={{background:advisor.color}}>{getInitials(form.first||'?',form.last||'?')}</div>
        <p className="text-xs text-gray-400 mb-5">Click to upload headshot (Phase 2)</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[['first','First name','Jane'],['last','Last name','Smith']].map(([k,l,p])=>(
            <div key={k}><label className="block text-sm font-semibold text-gray-700 mb-1.5">{l}</label><input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder={p} value={(form as any)[k]} onChange={e=>setForm(prev=>({...prev,[k]:e.target.value}))}/></div>
          ))}
        </div>
        {[['title','Title / Role','CMO at Acme'],['linkedin','LinkedIn handle','yourhandle']].map(([k,l,p])=>(
          <div key={k} className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">{l}</label><input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder={p} value={(form as any)[k]} onChange={e=>setForm(prev=>({...prev,[k]:e.target.value}))}/></div>
        ))}
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label><textarea className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" rows={4} value={form.bio} onChange={e=>setForm(p=>({...p,bio:e.target.value}))}/></div>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Specialties <span className="text-gray-400 font-normal">(comma separated)</span></label><input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" value={form.specialties} onChange={e=>setForm(p=>({...p,specialties:e.target.value}))}/></div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">DYOC outreach management</label>
          <div className="space-y-2">
            {[['self',"I'll manage my own outreach"],['tek',"Tek manages outreach on my behalf"]].map(([v,l])=>(
              <label key={v} className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="outreach" value={v} checked={form.outreach===v} onChange={e=>setForm(p=>({...p,outreach:e.target.value}))} className="text-purple-600"/>
                <span className="text-sm text-gray-700">{l}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={()=>router.push('/portal')} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-semibold hover:bg-gray-50">Cancel</button>
          <button onClick={save} className="btn-grad text-white px-4 py-2 rounded-lg text-sm font-semibold">Save changes</button>
        </div>
      </div>
      {toast && <div className="fixed bottom-6 right-6 bg-green-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  )
}
