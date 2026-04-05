'use client'
import { useState } from 'react'
import { getTenants, createTenant } from '@/lib/store'
import type { Tenant } from '@/lib/data'
export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(getTenants())
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({name:'',industry:'CPG',slackUrl:'',logo:'',color:'#7B4FCC'})
  const [toast, setToast] = useState('')
  function handleCreate() {
    if (!form.name) { setToast('Company name required'); setTimeout(()=>setToast(''),2500); return }
    const t = createTenant({name:form.name,industry:form.industry,slackUrl:form.slackUrl,logo:form.name.slice(0,2).toUpperCase(),color:form.color})
    setTenants(getTenants())
    setShowModal(false)
    setToast('Workspace created for '+form.name)
    setTimeout(()=>setToast(''),2500)
    setForm({name:'',industry:'CPG',slackUrl:'',logo:'',color:'#7B4FCC'})
  }
  const STATS = [{id:'vf',advisors:10,leads:24,deals:3},{id:'demo1',advisors:0,leads:0,deals:0},{id:'demo2',advisors:0,leads:0,deals:0}]
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-navy">All Tenants</h1><p className="text-sm text-gray-500 mt-1">Manage all company workspaces</p></div>
        <button onClick={()=>setShowModal(true)} className="btn-grad text-white text-sm px-4 py-2.5 rounded-lg font-semibold">+ New workspace</button>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mb-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{background:'linear-gradient(135deg,#F59E0B,#EF4444)'}}>SA</div>
        <div className="text-sm text-amber-800 font-medium">Super Admin — you have full visibility and control across all company workspaces</div>
      </div>
      <div className="grid gap-4" style={{gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))'}}>
        {tenants.map(t => {
          const stats = STATS.find(s=>s.id===t.id)||{advisors:0,leads:0,deals:0}
          return (
            <div key={t.id} className="bg-white border rounded-xl p-5 cursor-pointer hover:shadow-md transition-all" style={{borderColor:t.id==='vf'?'#E8436A':'#E5E7EB'}}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base mb-3" style={{background:t.id==='vf'?'var(--grad)':t.color}}>{t.logo}</div>
              <div className="text-base font-bold text-navy mb-0.5">{t.name}</div>
              <div className="text-xs text-gray-400 mb-3">{t.industry}</div>
              <div className="flex gap-4 text-xs text-gray-500 mb-4">
                <span><strong className="text-gray-800">{stats.advisors}</strong> advisors</span>
                <span><strong className="text-gray-800">{stats.leads}</strong> leads</span>
                <span><strong className="text-gray-800">{stats.deals}</strong> deals</span>
              </div>
              <div className="flex gap-2">
                <button className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-all">Open →</button>
                <button className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-all">Settings</button>
              </div>
            </div>
          )
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={()=>setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-navy">New company workspace</h2><button onClick={()=>setShowModal(false)} className="text-gray-400 text-xl">×</button></div>
            <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Company name</label><input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" placeholder="Coca-Cola" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></div>
            <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Industry</label><select className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white" value={form.industry} onChange={e=>setForm(p=>({...p,industry:e.target.value}))}>{['CPG','DTC / eCommerce','QSR','Retail','SaaS','Agency','Other'].map(i=><option key={i}>{i}</option>)}</select></div>
            <div className="mb-5"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary admin email</label><input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" type="email" placeholder="admin@company.com" value={form.slackUrl} onChange={e=>setForm(p=>({...p,slackUrl:e.target.value}))}/></div>
            <div className="flex gap-2 justify-end"><button onClick={()=>setShowModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-semibold">Cancel</button><button onClick={handleCreate} className="btn-grad text-white px-4 py-2 rounded-lg text-sm font-semibold">Create workspace</button></div>
          </div>
        </div>
      )}
      {toast && <div className="fixed bottom-6 right-6 bg-green-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  )
}
