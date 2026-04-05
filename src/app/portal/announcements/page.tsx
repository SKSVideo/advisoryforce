'use client'
import { useState } from 'react'
import { useUser } from '../layout'
import { getAnnouncements, markAnnouncementRead } from '@/lib/store'
import type { Announcement } from '@/lib/data'
export default function AnnouncementsPage() {
  const user = useUser()
  const [anns, setAnns] = useState<Announcement[]>(getAnnouncements())
  function markRead(id: string) {
    if (!user) return
    markAnnouncementRead(id, user.id)
    setAnns(getAnnouncements())
  }
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Announcements</h1><p className="text-sm text-gray-500 mt-1">Updates from Vijay and the VideoForce.ai team</p></div>
      <div className="space-y-4">
        {anns.map(ann => {
          const isUnread = user && !ann.readBy.includes(user.id)
          return (
            <div key={ann.id} className="bg-white border rounded-xl p-6" style={{borderColor: isUnread?'#C7D2FE':'#E5E7EB'}}>
              <div className="flex items-start gap-3 mb-3">
                {isUnread && <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{background:'#7B4FCC'}}/>}
                <div className="flex-1">
                  <div className="text-base font-bold text-navy mb-0.5">{ann.title}</div>
                  <div className="text-xs text-gray-400">{ann.timestamp} · {ann.author}</div>
                </div>
                {isUnread && <button onClick={() => markRead(ann.id)} className="text-xs text-purple-600 font-semibold hover:underline flex-shrink-0">Mark read</button>}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{ann.body}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
