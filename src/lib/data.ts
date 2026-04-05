// ─── TYPES ───────────────────────────────────────────────────────────────────

export type Role = 'superadmin' | 'admin' | 'advisor'
export type AgreementType = 'Referral' | 'Sales Agent' | 'Both' | 'Equity' | 'None'
export type LeadStatus = 'Intro Made' | 'Meeting Scheduled' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost'
export type DYOCStatus = 'Not contacted' | 'LinkedIn sent' | 'Responded' | 'Email intro sent'
export type RelStrength = 'Strong' | 'Medium' | 'Weak' | 'Exclude' | null

export interface User {
  id: string
  email: string
  password: string // demo only — Supabase handles this in production
  name: string
  role: Role
  isAdvisor: boolean  // admin can also be advisor (e.g. Vijay)
  advisorId: number | null
  tenantId: string
}

export interface Advisor {
  id: number
  first: string
  last: string
  title: string
  bio: string
  specialties: string[]
  linkedin: string
  email: string
  color: string
  agreement: AgreementType
  outreachManagedBy: 'self' | 'tek'
}

export interface Tenant {
  id: string
  name: string
  industry: string
  logo: string
  color: string
  slackUrl: string
}

export interface Lead {
  id: string
  advisorId: number
  advisorName: string
  contactName: string
  company: string
  email: string
  dealSize: string
  status: LeadStatus
  commission: string
  notes: string
  date: string
  hubspotDealId: string | null
  synced: boolean
}

export interface DYOCLead {
  id: string
  advisorId: number
  name: string
  company: string
  title: string
  industry: string
  linkedinUrl: string
  strength: RelStrength
  status: DYOCStatus
}

export interface ActivityItem {
  id: string
  userId: string
  userName: string
  userColor: string
  action: string
  points: number
  timestamp: string
}

export interface Poll {
  id: string
  question: string
  options: string[]
  votes: number[]
  deadline: string
  createdBy: string
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  type: string
  description: string
  rsvps: Record<string, 'Going' | 'Maybe' | 'Not going'>
}

export interface Announcement {
  id: string
  title: string
  body: string
  author: string
  timestamp: string
  readBy: string[]
}

export interface LeaderboardEntry {
  advisorId: number
  name: string
  initials: string
  color: string
  points: number
  leads: number
  deals: number
  trend: 'up' | 'down' | 'same'
}

// ─── TENANTS ─────────────────────────────────────────────────────────────────

export const TENANTS: Tenant[] = [
  { id: 'vf', name: 'VideoForce.ai', industry: 'AI / Creator Marketing', logo: 'VF', color: '#E8436A', slackUrl: 'https://advisoryforce.slack.com' },
  { id: 'demo1', name: 'Coca-Cola', industry: 'CPG / Beverage', logo: 'CC', color: '#FF0000', slackUrl: '' },
  { id: 'demo2', name: 'Demo Corp', industry: 'SaaS', logo: 'DC', color: '#6B7280', slackUrl: '' },
]

// ─── USERS ───────────────────────────────────────────────────────────────────

