import http from "http";
import express from "express";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

type MessageObject = {
  content: string;
  authorId: string;
};
type NotificationObject = {
  id: number;
  title: string;
  date: string;
  receiverUserId: string;
};

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const handleStartJoin = (chatId: number, socketId: string) => {
  console.log(
    `innitializeJoin request by client: ${socketId} received room: ${chatId}`,
  );
  io.to(socketId).emit("startJoinFromClient", chatId); // seperated event by socket Id
};

const handleSendMessage = (chatId: number, message: MessageObject) => {
  console.log(`Content received: ${message.content} from room: ${chatId}`);
  io.to(chatId.toString()).emit("receiveMessage", message); // seperated event by chat room Id
};

io.on("connection", (socket: Socket) => {
  console.log(`A user connected with id ${socket.id}`);
  console.log(socket.rooms);
  console.log(`client ${socket.id} has connected`);

  socket.on("disconnect", (reason: string) => {
    console.log(`client ${socket.id} has disconnected ${reason}`);
  });

  socket.on("innitializeJoin", handleStartJoin);
  socket.on("innitializeMessage", handleSendMessage);
  socket.on("joinUserRoom", (userId: string) => {
    socket.join(userId);
    console.log(`client ${socket.id} has joined his ID room:${userId}`);
    console.log(socket.rooms);
  });
  socket.on("send-notification", (Object: NotificationObject) => {
    console.log("parejo notif ");
    console.log(Object.id, Object.title, Object.date, Object.receiverUserId);
    io.to(Object.receiverUserId).emit("notification", {
      id: Object.id,
      title: Object.title,
      date: Object.date,
      receiverUserId: Object.receiverUserId,
    });
  });

  socket.on("join", (chatId: string) => {
    if (socket.rooms.size > 1) {
      const lastRoom = Array.from(socket.rooms).pop();
      console.log(`lastRoom: ${lastRoom}`);
      socket.leave(lastRoom?.toString() || "");
    }

    socket.join(chatId.toString());
    console.log(
      `client ${socket.id} has joined ${chatId} socket.rooms.size: ${socket.rooms.size}`,
    );
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server is listening on *:3001");
});

export default io;
