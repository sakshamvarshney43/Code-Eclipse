import { useState, useRef } from "react";

export default function FileUpload({ onUpload }) {
  const [dragging,  setDragging]  = useState(false);
  const [error,     setError]     = useState("");
  const [fileName,  setFileName]  = useState("");
  const inputRef = useRef(null);

  function handleFile(file) {
    setError("");
    if (!file) return;
    if (!file.name.endsWith(".java")) {
      setError("Only .java files are allowed");
      return;
    }
    setFileName(file.name);
    onUpload(file);
  }

  function onDragOver(e)  { e.preventDefault(); setDragging(true);  }
  function onDragLeave()  { setDragging(false); }
  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }
  function onClick()          { inputRef.current?.click(); }
  function onInputChange(e)   { handleFile(e.target.files[0]); }

  return (
    <div>
      <div className="section-label">Upload File</div>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onClick}
        style={{
          border:       `2px dashed ${
            dragging ? "var(--accent)" : fileName ? "var(--node-interface)" : "var(--border)"
          }`,
          borderRadius: "var(--radius)",
          padding:      "14px 16px",
          textAlign:    "center",
          cursor:       "pointer",
          background:   dragging
            ? "var(--accent-soft)"
            : fileName
            ? "color-mix(in srgb, var(--node-interface) 8%, transparent)"
            : "var(--bg-panel)",
          transition:   "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          position:     "relative",
          overflow:     "hidden",
        }}
      >
        {/* Background pulse on drag */}
        {dragging && (
          <div
            style={{
              position:     "absolute",
              inset:        0,
              background:   "var(--accent-glow)",
              animation:    "glowPulse 1s ease infinite",
              borderRadius: "12px",
              pointerEvents:"none",
            }}
          />
        )}

        <div
          style={{
            fontSize:   "24px",
            marginBottom: "6px",
            transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            transform:  dragging ? "scale(1.2) translateY(-2px)" : "scale(1)",
          }}
        >
          {dragging ? "📂" : fileName ? "✅" : "☕"}
        </div>

        {fileName ? (
          <div
            style={{
              fontFamily:  "'JetBrains Mono', monospace",
              fontSize:    "11px",
              color:       "var(--node-interface)",
              fontWeight:  600,
              display:     "flex",
              alignItems:  "center",
              justifyContent: "center",
              gap:         "5px",
            }}
          >
            {fileName}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFileName("");
              }}
              style={{
                background:   "none",
                border:       "none",
                color:        "var(--text-muted)",
                cursor:       "pointer",
                fontSize:     "11px",
                padding:      "0 2px",
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                fontFamily:  "'Outfit', sans-serif",
                fontWeight:  600,
                fontSize:    "12px",
                color:       dragging ? "var(--accent)" : "var(--text-secondary)",
                marginBottom:"2px",
                transition:  "color 0.2s",
              }}
            >
              {dragging ? "Drop it!" : "Drop a .java file"}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize:   "10px",
                color:      "var(--text-muted)",
              }}
            >
              or click to browse
            </div>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".java"
          onChange={onInputChange}
          style={{ display: "none" }}
        />
      </div>

      {error && (
        <div
          className="fade-in"
          style={{
            fontFamily:   "'JetBrains Mono', monospace",
            fontSize:     "11px",
            color:        "var(--node-orphan)",
            marginTop:    "6px",
            paddingLeft:  "4px",
            display:      "flex",
            alignItems:   "center",
            gap:          "5px",
          }}
        >
          <span>⚠</span>
          {error}
        </div>
      )}
    </div>
  );
}