export const USERS: User[] = [
  { id: 'u1', email: 'sundeep@videoforce.ai', password: 'demo123', name: 'Sundeep Sanghavi', role: 'superadmin', isAdvisor: false, advisorId: null, tenantId: 'vf' },
  { id: 'u2', email: 'harshil@videoforce.ai', password: 'demo123', name: 'Harshil', role: 'superadmin', isAdvisor: false, advisorId: null, tenantId: 'vf' },
  { id: 'u3', email: 'vijay@videoforce.ai', password: 'demo123', name: 'Vijay Anand', role: 'admin', isAdvisor: true, advisorId: 1, tenantId: 'vf' },
  { id: 'u4', email: 'tek@videoforce.ai', password: 'demo123', name: 'Tek (Vrinda)', role: 'admin', isAdvisor: false, advisorId: null, tenantId: 'vf' },
  { id: 'u5', email: 'jaclyn@videoforce.ai', password: 'demo123', name: 'Jaclyn Osterloh', role: 'advisor', isAdvisor: true, advisorId: 2, tenantId: 'vf' },
  { id: 'u6', email: 'jesse@tireagent.com', password: 'demo123', name: 'Jesse Allouf', role: 'advisor', isAdvisor: true, advisorId: 3, tenantId: 'vf' },
  { id: 'u7', email: 'kristen@tparlour.com', password: 'demo123', name: 'Kristen Palmer Bastian', role: 'advisor', isAdvisor: true, advisorId: 4, tenantId: 'vf' },
  { id: 'u8', email: 'andrew@stevensonadv.com', password: 'demo123', name: 'Andrew Stevenson', role: 'advisor', isAdvisor: true, advisorId: 5, tenantId: 'vf' },
  { id: 'u9', email: 'jlalor@coca-cola.com', password: 'demo123', name: 'Jordan Lalor', role: 'advisor', isAdvisor: true, advisorId: 6, tenantId: 'vf' },
  { id: 'u10', email: 'rajan@videoforce.ai', password: 'demo123', name: 'Rajan Shah', role: 'advisor', isAdvisor: true, advisorId: 7, tenantId: 'vf' },
  { id: 'u11', email: 'adam@frogleyads.com', password: 'demo123', name: 'Adam Frogley', role: 'advisor', isAdvisor: true, advisorId: 8, tenantId: 'vf' },
  { id: 'u12', email: 'amelia@growthco.com', password: 'demo123', name: 'Amelia Coomber', role: 'advisor', isAdvisor: true, advisorId: 9, tenantId: 'vf' },
]

// ─── ADVISORS ────────────────────────────────────────────────────────────────

export const ADVISORS: Advisor[] = [
  { id: 1, first: 'Vijay', last: 'Anand', title: 'Fractional Co-Founder | CMO | Product Lead', bio: '14 years at MicroStrategy. Currently CMO at Aible. Deep expertise in GTM strategy, AI products, and paid media. Manages the Advisory Force.', specialties: ['GTM Strategy', 'AI Products', 'Paid Media'], linkedin: 'vijayanand180', email: 'vijay@videoforce.ai', color: '#7B4FCC', agreement: 'Equity', outreachManagedBy: 'self' },
  { id: 2, first: 'Jaclyn', last: 'Osterloh', title: 'Advisor, VideoForce.ai', bio: 'Former Director Social Media at Coca-Cola. Deep expertise in community building, creator partnerships, and social commerce at enterprise scale.', specialties: ['Social Media', 'Community', 'Creator Partnerships'], linkedin: 'jaclynosterloh', email: 'jaclyn@videoforce.ai', color: '#E8436A', agreement: 'Referral', outreachManagedBy: 'self' },
  { id: 3, first: 'Jesse', last: 'Allouf', title: 'CMO, Tire Agent', bio: 'Performance-first CMO. Drove 8x ROAS on VideoForce.ai campaigns. Expert in paid social, attribution, and growth at scale.', specialties: ['Performance Marketing', 'ROAS', 'Paid Social'], linkedin: 'jesseallouf', email: 'jesse@tireagent.com', color: '#F4813F', agreement: 'Sales Agent', outreachManagedBy: 'tek' },
  { id: 4, first: 'Kristen', last: 'Palmer Bastian', title: 'Founder T. Parlour | Fractional CMO', bio: 'Former Amazon Sr. Partner Manager with 20+ years scaling CPG and consumer brands. Expert in retail media and brand GTM strategy.', specialties: ['CPG', 'Retail Media', 'Brand GTM'], linkedin: 'kristen-palmer-bastian-4187243', email: 'kristen@tparlour.com', color: '#0D9488', agreement: 'Referral', outreachManagedBy: 'self' },
  { id: 5, first: 'Andrew', last: 'Stevenson', title: 'GTM & Enterprise Sales Advisor', bio: 'Serial enterprise sales leader with deep Fortune 500 networks. Specializes in complex deal structuring and enterprise GTM motions.', specialties: ['Enterprise Sales', 'GTM', 'Fortune 500'], linkedin: 'andrewstevenson', email: 'andrew@stevensonadv.com', color: '#9B2FBE', agreement: 'Sales Agent', outreachManagedBy: 'tek' },
  { id: 6, first: 'Jordan', last: 'Lalor', title: 'Content Director Creative Strategy, Coca-Cola', bio: 'Leads creative strategy across Coca-Cola portfolio. Deep expertise in authentic content at scale and performance creative.', specialties: ['Creative Strategy', 'Content', 'UGC'], linkedin: 'jordanlalor', email: 'jlalor@coca-cola.com', color: '#E8436A', agreement: 'Referral', outreachManagedBy: 'self' },
  { id: 7, first: 'Rajan', last: 'Shah', title: 'Partnership & Distribution Advisor', bio: '20+ years building distribution and partnership networks. Currently managing 11 active VideoForce.ai accounts. Rajan stays advisor — forever.', specialties: ['Partnerships', 'Distribution', 'Account Management'], linkedin: 'rajanshah', email: 'rajan@videoforce.ai', color: '#F4813F', agreement: 'Sales Agent', outreachManagedBy: 'self' },
  { id: 8, first: 'Adam', last: 'Frogley', title: 'Performance Creative Director & UGC Advisor', bio: 'Former VideoForce.ai team member. Expert in high-performing UGC ad creative at scale. Deep knowledge of Meta and TikTok performance systems.', specialties: ['UGC', 'Performance Creative', 'Meta & TikTok'], linkedin: 'adamfrogley', email: 'adam@frogleyads.com', color: '#0D9488', agreement: 'Referral', outreachManagedBy: 'self' },
  { id: 9, first: 'Amelia', last: 'Coomber', title: 'Growth Marketing Leader & Paid Ads Advisor', bio: 'Growth marketing executive with deep expertise in paid acquisition, creative testing frameworks, and scaling DTC and eCommerce brands.', specialties: ['Growth Marketing', 'Paid Ads', 'DTC'], linkedin: 'ameliacoomber', email: 'amelia@growthco.com', color: '#7B4FCC', agreement: 'Referral', outreachManagedBy: 'self' },
]

