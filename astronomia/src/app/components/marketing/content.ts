export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/neighborhood", label: "Sky graph" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/team", label: "Team" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export const TRUST_LOGOS = [
  "NASA",
  "Kepler",
  "K2",
  "TESS",
  "JWST",
  "Hubble",
  "Spitzer",
  "Gaia",
  "arXiv",
  "IPAC",
  "MAST",
  "Exoplanet Archive",
];

export const STATS = [
  { value: "5,000+", label: "TESS candidates still unvetted" },
  { value: "2,662", label: "Kepler confirmed exoplanets" },
  { value: "83.1%", label: "Cross-mission tabular F1" },
  { value: "2", label: "Named agents on the floor" },
];

export const PIPELINE = [
  {
    step: "01",
    title: "Ingest",
    body: "Mission tables arrive with different names for the same sky. We map Kepler, K2, and TESS onto one feature contract before anyone trains a model.",
  },
  {
    step: "02",
    title: "Classify",
    body: "A HistGradientBoosting classifier scores confirmed / candidate / false positive. AstronetCNN reads the light curve when you have a time series instead of a row.",
  },
  {
    step: "03",
    title: "Interrogate",
    body: "Hopper checks period, duration, and depth against stellar density. If the photometry cannot host the planet, the label does not get a free pass.",
  },
  {
    step: "04",
    title: "Brief",
    body: "Kepler writes the one-pager: archive parameters, arXiv takeaways, and a Groq Compound pass for what the journals have not indexed yet.",
  },
];

export const PROBLEM_QUOTES = [
  {
    quote:
      "Kepler, K2, and TESS dumped oceans of light curves on us. Confirming a transit still means a human staring at a plot at 2 a.m.",
    author: "u/transit_hunter",
    source: "r/exoplanets",
    stats: "1.2k upvotes",
  },
  {
    quote:
      "Every spacecraft ships a different table. One classifier that survives Kepler MAG versus TESSMAG is the whole job.",
    author: "@data_on_sky",
    source: "X",
    stats: "8.4k likes",
  },
  {
    quote:
      "I can spin TRAPPIST-1 e in NASA Eyes. I cannot get period, radius, and the arXiv stack on one page.",
    author: "kuro • #astro",
    source: "Discord",
    stats: "pinned",
  },
  {
    quote:
      "If the NASA Exoplanet Archive already knows the world, why am I still pasting orbital periods into a sheet?",
    author: "u/lex_compiles",
    source: "r/askastronomy",
    stats: "920 upvotes",
  },
  {
    quote:
      "Nine scripts to make TAP, ADS, and Eyes talk. That should not be the cost of reading one planet.",
    author: "@sora.builds",
    source: "X",
    stats: "14.2k likes",
  },
  {
    quote:
      "Give me days, ppm, Kelvin, and a DOI. Not a chatbot that thinks it discovered a planet.",
    author: "u/throwaway_dev",
    source: "r/astrophysics",
    stats: "2.4k upvotes",
  },
];

export const STACK_CHIPS = [
  "Kepler",
  "K2",
  "TESS",
  "JWST",
  "Hubble",
  "Spitzer",
  "Gaia",
  "TAP",
  "arXiv",
  "MAST",
  "NASA Eyes",
  "Groq",
  "Gemini",
  "Jupyter",
  "FastAPI",
  "Next.js",
];

export const TRUST_PILLS = [
  "Open source forever",
  "Keys stay on your machine",
  "Zero analytics on light curves",
  "Published F1, not a press release",
];

