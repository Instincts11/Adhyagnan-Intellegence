"use client";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export const PASTEL_COUNT = 12;

const PAGE_OFFSET: Record<string, number> = {
  home: 0,
  features: 1,
  roadmap: 2,
  team: 3,
  pricing: 4,
  faq: 5,
  manifesto: 6,
  observatory: 7,
  kepler: 8,
  hopper: 9,
  missions: 10,
};

const PastelSeq = createContext<() => number>(() => 0);

export function PastelProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  const seq = useRef(0);
  if (pathRef.current !== pathname) {
    pathRef.current = pathname;
    seq.current = 0;
  }
  const next = () => seq.current++;
  return <PastelSeq.Provider value={next}>{children}</PastelSeq.Provider>;
}

function PastelEm({ children }: { children: ReactNode }) {
  const next = useContext(PastelSeq);
  const pathname = usePathname();
  const toneRef = useRef<number | null>(null);
  if (toneRef.current === null) {
    const offset = PAGE_OFFSET[pageAccentFromPath(pathname)] ?? 0;
    toneRef.current = offset + next();
  }
  const i = ((toneRef.current % PASTEL_COUNT) + PASTEL_COUNT) % PASTEL_COUNT;
  return <em className={`h1-pastel h1-pastel-${i}`}>{children}</em>;
}

function paintString(line: string) {
  const match = line.match(/^(.*?)(\S+)(\s*)$/);
  if (!match) return line;
  const [, before, last, after] = match;
  return (
    <>
      {before}
      <PastelEm>{last}</PastelEm>
      {after}
    </>
  );
}

function paintNode(node: ReactNode): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    return paintString(String(node));
  }
  if (isValidElement<{ children?: ReactNode; className?: string }>(node)) {
    if (typeof node.props.className === "string" && node.props.className.includes("h1-pastel")) {
      return node;
    }
    if (node.props.children != null) {
      return cloneElement(node, undefined, wrapPastelLastWord(node.props.children));
    }
  }
  return node;
}

export function wrapPastelLastWord(children: ReactNode): ReactNode {
  const items = Children.toArray(children);
  if (items.length === 0) return children;

  let lastIdx = items.length - 1;
  while (lastIdx >= 0) {
    const item = items[lastIdx];
    if (typeof item === "string" && item.trim() === "") {
      lastIdx -= 1;
      continue;
    }
    break;
  }
  if (lastIdx < 0) return children;

  const painted = paintNode(items[lastIdx]);
  if (items.length === 1) return painted;
  return (
    <>
      {items.slice(0, lastIdx)}
      {painted}
      {items.slice(lastIdx + 1)}
    </>
  );
}

export function PastelTitle({
  children,
  className = "mkt-title",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <h2 className={className} style={style}>
      {wrapPastelLastWord(children)}
    </h2>
  );
}

export function pageAccentFromPath(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/features")) return "features";
  if (pathname.startsWith("/roadmap")) return "roadmap";
  if (pathname.startsWith("/team")) return "team";
  if (pathname.startsWith("/pricing")) return "pricing";
  if (pathname.startsWith("/faq")) return "faq";
  if (pathname.startsWith("/learn-more")) return "manifesto";
  if (pathname.startsWith("/exploration-path") || pathname.startsWith("/exoplanet-search")) {
    return "observatory";
  }
  if (pathname.startsWith("/kepler")) return "kepler";
  if (pathname.startsWith("/grace-hopper")) return "hopper";
  if (pathname.startsWith("/mission")) return "missions";
  return "home";
}
