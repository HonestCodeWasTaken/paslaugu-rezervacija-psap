import ProfileHandler from "components/Handlers/ProfileHandler";
import { useSession } from "next-auth/react";

import { useSelectedOptionStore } from "../../../zustand/store";

const Profile = () => {
  const { data: session, status } = useSession();
  const selectedOption = useSelectedOptionStore(
    (state) => state.selectedOption,
  );
  const user = session?.user;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-full overflow-auto">
      <ProfileHandler />
    </div>
  );
};

export default Profile;
