// Header.tsx
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {};

const ExploreHeader = (props: Props) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session?.user && (
        <p className="text-center text-2xl text-black">
          {session && <span>Logged in as {session?.user?.name}</span>}
        </p>
      )}
      <button
        className="rounded-full outline bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/5"
        onClick={session ? () => void signOut() : () => void signIn()}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default ExploreHeader;
