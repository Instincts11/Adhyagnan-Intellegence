"use client";
import Link from "next/link";
import StarfieldHyperdrive from "./components/StarfieldHyperdrive";
import SiteHeader from "./components/marketing/SiteHeader";
import SiteFooter from "./components/marketing/SiteFooter";
import FaqList from "./components/marketing/FaqList";
import LogoMarquee from "./components/marketing/LogoMarquee";
import QuoteWall from "./components/marketing/QuoteWall";
import TestimonialMarquee from "./components/marketing/TestimonialMarquee";
import CtaBand from "./components/marketing/CtaBand";
import PageHero from "./components/marketing/PageHero";
import { FAQS, FEATURES, FAMOUS_WORLDS, PAGE_COPY, SKY_BRIEF, STACK_CHIPS, STATS } from "./components/marketing/content";
import { wrapPastelLastWord } from "./components/marketing/pastelHeading";

export default function Home() {
  return (
    <div className="mkt-page" data-page="home">
      <StarfieldHyperdrive speed={0.04} warpBoost={0.35} />
      <SiteHeader />

      <PageHero copy={PAGE_COPY.home}>
        <div className="trust-line">
          <div className="avatar-stack" aria-hidden>
            <span>ER</span>
            <span>MT</span>
            <span>SJ</span>
            <span>DK</span>
            <span>CL</span>
          </div>
          <span className="stars">★★★★★</span>
          <span>Built for Kepler, K2, TESS, and the NASA Exoplanet Archive.</span>
        </div>
      </PageHero>

      <LogoMarquee />

      <section className="section">
        <div className="section-inner">
          <div className="tally-banner">
            <p className="mkt-eyebrow">The catalog, in three numbers</p>
            <div className="tally-track">
              <div className="tally-cell">
                <strong>5,000+</strong>
                <span>TESS candidates</span>
              </div>
              <span className="tally-rule" aria-hidden />
              <div className="tally-cell tally-accent">
                <strong>2,662</strong>
                <span>Kepler worlds</span>
              </div>
              <span className="tally-rule" aria-hidden />
              <div className="tally-cell">
                <strong>2</strong>
                <span>named agents</span>
              </div>
            </div>
            <p className="tally-end">One observatory.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner split-manifesto">
          <div>
            <p className="mkt-eyebrow">From Kepler to TESS</p>
            <h2>
              {wrapPastelLastWord(
                <>
                  For years, the sky
                  <br />
                  had no interpreter.
                </>
              )}
            </h2>
          </div>
          <p className="prose-block" style={{ margin: 0 }}>
            NASA missions filled the archive with transits. Formats, noise, and column names refused
            to agree. Johannes Kepler now briefs confirmed exoplanets from the NASA archive. Grace
            Hopper interrogates new candidates against physics. You hunt worlds. We write the brief.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="section-head">
            <p className="mkt-eyebrow">The hunt</p>
            <h2 className="mkt-title">
              {wrapPastelLastWord(
                <>
                  Exoplanets are piling up.
                  <em> We&apos;re just briefing them.</em>
                </>
              )}
            </h2>
          </div>
          <QuoteWall />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="ev-split">
            <article className="ev-split-pane">
              <div className="ev-split-bar">
                <span className="ev-dots" aria-hidden />
                <span>They · Telescopes</span>
              </div>
              <p>Kepler, K2, TESS, and JWST keep filling the sky with transits and spectra.</p>
            </article>
            <article className="ev-split-pane is-us">
              <div className="ev-split-bar">
                <span className="ev-dots" aria-hidden />
                <span>You · Adhyagnan</span>
              </div>
              <p>Brief a confirmed world. Interrogate a candidate. One observatory. One night.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="section-head">
            <p className="mkt-eyebrow">Wired to NASA</p>
            <h2 className="mkt-title">
              {wrapPastelLastWord(
                <>
                  Connects to the
                  <em> archive.</em>
                </>
              )}
            </h2>
            <p className="mkt-lede">
              TAP, arXiv, NASA Eyes, Groq, and your own classifier — whether you compile on Windows
              or read papers on a laptop in the lab.
            </p>
          </div>
          <div className="chip-cloud">
            {STACK_CHIPS.map((chip) => (
              <span key={chip} className="stack-chip">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <p className="mkt-eyebrow">Observatory stack</p>
            <h2 className="mkt-title">
              {wrapPastelLastWord(
                <>
                  Absolute scientific
                  <em> clarity.</em>
                </>
              )}
            </h2>
            <p className="mkt-lede">
              Mission Control is free. From light-curve notebooks to live NASA archive lookup, we
              engineered an exoplanet desk — not a chatbot with a space wallpaper.
            </p>
          </div>
          <div className="mkt-grid">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="mkt-card win-card">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="stat-row">
            {STATS.map((item) => (
              <div key={item.label} className="stat-cell">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="section-head">
            <p className="mkt-eyebrow">What the observatory does</p>
            <h2 className="mkt-title">{wrapPastelLastWord("Six ways into the sky.")}</h2>
            <p className="mkt-lede">
              Confirmed worlds, new candidates, light curves, missions, NASA Eyes, and notebooks —
              two agents, one floor.
            </p>
          </div>
          <div className="mkt-grid">
            {SKY_BRIEF.map((item) => (
              <article key={item.title} className="mkt-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="section-head">
            <p className="mkt-eyebrow">Worlds on the desk</p>
            <h2 className="mkt-title">{wrapPastelLastWord("Start with a name NASA already knows.")}</h2>
            <p className="mkt-lede">
              Kepler briefs these first. Hopper waits for a row of photometry you actually measured.
            </p>
          </div>
          <div className="mkt-grid">
            {FAMOUS_WORLDS.map((item) => (
              <article key={item.name} className="mkt-card">
                <p className="mkt-eyebrow">{item.tag}</p>
                <h3>{item.name}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <p className="mkt-eyebrow">Loved in the lab</p>
            <h2 className="mkt-title">
              {wrapPastelLastWord(
                <>
                  Join the people hunting
                  <em> other worlds.</em>
                </>
              )}
            </h2>
          </div>
        </div>
        <TestimonialMarquee />
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <p className="mkt-eyebrow">Knowledge base</p>
            <h2 className="mkt-title">{wrapPastelLastWord("FAQ.")}</h2>
          </div>
          <FaqList items={FAQS.slice(0, 5)} />
          <p className="hero-note" style={{ marginTop: 20 }}>
            Have deeper TAP, F1, or key questions? <Link href="/faq">Visit the observatory knowledge base →</Link>
          </p>
        </div>
      </section>

      <CtaBand {...PAGE_COPY.home.cta} />
      <SiteFooter />
    </div>
  );
}
