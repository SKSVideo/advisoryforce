'use client'
import { useState } from 'react'
import { ADVISORS, getInitials } from '@/lib/data'
export default function DirectoryPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof ADVISORS[0]|null>(null)
  const filtered = ADVISORS.filter(a => `${a.first} ${a.last} ${a.specialties.join(' ')} ${a.title}`.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Advisor Directory</h1><p className="text-sm text-gray-500 mt-1">All 10 advisors — full profiles, specialties, contact info</p></div>
      <input className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm mb-5 block" style={{maxWidth:320,width:'100%'}} placeholder="Search by name or specialty..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <div className="space-y-3">
        {filtered.map(a => (
          <div key={a.id} onClick={()=>setSelected(a)} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer hover:border-purple-300 transition-all">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0" style={{background:a.color}}>{getInitials(a.first,a.last)}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-navy">{a.first} {a.last}</div>
              <div className="text-xs text-gray-500 mb-1.5">{a.title}</div>
              <div className="flex flex-wrap gap-1">{a.specialties.map(s=><span key={s} className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold">{s}</span>)}</div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${a.agreement==='Sales Agent'?'bg-yellow-50 text-yellow-800':a.agreement==='Equity'?'bg-purple-50 text-purple-700':'bg-green-50 text-green-700'}`}>{a.agreement}</span>
              <div className="flex gap-1.5">
                <button onClick={e=>{e.stopPropagation()}} className="text-xs px-2.5 py-1 border border-gray-200 rounded-md text-gray-500 hover:border-purple-300 hover:text-purple-600 transition-all font-semibold">Slack</button>
                <button onClick={e=>{e.stopPropagation()}} className="text-xs px-2.5 py-1 border border-gray-200 rounded-md text-gray-500 hover:border-purple-300 hover:text-purple-600 transition-all font-semibold">LinkedIn</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[85vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-navy">{selected.first} {selected.last}</h2><button onClick={()=>setSelected(null)} className="text-gray-400 text-xl">×</button></div>
            <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-2xl" style={{background:selected.color}}>{getInitials(selected.first,selected.last)}</div>
            <p className="text-sm text-gray-500 text-center mb-4">{selected.title}</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{selected.bio}</p>
            <div className="space-y-2.5 text-sm mb-5">
              {[['Specialties',selected.specialties.join(' · ')],['Email',selected.email],['LinkedIn','linkedin.com/in/'+selected.linkedin],['Outreach',selected.outreachManagedBy==='tek'?'Tek manages':'Self-managed']].map(([l,v])=>(
                <div key={l} className="flex gap-2"><span className="text-gray-400 font-semibold w-24 flex-shrink-0">{l}</span><span className="text-gray-700">{v}</span></div>
              ))}
              <div className="flex gap-2"><span className="text-gray-400 font-semibold w-24 flex-shrink-0">Agreement</span><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${selected.agreement==='Sales Agent'?'bg-yellow-50 text-yellow-800':selected.agreement==='Equity'?'bg-purple-50 text-purple-700':'bg-green-50 text-green-700'}`}>{selected.agreement}</span></div>
            </div>
            <div className="flex gap-2"><button className="btn-grad text-white text-sm px-4 py-2 rounded-lg font-semibold">Message on Slack</button><button className="border border-gray-200 text-sm px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold">View LinkedIn</button></div>
          </div>
        </div>
      )}
    </div>
  )
}
