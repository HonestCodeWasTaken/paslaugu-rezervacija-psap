import React, { useState } from "react";
import socket from "components/socket";
import { useSession } from "next-auth/react";

import { useNotificationsStore } from "../../zustand/store";

interface Notification {
  id: number;
  title: string;
  date: string;
}
interface NotificationBack {
  id: number;
  title: string;
  date: string;
  receiverUserId: string;
}

type Props = {
  notificationArray: NotificationBack[];
};

const Notifications = ({ notificationArray }: Props) => {
  console.log(notificationArray);
  const notifications: Notification[] = [
    {
      id: 1,
      title: "Your service reservation was denied",
      date: "May 27, 2023",
    },
    {
      id: 2,
      title: "Your next appointment is in 3 hours",
      date: "May 28, 2023",
    },
    {
      id: 3,
      title: "Your service reservation has been approved!",
      date: "May 29, 2023",
    },
  ];
  const session = useSession();
  console.log(session.data?.user?.id);
  const [notifIdx, setNotifIdx] = useState(notifications.length);
  function sendNotification() {
    socket.emit("send-notification", {
      id: 4,
      title: "Service reserved id: ",
      date: "May 30, 2023",
      receiverUserId: session.data?.user?.id,
    });
    setNotifIdx(notifIdx + 1);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-center">
        <button
          onClick={sendNotification}
          className="bg-slate-400 flex justify-center px-2"
        >
          Send Notification to self
        </button>
      </div>
      <div className="flex flex-col justify-center w-full bg-white shadow rounded-xl p-4 pt-2">
        {notifications.map(({ id, title, date }) => (
          <div
            key={"static-" + id}
            className="py-2 px-4 bg-gray-100 my-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            <h2 className="font-bold text-xl">{title}</h2>
            <p className="text-gray-500">{date}</p>
          </div>
        ))}
        {notificationArray.map(({ id, title, date }, index) => (
          <div
            key={notifications.length + index}
            className="py-2 px-4 bg-gray-100 my-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            <h2 className="font-bold text-xl">
              {title}
              {notifications.length + index}
            </h2>
            <p className="text-gray-500">{date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
