'use client'
import { useState } from 'react'
import { calculateCommission, getCommissionTier, formatCurrency } from '@/lib/data'

export default function CompensationPage() {
  const [type, setType] = useState<'referral'|'sales'>('referral')
  const [arr, setArr] = useState(125000)
  const comm = calculateCommission(arr, type)
  const tier = getCommissionTier(arr, type)
  const SPIFFS = [['3-Year Contract','+$2,500'],['Fortune 500 Logo','+$500'],['Contract > $1M','+$5,000']]
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Compensation</h1><p className="text-sm text-gray-500 mt-1">Your earnings, commission calculator and payment status</p></div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[['$8,750','Earned — paid','#15803D'],['$14,500','Pending payment','#D97706'],['$23,250','Total earned','#7B4FCC']].map(([n,l,c]) => (
          <div key={l} className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-3xl font-bold mb-1" style={{color:c}}>{n}</div><div className="text-xs text-gray-500 font-medium">{l}</div></div>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="text-base font-bold text-navy mb-1">Commission Calculator</div>
        <div className="text-sm text-gray-500 mb-5">Estimate your earnings based on deal size and agreement type</div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Agreement type</label>
          <select value={type} onChange={e => setType(e.target.value as any)} className="border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm bg-white" style={{maxWidth:300}}>
            <option value="referral">Referral Advisor (3% / 4% / 5%)</option>
            <option value="sales">Sales Agent (6% / 8% / 10%)</option>
          </select>
        </div>
        <div className="mb-5" style={{maxWidth:400}}>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deal ARR: <span style={{color:'#7B4FCC',fontWeight:700}}>{formatCurrency(arr)}</span></label>
          <input type="range" min={0} max={500000} step={5000} value={arr} onChange={e => setArr(Number(e.target.value))} className="w-full"/>
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$0</span><span>$500K</span></div>
        </div>
        <div className="rounded-xl p-5 text-center mb-5" style={{background:'linear-gradient(135deg,rgba(123,79,204,0.08),rgba(232,67,106,0.08))',border:'1px solid rgba(123,79,204,0.2)',maxWidth:300}}>
          <div className="text-sm text-gray-500 mb-1">Your estimated commission</div>
          <div className="text-4xl font-bold" style={{color:'#7B4FCC'}}>{formatCurrency(comm)}</div>
          <div className="text-xs text-gray-400 mt-1">{tier}</div>
        </div>
        <div><div className="text-sm font-bold text-navy mb-3">Bonus spiffs — stack on top</div>
          <div className="space-y-2" style={{maxWidth:300}}>
            {SPIFFS.map(([k,v]) => (
              <div key={k} className="flex justify-between text-sm px-3 py-2 bg-gray-50 rounded-lg"><span className="text-gray-700">{k}</span><span className="font-bold" style={{color:'#F4813F'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
