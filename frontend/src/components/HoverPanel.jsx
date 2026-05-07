import { useEffect, useRef } from "react";

const ACCESS_COLORS = {
  public:    "var(--access-public)",
  private:   "var(--access-private)",
  protected: "var(--access-protected)",
  package:   "var(--access-package)",
};

const TYPE_COLORS = {
  class:     "var(--node-class)",
  interface: "var(--node-interface)",
  abstract:  "var(--node-abstract)",
};

const ACCESS_ICONS = {
  public:    "+",
  private:   "−",
  protected: "#",
  package:   "~",
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      "9px",
          fontWeight:    700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          marginBottom:  "6px",
          display:       "flex",
          alignItems:    "center",
          gap:           "6px",
        }}
      >
        {title}
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>
      {children}
    </div>
  );
}

function MemberRow({ icon, iconColor, name, detail, tag }) {
  return (
    <div
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "5px 8px",
        borderRadius:   "7px",
        background:     "var(--bg-panel)",
        marginBottom:   "3px",
        gap:            "6px",
        transition:     "background 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-soft)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-panel)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
        <span
          style={{
            fontFamily:   "'JetBrains Mono', monospace",
            fontSize:     "11px",
            fontWeight:   700,
            color:        iconColor,
            flexShrink:   0,
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontFamily:  "'JetBrains Mono', monospace",
            fontSize:    "11px",
            color:       "var(--text-primary)",
            whiteSpace:  "nowrap",
            overflow:    "hidden",
            textOverflow:"ellipsis",
          }}
        >
          {name}
        </span>
      </div>
      <div style={{ display: "flex", gap: "4px", alignItems: "center", flexShrink: 0 }}>
        {detail && (
          <span
            style={{
              fontFamily:   "'JetBrains Mono', monospace",
              fontSize:     "10px",
              color:        "var(--text-muted)",
            }}
          >
            {detail}
          </span>
        )}
        {tag && (
          <span
            style={{
              fontFamily:   "'JetBrains Mono', monospace",
              fontSize:     "9px",
              fontWeight:   600,
              padding:      "1px 5px",
              borderRadius: "4px",
              background:   "var(--border)",
              color:        "var(--text-muted)",
            }}
          >
            {tag}
          </span>
        )}
      </div>
    </div>
  );
}

