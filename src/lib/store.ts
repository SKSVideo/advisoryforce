// Client-side state store — in-memory for Phase 1
// Replace with Supabase real-time subscriptions in Phase 2

import {
  SEED_LEADS, SEED_DYOC, SEED_ACTIVITY, SEED_LEADERBOARD,
  SEED_POLLS, SEED_EVENTS, SEED_ANNOUNCEMENTS, TENANTS,
  type Lead, type DYOCLead, type ActivityItem, type Poll,
  type Event, type Announcement, type Tenant, type LeaderboardEntry,
  POINTS_CONFIG, USERS,
} from './data'

// Deep clone seed data so mutations don't affect the original
let leads: Lead[] = JSON.parse(JSON.stringify(SEED_LEADS))
let dyocLeads: DYOCLead[] = JSON.parse(JSON.stringify(SEED_DYOC))
let activity: ActivityItem[] = JSON.parse(JSON.stringify(SEED_ACTIVITY))
let leaderboard: LeaderboardEntry[] = JSON.parse(JSON.stringify(SEED_LEADERBOARD))
let polls: Poll[] = JSON.parse(JSON.stringify(SEED_POLLS))
let events: Event[] = JSON.parse(JSON.stringify(SEED_EVENTS))
let announcements: Announcement[] = JSON.parse(JSON.stringify(SEED_ANNOUNCEMENTS))
let tenants: Tenant[] = JSON.parse(JSON.stringify(TENANTS))
let invites: { email: string; role: string; agreement: string; status: string }[] = [
  { email: 'jaclyn@videoforce.ai', role: 'Advisor', agreement: 'Referral', status: 'active' },
  { email: 'jesse@tireagent.com', role: 'Advisor', agreement: 'Sales Agent', status: 'active' },
  { email: 'rajan@videoforce.ai', role: 'Advisor', agreement: 'Sales Agent', status: 'active' },
  { email: 'adam@frogleyads.com', role: 'Advisor', agreement: 'Referral', status: 'active' },
  { email: 'amelia@growthco.com', role: 'Advisor', agreement: 'Referral', status: 'invited' },
  { email: 'andrew@stevensonadv.com', role: 'Advisor', agreement: 'Sales Agent', status: 'pending' },
]
let pollVotes: Record<string, number> = {}  // pollId -> optionIndex

// ─── LEADS ────────────────────────────────────────────────────────────────────

export const getLeads = () => [...leads]
export const getLeadsByAdvisor = (advisorId: number) => leads.filter(l => l.advisorId === advisorId)

