"use client";
import MarketingShell from "../components/marketing/MarketingShell";
import QuoteWall from "../components/marketing/QuoteWall";
import { AGENT_DUTIES, PRINCIPLES, SKY_BRIEF, STATS } from "../components/marketing/content";
import { PastelTitle } from "../components/marketing/pastelHeading";

export default function LearnMorePage() {
  return (
    <MarketingShell page="manifesto">
      <div className="stat-row" style={{ marginBottom: 48 }}>
        {STATS.map((item) => (
          <div key={item.label} className="stat-cell">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <p className="prose-block">
        Kepler, K2, and TESS produced oceans of photometry. Formats, noise, and feature sets refuse
        to agree. Most exoplanet identification is still a human with a plot. Adhyagnan did
        not accept that as the permanent condition of the field.
      </p>
      <p className="prose-block">
        Two agents orchestrate classical ML, NASA archives, and open literature. Kepler briefs
        confirmed worlds. Hopper interrogates new candidates. Beginners get NASA Eyes. Scientists
        get notebooks. HistGradientBoosting at 83.1% F1. AstronetCNN at 65% F1. Published, not
        hyped.
      </p>
      <div className="mkt-grid" style={{ marginBottom: 56 }}>
        <article className="mkt-card">
          <h3>The problem</h3>
          <p>
            Cross-mission tables lie in different dialects. Students bounce between TAP, ADS, and
            Eyes. None of that is astrophysics. It is logistics wearing a lab coat between you and
            the transit.
          </p>
        </article>
        <article className="mkt-card">
          <h3>The move</h3>
          <p>
            Put the logistics in an agent allowed to call NASA, and the skepticism in an agent not
            allowed to start from the ML score. Keep the F1 public. Units on every number.
          </p>
        </article>
        <article className="mkt-card">
          <h3>The observatory</h3>
          <p>
            Quiet type, cited sources, and a starfield that does not pretend to be a video game.
            Kepler writes the brief. Hopper argues with the dip. You still own the discovery claim.
          </p>
        </article>
      </div>
      <PastelTitle style={{ fontSize: 48 }}>What the agents actually do</PastelTitle>
      <div className="mkt-grid" style={{ marginBottom: 48 }}>
        {AGENT_DUTIES.map((item) => (
          <article key={item.agent} className="mkt-card">
            <p className="mkt-eyebrow">{item.duty}</p>
            <h3>{item.agent}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <PastelTitle style={{ fontSize: 48 }}>Six rooms in the observatory</PastelTitle>
      <div className="mkt-grid" style={{ marginBottom: 56 }}>
        {SKY_BRIEF.map((item) => (
          <article key={item.title} className="mkt-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <PastelTitle style={{ fontSize: 48 }}>The field has been saying this for years</PastelTitle>
      <p className="prose-block">We are just building the desk that listens to NASA.</p>
      <QuoteWall />
      <PastelTitle style={{ fontSize: 48, marginTop: 64 }}>What we refuse to drop</PastelTitle>
      <div className="mkt-grid" style={{ margin: "16px 0 40px" }}>
        {PRINCIPLES.map((item) => (
          <article key={item.title} className="mkt-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </MarketingShell>
  );
}
