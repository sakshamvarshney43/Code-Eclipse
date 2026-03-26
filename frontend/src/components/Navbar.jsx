export default function Navbar({
  dark,
  onToggleTheme,
  searchQuery,
  onSearch,
  onToggleHistory,
}) {
  return (
    <nav
      style={{
        height: "56px",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        gap: "12px",
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      {/* LEFT : Branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          🌑
        </div>

        {/* Name */}
        <div>
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "15px",
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            Code-Eclipse
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "10px",
              color: "var(--text-muted)",
              lineHeight: 1.4,
            }}
          >
            OOP Tree Visualizer
          </div>
        </div>
      </div>

      {/* CENTER : Search */}
      <div
        style={{
          flex: 1,
          maxWidth: "360px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "13px",
            color: "var(--text-muted)",
            pointerEvents: "none",
          }}
        >
          🔍
        </span>

        <input
          type="text"
          placeholder="Search class..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "7px 12px 7px 32px",
            background: "var(--bg-panel)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            color: "var(--text-primary)",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: "12px",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />

        {/* Clear Search */}
        {searchQuery && (
          <button
            onClick={() => onSearch("")}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "12px",
              padding: "2px 4px",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* RIGHT : Actions */}
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
          style={{ fontSize: "12px", padding: "6px 12px" }}
        >
          🗂 History
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--bg-panel)",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
