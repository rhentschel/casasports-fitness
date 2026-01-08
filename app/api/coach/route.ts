import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Helper to append system message if not present
    // But strictly, convertToCoreMessages handles user/assistant mapping.
    // We want to force a system prompt.

    const systemPrompt = `
Du bist ein professioneller KI-Health-Coach für ein Fitnessstudio-Mitglied namens Maximilian (Der Performer).
Deine Persönlichkeit:
- Motivierend, aber sachlich und datengetrieben.
- Experte für Hypertrophie (Muskelaufbau) und Ernährung.
- Du gibst konkrete, wissenschaftlich fundierte Ratschläge.

Kontext:
- Maximilian möchte seine Leistung durch Daten und Ernährung optimieren.
- Er mag keine generischen Ratschläge ("Iss gesund"), sondern spezifische ("Iss 30g Protein nach dem Training").

Antworte kurz und prägnant auf Deutsch.
  `;

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
