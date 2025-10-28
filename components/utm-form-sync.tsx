"use client";
import { useEffect } from "react";
import { getStoredUTM } from "@/lib/utils";

export default function UTMFormSync() {
  useEffect(() => {
    const utm = getStoredUTM();
    if (!utm) return;
    const setValue = (id: string, value?: string) => {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (el && value !== undefined) el.value = value;
    };
    setValue("utm_source", utm.utm_source);
    setValue("utm_medium", utm.utm_medium);
    setValue("utm_campaign", utm.utm_campaign);
    setValue("utm_term", utm.utm_term);
    setValue("utm_content", utm.utm_content);
    setValue("referrer", utm.referrer);
  }, []);
  return null;
}