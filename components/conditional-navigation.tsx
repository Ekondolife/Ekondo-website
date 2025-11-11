"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/navigation";
import FestivalBanner from "@/components/festival-banner";

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Don't show navigation on login page
  if (pathname === "/login") {
    return null;
  }
  
  return (
    <>
      <FestivalBanner />
      <Navigation />
    </>
  );
}