export const FEATURES = [
  {
    title: "Johannes Kepler Agent",
    body: "Pulls NASA Exoplanet Archive parameters, arXiv papers, and a Groq Compound web synthesis into one scientific brief — period, radius, equilibrium temperature, and the papers that actually matter.",
  },
  {
    title: "Grace Hopper Agent",
    body: "Reads period, depth, duration, and stellar context, then cross-checks an ML classifier for physical plausibility. Data first. The score second.",
  },
  {
    title: "Mission-aware classifier",
    body: "HistGradientBoosting trained across Kepler, K2, and TESS with an 83.1% F1 on confirmed / candidate / false positive, including dummy encoding for mission origin.",
  },
  {
    title: "AstronetCNN light curves",
    body: "Upload a transit time series. A deep network scores the dip the way the Kepler pipeline tradition does, at 65% F1 on KOI curves — a starting point, published honestly.",
  },
  {
    title: "NASA Eyes systems",
    body: "Official 3D visualizations for confirmed planets sit beside the brief. No extra tab. No lost context when you rotate the system.",
  },
  {
    title: "Open notebooks",
    body: "Jupyter lives in the same cockpit. Fine-tune, swap models, and keep ROC, precision, and recall next to the sky instead of in a forgotten slide.",
  },
];

export const TOOLKIT = [
  {
    mode: "Discovery agents",
    intro: "Language models that are allowed to call NASA, not just talk about it.",
    items: [
      { name: "Archive lookup", detail: "TAP + astroquery against pscomppars. Names like TRAPPIST-1e and TRAPPIST-1 e both resolve. Timeouts fall back to local ephemerides so the desk never goes blank." },
      { name: "Literature sonar", detail: "arXiv first for astro-ph. Then Groq Compound for JWST highlights, ground-based campaigns, and what has not hit ADS yet." },
      { name: "Physical sanity check", detail: "Hopper tests P–Tdur–depth against stellar density. A 2-minute transit on a 400-day orbit does not get to hide behind a 91% score." },
      { name: "Bibliographic desk", detail: "Three to six papers with one-line takeaways, DOIs when we have them, and a refusal to dump raw XML from the arXiv API." },
    ],
  },
  {
    mode: "Observatory toolkit",
    intro: "The instruments under the agents — the part a PI can audit.",
    items: [
      { name: "Cross-mission tables", detail: "Kepler MAG, TESS TESSMAG, K2 campaigns — aligned before inference so the model is not punished for a column rename." },
      { name: "Light-curve CNN", detail: "Astronet-style network on KOI transits. 65% F1. Meant for ranking follow-up, not claiming discovery." },
      { name: "Mission dashboard", detail: "TESS, JWST, Kepler, Hubble, Spitzer in one ops room with orbits, instruments, and a jump into NASA Eyes." },
      { name: "Local keys", detail: "Groq by default, no credit card. Gemini from AI Studio. OpenAI and Perplexity remain optional for labs that already pay." },
    ],
  },
];

export const DATA_SOURCES = [
  { name: "NASA Exoplanet Archive", body: "Planetary Systems Composite Parameters — preferred values, one row per confirmed world, queried live over TAP." },
  { name: "arXiv astro-ph", body: "Preprints the week they land: atmospheres, TTV, JWST reductions, not last year's typeset PDF." },
  { name: "MAST / Kepler / TESS", body: "Light curves and KOI tables for AstronetCNN and the Jupyter path when you have a time series, not a row." },
  { name: "NASA Eyes", body: "Official 3D systems embedded beside the brief so orbit geometry is not a screenshot." },
  { name: "IPAC / Caltech TAP", body: "The wire Kepler actually uses. Timeouts fall back to local ephemerides for demo worlds so the desk never goes blank." },
  { name: "Gaia & host stars", body: "Stellar radius, Teff, and log g are the context Hopper needs before a 91% score is allowed to speak." },
];

