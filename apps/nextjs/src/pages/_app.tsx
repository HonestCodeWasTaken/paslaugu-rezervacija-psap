import "../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import type { AppType } from "next/app";
import Layout from "components/Layout";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Socket, io } from "socket.io-client";

import { trpc } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const socketRef = useRef<Socket | null>(null);
  const isMountedRef = useRef(false); // To track if component is still mounted
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    isMountedRef.current = true; // Component is mounted
    const initialize = async () => {
      try {
        // Initialize the server first
        // Then, create the socket connection
        socketRef.current = io("http://localhost:3001");
        if (socketRef.current) {
          socketRef.current.on("connect", () => {
            console.log("Connected to socket server");
          });
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

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
