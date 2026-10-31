import type { Metadata } from "next";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { SITE_URL, vehicleSlug } from "@/lib/vehicle-slug";

export const revalidate = 3600;

const PAGE_SIZE = 100;

type Row = {
  id: number;
  model_name: string | null;
  scale: string | null;
  emergency_service: string | null;
  countries: { name: string | null; flag_emoji: string | null } | null;
  vehicle_brands: { name: string | null } | null;
};

type Props = { searchParams: Promise<{ page?: string }> };

function getPage(raw: string | undefined) {
  const n = parseInt(raw || "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = getPage((await searchParams).page);
  return {
    title: page > 1 ? `All models – page ${page} | Diecast Police Museum` : "All models | Diecast Police Museum",
    description:
      "Browse every diecast police car, fire truck, ambulance and other emergency vehicle model in the Diecast Police Museum archive.",
    alternates: { canonical: page > 1 ? `${SITE_URL}/models?page=${page}` : `${SITE_URL}/models` },
  };
}

function pageHref(p: number) {
  return p === 1 ? "/models" : `/models?page=${p}`;
}

// 1 … 4 5 [6] 7 8 … 40 şeklinde kısa sayfa listesi
function pageWindow(current: number, last: number) {
  const pages = new Set([1, last]);
  for (let p = current - 2; p <= current + 2; p++) if (p >= 1 && p <= last) pages.add(p);
  return Array.from(pages).sort((a, b) => a - b);
}

export default async function ModelsPage({ searchParams }: Props) {
  const page = getPage((await searchParams).page);
  const from = (page - 1) * PAGE_SIZE;

  const { data, count } = await supabaseServer
    .from("vehicles")
    .select("id, model_name, scale, emergency_service, countries(name, flag_emoji), vehicle_brands(name)", {
      count: "exact",
    })
    .order("id", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  const rows = (data as unknown as Row[]) || [];
  const lastPage = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));
  const pages = pageWindow(page, lastPage);

  return (
    <main className="min-h-screen bg-[#fdf6e3] text-[#433422]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-[#8a7a64]">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#433422]">All models</span>
        </nav>

        <h1 className="mb-2 font-[family-name:var(--font-playfair)] text-4xl font-black">All models</h1>
        <p className="mb-8 text-[#8a7a64]">
          {count ?? 0} emergency vehicle models in the archive. Page {page} of {lastPage}.
        </p>

        <ul className="divide-y divide-[#433422]/8 border-y border-[#433422]/8">
          {rows.map((v) => (
            <li key={v.id}>
              <Link
                href={`/models/${vehicleSlug(v)}`}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-2 py-3 hover:bg-amber-50"
              >
                <span className="font-semibold">{v.model_name}</span>
                <span className="text-sm text-[#8a7a64]">
                  {[v.vehicle_brands?.name, v.emergency_service, v.countries?.name, v.scale].filter(Boolean).join(" · ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {lastPage > 1 ? (
          <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} rel="prev" className="rounded-lg border border-[#433422]/15 px-4 py-2 text-sm font-bold hover:bg-amber-50">
                Previous
              </Link>
            ) : null}

            {pages.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                {i > 0 && p - pages[i - 1] > 1 ? <span aria-hidden="true">…</span> : null}
                <Link
                  href={pageHref(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={`min-w-9 rounded-lg border px-3 py-2 text-center text-sm font-bold ${
                    p === page
                      ? "border-amber-700 bg-amber-700 text-white"
                      : "border-[#433422]/15 hover:bg-amber-50"
                  }`}
                >
                  {p}
                </Link>
              </span>
            ))}

            {page < lastPage ? (
              <Link href={pageHref(page + 1)} rel="next" className="rounded-lg border border-[#433422]/15 px-4 py-2 text-sm font-bold hover:bg-amber-50">
                Next
              </Link>
            ) : null}
          </nav>
        ) : null}
      </div>
    </main>
  );
}
