"use client";

import { ArrowRight, Bot, CheckCircle2, ClipboardList, FileUp, ShieldCheck, Sparkles } from "lucide-react";
import { demoRfx, lineItems, vendors } from "@/lib/fixtures";

const capabilities = [
  [FileUp, "Read any response", "Spreadsheets, PDFs, Word files, images and free text in one intake."],
  [ShieldCheck, "Show what needs attention", "Low-confidence values are visible but excluded until resolved."],
  [Sparkles, "Make the award defensible", "Compare confirmed, eligible landed cost with quality and delivery."],
];

export default function Home() {
  return (
    <main className="shell">
      <nav className="topbar">
        <div className="brand"><span className="brand-mark">R</span><span>RFX Pilot</span></div>
        <div className="nav-status"><span className="dot" /> Demo workspace</div>
      </nav>

      <section className="hero">
        <div className="eyebrow"><Bot size={15} /> PROCUREMENT INTELLIGENCE</div>
        <h1>From scattered quotes<br />to a decision you can defend.</h1>
        <p className="hero-copy">Build an RFx in conversation, let suppliers answer in their own format, and compare every confirmed response in one trusted workspace.</p>
        <div className="entry-grid">
          <a className="entry-card primary" href="/rfx/demo">
            <div className="entry-icon"><ClipboardList /></div>
            <div><span className="card-kicker">EXPLORE A COMPLETED EVENT</span><h2>{demoRfx.title}</h2><p>{vendors.length} vendor responses · {lineItems.length} line items · analysis ready</p></div>
            <ArrowRight className="entry-arrow" />
          </a>
          <a className="entry-card" href="/rfx/new">
            <div className="entry-icon muted"><Sparkles /></div>
            <div><span className="card-kicker">CREATE A NEW RFx</span><h2>Start with your requirement</h2><p>Talk through the need or upload an image or spreadsheet to create a structured draft.</p></div>
            <ArrowRight className="entry-arrow" />
          </a>
        </div>
      </section>

      <section className="capability-section">
        {capabilities.map(([Icon, title, description]) => {
          const CapabilityIcon = Icon as typeof FileUp;
          return <article className="capability" key={title as string}><CapabilityIcon /><h3>{title as string}</h3><p>{description as string}</p></article>;
        })}
      </section>
    </main>
  );
}

