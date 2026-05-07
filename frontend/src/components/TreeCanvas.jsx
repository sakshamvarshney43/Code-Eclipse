import { useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import ClassNode from "./ClassNode.jsx";

const nodeTypes = { classNode: ClassNode };

const NODE_WIDTH  = 250;
const NODE_HEIGHT = 120;

function applyDagreLayout(nodes, edges) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 80, ranksep: 100, align: "UL" });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      position: {
        x: pos.x - NODE_WIDTH  / 2,
        y: pos.y - NODE_HEIGHT / 2,
      },
    };
  });
}

function styleEdges(rawEdges) {
  return rawEdges.map((edge) => {
    const isImplements = edge.label === "implements";
    return {
      ...edge,
      animated: isImplements,
      type: "smoothstep",
      style: {
        stroke:      isImplements ? "var(--node-interface)" : "var(--accent)",
        strokeWidth: isImplements ? 1.5 : 2,
        strokeDasharray: isImplements ? "5,4" : undefined,
      },
      labelStyle: {
        fill:       "var(--text-muted)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize:   10,
        fontWeight: 600,
      },
      labelBgStyle: {
        fill:        "var(--bg-secondary)",
        fillOpacity: 0.9,
        rx:          4,
        ry:          4,
      },
      labelBgPadding: [3, 6],
      markerEnd: {
        type:   MarkerType.ArrowClosed,
        color:  isImplements ? "var(--node-interface)" : "var(--accent)",
        width:  14,
        height: 14,
      },
    };
  });
}

export default function TreeCanvas({
  nodes: rawNodes,
  edges: rawEdges,
  searchQuery,
  onNodeClick,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!rawNodes.length) {
      setNodes([]);
      setEdges([]);
      return;
    }

    // Apply search highlight
    const q = searchQuery.trim().toLowerCase();
    const highlighted = rawNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: q !== "" && node.data.name.toLowerCase().includes(q),
      },
    }));

    const laid   = applyDagreLayout(highlighted, rawEdges);
    const styled = styleEdges(rawEdges);

    setNodes(laid);
    setEdges(styled);
  }, [rawNodes, rawEdges, searchQuery]); // eslint-disable-line

  const handleNodeClick = useCallback(
    (_, node) => { onNodeClick(node.data); },
    [onNodeClick],
  );

  const minimapColor = useCallback((node) => {
    const map = {
      class:     "#818cf8",
      interface: "#34d399",
      abstract:  "#fbbf24",
    };
    return map[node.data?.type] || "#818cf8";
  }, []);

  // Empty state canvas
  if (!rawNodes.length) {
    return (
      <div
        style={{
          width:          "100%",
          height:         "100%",
          background:     "var(--bg-primary)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexDirection:  "column",
          gap:            "16px",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position:    "absolute",
            inset:       0,
            backgroundImage:
              "radial-gradient(circle, var(--canvas-dot) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity:     0.8,
          }}
        />
        <div className="empty-state" style={{ position: "relative", zIndex: 1 }}>
          <div className="empty-icon">🌑</div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize:   "18px",
              color:      "var(--text-secondary)",
              letterSpacing: "-0.01em",
            }}
          >
            No diagram yet
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize:   "11px",
              color:      "var(--text-muted)",
              maxWidth:   "260px",
              lineHeight: 1.6,
            }}
          >
            Paste Java code or upload a .java file, then hit{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Parse</span> to
            visualize the class hierarchy.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width:      "100%",
        height:     "100%",
        background: "var(--bg-primary)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18, includeHiddenNodes: false }}
        minZoom={0.15}
        maxZoom={2.5}
        deleteKeyCode={null}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.2}
          color="var(--canvas-dot)"
        />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={minimapColor}
          maskColor="rgba(var(--bg-primary), 0.7)"
          style={{ opacity: 0.9 }}
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}
