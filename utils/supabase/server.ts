import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!rawUrl || !rawKey) {
        console.error("CRITICAL: Supabase Environment Variables are missing!")
    }

    // Strip quotes and whitespace that might be present in Hostinger/Coolify env UI
    const url = rawUrl?.replace(/['"]+/g, '').trim().replace(/\/$/, "")
    const key = rawKey?.replace(/['"]+/g, '').trim()

    return createServerClient(
        url!,
        key!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
