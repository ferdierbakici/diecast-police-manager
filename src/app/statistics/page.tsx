"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  BarChart3,
  Globe,
  ShieldCheck,
  Tag,
  Factory,
  Car,
  PieChart,
  Loader2,
  TrendingUp,
  AlertCircle
} from "lucide-react";

type Vehicle = {
  id: number;
  availability_status?: string | null;
  emergency_service?: string | null;
  countries?: { name?: string | null; flag_emoji?: string | null } | null;
  manufacturers?: { name?: string | null } | null;
  vehicle_brands?: { name?: string | null } | null;
};

type CountryStat = {
  name: string;
  flag: string;
  total: number;
  unavailable: number;
};

type DistributionStat = {
  label: string;
  count: number;
  percentage: number;
  color: string;
};

type RankStat = {
  name: string;
  count: number;
};

export default function StatisticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalModels: 0,
    totalCountries: 0,
    totalManufacturers: 0,
    totalBrands: 0,
    countryStats: [] as CountryStat[],
    serviceDistribution: [] as DistributionStat[],
    topManufacturers: [] as RankStat[],
    topBrands: [] as RankStat[]
  });

  useEffect(() => {
    void fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error: supabaseError } = await supabase
        .from("vehicles")
        .select("id, availability_status, emergency_service, countries(name, flag_emoji), manufacturers(name), vehicle_brands(name)");

      if (supabaseError) throw supabaseError;

      const vehicles = (data as Vehicle[]) || [];

      // 1. Basic Counts
      const countriesSet = new Set<string>();
      const manufacturersSet = new Set<string>();
      const brandsSet = new Set<string>();

      // 2. Country Aggregation
      const countryMap = new Map<string, { total: number; unavailable: number; flag: string }>();

      // 3. Service Aggregation
      const serviceMap = new Map<string, number>();

      // 4. Manufacturer & Brand Aggregation
      const manufacturerMap = new Map<string, number>();
      const brandMap = new Map<string, number>();

      vehicles.forEach(v => {
        const countryName = v.countries?.name || "Unknown";
        countriesSet.add(countryName);
        
        const mName = v.manufacturers?.name || "Unknown";
        manufacturersSet.add(mName);
        
        const bName = v.vehicle_brands?.name || "Unknown";
        brandsSet.add(bName);

        // Country
        const cData = countryMap.get(countryName) || { total: 0, unavailable: 0, flag: v.countries?.flag_emoji || "🏳️" };
        cData.total++;
        if (v.availability_status !== "Available") {
          cData.unavailable++;
        }
        countryMap.set(countryName, cData);

        // Service - Grouping logic
        let rawService = v.emergency_service || "Other";
        let service = "Other";
        
        const lowerService = rawService.toLowerCase();
        if (lowerService.includes("police") || lowerService.includes("polizia") || lowerService.includes("policia") || lowerService.includes("milic") || lowerService.includes("gendarmerie") || lowerService.includes("carabinieri") || lowerService.includes("sheriff") || lowerService.includes("highway patrol")) {
          service = "Police";
        } else if (lowerService.includes("fire") || lowerService.includes("pompier") || lowerService.includes("itfaiye")) {
          service = "Fire";
        } else if (lowerService.includes("ambulance") || lowerService.includes("medical") || lowerService.includes("hospital") || lowerService.includes("red cross") || lowerService.includes("paramedic") || lowerService.includes("crveni krst")) {
          service = "Ambulance";
        } else if (lowerService.includes("coast guard") || lowerService.includes("border") || lowerService.includes("customs") || lowerService.includes("military")) {
          service = "Special / Military";
        } else {
          service = rawService; // Fallback to raw if it doesn't match common patterns but isn't "Other"
        }

        serviceMap.set(service, (serviceMap.get(service) || 0) + 1);

        // Manufacturer
        manufacturerMap.set(mName, (manufacturerMap.get(mName) || 0) + 1);

        // Brand
        brandMap.set(bName, (brandMap.get(bName) || 0) + 1);
      });

      // Process Country Stats
      const countryStats = Array.from(countryMap.entries())
        .map(([name, data]) => ({
          name,
          flag: data.flag,
          total: data.total,
          unavailable: data.unavailable
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 20);

      // Process Service Stats
      const colors = ["#433422", "#c7a87a", "#8a7a64", "#5b4a37", "#a89078", "#d2b48c"];
      const totalCount = vehicles.length;
      const serviceDistribution = Array.from(serviceMap.entries())
        .map(([label, count], index) => ({
          label,
          count,
          percentage: (count / totalCount) * 100,
          color: colors[index % colors.length]
        }))
        .sort((a, b) => b.count - a.count);

      // Process Rankings
      const topManufacturers = Array.from(manufacturerMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      const topBrands = Array.from(brandMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setStats({
        totalModels: totalCount,
        totalCountries: countriesSet.size,
        totalManufacturers: manufacturersSet.size,
        totalBrands: brandsSet.size,
        countryStats,
        serviceDistribution,
        topManufacturers,
        topBrands
      });

    } catch (err) {
      console.error("fetchData error", err);
      setError("Failed to load collection data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdf6e3]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-amber-800" size={48} />
          <p className="font-[family-name:var(--font-barlow)] text-sm font-bold uppercase tracking-widest text-[#8a7a64]">
            Preparing Archive...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdf6e3] p-6 text-center">
        <div className="max-w-md space-y-6">
          <AlertCircle className="mx-auto text-rose-800" size={64} />
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#433422]">
            Data Retrieval Issue
          </h1>
          <p className="text-[#5b4a37]">{error}</p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[#433422] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2f2418]">
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_rgba(253,246,227,0.96)_50%,_rgba(232,214,186,0.92))] px-6 py-16 text-[#433422]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        {/* Header */}
        <div className="space-y-6 text-center sm:text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a7a64] transition-colors hover:text-[#433422]">
            <ArrowLeft size={16} />
            Back to Museum
          </Link>
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-[#433422]/10 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a7a64]">
              Collection Intelligence
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold tracking-tight sm:text-6xl">
              Archive Insights
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#5b4a37]">
              A deep-dive into the Diecast Police Museum fleet, analyzing geographical distribution, service roles, and manufacturer presence.
            </p>
          </div>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <OverviewCard icon={<Car size={24} />} label="Total Assets" value={stats.totalModels} />
          <OverviewCard icon={<Globe size={24} />} label="Countries" value={stats.totalCountries} />
          <OverviewCard icon={<Factory size={24} />} label="Makers" value={stats.totalManufacturers} />
          <OverviewCard icon={<TrendingUp size={24} />} label="Unique Brands" value={stats.totalBrands} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Country Rankings */}
          <section className="lg:col-span-2 space-y-6 rounded-[32px] border border-[#433422]/10 bg-white/70 p-8 shadow-[0_24px_80px_rgba(67,52,34,0.06)] backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
                Regional Reach (Top 20)
              </h2>
              <BarChart3 className="text-amber-800/40" size={24} />
            </div>
            <div className="space-y-4 pt-4">
              {stats.countryStats.map((c, i) => (
                <div key={c.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 font-semibold">
                      <span className="text-[#8a7a64]/60">{i + 1}.</span>
                      {c.flag} {c.name}
                    </span>
                    <span className="font-mono text-[#8a7a64]">
                      {c.total} models <span className="text-[#433422]/30">/</span> {c.unavailable} wishlist
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#fdf6e3]">
                    <div 
                      className="flex h-full transition-all duration-1000"
                      style={{ width: `${(c.total / stats.countryStats[0].total) * 100}%` }}
                    >
                      <div 
                        className="h-full bg-[#433422]" 
                        style={{ width: `${((c.total - c.unavailable) / c.total) * 100}%` }}
                        title={`Available: ${c.total - c.unavailable}`}
                      />
                      <div 
                        className="h-full bg-[#c7a87a]/40" 
                        style={{ width: `${(c.unavailable / c.total) * 100}%` }}
                        title={`Wishlist: ${c.unavailable}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Distribution & Rankings Side */}
          <div className="space-y-8">
            {/* Service Distribution */}
            <section className="space-y-6 rounded-[32px] border border-[#433422]/10 bg-white/70 p-8 shadow-[0_24px_80px_rgba(67,52,34,0.06)] backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                  Service Roles
                </h2>
                <ShieldCheck className="text-amber-800/40" size={24} />
              </div>
              <div className="space-y-5 pt-4">
                {stats.serviceDistribution.map(s => (
                  <div key={s.label} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#8a7a64]">
                      <span>{s.label}</span>
                      <span>{s.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#fdf6e3]">
                      <div 
                        className="h-full transition-all duration-1000" 
                        style={{ width: `${s.percentage}%`, backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Manufacturer Rankings */}
            <section className="space-y-6 rounded-[32px] border border-[#433422]/10 bg-white/70 p-8 shadow-[0_24px_80px_rgba(67,52,34,0.06)] backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                  Top Makers
                </h2>
                <Factory className="text-amber-800/40" size={24} />
              </div>
              <div className="divide-y divide-[#433422]/5">
                {stats.topManufacturers.map((m, i) => (
                  <div key={m.name} className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-[#8a7a64]/40 font-mono text-xs">{i + 1}</span>
                      {m.name}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#433422]">{m.count}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Brand Rankings */}
            <section className="space-y-6 rounded-[32px] border border-[#433422]/10 bg-white/70 p-8 shadow-[0_24px_80px_rgba(67,52,34,0.06)] backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                  Vehicle Brands
                </h2>
                <Tag className="text-amber-800/40" size={24} />
              </div>
              <div className="divide-y divide-[#433422]/5">
                {stats.topBrands.map((b, i) => (
                  <div key={b.name} className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-[#8a7a64]/40 font-mono text-xs">{i + 1}</span>
                      {b.name}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#433422]">{b.count}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-sm text-[#8a7a64]">
            Data is calculated dynamically from the official Diecast Police Museum archive.
          </p>
        </div>
      </div>
    </main>
  );
}

function OverviewCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl border border-[#433422]/8 bg-white/40 p-6 shadow-sm transition-transform hover:-translate-y-1">
      <div className="text-amber-800/60 mb-2">{icon}</div>
      <div className="font-mono text-3xl font-black text-[#433422]">{value}</div>
      <div className="text-center font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a7a64]">
        {label}
      </div>
    </div>
  );
}
