import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import UseSockets from "components/Notifications";

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  UseSockets();

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [parent] = useAutoAnimate();
  return (
    <div ref={parent} className="mr-6">
      <button onClick={toggle}>
        <svg
          className="fill-current hover:text-black"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M21.986,17c-0.116-0.326-0.326-2.673-0.673-4.406C21.855,9.161,21.072,7,19.198,7c-1.634,0-2.673,1.366-3.855,1.366 C14.339,8.366,13.3,7,11.667,7c-1.875,0-2.658,2.161-2.115,5.594c-0.347,1.733-0.557,4.08-0.673,4.406C8.071,18.428,7.126,19,6,19 h12C22.874,19,21.929,18.428,21.986,17z M5,22c1.103,0,2-0.897,2-2h10c0,1.103,0.897,2,2,2H5z" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{ left: "-100px" }}
          className="absolute left-[-100px] ease-in-out duration-500 transition-all bg-white mt-20 py-2 w-64 rounded-lg shadow-xl"
        >
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <span className="font-bold text-gray-800">Your Message 1</span>
          </div>
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <span className="font-bold text-gray-800">Your Message 2</span>
          </div>
          <div className="flex items-center px-4 py-3">
            <span className="font-bold text-gray-800">Your Message 3</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
