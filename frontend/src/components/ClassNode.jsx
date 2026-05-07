import { memo } from "react";
import { Handle, Position } from "reactflow";

const TYPE_COLORS = {
  class:     "var(--node-class)",
  interface: "var(--node-interface)",
  abstract:  "var(--node-abstract)",
};

const TYPE_ICONS = {
  class:     "C",
  interface: "I",
  abstract:  "A",
};

const ACCESS_COLORS = {
  public:    "var(--access-public)",
  private:   "var(--access-private)",
  protected: "var(--access-protected)",
  package:   "var(--access-package)",
};

const ACCESS_ICONS = {
  public:    "+",
  private:   "−",
  protected: "#",
  package:   "~",
};

function ClassNode({ data, selected }) {
  const {
    name,
    type          = "class",
    accessModifier = "public",
    modifiers     = [],
    methodCount   = 0,
    depth         = 0,
    isOrphan      = false,
    isHighlighted = false,
    fields        = [],
  } = data;

  const typeColor   = TYPE_COLORS[type]            || TYPE_COLORS.class;
  const accessColor = ACCESS_COLORS[accessModifier] || ACCESS_COLORS.public;
  const typeIcon    = TYPE_ICONS[type]              || "C";
  const accessIcon  = ACCESS_ICONS[accessModifier]  || "+";

  const isSelected = selected || isHighlighted;

  return (
    <div
      className="class-node"
      style={{
        background:    "var(--bg-glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border:        `1.5px solid ${isSelected ? typeColor : "var(--border)"}`,
        borderRadius:  "14px",
        padding:       "0",
        minWidth:      "210px",
        maxWidth:      "250px",
        boxShadow:     isSelected
          ? `0 0 0 3px ${typeColor}33, var(--shadow-node)`
          : "var(--shadow-node)",
        transition:    "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor:        "pointer",
        position:      "relative",
        overflow:      "hidden",
      }}
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background:   typeColor,
          border:       `2px solid var(--bg-secondary)`,
          width:        10,
          height:       10,
          top:          -5,
          boxShadow:    `0 0 6px ${typeColor}88`,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background:   typeColor,
          border:       `2px solid var(--bg-secondary)`,
          width:        10,
          height:       10,
          bottom:       -5,
          boxShadow:    `0 0 6px ${typeColor}88`,
        }}
      />

      {/* Top color stripe */}
      <div
        style={{
          height:        "3px",
          background:    `linear-gradient(90deg, ${typeColor}, ${typeColor}88)`,
          borderRadius:  "14px 14px 0 0",
        }}
      />

      {/* Header area */}
      <div style={{ padding: "12px 14px 10px" }}>
        {/* Type badge + orphan warning row */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            marginBottom:   "8px",
          }}
        >
          {/* Type badge */}
          <span
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      "9px",
              fontWeight:    700,
              letterSpacing: "0.1em",
              padding:       "2px 8px",
              borderRadius:  "999px",
              background:    `${typeColor}18`,
              color:         typeColor,
              border:        `1px solid ${typeColor}44`,
              textTransform: "uppercase",
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "4px",
            }}
          >
            <span
              style={{
                width:          "13px",
                height:         "13px",
                borderRadius:   "50%",
                background:     typeColor,
                color:          "#fff",
                fontSize:       "7px",
                fontWeight:     800,
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
              }}
            >
              {typeIcon}
            </span>
            {type}
          </span>

          {/* Orphan indicator */}
          {isOrphan && (
            <span
              title="Orphan class — no parent, children, or interfaces"
              style={{
                fontSize:  "12px",
                cursor:    "help",
                animation: "float 2s ease-in-out infinite",
                filter:    "drop-shadow(0 0 4px rgba(239,68,68,0.6))",
              }}
            >
              ⚠️
            </span>
          )}
        </div>

        {/* Class name */}
        <div
          style={{
            fontFamily:    "'Outfit', sans-serif",
            fontWeight:    700,
            fontSize:      "14px",
            color:         "var(--text-primary)",
            marginBottom:  "8px",
            whiteSpace:    "nowrap",
            overflow:      "hidden",
            textOverflow:  "ellipsis",
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </div>

        {/* Access modifier + modifiers */}
        <div
          style={{
            display:   "flex",
            gap:       "4px",
            flexWrap:  "wrap",
          }}
        >
          {/* Access badge */}
          <span
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      "10px",
              fontWeight:    600,
              padding:       "2px 7px",
              borderRadius:  "6px",
              background:    `${accessColor}18`,
              color:         accessColor,
              border:        `1px solid ${accessColor}44`,
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "3px",
            }}
          >
            <span style={{ fontSize: "11px", lineHeight: 1 }}>{accessIcon}</span>
            {accessModifier}
          </span>

          {/* Modifier badges */}
          {modifiers.slice(0, 2).map((mod) => (
            <span
              key={mod}
              style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:      "9px",
                fontWeight:    600,
                padding:       "2px 6px",
                borderRadius:  "6px",
                background:    "var(--bg-panel)",
                color:         "var(--text-muted)",
                border:        "1px solid var(--border)",
              }}
            >
              {mod}
            </span>
          ))}
        </div>
      </div>

      {/* Stats footer */}
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          padding:        "8px 14px",
          borderTop:      "1px solid var(--border)",
          background:     "rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "5px",
          }}
        >
          {/* Method count */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize:   "10px",
              color:      "var(--text-muted)",
              display:    "flex",
              alignItems: "center",
              gap:        "3px",
            }}
          >
            <span style={{ color: "var(--node-interface)", fontWeight: 700 }}>ƒ</span>
            {methodCount}
          </span>

          <span style={{ color: "var(--border)", fontSize: "10px" }}>·</span>

          {/* Field count */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize:   "10px",
              color:      "var(--text-muted)",
              display:    "flex",
              alignItems: "center",
              gap:        "3px",
            }}
          >
            <span style={{ color: "var(--node-abstract)", fontWeight: 700 }}>■</span>
            {fields?.length || 0}
          </span>
        </div>

        {/* Depth indicator */}
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "4px",
          }}
        >
          {Array.from({ length: Math.min(depth + 1, 5) }).map((_, i) => (
            <div
              key={i}
              style={{
                width:        "5px",
                height:       "5px",
                borderRadius: "50%",
                background:   i <= depth ? typeColor : "var(--border)",
                opacity:      i <= depth ? (1 - i * 0.15) : 0.3,
              }}
            />
          ))}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize:   "9px",
              color:      "var(--text-muted)",
              marginLeft: "2px",
            }}
          >
            D{depth}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(ClassNode);
