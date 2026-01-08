'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { authenticator } from 'otplib';

interface QRCheckInProps {
    secret: string;
    userId: string;
}

export default function QRCheckIn({ secret, userId }: QRCheckInProps) {
    const [token, setToken] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const generateToken = () => {
            try {
                const newToken = authenticator.generate(secret);
                setToken(newToken);
            } catch (e) {
                console.error("Error generating token", e);
            }
        };

        generateToken();

        const interval = setInterval(() => {
            generateToken();
            setTimeLeft(authenticator.timeRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Digitale Mitgliedskarte</h2>
            <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={token} size={200} />
            </div>
            <p className="mt-4 text-gray-400 font-mono text-lg tracking-widest">{token}</p>
            <div className="w-full bg-gray-800 h-1 mt-4 rounded-full overflow-hidden">
                <div
                    className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                />
            </div>
            <p className="text-xs text-gray-500 mt-2">Gültig für {Math.floor(timeLeft)}s</p>
        </div>
    );
}
