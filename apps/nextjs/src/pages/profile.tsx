// src/components/Profile.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import CreateBusinessModal from "components/Modals/CreateBusinessModal";
import { useSession } from "next-auth/react";

import { trpc } from "~/utils/api";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to home if no user is in the session
  React.useEffect(() => {
    if (!status && !session) {
      router.push("/");
    }
  }, [status, session]);

  const businessesQuery = trpc.businesses.businessesBySession.useQuery();

  const user = session?.user;

  if (!user || businessesQuery.isLoading || businessesQuery.isError) {
    return <div>Loading...</div>;
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const openCreateBusinessModal = () => {
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    const { mutateAsync } = trpc.businesses.createBusiness.useMutation();
    closeModal();
  };

  return (
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
                  Your Business
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                  {businessesQuery.data[0]?.name}
                </p>
                <button
                  type="button"
                  onClick={openCreateBusinessModal}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Edit Business
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openCreateBusinessModal}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Create Business
              </button>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <CreateBusinessModal
          onClose={() => setShowModal(false)}
          open={showModal}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default Profile;
