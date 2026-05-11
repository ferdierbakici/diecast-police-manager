import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Star } from "lucide-react";

const atlasModels = [
  "ATLAS PV445 DUETT - Finland Polis",
  "Barkas B1000 - Germany Volkspolizei",
  "BMW 501 - Germany Polizei",
  "Chevrolet Bel Air - USA Police",
  "DAF 33 - Netherlands Politie",
  "Datsun 240Z - Japan Police",
  "Jeep Willys Wagon - Swiss Police",
  "Lada Niva - Czechia Policie",
  "Lada VAZ 2106 - Russia Milicija",
  "Lamborghini Gallardo - Italy Polizia",
  "Mercedes 180 D - Germany Polizei",
  "Mercedes-Benz 200D - Germany Polizei",
  "Morris Minor - UK Police",
  "Peugeot 404 Break - France Brigade Fluviale",
  "Peugeot 505 Danielson - France Police",
  "Porsche 356 Cabrio - Netherlands Rijkspolitie",
  "Range Rover - England Police",
  "Renault 4 - Spain Guardia Civil",
  "Renault 18 Turbo - France Police",
  "Renault 4CV White/Black - France Police",
  "Renault 5 GT - France Police",
  "Saab 9000 CD - Sweden Polis",
  "Saab 99 - Finland Poliisi",
  "Simca 1100 - France Police",
  "Tatra 613 - Czechia Policie",
  "Volkswagen 1200 - Germany Polizei",
  "Volkswagen 1200 - Austria Gendarmerie",
  "Volkswagen 1302 - Belgium Police",
  "Volvo 850 - Norway Politie",
  "Warszawa 223 - Poland Milicja",
  "Wartburg 311 - Germany Polizei",
];

export default function AtlasPoliceCarsPage() {
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
                November 17
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                2 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Atlas Police Cars
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                Atlas Police Cars is a 30-car series that overlaps with several other police model ranges, but a few
                pieces still feel genuinely special. Finding the first ten models is relatively easy; completing the
                rest of the set becomes much more challenging.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              One of the most interesting details in this series is the packaging. The boxes are sealed, and even
              after repeated searches I could not find a clear mark showing which model is inside. Most dealers at
              least include a photo or the model name, but that is often missing here.
            </p>
            <p>
              While searching on eBay, I noticed that some online shops and dealers list these models for nearly half
              the usual price. Stores such as Modelissimo make the series feel far more approachable, and around 9 to
              10 euros for a new sealed model is a reasonable price point for collectors.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Star size={16} />
              Favorite model
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Atlas PV445 Duett
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              My favorite car from the series is the Atlas PV445 Duett in Finland Polis livery. It has the kind of
              character that makes a collector stop scrolling and start hunting.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
              Collector note
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              The sealed-box format adds mystery, but it also makes targeted collecting harder. If you are trying to
              complete the full line, dealer listings with clear labels are worth prioritizing.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Full series list
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#5b4a37]">
              The original post lists the following models as part of the Atlas Police Cars series.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {atlasModels.map((model, index) => (
              <div
                key={model}
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
