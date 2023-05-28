// src/components/Profile.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { Service } from "@acme/db";

import { trpc } from "~/utils/api";

const Profile = () => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<null | Service>(null);
  const [newServiceData, setNewServiceData] = useState({
    service_name: "",
    description: "",
    cost: 0,
    session_length: "",
    category_id: "",
  });

  const router = useRouter();
  const utils = trpc.useContext();

  const { mutateAsync: createService } =
    trpc.services.createServiceBySession.useMutation();
  const businessesQuery = trpc.businesses.businessesBySession.useQuery();

  const { data: session, status } = useSession();
  const deleteServiceMutation = trpc.services.deleteService.useMutation();
  const updateServiceMutation = trpc.services.updateService.useMutation();
  const servicesQuery = trpc.services.getServicesByUserSession.useQuery();
  // Redirect to home if no user is in the session
  React.useEffect(() => {
    if (!status && !session) {
      router.push("/");
    }
  }, [status, session]);

  const user = session?.user;

  if (!user || businessesQuery.isLoading || businessesQuery.isError) {
    return <div>Loading...</div>;
  }

  const business = businessesQuery.data[0];

  const handleChange = (e) => {
    setNewServiceData({ ...newServiceData, [e.target.name]: e.target.value });
  };
  const handleAddServiceClick = () => {
    setEditingService(null);
    setShowServiceModal(true);
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
        cost: parseInt(newServiceData.cost, 10),
      }),
      {
        loading: "Creating service...",
        success: "Service created!",
        error: "Could not create service",
      },
    );
    await utils.services.getServicesByUserSession.invalidate();
  };
  const handleEditServiceClick = (service) => {
    setEditingService(service);
    setShowServiceModal(true);
  };
  const handleDeleteServiceClick = async (serviceId) => {
    await deleteServiceMutation.mutateAsync({ id: serviceId });
    servicesQuery.refetch();
  };
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          {/* Your existing profile code */}
          {business && (
            <div>
              <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                Services
              </h2>
              {servicesQuery.isLoading ? (
                <p>Loading services...</p>
              ) : (
                <>
                  {servicesQuery.data.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gray-100 p-4 rounded-md mt-4"
                    >
                      <h3 className="font-bold">{service.service_name}</h3>
                      <p>{service.description}</p>
                      <p>Cost: {service.cost}</p>
                      <p>Session length: {service.session_length}</p>
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
                  {!showServiceModal && (
                    <button
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                      onClick={handleAddServiceClick}
                    >
                      Add Service
                    </button>
                  )}
                </>
              )}
            </div>
          )}
          {showServiceModal && (
            <div className="bg-white p-4 mt-6 rounded-md">
              <h3>
                {editingService
                  ? `edit service - id: ${editingService.id} with name - ${editingService.service_name}`
                  : "Add a new service"}
              </h3>
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
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                    onClick={handleAddServiceCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600"
                    onClick={() =>
                      editingService
                        ? updateServiceMutation.mutate({
                            id: editingService.id,
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
                                newServiceData.cost === 0
                                  ? undefined
                                  : newServiceData.cost,
                              session_length:
                                newServiceData.session_length === ""
                                  ? undefined
                                  : newServiceData.session_length,
                              category_id:
                                newServiceData.category_id === ""
                                  ? undefined
                                  : parseInt(newServiceData.category_id, 10),
                            },
                          })
                        : handleAddServiceSubmit()
                    }
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
