import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleSidebar = () => {
    router.asPath !== "/signin" ? setIsOpen(!isOpen) : null;
  };
  const [parent] = useAutoAnimate();
  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <aside
          // ref={parent}
          style={{
            width: isOpen ? "12rem" : "0rem",
          }}
          className="bg-gray-800 transition-all flex-col flex"
        >
          {isOpen ? (
            <>
              <h2>hi</h2>
            </>
          ) : null}
        </aside>
        <main className="flex-1 overflow-y-auto p-4 w-full">
          {/* Main content goes here */}
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
