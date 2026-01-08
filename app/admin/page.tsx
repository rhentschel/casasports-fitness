'use client';

import { useState } from 'react';
import { Users, Calendar, FileText, Check, X } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'bookings' | 'contracts'>('bookings');

    // Mock Data
    const stats = [
        { label: 'Check-Ins heute', value: 124, icon: Users, color: 'text-blue-400' },
        { label: 'Gebuchte Saunas', value: 8, icon: Calendar, color: 'text-orange-400' },
        { label: 'Offene Anträge', value: 3, icon: FileText, color: 'text-purple-400' },
    ];

    const bookings = [
        { id: 1, user: 'Sabine W.', resource: 'Sauna', time: '18:00', status: 'confirmed' },
        { id: 2, user: 'Maximilian P.', resource: 'Sauna', time: '19:00', status: 'confirmed' },
        { id: 3, user: 'Anna K.', resource: 'Kurs: Yoga', time: '17:30', status: 'cancelled' },
    ];

    const requests = [
        { id: 1, user: 'Tom B.', type: 'Ruhezeit (Urlaub)', date: '01.02. - 14.02.', status: 'pending' },
        { id: 2, user: 'Lisa M.', type: 'Vertragsupgrade', date: 'ab sofort', status: 'pending' },
    ];

    return (
        <main className="min-h-screen bg-black text-white p-4 pb-20">
            <header className="flex items-center gap-4 mb-8 pt-4">
                <Link href="/" className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                <h1 className="text-2xl font-bold">Admin Cockpit</h1>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex flex-col items-center text-center">
                        <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-900 p-1 rounded-lg mb-6">
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'bookings' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    Buchungen
                </button>
                <button
                    onClick={() => setActiveTab('contracts')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'contracts' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    Anträge & Verträge
                </button>
            </div>

            {/* Content */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                {activeTab === 'bookings' ? (
                    <div>
                        <div className="p-4 border-b border-gray-800 bg-gray-800/50">
                            <h3 className="font-semibold text-sm">Aktuelle Reservierungen</h3>
                        </div>
                        {bookings.map((booking) => (
                            <div key={booking.id} className="p-4 border-b border-gray-800 last:border-0 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-sm">{booking.user}</p>
                                    <p className="text-xs text-gray-500">{booking.resource} • {booking.time}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${booking.status === 'confirmed' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                                    }`}>
                                    {booking.status === 'confirmed' ? 'Bestätigt' : 'Storniert'}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className="p-4 border-b border-gray-800 bg-gray-800/50">
                            <h3 className="font-semibold text-sm">Offene Anträge</h3>
                        </div>
                        {requests.map((req) => (
                            <div key={req.id} className="p-4 border-b border-gray-800 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium text-sm">{req.user}</p>
                                        <p className="text-xs text-gray-400">{req.type}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">{req.date}</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <button className="flex-1 py-1 bg-green-900/40 text-green-400 rounded hover:bg-green-900/60 transition-colors text-xs font-bold flex items-center justify-center gap-1">
                                        <Check className="w-3 h-3" /> Genehmigen
                                    </button>
                                    <button className="flex-1 py-1 bg-red-900/40 text-red-400 rounded hover:bg-red-900/60 transition-colors text-xs font-bold flex items-center justify-center gap-1">
                                        <X className="w-3 h-3" /> Ablehnen
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
