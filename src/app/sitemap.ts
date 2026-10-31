import type { MetadataRoute } from "next";
import { supabaseServer } from "@/lib/supabase-server";
import { SITE_URL, vehicleSlug } from "@/lib/vehicle-slug";

export const revalidate = 3600;

type Row = {
  id: number;
  model_name: string | null;
  updated_at: string | null;
  vehicle_brands: { name: string | null } | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/models`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/statistics` },
    { url: `${SITE_URL}/contact` },
  ];

  // Supabase tek istekte en fazla 1000 satır döndürür; sayfa sayfa çek.
  const pageSize = 1000;
  for (let page = 0; ; page++) {
    const { data, error } = await supabaseServer
      .from("vehicles")
      .select("id, model_name, updated_at, vehicle_brands(name)")
      .order("id", { ascending: true })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error || !data || data.length === 0) break;

    for (const row of data as unknown as Row[]) {
      entries.push({
        url: `${SITE_URL}/models/${vehicleSlug(row)}`,
        lastModified: row.updated_at ? new Date(row.updated_at) : undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    if (data.length < pageSize) break;
  }

  // Blog yazılarınız dinamikse (örn. /blog/[slug]) buraya aynı şekilde ekleyin.
  return entries;
}
