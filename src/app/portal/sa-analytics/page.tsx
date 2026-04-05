export default function SAAnalytics() {
  const stats = [{n:'47',l:'Total leads (all time)',c:'#E8436A'},{n:'$285K',l:'Pipeline value',c:'#7B4FCC'},{n:'$142K',l:'Revenue closed',c:'#15803D'},{n:'6',l:'Deals closed',c:'#F4813F'}]
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Global Analytics</h1><p className="text-sm text-gray-500 mt-1">Performance across all tenants</p></div>
      <div className="grid grid-cols-4 gap-4 mb-6">{stats.map(s=><div key={s.l} className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-3xl font-bold mb-1" style={{color:s.c}}>{s.n}</div><div className="text-xs text-gray-500 font-medium">{s.l}</div></div>)}</div>
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center"><div className="text-gray-400 text-sm">Charts and trend data connect here once Supabase is live (Chunk 3)</div></div>
    </div>
  )
}
