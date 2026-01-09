'use server'

import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function submitRequest(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const type = formData.get('type') as string;
    const reason = formData.get('reason') as string;

    await prisma.serviceRequest.create({
        data: {
            userId: user.id,
            type,
            data: JSON.stringify({ reason }),
        }
    });

    revalidatePath('/profile');
}
