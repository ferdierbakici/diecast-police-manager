import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Wrench, Lightbulb } from "lucide-react";

export default function CustomizingModelPage() {
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
                Custom
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                November 15, 2020
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                4 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Customizing A Model
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                Why wait for a manufacturer to release your favorite police car when you can build it yourself? Customizing diecast models is a rewarding way to fill gaps in your collection and create unique, one-of-a-kind pieces.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              Customizing isn't just about painting; it's about research and precision. Whether you're adding accurate decals to a blank model or doing a full conversion of a civilian vehicle into a specialized law enforcement unit, the process requires patience and the right tools.
            </p>
            <p>
              Many collectors start by improving existing models—adding missing antennas, lightbars, or interior details that the mass-market versions often omit. From there, it's a short step to full repaints and custom decal application.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Wrench size={16} />
              The Toolkit
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Essential Supplies
            </h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[#5b4a37]">
              <li>• Fine-tipped brushes for detailing</li>
              <li>• Decal setting solution for a painted-on look</li>
              <li>• Precision cutters and tweezers</li>
              <li>• High-quality primer and acrylic paints</li>
              <li>• A collection of spare lightbars and sirens</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <Lightbulb size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Pro Tip
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              Always work from high-resolution reference photos of the real vehicle. Small details like license plate fonts and exact lightbar placements make the difference between a toy and a museum-grade replica.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10 text-[#4f3f2d]">
          <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
            Why Customize?
          </h2>
          <div className="space-y-6 text-base leading-8">
            <p>
              The most common reason is rarity. Some police forces or specific vehicle models are simply never produced by major brands. By customizing, you can ensure your museum represents the full diversity of world law enforcement.
            </p>
            <p>
              It also adds a personal touch to the hobby. Knowing that a specific model in your cabinet is unique and hand-finished provides a different level of satisfaction compared to buying a factory-sealed box.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
