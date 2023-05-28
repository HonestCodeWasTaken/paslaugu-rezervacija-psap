import React from "react";

import { RouterOutputs } from "~/utils/api";

type Props = {
  services: RouterOutputs["businesses"]["businessesBySession"][0]["services"];
};

const ServiceList = ({ services }: Props) => {
  return (
    <div className="p-5 bg-white rounded shadow-lg w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Services</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl text-gray-700">
                  {service.service_name}
                </h4>
                <p className="font-medium text-gray-700">${service.cost}</p>
              </div>

              <div className="mb-2">
                <p className="font-medium text-gray-900">Description:</p>
                <p className="text-gray-600">{service.description}</p>
              </div>

              <div className="mb-2">
                <p className="font-medium text-gray-900">Session length:</p>
                <p className="text-gray-600">{service.session_length}</p>
              </div>

              {service.ratings && (
                <div className="mt-2">
                  <p className="font-medium text-gray-900">Ratings:</p>
                  <p className="text-gray-600">{service.ratings.description}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No services available</p>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
