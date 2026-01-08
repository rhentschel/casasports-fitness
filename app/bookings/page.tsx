import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BookingCalendar from '@/components/BookingCalendar';

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-black text-white p-4">
            <header className="flex items-center gap-4 mb-8 pt-4">
                <Link href="/" className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <h1 className="text-2xl font-bold">Termin buchen</h1>
            </header>

            <section>
                <BookingCalendar />
            </section>

            <div className="mt-8 p-4 bg-gray-900/50 rounded-xl text-xs text-gray-500">
                <p>Hinweis: Sie können maximal 3 Sauna-Termine pro Woche buchen.</p>
                <p className="mt-2">Stornierungen sind bis 1 Stunde vor Termin möglich.</p>
            </div>
        </main>
    );
}
