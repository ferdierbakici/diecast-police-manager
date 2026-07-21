const DEFAULT_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.trim();
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();

function resolveCloudinaryUrl(rawUrl: string) {
  if (!CLOUDINARY_CLOUD_NAME) return null;

  const normalized = rawUrl.replace(/^cloudinary:\/\//i, "").trim();
  if (!normalized) return null;

  if (/^https?:\/\//i.test(normalized) || normalized.startsWith("data:")) {
    return normalized;
  }

  const publicId = normalized.replace(/^\/+/, "");
  if (!publicId) return null;

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
}

export function resolveImageUrl(rawUrl?: string | null) {
  if (!rawUrl) return null;

  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("cloudinary:")) {
    return resolveCloudinaryUrl(trimmed);
  }

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
    return trimmed;
  }

  if (trimmed.includes("res.cloudinary.com/")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return DEFAULT_IMAGE_BASE_URL ? `${DEFAULT_IMAGE_BASE_URL}${trimmed}` : trimmed;
  }

  return DEFAULT_IMAGE_BASE_URL ? `${DEFAULT_IMAGE_BASE_URL}/${trimmed}` : trimmed;
}
