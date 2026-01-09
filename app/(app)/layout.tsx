import Sidebar from '@/components/navigation/Sidebar'
import BottomNav from '@/components/navigation/BottomNav'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Protect all app routes - redirect to login if not authenticated
    if (!user) {
        redirect('/login?message=Bitte melde dich an')
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
