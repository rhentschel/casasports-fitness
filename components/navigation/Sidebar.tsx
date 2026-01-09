'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Dumbbell, Calendar, MessageSquare, User, LogOut } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Dumbbell, label: 'Trainingspläne', href: '/plans' },
    { icon: Calendar, label: 'Sauna & Kurse', href: '/bookings' },
    { icon: MessageSquare, label: 'AI Health Coach', href: '/coach' },
    { icon: User, label: 'Mein Profil', href: '/profile' },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-black border-r border-white/5 p-6 z-50">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF0000]/20">
                    <span className="text-white font-black text-xl italic leading-none">C</span>
                </div>
                <span className="text-white font-black text-2xl tracking-tighter uppercase italic">casasports</span>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group",
                                isActive
                                    ? "bg-[#FF0000] text-white shadow-lg shadow-[#FF0000]/20"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "stroke-[3px]" : "stroke-2")} />
                            <span className="font-bold text-sm uppercase tracking-wider">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="pt-6 border-t border-white/5">
                <button className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-zinc-500 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 group">
                    <LogOut className="w-5 h-5 group-hover:translate-x-1" />
                    <span className="font-bold text-sm uppercase tracking-wider">Abmelden</span>
                </button>
            </div>
        </aside>
    )
}
