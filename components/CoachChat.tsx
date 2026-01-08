'use client';

import { useChat } from '@ai-sdk/react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function CoachChat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/coach',
    } as any) as any;

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <div>
                    <h3 className="font-bold text-white">AI Health Coach</h3>
                    <p className="text-xs text-gray-400">Powered by OpenAI</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        <p>Hallo Maximilian! Ich bin dein Coach.</p>
                        <p className="text-sm mt-1">Frag mich nach deinem Trainingsplan oder Ernährung.</p>
                    </div>
                )}

                {messages.map((m: any) => (
                    <div
                        key={m.id}
                        className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''
                            }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                                }`}
                        >
                            {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>

                        <div
                            className={`p-3 rounded-lg max-w-[80%] text-sm ${m.role === 'user'
                                ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30'
                                : 'bg-gray-800 text-gray-100 border border-gray-700'
                                }`}
                        >
                            {m.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                        <div className="p-3 rounded-lg bg-gray-800 border border-gray-700 w-16 h-10 flex items-center justify-center">
                            <span className="animate-pulse">...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
                <input
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Wie viele Kalorien sollte ich heute essen?"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}
