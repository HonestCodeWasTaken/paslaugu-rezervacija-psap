import { useState } from "react";
import toast from "react-hot-toast";

import { trpc } from "~/utils/api";

type Props = {};

const AddBusiness = (props: Props) => {
  const [businessData, setBusinessData] = useState({
    name: "",
    description: "",
    main_image_url: "",
    user_id: "",
    phoneNumber: "",
    email: "",
  });
  const { mutateAsync } = trpc.businesses.createBusiness.useMutation();
  const utils = trpc.useContext();
  const handleChange = (e) => {
    setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await toast.promise(
      mutateAsync(businessData).then(() =>
        utils.businesses.allBusinesses.invalidate(),
      ),
      {
        loading: "Saving...",
        success: <b>Deleted category</b>,
        error: <b>Metas pist protą Tomui</b>,
      },
    );
  };

  return (
    <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all">
      <h2 className="text-lg font-medium text-gray-900">Add Business</h2>
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
          onClick={() => handleSubmit()}
          className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddBusiness;