export const ROADMAP = [
  { when: "Now", title: "Dual-agent cockpit", detail: "Kepler + Hopper shipping. NASA TAP with name normalization, arXiv, Groq Compound, and the HistGradientBoosting classifier behind FastAPI." },
  { when: "Next", title: "Scientist-in-the-loop", detail: "Curated literature packs, calibrated confidence, and a review queue so a human can veto a false positive before the brief is shared." },
  { when: "Soon", title: "Model garden", detail: "Swap classifiers at inference. Publish the same F1, ROC, and confusion matrix for every run so workshops can compare honestly." },
  { when: "Horizon", title: "LoRA sky models", detail: "Distill open weights on transit language so the agents speak in days, ppm, and Kelvin without a general-purpose chat voice." },
  { when: "If we get lucky", title: "JWST first-class", detail: "Spectrum-aware Hopper, native James Webb product previews, and atmospheric retrieval notes beside the light curve." },
  { when: "Classroom", title: "Workshop kits", detail: "TRAPPIST-1 e, K2-18 b, and Kepler-22 b as teaching worlds with local fallbacks, so a lab without TAP still runs a night." },
];

export const TEAM = [
  {
    name: "Johannes Kepler",
    role: "Archive & literature agent",
    bio: "The research analyst. Catalogs, papers, and a one-line italic of the method before the table. Built to be boring in the right places.",
  },
  {
    name: "Grace Hopper",
    role: "Candidate validation agent",
    bio: "The skeptic. She starts from photometry, then argues with the ML score. Named for the admiral who refused to keep doing it the old way.",
  },
  {
    name: "Paul Barbaste",
    role: "Builder",
    bio: "NASA Space Apps. Full-stack cockpit, agent wiring, and the insistence that a student should be able to open Eyes and a brief in the same breath.",
  },
  {
    name: "Xavier Vasques",
    role: "Builder",
    bio: "ML pipeline, mission tables, and cross-mission validation. The F1 numbers exist because he would not ship a model that only worked on one spacecraft.",
  },
];

export const PLANS = [
  {
    name: "Mission Control",
    price: "Free",
    note: "Open source · Groq",
    cta: "Open observatory",
    href: "/exploration-path",
    features: [
      "Kepler + Hopper agents",
      "NASA archive + arXiv",
      "HistGradientBoosting predictions",
      "NASA Eyes embeds",
      "Local Groq key",
      "Community notebooks",
    ],
  },
  {
    name: "Research Lab",
    price: "BYOK",
    note: "Your Gemini or OpenAI key",
    cta: "Read key FAQ",
    href: "/faq",
    highlight: true,
    features: [
      "Everything in Mission Control",
      "Gemini 2.5 Flash path",
      "Optional Perplexity sonar",
      "Longer agent traces",
      "Notebook-side evaluation",
      "Priority TAP retries",
    ],
  },
  {
    name: "Observatory",
    price: "Custom",
    note: "Labs & classrooms",
    cta: "Read the manifesto",
    href: "/learn-more",
    features: [
      "Bring-your-own classifier",
      "Shared Jupyter rooms",
      "Mission workshop tracks",
      "Reproducible scorecards",
      "On-prem agent runtime",
      "Teaching datasets",
    ],
  },
];

