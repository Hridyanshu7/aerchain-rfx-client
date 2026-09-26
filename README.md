# RFX Pilot

An AI-assisted RFx prototype for creating sourcing events, accepting unconstrained vendor responses, and generating defensible award recommendations.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add `GEMINI_API_KEY` to `.env.local` for real vendor extraction and RFx chat. Without it, the UI remains usable and calls explain the missing setup rather than fabricating AI results.

## Demo routes

- `/` — choose a preloaded event or create an RFx
- `/rfx/new` — guided RFx conversation
- `/rfx/demo` — comparison, overview, recommendation, RFx chat and CSV export
- `/vendor/apex` — no-login vendor upload page

## Deployment

Import this GitHub repository into Vercel, then add `GEMINI_API_KEY` as an environment variable. Supabase credentials are reserved in `.env.example` for the persistence milestone.
