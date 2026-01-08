'use client';

import { useState, useEffect } from 'react';
import { Dumbbell, Plus, Sparkles, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';

export default function PlansPage() {
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [showGenerator, setShowGenerator] = useState(false);
    const [goal, setGoal] = useState('');

    // Fetch Plans
    useEffect(() => {
        fetch('/api/plans/list') // Need to build this or use Server Action
            .then(res => res.json())
            .then(data => setPlans(data.plans || []));
    }, []);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setGenerating(true);
        try {
            const res = await fetch('/api/plans/generate', {
                method: 'POST',
                body: JSON.stringify({ goal }),
            });
            const data = await res.json();
            setPlans([data.plan, ...plans]);
            setShowGenerator(false);
            setGoal('');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-4 pb-24">
            <header className="flex items-center justify-between mb-8 pt-4">
                <Link href="/" className="text-gray-400 hover:text-white">← Zurück</Link>
                <h1 className="text-2xl font-bold">Meine Pläne</h1>
                <button
                    onClick={() => setShowGenerator(true)}
                    className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors">
                    <Plus className="w-5 h-5" />
                </button>
            </header>

            {/* Generator Modal */}
            {showGenerator && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md border border-gray-800">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            AI Plan erstellen
                        </h3>
                        <form onSubmit={handleGenerate}>
                            <label className="block text-sm text-gray-400 mb-2">Dein Ziel für diesen Plan?</label>
                            <input
                                value={goal}
                                onChange={e => setGoal(e.target.value)}
                                placeholder="z.B. Dicke Arme, Mobility für Rücken..."
                                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white mb-6 focus:border-blue-500 outline-none"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setShowGenerator(false)} className="flex-1 py-3 text-gray-400">Abbrechen</button>
                                <button
                                    type="submit"
                                    disabled={generating}
                                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold disabled:opacity-50"
                                >
                                    {generating ? 'Generiere...' : 'Erstellen ✨'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Plans List */}
            <div className="space-y-6">
                {plans.map(plan => {
                    const content = typeof plan.content === 'string' ? JSON.parse(plan.content) : plan.content;
                    return (
                        <div key={plan.id} className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                            <div className="mb-4">
                                <h2 className="text-lg font-bold text-white">{content.title || 'Trainingsplan'}</h2>
                                <p className="text-xs text-gray-400">{content.description}</p>
                            </div>

                            <div className="space-y-3">
                                {content.exercises?.map((ex: any, i: number) => (
                                    <div key={i} className="flex items-start gap-3 p-2 bg-black/40 rounded-lg hover:bg-black/60 transition-colors cursor-pointer group">
                                        <div className="mt-1 text-gray-600 group-hover:text-green-500 transition-colors">
                                            <Circle className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-gray-200">{ex.name}</p>
                                            <p className="text-xs text-gray-500">{ex.sets} Sets × {ex.reps} • {ex.notes}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
                                <span>Erstellt am {new Date(plan.createdAt).toLocaleDateString()}</span>
                                <button className="text-red-400 hover:text-red-300">Löschen</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
