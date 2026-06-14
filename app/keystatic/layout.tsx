import KeystaticApp from "./keystatic";

// The Keystatic admin only works locally (`npm run dev`): it writes content files
// to disk, which the production Workers runtime can't do. Edit here, commit the
// content/ changes, then deploy.
export default function KeystaticLayout() {
  if (process.env.NODE_ENV !== "development") {
    return (
      <div style={{ padding: "3rem", fontFamily: "system-ui, sans-serif", maxWidth: "40rem", margin: "0 auto" }}>
        <h1>Editor nur lokal verfügbar</h1>
        <p>
          Der Inhalts-Editor läuft nur in der lokalen Entwicklung (<code>npm run dev</code> →{" "}
          <code>/keystatic</code>). Änderungen werden als Dateien gespeichert, committet und neu deployed.
        </p>
      </div>
    );
  }
  return <KeystaticApp />;
}
