import { NextResponse } from 'next/server';

export async function GET() {
    // TODO: Fetch bookings from Prisma
    return NextResponse.json({ bookings: [] });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, resource, startTime } = body;

        // TODO: Check availability and create booking in Prisma

        return NextResponse.json({ success: true, warning: 'Mock implementation' });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
