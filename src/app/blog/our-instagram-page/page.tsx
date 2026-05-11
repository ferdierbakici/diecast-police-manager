import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Camera } from "lucide-react";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function InstagramPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_rgba(253,246,227,1)_0%,_rgba(245,231,208,0.95)_100%)] px-6 py-16 text-[#433422]">
      <article className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <div className="flex flex-col gap-6 rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_24px_80px_rgba(67,52,34,0.08)] backdrop-blur-sm sm:p-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d5537]">
            <ArrowLeft size={16} />
            Back to blog
          </Link>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#8a7a64]">
              <span className="rounded-full bg-[#f3e5cc] px-3 py-1 font-semibold uppercase tracking-[0.18em] text-[#6d5537]">
                Social
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                November 26, 2023
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                1 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Our Instagram Page
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                Connect with the Diecast Police Museum on Instagram for daily updates, rare model spotlights, and behind-the-scenes looks at our collection.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              We've launched our official Instagram page to bring the museum's collection to a wider audience. It's the best place to see high-resolution photography of our latest acquisitions and interact with other collectors from around the world.
            </p>
            <div className="mt-4">
              <a 
                href="https://www.instagram.com/diecast_police/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <InstagramIcon size={24} />
                Follow @diecast_police
              </a>
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Camera size={16} />
              Daily Content
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              What to Expect
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              Expect high-quality "car-porn" featuring the rarest police diecasts, restoration videos, and community polls to help us decide which models to hunt for next.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
              Community
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              Join thousands of other collectors. Tag us in your photos for a chance to be featured on our main feed!
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
