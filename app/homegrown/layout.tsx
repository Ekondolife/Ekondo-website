import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homegrown Workshop | Ekondo",
  description:
    "Learn how to grow herbs and vegetables at home. 1 August 2026, 3–6 PM at Whispers Art Haus, Maitama. Tickets ₦5,000 — fully redeemable as plant credit.",
};

export default function HomegrownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
