'use client'
import { getLeaderboard } from '@/lib/store'
const MEDALS = ['🥇','🥈','🥉']
export default function LeaderboardPage() {
  const lb = getLeaderboard()
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Leaderboard</h1><p className="text-sm text-gray-500 mt-1">Q2 2026 · Resets July 1</p></div>
      <div className="space-y-3">
        {lb.map((entry, i) => (
          <div key={entry.advisorId} className="bg-white rounded-xl flex items-center gap-4 px-5 py-4" style={{border: i<3 ? '1px solid rgba(123,79,204,0.25)' : '1px solid #E5E7EB'}}>
            <div className="text-xl font-bold w-8 text-center flex-shrink-0" style={{color: i===0?'#F59E0B':i===1?'#94A3B8':i===2?'#CD7F32':'#9CA3AF'}}>{i<3?MEDALS[i]:i+1}</div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{background:entry.color}}>{entry.initials}</div>
            <div className="flex-1"><div className="text-sm font-bold text-navy">{entry.name}</div><div className="text-xs text-gray-400">{entry.leads} leads · {entry.deals} deals closed</div></div>
            <div className="text-xl font-bold" style={{color:'#7B4FCC'}}>{entry.points}</div>
            <div className="text-sm" style={{color:entry.trend==='up'?'#15803D':entry.trend==='down'?'#DC2626':'#9CA3AF'}}>{entry.trend==='up'?'↑':entry.trend==='down'?'↓':'—'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
