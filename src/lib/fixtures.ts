import type { LineItem, QuestionnaireTemplate, RfxEvent, Vendor } from "./types";

const families = [
  ["RSC Carton", "3-ply B-flute, brown kraft", "BX"],
  ["Printed RSC Carton", "5-ply BC-flute, two-colour print", "PR"],
  ["Die-cut Mailer", "3-ply E-flute, self-locking", "DM"],
  ["Partition Insert", "3-ply E-flute, die-cut", "PI"],
  ["Corrugated Sheet", "3-ply B-flute, trimmed", "CS"],
] as const;

export const lineItems: LineItem[] = Array.from({ length: 30 }, (_, index) => {
  const [name, specification, prefix] = families[index % families.length];
  const size = `${180 + (index % 6) * 40} × ${120 + (index % 5) * 35} × ${90 + (index % 4) * 25} mm`;
  return {
    id: `LI-${String(index + 1).padStart(2, "0")}`,
    sku: `${prefix}-${String(index + 1).padStart(3, "0")}`,
    name,
    description: `${name}, ${size}`,
    annualQuantity: 18000 + (index % 6) * 7000,
    preferredUnit: "piece",
    specification,
  };
});

export const packagingTemplate: QuestionnaireTemplate = {
  id: "packaging-supplier-v1",
  name: "Packaging supplier qualification",
  version: 1,
  questions: [
    { id: "q1", label: "Confirm a current quality-management certification or equivalent.", mandatory: true, scoringArea: "quality" },
    { id: "q2", label: "Confirm acceptance of buyer specifications and incoming inspection.", mandatory: true, scoringArea: "quality" },
    { id: "q3", label: "State available monthly production capacity for this event.", mandatory: true, scoringArea: "delivery" },
    { id: "q4", label: "State standard and expedited lead times.", mandatory: false, scoringArea: "delivery" },
    { id: "q5", label: "State payment terms and any advance-payment condition.", mandatory: false, scoringArea: "commercial" },
  ],
};

export const demoRfx: RfxEvent = {
  id: "rfx-pack-2026-001",
  title: "FY27 Corrugated Packaging Sourcing",
  plant: "Bengaluru manufacturing plant",
  status: "analysis_ready",
  currency: "INR",
  deadline: "2026-10-18T17:30:00+05:30",
  weights: { cost: 40, quality: 30, delivery: 25, commercial: 5 },
  itemCount: 30,
  vendorCount: 5,
  templateId: packagingTemplate.id,
};

export const vendors: Vendor[] = [
  { id: "apex", name: "Apex Cartons", responseFormats: ["XLSX", "DOCX"], eligibility: "eligible", coverage: 30, currency: "INR", responseAt: "2026-10-16T10:05:00+05:30", confidence: "confirmed" },
  { id: "bharat", name: "Bharat Packaging", responseFormats: ["PDF"], eligibility: "eligible", coverage: 27, currency: "INR", responseAt: "2026-10-16T14:20:00+05:30", confidence: "confirmed" },
  { id: "swiftbox", name: "SwiftBox Solutions", responseFormats: ["JPG", "Text"], eligibility: "eligible", coverage: 30, currency: "INR", responseAt: "2026-10-17T09:42:00+05:30", confidence: "needs_review" },
  { id: "globalpak", name: "GlobalPak Imports", responseFormats: ["XLS", "CSV", "PDF"], eligibility: "eligible", coverage: 30, currency: "USD", responseAt: "2026-10-17T12:15:00+05:30", confidence: "confirmed" },
  { id: "valuecorr", name: "ValueCorr Industries", responseFormats: ["DOCX", "PNG"], eligibility: "ineligible", eligibilityReason: "Declared capacity below required monthly demand", coverage: 30, currency: "INR", responseAt: "2026-10-17T16:50:00+05:30", confidence: "confirmed" },
];

export type DemoQuote = { lineItemId: string; vendorId: string; normalizedUnitPrice: number | null; sourceUnit: string; confidence: "confirmed" | "needs_review"; };
export const demoQuotes: DemoQuote[] = lineItems.flatMap((item, index) => vendors.map((vendor) => {
  if (vendor.id === "bharat" && [4, 13, 25].includes(index)) return { lineItemId: item.id, vendorId: vendor.id, normalizedUnitPrice: null, sourceUnit: "Not quoted", confidence: "needs_review" as const };
  if (vendor.id === "swiftbox" && index % 7 === 0) return { lineItemId: item.id, vendorId: vendor.id, normalizedUnitPrice: null, sourceUnit: "₹42/kg · review", confidence: "needs_review" as const };
  const base = 5.8 + (index % 5) * 0.72;
  const multiplier = vendor.id === "apex" ? 1.08 : vendor.id === "bharat" ? 1.01 : vendor.id === "swiftbox" ? 0.98 : vendor.id === "globalpak" ? 0.94 : 0.87;
  const sourceUnit = vendor.id === "bharat" ? `₹${(base * multiplier * 100).toFixed(0)}/100` : vendor.id === "globalpak" ? `$${((base * multiplier) / 84.2).toFixed(3)}/pc` : `₹${(base * multiplier).toFixed(2)}/pc`;
  return { lineItemId: item.id, vendorId: vendor.id, normalizedUnitPrice: Number((base * multiplier).toFixed(2)), sourceUnit, confidence: "confirmed" as const };
}));
