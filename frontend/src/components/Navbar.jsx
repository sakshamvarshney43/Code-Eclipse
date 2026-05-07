import { useState } from "react";

export default function Navbar({
  dark,
  onToggleTheme,
  searchQuery,
  onSearch,
  onToggleHistory,
  classCount = 0,
}) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav
      style={{
        height: "58px",
        background: "var(--bg-glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        gap: "16px",
        zIndex: 100,
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Gradient accent line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 50%, var(--node-interface) 100%)",
          backgroundSize: "200% 100%",
          animation: "gradientShift 4s ease infinite",
        }}
      />

      {/* LEFT: Branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            boxShadow: "0 4px 14px var(--accent-glow)",
            flexShrink: 0,
            animation: "float 4s ease-in-out infinite",
          }}
        >
          🌑
        </div>

        {/* Name + tagline */}
        <div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Code-Eclipse
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            OOP Tree Visualizer
          </div>
        </div>

        {/* Class count pill */}
        {classCount > 0 && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "999px",
              background: "var(--accent-soft)",
              color: "var(--accent)",
              border: "1px solid var(--border-glow)",
              animation: "scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              flexShrink: 0,
            }}
          >
            {classCount} class{classCount !== 1 ? "es" : ""}
          </div>
        )}
      </div>

      {/* CENTER: Search */}
      <div
        style={{
          flex: 1,
          maxWidth: "380px",
          position: "relative",
        }}
      >
        {/* Search icon */}
        <svg
          style={{
            position: "absolute",
            left: "11px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "14px",
            height: "14px",
            fill: searchFocused ? "var(--accent)" : "var(--text-muted)",
            transition: "fill 0.2s ease",
            pointerEvents: "none",
          }}
          viewBox="0 0 24 24"
        >
          <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65zm0 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>

        <input
          type="text"
          placeholder="Search class..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width: "100%",
            padding: "8px 36px 8px 34px",
            background: "var(--bg-panel)",
            border: `1px solid ${searchFocused ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "10px",
            color: "var(--text-primary)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            outline: "none",
            transition: "all 0.2s ease",
            boxShadow: searchFocused ? "0 0 0 3px var(--accent-glow)" : "none",
          }}
        />

        {/* Clear search */}
        {searchQuery && (
          <button
            onClick={() => onSearch("")}
            style={{
              position: "absolute",
              right: "9px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "var(--bg-panel)",
              border: "none",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.15s ease",
              padding: 0,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* RIGHT: Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        {/* History */}
        <button
          className="btn"
          onClick={onToggleHistory}
          title="Project History"
          style={{ fontSize: "12px", padding: "6px 14px", gap: "6px" }}
        >
          <span>🗂</span>
          <span>History</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background: "var(--bg-panel)",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotate(20deg) scale(1.1)";
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotate(0deg) scale(1)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
