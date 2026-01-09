import { createClient } from '@/utils/supabase/server'

export default async function DebugAuth() {
    const supabase = await createClient()

    let restError = null
    let authError = null
    let envStatus = {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'PRESENT' : 'MISSING',
        urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...'
    }

    try {
        const { error } = await supabase.from('User').select('count', { count: 'exact', head: true })
        restError = error ? error.message : 'SUCCESS'
    } catch (e: any) {
        restError = e.message || e.toString()
    }

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: 'test@example.com',
            password: 'password'
        })
        authError = error ? error.message : 'SUCCESS (or invalid credentials)'
    } catch (e: any) {
        authError = e.message || e.toString()
    }

    return (
        <div className="p-8 font-mono text-sm">
            <h1 className="text-xl font-bold mb-4 text-foreground">Supabase Connection Debug</h1>

            <div className="mb-4 p-4 border rounded bg-black/20 text-foreground">
                <h2 className="font-bold border-b mb-2">Environment</h2>
                <p>URL: {envStatus.url} ({envStatus.urlValue})</p>
                <p>ANON_KEY: {envStatus.key}</p>
            </div>

            <div className="mb-4 p-4 border rounded bg-black/20 text-foreground">
                <h2 className="font-bold border-b mb-2">Rest API Test (/rest/v1)</h2>
                <p className={restError === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}>
                    Result: {restError}
                </p>
            </div>

            <div className="mb-4 p-4 border rounded bg-black/20 text-foreground">
                <h2 className="font-bold border-b mb-2">Auth API Test (/auth/v1)</h2>
                <p className={authError.includes('SUCCESS') || authError.includes('invalid') ? 'text-green-500' : 'text-red-500'}>
                    Result: {authError}
                </p>
            </div>

            <p className="text-foreground/50 text-xs">If Result is 'fetch failed', it means Hostinger cannot reach the URL at all.</p>
        </div>
    )
}
