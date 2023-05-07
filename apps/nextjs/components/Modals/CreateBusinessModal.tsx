// src/components/CreateBusinessModal.tsx

import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
// };

const CreateBusinessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [businessData, setBusinessData] = useState({
    name: "",
    description: "",
    main_image_url: "",
    user_id: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500  text-black font-bold py-2 px-4 rounded"
      >
        Add Business
      </button>
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Add Business
                </Dialog.Title>
                <form>
                  <div className="mt-4">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={businessData.name}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      name="description"
                      value={businessData.description}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="main_image_url">Main Image URL:</label>
                    <input
                      type="text"
                      name="main_image_url"
                      value={businessData.main_image_url}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="user_id">User ID:</label>
                    <input
                      type="text"
                      name="user_id"
                      value={businessData.user_id}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={businessData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={businessData.email}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                    />
                  </div>
                </form>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log(businessData);
                      setIsOpen(false);
                    }}
                    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateBusinessModal;
