import Sidebar from '@/components/navigation/Sidebar'
import BottomNav from '@/components/navigation/BottomNav'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    try {
        const supabase = await createClient()
        const { data: { user }, error } = await supabase.auth.getUser()

        // Only redirect if we successfully checked auth and there's no user
        // Don't redirect on errors (let the page handle it)
        if (!error && !user) {
            redirect('/login?message=Bitte melde dich an')
        }
    } catch (e) {
        // Log error but don't crash - let pages handle auth themselves
        console.error('Auth check in app layout failed:', e)
    }

    return (
        <div className="min-h-screen bg-black text-white flex">
            <Sidebar />
            <main className="flex-1 md:ml-72 min-h-screen relative pb-24 md:pb-0">
                {children}
            </main>
            <BottomNav />
        </div>
    )
}
