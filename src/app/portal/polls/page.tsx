'use client'
import { useState } from 'react'
import { useUser } from '../layout'
import { getPolls, votePoll, getMyVote } from '@/lib/store'
import type { Poll } from '@/lib/data'
export default function PollsPage() {
  const user = useUser()
  const [polls, setPolls] = useState<Poll[]>(getPolls())
  const [toast, setToast] = useState('')
  function handleVote(pollId: string, optIdx: number) {
    if (!user) return
    const ok = votePoll(pollId, optIdx, user.id)
    if (ok) { setPolls(getPolls()); setToast('Vote submitted! +5 pts'); setTimeout(() => setToast(''), 2500) }
  }
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Polls</h1><p className="text-sm text-gray-500 mt-1">Quick feedback from the Advisory Force</p></div>
      <div className="space-y-4">
        {polls.map(poll => {
          const myVote = user ? getMyVote(poll.id, user.id) : null
          const voted = myVote !== null
          const total = poll.votes.reduce((a,b)=>a+b,0)||1
          return (
            <div key={poll.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-base font-bold text-navy mb-1">{poll.question}</div>
              <div className="text-xs text-gray-400 mb-4">Deadline: {poll.deadline} · Created by {poll.createdBy}</div>
              <div className="space-y-2.5">
                {poll.options.map((opt, i) => {
                  const pct = Math.round(poll.votes[i]/total*100)
                  const isMyVote = voted && myVote === i
                  return voted ? (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className={`font-${isMyVote?'bold':'normal'}`} style={isMyVote?{color:'#7B4FCC'}:{}}>{opt}{isMyVote?' ✓':''}</span>
                        <span className="text-gray-400">{pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{width:pct+'%',background:isMyVote?'#7B4FCC':'#E5E7EB'}}/>
                      </div>
                    </div>
                  ) : (
                    <button key={i} onClick={() => handleVote(poll.id, i)} className="w-full text-left px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all">{opt}</button>
                  )
                })}
              </div>
              {!voted && <p className="text-xs text-gray-400 mt-3">Click an option to vote</p>}
            </div>
          )
        })}
      </div>
      {toast && <div className="fixed bottom-6 right-6 bg-green-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  )
}