// ─── SEED DATA ────────────────────────────────────────────────────────────────

export const SEED_LEADS: Lead[] = [
  { id: 'l1', advisorId: 3, advisorName: 'Jesse Allouf', contactName: 'Marcus Webb', company: 'PepsiCo', email: 'mwebb@pepsico.com', dealSize: '$120,000', status: 'Meeting Scheduled', commission: '$4,200', notes: 'VP Performance Media — strong fit for Winning Ads', date: 'Mar 28 2026', hubspotDealId: 'hs_001', synced: true },
  { id: 'l2', advisorId: 7, advisorName: 'Rajan Shah', contactName: 'David Kim', company: 'Unilever NA', email: 'dkim@unilever.com', dealSize: '$250,000', status: 'Proposal Sent', commission: '$9,500', notes: 'Head of Social Commerce — interested in Creator Sourcing at scale', date: 'Mar 15 2026', hubspotDealId: 'hs_002', synced: true },
  { id: 'l3', advisorId: 3, advisorName: 'Jesse Allouf', contactName: 'Ryan Mitchell', company: 'Hims & Hers', email: 'r@hims.com', dealSize: '$85,000', status: 'Closed Won', commission: '$2,550', notes: 'Growth Director — fast mover, signed 3-year deal', date: 'Mar 1 2026', hubspotDealId: 'hs_003', synced: true },
  { id: 'l4', advisorId: 2, advisorName: 'Jaclyn Osterloh', contactName: 'Sarah Ng', company: "L'Oréal USA", email: 's@loreal.com', dealSize: '$180,000', status: 'Intro Made', commission: '$6,200', notes: 'VP Digital Marketing — warm intro via LinkedIn', date: 'Apr 1 2026', hubspotDealId: null, synced: false },
]

