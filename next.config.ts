import type { NextConfig } from "next";

const securityPolicy = [
  "default-src 'self'", 
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https: https://*.supabase.co https://*.supabase.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.supabase.co https://*.supabase.com https://www.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googletagmanager.com",
  "frame-src 'self' https://www.youtube.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      // Aktif Supabase projesi (veri + storage).
      // NOT: eski proje "yzvsfzkksmvwaseudkrq" silinmis durumda (DNS cozumlenmiyor).
      {
        protocol: "https",
        hostname: "eojfccviyaambajvlsqu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      // Arac gorselleri artik Cloudinary uzerinden geliyor.
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: securityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
