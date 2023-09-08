import React from "react";

export default function Sidebar({
  nodeName,
  setNodeName,
  selectedNode,
  setSelectedElements,
}) {
  const handleInputChange = (event) => {
    setNodeName(event.target.value);
  };
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border-r-2 border-blue-200 p-4 text-sm bg-blue-100 w-64 h-screen text-black">
      {
        selectedNode ?
          selectedNode?.type === 'startnode' ?
            <div>
              <h3 className="text-xl mb-2 text-blue-900">Update Start Node</h3>
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
                onClick={() => setSelectedElements([])}
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
                onClick={() => setSelectedElements([])}
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
