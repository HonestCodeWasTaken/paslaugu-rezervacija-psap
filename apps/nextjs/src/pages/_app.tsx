import "../styles/globals.css";
import { useEffect, useRef, useState } from "react";
import type { AppType } from "next/app";
import Layout from "components/Layout";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { Socket, io } from "socket.io-client";

import { trpc } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
