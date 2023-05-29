// src/components/Services.tsx

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Service } from "@acme/db";

import { trpc } from "~/utils/api";

type Props = {
  services: Service[];
};

const Services = ({ services }: Props) => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<null | Service>(null);
  const [newServiceData, setNewServiceData] = useState({
    service_name: "",
    description: "",
    cost: "",
    session_length: "",
    category_id: "",
  });

  const { mutateAsync: createService } =
    trpc.services.createServiceBySession.useMutation();
  const servicesQuery = trpc.services.getServicesByUserSession.useQuery();
  const deleteServiceMutation = trpc.services.deleteService.useMutation();
  const updateServiceMutation = trpc.services.updateService.useMutation();
  const utils = trpc.useContext();
  const handleChange = (e) => {
    console.log({ ...newServiceData, [e.target.name]: e.target.value });
    setNewServiceData({ ...newServiceData, [e.target.name]: e.target.value });
  };

  const handleAddServiceCancel = () => {
    setShowServiceModal(false);
    setEditingService(null);
  };

  const handleAddServiceSubmit = async () => {
    await toast.promise(
      createService({
        ...newServiceData,
        category_id: parseInt(newServiceData.category_id, 10),
        // @ts-ignore
        cost: parseInt(newServiceData.cost, 10),
      }),
      {
        loading: "Creating service...",
        success: "Service created!",
        error: "Could not create service",
      },
    );

    setShowServiceModal(false);
    servicesQuery.refetch();
  };
  const handleEditServiceSubmit = async () => {
    await toast.promise(
      updateServiceMutation.mutateAsync({
        id: editingService!.id,
        updates: {
          service_name:
            newServiceData.service_name === ""
              ? undefined
              : newServiceData.service_name,
          description:
            newServiceData.description === ""
              ? undefined
              : newServiceData.description,
          cost:
            newServiceData.cost === ""
              ? undefined
              : parseInt(newServiceData.cost, 10),
          session_length:
            newServiceData.session_length === ""
              ? undefined
              : newServiceData.session_length,
          category_id:
            newServiceData.category_id === ""
              ? undefined
              : parseInt(newServiceData.category_id, 10),
        },
      }),
      {
        loading: "editing service...",
        success: "Service edited!",
        error: "Could not edit service",
      },
    );

    setShowServiceModal(false);
    await utils.businesses.businessesBySession.refetch();
  };

  const handleEditServiceClick = (service) => {
    setEditingService(service);
    setShowServiceModal(true);
  };

  const handleDeleteServiceClick = async (serviceId) => {
    await toast.promise(deleteServiceMutation.mutateAsync({ id: serviceId }), {
      loading: "Deleting service...",
      success: "Service deleted!",
      error: "Could not delete service",
    });
    await utils.businesses.businessesBySession.invalidate();
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-wrap h-full w-full gap-2">
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              width: "33%",
              height: "200px",
            }}
            className="border border-gray-200 p-4 rounded-md mt-4 "
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {service.service_name}
            </h2>
            <p className="text-gray-600">{service.description}</p>
            <p className="text-gray-600">Price: ${service.cost.toString()}</p>
            <p className="text-gray-600">
              Duration: {service.session_length} minutes
            </p>
            <button
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleEditServiceClick(service)}
            >
              Edit
            </button>
            <button
              className="mt-2 ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleDeleteServiceClick(service.id)}
            >
              Delete
            </button>
          </div>
        ))}
        {services.length === 0 && (
          <div className="flex flex-col w-full items-center justify-center h-full">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              You have no services yet
            </h2>
          </div>
        )}
      </div>
      {showServiceModal && (
        <div className="bg-white p-4 mt-6 rounded-md">
          <h3>
            {editingService
              ? `edit service - id: ${editingService.id} with name - ${editingService.name}`
              : "Add a new service"}
          </h3>
          <form>
            <div className="mt-4">
              <label
                htmlFor="service_name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="service_name"
                value={newServiceData.service_name}
                onChange={handleChange}
                className="mt-1 block text-black w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                value={newServiceData.description}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                name="cost"
                value={newServiceData.cost}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <input
                name="session_length"
                value={newServiceData.session_length}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
          </form>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={handleAddServiceCancel}
            >
              Cancel
            </button>
            <button
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600"
              onClick={() => handleEditServiceSubmit()}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