export default function HoverPanel({ cls: cl, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  // Escape key to close
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!cl) return null;

  const typeColor   = TYPE_COLORS[cl.type]              || TYPE_COLORS.class;
  const accessColor = ACCESS_COLORS[cl.accessModifier]   || ACCESS_COLORS.public;

  return (
    <div
      ref={panelRef}
      className="panel scale-in"
      style={{
        position:    "absolute",
        top:         "16px",
        right:       "16px",
        width:       "300px",
        maxHeight:   "calc(100vh - 130px)",
        overflowY:   "auto",
        zIndex:      50,
        display:     "flex",
        flexDirection: "column",
        gap:         "0",
      }}
    >
      {/* Header strip */}
      <div
        style={{
          height:       "3px",
          background:   `linear-gradient(90deg, ${typeColor}, ${typeColor}55)`,
          borderRadius: "14px 14px 0 0",
          flexShrink:   0,
        }}
      />

      <div style={{ padding: "16px" }}>
        {/* Title row */}
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-start",
            marginBottom:   "14px",
          }}
        >
          <div style={{ flex: 1, minWidth: 0, marginRight: "10px" }}>
            {/* Class name */}
            <div
              style={{
                fontFamily:    "'Outfit', sans-serif",
                fontWeight:    800,
                fontSize:      "17px",
                color:         "var(--text-primary)",
                marginBottom:  "7px",
                letterSpacing: "-0.01em",
                whiteSpace:    "nowrap",
                overflow:      "hidden",
                textOverflow:  "ellipsis",
              }}
            >
              {cl.name}
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:      "9px",
                  fontWeight:    700,
                  padding:       "2px 8px",
                  borderRadius:  "999px",
                  background:    `${typeColor}18`,
                  color:         typeColor,
                  border:        `1px solid ${typeColor}44`,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {cl.type}
              </span>
              <span
                style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:      "9px",
                  fontWeight:    700,
                  padding:       "2px 8px",
                  borderRadius:  "999px",
                  background:    `${accessColor}18`,
                  color:         accessColor,
                  border:        `1px solid ${accessColor}44`,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {ACCESS_ICONS[cl.accessModifier] || "+"} {cl.accessModifier}
              </span>
              {cl.isOrphan && (
                <span
                  style={{
                    fontFamily:    "'JetBrains Mono', monospace",
                    fontSize:      "9px",
                    fontWeight:    700,
                    padding:       "2px 8px",
                    borderRadius:  "999px",
                    background:    "var(--node-orphan)18",
                    color:         "var(--node-orphan)",
                    border:        "1px solid var(--node-orphan)44",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  ⚠ orphan
                </span>
              )}
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              background:   "var(--bg-panel)",
              border:       "1px solid var(--border)",
              borderRadius: "8px",
              width:        "28px",
              height:       "28px",
              cursor:       "pointer",
              color:        "var(--text-muted)",
              fontSize:     "12px",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              flexShrink:   0,
              transition:   "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background    = "var(--node-orphan)";
              e.currentTarget.style.color         = "#fff";
              e.currentTarget.style.borderColor   = "var(--node-orphan)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background    = "var(--bg-panel)";
              e.currentTarget.style.color         = "var(--text-muted)";
              e.currentTarget.style.borderColor   = "var(--border)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display:       "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap:           "6px",
            marginBottom:  "16px",
          }}
        >
          {[
            { label: "Methods", value: cl.methodCount || 0, color: "var(--node-interface)" },
            { label: "Fields",  value: cl.fields?.length || 0, color: "var(--node-abstract)" },
            { label: "Depth",   value: cl.depth || 0, color: "var(--node-class)" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                background:   "var(--bg-panel)",
                border:       "1px solid var(--border)",
                borderRadius: "8px",
                padding:      "8px 10px",
                textAlign:    "center",
              }}
            >
              <div
                style={{
                  fontFamily:   "'Outfit', sans-serif",
                  fontWeight:   800,
                  fontSize:     "20px",
                  color,
                  lineHeight:   1,
                  marginBottom: "3px",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:      "9px",
                  color:         "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Inheritance */}
        {(cl.parent || (cl.interfaces && cl.interfaces.length > 0)) && (
          <Section title="Hierarchy">
            {cl.parent && (
              <div
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "6px",
                  padding:      "6px 10px",
                  borderRadius: "7px",
                  background:   "var(--bg-panel)",
                  marginBottom: "4px",
                  fontFamily:   "'JetBrains Mono', monospace",
                  fontSize:     "11px",
                }}
              >
                <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>
                  extends
                </span>
                <span style={{ color: "var(--node-class)", fontWeight: 600 }}>
                  {cl.parent}
                </span>
              </div>
            )}
            {cl.interfaces?.map((iface) => (
              <div
                key={iface}
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "6px",
                  padding:      "6px 10px",
                  borderRadius: "7px",
                  background:   "var(--bg-panel)",
                  marginBottom: "4px",
                  fontFamily:   "'JetBrains Mono', monospace",
                  fontSize:     "11px",
                }}
              >
                <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>
                  implements
                </span>
                <span style={{ color: "var(--node-interface)", fontWeight: 600 }}>
                  {iface}
                </span>
              </div>
            ))}
          </Section>
        )}

        {/* Methods */}
        {cl.methods && cl.methods.length > 0 && (
          <Section title={`Methods (${cl.methods.length})`}>
            {cl.methods.slice(0, 8).map((m, i) => (
              <MemberRow
                key={i}
                icon={ACCESS_ICONS[m.access] || "+"}
                iconColor={ACCESS_COLORS[m.access] || ACCESS_COLORS.public}
                name={m.name}
                detail={`→ ${m.returnType}`}
                tag={
                  m.isStatic
                    ? "static"
                    : m.isAbstract
                    ? "abstract"
                    : undefined
                }
              />
            ))}
            {cl.methods.length > 8 && (
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize:   "10px",
                  color:      "var(--text-muted)",
                  textAlign:  "center",
                  padding:    "4px",
                }}
              >
                +{cl.methods.length - 8} more…
              </div>
            )}
          </Section>
        )}

        {/* Fields */}
        {cl.fields && cl.fields.length > 0 && (
          <Section title={`Fields (${cl.fields.length})`}>
            {cl.fields.slice(0, 6).map((f, i) => (
              <MemberRow
                key={i}
                icon="■"
                iconColor={ACCESS_COLORS[f.access] || ACCESS_COLORS.public}
                name={f.name}
                detail={f.type}
                tag={f.isStatic ? "static" : undefined}
              />
            ))}
            {cl.fields.length > 6 && (
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize:   "10px",
                  color:      "var(--text-muted)",
                  textAlign:  "center",
                  padding:    "4px",
                }}
              >
                +{cl.fields.length - 6} more…
              </div>
            )}
          </Section>
        )}

        {/* Modifiers */}
        {cl.modifiers && cl.modifiers.length > 0 && (
          <Section title="Modifiers">
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {cl.modifiers.map((mod) => (
                <span
                  key={mod}
                  style={{
                    fontFamily:   "'JetBrains Mono', monospace",
                    fontSize:     "10px",
                    fontWeight:   600,
                    padding:      "3px 9px",
                    borderRadius: "6px",
                    background:   "var(--bg-panel)",
                    color:        "var(--text-secondary)",
                    border:       "1px solid var(--border)",
                  }}
                >
                  {mod}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Orphan warning */}
        {cl.isOrphan && (
          <div
            style={{
              padding:      "10px 12px",
              borderRadius: "8px",
              background:   "var(--node-orphan)11",
              border:       "1px solid var(--node-orphan)44",
              display:      "flex",
              gap:          "8px",
              alignItems:   "flex-start",
            }}
          >
            <span style={{ fontSize: "14px", flexShrink: 0 }}>⚠️</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize:   "11px",
                color:      "var(--node-orphan)",
                lineHeight: 1.5,
              }}
            >
              Orphan class — not connected to any parent, child, or interface.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
