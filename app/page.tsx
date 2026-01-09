import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star, Users, Award, PlayCircle, MessageSquare, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#FF0000] selection:text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF0000] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg italic">C</span>
            </div>
            <span className="text-white font-black text-xl tracking-tighter uppercase italic">casasports</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Apps', 'Training', 'Preise', 'Standort'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-[#FF0000] transition-colors">{item}</a>
            ))}
          </div>
          <Link href="/login" className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase italic rounded-full hover:bg-[#FF0000] hover:text-white transition-all">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0000] via-transparent to-transparent blur-[120px] rounded-full animate-pulse-slow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#FF0000] animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Next-Gen Fitness App ist live</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-[ -0.05em] uppercase italic">
              MEIN NEUES <br />
              <span className="text-[#FF0000] drop-shadow-[0_0_30px_rgba(255,0,0,0.3)]">ICH.</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-500 font-medium max-w-lg leading-tight">
              Premium Coaching, modernste Technik und dein persönlicher KI-Coach – vereint in einer App. Direkt im casasports Oer-Erkenschwick.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login" className="px-10 py-5 bg-[#FF0000] text-white font-black uppercase italic text-lg rounded-2xl shadow-2xl shadow-[#FF0000]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                JETZT STARTEN <ArrowRight className="w-6 h-6" />
              </Link>
              <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase italic text-lg rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                DOWNLOAD PWA <PlayCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-[#FF0000]/10 blur-[100px] rounded-full" />
            <div className="relative glass-card rounded-[60px] p-4 border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700">
              <img
                src="/login_hero_fitness.png"
                alt="casasports App Preview"
                className="rounded-[40px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 border-y border-white/5 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: '24/7', label: 'Zugang' },
            { val: '1000+', label: 'Mitglieder' },
            { val: '5.0', label: 'Bewertung' },
            { val: 'AI', label: 'Coaching' },
          ].map(stat => (
            <div key={stat.label} className="space-y-2">
              <p className="text-5xl md:text-7xl font-black italic tracking-tighter">{stat.val}</p>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="apps" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">DEINE APP. <span className="text-[#FF0000]">DEINE VORTEILE.</span></h2>
            <p className="text-zinc-500 font-medium max-w-xl mx-auto">Alles was du für dein Training brauchst, direkt auf deinem Smartphone. Kein Plastik, kein Stress.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Check-In', desc: 'Sekundenschneller Zugang durch dynamische QR-Codes – auch offline.', icon: Award },
              { title: 'AI Coach', desc: 'Individuelle Trainingspläne, erstellt von unserer hochmodernen KI.', icon: MessageSquare },
              { title: 'Booking', desc: 'Reserviere deinen Platz in der Sauna oder deinen Kurs mit einem Klick.', icon: Calendar },
            ].map(feat => (
              <div key={feat.title} className="glass-card p-10 rounded-[40px] space-y-6 hover:bg-white/10 transition-colors group">
                <div className="w-14 h-14 bg-[#FF0000]/10 rounded-2xl flex items-center justify-center text-[#FF0000] group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tight">{feat.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <span className="text-white font-black text-2xl tracking-tighter uppercase italic">casasports</span>
          </div>
          <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em]">
            &copy; 2026 CASASPORTS FITNESS SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
