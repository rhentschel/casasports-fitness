import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let userContext = "";
    if (user) {
        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
                contract: true,
                trainingPlans: { orderBy: { createdAt: 'desc' }, take: 1 },
                checkIns: { orderBy: { timestamp: 'desc' }, take: 5 }
            }
        });

        if (dbUser) {
            const lastTraining = dbUser.checkIns[0]
                ? `Last seen: ${dbUser.checkIns[0].timestamp.toLocaleDateString()}`
                : "Has not checked in recently.";

            userContext = `User: ${dbUser.name || 'Member'}\nContract: ${dbUser.contract?.type || 'Standard'}\nActivity: ${lastTraining}`;
        }
    }

    const systemPrompt = `Du bist 'Maximilian', ein Elite KI-Health-Coach.
  Kontext zum Nutzer:
  ${userContext}
  
  Deine Art: Streng, motivierend, datengetrieben.
  Antworte kurz und prägnant auf Deutsch.`;

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
