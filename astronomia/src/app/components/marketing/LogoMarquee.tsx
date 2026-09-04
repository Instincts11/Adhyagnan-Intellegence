import { TRUST_LOGOS } from "./content";

export default function LogoMarquee() {
  const logos = [...TRUST_LOGOS, ...TRUST_LOGOS];
  return (
    <div className="marquee">
      <p className="marquee-caption">Missions that filled the NASA Exoplanet Archive</p>
      <div className="marquee-track">
        {logos.map((name, i) => (
          <span key={`${name}-${i}`}>{name}</span>
        ))}
      </div>
    </div>
  );
}
