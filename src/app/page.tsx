"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Car, Globe, Tag, Info, Filter, X, Calendar, MapPin, ShieldCheck, Factory, Box, CheckCircle2, Clock, AlertCircle, HelpCircle, ChevronRight, ExternalLink, Archive, DollarSign, Paintbrush, Hammer, Ruler, Locate, Star, Layers } from "lucide-react";
import Image from "next/image";

const STATUS_STYLES: Record<string, { color: string, bg: string, icon: any }> = {
  "Not Available": { color: "text-rose-800", bg: "bg-rose-100/80", icon: <X size={12} /> },
  "Wishlist": { color: "text-orange-800", bg: "bg-orange-100/80", icon: <AlertCircle size={12} /> },
  "Ordered": { color: "text-amber-800", bg: "bg-amber-100/80", icon: <Clock size={12} /> },
  "Pre-order": { color: "text-amber-800", bg: "bg-amber-100/80", icon: <Clock size={12} /> },
  "Available": { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12} /> },
  "Available - Displayed": { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12} /> },
  "In Stock": { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12} /> },
  "Unknown": { color: "text-zinc-600", bg: "bg-zinc-100/80", icon: <HelpCircle size={12} /> },
};

function getStatusStyle(status: string) {
  if (!status || status.trim() === "") return STATUS_STYLES["Unknown"];
  const key = Object.keys(STATUS_STYLES).find(k => status.toLowerCase().includes(k.toLowerCase()));
  return key ? STATUS_STYLES[key] : STATUS_STYLES["Not Available"];
}

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

