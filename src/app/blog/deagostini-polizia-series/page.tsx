import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Star, Info } from "lucide-react";

const models = [
  "Alfa 33 1.7 QV 1987",
  "Alfa Romeo 155 1.8 16V 1996",
  "Alfa Romeo 156 1997",
  "Alfa Romeo 156 2.4 JTD SW 2001",
  "Alfa Romeo 159 2006",
  "Alfa Romeo 159 2006 Pantera",
  "Alfa Romeo 2 1960 Polizia Scientifica",
  "Alfa Romeo 2600 Sprint 1964",
  "Alfa Romeo 75 1.8 IE 1988",
  "Alfa Romeo 90 1.8 1984",
  "Alfa Romeo Alfetta 1.8 1972",
  "Alfa Romeo AR 51 Matta 1954",
  "Alfa Romeo AR 8 1988",
  "Alfa Romeo Giulia Super 1600 1976",
  "Alfa Romeo Giulia Super Speciale 1968",
  "Alfa Romeo Giulietta 1.6 1978",
  "Alfa Romeo Gulia 1600 super 1971",
  "Audi A6 Avant 1996",
  "BMW 320I Activa 2000",
  "BMW 320D Touring 2003",
  "Ferrari 250 GTE 2+2 1962",
  "Fiat 128 Berlina 1969",
  "FIAT 132 2.0 1982",
  "Fiat 238 1969",
  "Fiat Brava 1.8 16V ELX 1999",
  "FIAT CAMPAGNOLA 1980",
  "Fiat Croma CHT 2.0 1994",
  "Fiat Ducato Maxi 1988",
  "Fiat Marea WE 1999",
  "Fiat Panda 4*4 1991",
  "FIAT PUNTO 1.2 16V ELX 2002",
  "Fiat Punto 60s 1996",
  "Fiat Stilo 1.9 JTD 2005",
  "Fiat Tipo 1.4 S 1990",
  "Fiat Uno 1987",
  "Iveco A 55 F13 1981",
  "Iveco Turbo Daily 1990",
  "Jeep Willys 1945",
  "Lamborghini Gallardo 2004",
  "Mitsubishi Pajero SWB 1998",
  "Rayton Fissore Magnum 2.5 TDI 1997",
  "Smart 2003",
  "Subaru Forester 2007",
  "Subaru Legacy 2.5 SW 2000",
  "Volvo v50 2006",
  "Alfa Romeo Alfetta 1976",
  "Moto Guzzi Falcone 500 1976",
  "BMW R 850 RT 2003",
  "DE TOMASO 892 DEAUVILLE 1979 (Unmarked)",
];

export default function DeagostiniPoliziaPage() {
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
                Deagostini
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                September 10, 2021
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                4 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Deagostini Polizia Series
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                Similar to the Carabinieri series, this collection published by Deagostini features many iconic Italian law enforcement vehicles. However, the Polizia series stands out with its inclusion of high-performance models like Lamborghini and Ferrari.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              The series is generally a bit more expensive than the Carabinieri version. On average, you can expect to pay around 10 Euros per model, though deals for 7-8 Euros can be found if you are patient. 
            </p>
            <p>
              Because an official list for this collection was hard to find, we have compiled our own record based on the models that have joined our museum.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Star size={16} />
              Standout Models
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Ferrari & Lamborghini
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              The Ferrari 250 GTE 1962 and the Lamborghini Gallardo 2004 are absolute highlights, showcasing the "Pantera" legacy of the Italian Polizia in stunning 1:43 scale.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <Info size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Series Note
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              This series is essential for anyone focusing on Italian law enforcement history, as it covers everything from classic Alfa Romeos to modern specialized units.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Model Inventory
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#5b4a37]">
              Below is the list of models we have identified and collected from the Deagostini Polizia series.
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
