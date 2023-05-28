import React from "react";
import Calendar from "components/Calendar/Calendar";
import CurrentBusiness from "components/Profile/CurrentBusiness";
import ServiceList from "components/Profile/ServiceList";
import ReservationsList from "components/Reservations/ReservationsList";

import { trpc } from "~/utils/api";
import { useSelectedOptionStore } from "../../zustand/store";

type Props = {};

const ProfileHandler = (props: Props) => {
  const selectedOption = useSelectedOptionStore(
    (state) => state.selectedOption,
  );
  const reservationsQuery =
    trpc.reservations.getReservationsByUserSession.useQuery({});
  reservationsQuery.isLoading;
  const userBusiness = trpc.businesses.businessesBySession.useQuery();
  switch (selectedOption) {
    case "calendar":
      return <Calendar />;
    case "reservations":
      if (reservationsQuery.isLoading || reservationsQuery.isError) {
        return <div>Loading...</div>;
      }
      return <ReservationsList reservations={reservationsQuery.data} />;
    case "orders":
      return <div>Orders content...</div>;
    case "notifications":
      return <div>Notifications content...</div>;
    case "currentBusiness":
      if (userBusiness.isLoading || userBusiness.isError) {
        return <div>Loading...</div>;
      }
      return <CurrentBusiness business={userBusiness.data} />;
    case "currentServices":
      if (userBusiness.isLoading || userBusiness.isError) {
        return <div>Loading...</div>;
      }
      return <ServiceList services={userBusiness.data[0]!.services} />;
    case "addService":
      return <div>Add Service content...</div>;
    case "addBusiness":
      return <div>Add Business content...</div>;
    default:
      return <div>"select an option"</div>;
  }
};

export default ProfileHandler;
