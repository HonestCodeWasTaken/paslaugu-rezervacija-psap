import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Service } from "@acme/db";

import { trpc } from "~/utils/api";

type Props = {};

const AddService = (props: Props) => {
  const [newServiceData, setNewServiceData] = useState({
    service_name: "",
    description: "",
    cost: "",
    session_length: "",
    category_id: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewServiceData({ ...newServiceData, [e.target.name]: e.target.value });
  };
  const { mutateAsync: createService } =
    trpc.services.createServiceBySession.useMutation();

  const handleAddServiceSubmit = async () => {
    await toast.promise(
      createService({
        ...newServiceData,
        category_id: parseInt(newServiceData.category_id, 10),
        cost: parseInt(newServiceData.cost, 10),
      }),
      {
        loading: "Creating service...",
        success: "Service created!",
        error: "Could not create service",
      },
    );

    // await servicesQuery.refetch();
  };
  return (
    <div className="bg-white p-4 mt-6 rounded-md">
      <h2 className="text-lg font-medium text-gray-900">Add Business</h2>
      <div>
        <div className="mt-4">
          <label htmlFor="service_name">Service Name:</label>
          <input
            type="text"
            name="service_name"
            value={newServiceData.service_name}
            onChange={handleChange}
            className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={newServiceData.description}
            onChange={handleChange}
            className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            name="cost"
            value={newServiceData.cost}
            onChange={handleChange}
            className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="session_length">Session Length:</label>
          <input
            type="text"
            name="session_length"
            value={newServiceData.session_length}
            onChange={handleChange}
            className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="category_id">Category ID:</label>
          <input
            type="number"
            name="category_id"
            value={newServiceData.category_id}
            onChange={handleChange}
            className="w-full px-2 py-1 mt-1 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600"
            onClick={() => handleAddServiceSubmit()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddService;
