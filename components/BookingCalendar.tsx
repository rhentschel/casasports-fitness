'use client';

import { useState } from 'react';
import { format, addDays, startOfToday, setHours, setMinutes } from 'date-fns';
import { de } from 'date-fns/locale';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function BookingCalendar() {
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const timeSlots = [18, 19, 20, 21]; // Sauna slots: 18:00 - 21:00

    // Generate next 7 days
    const days = Array.from({ length: 7 }).map((_, i) => addDays(startOfToday(), i));

    const handleBooking = async (date: Date, hour: number) => {
        setLoading(true);
        setStatus('idle');
        setMessage('');

        const bookingTime = setMinutes(setHours(date, hour), 0);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'mock-user-id', // TODO: user context
                    resource: 'Sauna',
                    startTime: bookingTime.toISOString(),
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setMessage('Slot erfolgreich gebucht! Wir sehen uns in der Sauna.');
            } else {
                setStatus('error');
                setMessage(data.message || 'Buchung fehlgeschlagen.');
            }
        } catch (e) {
            setStatus('error');
            setMessage('Ein Fehler ist aufgetreten.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Sauna Reservierung</h2>

            {/* Date Selector */}
            <div className="flex overflow-x-auto gap-2 pb-4 mb-4 scrollbar-hide">
                {days.map((day) => (
                    <button
                        key={day.toString()}
                        onClick={() => setSelectedDate(day)}
                        className={`flex flex-col items-center p-3 rounded-lg min-w-[70px] border transition-colors ${day.toDateString() === selectedDate.toDateString()
                                ? 'bg-blue-600 border-blue-500 text-white'
                                : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <span className="text-xs font-bold uppercase">{format(day, 'EEE', { locale: de })}</span>
                        <span className="text-lg font-bold">{format(day, 'd')}</span>
                    </button>
                ))}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((hour) => (
                    <button
                        key={hour}
                        onClick={() => handleBooking(selectedDate, hour)}
                        disabled={loading}
                        className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 border border-gray-700 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <span className="text-lg font-mono text-blue-400">{hour}:00</span>
                        <span className="text-xs text-gray-500">Frei</span>
                    </button>
                ))}
            </div>

            {/* Feedback Status */}
            {status !== 'idle' && (
                <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${status === 'success' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>
                    {status === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
                    <p className="text-sm">{message}</p>
                </div>
            )}

            {loading && (
                <div className="mt-4 flex justify-center text-blue-400">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            )}
        </div>
    );
}
