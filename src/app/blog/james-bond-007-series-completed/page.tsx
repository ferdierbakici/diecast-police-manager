import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Film, CheckCircle } from "lucide-react";

const models = [
  "Aston Martin V12 Vanquish - Die Another Day",
  "BMW Z8 - The World Is Not Enough",
  "Lotus Esprit Turbo - For Your Eyes Only",
  "Lamborghini Diablo - Die Another Day (Police)",
  "Ford Crown Victoria - Casino Royale (Police)",
  "Toyota 2000GT - You Only Live Twice",
  "AMC Hornet - The Man with the Golden Gun",
  "Land Rover Defender - Skyfall (Police)",
];

export default function JamesBondSeriesPage() {
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
                007
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                April 05, 2021
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                3 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                James Bond 007 Series (Completed)
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                "The name is Bond, James Bond." While 007 is known for his gadgets and luxury cars, the series also features some remarkable law enforcement vehicles that appeared across the legendary film franchise.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              The James Bond 007 collection is a favorite among cinematic diecast collectors. Completing the police subset of this series was a rewarding journey, capturing the essence of international law enforcement through the lens of Bond's world.
            </p>
            <p>
              From the classic Land Rover Defenders to more specialized interceptors, each model tells a story of a specific chase or scene from the movies.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Film size={16} />
              Cinematic Gems
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Skyfall & Beyond
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              The Land Rover Defender from Skyfall is a standout piece, representing the rugged and modern face of law enforcement in the Bond universe.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <CheckCircle size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Milestone
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              Securing all 8 key police models from the official 007 series marks a significant achievement for the museum's cinematic department.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              The Bond Police Collection
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[#5b4a37]">
              Here are the 8 standout police vehicles from the James Bond 007 series in our collection.
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
