import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CoachChat from '@/components/CoachChat';

export default function CoachPage() {
    return (
        <main className="min-h-screen bg-black text-white p-4">
            <header className="flex items-center gap-4 mb-4 pt-4">
                <Link href="/" className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <h1 className="text-2xl font-bold">Dein Coach</h1>
            </header>

            <CoachChat />
        </main>
    );
}
