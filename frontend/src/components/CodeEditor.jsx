import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, onChange, dark }) {
  function handleMount(editor) {
    editor.focus();
    setTimeout(() => {
      editor.getAction("editor.action.formatDocument")?.run();
    }, 300);
  }

  return (
    <div>
      <div className="section-label">Java Code</div>
      <div
        style={{
          borderRadius: "var(--radius)",
          overflow:     "hidden",
          border:       "1px solid var(--border)",
          transition:   "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.boxShadow   = "0 0 0 3px var(--accent-glow)";
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow   = "none";
        }}
      >
        <Editor
          height="320px"
          language="java"
          value={code}
          onChange={(val) => onChange(val || "")}
          onMount={handleMount}
          theme="vs-dark"
          options={{
            fontSize:            13,
            fontFamily:          "'JetBrains Mono', monospace",
            fontLigatures:       true,
            minimap:             { enabled: false },
            scrollBeyondLastLine:false,
            lineNumbers:         "on",
            roundedSelection:    true,
            automaticLayout:     true,
            tabSize:             4,
            wordWrap:            "on",
            bracketPairColorization: { enabled: true },
            padding:             { top: 12, bottom: 12 },
            scrollbar: {
              verticalScrollbarSize:   5,
              horizontalScrollbarSize: 5,
            },
            overviewRulerBorder: false,
            renderLineHighlight: "gutter",
            cursorBlinking:      "smooth",
            smoothScrolling:     true,
            contextmenu:         false,
          }}
        />
      </div>
    </div>
  );
}
