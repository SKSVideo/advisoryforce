'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginWithPassword, USERS } from '@/lib/auth'

const DEMO_ACCOUNTS = [
  { key: 'superadmin', label: 'Sundeep Sanghavi', sub: 'sundeep@videoforce.ai', role: 'Super Admin', roleColor: 'text-amber-700 bg-amber-50 border border-amber-200', initials: 'SS', color: '#E8436A' },
  { key: 'superadmin2', label: 'Harshil', sub: 'harshil@videoforce.ai', role: 'Super Admin', roleColor: 'text-amber-700 bg-amber-50 border border-amber-200', initials: 'HC', color: '#9B2FBE' },
  { key: 'admin', label: 'Vijay Anand', sub: 'vijay@videoforce.ai', role: 'Admin + Advisor', roleColor: 'text-purple-700 bg-purple-50 border border-purple-200', initials: 'VA', color: '#7B4FCC' },
  { key: 'admin2', label: 'Tek (Vrinda)', sub: 'tek@videoforce.ai', role: 'Admin', roleColor: 'text-purple-700 bg-purple-50 border border-purple-200', initials: 'VT', color: '#7B4FCC' },
  { key: 'advisor1', label: 'Jaclyn Osterloh', sub: 'jaclyn@videoforce.ai', role: 'Advisor', roleColor: 'text-green-700 bg-green-50 border border-green-200', initials: 'JO', color: '#E8436A' },
  { key: 'advisor2', label: 'Adam Frogley', sub: 'adam@frogleyads.com', role: 'Advisor', roleColor: 'text-green-700 bg-green-50 border border-green-200', initials: 'AF', color: '#0D9488' },
]

const DEMO_EMAILS: Record<string, string> = {
  superadmin: 'sundeep@videoforce.ai',
  superadmin2: 'harshil@videoforce.ai',
  admin: 'vijay@videoforce.ai',
  admin2: 'tek@videoforce.ai',
  advisor1: 'jaclyn@videoforce.ai',
  advisor2: 'adam@frogleyads.com',
}

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  // Signup fields
  const [sgFirst, setSgFirst] = useState('')
  const [sgLast, setSgLast] = useState('')
  const [sgEmail, setSgEmail] = useState('')
  const [sgPwd, setSgPwd] = useState('')
  const [sgTitle, setSgTitle] = useState('')

  function doLogin(e?: string, p?: string) {
    setError('')
    setLoading(true)
    const user = loginWithPassword(e || email, p || password)
    setLoading(false)
    if (!user) { setError('Invalid email or password. Try a demo account below.'); return }
    router.push('/portal')
  }

  function loginAs(key: string) {
    const em = DEMO_EMAILS[key]
    if (!em) return
    const user = loginWithPassword(em, 'demo123')
    if (user) router.push('/portal')
  }

  function doSignup() {
    setError('')
    if (!sgFirst || !sgLast || !sgEmail || !sgPwd) { setError('Please fill in all fields'); return }
    if (sgPwd.length < 8) { setError('Password must be at least 8 characters'); return }
    if (!sgEmail.includes('@')) { setError('Please enter a valid email'); return }
    setSuccess('Account created! You can now sign in.')
    setTab('signin')
    setEmail(sgEmail)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-10 w-full max-w-md shadow-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 grad-bg rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">AF</div>
          <h1 className="text-2xl font-bold text-navy">AdvisoryForce</h1>
          <p className="text-sm text-gray-500 mt-1">
            {tab === 'signin' ? 'Sign in to your advisor portal' : 'Create your advisor account'}
          </p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm mb-4">{success}</div>}

        {tab === 'signin' ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" onKeyDown={e => e.key === 'Enter' && doLogin()} />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && doLogin()} />
            </div>
            <button className="btn-grad w-full py-3 rounded-lg text-white font-semibold text-sm" onClick={() => doLogin()} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              New advisor?{' '}
              <button className="text-purple font-semibold" onClick={() => setTab('signup')}>Create account</button>
            </p>

            {/* Demo accounts */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Demo accounts — try any role</p>
              <div className="space-y-2">
                {DEMO_ACCOUNTS.map(acc => (
                  <button key={acc.key} onClick={() => loginAs(acc.key)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ background: acc.color }}>
                      {acc.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800">{acc.label}</div>
                      <div className="text-xs text-gray-400 truncate">{acc.sub}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${acc.roleColor}`}>{acc.role}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">First name</label>
                <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" value={sgFirst} onChange={e => setSgFirst(e.target.value)} placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last name</label>
                <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" value={sgLast} onChange={e => setSgLast(e.target.value)} placeholder="Smith" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" type="email" value={sgEmail} onChange={e => setSgEmail(e.target.value)} placeholder="jane@company.com" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password <span className="text-gray-400 font-normal">(min 8 chars)</span></label>
              <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" type="password" value={sgPwd} onChange={e => setSgPwd(e.target.value)} />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title / Role</label>
              <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm" value={sgTitle} onChange={e => setSgTitle(e.target.value)} placeholder="CMO at Acme Corp" />
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 mb-4">
              Tip: If you received an invite link, use that — it auto-confirms your account.
            </div>
            <button className="btn-grad w-full py-3 rounded-lg text-white font-semibold text-sm" onClick={doSignup}>Create account</button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{' '}
              <button className="text-purple font-semibold" onClick={() => setTab('signin')}>Sign in</button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
