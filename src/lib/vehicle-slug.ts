type SlugSource = {
  id: number;
  model_name?: string | null;
  vehicle_brands?: { name?: string | null } | null;
};

export const SITE_URL = "https://www.diecast-police.com";

/** Örnek çıktı: "123-ford-crown-victoria-police-interceptor" */
export function vehicleSlug(v: SlugSource): string {
  const brand = (v.vehicle_brands?.name || "").trim();
  const model = (v.model_name || "").trim();
  // Model adı markayı zaten içeriyorsa tekrar etme
  const text = brand && !model.toLowerCase().includes(brand.toLowerCase()) ? `${brand} ${model}` : model;

  const clean = text
    .toLowerCase()
    .replace(/ı/g, "i")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");

  return clean ? `${v.id}-${clean}` : String(v.id);
}
