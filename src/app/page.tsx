"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  AlertCircle,
  Archive,
  Box,
  Calendar,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  Factory,
  Globe,
  Hammer,
  HelpCircle,
  Layers,
  Locate,
  MapPin,
  Paintbrush,
  Ruler,
  Search,
  ShieldCheck,
  Star,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";

type Vehicle = {
  id: number;
  model_name?: string | null;
  model_image?: string | null;
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
  countries?: { name?: string | null; flag_emoji?: string | null } | null;
  manufacturers?: { name?: string | null } | null;
  vehicle_brands?: { name?: string | null } | null;
};

type Filters = {
  search: string;
  country: string;
  manufacturer: string;
  brand: string;
  service: string;
};

const DEFAULT_FILTERS: Filters = {
  search: "",
  country: "All",
  manufacturer: "All",
  brand: "All",
  service: "All",
};

const STATUS_STYLES: Record<string, { color: string; bg: string; icon: ReactNode }> = {
  "Not Available": { color: "text-rose-800", bg: "bg-rose-100/80", icon: <X size={12} /> },
  Wishlist: { color: "text-orange-800", bg: "bg-orange-100/80", icon: <AlertCircle size={12} /> },
  Ordered: { color: "text-amber-800", bg: "bg-amber-100/80", icon: <Clock size={12} /> },
  "Pre-order": { color: "text-amber-800", bg: "bg-amber-100/80", icon: <Clock size={12} /> },
  Available: { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12} /> },
  "Available - Displayed": { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12} /> },
  "In Stock": { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12} /> },
  Unknown: { color: "text-zinc-600", bg: "bg-zinc-100/80", icon: <HelpCircle size={12} /> },
};

function getStatusStyle(status: string | null | undefined) {
  if (!status || status.trim() === "") return STATUS_STYLES.Unknown;
  const key = Object.keys(STATUS_STYLES).find((item) => status.toLowerCase().includes(item.toLowerCase()));
  return key ? STATUS_STYLES[key] : STATUS_STYLES["Not Available"];
}

function hasActiveFilters(filters: Filters) {
  return (
    filters.search.trim() !== "" ||
    filters.country !== "All" ||
    filters.manufacturer !== "All" ||
    filters.brand !== "All" ||
    filters.service !== "All"
  );
}

function normalizeFilters(filters: Filters): Filters {
  return {
    search: filters.search.trim(),
    country: filters.country,
    manufacturer: filters.manufacturer,
    brand: filters.brand,
    service: filters.service,
  };
}

function filtersEqual(left: Filters | null, right: Filters | null) {
  if (!left && !right) return true;
  if (!left || !right) return false;

  const normalizedLeft = normalizeFilters(left);
  const normalizedRight = normalizeFilters(right);

  return (
    normalizedLeft.search === normalizedRight.search &&
    normalizedLeft.country === normalizedRight.country &&
    normalizedLeft.manufacturer === normalizedRight.manufacturer &&
    normalizedLeft.brand === normalizedRight.brand &&
    normalizedLeft.service === normalizedRight.service
  );
}

function filtersFromUrl(searchParams: URLSearchParams): Filters {
  return {
    search: searchParams.get("search") || "",
    country: searchParams.get("country") || "All",
    manufacturer: searchParams.get("manufacturer") || "All",
    brand: searchParams.get("brand") || "All",
    service: searchParams.get("service") || "All",
  };
}

