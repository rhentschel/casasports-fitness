import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star, Users, Award, PlayCircle, MessageSquare, Calendar, MapPin, Zap, Dumbbell, ShieldCheck, Phone, Mail, Clock, Heart, Move, Activity } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Auto-redirect to dashboard if already logged in
    if (user) {
      redirect('/dashboard');
    }
  } catch (e) {
    console.warn('Session check on landing page failed, likely due to missing Supabase config.');
  }

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
            {[
              { name: 'Apps', id: 'apps' },
              { name: 'Training', id: 'training' },
              { name: 'Preise', id: 'preise' },
              { name: 'Standort', id: 'standort' }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-[#FF0000] transition-colors">
                {item.name}
              </a>
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

      {/* Apps Section */}
      <section id="apps" className="py-32 px-6 bg-gradient-to-b from-black to-zinc-900/50">
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

      {/* Training Section */}
      <section id="training" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">TRAINING <br /> OHNE <span className="text-[#FF0000]">LIMITS.</span></h2>
              <p className="text-zinc-500 font-medium max-w-md">Von modernstem Krafttraining bis zur Entspannung in unserer Wellness-Oase.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 glass-card rounded-2xl flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#FF0000]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">High Performance Lab</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-[40px] h-[500px] border border-white/5">
              <img src="/login_hero_fitness.png" alt="Krafttraining" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 p-2 space-y-4">
                <div className="w-12 h-1 bg-[#FF0000] rounded-full" />
                <h3 className="text-4xl font-black uppercase italic">KRAFT & AUSDAUER</h3>
                <p className="text-zinc-400 font-medium max-w-xs">Trainiere mit modernsten Geräten von Matrix & Life Fitness in einer motivierenden Atmosphäre.</p>
              </div>
            </div>
            <div className="space-y-8">
              {[
                { title: 'Functional Training', desc: 'Verbessere deine Performance mit freien Gewichten und athletischen Bewegungen.', icon: Move },
                { title: 'Wellness & Sauna', desc: 'Entspanne in unserer KLAFS Sauna oder der Röger Infrarotkabine nach dem Training.', icon: Heart },
                { title: 'Fitnesskurse', desc: 'HIIT, Bootcamp oder Body & Mind – finde den Kurs, der zu dir passt.', icon: Users },
              ].map(item => (
                <div key={item.title} className="glass-card p-8 rounded-[32px] flex items-center gap-8 hover:bg-white/5 transition-colors border-white/5">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#FF0000] shrink-0">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase italic">{item.title}</h4>
                    <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preise Section */}
      <section id="preise" className="py-32 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">FAIRE PREISE. <br /> <span className="text-[#FF0000]">KEIN KLEINGEDRUCKTES.</span></h2>
            <p className="text-zinc-500 font-medium max-w-xl mx-auto">Wähle das Paket, das am besten zu deinen Zielen passt. Alle Tarife inklusive PWA-Nutzerkonto.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '49,90', features: ['Basis Training', '24/7 Zugang', 'App Check-In', 'Standard Support'], recommended: false },
              { name: 'Professional', price: '69,90', features: ['Alles aus Starter', 'Getränke Flatrate', 'KLAFS Sauna Zugang', 'AI Coach Zugang'], recommended: true },
              { name: 'VIP Premium', price: '89,90', features: ['Alles aus Professional', 'Monatliches 1:1 Coaching', 'Infrarotkabine Inkl.', 'Exklusive Events'], recommended: false },
            ].map((tier) => (
              <div key={tier.name} className={`relative glass-card p-10 rounded-[48px] border-white/5 flex flex-col justify-between h-full transition-transform hover:scale-[1.02] ${tier.recommended ? 'shadow-2xl shadow-[#FF0000]/10 border-[#FF0000]/20' : ''}`}>
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF0000] text-white text-[10px] font-black uppercase tracking-widest rounded-full">Empfehlung</div>
                )}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-black uppercase italic text-zinc-400">{tier.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-5xl font-black italic">{tier.price}€</span>
                      <span className="text-zinc-600 font-bold uppercase text-[10px]">/ Monat</span>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {tier.features.map(feat => (
                      <li key={feat} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#FF0000]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/login" className={`mt-10 w-full py-5 rounded-2xl font-black uppercase italic text-center transition-all ${tier.recommended ? 'bg-[#FF0000] text-white shadow-xl' : 'bg-white text-black hover:bg-[#FF0000] hover:text-white'}`}>
                  JETZT WÄHLEN
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standort Section */}
      <section id="standort" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">DEIN <span className="text-[#FF0000]">CLUB.</span> <br /> DEIN KIEZ.</h2>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed">Modernste Trainingsflächen im Herzen von Oer-Erkenschwick. Parkplätze direkt vor der Tür.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#FF0000]">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Adresse</p>
                  <p className="text-lg font-bold">Karlstraße 40, 45739 Oer-Erkenschwick</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#FF0000]">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Öffnungszeiten</p>
                  <p className="text-lg font-bold">Mo - So: 06:00 - 24:00 Uhr</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#FF0000]">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Kontakt</p>
                  <p className="text-lg font-bold">02368 7060 | info@casasports.de</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] lg:h-[600px] bg-zinc-900 rounded-[48px] border border-white/5 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            {/* Embedded Map or Aesthetic Image */}
            <div className="w-full h-full bg-[url('/login_hero_fitness.png')] bg-cover bg-center brightness-50" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <span className="text-white font-black text-2xl tracking-tighter uppercase italic">casasports</span>
          </div>
          <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em] text-center">
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
