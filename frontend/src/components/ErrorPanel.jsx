import { useState } from "react";

export default function ErrorPanel({ errors }) {
  const [collapsed, setCollapsed] = useState(false);

  if (!errors || errors.length === 0) return null;

  return (
    <div
      className="fade-in"
      style={{
        borderRadius: "var(--radius)",
        border:       "1px solid var(--node-orphan)55",
        background:   "color-mix(in srgb, var(--node-orphan) 7%, var(--bg-secondary))",
        overflow:     "hidden",
      }}
    >
      {/* Header */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          display:      "flex",
          alignItems:   "center",
          justifyContent: "space-between",
          padding:      "10px 12px",
          cursor:       "pointer",
          userSelect:   "none",
          borderBottom: collapsed ? "none" : "1px solid var(--node-orphan)33",
          transition:   "background 0.15s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--node-orphan)11")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
      >
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "7px",
          }}
        >
          <span style={{ fontSize: "14px" }}>⚠️</span>
          <span
            style={{
              fontFamily:    "'Outfit', sans-serif",
              fontWeight:    700,
              fontSize:      "12px",
              color:         "var(--node-orphan)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {errors.length} Issue{errors.length !== 1 ? "s" : ""} Found
          </span>
        </div>

        <span
          style={{
            fontSize:    "10px",
            color:       "var(--node-orphan)",
            transform:   collapsed ? "rotate(0deg)" : "rotate(180deg)",
            transition:  "transform 0.2s ease",
            display:     "inline-block",
          }}
        >
          ▲
        </span>
      </div>

      {/* Error list */}
      {!collapsed && (
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "4px",
            padding:       "10px 12px",
          }}
        >
          {errors.map((error, i) => (
            <div
              key={i}
              className="fade-in"
              style={{
                display:      "flex",
                gap:          "8px",
                alignItems:   "flex-start",
                background:   "var(--bg-secondary)",
                border:       "1px solid var(--node-orphan)33",
                borderRadius: "8px",
                padding:      "7px 10px",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {/* Index */}
              <span
                style={{
                  fontFamily:  "'JetBrains Mono', monospace",
                  fontSize:    "10px",
                  color:       "var(--node-orphan)",
                  fontWeight:  700,
                  flexShrink:  0,
                  marginTop:   "1px",
                  minWidth:    "18px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Message */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize:   "10px",
                  color:      "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {error}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
