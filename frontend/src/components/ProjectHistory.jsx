import { useState, useEffect } from "react";
import {
  getAllProjects,
  saveProject,
  deleteProject,
} from "../api/projectApi.js";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day:   "numeric",
      hour:  "2-digit",
      minute:"2-digit",
    });
  } catch {
    return iso;
  }
}

export default function ProjectHistory({
  code,
  nodes,
  edges,
  classes,
  errors,
  onLoad,
  onClose,
}) {
  const [projects,     setProjects]     = useState([]);
  const [projectName,  setProjectName]  = useState("");
  const [saving,       setSaving]       = useState(false);
  const [loadingList,  setLoadingList]  = useState(true);
  const [error,        setError]        = useState("");
  const [deletingId,   setDeletingId]   = useState(null);
  const [nameFocused,  setNameFocused]  = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoadingList(true);
    try {
      const data = await getAllProjects();
      setProjects(data.projects || []);
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoadingList(false);
    }
  }

  async function handleSave() {
    if (!projectName.trim()) {
      setError("Please enter a project name.");
      return;
    }
    if (!code.trim()) {
      setError("No code to save.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await saveProject({ name: projectName, javaCode: code, nodes, edges, classes, errors });
      setProjectName("");
      await fetchProjects();
    } catch {
      setError("Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setError("Failed to delete project.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:   "fixed",
          inset:      0,
          background: "rgba(0,0,0,0.5)",
          zIndex:     90,
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Sidebar */}
      <div
        className="slide-in-right"
        style={{
          position:      "fixed",
          top:           0,
          right:         0,
          bottom:        0,
          width:         "360px",
          zIndex:        100,
          background:    "var(--bg-secondary)",
          borderLeft:    "1px solid var(--border)",
          display:       "flex",
          flexDirection: "column",
          boxShadow:     "-8px 0 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            height:     "2px",
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
          }}
        />

        {/* Header */}
        <div
          style={{
            padding:        "20px 20px 16px",
            borderBottom:   "1px solid var(--border)",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily:    "'Outfit', sans-serif",
                fontWeight:    800,
                fontSize:      "16px",
                color:         "var(--text-primary)",
                letterSpacing: "-0.01em",
                marginBottom:  "2px",
              }}
            >
              🗂 Project History
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize:   "10px",
                color:      "var(--text-muted)",
              }}
            >
              {projects.length} saved project{projects.length !== 1 ? "s" : ""}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background:   "var(--bg-panel)",
              border:       "1px solid var(--border)",
              borderRadius: "8px",
              width:        "32px",
              height:       "32px",
              cursor:       "pointer",
              color:        "var(--text-muted)",
              fontSize:     "14px",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
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

        {/* Save section */}
        <div
          style={{
            padding:      "16px 20px",
            borderBottom: "1px solid var(--border)",
            background:   "var(--bg-panel)",
          }}
        >
          <div
            style={{
              fontFamily:    "'JetBrains Mono', monospace",
              fontSize:      "9px",
              fontWeight:    700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         "var(--text-muted)",
              marginBottom:  "8px",
            }}
          >
            Save Current
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              style={{
                flex:         1,
                padding:      "8px 12px",
                background:   "var(--bg-secondary)",
                border:       `1px solid ${nameFocused ? "var(--accent)" : "var(--border)"}`,
                borderRadius: "8px",
                color:        "var(--text-primary)",
                fontFamily:   "'JetBrains Mono', monospace",
                fontSize:     "12px",
                outline:      "none",
                transition:   "all 0.2s ease",
                boxShadow:    nameFocused ? "0 0 0 3px var(--accent-glow)" : "none",
              }}
            />
            <button
              className="btn btn-accent"
              onClick={handleSave}
              disabled={saving || !projectName.trim()}
              style={{ padding: "8px 14px", gap: "5px" }}
            >
              {saving ? <span className="spinner" /> : "💾"}
              {saving ? "Saving…" : "Save"}
            </button>
          </div>

          {error && (
            <div
              className="fade-in"
              style={{
                fontFamily:  "'JetBrains Mono', monospace",
                fontSize:    "10px",
                color:       "var(--node-orphan)",
                marginTop:   "6px",
                display:     "flex",
                alignItems:  "center",
                gap:         "5px",
              }}
            >
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Project list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px" }}>
          {loadingList ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "8px" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="shimmer"
                  style={{ height: "72px", borderRadius: "10px" }}
                />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="empty-state" style={{ marginTop: "40px" }}>
              <div className="empty-icon">📂</div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize:   "14px",
                  color:      "var(--text-secondary)",
                }}
              >
                No saved projects
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize:   "10px",
                  color:      "var(--text-muted)",
                  textAlign:  "center",
                  lineHeight: 1.6,
                }}
              >
                Parse some Java code and save it here.
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {projects.map((project, idx) => (
                <div
                  key={project._id}
                  className="glass-card fade-in"
                  style={{
                    padding:        "12px 14px",
                    animationDelay: `${idx * 0.04}s`,
                  }}
                >
                  {/* Top row: name + actions */}
                  <div
                    style={{
                      display:        "flex",
                      alignItems:     "flex-start",
                      justifyContent: "space-between",
                      gap:            "8px",
                      marginBottom:   "8px",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily:    "'Outfit', sans-serif",
                          fontWeight:    700,
                          fontSize:      "13px",
                          color:         "var(--text-primary)",
                          whiteSpace:    "nowrap",
                          overflow:      "hidden",
                          textOverflow:  "ellipsis",
                          marginBottom:  "3px",
                        }}
                      >
                        {project.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize:   "10px",
                          color:      "var(--text-muted)",
                        }}
                      >
                        {formatDate(project.createdAt)}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                      {/* Load */}
                      <button
                        onClick={() => onLoad(project)}
                        style={{
                          padding:      "4px 10px",
                          background:   "var(--accent-soft)",
                          border:       "1px solid var(--border-glow)",
                          borderRadius: "6px",
                          cursor:       "pointer",
                          color:        "var(--accent)",
                          fontFamily:   "'Outfit', sans-serif",
                          fontSize:     "11px",
                          fontWeight:   600,
                          transition:   "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--accent)";
                          e.currentTarget.style.color      = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--accent-soft)";
                          e.currentTarget.style.color      = "var(--accent)";
                        }}
                      >
                        Load
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(project._id)}
                        disabled={deletingId === project._id}
                        style={{
                          padding:      "4px 8px",
                          background:   "transparent",
                          border:       "1px solid var(--border)",
                          borderRadius: "6px",
                          cursor:       deletingId === project._id ? "not-allowed" : "pointer",
                          color:        "var(--text-muted)",
                          fontSize:     "11px",
                          transition:   "all 0.15s ease",
                          display:      "flex",
                          alignItems:   "center",
                          justifyContent: "center",
                          width:        "28px",
                        }}
                        onMouseEnter={(e) => {
                          if (deletingId !== project._id) {
                            e.currentTarget.style.background   = "var(--node-orphan)";
                            e.currentTarget.style.color        = "#fff";
                            e.currentTarget.style.borderColor  = "var(--node-orphan)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background    = "transparent";
                          e.currentTarget.style.color         = "var(--text-muted)";
                          e.currentTarget.style.borderColor   = "var(--border)";
                        }}
                      >
                        {deletingId === project._id ? (
                          <span className="spinner" style={{ borderTopColor: "var(--node-orphan)", borderColor: "var(--border)" }} />
                        ) : (
                          "🗑"
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Meta pills */}
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {project.classes?.length > 0 && (
                      <span
                        style={{
                          fontFamily:   "'JetBrains Mono', monospace",
                          fontSize:     "9px",
                          fontWeight:   600,
                          padding:      "2px 7px",
                          borderRadius: "999px",
                          background:   "var(--accent-soft)",
                          color:        "var(--accent)",
                          border:       "1px solid var(--border-glow)",
                        }}
                      >
                        {project.classes.length} class{project.classes.length !== 1 ? "es" : ""}
                      </span>
                    )}
                    {project.errors?.length > 0 && (
                      <span
                        style={{
                          fontFamily:   "'JetBrains Mono', monospace",
                          fontSize:     "9px",
                          fontWeight:   600,
                          padding:      "2px 7px",
                          borderRadius: "999px",
                          background:   "var(--node-orphan)18",
                          color:        "var(--node-orphan)",
                          border:       "1px solid var(--node-orphan)44",
                        }}
                      >
                        ⚠ {project.errors.length} issue{project.errors.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
