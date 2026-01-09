import Link from 'next/link';
import { Calendar, MessageSquare, Shield, Activity, User, Dumbbell, TrendingUp, Clock } from 'lucide-react';
import QRCheckIn from '@/components/QRCheckIn';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { authenticator } from 'otplib';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-[#FF0000] rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-[#FF0000]/20">
          <span className="text-white font-black text-2xl italic">C</span>
        </div>
        <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter italic">Nicht angemeldet</h1>
        <p className="text-zinc-500 mb-8 font-medium">Bitte logge dich ein, um dein Dashboard zu sehen.</p>
        <Link href="/login" className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase italic tracking-wider hover:bg-[#FF0000] hover:text-white transition-all shadow-xl">
          ZUM LOGIN →
        </Link>
      </main>
    )
  }

  // Fetch or Create Secret
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { contract: true }
  });

  // Sync / Auto-Create Profile
  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
      }
    });
    dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { contract: true }
    });
  }

  if (!dbUser) return null;

  let secret = dbUser.checkInSecret;
  if (!secret) {
    secret = authenticator.generateSecret();
    await prisma.user.update({
      where: { id: user.id },
      data: { checkInSecret: secret }
    });
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      {/* Header Section */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic italic">
            Hallo, <span className="text-[#FF0000]">{dbUser.name?.split(' ')[0] || 'Mitglied'}</span> 👋
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Zeit für dein nächstes Level.</p>
        </div>
        <div className="flex gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Status</span>
            <span className="text-xs font-bold text-green-500 uppercase">Online</span>
          </div>
          <div className="w-12 h-12 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-zinc-400" />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: QR & Quick Info */}
        <div className="lg:col-span-4 space-y-8">
          <section className="glass-card rounded-[32px] p-8 flex flex-col items-center space-y-6">
            <div className="text-center">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Check-In Code</h3>
              <p className="text-[10px] text-zinc-600 font-medium">Halt dein Handy an den Scanner</p>
            </div>
            <QRCheckIn secret={secret} userId={user.id} />
          </section>

          <div className="glass-card rounded-[32px] p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-wider leading-none">Aktivität</p>
                <p className="font-bold text-sm">4 Trainings diese Woche</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-wider leading-none">Mitgliedschaft</p>
                <p className="font-bold text-sm">{dbUser.contract?.type || 'Premium VIP'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions & Plans */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/bookings" className="glass-card hover:bg-white/10 transition-all p-6 rounded-[32px] border border-white/5 flex flex-col justify-between h-44 group">
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 transition-transform group-hover:scale-110">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-black uppercase italic italic">Sauna & <br />Kurse</p>
                <p className="text-xs text-zinc-500 font-bold mt-1 uppercase tracking-widest">Jetzt Platz sichern</p>
              </div>
            </Link>

            <Link href="/coach" className="glass-card hover:bg-white/10 transition-all p-6 rounded-[32px] border border-white/5 flex flex-col justify-between h-44 group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 transition-transform group-hover:scale-110">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-black uppercase italic italic">AI Health <br />Coach</p>
                <p className="text-xs text-zinc-500 font-bold mt-1 uppercase tracking-widest">Frage deinen Experten</p>
              </div>
            </Link>
          </div>

          <Link href="/plans" className="block glass-card hover:bg-white/10 transition-all p-8 rounded-[40px] border border-white/5 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Dumbbell className="w-32 h-32 rotate-12" />
            </div>
            <div className="flex flex-col gap-6 relative z-10">
              <div className="w-14 h-14 bg-[#FF0000]/10 rounded-2xl flex items-center justify-center text-[#FF0000]">
                <Dumbbell className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black uppercase italic italic">Meine <br />Trainingspläne</p>
                <p className="text-sm text-zinc-500 font-bold mt-2 uppercase tracking-[0.2em]">Erreiche dein Ziel schneller</p>
              </div>
              <div className="flex gap-2">
                <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF0000] w-2/3" />
                </div>
                <span className="text-[10px] font-black text-zinc-600 uppercase">65% Erreicht</span>
              </div>
            </div>
          </Link>

          <Link href="/admin" className="block p-8 border-2 border-zinc-900 rounded-[40px] hover:border-[#FF0000]/30 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-lg uppercase tracking-tight">Mitglieder Cockpit</p>
                  <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest">Vertrag & Zahlungen verwalten</p>
                </div>
              </div>
              <Activity className="w-5 h-5 text-zinc-800 group-hover:text-white transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
