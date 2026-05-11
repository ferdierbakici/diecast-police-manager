import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Search, Map } from "lucide-react";

const models = [
  "Ford Fairlane",
  "Fiat 238 Minivan",
  "Jaguar MK II",
  "Subaru Impreza",
  "Datsun 240 Z",
  "Opel Kapitan 1960",
  "Ford Crown Victoria",
  "GAZ-21 Volga",
  "Land Rover Defender 109",
  "Holden FE",
  "Alpine Renault A310",
  "Honda NSX",
  "Hindustan Ambassador",
  "Alfa Romeo Giulietta",
  "Dodge Dart",
  "Chrysler De Soto",
  "VW Transporter T2",
  "Toyota Land Cruiser FJ40",
  "Ford Consul II",
  "Lamborghini Gallardo",
  "Plymouth Savoy",
  "Mercedes-Benz W116 450 SEL",
  "Trabant P601 Universal Kombi",
  "Warszawa 223",
  "Chevrolet Bel Air",
  "Ford Transit MK1",
  "Citroen DS21",
  "Audi Q7",
  "VAZ-2107 Lada",
  "Chevrolet Camaro SS",
  "Ford Cortina",
  "Buick Special",
  "Suzuki Samurai",
  "GAZ-22 Volga",
  "Checker Marathon",
  "Ford Crown Victoria (Variant)",
  "GAZ-21 Volga (Variant)",
  "Audi A6 Avant",
  "Jeep Wagoneer",
  "Fiat Punto SX",
  "Ford Transit CRS",
  "Chrysler Airflow CRS 1936",
  "Alfa Romeo 159",
  "RAF-22038",
  "Smart City Coupe",
  "Ford Galaxie 500 1965",
  "Peugeot 404",
  "SAAB 9-5",
  "Alfa Romeo 156",
  "Nissan GTR",
  "Dacia 1310",
  "Dodge Coronet 1973",
  "VAZ-2104 Lada",
  "Volvo 240",
  "Tatra 603",
  "Subaru Legacy",
  "Willys Rural",
  "Opel Omega",
  "Volvo 343",
  "Barkas",
  "Citroen 2CV",
  "Peugeot J7",
  "Ford Econoline",
  "Mercedes-Benz W114 220D",
  "Saab 900 Turbo",
  "Pontiac Chieftain 1954",
  "DAF 33",
  "Mercedes-Benz W108",
  "Nissan GTR - UAE Police",
  "Subaru Legacy - Swiss Police",
  "Opel Omega - Swiss Police",
  "Ford Econoline - Colombia Policia",
];

export default function DeagostiniWorldPolicePage() {
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
                August 13, 2021
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                5 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Deagostini World Police Car Series
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                The Deagostini World Police Car series is an ambitious collection that initially aimed for 60 models but was later extended to 80. This extension makes tracking down the final 20 models a significant challenge for collectors worldwide.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              While the early models in the series are relatively common and can be found for 2-5 Euros, the later additions often command prices between 20 to 30 Euros due to their rarity. 
            </p>
            <p>
              One of the most elusive pieces I've encountered is the Barkas 1000 from the Germany Polizei (No. 63). Securing it required a long-distance delivery from Russia, but it was worth the effort to bring the collection closer to 100% completion.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Search size={16} />
              Rare Finds
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              The Hunt for No. 60-80
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              Models like the Ford Econoline from Colombia (No. 68) and the Mercedes-Benz W114 220D from Qatar (No. 70) are the true "holy grails" of this series, often requiring global networking and significant patience to acquire.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <Map size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Global Reach
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              This series is unique in how it covers police forces from almost every continent, from the UAE to Colombia and Switzerland.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Current Collection Progress
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#5b4a37]">
              We have currently secured over 80% of the series. Below are the models residing in our archive.
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
