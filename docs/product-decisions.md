# Product decisions

RFX Pilot is designed as a guided vertical SaaS workflow rather than an open-ended agent. It starts with a conversational RFx builder, but every user follows the same journey: create, invite, collect, compare, recommend, export. This makes procurement concepts accessible without removing buyer control.

Vendors are deliberately not forced into a template. The secure, no-login response page accepts free text and common spreadsheets, documents, PDFs, and images. The extractor maps evidence to the buyer’s RFx catalogue, preserves price units and currency, and only normalizes when supported. This is the point of the product: a buyer should not have to rekey scattered supplier responses into a spreadsheet.

Trust is a product feature. Low-confidence or non-comparable values remain visible with a Needs review state but are excluded from rankings, totals, recommendations, and chat analysis until resolved. Ineligible suppliers are greyed out rather than deleted, preserving an audit trail. The analysis chat is intentionally read-only and works from eligible, confirmed data only; it must name material missing or excluded information.

The demo event uses corrugated packaging because it creates believable price-basis ambiguity: piece, per 100, bundle, and kg. Cost is weighted at 40%, followed by quality/compliance (30%), delivery/capacity (25%), and commercial terms (5%). Quality certification, specification acceptance, and capacity are mandatory eligibility gates. GST is included in landed cost; vendor-level freight is included once per selected supplier, not fabricated as a line-level allocation.

Deliberately left out: authentication, a full approval engine, real email sending, bid revisions, certificate verification, and production Supabase persistence. These are meaningful enterprise additions, but they do not improve the central demonstration of multimodal extraction, trustworthy normalization, and a defensible award decision.
