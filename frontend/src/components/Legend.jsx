import { useState } from "react";

const NODE_TYPES = [
  { label: "Class",     color: "var(--node-class)",     shape: "square" },
  { label: "Interface", color: "var(--node-interface)", shape: "square" },
  { label: "Abstract",  color: "var(--node-abstract)",  shape: "square" },
  { label: "Orphan",    color: "var(--node-orphan)",    shape: "square" },
];

const ACCESS_TYPES = [
  { label: "public",    icon: "+", color: "var(--access-public)"    },
  { label: "private",   icon: "−", color: "var(--access-private)"   },
  { label: "protected", icon: "#", color: "var(--access-protected)" },
  { label: "package",   icon: "~", color: "var(--access-package)"   },
];

export default function Legend() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="panel"
      style={{
        position:   "absolute",
        bottom:     "24px",
        left:       "16px",
        zIndex:     40,
        minWidth:   collapsed ? "auto" : "170px",
        transition: "all 0.25s ease",
      }}
    >
      {/* Header */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          display:      "flex",
          alignItems:   "center",
          justifyContent: "space-between",
          gap:          "10px",
          padding:      collapsed ? "8px 12px" : "10px 14px",
          cursor:       "pointer",
          userSelect:   "none",
          borderBottom: collapsed ? "none" : "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontWeight:    700,
            fontSize:      "9px",
            color:         "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Legend
        </span>
        <span
          style={{
            fontSize:   "8px",
            color:      "var(--text-muted)",
            transform:  collapsed ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            display:    "inline-block",
          }}
        >
          ▲
        </span>
      </div>

      {!collapsed && (
        <div style={{ padding: "10px 14px 12px" }}>
          {/* Node Types */}
          <GroupLabel label="Node Type" />
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "8px" }}>
            {NODE_TYPES.map(({ label, color }) => (
              <div
                key={label}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "7px",
                }}
              >
                <div
                  style={{
                    width:        "10px",
                    height:       "10px",
                    borderRadius: "3px",
                    background:   color,
                    flexShrink:   0,
                    boxShadow:    `0 0 6px ${color}66`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize:   "10px",
                    color:      "var(--text-secondary)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />

          {/* Access */}
          <GroupLabel label="Access" />
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "8px" }}>
            {ACCESS_TYPES.map(({ label, icon, color }) => (
              <div
                key={label}
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        "7px",
                }}
              >
                <span
                  style={{
                    fontFamily:   "'JetBrains Mono', monospace",
                    fontSize:     "11px",
                    fontWeight:   700,
                    color,
                    width:        "10px",
                    textAlign:    "center",
                    flexShrink:   0,
                  }}
                >
                  {icon}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize:   "10px",
                    color:      "var(--text-secondary)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />

          {/* Edges */}
          <GroupLabel label="Edges" />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <EdgeRow label="extends"    color="var(--accent)"          dashed={false} />
            <EdgeRow label="implements" color="var(--node-interface)" dashed={true}  />
          </div>
        </div>
      )}
    </div>
  );
}

function GroupLabel({ label }) {
  return (
    <div
      style={{
        fontFamily:    "'JetBrains Mono', monospace",
        fontSize:      "8px",
        color:         "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        marginBottom:  "5px",
        fontWeight:    700,
      }}
    >
      {label}
    </div>
  );
}

function EdgeRow({ label, color, dashed }) {
  return (
    <div
      style={{
        display:    "flex",
        alignItems: "center",
        gap:        "8px",
      }}
    >
      <div
        style={{
          width:       "24px",
          height:      "2px",
          borderTop:   `2px ${dashed ? "dashed" : "solid"} ${color}`,
          flexShrink:  0,
          position:    "relative",
        }}
      />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize:   "10px",
          color:      "var(--text-secondary)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
