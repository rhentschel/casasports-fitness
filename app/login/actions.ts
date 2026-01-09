'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chocolate-pigeon-749557.hostingersite.com'}/auth/callback`,
        },
    })

    if (error) {
        return redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect(`/login?message=Bitte gib den Bestätigungscode aus deiner E-Mail ein&verify=true&email=${encodeURIComponent(email)}`)
}

export async function verifyOtp(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const token = formData.get('token') as string

    const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
    })

    if (error) {
        return redirect(`/login?message=${encodeURIComponent(error.message)}&verify=true&email=${encodeURIComponent(email)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
