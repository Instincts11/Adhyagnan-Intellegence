"use client";
import MarketingShell from "../components/marketing/MarketingShell";
import LedgerList from "../components/marketing/LedgerList";
import { AGENT_DUTIES, PIPELINE, TEAM } from "../components/marketing/content";
import { PastelTitle } from "../components/marketing/pastelHeading";

export default function TeamPage() {
  return (
    <MarketingShell page="team">
      <p className="prose-block">
        The agents are not mascots. They have jobs, tools, and failure modes. Johannes Kepler may
        call NASA TAP and arXiv. Grace Hopper may not start from a 91% score. The humans own the F1
        numbers, the TAP timeouts, and the decision to default to Groq so a student can hunt
        exoplanets without a credit card.
      </p>
      <div className="mkt-grid" style={{ marginBottom: 48 }}>
        {TEAM.map((member) => (
          <article key={member.name} className="mkt-card">
            <div className="quote-meta" style={{ marginBottom: 16 }}>
              <span className="avatar-dot">
                {member.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </div>
            </div>
            <p>{member.bio}</p>
          </article>
        ))}
      </div>
      <PastelTitle style={{ fontSize: 48 }}>Ground rules on the floor</PastelTitle>
      <div className="mkt-grid" style={{ marginBottom: 64 }}>
        {AGENT_DUTIES.map((item) => (
          <article key={item.agent} className="mkt-card">
            <p className="mkt-eyebrow">{item.duty}</p>
            <h3>{item.agent}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <PastelTitle style={{ fontSize: 48 }}>How a night on the sky runs</PastelTitle>
      <LedgerList
        items={PIPELINE.map((item) => ({
          when: item.step,
          title: item.title,
          detail: item.body,
        }))}
      />
    </MarketingShell>
  );
}
