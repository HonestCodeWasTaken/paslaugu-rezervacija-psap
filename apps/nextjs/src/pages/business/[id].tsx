// pages/business/[slug].tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { trpc } from "~/utils/api";
import ReservationForm from "./ReservationForm";

export default function BusinessPage() {
  const router = useRouter();
  const id = router.query.id?.toString() || "newMessage";
  const mutate = trpc.reservations.createReservation.useMutation();
  const session = useSession();
  const businessesQuery = trpc.businesses.businessById.useQuery({
    id: parseInt(id, 10),
  });
  const servicesByBusinessId = trpc.services.getServicesByBusinessId.useQuery({
    business_id: parseInt(id, 10),
  });

  const [selectedService, setSelectedService] = useState(null);

  if (
    businessesQuery.isLoading ||
    businessesQuery.isError ||
    servicesByBusinessId.isLoading ||
    servicesByBusinessId.isError
  ) {
    return <div>Loading...</div>;
  }

  const handleBook = (service) => {
    setSelectedService(service);
    mutate.mutateAsync({
      userId: session.data?.user.id || "",
      businessId: parseInt(id, 10),
      serviceId: service.id,
      status: "PENDING",
      date: new Date().toISOString(),
      reservationEndDate: new Date().toISOString(),
      time: "14:00",
    });
  };

  const [status] = useState("PENDING"); // or any default status
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [reservationEndDate, setReservationEndDate] = useState(new Date());
  const [time, setTime] = useState("00:00");
  const [colorTag, setColorTag] = useState("");

  const mockReservationData = {
    status: "PENDING",
    date: "2023-08-29T00:00:00.000Z",
    reservationEndDate: "2023-08-29T02:00:00.000Z",
    description: "Reservation for a consultation.",
    time: "14:00",
    userId: "user123",
    businessId: 1,
    serviceId: 2,
    colorTag: "#FF6347",
    created: "2023-05-29T09:30:00.000Z",
  };

  const handleSubmit = async (event, serviceId: number) => {
    event.preventDefault();
    // implement the booking logic here
    const input = {
      status,
      date: date.toISOString(),
      reservationEndDate: reservationEndDate.toISOString(),
      description,
      time,
      userId: session.data?.user.id,
      businessId: parseInt(id, 10),
      serviceId,
      colorTag,
    };
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="p-6 mt-6 text-center w-full border rounded-xl">
        <div className="image-slot mb-4 w-full flex justify-center">
          <img
            src={businessesQuery.data?.main_image_url}
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
                  onClick={() => handleBook(service)}
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
