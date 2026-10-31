import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import { resolveImageUrl } from "@/lib/images";
import { SITE_URL, vehicleSlug } from "@/lib/vehicle-slug";
import { getStatusDisplayLabel, getStatusStyle, type Vehicle } from "@/app/components/vehicle-types";
import CollectionWishlistButtons from "@/app/components/CollectionWishlistButtons";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

// generateMetadata ve sayfa aynı veriyi kullanır; cache ile tek sorgu yapılır.
const getVehicle = cache(async (slug: string): Promise<Vehicle | null> => {
  const id = parseInt(slug, 10);
  if (!Number.isFinite(id)) return null;

  const { data } = await supabaseServer
    .from("vehicles")
    .select("*, countries(*), vehicle_brands(*), manufacturers(*), series(*)")
    .eq("id", id)
    .maybeSingle();

  return (data as Vehicle | null) ?? null;
});

function absolute(url: string | null | undefined) {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function describe(v: Vehicle) {
  const parts = [
    v.model_name,
    v.vehicle_brands?.name ? `by ${v.vehicle_brands.name}` : null,
    v.scale ? `${v.scale} scale diecast model` : "diecast model",
    v.emergency_service ? `of the ${v.emergency_service}` : null,
    v.countries?.name ? `(${v.countries.name})` : null,
  ].filter(Boolean);
  const maker = v.manufacturers?.name ? ` Made by ${v.manufacturers.name}.` : "";
  return `${parts.join(" ")}.${maker} Part of the Diecast Police Museum emergency vehicle archive.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) return { title: "Model not found", robots: { index: false } };

  const title = [v.model_name, v.emergency_service, v.countries?.name].filter(Boolean).join(" – ");
  const url = `${SITE_URL}/models/${vehicleSlug(v)}`;
  const image = absolute(resolveImageUrl(v.model_image_cdn || v.model_image));

  return {
    title: `${title} | Diecast Police Museum`,
    description: describe(v),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Diecast Police Museum",
      title,
      description: describe(v),
      url,
      images: image ? [{ url: image, alt: v.model_name || "Diecast model" }] : undefined,
    },
    twitter: { card: "summary_large_image", title, images: image ? [image] : undefined },
  };
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) notFound();

  // /models/123 veya eski/yanlış slug → kanonik adrese kalıcı yönlendirme
  const canonicalSlug = vehicleSlug(v);
  if (slug !== canonicalSlug) permanentRedirect(`/models/${canonicalSlug}`);

  const imageUrl = resolveImageUrl(v.model_image_cdn || v.model_image);
  const style = getStatusStyle(v.availability_status);
  const imageAlt = [v.vehicle_brands?.name, v.model_name, v.scale, "diecast", v.emergency_service, v.countries?.name]
    .filter(Boolean)
    .join(" ");

  const facts: [string, string | null | undefined][] = [
    ["Country", v.countries?.name],
    ["Agency", v.emergency_service],
    ["Manufacturer", v.manufacturers?.name],
    ["Brand", v.vehicle_brands?.name],
    ["Series", v.series?.name],
    ["Model code", v.model_code],
    ["Scale", v.scale],
    ["Year", v.model_year != null ? String(v.model_year) : null],
    ["Color", v.color],
    ["Material", v.material],
    ["Length", v.model_length ? `${v.model_length} ${v.model_length_unit || "cm"}` : null],
  ];

  return (
    <main className="min-h-screen bg-[#fdf6e3] text-[#433422]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8a7a64]">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/models" className="hover:text-amber-700">All models</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#433422]">{v.model_name}</span>
        </nav>

        <article className="grid gap-10 md:grid-cols-[3fr_2fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#433422]/8 bg-[#e6dbbf]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-contain p-8"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#433422]/40">No image</div>
            )}
          </div>

          <div>
            <div className={`mb-6 inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-bold ${style.bg} ${style.color}`}>
              {style.icon} {getStatusDisplayLabel(v.availability_status)}
            </div>

            <p className="mb-2 text-sm font-semibold text-amber-700">
              {v.countries?.flag_emoji} {v.countries?.name}
            </p>
            <h1 className="mb-8 font-[family-name:var(--font-playfair)] text-3xl font-black leading-tight">
              {v.model_name}
            </h1>

            <dl className="divide-y divide-[#433422]/8 border-y border-[#433422]/8">
              {facts
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-sm text-[#8a7a64]">{label}</dt>
                    <dd className="text-right font-semibold">{value}</dd>
                  </div>
                ))}
            </dl>

            {v.notes ? (
              <p className="mt-8 border-l-4 border-amber-600/30 pl-5 text-base italic leading-relaxed text-[#8a7a64]">
                {v.notes}
              </p>
            ) : null}

            <div className="mt-8">
              <CollectionWishlistButtons vehicleId={v.id} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {v.instagram_url ? (
                <a href={v.instagram_url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-amber-900 px-5 py-3 text-sm font-bold text-white hover:bg-amber-800">
                  Instagram
                </a>
              ) : null}
              {v.website_url ? (
                <a href={v.website_url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-amber-700 px-5 py-3 text-sm font-bold text-white hover:bg-amber-600">
                  Webpage
                </a>
              ) : null}
              <Link href="/contact" className="rounded-lg border border-[#433422]/20 px-5 py-3 text-sm font-bold hover:bg-amber-50">
                Help us improve this entry
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
