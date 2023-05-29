// pages/business/[slug].tsx

import { useState } from "react";
import { useRouter } from "next/router";

export default function BusinessPage() {
  const router = useRouter();
  const { slug } = router.query;

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
          <h2 className="text-2xl font-bold mb-2">{businessData.name}</h2>
          <p className="text-sm text-gray-500">{businessData.description}</p>
        </div>

        <div className="services-container overflow-y-scroll h-64">
          {businessData.services.map((service) => (
            <div
              key={service.id}
              className="p-2 my-2 bg-gray-200 rounded-md flex justify-between items-center hover:bg-gray-300 cursor-pointer transition-colors duration-200"
            >
              <span>{service.name}</span>
              <button
                onClick={() => handleBook(service.name)}
                className="text-white bg-green-500 px-2 py-1 rounded-md"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
