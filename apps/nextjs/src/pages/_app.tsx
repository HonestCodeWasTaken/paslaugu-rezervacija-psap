import "../styles/globals.css";
import type { AppType } from "next/app";
import Layout from "components/Layout";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

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
