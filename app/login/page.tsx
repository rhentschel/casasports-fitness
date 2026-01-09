import { login, signup, verifyOtp } from './actions'
import Image from 'next/image'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string; verify?: string; email?: string }>
}) {
    const searchParams = await props.searchParams;
    const isVerifyMode = searchParams.verify === 'true';

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-0 md:p-6 lg:p-12 font-sans text-white">
            <div className="max-w-[1200px] w-full min-h-[750px] grid grid-cols-1 md:grid-cols-2 bg-[#141414] border border-white/5 md:rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
                
                {/* Left Side: Hero Image */}
                <div className="hidden md:block relative overflow-hidden group">
                    <img
                        src="/login_hero_fitness.png"
                        alt="casasports Fitness"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />

                    {/* Branding overlay */}
                    <div className="absolute top-12 left-12">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                                <span className="text-black font-black text-xl italic leading-none">C</span>
                            </div>
                            <span className="text-white font-bold text-2xl tracking-tight text-shadow-xl">casasports</span>
                        </div>
                    </div>

                    <div className="absolute bottom-16 left-12 right-12 space-y-4">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-green-500/50" />)}
                        </div>
                        <h2 className="text-6xl font-black text-white leading-[1.0] tracking-tighter uppercase italic drop-shadow-2xl">
                            DEIN TRAINING. <br />
                            <span className="text-green-500 italic">DEIN CLUB.</span>
                        </h2>
                        <p className="text-white/50 text-xl max-w-sm font-medium leading-relaxed">
                            Premium Coaching & Community – direkt im casasports Oer-Erkenschwick.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="relative p-10 md:p-20 flex flex-col justify-center bg-zinc-900/10">
                    <div className="mb-12">
                        <div className="md:hidden flex items-center gap-2 mb-8 text-shadow-xl">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <span className="text-black font-black italic">C</span>
                            </div>
                            <span className="text-white font-bold text-lg uppercase tracking-tight">casasports</span>
                        </div>

                        {!isVerifyMode ? (
                            <>
                                <h1 className="text-5xl font-black text-white tracking-tighter mb-4 leading-tight">Bring dich in <br/><span className="text-green-500">Bestform.</span></h1>
                                <p className="text-zinc-500 text-lg font-medium">Logge dich ein, um deine Trainingspläne zu verwalten.</p>

                                <form className="space-y-6 mt-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Email Adresse</label>
                                        <input
                                            className="w-full h-16 rounded-2xl px-6 bg-white/5 border border-white/5 focus:border-green-500/50 focus:bg-white/10 transition-all outline-none text-white font-medium placeholder:text-zinc-700"
                                            name="email"
                                            type="email"
                                            placeholder="du@beispiel.de"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Passwort</label>
                                        <input
                                            className="w-full h-16 rounded-2xl px-6 bg-white/5 border border-white/5 focus:border-green-500/50 focus:bg-white/10 transition-all outline-none text-white font-medium placeholder:text-zinc-700"
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4 pt-4">
                                        <button
                                            formAction={login}
                                            className="w-full h-16 bg-white text-black font-black rounded-2xl transition-all hover:bg-green-500 active:scale-[0.98] shadow-xl text-lg flex items-center justify-center gap-2"
                                        >
                                            ANMELDEN 
                                        </button>
                                        <button
                                            formAction={signup}
                                            className="w-full h-16 bg-transparent text-white font-bold rounded-2xl border border-white/10 transition-all hover:bg-white/5 active:scale-[0.98] uppercase tracking-widest text-xs"
                                        >
                                            Jetzt Mitglied werden
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Code eingeben</h1>
                                <p className="text-zinc-500 font-medium">Prüfe dein Postfach: <b>{searchParams.email}</b></p>

                                <form className="space-y-8 mt-10">
                                    <input type="hidden" name="email" value={searchParams.email} />
                                    <div className="space-y-4 text-center">
                                        <input
                                            className="w-full h-20 rounded-3xl px-6 bg-white/5 border border-green-500/30 focus:border-green-500 transition-all outline-none text-white font-black text-4xl tracking-[0.5em] text-center"
                                            name="token"
                                            type="text"
                                            placeholder="000000"
                                            maxLength={6}
                                            required
                                        />
                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">6-stelliger Bestätigungscode</p>
                                    </div>

                                    <div className="flex flex-col gap-4 pt-4">
                                        <button
                                            formAction={verifyOtp}
                                            className="w-full h-16 bg-green-500 text-black font-black rounded-2xl transition-all hover:bg-green-400 active:scale-[0.98] shadow-xl text-lg"
                                        >
                                            CODE VERIFIZIEREN
                                        </button>
                                        <a href="/login" className="text-zinc-500 text-center text-xs font-bold hover:text-white transition-colors">Abbrechen und zurück</a>
                                    </div>
                                </form>
                            </>
                        )}

                        {searchParams?.message && (
                            <div className="mt-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                <p className="text-red-400 text-sm font-bold text-center flex items-center justify-center gap-2 uppercase tracking-tight">
                                    {searchParams.message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
