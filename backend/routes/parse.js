import express from "express";
import { extractClasses } from "../parser/classExtractor.js";
import { parseMembers } from "../parser/memberParser.js";
import { parseAccess } from "../parser/accessParser.js";
import { parseModifiers } from "../parser/modifierParser.js";
import { countMethods } from "../parser/methodCounter.js";
import { calculateDepth } from "../parser/depthCalculator.js";
import { detectOrphans } from "../parser/orphanDetector.js";
import { collectErrors } from "../parser/errorCollector.js";

const router = express.Router();

//POST-->parse
router.post("/", (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Java code string is required" });
    }
    //Extract all classes/Interface
    const classes = extractClasses(code);

    if (classes.length === 0) {
      return res
        .status(422)
        .json({ error: "No classes found in the provided code" });
    }

    //Tagging each class with members ,access modeifiers
    classes.forEach((cl) => {
      cl.methods = parseMembers(cl.body, "method");
      cl.fields = parseMembers(cl.body, "field");
      cl.accessModifier = parseAccess(cl.raw);
      cl.modifiers = parseModifiers(cl.raw);
      cl.methodCount = countMethods(cl.methods);
    });

    //Depth Calculation and orphan detection

    calculateDepth(classes);
    detectOrphans(classes);

    //Error and Warning Collection in parsing
    const errors = collectErrors(classes, code);

    //Building react flow nodes-->
    const nodes = classes.map((cl, index) => ({
      id: cl.name,
      type: "classNode",
      position: { x: (index % 4) * 260, y: Math.floor(index / 4) * 200 },
      data: {
        name: cl.name,
        type: cl.type,
        accessModifier: cl.accessModifier,
        modifiers: cl.modifiers,
        fields: cl.fields,
        methodCount: cl.methodCount,
        depth: cl.depth,
        isOrphan: cl.isOrphan,
        parent: cl.parent || null,
        interfaces: cl.interfaces || [],
      },
    }));

    //Build Edges
    const edges = [];

    classes.forEach((cl) => {
      //inheritence edges build
      if (cl.parent) {
        edges.push({
          id: `${cl.parent}->${cl.name}`,
          source: cl.parent,
          target: cl.name,
          type: "smoothstep",
          label: "extends",
        });
      }

      //Interface Edges Build
      (cl.interfaces || []).forEach((iface) => {
        edges.push({
          id: `${iface}->${cl.name}`,
          source: iface,
          target: cl.name,
          type: "smoothstep",
          label: "implements",
        });
      });
    });

    return res.status(200).json({ nodes, edges, classes, errors });
  } catch (err) {
    console.error("Parse Error:", err.message);
    return res.status(500).json({ error: "Failed to parse the java code" });
  }
});
export default router;
