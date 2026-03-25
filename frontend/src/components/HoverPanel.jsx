import { useEffect, useRef } from "react";

const ACCESS_COLORS = {
  public: "var(--access-public)",
  private: "var(--access-private)",
  protected: "var(--access-protected)",
  package: "var(--access-package)",
};

const TYPE_COLORS = {
  class: "var(--node-class)",
  interface: "var(--node-interface)",
  abstract: "var(--node-abstract)",
};

export default function HoverPanel({ cl, onClose }) {
  const panelRef = useRef(null);

  //CLose on click
  useEffect(() => {
    function handleOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  if (!cl) return null;

  const typeColor = TYPE_COLORS[cl.type] || TYPE_COLORS.class;
  const accessColor = ACCESS_COLORS[cl.accessModifier] || ACCESS_COLORS.public;

  return (
    <div
      ref={panelRef}
      className="panel"
      style={{
        position: "absolute",
        top: "12px",
        right: "12px",
        width: "300px",
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
        padding: "16px",
        zIndex: 50,
        animation: "slideIn 0.2s ease",
      }}
    >
      {/*Header*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <div>
          {/*className*/}
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: "800",
              fontSize: "16px",
              color: "var(--text-primary)",
              marginBottom: "6px",
            }}
          >
            {cl.name}
          </div>

          {/*Type + Access Badges*/}
          <div style={{ display: "flex", gap: "5px" }}>
            <span
              className="badge"
              style={{
                background: typeColor + "22",
                color: typeColor,
                border: `1px solid ${typeColor}55`,
              }}
            >
              {cl.type}
            </span>
            <span
              className="badge"
              style={{
                background: accessColor + "22",
                color: accessColor,
                border: `1px solid ${accessColor}55`,
              }}
            >
              {cl.accessModifier}
            </span>
            {cl.isOrphan && (
              <span
                className="badge"
                style={{
                  background: "var(--node-orphan)22",
                  color: "var(--node-orphan)",
                  border: "1px solid var(--node-orphan)55",
                }}
              >
                orphan
              </span>
            )}
          </div>
        </div>

        {/*Close Button*/}
        <button
          onClick={onClose}
          style={{
            background: "var(--bg-panel)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "4px 8px",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: "12px",
          }}
        >
          ✕
        </button>
      </div>

      {/* Inheritance*/}
      {(cl.parent || (cl.interfaces && cl.interfaces.length > 0)) && (
        <div
          style={{
            background: "var(--bg-panel)",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "12px",
            fontSize: "12px",
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          {cl.parent && (
            <div
              style={{ color: "var(--text-secondary)", marginBottom: "4px" }}
            >
              <span style={{ color: "var(--text-muted)" }}> extends </span>
              <span style={{ color: "var(--node-class)" }}>{cl.parent}</span>
            </div>
          )}
          {cl.interfaces?.map((iface) => (
            <div key={iface} style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--text-muted)" }}>implements </span>
              <span style={{ color: "var(--node-interface)" }}>{iface}</span>
            </div>
          ))}
        </div>
      )}

      {/*Stats*/}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <div style={statBox}>
          <span style={statLabel}>Depth</span>
          <span style={statValue}>{cl.depth}</span>
        </div>
        <div style={statBox}>
          <span style={statLabel}>Methods</span>
          <span style={statValue}>{cl.methods?.length || 0}</span>
        </div>
        <div style={statBox}>
          <span style={statLabel}>Fields</span>
          <span style={statValue}>{cl.fields?.length || 0}</span>
        </div>
      </div>

      {/*Fields*/}
      {cl.fields?.length > 0 && (
        <Section title="Fields">
          {cl.fields.map((field, i) => (
            <MemberRow
              key={i}
              name={field.name}
              type={field.type}
              access={field.access}
              flags={[
                field.isStatic && "static",
                field.isFinal && "final",
              ].filter(Boolean)}
            />
          ))}
        </Section>
      )}
      {/*Methods*/}
      {cl.methods?.length > 0 && (
        <Section title="Methods">
          {cl.methods.map((method, i) => (
            <MemberRow
              key={i}
              name={method.name}
              type={method.returnType}
              access={method.access}
              flags={[
                method.isStatic && "static",
                method.isAbstract && "abstract",
              ].filter(Boolean)}
            />
          ))}
        </Section>
      )}
      {/*Slide in Animation*/}
      <style>
        {`
   @keyframes slideIn{
   from { opacity: 0; transform: translateX(20px); }
   to   { opacity: 1; transform: translateX(0); }
   }
`}
      </style>
    </div>
  );
}
//Sub Components
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 700,
          fontSize: "11px",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "6px",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {children}
      </div>
    </div>
  );
}

function MemberRow({ name, type, access, flags }) {
  const accessColor = ACCESS_COLORS[access] || ACCESS_COLORS.public;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "var(--bg-panel)",
        borderRadius: "6px",
        padding: "5px 8px",
        fontSize: "11px",
        fontFamily: "'JetBrains Mono',monospace",
      }}
    >
      {/*Access Dot*/}
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: accessColor,
          flexShrink: 0,
        }}
      />

      {/*Name*/}
      <span style={{ color: "var(--text-primary)", flex: 1 }}>{name}</span>

      {/*Type*/}
      <span style={{ color: "var(--text-muted)" }}>{type}</span>

      {/*Flag*/}
      {flags.map((flag) => (
        <span
          key={flag}
          className="badge"
          style={{
            background: "var(--bg-secondary)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
            fontSize: "9px",
          }}
        >
          {flag}
        </span>
      ))}
    </div>
  );
}

//Stat Box Style
const statBox = {
  flex: 1,
  background: "var(--bg-panel)",
  borderRadius: "8px",
  padding: "8px",
  textAlign: "center",
};

const statLabel = {
  display: "block",
  fontSize: "10px",
  color: "var(--text-muted)",
  fontFamily: "'JetBrains Mono',monospace",
  marginBottom: "2px",
};

const statValue = {
  display: "block",
  fontSize: "18px",
  fontWeight: 700,
  color: "var(--text-primary)",
  fontFamily: "'Syne',sans-serif",
};