export const SEED_DYOC: DYOCLead[] = [
  { id: 'd1', advisorId: 2, name: 'Sarah Chen', company: "L'Oréal USA", title: 'VP Digital Marketing', industry: 'Beauty', linkedinUrl: 'https://linkedin.com/in/sarahchen', strength: null, status: 'Not contacted' },
  { id: 'd2', advisorId: 2, name: 'Marcus Webb', company: 'PepsiCo', title: 'Director Performance Media', industry: 'CPG', linkedinUrl: 'https://linkedin.com/in/marcuswebb', strength: 'Strong', status: 'LinkedIn sent' },
  { id: 'd3', advisorId: 2, name: 'Jennifer Park', company: 'Sephora', title: 'CMO', industry: 'Beauty/Retail', linkedinUrl: 'https://linkedin.com/in/jenniferpark', strength: null, status: 'Not contacted' },
  { id: 'd4', advisorId: 2, name: 'David Kim', company: 'Unilever NA', title: 'Head of Social Commerce', industry: 'CPG', linkedinUrl: 'https://linkedin.com/in/davidkim', strength: 'Medium', status: 'Responded' },
  { id: 'd5', advisorId: 2, name: 'Ryan Mitchell', company: 'Hims & Hers', title: 'Growth Director', industry: 'DTC Health', linkedinUrl: 'https://linkedin.com/in/ryanmitchell', strength: 'Strong', status: 'Email intro sent' },
  { id: 'd6', advisorId: 2, name: 'Lisa Torres', company: 'Gap Inc', title: 'VP Brand Marketing', industry: 'Retail', linkedinUrl: 'https://linkedin.com/in/lisatorres', strength: null, status: 'Not contacted' },
]

export const SEED_ACTIVITY: ActivityItem[] = [
  { id: 'a1', userId: 'u11', userName: 'Adam Frogley', userColor: '#0D9488', action: 'submitted Winning Ads beta feedback', points: 10, timestamp: '2 hours ago' },
  { id: 'a2', userId: 'u5', userName: 'Jaclyn Osterloh', userColor: '#E8436A', action: 'made a warm intro to Jordan M. at Sprite', points: 10, timestamp: '5 hours ago' },
  { id: 'a3', userId: 'u6', userName: 'Jesse Allouf', userColor: '#F4813F', action: 'closed a deal — $85K ARR 🎉', points: 100, timestamp: '1 day ago' },
  { id: 'a4', userId: 'u10', userName: 'Rajan Shah', userColor: '#F4813F', action: 'submitted 3 new leads', points: 30, timestamp: '2 days ago' },
  { id: 'a5', userId: 'u3', userName: 'Vijay Anand', userColor: '#7B4FCC', action: 'posted announcement: Winning Ads launches April 15', points: 0, timestamp: '3 days ago' },
  { id: 'a6', userId: 'u7', userName: 'Kristen Palmer Bastian', userColor: '#0D9488', action: "RSVPd to Advisory Force Q2 Kickoff", points: 15, timestamp: '4 days ago' },
]

export const SEED_LEADERBOARD: LeaderboardEntry[] = [
  { advisorId: 3, name: 'Jesse Allouf', initials: 'JA', color: '#F4813F', points: 245, leads: 4, deals: 2, trend: 'up' },
  { advisorId: 7, name: 'Rajan Shah', initials: 'RS', color: '#F4813F', points: 198, leads: 7, deals: 1, trend: 'same' },
  { advisorId: 2, name: 'Jaclyn Osterloh', initials: 'JO', color: '#E8436A', points: 167, leads: 3, deals: 1, trend: 'up' },
  { advisorId: 8, name: 'Adam Frogley', initials: 'AF', color: '#0D9488', points: 145, leads: 2, deals: 0, trend: 'up' },
  { advisorId: 1, name: 'Vijay Anand', initials: 'VA', color: '#7B4FCC', points: 120, leads: 2, deals: 0, trend: 'down' },
  { advisorId: 9, name: 'Amelia Coomber', initials: 'AC', color: '#7B4FCC', points: 95, leads: 3, deals: 0, trend: 'same' },
  { advisorId: 5, name: 'Andrew Stevenson', initials: 'AS', color: '#9B2FBE', points: 85, leads: 2, deals: 0, trend: 'up' },
  { advisorId: 4, name: 'Kristen Palmer Bastian', initials: 'KB', color: '#0D9488', points: 70, leads: 1, deals: 0, trend: 'same' },
  { advisorId: 6, name: 'Jordan Lalor', initials: 'JL', color: '#E8436A', points: 45, leads: 1, deals: 0, trend: 'down' },
]

