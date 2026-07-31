import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekondo Kids Summer Program 2026 | Register Now",
  description:
    "Four weeks of plants, paint, pottery & play for ages 5–15. Aug 3–28 at Whispers Art Haus, Maitama. Register your child today.",
};

export default function SummerProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
