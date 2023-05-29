import React, { useState } from "react";
import socket from "components/socket";
import { useSession } from "next-auth/react";

import { trpc } from "~/utils/api";

interface Notification {
  id: number;
  title: string;
  date: string;
}
type NotificationObject = {
  userId: string;
  timestamp: string;
  message: string;
  isRead: boolean;
  type: string;
};

type Props = {
  notificationArray: NotificationObject[];
};

const Notifications = ({ notificationArray }: Props) => {
  const session = useSession();
  const allNotifications = trpc.notifications.getNotificationsByUserId.useQuery(
    { userId: session.data?.user?.id || "" },
  );
  console.log(notificationArray);
  const addNotfications = trpc.notifications.createNotification.useMutation();
  const notifications: Notification[] = [];

  const [notifIdx, setNotifIdx] = useState(notifications.length);

  // Send to self
  function sendNotification() {
    addNotfications.mutate({
      userId: session.data?.user?.id || "0",
      timestamp: new Date().toISOString(),
      message: "Service being reserved",
      isRead: false,
      type: "MESSAGE",
    });

    socket.emit("send-notification", {
      userId: session.data?.user?.id || "0",
      timestamp: new Date().toISOString(),
      message: "Service being reserved",
      isRead: false,
      type: "MESSAGE",
    });
    setNotifIdx(notifIdx + 1);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-center">
        <button
          onClick={sendNotification}
          className="bg-slate-200 flex justify-center  p-2 items-center rounded-lg hover:bg-slate-300 font-bold transition-colors duration-200"
        >
          Send reservation notification to self
        </button>
      </div>
      <div className="flex flex-col justify-center w-full bg-white shadow rounded-xl p-4 pt-2">
        {allNotifications.isLoading && <div>Loading...</div>}
        {allNotifications.isError && <div>Error...</div>}
        {allNotifications.data?.map((notification) => (
          <div
            key={notification.id}
            className="py-2 px-4 bg-gray-100 my-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            <h2 className="font-bold text-xl">{notification.message}</h2>
            <p className="text-gray-500">{notification.timestamp.toString()}</p>
            {/* create green bubble if message has been read or red if not*/}
            <div className="flex flex-row w-full">
              {notification.isRead ? (
                <div className="flex flex-row items-center h-full">
                  <div className="w-4 h-4 bg-green-500  rounded-full flex-row flex items-center mr-2"></div>
                  has been read
                </div>
              ) : (
                <div className="flex flex-row items-center h-full">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex-row flex items-center mr-2"></div>
                  has not been read
                </div>
              )}
            </div>
          </div>
        ))}

        {notifications.map(({ id, title, date }) => (
          <div
            key={"static-" + id}
            className="py-2 px-4 bg-gray-100 my-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            <h2 className="font-bold text-xl">{title}</h2>
            <p className="text-gray-500">{date}</p>
          </div>
        ))}
        {notificationArray.map(({ message, timestamp, isRead }, index) => (
          <div
            key={notifications.length + index}
            className="py-2 px-4 bg-gray-100 my-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            <h2 className="font-bold text-xl">{message}</h2>
            <p className="text-gray-500">{new Date(timestamp).toString()}</p>
            {/* create green bubble if message has been read or red if not*/}
            <div className="flex flex-row w-full">
              {isRead ? (
                <div className="flex flex-row items-center h-full">
                  <div className="w-4 h-4 bg-green-500  rounded-full flex-row flex items-center mr-2"></div>
                  has been read
                </div>
              ) : (
                <div className="flex flex-row items-center h-full">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex-row flex items-center mr-2"></div>
                  has not been read
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
