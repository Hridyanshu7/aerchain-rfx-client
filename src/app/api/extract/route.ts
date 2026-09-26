import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { lineItems } from "@/lib/fixtures";

export const runtime = "nodejs";
const schema = { type: "object", required: ["lineQuotes", "warnings"], properties: { lineQuotes: { type: "array", items: { type: "object", required: ["sourceDescription", "matchedLineItemId", "price", "priceUnit", "currency", "confidence"], properties: { sourceDescription: { type: "string" }, matchedLineItemId: { type: ["string", "null"] }, price: { type: ["number", "null"] }, priceUnit: { type: ["string", "null"] }, currency: { type: ["string", "null"] }, confidence: { type: "string", enum: ["confirmed", "needs_review"] } } } }, warnings: { type: "array", items: { type: "string" } } } };
export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Gemini is not configured. Add GEMINI_API_KEY to run real extraction." }, { status: 503 });
  const form = await request.formData(); const message = String(form.get("message") || ""); const files = form.getAll("files").filter((item): item is File => item instanceof File);
  if (!message && !files.length) return NextResponse.json({ error: "Add a message or file." }, { status: 400 });
  const catalogue = lineItems.map((x) => `${x.id}: ${x.description}; unit=${x.preferredUnit}`).join("\n");
  const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [{ text: `Extract a vendor response to this RFx. Never invent values. Match only supported lines. Preserve source price/unit/currency; set needs_review for ambiguous text, unreadable values, absent units, or unsafe conversions. Buyer catalogue:\n${catalogue}\nVendor message:\n${message || "None"}` }];
  for (const file of files.slice(0, 5)) parts.push({ inlineData: { mimeType: file.type || "application/octet-stream", data: Buffer.from(await file.arrayBuffer()).toString("base64") } });
  try { const ai = new GoogleGenAI({ apiKey }); const result = await ai.models.generateContent({ model: "gemini-3.1-flash-lite", contents: [{ role: "user", parts }], config: { responseMimeType: "application/json", responseJsonSchema: schema } }); return NextResponse.json({ extraction: JSON.parse(result.text || "{}") }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Extraction failed" }, { status: 502 }); }
}
