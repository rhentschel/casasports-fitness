import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@/utils/supabase/server';
import { startOfWeek, endOfWeek } from 'date-fns';

const prisma = new PrismaClient();

export async function GET() {
    // TODO: Fetch bookings from Prisma
    return NextResponse.json({ bookings: [] });
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { resource, startTime } = body;

        if (!resource || !startTime) {
            return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
        }

        // 1. Check Weekly Quota (Max 3)
        const start = startOfWeek(new Date(startTime));
        const end = endOfWeek(new Date(startTime));

        const weeklyBookings = await prisma.booking.count({
            where: {
                userId: user.id,
                startTime: {
                    gte: start,
                    lte: end
                },
                status: 'CONFIRMED'
            }
        });

        if (weeklyBookings >= 3) {
            return NextResponse.json({ success: false, message: 'Wochenlimit erreicht (Max 3).' }, { status: 403 });
        }

        // 2. Check Availability
        const existing = await prisma.booking.findFirst({
            where: {
                resource,
                startTime,
                status: 'CONFIRMED'
            }
        });

        if (existing) {
            return NextResponse.json({ success: false, message: 'Slot reserviert.' }, { status: 409 });
        }

        // 3. Create Booking
        // Ensure User exists in public.User (sync if needed)
        // We assume the user is created on signup. If not, we might fail here.
        // Ideally we upsert the user here to be safe.

        // Check if public user exists
        const publicUser = await prisma.user.findUnique({ where: { id: user.id } });
        if (!publicUser) {
            // Fallback: Create public user profile if missing
            await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email!,
                }
            });
        }

        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                resource,
                startTime,
                status: 'CONFIRMED'
            }
        });

        return NextResponse.json({ success: true, booking });

    } catch (error) {
        console.error('Booking Error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
