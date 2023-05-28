import React from "react";
import { useRouter } from "next/router";
import Calendar from "components/Calendar/Calendar";
import AddBusiness from "components/Profile/AddBusiness";
import AddService from "components/Profile/AddService";
import CurrentBusiness from "components/Profile/CurrentBusiness";
import Notifications from "components/Profile/Notifications";
import ServiceList from "components/Profile/ServiceList";
import ReservationsList from "components/Reservations/ReservationsList";
import { useSession } from "next-auth/react";

import { trpc } from "~/utils/api";
import { useSelectedOptionStore } from "../../zustand/store";

type Props = {};

const ProfileHandler = (props: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (!status && !session) {
      router.push("/");
    }
  }, [status, session]);
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
      return <Notifications />;
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
      return <AddService />;
    case "addBusiness":
      return <AddBusiness />;
    default:
      return <div>select an option</div>;
  }
};

export default ProfileHandler;
