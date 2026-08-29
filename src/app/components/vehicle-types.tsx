import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Clock, HelpCircle, X } from "lucide-react";

export type Vehicle = {
  id: number;
  model_name?: string | null;
  model_image?: string | null;
  model_image_cdn?: string | null;
  availability_status?: string | null;
  previous_status?: string | null;
  status_changed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  emergency_service?: string | null;
  scale?: string | null;
  model_year?: string | number | null;
  color?: string | null;
  material?: string | null;
  model_length?: string | number | null;
  model_length_unit?: string | null;
  rating?: string | number | null;
  acquisition_date?: string | null;
  market_value?: string | number | null;
  currency?: string | null;
  acquired_from?: string | null;
  showcase_num?: string | null;
  shelf_num?: string | null;
  box_num?: string | null;
  exhibition_type?: string | null;
  instagram_url?: string | null;
  website_url?: string | null;
  notes?: string | null;
  model_code?: string | null;
  countries?: { name?: string | null; flag_emoji?: string | null } | null;
  manufacturers?: { name?: string | null } | null;
  vehicle_brands?: { name?: string | null } | null;
  series?: { name?: string | null } | null;
};

export const STATUS_STYLES: Record<string, { color: string; bg: string; icon: ReactNode }> = {
  Missing: { color: "text-rose-800", bg: "bg-rose-100/80", icon: <X size={12} /> },
  Wishlist: { color: "text-orange-800", bg: "bg-orange-100/80", icon: <AlertCircle size={12} /> },
  Ordered: { color: "text-amber-800", bg: "bg-amber-100/80", icon: <Clock size={12} /> },
  "Pre-order": { color: "text-amber-800", bg: "bg-amber-100/80", icon: <Clock size={12} /> },
  Collection: { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12} /> },
  Unknown: { color: "text-zinc-600", bg: "bg-zinc-100/80", icon: <HelpCircle size={12} /> },
};

export const COLLECTION_STATUS_VALUES = ["Available", "Available - Displayed", "In Stock", "Collection"];
export const MISSING_STATUS_VALUES = ["Not Available", "Missing"];

export function getStatusDisplayLabel(status: string | null | undefined) {
  const normalized = (status || "").trim().toLowerCase();

  if (!normalized) return "Missing";
  if (COLLECTION_STATUS_VALUES.some((value) => normalized === value.toLowerCase())) return "Collection";
  if (MISSING_STATUS_VALUES.some((value) => normalized === value.toLowerCase())) return "Missing";
  if (normalized === "collection") return "Collection";
  if (normalized === "missing") return "Missing";

  return status || "Unknown";
}

export function getStatusStyle(status: string | null | undefined) {
  const displayStatus = getStatusDisplayLabel(status);
  return STATUS_STYLES[displayStatus] || STATUS_STYLES.Unknown;
}

export const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
