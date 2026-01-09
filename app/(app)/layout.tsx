import Sidebar from '@/components/navigation/Sidebar'
import BottomNav from '@/components/navigation/BottomNav'

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
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
