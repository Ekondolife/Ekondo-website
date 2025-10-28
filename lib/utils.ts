import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function captureUTMParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    referrer: document.referrer || "",
  };
  localStorage.setItem("ekondo_utm", JSON.stringify(utm));
}

export function getStoredUTM() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("ekondo_utm") || "{}");
  } catch {
    return {};
  }
}