function syncUrlWithFilters(filters: Filters | null) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.search = "";

  if (filters) {
    const normalized = normalizeFilters(filters);
    if (normalized.search) url.searchParams.set("search", normalized.search);
    if (normalized.country !== "All") url.searchParams.set("country", normalized.country);
    if (normalized.manufacturer !== "All") url.searchParams.set("manufacturer", normalized.manufacturer);
    if (normalized.brand !== "All") url.searchParams.set("brand", normalized.brand);
    if (normalized.service !== "All") url.searchParams.set("service", normalized.service);
  }

  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
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

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const typeWord = label.split(" ").pop() || "";
  const pluralWord = typeWord.endsWith("y") ? `${typeWord.slice(0, -1)}ies` : `${typeWord}s`;

  return (
    <div className="flex flex-col gap-2">
      <label className="font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-[#433422]/8 bg-white/45 px-4 text-sm font-medium text-[#433422] outline-none transition-all hover:border-amber-600/40 focus:border-amber-600/40"
      >
        <option value="All">All {pluralWord}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function VehicleCard({ vehicle, onClick }: { vehicle: Vehicle; onClick: (vehicle: Vehicle) => void }) {
  const [imageError, setImageError] = useState(false);
  const style = getStatusStyle(vehicle.availability_status);
  const canShowImage = Boolean(vehicle.model_image?.startsWith("http")) && !imageError;

  return (
    <button
      type="button"
      onClick={() => onClick(vehicle)}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-[#433422]/8 bg-white/30 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/30 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e6dbbf]">
        <div className={`absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.color}`}>
          {style.icon} {vehicle.availability_status || "Not In Stock"}
        </div>
        {canShowImage ? (
          <Image
            src={vehicle.model_image!}
            alt={vehicle.model_name || "Vehicle image"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-[#433422]/20">
            <Car size={48} />
            <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em]">{imageError ? "No Image" : "Loading"}</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 rounded-md bg-white/80 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] font-bold tracking-wider text-[#8a7a64]">
          #{vehicle.id}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-black leading-tight text-[#433422] transition-colors group-hover:text-amber-700">
            {vehicle.model_name}
          </h3>
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-700">
              <MapPin size={11} />
              <span>{vehicle.countries?.flag_emoji} {vehicle.countries?.name || "Unknown country"}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-[#433422]/70">
              <ShieldCheck size={11} className="text-red-700/60" />
              <span>{vehicle.emergency_service || "Unknown service"}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-[#8a7a64]">
              <Tag size={11} />
              <span>{vehicle.manufacturers?.name || "Unknown maker"}</span>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-[#433422]/5 pt-4">
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-[#8a7a64]">
              {vehicle.scale || "Scale n/a"}
            </span>
            <span className="max-w-[140px] truncate text-[11px] font-semibold text-amber-800">
              {vehicle.vehicle_brands?.name || ""}
            </span>
          </div>
          <div className="rounded-lg bg-[#433422]/5 p-2.5 transition-all group-hover:bg-amber-700 group-hover:text-white">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </button>
  );
}

function StatCard({ icon, label, value, color }: { icon: ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-6 rounded-xl border border-[#433422]/8 bg-white/30 px-8 py-6">
      <div className={`${color} rounded-lg bg-white/50 p-4`}>{icon}</div>
      <div>
        <div className="mb-1 font-[family-name:var(--font-mono)] text-4xl font-black leading-none tracking-tight text-[#433422]">{value}</div>
        <div className="font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">
          {label}
        </div>
      </div>
    </div>
  );
}


function SkeletonCard() {
  return (
    <div className="h-[420px] animate-pulse rounded-xl border border-[#433422]/8 bg-white/30">
      <div className="h-56 rounded-t-xl bg-white/5" />
      <div className="space-y-4 p-6">
        <div className="h-6 w-3/4 rounded-lg bg-white/5" />
        <div className="h-5 w-1/2 rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

function CollectionEmptyState({ hasAppliedFilters }: { hasAppliedFilters: boolean }) {
  const title = hasAppliedFilters ? "No models found" : "Collection is waiting for a search";
  const description = hasAppliedFilters
    ? "Try a different keyword or adjust your filters."
    : "Use at least one search criteria above. Models will load here after you apply filters.";

  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-[#433422]/15 bg-white/25 px-6 py-24 text-center">
      <div className="rounded-2xl border border-[#433422]/8 bg-[#433422]/5 p-6">
        <Layers size={40} className="text-[#433422]/30" />
      </div>
      <div>
        <p className="mb-2 text-base font-semibold text-[#433422]/60">{title}</p>
        <p className="max-w-xl text-sm text-[#8a7a64]">{description}</p>
      </div>
    </div>
  );
}

function StickyHeader({ show }: { show: boolean }) {
  return (
    <header className={`fixed left-0 right-0 top-0 z-[200] transition-all duration-300 ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
      <div className="border-b border-[#433422]/8 bg-[#fdf6e3]/90 px-8 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Image src="/museum-sign.png" alt="Logo" width={40} height={28} className="rounded" unoptimized />
        </div>
      </div>
    </header>
  );
}

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: string | null | undefined }) {
  return (
    <div className="flex items-center gap-6 rounded-lg p-3 transition-all hover:bg-black/3">
      <div className="rounded-lg border border-[#433422]/5 bg-white/40 p-4 text-amber-800/60">{icon}</div>
      <div>
        <div className="mb-1 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a7a64]">
          {label}
        </div>
        <div className="text-lg font-semibold tracking-tight text-[#433422]">{value || "-"}</div>
      </div>
    </div>
  );
}

function MiniDetail({ icon, label, value }: { icon: ReactNode; label: string; value: string | null | undefined }) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg border border-[#433422]/5 bg-white/40 p-3 text-amber-900/40">{icon}</div>
      <div>
        <div className="mb-1 font-[family-name:var(--font-barlow)] text-[9px] font-bold uppercase tracking-wide text-[#8a7a64]">
          {label}
        </div>
        <div className="text-sm font-semibold tracking-tight text-[#433422]">{value}</div>
      </div>
    </div>
  );
}

function DetailImage({ vehicle }: { vehicle: Vehicle }) {
  const [imageError, setImageError] = useState(false);
  const canShowImage = Boolean(vehicle.model_image?.startsWith("http")) && !imageError;

  return (
    <div className="relative flex min-h-[500px] w-full items-center justify-center bg-[#e6dbbf] md:w-[60%]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(67,52,34,0.03)_0%,_transparent_75%)]" />
      {canShowImage ? (
        <div className="relative h-full min-h-[600px] w-full">
          <Image
            src={vehicle.model_image!}
            alt={vehicle.model_name || "Vehicle image"}
            fill
            className="object-contain p-12 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center text-[#433422] opacity-30">
          <Car size={120} />
          <span className="mt-8 text-xs font-bold uppercase tracking-[0.3em]">{imageError ? "No Image" : "Loading"}</span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, className }: { status: string | null | undefined; className?: string }) {
  const style = getStatusStyle(status);
  return (
    <div className={`${className || "mb-14"} inline-flex items-center gap-4 rounded-md px-6 py-3 text-[12px] font-bold uppercase tracking-wider shadow-sm ${style.bg} ${style.color}`}>
      {style.icon} {status || "Unknown"}
    </div>
  );
}

export default function Home() {
  const [countries, setCountries] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [emergencyServices, setEmergencyServices] = useState<string[]>([]);
  const [stats, setStats] = useState({ total: 0, countries: 0, brands: 0 });
  const [recentlyAdded, setRecentlyAdded] = useState<Vehicle[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [recentlyAvailable, setRecentlyAvailable] = useState<Vehicle[]>([]);
  const [recentlyAvailableLoading, setRecentlyAvailableLoading] = useState(true);
  const [draftFilters, setDraftFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [collectionVehicles, setCollectionVehicles] = useState<Vehicle[]>([]);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [collectionCount, setCollectionCount] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showHeader, setShowHeader] = useState(false);
  const [hasHydratedFilters, setHasHydratedFilters] = useState(false);

  useEffect(() => {
    void fetchStats();
    void fetchFilterOptions();
    void fetchRecentlyAdded();
    void fetchRecentlyAvailable();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const initialFilters = filtersFromUrl(searchParams);
    setDraftFilters(initialFilters);

    if (hasActiveFilters(initialFilters)) {
      setAppliedFilters(normalizeFilters(initialFilters));
    }

    // Handle deep-link to specific model
    const idParam = searchParams.get("id");
    if (idParam) {
      const id = parseInt(idParam);
      if (!isNaN(id)) {
        void fetchVehicleById(id);
      }
    }

    setHasHydratedFilters(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowHeader(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasHydratedFilters) return;

    if (!appliedFilters) {
      setCollectionVehicles([]);
      setCollectionCount(0);
      syncUrlWithFilters(null);
      return;
    }

    syncUrlWithFilters(appliedFilters);
    void fetchCollection(appliedFilters);
  }, [appliedFilters, hasHydratedFilters]);

  async function fetchStats() {
    try {
      const [{ count: totalCount }, { data: countryData }, { data: brandData }] = await Promise.all([
        supabase.from("vehicles").select("*", { count: "exact", head: true }),
        supabase.from("countries").select("id"),
        supabase.from("vehicle_brands").select("id"),
      ]);

      setStats({
        total: totalCount || 0,
        countries: countryData?.length || 0,
        brands: brandData?.length || 0,
      });
    } catch (error) {
      console.error("fetchStats error", error);
    }
  }

  async function fetchFilterOptions() {
    try {
      const [{ data: countryData }, { data: manufacturerData }, { data: brandData }, { data: serviceData }] = await Promise.all([
        supabase.from("countries").select("name").order("name"),
        supabase.from("manufacturers").select("name").order("name"),
        supabase.from("vehicle_brands").select("name").order("name"),
        supabase.from("vehicles").select("emergency_service").order("emergency_service"),
      ]);

      setCountries((countryData || []).map((row: { name?: string | null }) => row.name || "").filter(Boolean));
      setManufacturers((manufacturerData || []).map((row: { name?: string | null }) => row.name || "").filter(Boolean));
      setBrands((brandData || []).map((row: { name?: string | null }) => row.name || "").filter(Boolean));
      setEmergencyServices(
        Array.from(
          new Set((serviceData || []).map((row: { emergency_service?: string | null }) => row.emergency_service || "").filter(Boolean)),
        ).sort(),
      );
    } catch (error) {
      console.error("fetchFilterOptions error", error);
    }
  }

  async function fetchRecentlyAdded() {
    setRecentLoading(true);
    try {
      const { data } = await supabase
        .from("vehicles")
        .select("*, countries(*), vehicle_brands(*), manufacturers(*)")
        .order("id", { ascending: false })
        .limit(10);

      setRecentlyAdded((data as Vehicle[]) || []);
    } catch (error) {
      console.error("fetchRecentlyAdded error", error);
    } finally {
      setRecentLoading(false);
    }
  }

  async function fetchRecentlyAvailable() {
    setRecentlyAvailableLoading(true);
    try {
      const { data } = await supabase
        .from("vehicles")
        .select("*, countries(*), vehicle_brands(*), manufacturers(*)")
        .eq("availability_status", "Available")
        .or("previous_status.is.null,previous_status.neq.Available")
        .limit(50);

      const sortedVehicles = ((data as Vehicle[]) || [])
        .sort((a, b) => {
          const aTimestamp = a.status_changed_at || a.created_at || a.updated_at || "";
          const bTimestamp = b.status_changed_at || b.created_at || b.updated_at || "";

          return new Date(bTimestamp).getTime() - new Date(aTimestamp).getTime();
        })
        .slice(0, 10);

      setRecentlyAvailable(sortedVehicles);
    } catch (error) {
      console.error("fetchRecentlyAvailable error", error);
    } finally {
      setRecentlyAvailableLoading(false);
    }
  }

  async function fetchCollection(filters: Filters) {
    setCollectionLoading(true);
    try {
      let query = supabase
        .from("vehicles")
        .select("*, countries!inner(*), vehicle_brands!inner(*), manufacturers!inner(*)", { count: "exact" })
        .order("id", { ascending: false })
        .limit(200);

      if (filters.search.trim()) query = query.ilike("model_name", `%${filters.search.trim()}%`);
      if (filters.country !== "All") query = query.eq("countries.name", filters.country);
      if (filters.manufacturer !== "All") query = query.eq("manufacturers.name", filters.manufacturer);
      if (filters.brand !== "All") query = query.eq("vehicle_brands.name", filters.brand);
      if (filters.service !== "All") query = query.eq("emergency_service", filters.service);

      const { data, count } = await query;
      setCollectionVehicles((data as Vehicle[]) || []);
      setCollectionCount(count || data?.length || 0);
    } catch (error) {
      console.error("fetchCollection error", error);
      setCollectionVehicles([]);
      setCollectionCount(0);
    } finally {
      setCollectionLoading(false);
    }
  }

  async function fetchVehicleById(id: number) {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*, countries(*), vehicle_brands(*), manufacturers(*)")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) setSelectedVehicle(data as Vehicle);
    } catch (error) {
      console.error("fetchVehicleById error", error);
    }
  }

  function updateDraftFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setDraftFilters((current) => ({ ...current, [key]: value }));
  }

  function applyFilters() {
    const normalizedDraftFilters = normalizeFilters(draftFilters);

    if (!hasActiveFilters(normalizedDraftFilters)) {
      setAppliedFilters(null);
      setCollectionVehicles([]);
      setCollectionCount(0);
      return;
    }

    setAppliedFilters(normalizedDraftFilters);
  }

  function resetFilters() {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(null);
    setCollectionVehicles([]);
    setCollectionCount(0);
  }

  const hasDraftFilters = hasActiveFilters(draftFilters);
  const hasAppliedFilters = appliedFilters !== null;
  const canApplyFilters = hasDraftFilters && !collectionLoading && !filtersEqual(normalizeFilters(draftFilters), appliedFilters);

  return (
    <div className="min-h-screen bg-[#fdf6e3] text-[#433422] selection:bg-amber-500/30">
      <StickyHeader show={showHeader} />

      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/museum-sign.png"
            alt="Diecast Police Museum"
            fill
            className="animate-hero-breathe object-cover scale-110"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#fdf6e3]" />
        </div>
        <div className="animate-bounce-slow absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/60">Explore Collection</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-8 pb-8 pt-16">
        <div className="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-black uppercase leading-tight tracking-tighter text-[#433422] md:text-6xl">
              Diecast Police Museum
            </h1>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#8a7a64]">
              Official Archive and Master Fleet Control
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <StatCard icon={<Car size={24} />} label="Total Assets" value={stats.total} color="text-red-800" />
            <StatCard icon={<Globe size={24} />} label="Regions" value={stats.countries} color="text-emerald-800" />
          </div>
        </div>

        <section className="mb-16 rounded-[2rem] border border-[#433422]/8 bg-white/35 p-8 shadow-[0_30px_80px_rgba(67,52,34,0.08)] backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-black text-[#433422] md:text-5xl">
              Search Criteria
            </h2>
          </div>

          <div
            className="flex flex-col gap-8"
            onKeyDown={(event) => {
              if (event.key === "Enter" && canApplyFilters) {
                event.preventDefault();
                applyFilters();
              }
            }}
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8a7a64]/60" size={20} />
              <input
                type="text"
                placeholder="Search by model name"
                value={draftFilters.search}
                className="h-14 w-full rounded-lg border border-[#433422]/8 bg-white/50 pl-14 pr-6 text-sm font-medium text-[#433422] outline-none transition-all placeholder:text-[#8a7a64]/60 focus:border-amber-600/40"
                onChange={(event) => updateDraftFilter("search", event.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <FilterSelect label="Country" options={countries} value={draftFilters.country} onChange={(value) => updateDraftFilter("country", value)} />
              <FilterSelect label="Emergency Service" options={emergencyServices} value={draftFilters.service} onChange={(value) => updateDraftFilter("service", value)} />
              <FilterSelect label="Manufacturer" options={manufacturers} value={draftFilters.manufacturer} onChange={(value) => updateDraftFilter("manufacturer", value)} />
              <FilterSelect label="Vehicle Brand" options={brands} value={draftFilters.brand} onChange={(value) => updateDraftFilter("brand", value)} />
            </div>

            <div className="flex flex-col gap-4 border-t border-[#433422]/5 pt-5 md:flex-row md:items-center md:justify-between">
              <span className="font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">
                {hasAppliedFilters ? (collectionLoading ? "Loading matching models" : `Showing ${collectionVehicles.length} models${collectionCount > 200 ? ` from top 200 of ${collectionCount}` : ""}`) : "No collection query runs until you apply at least one criteria"}
              </span>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={resetFilters} className="rounded-lg border-2 border-rose-700/70 bg-rose-50 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-800 shadow-sm transition-all hover:bg-rose-100 hover:border-rose-800">
                  Reset
                </button>
                <button type="button" onClick={applyFilters} disabled={!canApplyFilters} className="rounded-lg bg-[#433422] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#5c4b36] disabled:cursor-not-allowed disabled:bg-[#433422]/35 disabled:text-white/70">
                  {collectionLoading ? "Loading..." : "Apply Filters"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {!hasAppliedFilters ? (
        <>
        <section className="mb-24">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-10 w-1.5 rounded-full bg-emerald-700/80" />
              <div>
                <p className="font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.35em] text-[#8a7a64]">
                  Collection Highlights
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-black leading-none text-[#433422]">
                  Recently Available
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {recentlyAvailableLoading
              ? [...Array(10)].map((_, index) => <SkeletonCard key={index} />)
              : recentlyAvailable.length > 0
                ? recentlyAvailable.map((vehicle, index) => (
                    <div key={vehicle.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                      <VehicleCard vehicle={vehicle} onClick={setSelectedVehicle} />
                    </div>
                  ))
                : <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-emerald-700/15 bg-emerald-50/30 px-6 py-16 text-center">
                    <CheckCircle2 size={40} className="text-emerald-700/30" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-900/60">No available models yet</p>
                      <p className="text-xs text-emerald-700/70">Models will appear here once they become available</p>
                    </div>
                  </div>}
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-10 w-1.5 rounded-full bg-amber-700/80" />
              <div>
                <p className="font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.35em] text-[#8a7a64]">
                  Latest Updates
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-black leading-none text-[#433422]">
                  Last 10 added models
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {recentLoading
              ? [...Array(10)].map((_, index) => <SkeletonCard key={index} />)
              : recentlyAdded.map((vehicle, index) => (
                  <div key={vehicle.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                    <VehicleCard vehicle={vehicle} onClick={setSelectedVehicle} />
                  </div>
                ))}
          </div>
        </section>
        </>
        ) : null}

        <section className="mb-24">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-10 w-1.5 rounded-full bg-[#433422]/20" />
              <div>
                <p className="font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.35em] text-[#8a7a64]">
                  Filtered Results
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-black leading-none text-[#433422]">
                  Collection
                </h2>
              </div>
            </div>
            {hasAppliedFilters && !collectionLoading ? (
              <span className="font-[family-name:var(--font-barlow)] text-xs font-bold uppercase tracking-[0.2em] text-[#8a7a64]">
                {collectionVehicles.length} results
              </span>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {collectionLoading
              ? [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
              : hasAppliedFilters
                ? collectionVehicles.length > 0
                  ? collectionVehicles.map((vehicle, index) => (
                      <div key={vehicle.id} className="animate-fade-in-up" style={{ animationDelay: `${(index % 8) * 60}ms` }}>
                        <VehicleCard vehicle={vehicle} onClick={setSelectedVehicle} />
                      </div>
                    ))
                  : <CollectionEmptyState hasAppliedFilters />
                : <CollectionEmptyState hasAppliedFilters={false} />}
          </div>
        </section>
      </div>

      <footer className="mt-8 border-t border-[#433422]/8 px-8 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Image src="/museum-sign.png" alt="Logo" width={32} height={22} className="rounded opacity-60" unoptimized />
            <span className="text-xs font-medium text-[#8a7a64]">Copyright 2026 Diecast Police Museum</span>
          </div>
          <span className="font-[family-name:var(--font-barlow)] text-[10px] uppercase tracking-wider text-[#8a7a64]/60">
            All Rights Reserved
          </span>
        </div>
      </footer>

      {selectedVehicle ? (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm" onClick={() => setSelectedVehicle(null)}>
          <div className="animate-modal-in relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-[#433422]/10 bg-[#faf4e0] shadow-2xl md:flex-row" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="absolute right-6 top-6 z-40 rounded-full border border-black/10 bg-white/60 p-3 text-black shadow-xl transition-all hover:bg-black hover:text-white" onClick={() => setSelectedVehicle(null)}>
              <X size={24} />
            </button>

            <DetailImage vehicle={selectedVehicle} />

            <div className="relative flex w-full flex-col overflow-y-auto border-l border-[#433422]/5 bg-[#faf4e0] p-10 md:w-[40%]">
              <div className="mb-16 flex-1">
                <div className="flex items-center justify-between mb-12">
                  <StatusBadge status={selectedVehicle.availability_status} className="mb-0" />
                  <div className="rounded-lg border border-[#433422]/10 bg-white/40 px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] font-black tracking-wider text-[#433422] shadow-sm">
                    MODEL ID: #{selectedVehicle.id}
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-3xl">{selectedVehicle.countries?.flag_emoji}</span>
                  <span className="font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">Origin</span>
                </div>
                <h2 className="mb-8 font-[family-name:var(--font-playfair)] text-3xl font-black leading-tight text-[#433422]">
                  {selectedVehicle.model_name}
                </h2>
                <div className="mt-12 flex flex-wrap gap-4">
                  <span className="rounded-lg bg-black/5 px-5 py-2 font-[family-name:var(--font-mono)] text-[11px] font-bold tracking-wider text-[#433422]">
                    Scale {selectedVehicle.scale}
                  </span>
                  {selectedVehicle.model_year ? <span className="rounded-lg border border-amber-600/10 bg-amber-600/10 px-5 py-2 text-[11px] font-bold tracking-wider text-amber-800">Arrived {selectedVehicle.model_year}</span> : null}
                </div>
                <div className="mt-16 grid grid-cols-1 gap-6">
                  <DetailRow icon={<Globe size={20} className="text-amber-700" />} label="Country" value={selectedVehicle.countries?.name} />
                  <DetailRow icon={<ShieldCheck size={20} className="text-rose-800" />} label="Agency" value={selectedVehicle.emergency_service} />
                  <DetailRow icon={<Tag size={20} className="text-zinc-600" />} label="Manufacturer" value={selectedVehicle.manufacturers?.name || "Unknown"} />
                  <DetailRow icon={<Car size={20} className="text-amber-800" />} label="Brand" value={selectedVehicle.vehicle_brands?.name || "Unknown"} />
                </div>
                <div className="mt-16 border-t border-[#433422]/5 pt-8">
                  <h4 className="mb-8 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">Display Info</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <MiniDetail icon={<Archive size={16} />} label="Showcase" value={selectedVehicle.showcase_num} />
                    <MiniDetail icon={<Locate size={16} />} label="Shelf" value={selectedVehicle.shelf_num} />
                    <MiniDetail icon={<Box size={16} />} label="Box" value={selectedVehicle.box_num} />
                    <MiniDetail icon={<Tag size={16} />} label="Exhibit Type" value={selectedVehicle.exhibition_type} />
                  </div>
                </div>
                <div className="mt-14 border-t border-[#433422]/5 pt-8">
                  <h4 className="mb-8 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">Details</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <MiniDetail icon={<Paintbrush size={16} />} label="Primary Color" value={selectedVehicle.color} />
                    <MiniDetail icon={<Hammer size={16} />} label="Material" value={selectedVehicle.material} />
                    <MiniDetail icon={<Ruler size={16} />} label="Model Length" value={selectedVehicle.model_length ? `${selectedVehicle.model_length} ${selectedVehicle.model_length_unit || "cm"}` : null} />
                    <MiniDetail icon={<Star size={16} className="text-amber-600" />} label="Rating" value={selectedVehicle.rating ? `${selectedVehicle.rating} / 5` : "Unrated"} />
                  </div>
                </div>
                <div className="mt-14 border-t border-[#433422]/5 pt-8">
                  <h4 className="mb-8 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">Purchase Info</h4>
                  <div className="grid grid-cols-1 gap-6">
                    <MiniDetail icon={<Calendar size={16} />} label="Added" value={selectedVehicle.acquisition_date} />
                    <MiniDetail icon={<DollarSign size={16} />} label="Price" value={selectedVehicle.market_value ? `${selectedVehicle.market_value} ${selectedVehicle.currency || "USD"}` : null} />
                    <MiniDetail icon={<Factory size={16} />} label="Seller" value={selectedVehicle.acquired_from} />
                  </div>
                </div>
                {selectedVehicle.notes ? (
                  <div className="relative mt-16 rounded-lg border border-[#433422]/5 border-l-4 border-l-amber-600/20 bg-white/20 p-6 text-base italic leading-relaxed text-[#8a7a64] transition-all hover:border-l-amber-600">
                    <span className="absolute -top-3 left-8 bg-[#faf4e0] px-4 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-wider text-[#8a7a64]">Notes</span>
                    <span>&quot;{selectedVehicle.notes}&quot;</span>
                  </div>
                ) : null}
              </div>

              <div className="flex gap-3">
                {selectedVehicle.instagram_url ? (
                  <a href={selectedVehicle.instagram_url} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-4 rounded-lg bg-amber-900 px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-amber-800">
                    <InstagramIcon size={18} />
                    <span>IG Profile</span>
                  </a>
                ) : null}
                {selectedVehicle.website_url ? (
                  <a href={selectedVehicle.website_url} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-4 rounded-lg bg-amber-700 px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-amber-600">
                    <ExternalLink size={18} />
                    <span>Official Link</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
