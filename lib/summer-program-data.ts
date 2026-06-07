export type ProgramOption = "daily_pass" | "two_weeks" | "full_program" | "not_sure";

export const PROGRAM_OPTIONS: {
  id: ProgramOption;
  label: string;
  price: number;
  description: string;
  badge?: string;
}[] = [
  {
    id: "daily_pass",
    label: "Daily Pass",
    price: 20000,
    description: "₦20,000 per day — pick your date(s)",
  },
  {
    id: "two_weeks",
    label: "Two Weeks",
    price: 150000,
    description: "₦150,000 — half the program",
  },
  {
    id: "full_program",
    label: "Full Program (Early Bird)",
    price: 120000,
    description: "₦120,000 — full program, ends July 15",
    badge: "Best Value",
  },
  {
    id: "not_sure",
    label: "Not Sure Yet",
    price: 0,
    description: "Register your interest — we'll follow up",
  },
];

export const HEAR_ABOUT_OPTIONS = [
  "Instagram",
  "WhatsApp",
  "Friend/Family",
  "Ekondo Community",
  "School",
  "Other",
] as const;

export const ACTIVITIES = [
  { label: "Paint & Plant", color: "bg-orange-400/90" },
  { label: "Indoor Gardening", color: "bg-red-400/80" },
  { label: "Outdoor Gardening", color: "bg-green-400/80" },
  { label: "Creative Upcycling", color: "bg-amber-100 text-amber-900" },
  { label: "Pottery", color: "bg-orange-700/80" },
  { label: "Swimming Lessons", color: "bg-sky-400/80" },
  { label: "Games & Tournaments", color: "bg-pink-400/80" },
  { label: "+ surprise pop-ins", color: "bg-primary/80" },
];

/** Mon–Sat dates between Aug 3 and Aug 28, 2026 */
export function getAvailableCampDates(): string[] {
  const dates: string[] = [];
  const start = new Date("2026-08-03");
  const end = new Date("2026-08-28");

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day !== 0) {
      dates.push(d.toISOString().split("T")[0]);
    }
  }
  return dates;
}

export function calculateAmount(
  option: ProgramOption,
  dailyDates: string[]
): number {
  switch (option) {
    case "daily_pass":
      return 20000 * Math.max(dailyDates.length, 0);
    case "two_weeks":
      return 150000;
    case "full_program":
      return 120000;
    case "not_sure":
      return 0;
    default:
      return 0;
  }
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
