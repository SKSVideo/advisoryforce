import { USERS } from '@/lib/data'
export default function SAUsers() {
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">All Users</h1><p className="text-sm text-gray-500 mt-1">Every user across all tenants</p></div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid px-5 py-3 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wide" style={{gridTemplateColumns:'2fr 1fr 1fr 80px',gap:12}}>
          <div>User</div><div>Tenant</div><div>Role</div><div>Status</div>
        </div>
        {USERS.map(u=>(
          <div key={u.id} className="grid px-5 py-3.5 border-t border-gray-100 items-center text-sm" style={{gridTemplateColumns:'2fr 1fr 1fr 80px',gap:12}}>
            <div><div className="font-semibold text-navy">{u.name}</div><div className="text-xs text-gray-400">{u.email}</div></div>
            <div className="text-gray-500 text-xs">VideoForce.ai</div>
            <div><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.role==='superadmin'?'bg-amber-50 text-amber-700':u.role==='admin'?'bg-purple-50 text-purple-700':'bg-green-50 text-green-700'}`}>{u.role==='superadmin'?'Super Admin':u.role==='admin'?u.isAdvisor?'Admin + Advisor':'Admin':'Advisor'}</span></div>
            <div><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">Active</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}
