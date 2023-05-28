import React, { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { ReservationStatus, prisma } from "@acme/db";

import { trpc } from "~/utils/api";

const Business = () => {
  const router = useRouter();
  const businessId = router.query.id ? parseInt(router.query.id as string) : 0;
  const businessesQuery = trpc.businesses.businessById.useQuery({
    id: businessId,
  });
  const servicesQuery = trpc.services.getServicesByBusinessId.useQuery({
    business_id: businessId,
  });

  if (businessesQuery.isLoading || servicesQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (businessesQuery.isError || servicesQuery.isError) {
    return (
      <p>
        Error: {businessesQuery.error?.message || servicesQuery.error?.message}
      </p>
    );
  }

  const business = businessesQuery.data;
  const services = servicesQuery.data;

  return (
    <div>
      <h1>{business.name}</h1>
      <p>{business.description}</p>
      <p>Email: {business.email}</p>
      <p>Phone Number: {business.phoneNumber}</p>
      <h2>Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <p>{service.service_name}</p>
            <a href={``}>Book</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Business;
