import { login, signup } from './actions'
import Image from 'next/image'

export default async function LoginPage(props: {
    searchParams: Promise<{ message: string }>
}) {
    const searchParams = await props.searchParams;

    return (
        <div className="min-h-screen bg-[#fcf5f1] flex items-center justify-center p-4 md:p-10 font-sans">
            <div className="max-w-[1400px] w-full min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white">

                {/* Left Side: Premium Image Layout */}
                <div className="hidden lg:block relative p-8">
                    <div className="relative h-full w-full rounded-[40px] overflow-hidden group">
                        <img
                            src="/login_hero_fitness.png"
                            alt="Naim Obeid Fitness"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10" />

                        {/* Branding / Badge Area */}
                        <div className="absolute top-10 left-10">
                            <div className="flex items-center gap-3 backdrop-blur-md bg-white/40 p-3 pr-6 rounded-2xl border border-white/40">
                                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold italic">N</span>
                                </div>
                                <span className="text-black font-bold tracking-tight">Naim Obeid</span>
                            </div>
                        </div>

                        {/* Motivational Overlay from Image */}
                        <div className="absolute bottom-12 left-12 right-12 text-white">
                            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-xs font-bold uppercase tracking-widest mb-4">
                                Personal Coaching
                            </div>
                            <h2 className="text-6xl font-black leading-tight tracking-tighter mb-6">
                                MEISTERE DEINEN <br /> <span className="text-black">FORTSCHRITT</span>
                            </h2>
                            <p className="text-white/80 text-lg max-w-sm leading-relaxed font-medium">
                                Erreiche deine Ziele mit personalisierten Trainingsplänen und echtem Feedback.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Clean Form */}
                <div className="p-10 md:p-24 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full">
                        <div className="flex items-center gap-2 mb-10 lg:hidden">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <span className="text-white font-black text-xs">N</span>
                            </div>
                            <span className="font-bold text-xl">Naim Obeid</span>
                        </div>

                        <div className="mb-12">
                            <div className="text-orange-500 font-bold text-sm mb-4 flex items-center gap-2">
                                <span className="text-lg">★</span> 5.0 Mitglieder Bewertung
                            </div>
                            <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-6 underline decoration-orange-500 decoration-8 underline-offset-4">
                                Melde dich an & <br /> gib Vollgas.
                            </h1>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                Logge dich ein, um deine Trainingspläne zu sehen und deinen Tracker zu starten.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-800 ml-1" htmlFor="email">Email</label>
                                <input
                                    className="w-full h-16 rounded-2xl px-6 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300"
                                    name="email"
                                    type="email"
                                    placeholder="du@beispiel.de"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-800 ml-1" htmlFor="password">Passwort</label>
                                <input
                                    className="w-full h-16 rounded-2xl px-6 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-4 pt-6">
                                <button
                                    formAction={login}
                                    className="w-full h-16 bg-slate-900 text-white font-black rounded-2xl transition-all hover:bg-black active:scale-[0.98] shadow-2xl shadow-slate-200"
                                >
                                    LOGIN STARTEN →
                                </button>
                                <button
                                    formAction={signup}
                                    className="w-full h-16 bg-white text-slate-900 font-bold rounded-2xl border-2 border-slate-100 transition-all hover:border-slate-900 active:scale-[0.98]"
                                >
                                    NOCH KEIN MITGLIED?
                                </button>
                            </div>

                            {searchParams?.message && (
                                <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-[24px]">
                                    <p className="text-red-600 text-sm font-bold text-center flex items-center justify-center gap-2">
                                        {searchParams.message}
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
    )
}
