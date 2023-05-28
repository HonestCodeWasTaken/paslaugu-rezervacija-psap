import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Socket, io } from "socket.io-client";

type MessageObject = {
  content: string;
  authorId: string;
};

const UseSockets = () => {
  const socketRef = useRef<Socket | null>(null);
  const isMountedRef = useRef(false); // To track if component is still mounted
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  console.log("session", session.data?.user.id);
  console.log(session.data?.user.id);
  useEffect(() => {
    isMountedRef.current = true; // Component is mounted
    const initialize = async () => {
      try {
        // Initialize the server first
        // Then, create the socket connection
        socketRef.current = io("http://localhost:3001");
        if (socketRef.current) {
          console.log("blet");
          socketRef.current.on("connect", () => {
            console.log("Connected to socket server");
          });
          if (session?.data?.user?.id) {
            console.log("prieita");
            socketRef.current?.emit("joinUserRoom", {
              userId: session?.data.user?.id,
            });
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    // Call the async function
    initialize();

    return () => {
      isMountedRef.current = false; // Component is unmounted
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.disconnect();
      }
    };
  }, []);

  return {};
};

export default UseSockets;
