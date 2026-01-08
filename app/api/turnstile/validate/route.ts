import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticator } from 'otplib';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');

    if (!userId || !token) {
        return NextResponse.json({ access: false, error: 'Missing parameters' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { checkInSecret: true, contract: true }
        });

        if (!user || !user.checkInSecret) {
            return NextResponse.json({ access: false, error: 'User not found or no secret' }, { status: 404 });
        }

        if (user.contract?.status !== 'ACTIVE') {
            return NextResponse.json({ access: false, error: 'Contract inactive' }, { status: 403 });
        }

        // Validate TOTP
        // We assume the window is default (30s) or slightly larger for drift
        const isValid = authenticator.check(token, user.checkInSecret);

        if (isValid) {
            // Log successful entry
            await prisma.checkIn.create({
                data: {
                    userId,
                    method: 'QR_VALIDATED'
                }
            });
            return NextResponse.json({ access: true, message: 'Access Granted' });
        } else {
            return NextResponse.json({ access: false, error: 'Invalid Token' }, { status: 401 });
        }

    } catch (error) {
        console.error('Turnstile Error:', error);
        return NextResponse.json({ access: false, error: 'Internal Error' }, { status: 500 });
    }
}
