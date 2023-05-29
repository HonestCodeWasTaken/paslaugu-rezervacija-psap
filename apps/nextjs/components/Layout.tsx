/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useSelectedOptionStore } from "../zustand/store";
import Header from "./Header";

//import SearchInput from "./SearchInput";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;
  const selectedOption = useSelectedOptionStore(
    (state) => state.selectedOption,
  );
  const setSelectedOption = useSelectedOptionStore(
    (state) => state.setSelectedOption,
  );

  /*
  if (!user) {
    return <div>Loading...</div>;
  }
  */
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <aside
          // ref={parent}
          style={{
            width: isOpen ? "25%" : "0%",
          }}
          className="transition-all flex-col flex bg-gray-100 h-screen"
        >
          {isOpen ? (
            <>
              <div className=" bg-gray-100 h-screen p-4">
                <div className="mb-8 flex items-center">
                  <img
                    src={user?.image || "https://via.placeholder.com/150"}
                    alt="profile"
                    className="rounded-full w-8 h-8 object-cover mr-4"
                  />
                  <div>
                    <h1 className="font-bold text-lg">{user?.name}</h1>
                  </div>
                </div>
                <ul>
                  <li
                    className={`p-2  ${
                      selectedOption === "calendar" ? "bg-gray-200 " : ""
                    }`}
                    onClick={() => setSelectedOption("calendar")}
                  >
                    Calendar
                  </li>
                  <li
                    className={`p-2 ${
                      selectedOption === "reservations" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setSelectedOption("reservations")}
                  >
                    Reservations
                  </li>
                  <li
                    className={`p-2 ${
                      selectedOption === "notifications" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setSelectedOption("notifications")}
                  >
                    Notifications
                  </li>
                  <h2 className="font-bold text-lg mb-4">Admin Actions</h2>
                  <>
                    <li
                      className={`p-2 ${
                        selectedOption === "currentBusiness"
                          ? "bg-gray-200"
                          : ""
                      }`}
                      onClick={() => setSelectedOption("currentBusiness")}
                    >
                      Current Business
                    </li>
                    <li
                      className={`p-2 ${
                        selectedOption === "currentServices"
                          ? "bg-gray-200"
                          : ""
                      }`}
                      onClick={() => setSelectedOption("currentServices")}
                    >
                      Current Services
                    </li>
                    <li
                      className={`p-2 ${
                        selectedOption === "addService" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => setSelectedOption("addService")}
                    >
                      Add Service
                    </li>
                    <li
                      className={`p-2 ${
                        selectedOption === "addBusiness" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => setSelectedOption("addBusiness")}
                    >
                      Add Business
                    </li>
                  </>
                </ul>
              </div>
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
