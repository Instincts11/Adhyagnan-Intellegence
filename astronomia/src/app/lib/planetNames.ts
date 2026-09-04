/** NASA stores Bayer names with IAU abbreviations: 55 Cancri e → 55 Cnc e */

const GENITIVE_TO_IAU: [RegExp, string][] = [
  [/\bcentauri\b/gi, "Cen"],
  [/\bcancri\b/gi, "Cnc"],
  [/\beridani\b/gi, "Eri"],
  [/\btauri\b/gi, "Tau"],
  [/\bpegasi\b/gi, "Peg"],
  [/\bceti\b/gi, "Cet"],
  [/\bleonis\b/gi, "Leo"],
  [/\bvirginis\b/gi, "Vir"],
  [/\bandromedae\b/gi, "And"],
  [/\baquarii\b/gi, "Aqr"],
  [/\bdraconis\b/gi, "Dra"],
  [/\bherculis\b/gi, "Her"],
  [/\blyrae\b/gi, "Lyr"],
  [/\bursa(?:e)?\s+majoris\b/gi, "UMa"],
  [/\bcanis\s+majoris\b/gi, "CMa"],
];

const EXTRA: Record<string, string[]> = {
  "55cancrie": ["55 Cnc e", "HD 75732 e"],
  "55cnce": ["55 Cnc e", "55 Cancri e", "HD 75732 e"],
  "proximacentaurib": ["Proxima Cen b", "Proxima Centauri b"],
  "proximacenb": ["Proxima Cen b"],
  "proximab": ["Proxima Cen b"],
  "kelt9b": ["KELT-9 b"],
  "hatp67b": ["HAT-P-67 b"],
  "hat-p-67b": ["HAT-P-67 b"],
};

export function compactPlanetName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function planetNameCandidates(raw: string): string[] {
  const name = raw.trim().replace(/\+/g, " ").replace(/\s+/g, " ");
  const out: string[] = [];
  const seen = new Set<string>();

  const add = (value: string) => {
    const trimmed = value.trim().replace(/\s+/g, " ");
    if (!trimmed) return;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(trimmed);
  };

  add(name);
  add(name.replace(/([0-9])([A-Za-z])$/, "$1 $2"));
  add(name.replace(/([0-9])\s+([A-Za-z])$/, "$1$2"));
  const lowerLetter = name.replace(/([0-9]\s*)([A-Z])$/, (_, digits: string, letter: string) => {
    return `${digits.trimEnd()} ${letter.toLowerCase()}`;
  });
  add(lowerLetter);
  add(lowerLetter.replace(/([0-9])\s+([a-z])$/, "$1$2"));

  for (const [pattern, abbr] of GENITIVE_TO_IAU) {
    add(name.replace(pattern, abbr));
    add(lowerLetter.replace(pattern, abbr));
  }

  for (const extra of EXTRA[compactPlanetName(name)] ?? []) add(extra);

  return out;
}

const IAU_TOKEN = /\b(Cnc|Cen|Eri|Tau|Peg|Cet|Leo|Vir|And|Aqr|Dra|Her|Lyr|UMa|CMa)\b/;

/** Hash slug for NASA Eyes: 55 Cancri e → 55_Cnc_e */
export function eyesPlanetSlug(name: string): string {
  const spaced = name.trim().replace(/\+/g, " ").replace(/\s+/g, " ").replace(/([0-9])([A-Za-z])$/, "$1 $2");
  const candidates = planetNameCandidates(spaced);
  const chosen =
    candidates.find((c) => IAU_TOKEN.test(c)) ||
    candidates.find((c) => /\s[a-z]$/i.test(c)) ||
    spaced;
  return chosen.replace(/\s+/g, "_");
}

export function eyesSystemSlug(hostname: string): string {
  const name = hostname.trim().replace(/\+/g, " ").replace(/\s+/g, " ");
  const abbreviated = planetNameCandidates(name).find((c) => IAU_TOKEN.test(c)) || name;
  return abbreviated.replace(/\s+/g, "_");
}
