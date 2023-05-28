import React from "react";
import Calendar from "components/Calendar/Calendar";

import { useSelectedOptionStore } from "../../zustand/store";

type Props = {};

const ProfileHandler = (props: Props) => {
  const selectedOption = useSelectedOptionStore(
    (state) => state.selectedOption,
  );
  switch (selectedOption) {
    case "calendar":
      return <Calendar />;
    case "reservations":
      return <div>Reservations content...</div>;
    case "orders":
      return <div>Orders content...</div>;
    case "notifications":
      return <div>Notifications content...</div>;
    case "currentBusiness":
      return <div>Current Business content...</div>;
    case "currentServices":
      return <div>Current Services content...</div>;
    case "addService":
      return <div>Add Service content...</div>;
    case "addBusiness":
      return <div>Add Business content...</div>;
    default:
      return <div>"select an option"</div>;
  }
};

export default ProfileHandler;
