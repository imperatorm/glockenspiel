// Single source of truth for the reduced-motion check.
// localStorage "glocken-force-motion" = "1" overrides emulated/system reduce — used for debugging
// the full motion path in environments that force prefers-reduced-motion.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (localStorage.getItem("glocken-force-motion") === "1") return false;
  } catch {
    // ignore storage access issues
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
