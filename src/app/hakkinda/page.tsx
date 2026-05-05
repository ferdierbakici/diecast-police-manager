import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          background:
            radial-gradient(circle at top right, rgba(255,255,255,0.6), transparent 35%),
            linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .about-shell {
          width: 100%;
          max-width: 1100px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
        }

        .about-card,
        .about-side {
          border-radius: 28px;
          overflow: hidden;
          position: relative;
        }

        .about-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.6);
          padding: 3rem;
        }

        .about-side {
          background: linear-gradient(160deg, #1e293b 0%, #0f172a 100%);
          color: white;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
        }

        .about-side::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(255,255,255,0.1), transparent 55%);
          pointer-events: none;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          text-decoration: none;
          font-weight: 700;
          margin-bottom: 2rem;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: #0f172a;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          background: #e2e8f0;
          color: #334155;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .title {
          margin: 1.25rem 0 0.85rem;
          font-size: clamp(1.2rem, 2vw, 1.35rem);
          line-height: 1.35;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #0f172a;
        }

        .subtitle {
          margin: 0;
          color: #64748b;
          font-size: 1.08rem;
          line-height: 1.8;
          max-width: 58ch;
        }

        .copy-block {
          margin-top: 2rem;
          display: grid;
          gap: 1.2rem;
        }

        .copy-card {
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(248,250,252,0.96) 0%, rgba(241,245,249,0.92) 100%);
          border: 1px solid rgba(148, 163, 184, 0.18);
          padding: 1.35rem 1.4rem;
        }

        .copy-card p {
          margin: 0;
          color: #334155;
          line-height: 1.8;
          font-size: 1rem;
        }

        .meta-grid {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .meta-box {
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid rgba(148, 163, 184, 0.18);
          padding: 1rem 1.1rem;
        }

        .meta-label {
          display: block;
          margin-bottom: 0.35rem;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .meta-value {
          color: #0f172a;
          font-size: 1rem;
          font-weight: 700;
        }

        .side-top {
          position: relative;
          z-index: 1;
        }

        .logo-wrap {
          border-radius: 24px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 1rem;
          backdrop-filter: blur(6px);
        }

        .side-title {
          margin: 1.5rem 0 0.75rem;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.1;
          color: #f8fafc;
        }

        .side-text {
          margin: 0;
          color: #cbd5e1;
          line-height: 1.8;
          font-size: 1rem;
        }

        .side-links {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: 2rem;
        }

        .side-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          border-radius: 16px;
          padding: 0.95rem 1rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: #f8fafc;
          text-decoration: none;
          font-weight: 700;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .side-link:hover {
          transform: translateX(4px);
          background: rgba(255,255,255,0.12);
        }

        .side-link-code {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 48px;
          height: 32px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .about-shell {
            grid-template-columns: 1fr;
          }

          .about-card,
          .about-side {
            padding: 2rem;
          }
        }

        @media (max-width: 640px) {
          .meta-grid {
            grid-template-columns: 1fr;
          }

          .title {
            font-size: 2.35rem;
          }
        }
      `}</style>

      <main className="about-container">
        <div className="about-shell">
          <section className="about-card">
            <Link href="/" className="back-link">
              <span>&larr;</span> Back to Home
            </Link>

            <span className="eyebrow">About the Project</span>
            <h1 className="title">Built as a practical guide for 1/43 emergency vehicles diecast collectors.</h1>
            <p className="subtitle">
              This page is designed to give visitors a clear understanding of the collection focus, the idea behind the archive, and how contributions can be shared with us.
            </p>

            <div className="copy-block">
              <div className="copy-card">
                <p>
                  This website was created to serve as a guide especially for collectors of 1/43 emergency vehicles diecast models.
                </p>
              </div>
              <div className="copy-card">
                <p>
                  The owner of the site, Diecast Police, has been working to build a collection in this direction since 2019.
                </p>
              </div>
              <div className="copy-card">
                <p>
                  The statuses shown on the site reflect the statuses in this user&apos;s own collection. If you would like to add items to these lists, you can reach us through the contact section.
                </p>
              </div>
            </div>

            <div className="meta-grid">
              <div className="meta-box">
                <span className="meta-label">Scale Focus</span>
                <span className="meta-value">1/43 Emergency Vehicles Diecast</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">Collector Since</span>
                <span className="meta-value">2019</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">Archive Type</span>
                <span className="meta-value">Personal Collection Status</span>
              </div>
              <div className="meta-box">
                <span className="meta-label">Contributions</span>
                <span className="meta-value">Shared via Contact</span>
              </div>
            </div>
          </section>

          <aside className="about-side">
            <div className="side-top">
              <div className="logo-wrap">
                <Image
                  src="/museum-sign.png"
                  alt="Diecast Police Museum logo"
                  width={760}
                  height={430}
                  className="h-auto w-full rounded-2xl"
                  priority
                  unoptimized
                />
              </div>

              <h2 className="side-title">Diecast Police Museum</h2>
              <p className="side-text">
                A focused digital archive for emergency service diecast collecting, shaped by a real collector&apos;s long-term work and kept open for future additions.
              </p>
            </div>

            <div className="side-links">
              <a href="https://www.diecast-police.com/" target="_blank" rel="noopener noreferrer" className="side-link">
                <span>Official Website</span>
                <span className="side-link-code">WEB</span>
              </a>
              <a href="https://diecastpolice.vercel.app/" target="_blank" rel="noopener noreferrer" className="side-link">
                <span>Web App</span>
                <span className="side-link-code">APP</span>
              </a>
              <Link href="/contact" className="side-link">
                <span>Contact Us</span>
                <span className="side-link-code">MSG</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}


