import React from "react";

import { RouterOutputs } from "~/utils/api";

type Props = {
  business: RouterOutputs["businesses"]["businessesBySession"];
};

const CurrentBusiness = ({ business }: Props) => {
  const currentBusiness = business[0]; // Assuming you want to display the first business from the array.

  return (
    <div className="p-5 mx-auto bg-white rounded shadow-lg w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your Business
        </h2>
        <h4 className="text-xl text-gray-700">{currentBusiness?.name}</h4>
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-900">Description:</p>
        <p className="text-gray-600">{currentBusiness?.description}</p>
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-900">Email:</p>
        <p className="text-gray-600">{currentBusiness?.email}</p>
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-900">Phone Number:</p>
        <p className="text-gray-600">{currentBusiness?.phoneNumber}</p>
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-900">Address:</p>
        {currentBusiness?.address ? (
          <>
            <p className="text-gray-600">
              {currentBusiness?.address?.street_name},{" "}
              {currentBusiness?.address?.street_number}
            </p>
            <p className="text-gray-600">
              {currentBusiness?.address?.city},{" "}
              {currentBusiness?.address?.postal_code}
            </p>
            <p className="text-gray-600">{currentBusiness?.address?.country}</p>
          </>
        ) : (
          "none"
        )}
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-900">Social Media:</p>
        {/* check if any of social medias exist otherwise print null */}
        {currentBusiness?.socialMedia?.facebook ||
        currentBusiness?.socialMedia?.instagram ||
        currentBusiness?.socialMedia?.tiktok ||
        currentBusiness?.socialMedia?.youtube ? (
          <>
            <p className="text-gray-600">
              Facebook: {currentBusiness?.socialMedia?.facebook}
            </p>
            <p className="text-gray-600">
              Instagram: {currentBusiness?.socialMedia?.instagram}
            </p>
            <p className="text-gray-600">
              Tiktok: {currentBusiness?.socialMedia?.tiktok}
            </p>
            <p className="text-gray-600">
              Youtube: {currentBusiness?.socialMedia?.youtube}
            </p>
          </>
        ) : (
          <p className="text-gray-600">none</p>
        )}
      </div>
    </div>
  );
};

export default CurrentBusiness;
