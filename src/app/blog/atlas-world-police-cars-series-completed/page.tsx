import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Trophy, Target } from "lucide-react";

const atlasModels = [
  "Porsche 911 Cabrio 1993",
  "Ford Transit 2000",
  "Peugeot 206 2002",
  "Alfa Romeo Guilia 1600",
  "Mini Minor 1965",
  "Volvo V70 SW 2002",
  "Saab 95 2002",
  "Subaru Impreza 2002",
  "Jaguar S 2002",
  "Volkswagen Beetle Kafer",
  "Jaguar S 2002 (Variant)",
  "BMW 525 Canton Ticino",
  "Subaru Impreza 2002 (Variant)",
  "BMW 320 2001",
  "BMW 528 2001",
  "Volkswagen New Beetle 2003",
  "Volkswagen T4 2000",
  "Mercedes Benz ML-320",
  "VW Escarabajo",
  "Porsche 356 1964",
  "Mercedes C 320 2002",
  "Alfa Romeo 156 SW",
  "Skoda Octavia Estate 1999",
  "Mercedes C 2002",
  "Mercedes A 140 2001",
  "Range Rover 1998",
  "Ford Crown Victoria New York 1995",
  "Renault Scenic 2002",
  "Ford F-150 2000",
  "Volvo V70 SW 2002 (Variant)",
  "BMW 520",
  "BMW 320 2000",
  "Renault Trafic 2003",
  "Volvo S60 2000",
  "Fiat Marea 1999",
  "Saab 95 2001",
  "Volkswagen T4 2000 (Variant)",
  "Ford Crown Victoria 1999",
  "Ford Crown Victoria California 1995",
  "Dodge Intrepid 2003",
  "Skoda Octavia 1998",
  "Zastava 750 1991",
  "BMW X5 2002",
  "MERCEDES VITO 2004",
  "Chevrolet Tahoe NY State 2002",
  "Mitsubishi Pajero 1998",
  "BMW 530 2001",
  "Renault Dauphine 1962",
  "Willys Jeep M38 1946",
  "Volkswagen Golf 4 2000 - NL Politie",
];

export default function AtlasWorldPoliceCarsCompletedPage() {
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
                August 01, 2021
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                3 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Atlas World Police Cars Series (Completed)
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                If you are planning to collect models showing different countries police cars, the Atlas World Police Cars Series is a fantastic option. This series features 50 models, spanning from timeless classics to modern law enforcement vehicles.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              Finding these models often requires a bit of hunting on eBay, where prices can vary significantly. In my experience, a price range between 5 to 15 euros is quite acceptable, depending on the rarity of the specific model. For instance, the Skoda Octavia from the Israel Police is particularly elusive.
            </p>
            <p>
              A major milestone was reached when I secured three rare models: the Skoda Octavia (Israel Police), Volvo S60 (Iceland Lögreglan), and the Ford Crown Victoria (California Highway Patrol), bringing my total to 48 out of 50. Shortly after, I managed to track down the Volkswagen Golf 4 from the Netherlands Politie for just 5 euros!
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Trophy size={16} />
              Collection Completed
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Final Milestones
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              The journey to completion involved hunting down specific gems like the Willys Jeep M38 from Italy Polizia. On August 1st, 2021, the collection was officially marked as completed.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <Target size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Hunting Tips
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              Keep a close eye on eBay and local dealers. Some models might appear common, but regional variants (like Israel or Iceland) are the ones that truly test a collector's patience.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              The Complete 50-Model List
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#5b4a37]">
              Here is the full line-up from the Atlas World Police Cars series that now resides in the museum.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {atlasModels.map((model, index) => (
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
