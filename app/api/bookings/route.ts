import { NextResponse } from 'next/server';

// Mock database for demonstration purposes
// In production, this would be a Prisma call
let mockBookings: any[] = [];

export async function GET() {
    // TODO: Fetch bookings from Prisma
    return NextResponse.json({ bookings: [] });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, resource, startTime } = body;

        // Validate inputs
        if (!userId || !resource || !startTime) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        // Mock Quota Check: Max 3 bookings per week
        // In a real app: await prisma.booking.count({ ... })
        const userBookings = mockBookings.filter(b => b.userId === userId);
        if (userBookings.length >= 3) {
            return NextResponse.json({ success: false, message: 'Wochenlimit erreicht (Max 3 Termine).' }, { status: 403 });
        }

        // Mock Availability Check: Is slot taken?
        const isTaken = mockBookings.some(b => b.startTime === startTime && b.resource === resource);
        if (isTaken) {
            return NextResponse.json({ success: false, message: 'Termin bereits vergeben.' }, { status: 409 });
        }

        // Create Booking
        const newBooking = {
            id: Math.random().toString(36).substr(2, 9),
            userId,
            resource,
            startTime,
            createdAt: new Date().toISOString()
        };
        mockBookings.push(newBooking);

        console.log('Booked:', newBooking);

        return NextResponse.json({ success: true, booking: newBooking });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
