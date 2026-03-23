import { useState, useCallback } from "react";
import axios from "axios";

import Navbar from "./components/Navbar.jsx";
import CodeEditor from "./components/CodeEditor.jsx";
import TreeCanvas from "./components/TreeCanvas.jsx";
import HoverPanel from "./components/HoverPanel.jsx";
import Legend from "./components/Legend.jsx";
import ExportBar from "./components/ExportBar.jsx";
import FileUpload from "./components/FileUpload.jsx";
import SnippetDropdown from "./components/SnippetDropdown.jsx";
import ErrorPanel from "./components/ErrorPanel.jsx";
import ProjectHistory from "./components/ProjectHistory.jsx";
