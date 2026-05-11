import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Shield, CheckCircle2 } from "lucide-react";

const models = [
  "Agusta A109 Helicopter",
  "Alfa Romeo 75 1.8 IE 1988",
  "Alfa Romeo 155 Twin Spark 1.8 1992",
  "Alfa Romeo 156 1999",
  "Alfa Romeo 159 bicentenario 2006",
  "Alfa Romeo 2 1966",
  "Alfa Romeo Alfa 90 1985",
  "Alfa Romeo Alfetta 1972",
  "Alfa Romeo AR51 Matta 1954",
  "ALFA ROMEO GIULIA 1600 FURGONATA",
  "Alfa Romeo Giulia 1600 Super 1970",
  "Alfa Romeo Giulia super 1969",
  "Alfa Romeo Giulia Super 1970 (Variant)",
  "Alfa Romeo 1972 Giulia 1600 Super",
  "Alfa Romeo 1986 Alfa super 90",
  "Ansaldo SPA AB41 1946",
  "Ansaldo-Lancia 1 ZM 1916",
  "Bell AB412 helicopter 1984",
  "BMW F650 GS 1999",
  "BMW R 850 RT Corazzieri",
  "Bmw R 850 RT 2000",
  "Fiat 238 1969",
  "Fiat 1100-103 1954 blue",
  "Fiat 1100-103 1954",
  "Fiat 508 Balilla 1935",
  "Fiat 600 D 1967",
  "Fiat 600 Elettra 2003",
  "Fiat Brava 2001",
  "Fiat Campagnola 1959",
  "Fiat Campagnola AR59 1959 green",
  "Fiat Croma Turbo 1990",
  "Fiat Ducato 1995 Maxi Antisabotaggio",
  "Fiat Ducato Maxi Faina 1988",
  "Fiat Ducato Subacquei E.I. 1999",
  "Fiat Grande Punto 2005",
  "Fiat Nuova Campagnola 1982",
  "Fiat Nuova Campagnola 1985",
  "Fiat Nuova Campagnola 1977 Ambulance",
  "Fiat Panda 1000 Fire 1986 EI",
  "Fiat Panda 4*4 1988",
  "Fiat Panda 45 Cinofili 1980",
  "Fiat Punto 16V 2003",
  "Fiat Punto 1995 Green",
  "Fiat Punto 60s 95",
  "Fiat Punto Btg.Para Folgore 1997",
  "Fiat Punto ELX 2000",
  "Fiat Punto SX Aereonautica Militare 19",
  "Fiat Stilo 1.9 JTD 2001",
  "Fiat Tipo 1988",
  "Fiat Tipo 1.1 1989",
  "Fiat Uno 1985",
  "Guzzi Falcone 500 1967",
  "Guzzi 750 V7 1966",
  "Guzzi California 1994",
  "Iveco A 55 F13 1981",
  "Iveco Turbo Daily EI 1992",
  "Jeep Willys 1947",
  "Lancia Aprilia 1939 green",
  "Lancia Aprilia 1939 blue",
  "Lancia Ansaldo Lince 1949",
  "Land Rover Defender 110 1995",
  "Land Rover defender 90 1995",
  "Land Rover Defender 90 1998",
  "Land Rover Defender 90 Telonato",
  "Land Rover Defender 90 UN E.I. 1998",
  "Land Rover Defender Polizia Militare",
  "Land Rover Freelander 2003",
  "Land Rover Freelander IRAQ 2003",
  "Mitsubishi Pajero 1998 green",
  "Mitsubishi Pajero 2003",
  "Motovedetta D Altura 800 1998",
  "Piaggio Porter 1997",
  "Renault Scenic RX4",
  "Subaru Forester 2007",
];

export default function DeagostiniCarabinieriPage() {
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
                October 20, 2020
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                5 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Deagostini Carabinieri Series
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                The Deagostini Carabinieri series is one of the most accessible and comprehensive collections for fans of Italian law enforcement. What started as a 60-model run has evolved into a massive inventory of cars, armored vehicles, and even helicopters.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              When I first started hunting for this series on eBay, I noticed that the official lists were often incomplete. Many models released alongside the magazine weren't documented in the initial run. Consequently, we created our own museum list, which currently tracks 94 potential models.
            </p>
            <p>
              However, to keep the collection focused, we have decided to apply a "Do Not Collect" (DNC) tag to models that are nearly identical to others in the set. This allows us to focus on the 74 unique and historically significant pieces that truly define the Carabinieri legacy.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Shield size={16} />
              Heritage Focus
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Classic Alfa & Fiat
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              The series is rich with classic Italian heritage, featuring multiple iterations of the Alfa Romeo Giulia and the versatile Fiat Campagnola, capturing decades of service history in fine detail.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <CheckCircle2 size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Collection Tip
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              This is a great starting point for new collectors because many models are still relatively affordable and easy to find compared to other limited series.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              The Verified List (74+ Models)
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#5b4a37]">
              Below is our carefully curated list of models from the Deagostini Carabinieri series, excluding duplicate variants.
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
