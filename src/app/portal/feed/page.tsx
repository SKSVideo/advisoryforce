'use client'
import { getActivity } from '@/lib/store'
export default function FeedPage() {
  const activity = getActivity()
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Activity Feed</h1><p className="text-sm text-gray-500 mt-1">What's happening across the Advisory Force</p></div>
      <div className="space-y-3">
        {activity.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{background:item.userColor}}>{item.userName.split(' ').map((n:string)=>n[0]).join('')}</div>
            <div className="flex-1"><div className="text-sm text-navy"><strong>{item.userName}</strong> {item.action}</div><div className="text-xs text-gray-400 mt-0.5">{item.timestamp}</div></div>
            {item.points>0 && <div className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full flex-shrink-0">+{item.points} pts</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
