import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in search params, use it as the redirection URL
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            // Safety: Ensure user exists in Prisma after verification
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                try {
                    const { PrismaClient } = await import('@prisma/client')
                    const prisma = new PrismaClient()
                    await prisma.user.upsert({
                        where: { id: user.id },
                        update: {},
                        create: {
                            id: user.id,
                            email: user.email!,
                            name: user.user_metadata?.full_name || user.email?.split('@')[0],
                            role: 'MEMBER'
                        }
                    })
                    await prisma.$disconnect()
                } catch (e) {
                    console.error('Callback: Prisma sync failed', e)
                }
            }
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?message=Authentifizierung fehlgeschlagen`)
}