export const SEED_POLLS: Poll[] = [
  { id: 'p1', question: 'Which Inspire Brands brand should we target first for a Winning Ads pilot?', options: ["Dunkin'", 'Baskin-Robbins', 'SONIC', "Arby's"], votes: [0, 0, 0, 0], deadline: 'April 10, 2026', createdBy: 'Vijay Anand' },
  { id: 'p2', question: "What's the most valuable AdvisoryForce feature for your workflow?", options: ['DYOC dashboard', 'Compensation calculator', 'Leaderboard', 'HubSpot sync'], votes: [3, 2, 5, 4], deadline: 'Closed', createdBy: 'Vijay Anand' },
]

export const SEED_EVENTS: Event[] = [
  { id: 'e1', title: 'Winning Ads Launch — Advisor Briefing', date: 'April 15, 2026', time: '2:00 PM PST', type: 'Virtual', description: 'Exclusive advisor briefing before public launch. See the product, give feedback, and get your activation plan.', rsvps: {} },
  { id: 'e2', title: 'Advisory Force Q2 Kickoff', date: 'May 1, 2026', time: '11:00 AM PST', type: 'In-Person · Santa Monica', description: 'Quarterly in-person gathering. Strategy session, pipeline review, and networking dinner.', rsvps: {} },
]

export const SEED_ANNOUNCEMENTS: Announcement[] = [
  { id: 'an1', title: 'Winning Ads launches April 15 — advisor beta access is ready', body: 'All advisors now have access to Winning Ads beta. Your feedback is critical before public launch. Log into the portal and check the Polls section for the structured feedback form.', author: 'Vijay Anand', timestamp: '3 days ago', readBy: [] },
  { id: 'an2', title: 'DYOC lists updated — 100 new warm intros loaded per advisor', body: 'Tek has run the latest LinkedIn Sales Navigator export and AI qualification pass. Check your DYOC dashboard for your updated list.', author: 'Tek (Vrinda)', timestamp: '1 week ago', readBy: [] },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export function getInitials(first: string, last: string): string {
  return (first[0] + last[0]).toUpperCase()
}

export function calculateCommission(arr: number, type: 'referral' | 'sales'): number {
  if (type === 'referral') {
    if (arr <= 100000) return arr * 0.03
    if (arr <= 250000) return (100000 * 0.03) + (arr - 100000) * 0.04
    return (100000 * 0.03) + (150000 * 0.04) + (arr - 250000) * 0.05
  } else {
    if (arr <= 100000) return arr * 0.06
    if (arr <= 250000) return (100000 * 0.06) + (arr - 100000) * 0.08
    return (100000 * 0.06) + (150000 * 0.08) + (arr - 250000) * 0.10
  }
}

export function getCommissionTier(arr: number, type: 'referral' | 'sales'): string {
  if (type === 'referral') {
    if (arr <= 100000) return '3% tier'
    if (arr <= 250000) return '4% tier'
    return '5% tier'
  } else {
    if (arr <= 100000) return '6% tier'
    if (arr <= 250000) return '8% tier'
    return '10% tier'
  }
}

export function formatCurrency(n: number): string {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M'
  if (n >= 1000) return '$' + (n / 1000).toFixed(1) + 'K'
  return '$' + Math.round(n).toLocaleString()
}

export const LEAD_STATUS_STYLES: Record<LeadStatus, string> = {
  'Intro Made': 'bg-yellow-50 text-yellow-800',
  'Meeting Scheduled': 'bg-blue-50 text-blue-800',
  'Proposal Sent': 'bg-purple-50 text-purple-700',
  'Closed Won': 'bg-green-50 text-green-700',
  'Closed Lost': 'bg-red-50 text-red-700',
}

export const DYOC_STATUS_STYLES: Record<DYOCStatus, string> = {
  'Not contacted': 'bg-yellow-50 text-yellow-800',
  'LinkedIn sent': 'bg-blue-50 text-blue-800',
  'Responded': 'bg-green-50 text-green-700',
  'Email intro sent': 'bg-purple-50 text-purple-700',
}

export const DYOC_STATUS_ORDER: DYOCStatus[] = ['Not contacted', 'LinkedIn sent', 'Responded', 'Email intro sent']

export const POINTS_CONFIG = {
  leadSubmitted: 10,
  leadToMeeting: 25,
  leadClosed: 100,
  pollVoted: 5,
  eventRsvp: 15,
  feedbackSubmitted: 10,
}
