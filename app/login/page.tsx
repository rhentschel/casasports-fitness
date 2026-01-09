import { login, signup, verifyOtp } from './actions'
import Link from 'next/link'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string; verify?: string; email?: string; mode?: string }>
}) {
    const searchParams = await props.searchParams;
    const isVerifyMode = searchParams.verify === 'true';
    const isSignupMode = searchParams.mode === 'signup';

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 md:p-6 lg:p-8 font-sans text-white overflow-y-auto">
            <div className="max-w-[1200px] w-full min-h-0 md:min-h-[700px] grid grid-cols-1 md:grid-cols-2 bg-[#111111] border border-white/5 md:rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] my-4 md:my-0">

                {/* Left Side: Hero Image */}
                <div className="hidden md:block relative overflow-hidden group">
                    <img
                        src="/login_hero_fitness.png"
                        alt="casasports Fitness"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent" />

                    {/* Branding overlay */}
                    <div className="absolute top-10 left-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#FF0000] rounded-lg flex items-center justify-center shadow-lg shadow-[#FF0000]/20">
                                <span className="text-white font-black text-xl italic leading-none">C</span>
                            </div>
                            <span className="text-white font-black text-2xl tracking-tighter uppercase italic">casasports</span>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-12 right-12 space-y-4">
                        <div className="flex gap-2">
                            <div className="w-12 h-1 bg-[#FF0000] rounded-full" />
                            <div className="w-4 h-1 bg-white/20 rounded-full" />
                        </div>
                        <h2 className="text-6xl font-black text-white leading-[0.95] tracking-tighter uppercase italic">
                            {isSignupMode ? 'WERDE TEIL' : 'DEIN TRAINING.'} <br />
                            <span className="text-[#FF0000]">{isSignupMode ? 'DER ELITE.' : 'DEIN CLUB.'}</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-sm font-medium leading-tight">
                            Premium Coaching & Community – direkt im casasports Oer-Erkenschwick.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="relative p-8 md:p-16 flex flex-col justify-center bg-zinc-900/10">
                    <div className="w-full max-w-sm mx-auto">
                        <div className="md:hidden flex items-center gap-2 mb-10">
                            <div className="w-8 h-8 bg-[#FF0000] rounded flex items-center justify-center">
                                <span className="text-white font-black italic">C</span>
                            </div>
                            <span className="text-white font-black text-xl uppercase tracking-tighter">casasports</span>
                        </div>

                        {!isVerifyMode ? (
                            <>
                                <h1 className="text-5xl font-black text-white tracking-tighter mb-3 leading-[0.9] uppercase italic italic">
                                    {isSignupMode ? 'Account' : 'Bring dich in'} <br />
                                    <span className="text-[#FF0000]">{isSignupMode ? 'Erstellen.' : 'Bestform.'}</span>
                                </h1>
                                <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-10">
                                    {isSignupMode ? 'Starte jetzt deine Reise zum Ziel.' : 'Logge dich ein & starte dein Training.'}
                                </p>

                                <form className="space-y-4">
                                    {isSignupMode && (
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-1">Vollständiger Name</label>
                                            <input
                                                className="w-full h-14 rounded-xl px-5 bg-white/5 border border-white/10 focus:border-[#FF0000]/50 focus:bg-white/10 transition-all outline-none text-white font-medium placeholder:text-zinc-800"
                                                name="name"
                                                type="text"
                                                placeholder="Max Mustermann"
                                                required={isSignupMode}
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-1">Email Adresse</label>
                                        <input
                                            className="w-full h-14 rounded-xl px-5 bg-white/5 border border-white/10 focus:border-[#FF0000]/50 focus:bg-white/10 transition-all outline-none text-white font-medium placeholder:text-zinc-800"
                                            name="email"
                                            type="email"
                                            placeholder="du@beispiel.de"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-1">Passwort</label>
                                        <input
                                            className="w-full h-14 rounded-xl px-5 bg-white/5 border border-white/10 focus:border-[#FF0000]/50 focus:bg-white/10 transition-all outline-none text-white font-medium placeholder:text-zinc-800"
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    {searchParams.message && (
                                        <p className="text-[10px] font-bold text-[#FF0000] uppercase tracking-widest bg-[#FF0000]/10 p-3 rounded-lg border border-[#FF0000]/20">
                                            {searchParams.message}
                                        </p>
                                    )}

                                    <div className="flex flex-col gap-3 pt-4">
                                        {isSignupMode ? (
                                            <button
                                                formAction={signup}
                                                className="w-full h-14 bg-[#FF0000] text-white font-black rounded-xl transition-all hover:bg-red-700 active:scale-[0.98] shadow-xl text-md flex items-center justify-center gap-2 uppercase italic"
                                            >
                                                ACCOUNT ERSTELLEN
                                            </button>
                                        ) : (
                                            <button
                                                formAction={login}
                                                className="w-full h-14 bg-white text-black font-black rounded-xl transition-all hover:bg-[#FF0000] hover:text-white active:scale-[0.98] shadow-xl text-md flex items-center justify-center gap-2 uppercase italic"
                                            >
                                                JETZT ANMELDEN
                                            </button>
                                        )}

                                        <Link
                                            href={isSignupMode ? '/login' : '/login?mode=signup'}
                                            className="w-full h-14 bg-transparent text-white font-bold rounded-xl border border-white/10 transition-all hover:bg-white/5 active:scale-[0.98] flex items-center justify-center uppercase tracking-widest text-[10px] opacity-60 hover:opacity-100"
                                        >
                                            {isSignupMode ? 'Schon Mitglied? Login' : 'Noch kein Mitglied? Registrieren'}
                                        </Link>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <h1 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase italic">Code eingeben</h1>
                                <p className="text-zinc-500 text-sm font-medium">Prüfe dein Postfach: <br /><b className="text-white">{searchParams.email}</b></p>

                                <form className="space-y-6 mt-10">
                                    <input type="hidden" name="email" value={searchParams.email} />
                                    <div className="space-y-4 text-center">
                                        <input
                                            className="w-full h-16 rounded-2xl px-4 bg-white/5 border border-[#FF0000]/30 focus:border-[#FF0000] transition-all outline-none text-white font-black text-3xl tracking-[0.5em] text-center"
                                            name="token"
                                            type="text"
                                            placeholder="000000"
                                            maxLength={6}
                                            required
                                        />
                                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">6-Stelliger Code</p>
                                    </div>

                                    {searchParams.message && (
                                        <p className="text-[10px] font-bold text-[#FF0000] uppercase tracking-widest bg-[#FF0000]/10 p-3 rounded-lg border border-[#FF0000]/20">
                                            {searchParams.message}
                                        </p>
                                    )}

                                    <div className="flex flex-col gap-4">
                                        <button
                                            formAction={verifyOtp}
                                            className="w-full h-14 bg-[#FF0000] text-white font-black rounded-xl transition-all hover:bg-red-700 active:scale-[0.98] shadow-xl text-md uppercase italic"
                                        >
                                            CODE VERIFIZIEREN
                                        </button>
                                        <Link href="/login" className="text-zinc-600 text-center text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors uppercase">Abbrechen</Link>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="mt-12 text-center md:absolute md:bottom-8 md:left-0 md:right-0">
                        <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">
                            &copy; 2026 casasports systems
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
