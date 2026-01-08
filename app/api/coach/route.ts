import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const maxDuration = 30;

export async function POST(req: Request) {
    const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        system: systemPrompt,
        messages: messages.map((m: any) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
        })),
    });

    return result.toTextStreamResponse();
}
