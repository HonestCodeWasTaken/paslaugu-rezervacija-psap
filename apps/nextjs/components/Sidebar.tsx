import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-row h-screen">
      <div className={`bg-gray-800 text-white w-64 ${isOpen ? "" : "hidden"}`}>
        {/* Sidebar content goes here */}
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Main content goes here */}
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={toggleSidebar}
        >
          {isOpen ? "Close" : "Open"} Sidebar
        </button>
      </div>
    </div>
  );
}
