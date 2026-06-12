type V2LogoProps = {
  className?: string;
};

// The official Glockenspiel logo from /public/logo — theme-aware via --v2-logo.
export function V2Logo({ className }: V2LogoProps) {
  return (
    <span
      className={className ? `v2-logo ${className}` : "v2-logo"}
      role="img"
      aria-label="Das Glockenspiel"
    />
  );
}
