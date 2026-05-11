import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

const posts = [
  {
    slug: "deagostini-polizia-series",
    title: "Deagostini Polizia Series",
    excerpt:
      "A detailed list and collection notes for the Deagostini Polizia series, featuring 61 models including special Lamborghini and Ferrari law enforcement vehicles.",
    publishedAt: "September 10, 2021",
    readTime: "4 min read",
    tag: "Deagostini",
  },
  {
    slug: "deagostini-world-police-car-series",
    title: "Deagostini World Police Car Series",
    excerpt:
      "Exploring the 80-model Deagostini World Police Car series, its expansion from 60 models, and the hunt for rare international pieces.",
    publishedAt: "August 13, 2021",
    readTime: "5 min read",
    tag: "Deagostini",
  },
  {
    slug: "deagostini-carabinieri-series",
    title: "Deagostini Carabinieri Series",
    excerpt:
      "A comprehensive guide to the Deagostini Carabinieri series, covering cars, armored vehicles, and helicopters used by the Italian military police.",
    publishedAt: "October 20, 2020",
    readTime: "5 min read",
    tag: "Deagostini",
  },
  {
    slug: "james-bond-007-series-completed",
    title: "James Bond 007 Series (Completed)",
    excerpt:
      "A look at the iconic police vehicles from the James Bond 007 collection, featuring models from various films in the legendary franchise.",
    publishedAt: "April 05, 2021",
    readTime: "3 min read",
    tag: "007",
  },
  {
    slug: "altaya-spain-police-cars-completed",
    title: "Altaya Spain Police Cars (Completed)",
    excerpt:
      "Reviewing the Altaya Spain Police Cars collection, a 50-model series dedicated to the diverse law enforcement vehicles of Spain.",
    publishedAt: "December 15, 2020",
    readTime: "4 min read",
    tag: "Altaya",
  },
  {
    slug: "atlas-editions-best-of-british-police-cars-series",
    title: "Atlas Editions Best of British Police Cars Series",
    excerpt:
      "Exploring the Best of British Police Cars series by Atlas Editions, featuring the most iconic patrol vehicles from the UK.",
    publishedAt: "December 01, 2020",
    readTime: "3 min read",
    tag: "Atlas",
  },
  {
    slug: "customizing-a-model",
    title: "Customizing A Model",
    excerpt:
      "Tips and techniques for customizing diecast models, from simple detail additions to complete law enforcement conversions.",
    publishedAt: "November 15, 2020",
    readTime: "4 min read",
    tag: "Custom",
  },
  {
    slug: "hot-pursuit-diorama",
    title: "Hot Pursuit Diorama",
    excerpt:
      "Building a dynamic hot pursuit diorama to showcase police chase scenes in 1:43 scale.",
    publishedAt: "April 17, 2022",
    readTime: "2 min read",
    tag: "Diorama",
  },
  {
    slug: "atlas-world-police-cars-series-completed",
    title: "Atlas World Police Cars Series (Completed)",
    excerpt:
      "A comprehensive look at the Atlas World Police Cars series, featuring 50 models from various countries, including rare finds and collection milestones.",
    publishedAt: "August 01, 2021",
    readTime: "3 min read",
    tag: "Atlas",
  },
  {
    slug: "atlas-police-cars",
    title: "Atlas Police Cars",
    excerpt:
      "A short look at the Atlas Police Cars series, its sealed-box mystery, and the standout models that make collecting it worthwhile.",
    publishedAt: "November 17",
    readTime: "2 min read",
    tag: "Atlas",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_rgba(253,246,227,0.96)_50%,_rgba(232,214,186,0.92))] px-6 py-16 text-[#433422]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="space-y-4">
          <span className="inline-flex rounded-full border border-[#433422]/10 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8a7a64]">
            Diecast Police Journal
          </span>
          <div className="space-y-3">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight sm:text-5xl">
              Blog
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#5b4a37] sm:text-lg">
              Collection stories, series notes, and standout police diecast models from the archive.
            </p>
          </div>
        </div>

        <section className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-[28px] border border-[#433422]/10 bg-white/75 shadow-[0_24px_80px_rgba(67,52,34,0.08)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-6 p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#8a7a64]">
                  <span className="rounded-full bg-[#f3e5cc] px-3 py-1 font-semibold uppercase tracking-[0.18em] text-[#6d5537]">
                    {post.tag}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    {post.publishedAt}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={16} />
                    {post.readTime}
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-[#2f2418]">
                    {post.title}
                  </h2>
                  <p className="max-w-3xl text-base leading-7 text-[#5b4a37]">{post.excerpt}</p>
                </div>

                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#433422] px-5 py-3 text-sm font-semibold text-[#fdf6e3] transition-colors hover:bg-[#2f2418]"
                  >
                    Read article
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div>
          <Link href="/" className="text-sm font-semibold text-[#6d5537] underline decoration-[#c7a87a] underline-offset-4">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
