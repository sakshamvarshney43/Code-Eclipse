import { useState } from "react";
import { snippets } from "../samples/snippets.js";

export default function SnippetDropdown({ onSelect }) {
  const [focused, setFocused] = useState(false);

  function handleChange(e) {
    const index = e.target.value;
    if (index === "") return;
    onSelect(snippets[index].code);
    e.target.value = "";
  }

  return (
    <div>
      <div className="section-label">Load Example</div>
      <div style={{ position: "relative" }}>
        {/* Left icon */}
        <span
          style={{
            position:      "absolute",
            left:          "10px",
            top:           "50%",
            transform:     "translateY(-50%)",
            fontSize:      "12px",
            pointerEvents: "none",
            zIndex:        1,
          }}
        >
          📂
        </span>

        <select
          defaultValue=""
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width:           "100%",
            padding:         "9px 32px 9px 32px",
            background:      "var(--bg-panel)",
            border:          `1px solid ${focused ? "var(--accent)" : "var(--border)"}`,
            borderRadius:    "var(--radius-sm)",
            color:           "var(--text-primary)",
            fontFamily:      "'JetBrains Mono', monospace",
            fontSize:        "11px",
            cursor:          "pointer",
            outline:         "none",
            appearance:      "none",
            WebkitAppearance:"none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236366f1' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat:"no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight:    "32px",
            transition:      "all 0.2s ease",
            boxShadow:       focused ? "0 0 0 3px var(--accent-glow)" : "none",
          }}
        >
          <option value="" disabled style={{ color: "var(--text-muted)" }}>
            Choose an example...
          </option>
          {snippets.map((snippet, index) => (
            <option
              key={index}
              value={index}
              style={{ background: "var(--bg-panel)", color: "var(--text-primary)" }}
            >
              {snippet.label} — {snippet.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
