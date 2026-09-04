export type SkyWorld = {
  pl_name: string;
  hostname: string;
  ra: number;
  dec: number;
  sy_dist: number;
  disc_year: number;
  discoverymethod: string;
  pl_rade?: number;
  pl_masse?: number;
  pl_orbper?: number;
  pl_eqt?: number;
  pl_insol?: number;
  st_teff?: number;
};

export type GraphNode = SkyWorld & {
  id: string;
  l: number;
  b: number;
  x: number;
  y: number;
  z: number;
  isSol: boolean;
};

export type RadialMode = "linear" | "sqrt" | "log";
