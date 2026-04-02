<div align="center">

<br/>

```
 ██████╗ ██████╗ ██████╗ ███████╗       ███████╗ ██████╗██╗     ██╗██████╗ ███████╗███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝       ██╔════╝██╔════╝██║     ██║██╔══██╗██╔════╝██╔════╝
██║     ██║   ██║██║  ██║█████╗  ██████╗█████╗  ██║     ██║     ██║██████╔╝███████╗█████╗  
██║     ██║   ██║██║  ██║██╔══╝  ╚═════╝██╔══╝  ██║     ██║     ██║██╔═══╝ ╚════██║██╔══╝  
╚██████╗╚██████╔╝██████╔╝███████╗       ███████╗╚██████╗███████╗██║██║     ███████║███████╗
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝       ╚══════╝ ╚═════╝╚══════╝╚═╝╚═╝     ╚══════╝╚══════╝
```

### 🌑 OOP Tree Visualizer

*Transform Java source code into beautiful, interactive inheritance diagrams — instantly.*

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

<br/>

> Built with ❤️ by **Saksham Varshney** & **Suraj Kumar Gupta**

<br/>

---

</div>

## 🔭 What is Code-Eclipse?

**Code-Eclipse** is a full-stack developer tool that parses raw Java source code and renders it as a live, interactive OOP tree diagram. No plugins. No setup. Just paste your Java code, hit **Parse**, and watch your entire class hierarchy come to life in seconds.

Whether you're a student learning OOP concepts, a developer reviewing an unfamiliar codebase, or a teacher explaining inheritance chains — Code-Eclipse makes it visual, beautiful and instant.

```
  Paste Java Code  →  Hit Parse  →  See Your OOP Tree
```

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| ⚡ **Instant Parsing** | Paste Java code and get a live tree in milliseconds |
| 🌲 **Smart Tree Layout** | Auto-arranged with Dagre algorithm (top → bottom hierarchy) |
| 🎨 **Color Coded Nodes** | Class, interface, abstract, orphan — each with distinct colors |
| 🔍 **Live Search** | Highlight any class on the canvas by name, instantly |
| 📋 **Member Details** | Click any node to see all fields, methods, access modifiers and flags |
| ⚠️ **Orphan Detection** | Classes with no relationships are automatically flagged |
| 🧬 **Deep Parser** | Extracts inheritance, interfaces, depth, access, modifiers, method count |
| 📁 **File Upload** | Drag and drop any `.java` file directly onto the editor |
| 💾 **Project History** | Save, reload and delete past trees from MongoDB |
| 📤 **Export** | Download your tree as PNG, SVG or PDF |
| 🌙 **Dark / Light Mode** | Stunning in both themes |
| 🧪 **4 Built-in Examples** | Animal Kingdom, Vehicle System, Banking System, Shape Hierarchy |
| 🛑 **Error Panel** | See exactly what is wrong with your Java code structure |

---

## 🖥️ Preview

```
┌─────────────────┐      ┌─────────────────┐
│   LivingThing   │      │   «interface»   │
│   abstract      │      │    Drawable     │
│   D:0  ƒ 2      │      │   D:0  ƒ 3      │
└────────┬────────┘      └────────┬────────┘
         │ extends                 │ implements
    ┌────┴────┐              ┌─────┴──────┐
    │ Animal  │              │   Shape    │
    │abstract │              │  abstract  │
    │D:1  ƒ 4 │              │ D:1  ƒ 5   │
    └──┬───┬──┘              └──────┬─────┘
       │   │                        │
    ┌──┘   └──┐              ┌──────┴──────┐
  ┌─┴─┐    ┌─┴─┐         ┌──┴──┐       ┌──┴──┐
  │Dog│    │Cat│         │Circ │       │Rect │
  │D:2│    │D:2│         │ D:2 │       │ D:2 │
  └───┘    └───┘         └─────┘       └─────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| React Flow | Latest | Interactive node canvas |
| Monaco Editor | Latest | VS Code-grade Java editor |
| Dagre | Latest | Automatic tree layout algorithm |
| html-to-image | Latest | PNG / SVG export |
| jsPDF | Latest | PDF export |
| Axios | Latest | HTTP API calls |
| Tailwind CSS | 3 | Utility-first styling |

### Backend

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| Express | 4 | REST API server |
| MongoDB | 7 | Project persistence |
| Mongoose | 7 | MongoDB ODM |
| Multer | Latest | `.java` file upload handling |
| dotenv | Latest | Environment configuration |

---

## 📁 Project Structure

```
Code-Eclipse/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            ← dark/light toggle + search bar
│   │   │   ├── CodeEditor.jsx        ← Monaco Editor, Java syntax
│   │   │   ├── TreeCanvas.jsx        ← React Flow canvas + Dagre layout
│   │   │   ├── ClassNode.jsx         ← access badges, method count, depth, orphan
│   │   │   ├── HoverPanel.jsx        ← member details panel on click
│   │   │   ├── Legend.jsx            ← color key overlay
│   │   │   ├── ExportBar.jsx         ← PNG / PDF / SVG export
│   │   │   ├── FileUpload.jsx        ← .java drag and drop
│   │   │   ├── SnippetDropdown.jsx   ← preloaded Java examples
│   │   │   ├── ErrorPanel.jsx        ← parser error messages
│   │   │   └── ProjectHistory.jsx    ← saved projects sidebar
│   │   ├── samples/
│   │   │   └── snippets.js           ← 4 Java code examples
│   │   ├── utils/
│   │   │   └── exportGraph.js        ← html-to-image + jsPDF logic
│   │   ├── api/
│   │   │   └── projectApi.js         ← axios calls to /api/projects
│   │   ├── App.jsx                   ← root component, central state
│   │   ├── main.jsx                  ← React entry point
│   │   └── index.css                 ← global styles + CSS variables
│   └── package.json
│
├── backend/
│   ├── parser/
│   │   ├── classExtractor.js         ← finds all classes / interfaces
│   │   ├── inheritanceParser.js      ← maps extends / implements
│   │   ├── memberParser.js           ← extracts methods and fields
│   │   ├── accessParser.js           ← public / private / protected
│   │   ├── modifierParser.js         ← abstract / final / static
│   │   ├── methodCounter.js          ← counts methods per class
│   │   ├── depthCalculator.js        ← calculates inheritance depth
│   │   ├── orphanDetector.js         ← flags isolated classes
│   │   └── errorCollector.js         ← collects structural warnings
│   ├── routes/
│   │   ├── parse.js                  ← POST /api/parse
│   │   ├── upload.js                 ← POST /api/upload
│   │   └── projects.js               ← GET/POST/DELETE /api/projects
│   ├── models/
│   │   └── Project.js                ← Mongoose schema
│   ├── server.js                     ← Express app entry point
│   ├── .env                          ← MONGO_URI + PORT
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** running locally or a MongoDB Atlas URI

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/code-eclipse.git
cd code-eclipse
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
MONGO_URI=mongodb://localhost:27017/code-eclipse
PORT=5000
```

Add `"type": "module"` to `backend/package.json`:

```json
{
  "type": "module"
}
```

Start the backend server:

```bash
node server.js
```

Expected output:

```
✅ MongoDB connected
🚀 Server running at http://localhost:5000
```

---

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm install dagre
npm run dev
```

