import { login, signup } from './actions'
import Image from 'next/image'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string }>
}) {
    const searchParams = await props.searchParams;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">

                {/* Left Side: Image/Hero */}
                <div className="hidden md:block relative bg-zinc-900">
                    <img
                        src="/login_hero_fitness.png"
                        alt="Fitness Motivation"
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12">
                        <h2 className="text-4xl font-bold text-white mb-4 italic tracking-tighter">TRANSFORM YOUR LIFE</h2>
                        <p className="text-white/60 text-lg max-w-sm">Join the elite community of Naim Obeid Fitness and start your professional journey today.</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center bg-zinc-950/50">
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Willkommen zurück</h1>
                        <p className="text-zinc-400">Melde dich an, um auf dein Coaching-Dashboard zuzugreifen.</p>
                    </div>

                    <form className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300" htmlFor="email">Email</label>
                            <input
                                className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-green-500 transition-all outline-none text-white placeholder:text-zinc-600"
                                name="email"
                                type="email"
                                placeholder="name@beispiel.de"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-zinc-300" htmlFor="password">Passwort</label>
                            </div>
                            <input
                                className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-green-500 transition-all outline-none text-white placeholder:text-zinc-600"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            <button
                                formAction={login}
                                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-green-900/20"
                            >
                                Einloggen
                            </button>
                            <button
                                formAction={signup}
                                className="w-full py-4 bg-transparent hover:bg-white/5 text-zinc-300 font-medium rounded-xl transition-all border border-white/10 active:scale-95"
                            >
                                Jetzt Registrieren
                            </button>
                        </div>

                        {searchParams?.message && (
                            <div className="mt-4 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-sm animate-pulse-slow">
                                {searchParams.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
