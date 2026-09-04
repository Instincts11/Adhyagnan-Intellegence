import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <div className="site-logo" style={{ marginBottom: 14 }}>
            <span className="site-logo-mark" />
            Adhyagnan
          </div>
          <p>
            An observatory stack that turns Kepler, K2, and TESS into one exoplanet brief. In
            plain English — and in days, ppm, and Kelvin.
          </p>
        </div>
        <div>
          <h4>Product</h4>
          <Link href="/exploration-path">Open observatory</Link>
          <Link href="/features">Features catalog</Link>
          <Link href="/pricing">Pricing & tiers</Link>
          <Link href="/roadmap">Interactive roadmap</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/team">The team</Link>
          <Link href="/learn-more">Our manifesto</Link>
          <Link href="/faq">Knowledge base</Link>
        </div>
        <div>
          <h4>Agents</h4>
          <Link href="/kepler-input">Johannes Kepler</Link>
          <Link href="/grace-hopper-input">Grace Hopper</Link>
          <Link href="/mission-dashboard">Missions</Link>
          <Link href="/neighborhood">Sky graph</Link>
        </div>
      </div>
      <div className="footer-wordmark">Adhyagnan</div>
      <div className="site-footer-bottom">
        <span>© 2026 Adhyagnan. NASA Space Apps.</span>
        <span>Hunt worlds. Brief them honestly.</span>
      </div>
    </footer>
  );
}
