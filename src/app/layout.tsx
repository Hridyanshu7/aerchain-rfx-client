import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RFX Pilot | Procurement intelligence",
  description: "Turn messy supplier responses into defensible sourcing decisions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

