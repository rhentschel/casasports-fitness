'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Dumbbell, Calendar, MessageSquare, User } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navItems = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: Dumbbell, label: 'Pläne', href: '/plans' },
    { icon: Calendar, label: 'Booking', href: '/bookings' },
    { icon: MessageSquare, label: 'Coach', href: '/coach' },
    { icon: User, label: 'Profil', href: '/profile' },
]

export default function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
            <div className="mx-4 mb-4 glass-card rounded-3xl flex items-center justify-around h-16 px-2 shadow-2xl">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300",
                                isActive ? "text-[#FF0000]" : "text-zinc-500"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                isActive ? "bg-[#FF0000]/10" : "bg-transparent"
                            )}>
                                <Icon className={cn("w-5 h-5", isActive ? "stroke-[3px]" : "stroke-2")} />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
