"use client";
import { useEffect } from "react";
import { captureUTMParams } from "@/lib/utils";

export default function UTMTracker() {
  useEffect(() => {
    captureUTMParams();
  }, []);
  return null;
}
