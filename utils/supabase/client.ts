import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/['"]+/g, '').trim() || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/['"]+/g, '').trim() || ''

    return createBrowserClient(
        supabaseUrl,
        supabaseKey
    )
}
