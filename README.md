# 🌑 Code-Eclipse — OOP Tree Visualizer

A Java OOP class hierarchy visualizer. Paste or upload Java code, hit **Parse**, and get an interactive graph of your class relationships.

---

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
# Edit .env — set MONGO_URI to your MongoDB connection string
npm start        # or: node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev      # Vite dev server at http://localhost:5173
```

> **Requires**: Node 18+, MongoDB running locally or Atlas connection string.

---

## 🗂 Project Structure

```
Code-Eclipse/
├── backend/
│   ├── server.js               # Express app + MongoDB connection
│   ├── .env                    # PORT, MONGO_URI
│   ├── models/
│   │   └── projects.js         # Mongoose schema
│   ├── routes/
│   │   ├── parse.js            # POST /api/parse
│   │   ├── upload.js           # POST /api/upload
│   │   └── projects.js         # CRUD /api/projects
│   └── parser/
│       ├── classExtractor.js   # Regex-based class/interface/abstract parser
│       ├── memberParser.js     # Methods & fields extractor
│       ├── accessParser.js     # Access modifier (public/private/etc)
│       ├── modifierParser.js   # abstract/static/final/etc
│       ├── inheritanceParser.js# extends/implements resolution
│       ├── depthCalculator.js  # Inheritance depth (recursive)
│       ├── orphanDetector.js   # Detects isolated classes
│       ├── errorCollector.js   # Missing parents, empty classes, circular inheritance
│       └── methodCounter.js    # Method count helper
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx             # Root layout, state management
        ├── index.css           # All CSS tokens, animations, utilities
        ├── main.jsx
        ├── api/
        │   └── projectApi.js   # Axios calls to backend
        ├── samples/
        │   └── snippets.js     # Built-in Java examples
        ├── utils/
        │   └── exportGraph.js
        └── components/
            ├── Navbar.jsx          # Top bar: branding, search, theme toggle
            ├── CodeEditor.jsx      # Monaco editor (Java)
            ├── FileUpload.jsx      # Drag-and-drop .java upload
            ├── SnippetDropdown.jsx # Built-in code examples
            ├── TreeCanvas.jsx      # ReactFlow canvas + Dagre layout
            ├── ClassNode.jsx       # Custom node: type, access, stats
            ├── HoverPanel.jsx      # Click-to-inspect class detail panel
            ├── Legend.jsx          # Collapsible legend overlay
            ├── ExportBar.jsx       # Export PNG / SVG / PDF
            ├── ErrorPanel.jsx      # Collapsible parse error list
            └── ProjectHistory.jsx  # Save/load/delete projects sidebar
```

---

## ✨ What Was Improved (UI Overhaul)

### Design System
- **New font stack**: `Outfit` (display/UI) + `JetBrains Mono` (code/mono)
- **Full CSS variable system** — light & dark theme, glow colors, glass colors
- **Glassmorphism** — `backdrop-filter: blur()` panels throughout
- **Gradient accent bar** at top of Navbar, animating via `gradientShift`

### Animations
- `nodeAppear` — nodes animate in with scale+translate on parse
- `slideInRight` — ProjectHistory sidebar slides in from right
- `fadeInUp` — panels and error items stagger-fade in
- `scaleIn` — HoverPanel pops in with spring-like scale
- `float` — logo and empty-state icon gently bob
- `spin` — loading spinners on all async actions
- `glowPulse` — drag-over highlight on FileUpload
- `shimmer` — skeleton loading in ProjectHistory

### Component Improvements

| Component | What Changed |
|-----------|-------------|
| `ClassNode` | Glassmorphism card, colored top stripe, access icon symbols (+/−/#/~), depth dot indicator, field count, method count |
| `Navbar` | Gradient logo text, animated gradient top line, class count pill, smooth icon hover |
| `HoverPanel` | Stats grid (methods/fields/depth), member rows with hover, section dividers, Escape key to close |
| `TreeCanvas` | Empty state canvas with dot grid, better edge colors (extends vs implements differentiated), smoothstep routing |
| `FileUpload` | Animated drag state, success icon, clear button |
| `ErrorPanel` | Collapsible with animated chevron, staggered error entries |
| `Legend` | Collapsible, access icons (+/−/#/~), edge line previews |
| `ExportBar` | Repositioned to top-left, inline loading spinners per button |
| `ProjectHistory` | Skeleton loaders, staggered list animation, delete confirmation UX, date formatting |
| `App` | Stats grid (classes/methods/interfaces/orphans), parse success flash overlay, ExportBar only shown when diagram exists |

### Bug Fixes
- `ErrorPanel` was never collapsible — now has toggle
- `HoverPanel` had no Escape key handler — fixed
- `TreeCanvas` showed blank white on empty — now renders styled empty state
- `ExportBar` was always visible (even with no diagram) — now conditional
- `ProjectHistory` had no loading skeleton — fixed
- `ClassNode` orphan indicator was plain text "Orphan Detected!!!" — replaced with ⚠️ icon + tooltip
- Parse button had no disabled state when code is empty — fixed
- `handleClear` didn't reset `parseSuccess` — fixed

---

## 🔧 API Reference

### `POST /api/parse`
```json
Body: { "code": "public class Foo { ... }" }
Response: { nodes, edges, classes, errors }
```

### `POST /api/upload`
```
multipart/form-data, field: "file" (.java only, max 5MB)
Response: { code, filename, size }
```

### `GET /api/projects` — list all saved projects
### `GET /api/projects/:id` — single project
### `POST /api/projects` — save project
### `DELETE /api/projects/:id` — delete project

---

## 📦 Key Dependencies

**Frontend**: React 18, Vite, ReactFlow, dagre, Monaco Editor, html-to-image, jsPDF, axios, Tailwind CSS

**Backend**: Express, Mongoose, multer, cors, dotenv
