import React from "react";
import socket from "components/socket";
import { useSession } from "next-auth/react";

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

const Notifications = () => {
  const notifications: Notification[] = [
    { id: 1, title: "Notification 1", date: "May 27, 2023" },
    { id: 2, title: "Notification 2", date: "May 28, 2023" },
    { id: 3, title: "Notification 3", date: "May 29, 2023" },
  ];
  const session = useSession();
  console.log(session.data?.user?.id);
  function sendNotification() {
    socket.emit("send-notification", {
      id: 4,
      title: "Notification 4",
      date: "May 30, 2023",
      receiverUserId: session.data?.user?.id,
    });
  }
  return (
    <div className="flex flex-col justify-center w-full overflow-y-scroll bg-white shadow rounded-xl p-4 pt-2">
      <button onClick={sendNotification} className="bg-slate-400">
        Send Notification to self
      </button>
      {notifications.map(({ id, title, date }) => (
        <div
          key={id}
          className="py-2 px-4 bg-gray-100 my-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-gray-500">{date}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
