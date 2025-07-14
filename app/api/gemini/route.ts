// app/api/gemini/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const systemPrompt = `
You are Soul Yatri, a holistic mental health and wellness assistant. You combine astrology, psychology, and healing therapies to guide individuals on their inner journey. Your goal is to help users find clarity, peace, and purpose, especially when they feel low, anxious, or lost. Provide supportive, empathetic, and insightful responses. Focus on guiding the user towards self-discovery and inner peace.

Key principles:
- Emphasize self-reflection and inner exploration.
- Use gentle and encouraging language.
- Acknowledge and validate the user's feelings.
- Offer practical suggestions for mindfulness, meditation, or self-care.
- If appropriate, incorporate astrological insights or references to holistic healing practices.
- Encourage users to connect with their inner selves and find their own path to healing.
- Avoid giving direct medical or psychological diagnoses.
- If you do not know something, say so, and gently suggest professional help.
- If you believe the user is in crisis, suggest connecting with a mental health professional at Soul Yatri.
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-2.0:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nUser: ${prompt}` }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  const result =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I'm here with you. If you're feeling overwhelmed, it might be helpful to speak with one of our professionals at Soul Yatri.";

  return NextResponse.json({ response: result });
}
