export type Confidence = "confirmed" | "needs_review" | "excluded";
export type Eligibility = "eligible" | "ineligible" | "pending";
export type PriceUnit = "piece" | "per_100" | "bundle" | "kg";

export type LineItem = {
  id: string;
  sku: string;
  name: string;
  description: string;
  annualQuantity: number;
  preferredUnit: "piece";
  specification?: string;
};

export type Vendor = {
  id: string;
  name: string;
  responseFormats: string[];
  eligibility: Eligibility;
  eligibilityReason?: string;
  coverage: number;
  currency: "INR" | "USD";
  responseAt: string;
  confidence: Confidence;
};

export type QuestionnaireTemplate = {
  id: string;
  name: string;
  version: number;
  questions: Array<{
    id: string;
    label: string;
    mandatory: boolean;
    scoringArea: "quality" | "delivery" | "commercial";
  }>;
};

export type RfxEvent = {
  id: string;
  title: string;
  plant: string;
  status: "draft" | "open" | "analysis_ready";
  currency: "INR";
  deadline: string;
  weights: { cost: number; quality: number; delivery: number; commercial: number };
  itemCount: number;
  vendorCount: number;
  templateId: string;
};

