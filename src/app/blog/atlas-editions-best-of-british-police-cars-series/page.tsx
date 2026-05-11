import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Crown, Info } from "lucide-react";

const models = [
  "Jaguar MK II - Metropolitan Police",
  "Ford Zephyr 6 - Lancashire Constabulary",
  "Morris Minor - UK Police",
  "Rover P6 - Metropolitan Police",
  "Triumph 2500 - London Police",
  "Ford Escort MK1 - Kent County Constabulary",
  "Vauxhall Senator - West Midlands Police",
  "Range Rover - England Police",
];

export default function BestOfBritishPage() {
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
                Atlas
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                December 01, 2020
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                3 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Atlas Editions: Best of British Police Cars
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                The "Best of British" series by Atlas Editions is a nostalgic journey through the history of UK policing. From the "Z-Cars" era to modern motorway interceptors, this collection captures the unique character of British patrol vehicles.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              British police cars have a very distinct aesthetic, from the classic "jam sandwich" liveries to the older black-and-white patrol units. Atlas Editions has done a commendable job capturing these details in 1:43 scale.
            </p>
            <p>
              Collecting this series often brings back memories of classic TV shows and the changing face of British roads over the decades. The models are well-built and provide a great cross-section of UK automotive history.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Crown size={16} />
              British Heritage
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Jaguar & Rover
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              The Jaguar MK II and Rover P6 are the crown jewels of this series, representing the high-speed pursuit capabilities of the Metropolitan Police during the 1960s and 70s.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <Info size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Series Detail
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              Each model in this series typically comes with a fact file about the specific police constabulary and the car's service history.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              British Police Roster
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#5b4a37]">
              A selection of the most iconic models from the Best of British series in our museum.
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
