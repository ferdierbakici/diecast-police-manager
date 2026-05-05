'use client';

import Link from 'next/link';

export default function IletisimPage() {
  return (
    <>
      <style>{`
        .contact-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 3rem;
          width: 100%;
          max-width: 900px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.05);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.5);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .contact-card {
            grid-template-columns: 1fr;
            padding: 2rem;
            gap: 2rem;
          }
        }

        .contact-header {
          margin-bottom: 2rem;
        }

        .contact-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1a1f24;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .contact-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #334155;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          background: #f8fafc;
          color: #0f172a;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #3b82f6;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .form-input:focus + .form-label {
          color: #3b82f6;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin-top: 1rem;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .info-section {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: 20px;
          padding: 2.5rem;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .info-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .info-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #f8fafc;
        }

        .info-text {
          color: #cbd5e1;
          line-height: 1.7;
          margin-bottom: 2rem;
          font-size: 1.05rem;
        }

        .info-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .info-link-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s ease;
        }

        .info-link-item:hover {
          transform: translateX(5px);
        }

        .info-icon {
          background: rgba(255,255,255,0.1);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          backdrop-filter: blur(5px);
        }

        .info-link {
          color: #f8fafc;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.05rem;
          transition: color 0.2s ease;
        }

        .info-link:hover {
          color: #60a5fa;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 2rem;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: #0f172a;
        }
      `}</style>

      <main className="contact-container">
        <div className="contact-card">
          <div className="form-section">
            <Link href="/" className="back-link">
              <span>&larr;</span> Back to Home
            </Link>

            <div className="contact-header">
              <h1 className="contact-title">Contact Us</h1>
              <p className="contact-subtitle">Do not hesitate to get in touch with us for your questions, suggestions, or support requests.</p>
            </div>

            <form action="https://formsubmit.co/ferdierbakici@gmail.com" method="POST">
              <input type="hidden" name="_subject" value="Diecast Police - New Message!" />

              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" id="name" name="name" className="form-input" placeholder="John Doe" required />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" id="email" name="email" className="form-input" placeholder="example@email.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="website" className="form-label">Your Website / Link (Optional)</label>
                <input type="url" id="website" name="website" className="form-input" placeholder="https://" />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea id="message" name="message" className="form-input" rows={4} placeholder="How can we help you?" required style={{ resize: 'vertical', minHeight: '120px' }}></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>

          <div className="info-section">
            <h2 className="info-title">Diecast Police Manager</h2>
            <p className="info-text">
              A professional management suite for emergency service model vehicle collectors. Track, organize, and showcase your collection with precision, elegance, and style.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '600', color: '#94a3b8' }}>
                Version 1.1.0
              </span>
            </div>

            <ul className="info-links">
              <li className="info-link-item">
                <div className="info-icon">WEB</div>
                <a href="https://www.diecast-police.com/" target="_blank" rel="noopener noreferrer" className="info-link">Official Website</a>
              </li>
              <li className="info-link-item">
                <div className="info-icon">APP</div>
                <a href="https://diecastpolice.vercel.app/" target="_blank" rel="noopener noreferrer" className="info-link">Web App (Vercel)</a>
              </li>
              <li className="info-link-item">
                <div className="info-icon">IG</div>
                <a href="https://www.instagram.com/diecast_police/" target="_blank" rel="noopener noreferrer" className="info-link">Follow Us on Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
