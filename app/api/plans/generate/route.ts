import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const maxDuration = 30;

export async function POST(req: Request) {
    const { goal } = await req.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate Plan
    const { text } = await generateText({
        model: openai('gpt-3.5-turbo'),
        system: `You are an expert fitness coach. 
    Create a workout plan based on the user's goal.
    Output MUST be valid JSON with this structure:
    {
      "title": "Short title",
      "description": "Brief summary",
      "exercises": [
        { "name": "Exercise Name", "sets": "3", "reps": "8-12", "notes": "Technique tip" }
      ]
    }`,
        prompt: `Goal: ${goal}`,
    });

    // Save to DB
    const plan = await prisma.trainingPlan.create({
        data: {
            userId: user.id,
            content: text // Store JSON string
        }
    });

    return NextResponse.json({ plan });
}
