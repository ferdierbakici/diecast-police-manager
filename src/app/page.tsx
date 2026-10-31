import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase-server";
import type { Vehicle } from "@/app/components/vehicle-types";
import HomeClient from "./HomeClient";

// Ana sayfa 10 dakikada bir yeniden üretilir; ziyaretçi başına Supabase sorgusu yapılmaz.
export const revalidate = 600;

// Sadece canonical tanımlıyoruz. openGraph'ı burada vermeyin: layout'taki og alanlarını ezer.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Page() {
  const [recent, total, countries, brands] = await Promise.all([
    supabaseServer
      .from("vehicles")
      .select("*, countries(*), vehicle_brands(*), manufacturers(*), series(*)")
      .order("id", { ascending: false })
      .limit(10),
    supabaseServer.from("vehicles").select("*", { count: "exact", head: true }),
    supabaseServer.from("countries").select("*", { count: "exact", head: true }),
    supabaseServer.from("vehicle_brands").select("*", { count: "exact", head: true }),
  ]);

  return (
    <HomeClient
      initialRecentlyAdded={(recent.data as Vehicle[]) || []}
      initialStats={{
        total: total.count || 0,
        countries: countries.count || 0,
        brands: brands.count || 0,
      }}
    />
  );
}
