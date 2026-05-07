import { useState } from "react";
import { toPng, toSvg } from "html-to-image";
import jsPDF from "jspdf";

function getCanvas() {
  return document.querySelector(".react-flow__renderer");
}

export default function ExportBar() {
  const [loading, setLoading] = useState("");

  async function exportPNG() {
    const el = getCanvas();
    if (!el) return;
    setLoading("png");
    try {
      const dataUrl = await toPng(el, { cacheBust: true, pixelRatio: 2 });
      download(dataUrl, "code-eclipse-tree.png");
    } catch (err) {
      console.error("[ExportBar] PNG failed:", err.message);
    } finally {
      setLoading("");
    }
  }

  async function exportSVG() {
    const el = getCanvas();
    if (!el) return;
    setLoading("svg");
    try {
      const dataUrl = await toSvg(el, { cacheBust: true });
      download(dataUrl, "code-eclipse-tree.svg");
    } catch (err) {
      console.error("[ExportBar] SVG failed:", err.message);
    } finally {
      setLoading("");
    }
  }

  async function exportPDF() {
    const el = getCanvas();
    if (!el) return;
    setLoading("pdf");
    try {
      const dataUrl = await toPng(el, { cacheBust: true, pixelRatio: 2 });
      const pdf = new jsPDF({
        orientation: "landscape",
        unit:        "px",
        format:      [el.offsetWidth, el.offsetHeight],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, el.offsetWidth, el.offsetHeight);
      pdf.save("code-eclipse-tree.pdf");
    } catch (err) {
      console.error("[ExportBar] PDF failed:", err.message);
    } finally {
      setLoading("");
    }
  }

  function download(dataUrl, filename) {
    const a    = document.createElement("a");
    a.href     = dataUrl;
    a.download = filename;
    a.click();
  }

  const buttons = [
    { label: "PNG", key: "png", action: exportPNG, icon: "🖼" },
    { label: "SVG", key: "svg", action: exportSVG, icon: "✏️" },
    { label: "PDF", key: "pdf", action: exportPDF, icon: "📄" },
  ];

  return (
    <div
      className="panel"
      style={{
        position:   "absolute",
        top:        "16px",
        left:       "16px",
        zIndex:     40,
        display:    "flex",
        alignItems: "center",
        gap:        "0",
        overflow:   "hidden",
      }}
    >
      {/* Label */}
      <div
        style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      "9px",
          fontWeight:    700,
          color:         "var(--text-muted)",
          padding:       "0 10px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          borderRight:   "1px solid var(--border)",
        }}
      >
        Export
      </div>

      {buttons.map(({ label, key, action, icon }, idx) => (
        <button
          key={key}
          onClick={action}
          disabled={!!loading}
          title={`Export as ${label}`}
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      "11px",
            fontWeight:    600,
            padding:       "8px 12px",
            background:    loading === key ? "var(--accent-soft)" : "transparent",
            border:        "none",
            borderRight:   idx < buttons.length - 1 ? "1px solid var(--border)" : "none",
            cursor:        loading ? "not-allowed" : "pointer",
            color:         loading === key ? "var(--accent)" : "var(--text-secondary)",
            display:       "flex",
            alignItems:    "center",
            gap:           "5px",
            transition:    "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "var(--accent-soft)";
              e.currentTarget.style.color      = "var(--accent)";
            }
          }}
          onMouseLeave={(e) => {
            if (loading !== key) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color      = "var(--text-secondary)";
            }
          }}
        >
          {loading === key ? (
            <span className="spinner" />
          ) : (
            <span style={{ fontSize: "12px" }}>{icon}</span>
          )}
          {label}
        </button>
      ))}
    </div>
  );
}
