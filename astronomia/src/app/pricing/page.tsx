"use client";
import Link from "next/link";
import MarketingShell from "../components/marketing/MarketingShell";
import { CLASSROOM_USES, FAQS, PLANS } from "../components/marketing/content";
import { PastelTitle } from "../components/marketing/pastelHeading";

export default function PricingPage() {
  return (
    <MarketingShell page="pricing">
      <p className="prose-block">
        We do not meter photons. The NASA Exoplanet Archive is public. Classrooms should brief
        Kepler-22 b on a Thursday without procurement. You pay a language provider only if you leave
        Groq.
      </p>
      <p className="prose-block">
        Mission Control is the free observatory. Research Lab is bring-your-own Gemini or OpenAI.
        Observatory is for labs that want notebooks, teaching worlds, and the stack on their own
        metal.
      </p>
      <div className="pricing-grid" style={{ marginBottom: 64 }}>
        {PLANS.map((plan) => (
          <article key={plan.name} className={`price-card ${plan.highlight ? "is-hot" : ""}`}>
            <div className="mkt-eyebrow">{plan.note}</div>
            <h3>{plan.name}</h3>
            <div className="amount">{plan.price}</div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href={plan.href}>{plan.cta}</Link>
          </article>
        ))}
      </div>
      <PastelTitle style={{ fontSize: 48 }}>Built for labs and outreach</PastelTitle>
      <div className="mkt-grid" style={{ marginBottom: 48 }}>
        {CLASSROOM_USES.map((item) => (
          <article key={item.title} className="mkt-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <PastelTitle style={{ fontSize: 48 }}>What you are not buying</PastelTitle>
      <div className="mkt-grid" style={{ marginBottom: 32 }}>
        <article className="mkt-card">
          <h3>Not a discovery claim</h3>
          <p>F1 scores are instruments. A high probability is not a press release. Hopper exists to keep that honest. The literature still owns the planet.</p>
        </article>
        <article className="mkt-card">
          <h3>Not your photometry, sold</h3>
          <p>Light curves and TAP queries are not a product we resell. Keys stay in your .env. Planet pixels for Eyes stay in the browser.</p>
        </article>
        <article className="mkt-card">
          <h3>Not locked models</h3>
          <p>Bring a classifier. Observatory is for people who already have a better one than 83.1% across Kepler, K2, and TESS.</p>
        </article>
      </div>
      <p className="prose-block">{FAQS[1].a}</p>
    </MarketingShell>
  );
}