export const FAQS = [
  {
    q: "Is this a full-stack AI product?",
    a: "Yes. Next.js 15 on the surface, FastAPI agents and models underneath, NASA TAP and arXiv on the wire. Frontend localhost:3000, API localhost:8000.",
  },
  {
    q: "Do I need OpenAI or Perplexity?",
    a: "No. Development defaults to a free Groq key from console.groq.com. Gemini from Google AI Studio is the other free option. OpenAI and Perplexity stay optional.",
  },
  {
    q: "Where does the 3D planet render?",
    a: "Three.js in your browser. No planet pixels leave the machine. Archive calls go to Caltech IPAC. Language calls go only to the key you configured.",
  },
  {
    q: "Why did TRAPPIST-1e return no rows?",
    a: "NASA stores TRAPPIST-1 e with a space. The app tries both forms, queries pscomppars, and falls back to local parameters if TAP times out — common from some networks.",
  },
  {
    q: "What do the F1 scores mean?",
    a: "83.1% for the tabular three-class model across missions. 65% for AstronetCNN on Kepler light curves. Both are published starting points, not a claim of discovery.",
  },
  {
    q: "What is the sky graph?",
    a: "A map of nearby confirmed hosts with Sol at the origin. Drag a probe to rank the closest systems. Fold the radial-velocity tug against the sideways wobble Gaia measures, and set how old a pulse from Earth is. Lookback time and inverse-square flux sit beside the plot. Local ephemerides run if TAP is quiet.",
  },
  {
    q: "Is this only for researchers?",
    a: "No. Beginners get Eyes and a plain-language brief. Data scientists get notebooks and raw features. Same sky, two depths.",
  },
  {
    q: "Can I run it without the NASA archive?",
    a: "The Kepler desk can serve fallback ephemerides for the demo worlds. Live TAP is preferred. Hopper's ML path does not need TAP — only your row of features.",
  },
  {
    q: "What is Groq Compound?",
    a: "Groq's web-capable system used as the free stand-in for Perplexity. If Compound is rate-limited, the agent falls back to a standard Llama 3.3 70B synthesis plus arXiv.",
  },
  {
    q: "Can a classroom run this tonight?",
    a: "Yes. Clone, add GROQ_API_KEY, start FastAPI on 8000 and Next on 3000. Mission Control is the free path. No purchase order, no planet pixels leaving the browser.",
  },
  {
    q: "Does Hopper invent planets?",
    a: "No. Hopper scores a row you provide. Kepler only briefs worlds already in the NASA archive (or a documented local fallback). Discovery claims stay with the literature.",
  },
  {
    q: "What missions does the classifier know?",
    a: "Kepler, K2, and TESS, with dummy encoding for mission origin so a column rename is not treated as astrophysics. JWST spectra are a horizon item, not a current input.",
  },
  {
    q: "Can I search any confirmed exoplanet?",
    a: "If it is in the NASA Exoplanet Archive Planetary Systems Composite table, Kepler will try. Famous names (TRAPPIST-1 e, K2-18 b, Kepler-22 b) also have local fallbacks.",
  },
  {
    q: "Where do light curves go?",
    a: "Into AstronetCNN and optional Jupyter — in your browser session. We do not resell photometry. Keys stay in ai_agents/.env.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Hopper arguing with the classifier is the first time a UI made me trust a false-positive score.",
    name: "Elena R.",
    title: "Exoplanet lab · visitor",
    initials: "ER",
  },
  {
    quote: "Kepler's one-page TRAPPIST brief replaced a stack of TAP CSV and arXiv tabs.",
    name: "Michael T.",
    title: "astro-ph reader",
    initials: "MT",
  },
  {
    quote: "The cockpit looks like a flight product. The F1 score is the part that made me stay.",
    name: "Sarah J.",
    title: "Space Apps mentor",
    initials: "SJ",
  },
  {
    quote: "An absolute lifesaver in a workshop. Students opened Eyes and a brief in the same breath.",
    name: "David K.",
    title: "Data scientist · Zomato alumni",
    initials: "DK",
  },
  {
    quote: "I recommend this stack to the whole lab. Quiet type. Cited sources. No slot-machine UI.",
    name: "Chris L.",
    title: "Lead developer",
    initials: "CL",
  },
  {
    quote: "The F1 is published. That alone is more honest than most 'AI for astronomy' decks.",
    name: "Jessica W.",
    title: "Content + catalogs",
    initials: "JW",
  },
];

export const PRINCIPLES = [
  { title: "Units on every number", body: "Days, ppm, Kelvin, Earth radii. A brief without units is a rumor." },
  { title: "The archive is the source", body: "We cite NASA TAP and arXiv. We do not invent a planet to fill a card." },
  { title: "Models are instruments", body: "F1 is published. Overclaiming a transit is a ground rule, not a slogan." },
  { title: "Beginners are not a lesser path", body: "Eyes and a one-line summary are first-class, not a toy mode bolted on." },
  { title: "Two agents, two jobs", body: "Kepler briefs what NASA already named. Hopper argues with what the classifier just scored." },
  { title: "Photometry before prose", body: "Period, depth, duration, and stellar density enter the room before any language model does." },
];

