// src/components/Profile.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { trpc } from "~/utils/api";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [businessData, setBusinessData] = useState({
    name: "",
    description: "",
    main_image_url: "",
    user_id: "",
    phoneNumber: "",
    email: "",
  });
  const { mutateAsync } = trpc.businesses.createBusiness.useMutation();
  const businessesQuery = trpc.businesses.businessesBySession.useQuery();
  const utils = trpc.useContext();
  const handleChange = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  const handleServicesClick = () => {
    router.push("/profile/services");
  };

  const { data: session, status } = useSession();
  const router = useRouter();

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

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <img
                  src={user.image || "https://via.placeholder.com/150"}
                  alt="profile"
                  className="block mx-auto object-cover rounded-full h-16 w-16 "
                />
                <div>
                  <h1 className="font-bold text-xl">{user.name}</h1>
                </div>
              </div>
              {businessesQuery.data.length > 0 ? (
                <div>
                  <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                    {businessesQuery.data[0]?.name}
                  </h2>
                  <p className="mt-2 text-lg text-gray-600">
                    {businessesQuery.data[0]?.description}
                  </p>
                  <br className="my-2 border-t border-gray-300" />
                  <p className="mt-2 text-lg text-gray-600">
                    {businessesQuery.data[0]?.email}
                  </p>
                  <p className="mt-2 text-lg text-gray-600">
                    {businessesQuery.data[0]?.phoneNumber}
                  </p>
                  <button
                    type="button"
                    onClick={handleServicesClick}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    Offered Services
                  </button>
                  <button
                    type="button"
                    // onClick={openCreateBusinessModal}
                    className="mt-6 ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    Edit Business
                  </button>
                </div>
              ) : (
                <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <h2 className="text-lg font-medium text-gray-900">
                    Add Business
                  </h2>
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
                    <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        toast.promise(
                          mutateAsync(businessData).then(() =>
                            utils.businesses.allBusinesses.invalidate(),
                          ),
                          {
                            loading: "Saving...",
                            success: <b>Deleted category</b>,
                            error: <b>Metas pist protą Tomui</b>,
                          },
                        );
                      }}
                      className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