export function addLead(lead: Omit<Lead, 'id' | 'date' | 'synced' | 'hubspotDealId'>): Lead {
  const newLead: Lead = {
    ...lead,
    id: 'l' + Date.now(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    synced: false,
    hubspotDealId: null,
  }
  leads.unshift(newLead)
  addActivity(lead.advisorName, `submitted a new lead — ${lead.company}`, '#7B4FCC', POINTS_CONFIG.leadSubmitted)
  updateLeaderboardPoints(lead.advisorId, POINTS_CONFIG.leadSubmitted)
  // In Phase 2: call /api/hubspot/create-deal
  setTimeout(() => {
    const l = leads.find(x => x.id === newLead.id)
    if (l) { l.synced = true; l.hubspotDealId = 'hs_' + Date.now() }
  }, 1500)
  return newLead
}

export function updateLeadStatus(id: string, status: Lead['status']): void {
  const lead = leads.find(l => l.id === id)
  if (!lead) return
  lead.status = status
  if (status === 'Meeting Scheduled') updateLeaderboardPoints(lead.advisorId, POINTS_CONFIG.leadToMeeting)
  if (status === 'Closed Won') updateLeaderboardPoints(lead.advisorId, POINTS_CONFIG.leadClosed)
}

// ─── DYOC ─────────────────────────────────────────────────────────────────────

export const getDYOC = () => [...dyocLeads]
export const getDYOCByAdvisor = (advisorId: number) => dyocLeads.filter(d => d.advisorId === advisorId)

export function updateDYOCStatus(id: string, status: DYOCLead['status']): void {
  const lead = dyocLeads.find(d => d.id === id)
  if (lead) lead.status = status
}

export function updateDYOCStrength(id: string, strength: DYOCLead['strength']): void {
  const lead = dyocLeads.find(d => d.id === id)
  if (lead) lead.strength = strength
}

export function addDYOCLead(lead: Omit<DYOCLead, 'id'>): void {
  dyocLeads.push({ ...lead, id: 'd' + Date.now() })
}

// ─── ACTIVITY ─────────────────────────────────────────────────────────────────

export const getActivity = () => [...activity]

export function addActivity(userName: string, action: string, color: string, points: number): void {
  activity.unshift({
    id: 'a' + Date.now(),
    userId: '',
    userName,
    userColor: color,
    action,
    points,
    timestamp: 'Just now',
  })
}

// ─── LEADERBOARD ──────────────────────────────────────────────────────────────

export const getLeaderboard = () => [...leaderboard].sort((a, b) => b.points - a.points)

export function updateLeaderboardPoints(advisorId: number, points: number): void {
  const entry = leaderboard.find(e => e.advisorId === advisorId)
  if (entry) entry.points += points
}

// ─── POLLS ────────────────────────────────────────────────────────────────────

export const getPolls = () => [...polls]

export function votePoll(pollId: string, optionIndex: number, userId: string): boolean {
  if (pollVotes[pollId + '_' + userId] !== undefined) return false
  const poll = polls.find(p => p.id === pollId)
  if (!poll || poll.deadline === 'Closed') return false
  poll.votes[optionIndex]++
  pollVotes[pollId + '_' + userId] = optionIndex
  addActivity('You', 'voted on a poll', '#7B4FCC', POINTS_CONFIG.pollVoted)
  return true
}

export function getMyVote(pollId: string, userId: string): number | null {
  const v = pollVotes[pollId + '_' + userId]
  return v !== undefined ? v : null
}

export function addPoll(poll: Omit<Poll, 'id' | 'votes'>): void {
  polls.unshift({ ...poll, id: 'p' + Date.now(), votes: new Array(poll.options.length).fill(0) })
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────

export const getEvents = () => [...events]

export function rsvpEvent(eventId: string, userId: string, response: 'Going' | 'Maybe' | 'Not going'): void {
  const event = events.find(e => e.id === eventId)
  if (!event) return
  event.rsvps[userId] = response
  if (response === 'Going') addActivity('You', 'RSVPd to ' + event.title, '#0D9488', POINTS_CONFIG.eventRsvp)
}

export function getMyRsvp(eventId: string, userId: string): string | null {
  const event = events.find(e => e.id === eventId)
  return event?.rsvps[userId] || null
}

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────

export const getAnnouncements = () => [...announcements]

export function markAnnouncementRead(id: string, userId: string): void {
  const ann = announcements.find(a => a.id === id)
  if (ann && !ann.readBy.includes(userId)) ann.readBy.push(userId)
}

export function getUnreadCount(userId: string): number {
  return announcements.filter(a => !a.readBy.includes(userId)).length
}

// ─── INVITES ──────────────────────────────────────────────────────────────────

export const getInvites = () => [...invites]

export function sendInvite(email: string, role: string, agreement: string): void {
  invites.unshift({ email, role, agreement, status: 'invited' })
  // In Phase 2: call /api/auth/send-invite-email
}

// ─── TENANTS ──────────────────────────────────────────────────────────────────

export const getTenants = () => [...tenants]

export function createTenant(tenant: Omit<Tenant, 'id'>): Tenant {
  const newTenant = { ...tenant, id: tenant.name.toLowerCase().replace(/\s/g, '_') }
  tenants.push(newTenant)
  return newTenant
}
