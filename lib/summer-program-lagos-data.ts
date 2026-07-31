// lib/summer-program-lagos-data.ts
//
// Data + pricing helpers for the Ekondo Kids Summer Program — Lagos Edition.
// Lagos runs as single Saturday sessions (unlike the Abuja 4-week program),
// so pricing is: (price per child per day) x (days selected) x (number of kids),
// with a discount applied once a family registers more than 3 kids.

export interface ActivityTag {
  label: string;
  color: string; 
}

export const ACTIVITIES: ActivityTag[] = [
  { label: "🎨 Paint", color: "bg-[#f5c842]/30" },
  { label: "🌱 Plant", color: "bg-[#8fbf9f]/40" },
  { label: "🪴 Gardening", color: "bg-[#8fbf9f]/40" },
  { label: "🖌️ Creative Play", color: "bg-[#f5c842]/30" },
];

export const HEAR_ABOUT_OPTIONS = [
  "Instagram",
  "Friend or Family",
  "Google Search",
  "WhatsApp",
  "Flyer",
  "Other",
];

// Every Saturday in August 2026
export const LAGOS_CAMP_DATES = [
  "2026-08-01",
  "2026-08-08",
  "2026-08-15",
  "2026-08-22",
  "2026-08-29",
];

export const getAvailableLagosDates = () => LAGOS_CAMP_DATES;

export const PRICE_PER_CHILD_PER_DAY = 15000;

// Discount kicks in once a family registers MORE than 3 kids (i.e. 4+)
export const DISCOUNT_KID_THRESHOLD = 3;
export const DISCOUNT_PERCENT = 0.1; // 10% off, per current flyer

export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

/**
 * Calculates the total program fee.
 * @param selectedDates - the Saturdays the family is registering for
 * @param numberOfKids - total number of children attending (including the primary child on the form)
 */
export const calculateLagosAmount = (
  selectedDates: string[],
  numberOfKids: number
): number => {
  if (!selectedDates.length || !numberOfKids) return 0;

  const subtotal = PRICE_PER_CHILD_PER_DAY * selectedDates.length * numberOfKids;

  const discountApplies = numberOfKids > DISCOUNT_KID_THRESHOLD;
  const total = discountApplies ? subtotal * (1 - DISCOUNT_PERCENT) : subtotal;

  return Math.round(total);
};