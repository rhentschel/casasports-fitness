import { login, signup } from './actions'
import Image from 'next/image'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string }>
}) {
    const searchParams = await props.searchParams;

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-0 md:p-6 lg:p-12">
            <div className="max-w-[1200px] w-full min-h-[700px] grid grid-cols-1 md:grid-cols-2 bg-[#141414] border border-white/5 md:rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">

                {/* Left Side: Hero Image */}
                <div className="hidden md:block relative overflow-hidden group">
                    <img
                        src="/login_hero_fitness.png"
                        alt="Fitness Motivation"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/20 to-transparent" />

                    {/* Branding overlay */}
                    <div className="absolute top-12 left-12">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                                <span className="text-black font-black text-xl">N</span>
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight text-shadow-xl">Naim Obeid Fitness</span>
                        </div>
                    </div>

                    <div className="absolute bottom-16 left-12 right-12 space-y-4">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/30" />)}
                        </div>
                        <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase italic drop-shadow-2xl">
                            Master your <br />
                            <span className="text-green-500">Progress</span>
                        </h2>
                        <p className="text-white/50 text-lg max-w-sm font-medium leading-relaxed">
                            Tritt der Community bei und verwalte dein Training mit modernster KI-Technologie.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="relative p-10 md:p-20 flex flex-col justify-center bg-zinc-900/10">
                    <div className="mb-12">
                        <div className="md:hidden flex items-center gap-2 mb-8 text-shadow-xl">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <span className="text-black font-black">N</span>
                            </div>
                            <span className="text-white font-bold text-lg">Naim Obeid</span>
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Willkommen.</h1>
                        <p className="text-zinc-500 font-medium italic">Bereit für dein nächstes Level?</p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Email Addresse</label>
                            <input
                                className="w-full h-14 rounded-2xl px-5 bg-white/5 border border-white/5 focus:border-green-500/50 focus:bg-white/10 transition-all outline-none text-white font-medium"
                                name="email"
                                type="email"
                                placeholder="name@beispiel.de"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Passwort</label>
                            <input
                                className="w-full h-14 rounded-2xl px-5 bg-white/5 border border-white/5 focus:border-green-500/50 focus:bg-white/10 transition-all outline-none text-white font-medium"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-4 pt-6">
                            <button
                                formAction={login}
                                className="w-full h-16 bg-white text-black font-black rounded-2xl transition-all hover:bg-green-500 hover:text-black active:scale-[0.98] shadow-xl"
                            >
                                ANMELDEN
                            </button>
                            <button
                                formAction={signup}
                                className="w-full h-16 bg-transparent text-white font-bold rounded-2xl border border-white/10 transition-all hover:bg-white/5 active:scale-[0.98]"
                            >
                                ACCOUNT ERSTELLEN
                            </button>
                        </div>

                        {searchParams?.message && (
                            <div className="mt-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                <p className="text-red-400 text-sm font-bold text-center flex items-center justify-center gap-2 uppercase tracking-tight">
                                    <span>⚠️</span> {searchParams.message}
                                </p>
                            </div>
                        )}
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-zinc-600 text-xs font-medium uppercase tracking-widest">
                            &copy; 2026 Naim Obeid Fitness Systems
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