export const SKY_BRIEF = [
  {
    title: "Confirmed worlds",
    body: "Johannes Kepler queries the NASA Exoplanet Archive, pulls arXiv, and writes a one-page brief: period, radius, equilibrium temperature, host star, and the papers that actually matter.",
  },
  {
    title: "New candidates",
    body: "Grace Hopper starts from photometry you typed — period, depth, duration, stellar context — then argues with a HistGradientBoosting label. A 91% score is not a free pass.",
  },
  {
    title: "Light curves",
    body: "Upload a transit time series. AstronetCNN scores the dip the way the Kepler pipeline tradition does. 65% F1, published honestly, meant for ranking follow-up.",
  },
  {
    title: "Mission context",
    body: "TESS, JWST, Kepler, Hubble, and Spitzer sit on one ops floor. A period in days is meaningless until you know which photometer flew.",
  },
  {
    title: "NASA Eyes",
    body: "Official 3D systems open beside the brief. Orbit the host. See the geometry. No extra tab, no lost context when you rotate the sky.",
  },
  {
    title: "Open notebooks",
    body: "Jupyter lives in the same cockpit. Fine-tune, swap models, and keep ROC, precision, and recall next to the transit instead of in a forgotten slide.",
  },
];

export const FAMOUS_WORLDS = [
  {
    name: "TRAPPIST-1 e",
    tag: "Seven-world M dwarf",
    body: "Earth-sized, temperate, and the archive stores a space in the letter. Kepler's first test of name spacing and literature density.",
  },
  {
    name: "K2-18 b",
    tag: "Sub-Neptune + JWST",
    body: "Habitable-zone sub-Neptune with an atmosphere literature stack. The bibliographic desk has to earn this one.",
  },
  {
    name: "Kepler-22 b",
    tag: "First HZ Sun-like",
    body: "The first Kepler habitable-zone planet around a Sun-like star. Classic period and radius brief.",
  },
  {
    name: "Kepler-452 b",
    tag: "Earth's cousin",
    body: "A longer-period rocky analog. Good for showing what the composite table actually stores versus the press nickname.",
  },
  {
    name: "Proxima Centauri b",
    tag: "Nearest confirmed",
    body: "The closest known exoplanet. Radial-velocity heritage, not a Kepler transit — a reminder the archive is bigger than one photometer.",
  },
  {
    name: "TOI candidates",
    tag: "TESS still writing",
    body: "TESS Objects of Interest are Hopper's native dialect: fresh rows, noisy cadences, and labels that still have to survive physics.",
  },
];

export const OBSERVATORY_BEATS = [
  {
    title: "You name a NASA world",
    body: "TRAPPIST-1 e, not a vibe. Kepler tries the spaced form, then the compact one, then local ephemerides if IPAC is slow.",
  },
  {
    title: "The archive speaks first",
    body: "pscomppars preferred values: orbital period, planet radius, insolation, stellar Teff. Units stay on the number.",
  },
  {
    title: "Literature rides along",
    body: "arXiv astro-ph, then Groq Compound for what has not hit ADS yet. Three to six papers, one-line takeaways, DOIs when we have them.",
  },
  {
    title: "Eyes opens the system",
    body: "The same cockpit embeds NASA Eyes so a student can see the orbit while reading the Kelvin.",
  },
];

export const CLASSROOM_USES = [
  {
    title: "Undergrad lab",
    body: "One Groq key. Demo worlds with local fallbacks. Students brief a confirmed planet before they ever touch a CSV.",
  },
  {
    title: "ML workshop",
    body: "HistGradientBoosting at 83.1% F1 across Kepler, K2, and TESS. Bring a better classifier. Publish the same scorecard.",
  },
  {
    title: "Outreach night",
    body: "NASA Eyes plus a plain-language Kepler brief. Beginners are not a lesser path. The sky is the same.",
  },
];

