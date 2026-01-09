import BookingCalendar from '@/components/BookingCalendar';
import SectionHeader from '@/components/ui/SectionHeader';
import { Calendar } from 'lucide-react';

export default function BookingPage() {
    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-12 pb-32">
            <SectionHeader
                title="Sauna &"
                highlight="Wellness"
                subtitle="Reserviere deinen exklusiven Slot"
                icon={Calendar}
            />

            <section className="glass-card rounded-[40px] p-4 md:p-10 border border-white/5">
                <BookingCalendar />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[32px] bg-zinc-900/30 border border-white/5 space-y-2">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Wichtiger Hinweis</p>
                    <p className="font-bold text-sm leading-relaxed text-zinc-400">
                        Um allen Mitgliedern einen Platz zu ermöglichen, kannst du maximal 3 Sauna-Termine pro Woche buchen.
                    </p>
                </div>
                <div className="p-8 rounded-[32px] bg-zinc-900/30 border border-white/5 space-y-2">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Stornierung</p>
                    <p className="font-bold text-sm leading-relaxed text-zinc-400">
                        Solltest du es nicht schaffen, storniere bitte bis zu 1 Stunde vorher, um den Platz für andere freizugeben.
                    </p>
                </div>
            </div>
        </div>
    );
}
