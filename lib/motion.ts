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

// True when the user is on Data Saver or a slow/metered connection. Used to skip
// the non-essential intro/loader animation so first paint (FCP/LCP) isn't held back
// for people who can least afford the wait.
export function prefersReducedData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  return conn.effectiveType === "slow-2g" || conn.effectiveType === "2g" || conn.effectiveType === "3g";
}
