import React, { useState } from "react";

export default function Sidebar({
  nodeName,
  nodeCount,
  setNodeCount,
  setNodeName,
  selectedNode,
  setSelectedElements,
  setNodes
}) {
  const handleInputChange = (event) => {
    setNodeName(event.target.value);
  };
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const deleteNodeById = (id) => {
    setNodes(nds => nds.filter(node => node.id !== id));
    setSelectedElements([])
    nodeCount = ((nodeCount - 1) === NaN) ? 0 : nodeCount - 1

    setNodeCount(nodeCount)
  }

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const triggerOptions = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ];

  return (
    <aside className="border-r-2 border-blue-200 p-4 text-sm bg-blue-100 w-64 h-screen text-black">
      {
        selectedNode ?
          selectedNode?.type === 'startnode' ?
            <div>
              <h3 className="text-xl mb-2 text-blue-900">Update Start Node</h3>
              <label className="block mb-2 py-1 text-sm font-medium text-blue-900">
                Node Name:
              </label>
              <input
                type="text"
                className="block w-full pt-2 px-3 py-2 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                value={nodeName}
                onChange={handleInputChange}
              />
              <label className="block mb-2 py-1 text-sm font-medium text-blue-900">
                Select an option:
              </label>
              <select
                id="dropdown"
                className="block w-full pt-2 px-3 py-2 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                value={selectedOption}
                onChange={handleOptionChange}>
                <option value="option1">Event Welcome</option>
                <option value="option2">Event Order</option>
                <option value="option3">Event Audio</option>
                <option value="option3">Event Video</option>
                <option value="option3">Event Document</option>
                <option value="option3">Listen for custom message</option>
              </select>
              <label className="block mb-2 py-1 text-sm font-medium text-blue-900">
                Trigger:
              </label>
              <input
                type="text"
                className="block w-full pt-2 px-3 py-2 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                value={nodeName}
                onChange={handleInputChange}
              />

              <button
                className="mt-4 mr-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                onClick={() => setSelectedElements([])}
              >
                Go Back
              </button>
              {/* To be removed */}
              <button
                className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                onClick={() => {
                  console.log(selectedNode.type)
                }}
              >
                Get data
              </button>
            </div>
            : selectedNode.type === 'textnode' ?
              <div>
                <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
                <label className="block mb-2 text-sm font-medium text-blue-900">
                  Node Name:
                </label>
                <input
                  type="text"
                  className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                  value={nodeName}
                  onChange={handleInputChange}
                />
                <button
                  className="mr-2 mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                  onClick={() => deleteNodeById(selectedNode.id)}
                >
                  Remove
                </button>
                <button
                  className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                  onClick={() => setSelectedElements([])}
                >
                  Go Back
                </button>
                <button
                  className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                  onClick={() => {
                    console.log(selectedNode.type)
                  }}
                >
                  Get data
                </button>
              </div>
              : selectedNode.type === 'imagenode' ?
                <div>
                  <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
                  <label className="block mb-2 text-sm font-medium text-blue-900">
                    Node Name:
                  </label>
                  <input
                    type="text"
                    className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                    value={nodeName}
                    onChange={handleInputChange}
                  />
                  <button
                    className="mr-2 mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                    onClick={() => deleteNodeById(selectedNode.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                    onClick={() => setSelectedElements([])}
                  >
                    Go Back
                  </button>
                  <button
                    className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                    onClick={() => {
                      console.log(selectedNode.type)
                    }}
                  >
                    Get data
                  </button>
                </div>
                : selectedNode.type === 'videonode' ?
                  <div>
                    <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
                    <label className="block mb-2 text-sm font-medium text-blue-900">
                      Node Name:
                    </label>
                    <input
                      type="text"
                      className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                      value={nodeName}
                      onChange={handleInputChange}
                    />
                    <button
                      className="mr-2 mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                      onClick={() => deleteNodeById(selectedNode.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                      onClick={() => setSelectedElements([])}
                    >
                      Go Back
                    </button>
                    <button
                      className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                      onClick={() => {
                        console.log(selectedNode.type)
                      }}
                    >
                      Get data
                    </button>
                  </div>
                  : selectedNode.type === 'pdfnode' ?
                    <div>
                      <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
                      <label className="block mb-2 text-sm font-medium text-blue-900">
                        Node Name:
                      </label>
                      <input
                        type="text"
                        className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                        value={nodeName}
                        onChange={handleInputChange}
                      />
                      <button
                        className="mr-2 mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                        onClick={() => deleteNodeById(selectedNode.id)}
                      >
                        Remove
                      </button>
                      <button
                        className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                        onClick={() => setSelectedElements([])}
                      >
                        Go Back
                      </button>
                      <button
                        className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                        onClick={() => {
                          console.log(selectedNode.type)
                        }}
                      >
                        Get data
                      </button>
                    </div>
                    : selectedNode.type === 'audionode' ?
                      <div>
                        <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
                        <label className="block mb-2 text-sm font-medium text-blue-900">
                          Node Name:
                        </label>
                        <input
                          type="text"
                          className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                          value={nodeName}
                          onChange={handleInputChange}
                        />
                        <button
                          className="mr-2 mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                          onClick={() => deleteNodeById(selectedNode.id)}
                        >
                          Remove
                        </button>
                        <button
                          className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                          onClick={() => setSelectedElements([])}
                        >
                          Go Back
                        </button>
                        <button
                          className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                          onClick={() => {
                            console.log(selectedNode.type)
                          }}
                        >
                          Get data
                        </button>
                      </div>
                      : <div>
                        <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
                        <label className="block mb-2 text-sm font-medium text-blue-900">
                          Node Name:
                        </label>
                        <input
                          type="text"
                          className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                          value={nodeName}
                          onChange={handleInputChange}
                        />
                        <button
                          className="mr-2 mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                          onClick={() => deleteNodeById(selectedNode.id)}
                        >
                          Remove
                        </button>
                        <button
                          className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                          onClick={() => setSelectedElements([])}
                        >
                          Go Back
                        </button>
                        <button
                          className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                          onClick={() => {
                            console.log(selectedNode.type)
                          }}
                        >
                          Get data
                        </button>
                      </div>
          :
          //node panel
          <>
            <h3 className="text-xl mb-4 text-blue-900">Response Nodes</h3>
            <div
              className="bg-white p-3 mb-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              onDragStart={(event) => onDragStart(event, "startnode")}
              draggable
            >
              Start Node
            </div>
            <div
              className="bg-white p-3 mb-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              onDragStart={(event) => onDragStart(event, "textnode")}
              draggable
            >
              Text Response
            </div>
            <div
              className="bg-white p-3 mb-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              onDragStart={(event) => onDragStart(event, "imagenode")}
              draggable
            >
              Image Response
            </div>
            <div
              className="bg-white p-3 mb-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              onDragStart={(event) => onDragStart(event, "videonode")}
              draggable
            >
              Video Response
            </div>
            <div
              className="bg-white p-3 mb-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              onDragStart={(event) => onDragStart(event, "pdfnode")}
              draggable
            >
              PDF Response
            </div>
            <div
              className="bg-white p-3 mb-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              onDragStart={(event) => onDragStart(event, "audionode")}
              draggable
            >
              Audio Response
            </div>
          </>
      }
    </aside>
  );
}
