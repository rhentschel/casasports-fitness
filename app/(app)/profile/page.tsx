import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { submitRequest } from './actions';
import Link from 'next/link';
import { ArrowLeft, FileText, PauseCircle, Ban, Activity, ShieldCheck, CreditCard } from 'lucide-react';

const prisma = new PrismaClient();

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-zinc-500 font-bold uppercase tracking-widest">Bitte logge dich ein.</p>
            </div>
        )
    }

    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
            contract: true,
            serviceRequests: { orderBy: { createdAt: 'desc' } }
        }
    });

    if (!dbUser) return <div className="p-10 text-center uppercase font-black tracking-tighter">Profil wird geladen...</div>;

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-12">
            <header className="space-y-2">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                    Mein <span className="text-[#FF0000]">Cockpit</span>
                </h1>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Vertrag & Einstellungen verwalten</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                {/* Contract Info */}
                <div className="md:col-span-12">
                    <section className="glass-card rounded-[40px] p-8 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <ShieldCheck className="w-40 h-40" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black uppercase italic">{dbUser.contract?.type || 'Premium Mitgliedschaft'}</h2>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Vertrags-ID: #{dbUser.contract?.id?.slice(0, 8) || 'CASA-8829'}</p>
                                </div>
                                <span className="px-4 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20">
                                    {dbUser.contract?.status || 'Active'}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Beitrag</span>
                                    <p className="text-xl font-black italic">59,90€ <span className="text-[10px] text-zinc-600 not-italic">/ mtl.</span></p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nächste Abbuchung</span>
                                    <p className="text-xl font-black italic">01.02.2026</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Laufzeit</span>
                                    <p className="text-xl font-black italic">31.12.2026</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Service Request Form */}
                <div className="md:col-span-7 space-y-6">
                    <h3 className="text-xl font-black uppercase italic flex items-center gap-3">
                        <FileText className="w-6 h-6 text-[#FF0000]" />
                        Service & Anträge
                    </h3>

                    <form action={submitRequest} className="glass-card p-8 rounded-[40px] border border-white/5 space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Was möchtest du tun?</label>
                            <select name="type" className="w-full h-14 bg-black border border-white/10 rounded-2xl px-4 text-white font-bold text-sm focus:border-[#FF0000] focus:outline-none transition-all appearance-none cursor-pointer">
                                <option value="PAUSE">Ruhezeit beantragen (Krankheit/Urlaub)</option>
                                <option value="CANCEL">Kündigung vormerken</option>
                                <option value="DATA_CHANGE">Stammdaten ändern</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Details & Zeitraum</label>
                            <textarea
                                name="reason"
                                rows={4}
                                className="w-full bg-black border border-white/10 rounded-[28px] p-5 text-white font-medium text-sm focus:border-[#FF0000] focus:outline-none transition-all placeholder:text-zinc-800"
                                placeholder="Bitte hier Grund oder Zeitraum angeben..."
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full h-14 bg-white text-black font-black uppercase italic rounded-2xl hover:bg-[#FF0000] hover:text-white transition-all shadow-xl shadow-black">
                            ANTRAG ABSENDEN →
                        </button>
                    </form>
                </div>

                {/* Request History */}
                <div className="md:col-span-5 space-y-6">
                    <h3 className="text-xl font-black uppercase italic flex items-center gap-3 text-zinc-600">
                        Historie
                    </h3>
                    <div className="space-y-3">
                        {dbUser.serviceRequests.length === 0 && (
                            <div className="p-10 border-2 border-dashed border-zinc-900 rounded-[40px] text-center">
                                <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">Keine offenen Anträge</p>
                            </div>
                        )}
                        {dbUser.serviceRequests.map(req => (
                            <div key={req.id} className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 flex justify-between items-center group hover:bg-zinc-900 transition-colors">
                                <div>
                                    <p className="font-black text-sm uppercase italic tracking-tight text-white">
                                        {req.type === 'PAUSE' ? 'Ruhezeit' : req.type === 'CANCEL' ? 'Kündigung' : 'Datenänderung'}
                                    </p>
                                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">{new Date(req.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${req.status === 'PENDING' ? 'border-orange-500/20 text-orange-500 bg-orange-500/5' :
                                        req.status === 'APPROVED' ? 'border-green-500/20 text-green-500 bg-green-500/5' :
                                            'border-red-500/20 text-red-500 bg-red-500/5'
                                    }`}>
                                    {req.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