// ── Debounce hook ──
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// ── VehicleCard ──
function VehicleCard({ vehicle, onClick }: { vehicle: any, onClick: (v: any) => void }) {
  const [imageError, setImageError] = useState(false);
  const isValidImg = vehicle.model_image && vehicle.model_image.startsWith("http") && !imageError;
  const style = getStatusStyle(vehicle.availability_status);

  return (
    <div
      onClick={() => onClick(vehicle)}
      className="overflow-hidden group cursor-pointer flex flex-col border border-[#433422]/8 rounded-xl bg-white/30 hover:border-amber-600/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
    >
      {/* Status badge */}
      <div className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-md flex items-center gap-1.5 ${style.bg} ${style.color} text-[10px] font-bold uppercase tracking-wider`}>
        {style.icon} {vehicle.availability_status || "Not In Stock"}
      </div>

      {/* Image */}
      <div className="aspect-[4/3] bg-[#e6dbbf] relative overflow-hidden">
        {isValidImg ? (
          <Image
            src={vehicle.model_image}
            alt={vehicle.model_name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-[#433422]/20">
            <Car size={48} />
            <span className="text-[10px] mt-3 tracking-[0.3em] uppercase font-bold">
              {imageError ? "No Image" : "Loading..."}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/80 text-[#8a7a64] rounded-md text-[10px] font-bold tracking-wider font-[family-name:var(--font-mono)]">
          #{vehicle.id}
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-black text-[#433422] text-lg leading-tight mb-4 group-hover:text-amber-700 transition-colors font-[family-name:var(--font-playfair)]">
            {vehicle.model_name}
          </h3>
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-[11px] text-amber-700 font-semibold">
              <MapPin size={11} />
              <span>{vehicle.countries?.flag_emoji} {vehicle.countries?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#433422]/70 font-medium">
              <ShieldCheck size={11} className="text-red-700/60" />
              <span>{vehicle.emergency_service}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#8a7a64] font-medium">
              <Tag size={11} />
              <span>{vehicle.manufacturers?.name || "Unknown Maker"}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-[#433422]/5 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#8a7a64] uppercase font-bold tracking-wider font-[family-name:var(--font-mono)]">
              {vehicle.scale}
            </span>
            <span className="text-[11px] text-amber-800 font-semibold truncate max-w-[140px]">
              {vehicle.vehicle_brands?.name || ""}
            </span>
          </div>
          <div className="p-2.5 bg-[#433422]/5 rounded-lg group-hover:bg-amber-700 group-hover:text-white transition-all">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── StatCard ──
function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="px-8 py-6 flex items-center gap-6 border border-[#433422]/8 rounded-xl bg-white/30 group">
      <div className={`${color} p-4 bg-white/50 rounded-lg`}>
        {icon}
      </div>
      <div>
        <div className="text-4xl font-black text-[#433422] leading-none mb-1 tracking-tight font-[family-name:var(--font-mono)] group-hover:text-amber-700 transition-colors">
          {value}
        </div>
        <div className="text-[10px] text-[#8a7a64] uppercase font-bold tracking-[0.3em] leading-none font-[family-name:var(--font-barlow)]">
          {label}
        </div>
      </div>
    </div>
  );
}

// ── FilterSelect ──
function FilterSelect({ label, options, value, onChange }: any) {
  const typeWord = label.split(' ').pop() || '';
  const pluralWord = typeWord.endsWith('y') ? typeWord.slice(0, -1) + 'ies' : typeWord + 's';

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64] font-[family-name:var(--font-barlow)]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/40 border border-[#433422]/8 rounded-lg h-12 px-4 text-[#433422] outline-none cursor-pointer hover:border-amber-600/40 focus:border-amber-600/40 transition-all font-medium text-sm"
      >
        <option value="All">All {pluralWord}</option>
        {options.map((opt: any) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

// ── DetailImage ──
function DetailImage({ vehicle }: { vehicle: any }) {
  const [error, setError] = useState(false);
  const isValid = vehicle.model_image?.startsWith("http") && !error;
  return (
    <div className="w-full md:w-[60%] bg-[#e6dbbf] flex items-center justify-center min-h-[500px] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(67,52,34,0.03)_0%,_transparent_75%)]" />
      {isValid ? (
        <div className="relative w-full h-full min-h-[600px]">
          <Image src={vehicle.model_image} alt={vehicle.model_name} fill className="object-contain p-12 transition-transform duration-700" onError={() => setError(true)} />
        </div>
      ) : (
        <div className="text-[#433422] flex flex-col items-center opacity-30">
          <Car size={120} /><span className="mt-8 font-bold tracking-[0.3em] uppercase text-xs">{error ? "No Image" : "Loading..."}</span>
        </div>
      )}
    </div>
  );
}

// ── StatusBadge ──
function StatusBadge({ status }: { status: string }) {
  const style = getStatusStyle(status);
  return (
    <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-md text-[12px] font-bold uppercase tracking-wider mb-14 shadow-sm ${style.bg} ${style.color}`}>
      {style.icon} {status || "Unknown"}
    </div>
  );
}

// ── MiniDetail ──
function MiniDetail({ icon, label, value }: any) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-white/40 rounded-lg border border-[#433422]/5 text-amber-900/40 group-hover:text-amber-700 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-[9px] text-[#8a7a64] uppercase tracking-wide font-bold leading-none mb-1 font-[family-name:var(--font-barlow)]">{label}</div>
        <div className="text-[#433422] font-semibold text-sm tracking-tight">{value}</div>
      </div>
    </div>
  );
}

// ── DetailRow ──
function DetailRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-6 group p-3 rounded-lg hover:bg-black/3 transition-all">
      <div className="p-4 bg-white/40 rounded-lg border border-[#433422]/5 text-amber-800/60">
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-[#8a7a64] uppercase tracking-[0.2em] font-bold mb-1 leading-none font-[family-name:var(--font-barlow)]">
          {label}
        </div>
        <div className="text-[#433422] font-semibold text-lg tracking-tight">
          {value || "—"}
        </div>
      </div>
    </div>
  );
}

// ── SkeletonCard ──
function SkeletonCard() {
  return (
    <div className="h-[420px] animate-pulse border border-[#433422]/8 rounded-xl bg-white/30">
      <div className="h-56 bg-white/5 rounded-t-xl" /><div className="p-6 space-y-4"><div className="h-6 w-3/4 bg-white/5 rounded-lg" /><div className="h-5 w-1/2 bg-white/5 rounded-lg" /></div>
    </div>
  );
}

