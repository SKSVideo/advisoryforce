'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default function Root() {
  const router = useRouter()
  useEffect(() => {
    const user = getSession()
    if (user) {
      router.replace('/portal')
    } else {
      router.replace('/login')
    }
  }, [router])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 rounded-lg grad-bg animate-pulse" />
    </div>
  )
}
