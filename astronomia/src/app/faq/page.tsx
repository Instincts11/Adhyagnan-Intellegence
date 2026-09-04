"use client";
import MarketingShell from "../components/marketing/MarketingShell";
import FaqList from "../components/marketing/FaqList";
import { FAMOUS_WORLDS } from "../components/marketing/content";
import { PastelTitle } from "../components/marketing/pastelHeading";

export default function FaqPage() {
  return (
    <MarketingShell page="faq">
      <p className="prose-block">
        If your question is “can I hunt exoplanets without OpenAI,” the answer is yes — Groq is
        enough. If your question is “did the model discover a planet,” the answer is no, and Grace
        Hopper will tell you why.
      </p>
      <FaqList />
      <PastelTitle style={{ fontSize: 48, marginTop: 64 }}>Demo worlds when TAP is slow</PastelTitle>
      <p className="prose-block">
        NASA stores TRAPPIST-1 e with a space. The Kepler desk tries both spellings, then falls back
        to local ephemerides so a classroom is not blank.
      </p>
      <div className="mkt-grid" style={{ marginBottom: 48 }}>
        {FAMOUS_WORLDS.slice(0, 3).map((item) => (
          <article key={item.name} className="mkt-card">
            <p className="mkt-eyebrow">{item.tag}</p>
            <h3>{item.name}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="mkt-grid" style={{ marginTop: 16 }}>
        <article className="mkt-card">
          <h3>Still blocked on TAP?</h3>
          <p>Caltech IPAC can be slow from some networks. Demo worlds have local ephemerides. Retry, or work Hopper on a CSV row of period, depth, and duration.</p>
        </article>
        <article className="mkt-card">
          <h3>Need a key?</h3>
          <p>Groq: console.groq.com/keys. Gemini: aistudio.google.com/apikey. Put it in ai_agents/.env as GROQ_API_KEY or GOOGLE_API_KEY.</p>
        </article>
        <article className="mkt-card">
          <h3>Have a deeper question?</h3>
          <p>Open the observatory and try TRAPPIST-1 e first. The FAQ is the map. The desk is the sky.</p>
        </article>
      </div>
    </MarketingShell>
  );
}
