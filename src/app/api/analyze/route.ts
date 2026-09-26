import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Gemini is not configured. Add GEMINI_API_KEY to enable RFx analysis." }, { status: 503 });
  const { question, context } = await request.json() as { question?: string; context?: string };
  if (!question || !context) return NextResponse.json({ error: "Question and RFx context are required." }, { status: 400 });
  const instruction = `You are an RFx analysis assistant. Answer only from the confirmed, eligible data supplied below. Do not change allocations, weights, or source data. Be concise, decision-focused, and state limitations when material.\n\nRFx context:\n${context}\n\nBuyer question: ${question}`;
  try { const ai = new GoogleGenAI({ apiKey }); const result = await ai.models.generateContent({ model: "gemini-3.8-flash", contents: instruction }); return NextResponse.json({ answer: result.text }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Analysis failed" }, { status: 502 }); }
}
