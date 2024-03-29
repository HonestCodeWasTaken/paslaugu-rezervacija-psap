import ProfileHandler from "components/Handlers/ProfileHandler";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-full overflow-auto">
      <Toaster />
      <ProfileHandler />
    </div>
  );
};

export default Profile;
