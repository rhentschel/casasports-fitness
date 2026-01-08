import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { submitRequest } from './actions';
import Link from 'next/link';
import { ArrowLeft, FileText, PauseCircle, Ban } from 'lucide-react';

const prisma = new PrismaClient();

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return <div>Please login</div>;

    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
            contract: true,
            serviceRequests: { orderBy: { createdAt: 'desc' } }
        }
    });

    if (!dbUser) return <div>Profil wird geladen...</div>;

    return (
        <main className="min-h-screen bg-black text-white p-4 pb-20">
            <header className="flex items-center gap-4 mb-8 pt-4">
                <Link href="/" className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <h1 className="text-2xl font-bold">Mein Vertrag & Anträge</h1>
            </header>

            {/* Contract Card */}
            <section className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-white">Premium Mitgliedschaft</h2>
                        <p className="text-sm text-gray-400">Vertragsnummer: #{dbUser.contract?.id?.slice(0, 8) || 'N/A'}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-900/40 text-green-400 text-xs rounded-full border border-green-900">
                        {dbUser.contract?.status || 'Aktiv'}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-black/30 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 block mb-1">Startdatum</span>
                        <span className="font-mono text-sm">01.01.2024</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg">
                        <span className="text-xs text-gray-500 block mb-1">Laufzeit bis</span>
                        <span className="font-mono text-sm">31.12.2025</span>
                    </div>
                </div>
            </section>

            {/* New Request Form */}
            <section className="mb-8">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Neuen Antrag stellen
                </h3>

                <form action={submitRequest} className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Art des Antrags</label>
                        <select name="type" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500">
                            <option value="PAUSE">Ruhezeit beantragen (Krankheit/Urlaub)</option>
                            <option value="CANCEL">Kündigung vormerken</option>
                            <option value="DATA_CHANGE">Stammdaten ändern</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Begründung / Details</label>
                        <textarea name="reason" rows={3} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500" placeholder="Bitte Zeitraum oder Grund angeben..."></textarea>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                        Antrag absenden
                    </button>
                </form>
            </section>

            {/* History */}
            <section>
                <h3 className="font-bold mb-4 text-gray-400 text-sm uppercase tracking-wider">Antragshistorie</h3>
                <div className="space-y-3">
                    {dbUser.serviceRequests.length === 0 && (
                        <p className="text-gray-600 text-center py-8">Keine offenen Anträge.</p>
                    )}
                    {dbUser.serviceRequests.map(req => (
                        <div key={req.id} className="bg-gray-900/50 p-4 rounded-lg flex justify-between items-center border border-gray-800">
                            <div>
                                <p className="font-medium text-sm text-white">
                                    {req.type === 'PAUSE' ? 'Ruhezeit' : req.type === 'CANCEL' ? 'Kündigung' : 'Datenänderung'}
                                </p>
                                <p className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded border ${req.status === 'PENDING' ? 'border-yellow-900 text-yellow-500' :
                                    req.status === 'APPROVED' ? 'border-green-900 text-green-500' : 'border-red-900 text-red-500'
                                }`}>
                                {req.status}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