---

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🎮 How to Use

```
Step 1  →  Paste Java code into the editor
           OR drag & drop a .java file
           OR pick one of the 4 built-in examples

Step 2  →  Hit ⚡ Parse

Step 3  →  Click any node to see its full member details

Step 4  →  Search a class name in the navbar to highlight it on canvas

Step 5  →  Export your tree as PNG, SVG or PDF

Step 6  →  Save your project to history and reload it anytime
```

---

## 🧠 How the Parser Works

```
Java Code String (raw)
        │
        ▼
┌─────────────────────┐
│   classExtractor    │  →  finds all classes, interfaces, abstract classes
├─────────────────────┤
│ inheritanceParser   │  →  maps extends / implements relationships
├─────────────────────┤
│   memberParser      │  →  extracts methods and fields from each class body
├─────────────────────┤
│   accessParser      │  →  detects public / private / protected / package
├─────────────────────┤
│  modifierParser     │  →  detects abstract / final / static
├─────────────────────┤
│   methodCounter     │  →  counts methods per class
├─────────────────────┤
│  depthCalculator    │  →  calculates depth in the inheritance tree
├─────────────────────┤
│  orphanDetector     │  →  flags classes with no relationships
├─────────────────────┤
│  errorCollector     │  →  collects structural warnings and errors
└─────────────────────┘
        │
        ▼
{ nodes, edges, classes, errors }
        │
        ▼
  React Flow Canvas
```

---

## 🎨 Node Color Legend

| Color | Meaning |
|-------|---------|
| 🟣 Indigo | Regular class |
| 🟢 Green | Interface |
| 🟡 Amber | Abstract class |
| 🔴 Red | Orphan class (no relationships) |

| Edge Style | Meaning |
|------------|---------|
| Solid arrow | `extends` |
| Dashed animated | `implements` |

---

## 🌐 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/parse` | Parse Java code → returns nodes, edges, classes, errors |
| `POST` | `/api/upload` | Upload a `.java` file → returns code string |
| `GET` | `/api/projects` | Fetch all saved projects |
| `GET` | `/api/projects/:id` | Fetch a single project by ID |
| `POST` | `/api/projects` | Save a new project |
| `DELETE` | `/api/projects/:id` | Delete a project |

---

## 🐛 Known Limitations

- Parser uses **Regex** not a full AST — works great for standard Java OOP patterns
- Deeply nested anonymous classes or lambdas may not parse perfectly
- Generic types like `List<String>` are treated as plain types

---

## 🔮 Future Plans

- [ ] Multiple `.java` file upload and cross-file parsing
- [ ] Full AST-based parser for 100% accuracy
- [ ] Collaborative real-time tree editing
- [ ] GitHub repository direct import
- [ ] UML diagram export format
- [ ] Class metrics and complexity scoring

---

## 👨‍💻 Authors

<table>
  <tr>
    <td align="center" width="50%">
      <h3>Saksham Varshney</h3>
      <sub>Full Stack Developer</sub><br/><br/>
      <sub>Frontend Architecture · UI/UX · React Flow Integration</sub>
    </td>
    <td align="center" width="50%">
      <h3>Suraj Kumar Gupta</h3>
      <sub>Full Stack Developer</sub><br/><br/>
      <sub>Backend · Java Parser Engine · MongoDB Integration</sub>
    </td>
  </tr>
</table>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify and distribute.

---

<div align="center">

<br/>

*"Code-Eclipse — where your Java hierarchy finally makes sense."*

<br/>

⭐ **If you found this useful, give it a star!** ⭐

</div>
