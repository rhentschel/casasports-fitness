import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, code } = body;

        // TODO: Verify TOTP token here
        // For now, assume valid if code is present
        if (!code || !userId) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        // TODO: Record check-in in DB via Prisma
        console.log(`User ${userId} checked in with code ${code}`);

        return NextResponse.json({ success: true, message: 'Check-in successful' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
