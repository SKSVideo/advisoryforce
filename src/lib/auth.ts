// Auth helpers — works with mock data in Phase 1
// Replace with Supabase auth calls in Phase 2

import { USERS, type User } from './data'

const SESSION_KEY = 'af_session'

export function loginWithPassword(email: string, password: string): User | null {
  const user = USERS.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (!user) return null
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }
  return user
}

export function getSession(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_KEY)
  }
}

export function isSuperAdmin(user: User): boolean {
  return user.role === 'superadmin'
}

export function isAdmin(user: User): boolean {
  return user.role === 'admin' || user.role === 'superadmin'
}

export function isAdvisor(user: User): boolean {
  return user.isAdvisor
}

export function canManagePortal(user: User): boolean {
  return user.role === 'admin' || user.role === 'superadmin'
}

export function canViewAllLeads(user: User): boolean {
  return user.role === 'admin' || user.role === 'superadmin'
}

export function canCreateTenant(user: User): boolean {
  return user.role === 'superadmin'
}
