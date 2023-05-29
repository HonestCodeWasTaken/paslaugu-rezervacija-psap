// pages/business/[slug].tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "@acme/db";

import { trpc } from "~/utils/api";

export default function BusinessPage() {
  const router = useRouter();
  const id = router.query.id?.toString() || "newMessage";

  const businessesQuery = trpc.businesses.businessById.useQuery({
    id: parseInt(id, 10),
  });
  const servicesByBusinessId = trpc.services.getServicesByBusinessId.useQuery({
    business_id: parseInt(id, 10),
  });

  if (
    businessesQuery.isLoading ||
    businessesQuery.isError ||
    servicesByBusinessId.isLoading ||
    servicesByBusinessId.isError
  ) {
    return <div>Loading...</div>;
  }

  // Mock data
  const businessData = {
    name: "Business Name",
    description: "This is a wonderful business.",
    image: "https://trainok-s3.s3.eu-north-1.amazonaws.com/man1.jpg", // Path to your image
    services: [
      { id: 1, name: "Service 1" },
      { id: 2, name: "Service 2" },
      { id: 3, name: "Service 3" },
      { id: 4, name: "Service 4" },
      { id: 5, name: "Service 5" },
    ],
  };

  // Function to handle service booking
  const handleBook = (serviceName: string) => {
    alert(`You booked ${serviceName}`);
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="p-6 mt-6 text-center w-full border rounded-xl">
        <div className="image-slot mb-4 w-full flex justify-center">
          <img
            src={businessData.image}
            alt="business_image"
            className="object-cover w-32 h-32 rounded-md"
          />
        </div>

        <div className="business-info mb-4">
          <h2 className="text-2xl font-bold mb-2">
            {businessesQuery.data?.name}
          </h2>
          <p className="text-sm text-gray-500">
            {businessesQuery.data?.description}
          </p>
        </div>

        <div className="services-container overflow-y-scroll h-64">
          {servicesByBusinessId.data.length === 0 ? (
            <div className="p-2 my-2 bg-gray-200 rounded-md flex justify-between items-center hover:bg-gray-300 cursor-pointer transition-colors duration-200">
              <span>No services available</span>
            </div>
          ) : (
            servicesByBusinessId.data?.map((service) => (
              <div
                key={service.id}
                className="p-2 my-2 bg-gray-200 rounded-md flex justify-between items-center hover:bg-gray-300 cursor-pointer transition-colors duration-200"
              >
                <span>{service.service_name}</span>
                <button
                  onClick={() => handleBook(service.service_name)}
                  className="text-white bg-green-500 px-2 py-1 rounded-md"
                >
                  Book
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
