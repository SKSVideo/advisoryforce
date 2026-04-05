'use client'
import { useEffect, useState, createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getSession, logout, isSuperAdmin, isAdmin, isAdvisor } from '@/lib/auth'
import { getUnreadCount } from '@/lib/store'
import type { User } from '@/lib/data'
import Link from 'next/link'

const UserContext = createContext<User | null>(null)
export const useUser = () => useContext(UserContext)

function NavItem({ href, icon, label, badge, superadmin }: {
  href: string; icon: React.ReactNode; label: string; badge?: number | string; superadmin?: boolean
}) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(href + '/')
  return (
    <Link href={href}
      className={`nav-item flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-0.5 ${
        active
          ? superadmin ? 'bg-amber-50 text-amber-700 font-semibold' : 'bg-purple-50 text-purple-700 font-semibold'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
      }`}>
      <span className="w-4 h-4 flex-shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: '#E8436A' }}>{badge}</span>
      ) : null}
    </Link>
  )
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [unread, setUnread] = useState(0)
  const [advisorMode, setAdvisorMode] = useState(false)

  useEffect(() => {
    const u = getSession()
    if (!u) { router.replace('/login'); return }
    setUser(u)
    setUnread(getUnreadCount(u.id))
  }, [router])

  function doLogout() { logout(); router.replace('/login') }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 rounded-lg grad-bg animate-pulse" />
    </div>
  )

  const showAdminNav = isAdmin(user) && !advisorMode
  const showAdvisorNav = isAdvisor(user) && (user.role === 'advisor' || advisorMode)
  const showSuperNav = isSuperAdmin(user) && !advisorMode

  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen flex flex-col">
        {/* NAV */}
        <nav className="bg-white border-b border-gray-200 h-15 flex items-center px-6 sticky top-0 z-50" style={{ height: 60 }}>
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-8 h-8 grad-bg rounded-lg flex items-center justify-center text-white font-bold text-sm">AF</div>
            <span className="font-bold text-navy text-base">AdvisoryForce</span>
            <span className="text-xs font-semibold text-white px-2 py-0.5 rounded-full" style={{ background: 'var(--grad)' }}>VideoForce.ai</span>
            {user.role === 'superadmin' && (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full ml-1">Super Admin</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Dual role toggle for admin+advisors */}
            {user.role === 'admin' && user.isAdvisor && (
              <button
                onClick={() => setAdvisorMode(!advisorMode)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
                style={advisorMode
                  ? { background: '#F0FDF4', color: '#15803D', borderColor: '#BBF7D0' }
                  : { background: '#EEF2FF', color: '#7B4FCC', borderColor: '#C7D2FE' }}>
                {advisorMode ? '← Admin view' : 'My advisor view'}
              </button>
            )}
            <span className="text-sm text-gray-500">{user.name}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              user.role === 'superadmin' ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : user.role === 'admin' ? 'bg-purple-50 text-purple-700'
              : 'bg-green-50 text-green-700'
            }`}>
              {user.role === 'superadmin' ? 'Super Admin' : user.role === 'admin' ? advisorMode ? 'Advisor' : 'Admin' : 'Advisor'}
            </span>
            <button onClick={doLogout} className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all">Sign out</button>
          </div>
        </nav>

        <div className="flex flex-1">
          {/* SIDEBAR */}
          <aside className="w-56 bg-white border-r border-gray-200 py-5 px-3 flex-shrink-0 overflow-y-auto" style={{ minHeight: 'calc(100vh - 60px)' }}>

            {/* Super Admin section */}
            {showSuperNav && (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">Super Admin</div>
                  <div className="text-xs text-amber-600 mt-0.5">All tenants · Global view</div>
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">Global</div>
                <NavItem href="/portal/tenants" superadmin icon={<GridIcon/>} label="All Tenants" />
                <NavItem href="/portal/sa-analytics" superadmin icon={<ChartIcon/>} label="Global Analytics" />
                <NavItem href="/portal/sa-users" superadmin icon={<UsersIcon/>} label="All Users" />
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2 mt-4">VideoForce.ai</div>
              </>
            )}

            {/* Admin section */}
            {showAdminNav && (
              <>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">Dashboard</div>
                <NavItem href="/portal" icon={<HomeIcon/>} label="Overview" />
                <NavItem href="/portal/directory" icon={<UsersIcon/>} label="Advisors" />
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2 mt-4">Pipeline</div>
                <NavItem href="/portal/all-leads" icon={<LeadsIcon/>} label="All Leads" badge={24} />
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2 mt-4">Engage</div>
                <NavItem href="/portal/leaderboard" icon={<TrophyIcon/>} label="Leaderboard" />
                <NavItem href="/portal/feed" icon={<FeedIcon/>} label="Activity Feed" />
                <NavItem href="/portal/events" icon={<CalIcon/>} label="Events" badge={2} />
                <NavItem href="/portal/polls" icon={<PollIcon/>} label="Polls" />
                <NavItem href="/portal/announcements" icon={<BellIcon/>} label="Announcements" badge={unread || undefined} />
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2 mt-4">Admin</div>
                <NavItem href="/portal/invite" icon={<InviteIcon/>} label="Invite Advisors" />
              </>
            )}

            {/* Advisor section */}
            {showAdvisorNav && (
              <>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">Home</div>
                <NavItem href="/portal" icon={<HomeIcon/>} label="Home" />
                <NavItem href="/portal/directory" icon={<UsersIcon/>} label="Advisor Directory" />
                <NavItem href="/portal/profile" icon={<ProfileIcon/>} label="My Profile" />
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2 mt-4">My Pipeline</div>
                <NavItem href="/portal/dyoc" icon={<StarIcon/>} label="DYOC" badge={6} />
                <NavItem href="/portal/leads" icon={<LeadsIcon/>} label="My Leads" />
                <NavItem href="/portal/compensation" icon={<DollarIcon/>} label="Compensation" />
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2 mt-4">Community</div>
                <NavItem href="/portal/leaderboard" icon={<TrophyIcon/>} label="Leaderboard" />
                <NavItem href="/portal/feed" icon={<FeedIcon/>} label="Activity Feed" />
                <NavItem href="/portal/events" icon={<CalIcon/>} label="Events" badge={2} />
                <NavItem href="/portal/polls" icon={<PollIcon/>} label="Polls" />
                <NavItem href="/portal/announcements" icon={<BellIcon/>} label="Announcements" badge={unread || undefined} />
              </>
            )}
          </aside>

          {/* MAIN */}
          <main className="flex-1 p-7 overflow-y-auto">{children}</main>
        </div>
      </div>
    </UserContext.Provider>
  )
}

// Inline SVG icons
const HomeIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6.5L8 2l6 4.5V14H2z"/></svg>
const UsersIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="5" r="3"/><path d="M1 14c0-3 2-5 5-5s5 2 5 5"/><path d="M11 3a3 3 0 010 4M15 14c0-3-1.5-5-4-5"/></svg>
const ProfileIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-4 2.7-6 6-6s6 2 6 6"/></svg>
const LeadsIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 6h14"/></svg>
const DollarIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1v14M4 5h5a2 2 0 010 4H5a2 2 0 000 4h6"/></svg>
const TrophyIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 10V15M8 6V15M13 2V15"/></svg>
const FeedIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h12M2 8h8M2 12h6"/></svg>
const CalIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="14" height="12" rx="1.5"/><path d="M1 7h14M5 1v4M11 1v4"/></svg>
const PollIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4h14M1 8h10M1 12h6"/></svg>
const BellIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1a5 5 0 015 5v3l2 2H1l2-2V6a5 5 0 015-5z"/><path d="M6 13a2 2 0 004 0"/></svg>
const InviteIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 8h4M13 6v4M1 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="7" cy="5" r="3"/></svg>
const GridIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
const ChartIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 10V15M8 6V15M13 2V15"/></svg>
const StarIcon = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z"/></svg>
