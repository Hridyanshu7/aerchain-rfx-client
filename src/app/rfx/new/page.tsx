"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUp, FileSpreadsheet, ImagePlus, Sparkles } from "lucide-react";

const prompts = [
  "What are you looking to source? Describe the requirement in your own words.",
  "Where will the materials be delivered, and what demand estimate do you have?",
  "Any quality requirements or mandatory supplier qualifications?",
];

export default function NewRfxPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [step, setStep] = useState(0);
  const submit = () => {
    if (!value.trim()) return;
    setMessages((current) => [...current, value.trim()]);
    setValue("");
    setStep((current) => Math.min(current + 1, prompts.length - 1));
  };
  return <main className="builder-shell">
    <header className="builder-top"><a href="/" className="back"><ArrowLeft size={17} /> Workspace</a><span className="draft-pill">Draft RFx</span></header>
    <div className="builder-layout">
      <section className="conversation">
        <div className="eyebrow"><Sparkles size={15} /> RFx CO-PILOT</div>
        <h1>Let&apos;s shape the sourcing event.</h1>
        <p className="subcopy">Start with what you know. I&apos;ll ask only for the details needed to make a usable RFx.</p>
        <div className="chat-stream">
          <div className="assistant-message">{prompts[step]}</div>
          {messages.map((message, index) => <div className="user-message" key={`${message}-${index}`}>{message}</div>)}
        </div>
        <div className="composer"><textarea value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submit(); } }} placeholder="Type your answer…" rows={2} /><button onClick={submit} aria-label="Send"><ArrowUp size={18} /></button></div>
        <div className="upload-row"><button><ImagePlus size={16} /> Add image</button><button><FileSpreadsheet size={16} /> Add spreadsheet</button><span>Uploads are read into the draft and conflicts are flagged.</span></div>
      </section>
      <aside className="draft-panel">
        <div className="panel-label">LIVE RFx DRAFT</div><h2>{messages[0] ? "Untitled sourcing event" : "Your RFx will take shape here"}</h2>
        <div className="draft-block"><span>Scope</span><p>{messages[0] || "Awaiting your requirement"}</p></div>
        <div className="draft-block"><span>Line items</span><p>Will be created from your conversation or uploads</p></div>
        <div className="draft-block"><span>Qualification</span><p>Quality, capacity, and commercial terms</p></div>
      </aside>
    </div>
  </main>;
}

