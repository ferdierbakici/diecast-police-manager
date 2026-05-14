import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diecast Police Museum | Emergency Vehicle Collection Archive",
  description: "Official online archive of the Diecast Police Museum collection. Explore a vast collection of emergency vehicles, police cars, and fire trucks from around the world.",
  keywords: ["diecast police museum", "diecastpolice", "emergency diecast", "police car models", "diecast collection", "model police cars", "itfaiye modelleri", "polis arabası koleksiyonu", "diecast car archive"],
  authors: [{ name: "Diecast Police Museum" }],
  openGraph: {
    title: "Diecast Police Museum | Emergency Vehicle Collection Archive",
    description: "Official online archive of the Diecast Police Museum collection.",
    url: "https://diecastpolice.vercel.app",
    siteName: "Diecast Police Museum",
    images: [
      {
        url: "/museum-sign.png",
        width: 1200,
        height: 630,
        alt: "Diecast Police Museum Header",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diecast Police Museum",
    description: "Explore the world's most detailed online diecast police car collection.",
    images: ["/museum-sign.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "kHrEWau4ajzDrUU2whq4WxE0MY3tKBX5cVdzhn5Ab1s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
