import { useState, useCallback } from "react";
import axios from "axios";

import Navbar         from "./components/Navbar.jsx";
import CodeEditor     from "./components/CodeEditor.jsx";
import TreeCanvas     from "./components/TreeCanvas.jsx";
import HoverPanel     from "./components/HoverPanel.jsx";
import Legend         from "./components/Legend.jsx";
import ExportBar      from "./components/ExportBar.jsx";
import FileUpload     from "./components/FileUpload.jsx";
import SnippetDropdown from "./components/SnippetDropdown.jsx";
import ErrorPanel     from "./components/ErrorPanel.jsx";
import ProjectHistory from "./components/ProjectHistory.jsx";

const API = "http://localhost:5000/api";

export default function App() {
  const [dark, setDark] = useState(true);

  // Editor state
  const [code,    setCode]    = useState("");
  const [loading, setLoading] = useState(false);

  // Tree data
  const [nodes,   setNodes]   = useState([]);
  const [edges,   setEdges]   = useState([]);
  const [classes, setClasses] = useState([]);
  const [errors,  setErrors]  = useState([]);

  // UI
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [showHistory,   setShowHistory]   = useState(false);
  const [parseSuccess,  setParseSuccess]  = useState(false);

  // ── Parse ──────────────────────────────────────────────────
  const handleParse = useCallback(async () => {
    if (!code.trim()) return;

    setLoading(true);
    setErrors([]);
    setSelectedClass(null);
    setParseSuccess(false);

    try {
      const { data } = await axios.post(`${API}/parse`, { code });
      setNodes(data.nodes);
      setEdges(data.edges);
      setClasses(data.classes);
      setErrors(data.errors || []);
      setParseSuccess(true);
      // Reset success indicator after 2s
      setTimeout(() => setParseSuccess(false), 2000);
    } catch (err) {
      setErrors([err.response?.data?.error || "Failed to parse the code"]);
      setNodes([]);
      setEdges([]);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  }, [code]);

  // ── File Upload ─────────────────────────────────────────────
  const handleFileUpload = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axios.post(`${API}/upload`, formData);
      setCode(data.code);
    } catch (err) {
      setErrors([err.response?.data?.error || "File upload failed"]);
    }
  }, []);

  // ── Load Project ────────────────────────────────────────────
  const handleLoadProject = useCallback((project) => {
    setCode(project.javaCode);
    setNodes(project.nodes || []);
    setEdges(project.edges || []);
    setClasses(project.classes || []);
    setErrors(project.errors || []);
    setShowHistory(false);
    setSelectedClass(null);
  }, []);

  // ── Clear ───────────────────────────────────────────────────
  const handleClear = useCallback(() => {
    setCode("");
    setNodes([]);
    setEdges([]);
    setClasses([]);
    setErrors([]);
    setSelectedClass(null);
    setSearchQuery("");
    setParseSuccess(false);
  }, []);

  // Stats summary
  const classCount     = classes.length;
  const methodCount    = classes.reduce((acc, c) => acc + (c.methodCount || 0), 0);
  const interfaceCount = classes.filter((c) => c.type === "interface").length;
  const orphanCount    = classes.filter((c) => c.isOrphan).length;

  return (
    <div
      className={dark ? "dark" : ""}
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* ── Navbar ── */}
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark(!dark)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onToggleHistory={() => setShowHistory(!showHistory)}
        classCount={classCount}
      />

      {/* ── Main Layout ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── Left Sidebar ── */}
        <div
          style={{
            width:         "360px",
            display:       "flex",
            flexDirection: "column",
            gap:           "10px",
            padding:       "12px",
            background:    "var(--bg-secondary)",
            borderRight:   "1px solid var(--border)",
            overflowY:     "auto",
            flexShrink:    0,
          }}
        >
          {/* Snippet selector */}
          <SnippetDropdown onSelect={setCode} />

          {/* File upload */}
          <FileUpload onUpload={handleFileUpload} />

          {/* Code editor */}
          <CodeEditor code={code} onChange={setCode} dark={dark} />

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className={`btn btn-accent`}
              style={{
                flex:     1,
                gap:      "6px",
                position: "relative",
                overflow: "hidden",
              }}
              onClick={handleParse}
              disabled={loading || !code.trim()}
            >
              {/* Success flash overlay */}
              {parseSuccess && (
                <div
                  className="fade-in"
                  style={{
                    position:   "absolute",
                    inset:      0,
                    background: "var(--node-interface)",
                    borderRadius: "inherit",
                    display:    "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap:        "6px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize:   "13px",
                    color:      "#fff",
                  }}
                >
                  ✓ Parsed!
                </div>
              )}
              {loading ? (
                <>
                  <span className="spinner" />
                  Parsing…
                </>
              ) : (
                <>
                  <span>⚡</span>
                  Parse
                </>
              )}
            </button>

            <button
              className="btn"
              onClick={handleClear}
              title="Clear everything"
              style={{ padding: "8px 14px", gap: "5px" }}
            >
              <span>✕</span>
              Clear
            </button>
          </div>

          {/* Stats bar — only when parsed */}
          {classCount > 0 && (
            <div
              className="fade-in"
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "6px",
              }}
            >
              {[
                { label: "Classes",    value: classCount,     color: "var(--node-class)",     icon: "◼" },
                { label: "Methods",    value: methodCount,    color: "var(--node-interface)",  icon: "ƒ" },
                { label: "Interfaces", value: interfaceCount, color: "var(--node-abstract)",   icon: "◇" },
                { label: "Orphans",    value: orphanCount,    color: "var(--node-orphan)",     icon: "⚠" },
              ].map(({ label, value, color, icon }) => (
                <div
                  key={label}
                  style={{
                    background:   "var(--bg-panel)",
                    border:       "1px solid var(--border)",
                    borderRadius: "10px",
                    padding:      "8px 10px",
                    display:      "flex",
                    alignItems:   "center",
                    gap:          "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize:  "14px",
                      color,
                      flexShrink:0,
                    }}
                  >
                    {icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily:   "'Outfit', sans-serif",
                        fontWeight:   800,
                        fontSize:     "18px",
                        color,
                        lineHeight:   1,
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontFamily:    "'JetBrains Mono', monospace",
                        fontSize:      "8px",
                        color:         "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginTop:     "1px",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error panel */}
          <ErrorPanel errors={errors} />
        </div>

        {/* ── Canvas ── */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <TreeCanvas
            nodes={nodes}
            edges={edges}
            searchQuery={searchQuery}
            onNodeClick={(cls) => setSelectedClass(cls)}
          />

          {/* Overlays */}
          <Legend />
          {nodes.length > 0 && <ExportBar />}

          {/* Class detail panel */}
          {selectedClass && (
            <HoverPanel
              cls={selectedClass}
              onClose={() => setSelectedClass(null)}
            />
          )}
        </div>
      </div>

      {/* ── Project History Sidebar ── */}
      {showHistory && (
        <ProjectHistory
          code={code}
          nodes={nodes}
          edges={edges}
          classes={classes}
          errors={errors}
          onLoad={handleLoadProject}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
