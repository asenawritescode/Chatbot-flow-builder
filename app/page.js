/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/base.css";

import "../tailwind.config.js";

import Sidebar from "./component/sidebar";

import StartNode from "./component/StartNode";
import TextNode from "./component/TextNode";
import ImageNode from "./component/ImageNode";
import VideoNode from "./component/VideoNode";
import PdfNode from "./component/PdfNode";
import AudioNode from "./component/AudioNode";

// Key for local storage
const flowKey = "flow-key";

// Initial node setup
const initialNodes = [
  // {
  //   id: "1",
  //   type: "startnode",
  //   data: { label: "incoming message" },
  //   position: { x: 250, y: 5 },
  // },
];

let id = 0;

// Function for generating unique IDs for nodes
const getId = () => `node_${id++}`;

const App = () => {
  // Define custom node types
  const nodeTypes = useMemo(
    () => ({
      startnode: StartNode,
      textnode: TextNode,
      imagenode: ImageNode,
      videonode: VideoNode,
      pdfnode: PdfNode,
      audionode: AudioNode,
    }),
    []
  );

  // States and hooks setup
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodeCount, setNodeCount] = useState(0);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [nodeName, setNodeName] = useState("");

  // Update nodes data when nodeName or selectedElements changes
  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedElements[0]?.id) {
            node.data = {
              ...node.data,
              label: nodeName,
            };
          }
          return node;
        })
      );
    } else {
      setNodeName(""); // Clear nodeName when no node is selected
    }
  }, [nodeName, selectedElements, setNodes]);

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedElements([node]);
    setNodeName(node.data.label);
    setNodes((nodes) =>
      nodes.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, []);

  // Setup viewport
  const { setViewport } = useReactFlow();

  // Check for empty target handles
  const checkEmptyTargetHandles = () => {
    let emptyTargetHandles = 0;
    edges.forEach((edge) => {
      if (!edge.targetHandle) {
        emptyTargetHandles++;
      }
    });
    return emptyTargetHandles;
  };

  // Check if any node is unconnected
  const isNodeUnconnected = useCallback(() => {
    let unconnectedNodes = nodes.filter(
      (node) =>
        !edges.find(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );

    return unconnectedNodes.length > 0;
  }, [nodes, edges]);

  // Save flow to local storage
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const emptyTargetHandles = checkEmptyTargetHandles();

      if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
        alert(
          "Error: More than one node has an empty target handle or there are unconnected nodes."
        );
      } else {
        // stringify
        const flow = reactFlowInstance.toObject();
        console.log(`${flowKey} : ${JSON.stringify(flow)}`)
        // localStorage.setItem(flowKey, JSON.stringify(flow));
        alert("Save successful!"); // Provide feedback when save is successful
      }
    }
  }, [reactFlowInstance, nodes, isNodeUnconnected]);

  // Restore flow from local storage
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  // Handle edge connection
  const onConnect = useCallback(
    (params) => {
      console.log("Edge created: ", params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Enable drop effect on drag over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop event to add a new node
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      console.log("Node Count", nodeCount)
      console.log("Type: ", type);

      // Bug here, how can we remove the node if the type is not "startnode"
      if (nodeCount === 0 && type !== "startnode") {
        console.log("Demo",event)
        alert(
          "Error: You must have at least one start node."
        );

        return;
      };

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      setNodeCount(nodeCount + 1);

      console.log("Node created: ", newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodeCount]
  );

  const onClear = () => {
    setNodes([]); // Clear the nodes array
    setEdges([]); // Clear the edges arra
  }

  const rfStyle = {
    backgroundColor: "#ffffff",
  };

  return (
    <div className="flex flex-row min-h-screen lg:flex-row">
      <div className="flex-grow h-screen" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          style={rfStyle}
          onNodeClick={onNodeClick}
          onPaneClick={() => {
            setSelectedElements([]); // Reset selected elements when clicking on pane
            setNodes((nodes) =>
              nodes.map((n) => ({
                ...n,
                selected: false, // Reset selected state of nodes when clicking on pane
              }))
            );
          }}
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          <MiniMap zoomable pannable />
          <Panel>
            <button
              className=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onSave}
            >
              save flow
            </button>
            <button
              className="mr -2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onRestore}
            >
              restore flow
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClear}
            >
              clear canvas
            </button>
          </Panel>
        </ReactFlow>
      </div>

      <Sidebar
        nodeName={nodeName}
        setNodeName={setNodeName}
        selectedNode={selectedElements[0]}
        setSelectedElements={setSelectedElements}
      />
    </div>
  );
};

// Wrap App with ReactFlowProvider
function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;
