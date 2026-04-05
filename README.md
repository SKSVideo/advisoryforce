# AdvisoryForce — Setup Instructions for Utkarsh

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (auth + database + storage)
- Vercel (hosting)

## Quick Start (Phase 1 — Local with mock data)

```bash
npm install
npm run dev
```
Open http://localhost:3000

## Demo Accounts
- sundeep@videoforce.ai / demo123 → Super Admin
- harshil@videoforce.ai / demo123 → Super Admin  
- vijay@videoforce.ai / demo123 → Admin + Advisor
- tek@videoforce.ai / demo123 → Admin
- jaclyn@videoforce.ai / demo123 → Advisor
- adam@frogleyads.com / demo123 → Advisor

## Phase 2 — Connect Supabase (real auth + data)
1. Create project at supabase.com
2. Copy .env.example to .env.local
3. Add your Supabase URL and anon key
4. Run: npx supabase db push
5. Done — all data persists

## Phase 3 — Deploy to Vercel
1. Push to GitHub
2. Import repo in vercel.com
3. Add env variables
4. Deploy

## HubSpot Integration
- Add HUBSPOT_API_KEY to .env.local
- Two-way sync via webhooks (see /api/hubspot/webhook)