export const AGENT_DUTIES = [
  {
    agent: "Johannes Kepler",
    duty: "Archive & literature",
    body: "May call NASA TAP and arXiv. May not invent a planet to fill a card. Writes the one-pager a PI can actually cite.",
  },
  {
    agent: "Grace Hopper",
    duty: "Candidate validation",
    body: "Starts from the row you typed. Cross-checks period–duration–depth against stellar density. Named for the admiral who refused the old way.",
  },
];

export type PageCopy = {
  pill: string;
  pillHref: string;
  title: string;
  lede: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  cta: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    pills: string[];
  };
};

export const PAGE_COPY: Record<string, PageCopy> = {
  home: {
    pill: "NASA Space Apps · Kepler Engine v1",
    pillHref: "/features",
    title: "Hunt exoplanets.\nNot spreadsheets.",
    lede: "Adhyagnan puts Kepler, K2, and TESS in one observatory. Two agents — Johannes Kepler and Grace Hopper — brief confirmed worlds and interrogate new candidates against NASA archives.",
    primary: { href: "/exploration-path", label: "Open the observatory" },
    secondary: { href: "/learn-more", label: "Read the manifesto" },
    cta: {
      eyebrow: "Begin the hunt",
      title: "The sky already spoke.\nThe brief was missing.",
      lede: "Mission Control is free. A Groq key is enough. From a NASA TAP row to a one-page exoplanet brief without a purchase order.",
      primary: { href: "/exploration-path", label: "Open the observatory" },
      secondary: { href: "/features", label: "See the instruments" },
      pills: ["Open source forever", "Keys stay local", "Published F1"],
    },
  },
  features: {
    pill: "Observatory instruments",
    pillHref: "/roadmap",
    title: "Every telescope.\nOne briefing desk.",
    lede: "Agents, classifiers, TAP, light curves, and NASA Eyes — so a transit is not a spreadsheet attack, and a confirmed world does not need six tabs.",
    primary: { href: "/exploration-path", label: "Try the stack" },
    secondary: { href: "/pricing", label: "See access tiers" },
    cta: {
      eyebrow: "Ready when you are",
      title: "The catalog.\nNot the wallpaper.",
      lede: "Kepler is allowed to query NASA. Hopper is required to argue with the model. That is the whole observatory.",
      primary: { href: "/kepler-input", label: "Brief a planet" },
      secondary: { href: "/grace-hopper-input", label: "Score a candidate" },
      pills: ["TAP + arXiv", "83.1% tabular F1", "NASA Eyes in-cockpit"],
    },
  },
  roadmap: {
    pill: "Flight plan 2026",
    pillHref: "/features",
    title: "They keep launching.\nWe keep briefing.",
    lede: "From the NASA Space Apps first draft to a JWST-native Hopper that can read a spectrum without pretending it is a tweet.",
    primary: { href: "/features", label: "What ships today" },
    secondary: { href: "/team", label: "Who is flying it" },
    cta: {
      eyebrow: "Next orbit",
      title: "Dates can slip.\nThe F1 cannot.",
      lede: "Scientist-in-the-loop, a model garden, then JWST if we get lucky. Nothing on this page is a discovery claim.",
      primary: { href: "/faq", label: "Read the scores" },
      secondary: { href: "/learn-more", label: "Why we built it" },
      pills: ["Now shipping", "Honest luck label", "Public metrics"],
    },
  },
  team: {
    pill: "Observatory crew",
    pillHref: "/learn-more",
    title: "Two agents.\nTwo builders.",
    lede: "Kepler reads the NASA archive. Hopper argues with the classifier. The humans wired the cockpit so a student can hunt exoplanets without a credit card.",
    primary: { href: "/exploration-path", label: "Meet them at work" },
    secondary: { href: "/roadmap", label: "See the flight plan" },
    cta: {
      eyebrow: "The floor",
      title: "Not mascots.\nOperators.",
      lede: "Paul and Xavier own the TAP timeouts and the F1. Kepler and Hopper own the night sky.",
      primary: { href: "/kepler-input", label: "Work with Kepler" },
      secondary: { href: "/grace-hopper-input", label: "Work with Hopper" },
      pills: ["NASA Space Apps", "Groq by default", "No credit card"],
    },
  },
  pricing: {
    pill: "Access, not metering",
    pillHref: "/faq",
    title: "No purchase order.\nThe sky is free.",
    lede: "The NASA archive is public. Mission Control is a free Groq key. Research Lab is bring-your-own. Observatory is for labs that want the stack on their own metal.",
    primary: { href: "/exploration-path", label: "Start on free" },
    secondary: { href: "/faq", label: "How keys work" },
    cta: {
      eyebrow: "Classrooms first",
      title: "No metering.\nPublic photons.",
      lede: "Pay a language provider only if you leave Groq. Briefing Kepler-22 b on a Thursday should not require procurement.",
      primary: { href: "/exploration-path", label: "Open Mission Control" },
      secondary: { href: "/learn-more", label: "Read the rules" },
      pills: ["Free Groq path", "BYOK Gemini", "On-prem later"],
    },
  },
  faq: {
    pill: "Observatory knowledge",
    pillHref: "/features",
    title: "Asked at 2 a.m.\nAnswered here.",
    lede: "Keys, TAP timeouts, TRAPPIST name spacing, F1 scores, and whether this discovered a planet. It did not. The literature did. We brief it.",
    primary: { href: "/kepler-input", label: "Try a demo world" },
    secondary: { href: "/exploration-path", label: "Open the desks" },
    cta: {
      eyebrow: "Still stuck?",
      title: "The FAQ is the map.\nThe desk is the sky.",
      lede: "TRAPPIST-1 e needs a space. Groq lives in .env. Hopper will not invent an exoplanet to fill a card.",
      primary: { href: "/kepler-input", label: "Search TRAPPIST-1 e" },
      secondary: { href: "/pricing", label: "Check the free tier" },
      pills: ["No OpenAI required", "Local fallback worlds", "F1 is public"],
    },
  },
  manifesto: {
    pill: "Our manifesto",
    pillHref: "/team",
    title: "Always this way.\nNot anymore.",
    lede: "Grace Hopper said the dangerous phrase. Adhyagnan built a cockpit so exoplanet hunting is not a manual grind across mismatched NASA missions.",
    primary: { href: "/exploration-path", label: "Begin the exploration" },
    secondary: { href: "/features", label: "See how it works" },
    cta: {
      eyebrow: "The move",
      title: "Logistics in Kepler.\nSkepticism in Hopper.",
      lede: "Keep the numbers public. NASA Eyes for beginners. Notebooks for the people who will argue with the model.",
      primary: { href: "/team", label: "Meet the crew" },
      secondary: { href: "/roadmap", label: "What comes next" },
      pills: ["83.1% F1 published", "65% CNN, honestly", "Units on every number"],
    },
  },
  observatory: {
    pill: "Observatory floor",
    pillHref: "/mission-dashboard",
    title: "Pick a desk.\nBegin the night.",
    lede: "Kepler for worlds NASA already named. Hopper for candidates that still have to earn the label. The polar wave for who sits next to Sol. Missions for the telescopes that filled the archive.",
    primary: { href: "/kepler-input", label: "Sit at Kepler" },
    secondary: { href: "/grace-hopper-input", label: "Sit at Hopper" },
    cta: {
      eyebrow: "Shift change",
      title: "Ingest. Classify.\nInterrogate. Brief.",
      lede: "Nothing here starts from a prompt about being an astronomer. The photometry has to survive the argument.",
      primary: { href: "/mission-dashboard", label: "See the missions" },
      secondary: { href: "/features", label: "How the pipeline runs" },
      pills: ["Confirmed path", "Candidate path", "Flight ops"],
    },
  },
  neighborhood: {
    pill: "Solar neighborhood map",
    pillHref: "/features",
    title: "Who sits next door.\nThen how long the light takes.",
    lede: "Sol at the origin. Nearby confirmed hosts as points. Drag the probe to rank the closest systems. Slide orbital phase, set how old a signal from Earth is, and read the lookback — the part that actually spends telescope time.",
    primary: { href: "/kepler-input", label: "Brief the nearest" },
    secondary: { href: "/exploration-path", label: "Back to desks" },
    cta: {
      eyebrow: "After the map",
      title: "A neighbor is a delay.\nA delay is a brief.",
      lede: "Proxima is 4.24 years of light. JWST time follows inverse-square flux. The graph is the arithmetic, not a wallpaper.",
      primary: { href: "/kepler-input", label: "Open Kepler" },
      secondary: { href: "/features", label: "The rest of the stack" },
      pills: ["Nearest to Sol", "Draggable probe", "Lookback and flux"],
    },
  },
  kepler: {
    pill: "Johannes Kepler desk",
    pillHref: "/features",
    title: "Name a world.\nGet the brief.",
    lede: "NASA names use a space: TRAPPIST-1 e, K2-18 b. Kepler will not invent an exoplanet. If TAP is slow, demo worlds still brief from local ephemerides.",
    primary: { href: "/exploration-path", label: "Back to desks" },
    secondary: { href: "/faq", label: "Why TAP times out" },
    cta: {
      eyebrow: "After the search",
      title: "Archive first.\nLiterature second.",
      lede: "Planetary Systems Composite Parameters, then arXiv, then Groq Compound. NASA Eyes sits beside the table — not in another tab.",
      primary: { href: "/mission-dashboard", label: "Context: missions" },
      secondary: { href: "/grace-hopper-input", label: "Have a candidate instead?" },
      pills: ["pscomppars", "arXiv astro-ph", "Name spacing"],
    },
  },
  missions: {
    pill: "Flight operations",
    pillHref: "/exploration-path",
    title: "The telescopes\nbehind the table.",
    lede: "A period in days is meaningless until you know which photometer flew. Open TESS, JWST, Kepler, Hubble, or Spitzer in NASA Eyes from this floor.",
    primary: { href: "/kepler-input", label: "Brief a Kepler world" },
    secondary: { href: "/exploration-path", label: "Return to desks" },
    cta: {
      eyebrow: "Ops complete",
      title: "They already flew.\nThe brief is yours.",
      lede: "Closed catalogs trained the 83.1% F1. TESS is still writing candidates Hopper can argue with.",
      primary: { href: "/grace-hopper-input", label: "Score a TESS row" },
      secondary: { href: "/learn-more", label: "Why missions matter" },
      pills: ["Active: TESS, JWST, Hubble", "Archive: Kepler, K2, Spitzer"],
    },
  },
  hopper: {
    pill: "Grace Hopper desk",
    pillHref: "/features",
    title: "Give it photometry.\nNot a vibe.",
    lede: "Period, depth, duration, stellar context. Hopper starts from the row you typed, then argues with the HistGradientBoosting label. 91% is not a free pass.",
    primary: { href: "/exploration-path", label: "Back to desks" },
    secondary: { href: "/kepler-input", label: "Need a confirmed world?" },
    cta: {
      eyebrow: "After you submit",
      title: "Data first.\nThe score second.",
      lede: "A 2-minute transit on a 400-day orbit does not hide behind a confidence bar. That is the whole job.",
      primary: { href: "/faq", label: "What F1 means" },
      secondary: { href: "/features", label: "The classifier stack" },
      pills: ["Physical sanity check", "Cross-mission tables", "CNN optional"],
    },
  },
};
