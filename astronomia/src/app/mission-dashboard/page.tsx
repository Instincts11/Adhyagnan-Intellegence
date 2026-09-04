"use client";
import StarfieldHyperdrive from "../components/StarfieldHyperdrive";
import SiteHeader from "../components/marketing/SiteHeader";
import SiteFooter from "../components/marketing/SiteFooter";
import CtaBand from "../components/marketing/CtaBand";
import PageHero from "../components/marketing/PageHero";
import { PAGE_COPY } from "../components/marketing/content";

type Mission = {
  name: string;
  url: string;
  description: string;
  launchDate: string;
  status: string;
  discoveries: string;
  objective: string;
  orbit: string;
  instruments: string;
  missionDuration: string;
};

const activeMissions: Mission[] = [
  {
    name: "TESS",
    url: "sc_tess",
    description: "All-sky transit survey of nearby bright stars — the candidate factory Hopper was built to interrogate.",
    launchDate: "April 18, 2018",
    status: "Active",
    discoveries: "5,000+ exoplanet candidates",
    objective: "Find Earth-sized planets in the habitable zones of nearby stars",
    orbit: "Highly elliptical Earth orbit (P/2)",
    instruments: "4 wide-field cameras",
    missionDuration: "2 years primary, extended through 2025",
  },
  {
    name: "JWST",
    url: "sc_jwst",
    description: "Infrared observatory that turns a confirmed world into an atmosphere problem. Horizon work for Hopper.",
    launchDate: "December 25, 2021",
    status: "Active",
    discoveries: "Transmission and emission spectra of exoplanet atmospheres",
    objective: "Study star and planet formation, and the chemistry of other skies",
    orbit: "Sun–Earth L2",
    instruments: "NIRCam, MIRI, NIRSpec, NIRISS",
    missionDuration: "5–10 years expected",
  },
  {
    name: "Hubble",
    url: "sc_hubble_space_telescope",
    description: "Still the UV/optical workhorse for exoplanet atmospheres and the first direct images.",
    launchDate: "April 24, 1990",
    status: "Active",
    discoveries: "First direct image of an exoplanet; transit spectroscopy heritage",
    objective: "Observe in visible, ultraviolet, and near-infrared",
    orbit: "Low Earth orbit",
    instruments: "WFC3, COS, ACS",
    missionDuration: "30+ years",
  },
];

const completedMissions: Mission[] = [
  {
    name: "Kepler",
    url: "sc_kepler_space_telescope",
    description: "The statistical engine of the field. 2,662 confirmed worlds. The namesake of our archive agent.",
    launchDate: "March 7, 2009",
    status: "Retired (October 30, 2018)",
    discoveries: "2,662 confirmed exoplanets",
    objective: "Determine the frequency of Earth-size planets in the habitable zone",
    orbit: "Earth-trailing heliocentric orbit",
    instruments: "Photometer with 42 CCDs",
    missionDuration: "9.5 years",
  },
  {
    name: "K2",
    url: "sc_kepler_space_telescope",
    description: "Kepler’s second life along the ecliptic. Different pointing, same photometer, new table dialect.",
    launchDate: "May 2014 (campaigns)",
    status: "Retired with Kepler",
    discoveries: "Hundreds of confirmed planets across the ecliptic",
    objective: "Continue transit science after reaction-wheel failure",
    orbit: "Earth-trailing heliocentric orbit",
    instruments: "Same Kepler photometer",
    missionDuration: "Campaigns 0–19",
  },
  {
    name: "Spitzer",
    url: "sc_spitzer",
    description: "Infrared secondary eclipses and phase curves before JWST made atmospheres routine.",
    launchDate: "August 25, 2003",
    status: "Retired (January 30, 2020)",
    discoveries: "First detection of light from exoplanets",
    objective: "Study the universe in infrared wavelengths",
    orbit: "Earth-trailing heliocentric orbit",
    instruments: "IRAC, IRS, MIPS",
    missionDuration: "16.5 years",
  },
];

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <article className="mission-card">
      <div>
        <p className="mkt-eyebrow">{mission.status}</p>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 400, margin: "0 0 8px" }}>
          {mission.name}
        </h3>
        <p>{mission.description}</p>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{mission.objective}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12, color: "var(--muted)" }}>
        <div>Launch {mission.launchDate}</div>
        <div>{mission.orbit}</div>
        <div>{mission.discoveries}</div>
        <div>{mission.missionDuration}</div>
        <div style={{ gridColumn: "1 / -1" }}>Instruments · {mission.instruments}</div>
      </div>
      <button
        type="button"
        className="site-cta"
        style={{ border: 0, cursor: "pointer", marginTop: 8, width: "fit-content" }}
        onClick={() => {
          window.location.href = `/mission-viewer?mission=${encodeURIComponent(mission.name)}&url=${encodeURIComponent(mission.url)}&description=${encodeURIComponent(mission.description)}`;
        }}
      >
        Open NASA Eyes
      </button>
    </article>
  );
}

export default function MissionDashboardPage() {
  return (
    <div className="app-canvas" data-page="missions">
      <StarfieldHyperdrive speed={0.03} warpBoost={0.22} />
      <SiteHeader />
      <PageHero copy={PAGE_COPY.missions} />
      <main className="app-stage">
        <div className="mkt-grid" style={{ marginBottom: 40 }}>
          <article className="mkt-card">
            <h3>Why missions, not a poster</h3>
            <p>
              A period in days is meaningless until you know which photometer, which cadence,
              which noise floor. Kepler, K2, and TESS did not speak the same table. This floor is
              the context the agents assume you already have.
            </p>
          </article>
          <article className="mkt-card">
            <h3>Active vs archive</h3>
            <p>
              TESS and JWST still write new rows. Kepler and K2 are closed catalogs — still the
              training set that made the 83.1% F1 possible.
            </p>
          </article>
          <article className="mkt-card">
            <h3>From survey to atmosphere</h3>
            <p>
              TESS still writes TOIs for Hopper. JWST turns a confirmed world into chemistry.
              Hubble still owns UV heritage. Closed Kepler and K2 catalogs trained the 83.1% F1.
            </p>
          </article>
          <article className="mkt-card">
            <h3>Eyes, not screenshots</h3>
            <p>
              Each card opens the official NASA Eyes visualization. Orbit geometry belongs in 3D,
              not in a caption — the same cockpit Kepler uses beside the brief.
            </p>
          </article>
        </div>
        <h2 className="mkt-eyebrow" style={{ marginTop: 8 }}>Flying now</h2>
        <div className="mkt-grid" style={{ margin: "12px 0 40px" }}>
          {activeMissions.map((m) => (
            <MissionCard key={m.name} mission={m} />
          ))}
        </div>
        <h2 className="mkt-eyebrow">Closed catalogs</h2>
        <div className="mkt-grid" style={{ marginTop: 12, marginBottom: 24 }}>
          {completedMissions.map((m) => (
            <MissionCard key={m.name} mission={m} />
          ))}
        </div>
      </main>
      <CtaBand {...PAGE_COPY.missions.cta} />
      <SiteFooter />
    </div>
  );
}
