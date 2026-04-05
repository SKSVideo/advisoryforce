'use client'
import { useState } from 'react'
import { useUser } from '../layout'
import { getEvents, rsvpEvent, getMyRsvp } from '@/lib/store'
import type { Event } from '@/lib/data'
export default function EventsPage() {
  const user = useUser()
  const [events, setEvents] = useState<Event[]>(getEvents())
  const [toast, setToast] = useState('')
  function handleRsvp(id: string, response: 'Going'|'Maybe'|'Not going') {
    if (!user) return
    rsvpEvent(id, user.id, response)
    setEvents(getEvents())
    setToast('RSVP saved: ' + response + (response==='Going'?' · +15 pts':''))
    setTimeout(() => setToast(''), 2500)
  }
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-navy">Events</h1><p className="text-sm text-gray-500 mt-1">Upcoming VideoForce.ai events — RSVP to save your spot</p></div>
      <div className="space-y-4">
        {events.map(event => {
          const myRsvp = user ? getMyRsvp(event.id, user.id) : null
          return (
            <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div><div className="text-base font-bold text-navy mb-1">{event.title}</div><div className="text-sm text-gray-500">{event.date} · {event.time}</div><div className="text-sm font-semibold mt-1" style={{color:'#7B4FCC'}}>{event.type}</div></div>
                {myRsvp && <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">RSVP'd: {myRsvp}</span>}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{event.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleRsvp(event.id, 'Going')} className="btn-grad text-white text-sm px-4 py-2 rounded-lg font-semibold">Going</button>
                <button onClick={() => handleRsvp(event.id, 'Maybe')} className="border border-gray-200 text-sm px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold">Maybe</button>
                <button onClick={() => handleRsvp(event.id, 'Not going')} className="border border-gray-200 text-sm px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold">Can't make it</button>
              </div>
            </div>
          )
        })}
      </div>
      {toast && <div className="fixed bottom-6 right-6 bg-green-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  )
}
