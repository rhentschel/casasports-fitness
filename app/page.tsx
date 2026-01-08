import Link from 'next/link';
import QRCheckIn from '@/components/QRCheckIn';
import { Calendar, Activity, User } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-4 pb-20">
      <header className="flex justify-between items-center mb-8 pt-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Naim Obeid Fitness
        </h1>
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-300" />
        </div>
      </header>

      <section className="mb-8">
        <QRCheckIn />
      </section>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/bookings" className="block">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors">
            <Calendar className="w-8 h-8 text-blue-400 mb-2" />
            <h3 className="font-semibold">Sauna buchen</h3>
            <p className="text-xs text-gray-400">Verfügbarkeit prüfen</p>
          </div>
        </Link>
        <Link href="/coach" className="block">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-purple-500 transition-colors">
            <Activity className="w-8 h-8 text-purple-400 mb-2" />
            <h3 className="font-semibold">AI Coach</h3>
            <p className="text-xs text-gray-400">Training & Ernährung</p>
          </div>
        </Link>
      </div>

      <div className="mt-8 bg-gray-900 p-4 rounded-xl border border-gray-800 text-center">
        <p className="text-sm text-gray-300">Offline-Modus aktiv</p>
        <p className="text-xs text-gray-500 mt-1">Ihr QR-Code funktioniert auch ohne Internet.</p>
      </div>
    </main>
  );
}
