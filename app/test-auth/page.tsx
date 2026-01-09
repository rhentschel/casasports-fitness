"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function TestAuthPage() {
    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const test = async () => {
            const supabase = createClient()
            const results: any = {}

            // Test 1: Env Check
            results.env = {
                url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'MISSING',
                key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'OK' : 'MISSING',
                urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL
            }

            // Test 2: Connection
            try {
                const { data, error } = await supabase.from('User').select('id').limit(1)
                results.connection = error ? `ERROR: ${error.message}` : 'SUCCESS'
            } catch (e: any) {
                results.connection = `FETCH FAILED: ${e.message}`
            }

            setStatus(results)
            setLoading(false)
        }
        test()
    }, [])

    if (loading) return <div className="p-8 font-mono">Loading Debug Tool...</div>

    return (
        <div className="p-8 font-mono text-sm bg-black min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-8 text-green-500">Supabase Debug Interface</h1>

            <div className="space-y-6">
                <section className="p-4 border border-zinc-800 rounded-lg">
                    <h2 className="text-zinc-500 uppercase text-xs mb-2">Environment Configuration</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <span>URL Status:</span> <span className={status.env.url === 'OK' ? 'text-green-400' : 'text-red-400'}>{status.env.url}</span>
                        <span>URL Value:</span> <span className="text-blue-400">{status.env.urlValue || 'N/A'}</span>
                        <span>Key Status:</span> <span className={status.env.key === 'OK' ? 'text-green-400' : 'text-red-400'}>{status.env.key}</span>
                    </div>
                </section>

                <section className="p-4 border border-zinc-800 rounded-lg">
                    <h2 className="text-zinc-500 uppercase text-xs mb-2">Network Connectivity Test</h2>
                    <div className="flex items-center gap-2">
                        <span>Status:</span>
                        <span className={status.connection === 'SUCCESS' ? 'text-green-400' : 'text-red-400'}>
                            {status.connection}
                        </span>
                    </div>
                    {status.connection.includes('FETCH FAILED') && (
                        <p className="mt-4 text-xs text-zinc-500 bg-zinc-900 p-2 rounded">
                            This usually means the browser or server cannot resolve the domain or the request is being blocked by a firewall/SSL issue.
                        </p>
                    )}
                </section>

                <div className="text-[10px] text-zinc-600">
                    System Time: {new Date().toISOString()} | Version: 1.0.2
                </div>
            </div>
        </div>
    )
}
