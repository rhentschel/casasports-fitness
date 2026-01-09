import Link from 'next/link';
import { Calendar, MessageSquare, Shield, Activity, User, Dumbbell } from 'lucide-react';
import QRCheckIn from '@/components/QRCheckIn';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { authenticator } from 'otplib';

const prisma = new PrismaClient();

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login if not authenticated
    // For now, we show a "Please Login" message or redirect via middleware
    // We'll let middleware handle protection, but here we handle the "Guest" view
    return (
      <main className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 uppercase tracking-tighter italic text-green-500">casasports Dashboard</h1>
        <Link href="/login" className="px-6 py-3 bg-white text-black rounded-full font-bold">
          Login
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
    // Re-fetch to satisfy type requirements with include
    dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { contract: true }
    });
  }

  if (!dbUser) return null; // Should not happen

  let secret = dbUser.checkInSecret;
  if (!secret) {
    secret = authenticator.generateSecret();
    await prisma.user.update({
      where: { id: user.id },
      data: { checkInSecret: secret }
    });
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 pt-2">
        <div>
          <h1 className="text-xl font-bold">Hallo, {dbUser.name || 'Mitglied'} 👋</h1>
          <p className="text-xs text-gray-400">Let's crush it today!</p>
        </div>
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-400" />
        </div>
      </header>

      {/* QR Code Section */}
      <section className="mb-8 flex justify-center">
        <QRCheckIn secret={secret} userId={user.id} />
      </section>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sauna Booking */}
        <Link href="/bookings" className="bg-gray-900 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gray-800 transition-colors border border-gray-800">
          <div className="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center text-orange-400">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm">Sauna Buchen</span>
        </Link>

        {/* AI Coach */}
        <Link href="/coach" className="bg-gray-900 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gray-800 transition-colors border border-gray-800">
          <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm">AI Coach</span>
        </Link>

        {/* Training Plans */}
        <Link href="/plans" className="col-span-2 bg-gray-900 p-4 rounded-2xl flex flex-row items-center justify-center gap-3 hover:bg-gray-800 transition-colors border border-gray-800">
          <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
            <Dumbbell className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm">Meine Trainingspläne</span>
        </Link>

        {/* Admin (For Demo) */}
        <Link href="/admin" className="col-span-2 bg-gray-900 p-4 rounded-2xl flex flex-row items-center justify-between gap-3 hover:bg-gray-800 transition-colors border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm">Self-Service Cockpit</span>
          </div>
          <Activity className="w-4 h-4 text-gray-600" />
        </Link>
      </div>

      {/* Status Card */}
      <Link href="/profile" className="block mt-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-4 rounded-xl border border-green-900/30 hover:bg-green-900/30 transition-all">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Mitgliedschaft</span>
          <span className="px-2 py-0.5 bg-green-900/40 text-green-300 text-[10px] rounded-full">Aktiv</span>
        </div>
        <p className="text-sm text-gray-300">Vertrag: {dbUser.contract?.type || 'Premium VIP'}</p>
        <p className="text-xs text-gray-500 mt-1">Gültig bis: 31.12.2026</p>
      </Link>
    </main>
  );
}