// ── CollectionEmptyState ──
function CollectionEmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 gap-6 text-center">
      <div className="p-6 rounded-2xl bg-[#433422]/5 border border-[#433422]/8">
        <Layers size={40} className="text-[#433422]/30" />
      </div>
      <div>
        <p className="text-[#433422]/50 font-semibold text-base mb-1">Koleksiyona göz atmak için</p>
        <p className="text-[#8a7a64] text-sm">arama yapın veya bir filtre seçin</p>
      </div>
    </div>
  );
}

// ── StickyHeader ──
function StickyHeader({ show }: { show: boolean }) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="bg-[#fdf6e3]/90 backdrop-blur-md border-b border-[#433422]/8 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/museum-sign.png" alt="Logo" width={40} height={28} className="rounded" unoptimized />
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Home ──
export default function Home() {
  // Filter option lists
  const [countries, setCountries] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [emergencyServices, setEmergencyServices] = useState<string[]>([]);

  // Stats
  const [stats, setStats] = useState({ total: 0, countries: 0, brands: 0 });

  // Recently added (always loaded)
  const [recentlyAdded, setRecentlyAdded] = useState<any[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  // Collection (loaded on demand)
  const [collectionVehicles, setCollectionVehicles] = useState<any[]>([]);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [collectionCount, setCollectionCount] = useState(0);

  // Filter state
  const [searchInput, setSearchInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedService, setSelectedService] = useState<string>("All");

  // Modal
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  // Sticky header
  const [showHeader, setShowHeader] = useState(false);

  // Debounced search
  const debouncedSearch = useDebounce(searchInput, 500);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial data load
  useEffect(() => {
    fetchStats();
    fetchFilterOptions();
    fetchRecentlyAdded();
  }, []);

  // Trigger collection fetch when filters change
  useEffect(() => {
    const hasFilter =
      debouncedSearch !== "" ||
      selectedCountry !== "All" ||
      selectedManufacturer !== "All" ||
      selectedBrand !== "All" ||
      selectedService !== "All";

    if (hasFilter) {
      setHasSearched(true);
      fetchCollection({
        search: debouncedSearch,
        country: selectedCountry,
        manufacturer: selectedManufacturer,
        brand: selectedBrand,
        service: selectedService,
      });
    } else {
      setHasSearched(false);
      setCollectionVehicles([]);
      setCollectionCount(0);
    }
  }, [debouncedSearch, selectedCountry, selectedManufacturer, selectedBrand, selectedService]);

  // ── FETCH: Stats ──
  async function fetchStats() {
    try {
      const { count: totalCount } = await supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true });

      const { data: ctData } = await supabase
        .from("countries")
        .select("id");

      const { data: bdData } = await supabase
        .from("vehicle_brands")
        .select("id");

      setStats({
        total: totalCount || 0,
        countries: ctData?.length || 0,
        brands: bdData?.length || 0,
      });
    } catch (e) {
      console.error("fetchStats error", e);
    }
  }

  // ── FETCH: Filter options ──
  async function fetchFilterOptions() {
    try {
      const [{ data: ctData }, { data: mfData }, { data: brData }, { data: svData }] =
        await Promise.all([
          supabase.from("countries").select("name").order("name"),
          supabase.from("manufacturers").select("name").order("name"),
          supabase.from("vehicle_brands").select("name").order("name"),
          supabase.from("vehicles").select("emergency_service").order("emergency_service"),
        ]);

      setCountries((ctData || []).map((r: any) => r.name).filter(Boolean));
      setManufacturers((mfData || []).map((r: any) => r.name).filter(Boolean));
      setBrands((brData || []).map((r: any) => r.name).filter(Boolean));

      // Deduplicate emergency services
      const svSet = Array.from(
        new Set((svData || []).map((r: any) => r.emergency_service).filter(Boolean))
      ).sort() as string[];
      setEmergencyServices(svSet);
    } catch (e) {
      console.error("fetchFilterOptions error", e);
    }
  }

  // ── FETCH: Recently added (last 10) ──
  async function fetchRecentlyAdded() {
    setRecentLoading(true);
    try {
      const { data } = await supabase
        .from("vehicles")
        .select("*, countries(*), vehicle_brands(*), manufacturers(*)")
        .order("id", { ascending: false })
        .limit(10);
      setRecentlyAdded(data || []);
    } catch (e) {
      console.error("fetchRecentlyAdded error", e);
    } finally {
      setRecentLoading(false);
    }
  }

  // ── FETCH: Collection (on demand, server-side filtered) ──
  async function fetchCollection(filters: {
    search: string;
    country: string;
    manufacturer: string;
    brand: string;
    service: string;
  }) {
    setCollectionLoading(true);
    try {
      let query = supabase
        .from("vehicles")
        .select("*, countries!inner(*), vehicle_brands!inner(*), manufacturers!inner(*)", { count: "exact" })
        .order("id", { ascending: false })
        .limit(200);

      if (filters.search) {
        query = query.ilike("model_name", `%${filters.search}%`);
      }
      if (filters.country !== "All") {
        query = query.eq("countries.name", filters.country);
      }
      if (filters.manufacturer !== "All") {
        query = query.eq("manufacturers.name", filters.manufacturer);
      }
      if (filters.brand !== "All") {
        query = query.eq("vehicle_brands.name", filters.brand);
      }
      if (filters.service !== "All") {
        query = query.eq("emergency_service", filters.service);
      }

      const { data, count } = await query;
      setCollectionVehicles(data || []);
      setCollectionCount(count || data?.length || 0);
    } catch (e) {
      console.error("fetchCollection error", e);
      setCollectionVehicles([]);
      setCollectionCount(0);
    } finally {
      setCollectionLoading(false);
    }
  }

  const hasActiveFilter =
    searchInput !== "" ||
    selectedCountry !== "All" ||
    selectedManufacturer !== "All" ||
    selectedBrand !== "All" ||
    selectedService !== "All";

  function resetFilters() {
    setSearchInput("");
    setSelectedCountry("All");
    setSelectedManufacturer("All");
    setSelectedBrand("All");
    setSelectedService("All");
  }

  return (
    <div className="min-h-screen bg-[#fdf6e3] text-[#433422] font-sans selection:bg-amber-500/30">

      <StickyHeader show={showHeader} />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/museum-sign.png"
            alt="Diecast Police Museum"
            fill
            className="object-cover scale-110 animate-hero-breathe"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#fdf6e3]" />
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce-slow">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/60">Explore Collection</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ── Title strip ── */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-[#433422] tracking-tighter leading-tight uppercase font-[family-name:var(--font-playfair)]">
              Diecast Police Museum
            </h1>
            <p className="text-[#8a7a64] mt-3 font-bold tracking-[0.4em] text-[10px] uppercase">
              Official Archive • Master Fleet Control
            </p>
          </div>
          <div className="flex gap-6">
            <StatCard icon={<Car size={24} />} label="Total Assets" value={stats.total} color="text-red-800" />
            <StatCard icon={<Globe size={24} />} label="Regions" value={stats.countries} color="text-emerald-800" />
          </div>
        </div>

        {/* ── Filter Panel ── */}
        <div className="p-8 border border-[#433422]/8 rounded-xl bg-white/30 mb-16">
          <div className="flex flex-col gap-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8a7a64]/60" size={20} />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchInput}
                className="w-full bg-white/40 border border-[#433422]/8 rounded-lg h-14 pl-14 pr-6 text-[#433422] outline-none focus:border-amber-600/40 transition-all font-medium text-sm placeholder:text-[#8a7a64]/60"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FilterSelect label="Country" options={countries} value={selectedCountry} onChange={setSelectedCountry} />
              <FilterSelect label="Emergency Service" options={emergencyServices} value={selectedService} onChange={setSelectedService} />
              <FilterSelect label="Manufacturer" options={manufacturers} value={selectedManufacturer} onChange={setSelectedManufacturer} />
              <FilterSelect label="Vehicle Brand" options={brands} value={selectedBrand} onChange={setSelectedBrand} />
            </div>

            {/* Results count */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#433422]/5">
              {hasSearched ? (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7a64] font-[family-name:var(--font-barlow)]">
                  {collectionLoading ? "Searching..." : `Displaying ${collectionVehicles.length} matching units${collectionCount > 200 ? ` (top 200 of ${collectionCount})` : ""}`}
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7a64] font-[family-name:var(--font-barlow)]">
                  {stats.total} assets in collection — search or filter to explore
                </span>
              )}
              {hasActiveFilter && (
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                >
                  <X size={10} /> Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Last Added ── */}
        {!hasSearched && (
          <div className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-6">
                <div className="w-1.5 h-10 bg-amber-700/80 rounded-full" />
                <h2 className="text-3xl font-black text-[#433422] tracking-tight leading-none font-[family-name:var(--font-playfair)]">
                  Last Added
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recentLoading
                ? [...Array(10)].map((_, i) => <SkeletonCard key={i} />)
                : recentlyAdded.map((v, index) => (
                  <div
                    key={v.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <VehicleCard vehicle={v} onClick={setSelectedVehicle} />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ── Collection ── */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
              <div className="w-1.5 h-10 bg-[#433422]/20 rounded-full" />
              <h2 className="text-3xl font-black text-[#433422] tracking-tight leading-none font-[family-name:var(--font-playfair)]">
                Collection
              </h2>
              {hasSearched && !collectionLoading && (
                <span className="text-xs font-bold text-[#8a7a64] font-[family-name:var(--font-barlow)] uppercase tracking-widest ml-2">
                  — {collectionVehicles.length} sonuç
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collectionLoading
              ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
              : hasSearched
                ? collectionVehicles.map((v, index) => (
                  <div
                    key={v.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${(index % 8) * 60}ms` }}
                  >
                    <VehicleCard vehicle={v} onClick={setSelectedVehicle} />
                  </div>
                ))
                : <CollectionEmptyState />
            }
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[#433422]/8 mt-8 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/museum-sign.png" alt="Logo" width={32} height={22} className="rounded opacity-60" unoptimized />
            <span className="text-xs text-[#8a7a64] font-medium">
              © 2026 Diecast Police Museum
            </span>
          </div>
          <span className="text-[10px] text-[#8a7a64]/60 uppercase tracking-wider font-[family-name:var(--font-barlow)]">
            All Rights Reserved
          </span>
        </div>
      </footer>

      {/* ── Detail Modal ── */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedVehicle(null)}>
          <div className="w-full max-w-6xl max-h-[92vh] overflow-hidden flex flex-col md:flex-row rounded-xl border border-[#433422]/10 shadow-2xl bg-[#faf4e0] animate-modal-in" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-6 right-6 z-40 p-3 bg-white/60 hover:bg-black hover:text-white rounded-full text-black transition-all border border-black/10 shadow-xl" onClick={() => setSelectedVehicle(null)}><X size={24} /></button>
            <DetailImage vehicle={selectedVehicle} />
            <div className="w-full md:w-[40%] p-10 overflow-y-auto bg-[#faf4e0] border-l border-[#433422]/5 flex flex-col relative">
              <div className="mb-16 flex-1">
                <StatusBadge status={selectedVehicle.availability_status} />
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{selectedVehicle.countries?.flag_emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64] font-[family-name:var(--font-barlow)]">Origin</span>
                </div>
                <h2 className="text-3xl font-black text-[#433422] mb-8 leading-tight font-[family-name:var(--font-playfair)]">{selectedVehicle.model_name}</h2>
                <div className="flex gap-4 mt-12 flex-wrap">
                  <span className="px-5 py-2 bg-black/5 text-[#433422] rounded-lg text-[11px] font-bold tracking-wider font-[family-name:var(--font-mono)]">Scale {selectedVehicle.scale}</span>
                  {selectedVehicle.model_year && <span className="px-5 py-2 bg-amber-600/10 text-amber-800 rounded-lg text-[11px] font-bold tracking-wider border border-amber-600/10">Arrived {selectedVehicle.model_year}</span>}
                </div>
                <div className="grid grid-cols-1 gap-6 mt-16">
                  <DetailRow icon={<Globe size={20} className="text-amber-700" />} label="Country" value={selectedVehicle.countries?.name} />
                  <DetailRow icon={<ShieldCheck size={20} className="text-rose-800" />} label="Agency" value={selectedVehicle.emergency_service} />
                  <DetailRow icon={<Tag size={20} className="text-zinc-600" />} label="Manufacturer" value={selectedVehicle.manufacturers?.name || "Unknown"} />
                  <DetailRow icon={<Car size={20} className="text-amber-800" />} label="Brand" value={selectedVehicle.vehicle_brands?.name || "Unknown"} />
                </div>

                {/* Display Info */}
                <div className="mt-16 pt-8 border-t border-[#433422]/5">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64] mb-8 font-[family-name:var(--font-barlow)]">Display Info</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <MiniDetail icon={<Archive size={16} />} label="Showcase" value={selectedVehicle.showcase_num} />
                    <MiniDetail icon={<Locate size={16} />} label="Shelf" value={selectedVehicle.shelf_num} />
                    <MiniDetail icon={<Box size={16} />} label="Box #" value={selectedVehicle.box_num} />
                    <MiniDetail icon={<Tag size={16} />} label="Exhib. Type" value={selectedVehicle.exhibition_type} />
                  </div>
                </div>

                {/* Details */}
                <div className="mt-14 pt-8 border-t border-[#433422]/5">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64] mb-8 font-[family-name:var(--font-barlow)]">Details</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <MiniDetail icon={<Paintbrush size={16} />} label="Primary Color" value={selectedVehicle.color} />
                    <MiniDetail icon={<Hammer size={16} />} label="Material" value={selectedVehicle.material} />
                    <MiniDetail icon={<Ruler size={16} />} label="Model Length" value={selectedVehicle.model_length ? `${selectedVehicle.model_length} ${selectedVehicle.model_length_unit || 'cm'}` : null} />
                    <MiniDetail icon={<Star size={16} className="text-amber-600" />} label="Rating" value={selectedVehicle.rating ? `${selectedVehicle.rating} / 5` : "Unrated"} />
                  </div>
                </div>

                {/* Purchase Info */}
                <div className="mt-14 pt-8 border-t border-[#433422]/5">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64] mb-8 font-[family-name:var(--font-barlow)]">Purchase Info</h4>
                  <div className="grid grid-cols-1 gap-6">
                    <MiniDetail icon={<Calendar size={16} />} label="Added" value={selectedVehicle.acquisition_date} />
                    <MiniDetail icon={<DollarSign size={16} />} label="Price" value={selectedVehicle.market_value ? `${selectedVehicle.market_value} ${selectedVehicle.currency || 'USD'}` : null} />
                    <MiniDetail icon={<Factory size={16} />} label="Seller" value={selectedVehicle.acquired_from} />
                  </div>
                </div>

                {selectedVehicle.notes && <div className="mt-16 p-6 rounded-lg bg-white/20 border border-[#433422]/5 shadow-sm italic text-[#8a7a64] text-base leading-relaxed border-l-4 border-l-amber-600/20 relative cursor-default hover:border-l-amber-600 transition-all"><span className="absolute -top-3 left-8 bg-[#faf4e0] px-4 text-[10px] font-bold uppercase tracking-wider text-[#8a7a64] font-[family-name:var(--font-barlow)]">Notes</span>"{selectedVehicle.notes}"</div>}
              </div>
              <div className="flex gap-3">
                {selectedVehicle.instagram_url && (
                  <a href={selectedVehicle.instagram_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-4 bg-amber-900 hover:bg-amber-800 text-white py-4 px-5 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm active:scale-95 group"><InstagramIcon size={18} /><span className="group-hover:translate-x-1 transition-transform">IG Profile</span></a>
                )}
                {selectedVehicle.website_url && (
                  <a href={selectedVehicle.website_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-4 bg-amber-700 hover:bg-amber-600 text-white py-4 px-5 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm active:scale-95 group"><ExternalLink size={18} /><span className="group-hover:translate-x-1 transition-transform">Official Link</span></a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
