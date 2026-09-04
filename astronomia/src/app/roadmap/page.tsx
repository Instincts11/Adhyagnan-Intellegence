"use client";
import Link from "next/link";
import MarketingShell from "../components/marketing/MarketingShell";
import RailList from "../components/marketing/RailList";
import { CLASSROOM_USES, PRINCIPLES, ROADMAP } from "../components/marketing/content";
import { PastelTitle } from "../components/marketing/pastelHeading";

export default function RoadmapPage() {
  return (
    <MarketingShell page="roadmap">
      <p className="prose-block">
        This is the flight plan for Adhyagnan — from the NASA Space Apps first draft to a
        JWST-aware Hopper. Each row is shipping, in design, or honestly labeled as luck. If a date
        slips, the F1 on the current classifier still has to be true.
      </p>
      <p className="prose-block">
        Kepler and Hopper already brief confirmed worlds and interrogate candidates. What comes next
        is calibrated confidence, a model garden, and spectra — not a louder starfield.
      </p>
      <RailList
        items={ROADMAP.map((step, index) => ({
          when: step.when,
          title: step.title,
          detail: step.detail,
          live: index === 0,
        }))}
      />
      <PastelTitle style={{ fontSize: 48 }}>Who this flight plan is for</PastelTitle>
      <div className="mkt-grid" style={{ marginBottom: 48 }}>
        {CLASSROOM_USES.map((item) => (
          <article key={item.title} className="mkt-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <PastelTitle style={{ fontSize: 48 }}>What will not change</PastelTitle>
      <div className="mkt-grid" style={{ marginBottom: 40 }}>
        {PRINCIPLES.map((item) => (
          <article key={item.title} className="mkt-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <Link href="/features" className="btn-ghost">Back to the instruments</Link>
    </MarketingShell>
  );
}
