"use client";
import { useState } from "react";
import { MessageSquareText, Send, X } from "lucide-react";

const suggestions = ["Which eligible vendor has the lowest landed cost?", "What could prevent a single-source award?", "Summarize the data limitations."];
export function RfxChat({ context }: { context: string }) {
  const [open, setOpen] = useState(false); const [question, setQuestion] = useState(""); const [messages, setMessages] = useState<Array<{ role: "buyer" | "assistant"; text: string }>>([]); const [loading, setLoading] = useState(false);
  async function ask(value = question) { if (!value.trim() || loading) return; setMessages((all) => [...all, { role: "buyer", text: value }]); setQuestion(""); setLoading(true); const response = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: value, context }) }); const data = await response.json(); setMessages((all) => [...all, { role: "assistant", text: response.ok ? data.answer : data.error }]); setLoading(false); }
  return <>
    <button className="chat-button" onClick={() => setOpen(true)}><MessageSquareText size={17} /> Ask this RFx</button>
    {open && <aside className="rfx-chat">
      <header><b>RFx analysis</b><button onClick={() => setOpen(false)}><X size={18} /></button></header>
      <p>Answers use eligible, confirmed data only.</p>
      <div className="chat-messages">{messages.map((message, index) => <div className={message.role} key={index}>{message.text}</div>)}{loading && <div className="assistant">Analyzing confirmed data…</div>}</div>
      {messages.length === 0 && <div className="suggestions">{suggestions.map((item) => <button key={item} onClick={() => ask(item)}>{item}</button>)}</div>}
      <div className="chat-input"><input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="Ask about this RFx" /><button onClick={() => ask()}><Send size={16} /></button></div>
    </aside>}
  </>;
}
