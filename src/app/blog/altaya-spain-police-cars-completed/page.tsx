import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Flag, CheckCircle2 } from "lucide-react";

const models = [
  "Seat 1400 A - Guardia Civil",
  "Renault 10 - Policia Armada",
  "Seat 1500 - Policia Municipal",
  "Talbot Horizon - Policia Nacional",
  "Nissan Patrol - Guardia Civil",
  "Seat Ritmo - Policia Nacional",
  "Renault 4L - Guardia Civil",
  "Citroen 2CV - Policia Municipal",
  "Seat 131 - Policia Nacional",
  "Peugeot 306 - Policia Nacional",
  "Citroen BX - Policia Nacional",
  "Ford Orion - Policia Nacional",
  "Seat Ronda - Policia Municipal",
  "Nissan Terrano II - Guardia Civil",
  "Renault Scenic - Policia Local",
  "Citroen Picasso - Policia Nacional",
];

export default function AltayaSpainPage() {
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
                Altaya
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                December 15, 2020
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                4 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Altaya Spain Police Cars (Completed)
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                The Altaya Spain Police collection is a dedicated series featuring 50 models that chronicle the history of Spanish law enforcement vehicles. From the classic Guardia Civil units to modern Policia Nacional interceptors.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              Securing the full set of 50 models was a project that spanned several months. Each model represents a specific era of Spanish history, with accurate liveries and detailing that Altaya is well-known for.
            </p>
            <p>
              The variety in this series is impressive, covering not just standard patrol cars but also specialized off-road vehicles and metropolitan police units from various Spanish cities.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Flag size={16} />
              National Pride
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Guardia Civil Classics
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              The iconic green and white liveries of the Guardia Civil are the heart of this collection. Models like the Seat 1400 A and the Nissan Patrol are essential for any serious collector of European police cars.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <CheckCircle2 size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Set Completed
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              With 50 unique models now in the archive, this collection provides a complete visual history of Spanish patrol duty.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Featured Spanish Models
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#5b4a37]">
              Here is a selection of the standout models from the Altaya Spain collection.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {models.map((model, index) => (
              <div
                key={`${model}-${index}`}
                className="flex gap-3 rounded-2xl border border-[#433422]/8 bg-[#fffaf1] px-4 py-3 text-sm leading-6 text-[#4f3f2d]"
              >
                <span className="min-w-7 font-semibold text-[#8a7a64]">{index + 1}.</span>
                <span>{model}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
