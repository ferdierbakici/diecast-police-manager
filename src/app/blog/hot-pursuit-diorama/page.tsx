import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Camera, Layout } from "lucide-react";

export default function HotPursuitDioramaPage() {
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
                Diorama
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                April 17, 2022
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} />
                2 min read
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-[#2f2418] sm:text-5xl">
                Hot Pursuit Diorama
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#5b4a37]">
                Bringing models to life requires more than just a shelf. A well-crafted diorama can tell a story of speed, action, and the high-stakes world of police chases.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-base leading-8 text-[#4f3f2d]">
            <p>
              The "Hot Pursuit" diorama was designed to showcase our 1:43 scale interceptors in their natural habitat. By creating a realistic highway setting with proper scaling for road markings and barriers, the models take on a whole new dimension.
            </p>
            <p>
              Dioramas allow us to capture the dynamic nature of law enforcement—the sense of urgency and the specialized maneuvers that patrol units perform every day.
            </p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#433422] px-4 py-2 text-sm font-semibold text-[#fdf6e3]">
              <Camera size={16} />
              Visual Storytelling
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
              Action Photography
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5b4a37]">
              One of the best parts of building a diorama is the photography. Using low angles and shallow depth of field can make 1:43 models look like real full-size vehicles in the middle of a high-speed chase.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#433422]/10 bg-[#f8eedb] p-8">
            <div className="mb-4 flex items-center gap-2 text-[#6d5537]">
              <Layout size={20} />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#2f2418]">
                Layout Tip
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b4a37]">
              Incorporate curves and varied elevations to add drama to the scene. Flat roads are common, but a banking turn or an overpass adds much more visual interest.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#433422]/10 bg-white/80 p-8 shadow-[0_18px_60px_rgba(67,52,34,0.08)] sm:p-10 text-[#4f3f2d]">
          <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#2f2418]">
            Future Diorama Projects
          </h2>
          <div className="space-y-6 text-base leading-8">
            <p>
              We are currently planning more localized scenes, such as a narrow Italian street for the Carabinieri collection and a rainy UK motorway section for the Best of British series. Each new setting helps ground the collection in its respective country's reality.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
